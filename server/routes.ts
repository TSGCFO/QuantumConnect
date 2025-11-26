import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { summarizeMeeting, answerDocumentQuestion } from "./openai";
import { getUncachableOutlookClient } from "./integrations/outlook";
import { getUncachableHubSpotClient } from "./integrations/hubspot";
// Import from the new teams-app module for application-level access
import {
  getUserPrincipalName,
  getUserOnlineMeetings,
  getAllOnlineMeetings,
  getMeetingTranscript,
  getMeetingAttendanceReports,
  getUserCalendarEvents,
  isUserAdmin,
  getUserTeams,
  getTeamChannels,
  getChannelMessages,
  getUserChats,
  getChatMessages
} from "./integrations/teams-app";
// Import sync services
import {
  syncCalendarEvents,
  syncContacts,
  syncDriveItems,
  syncTodoLists,
  syncChatThreads,
  syncPresence,
  syncAllResources,
  extractActionItemsFromCalendar,
  generateDailyDigest,
  scheduleUpcomingReminders,
} from "./services/sync";
import { startScheduler, stopScheduler, enqueueSync, enqueueSyncForAllUsers, getQueueStats, manualSyncUser } from "./services/syncScheduler";

const upload = multer({ storage: multer.memoryStorage() });

// Activity logging middleware
function logActivity(action: string, resourceType?: string) {
  return async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.claims?.sub;
      if (userId) {
        await storage.createActivityLog({
          userId,
          action,
          resourceType,
          resourceId: req.params.id || null,
          ipAddress: req.ip,
          userAgent: req.get("user-agent") || null,
        });
      }
    } catch (error) {
      console.error("Activity logging error:", error);
    }
    next();
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard stats
  app.get(
    "/api/dashboard/stats",
    isAuthenticated,
    logActivity("view_dashboard"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const documents = await storage.getDocuments();
        const tasks = await storage.getTasksByUser(userId);
        const emails = await storage.getEmails(userId);
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const meetings = await storage.getMeetings();
        const recentMeetings = meetings.filter(
          (m) => new Date(m.meetingDate) >= sevenDaysAgo,
        );

        res.json({
          totalDocuments: documents.length,
          pendingTasks: tasks.filter((t) => t.status === "pending").length,
          unreadEmails: emails.filter((e) => !e.isRead).length,
          recentMeetings: recentMeetings.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
      }
    },
  );

  // Document routes
  app.get(
    "/api/documents",
    isAuthenticated,
    logActivity("view_documents"),
    async (req, res) => {
      try {
        const documents = await storage.getDocuments();
        res.json(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Failed to fetch documents" });
      }
    },
  );

  app.post(
    "/api/documents/upload",
    isAuthenticated,
    upload.single("file"),
    logActivity("upload_document", "document"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const file = req.file;
        if (!file) {
          return res.status(400).json({ message: "No file provided" });
        }

        const { title, description, category } = req.body;
        const content = file.buffer.toString("utf-8");

        const document = await storage.createDocument({
          title,
          description,
          category,
          fileName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
          source: "upload",
          uploadedById: userId,
          content,
        });

        res.json(document);
      } catch (error) {
        console.error("Error uploading document:", error);
        res.status(500).json({ message: "Failed to upload document" });
      }
    },
  );

  app.post("/api/documents/ask-ai", isAuthenticated, async (req, res) => {
    try {
      const { question } = req.body;
      if (!question) {
        return res.status(400).json({ message: "Question is required" });
      }

      const documents = await storage.getDocuments();
      const docsWithContent = documents.filter((d) => d.content);

      // Map documents to the expected format for answerDocumentQuestion
      const formattedDocs = docsWithContent.map(d => ({
        title: d.title,
        content: d.content || ''
      }));

      const answer = await answerDocumentQuestion(question, formattedDocs);
      res.json({ answer });
    } catch (error) {
      console.error("Error answering question:", error);
      res.status(500).json({ message: "Failed to generate answer" });
    }
  });

  // Meeting routes
  app.get(
    "/api/meetings",
    isAuthenticated,
    logActivity("view_meetings"),
    async (req, res) => {
      try {
        const meetings = await storage.getMeetings();
        res.json(meetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
        res.status(500).json({ message: "Failed to fetch meetings" });
      }
    },
  );

  app.post(
    "/api/meetings/upload",
    isAuthenticated,
    logActivity("upload_meeting", "meeting"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { title, description, meetingDate, transcript } = req.body;

        // Try to generate AI summary, but don't fail if it doesn't work
        let summary = "";
        let actionItems: any[] = [];
        
        try {
          const aiResult = await summarizeMeeting(transcript);
          summary = aiResult.summary;
          actionItems = aiResult.actionItems;
        } catch (aiError) {
          console.error("Error generating AI summary:", aiError);
          // Create fallback summary from first 500 chars of transcript
          summary = transcript && transcript.length > 500 
            ? transcript.substring(0, 500) + "..." 
            : transcript || "No summary available";
          actionItems = [];
        }

        // Always create the meeting, even if AI processing failed
        const meeting = await storage.createMeeting({
          title,
          description,
          meetingDate: new Date(meetingDate),
          transcript,
          summary,
          actionItems: actionItems.length > 0 ? actionItems : null,
          source: "manual",
          uploadedById: userId,
        });

        // Create tasks from action items (only if we have them)
        if (actionItems && actionItems.length > 0) {
          for (const item of actionItems) {
            await storage.createTask({
              title: item.title || item.task || item,
              description: `From meeting: ${title}`,
              priority: "medium",
              status: "pending",
              source: "ai_meeting",
              sourceId: meeting.id,
              assignedById: userId,
            });
          }
        }

        res.json(meeting);
      } catch (error) {
        console.error("Error uploading meeting:", error);
        res.status(500).json({ message: "Failed to upload meeting" });
      }
    },
  );

  // Task routes
  app.get(
    "/api/tasks/my-tasks",
    isAuthenticated,
    logActivity("view_tasks"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const tasks = await storage.getTasksByUser(userId);
        res.json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks" });
      }
    },
  );

  app.post(
    "/api/tasks",
    isAuthenticated,
    logActivity("create_task", "task"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { title, description, priority, dueDate, source } = req.body;

        const task = await storage.createTask({
          title,
          description,
          priority: priority || "medium",
          dueDate: dueDate ? new Date(dueDate) : null,
          status: "pending",
          source: source || "manual",
          assignedToId: userId,
          assignedById: userId,
        });

        res.json(task);
      } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Failed to create task" });
      }
    },
  );

  app.patch(
    "/api/tasks/:id",
    isAuthenticated,
    logActivity("update_task", "task"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const task = await storage.updateTask(id, req.body);
        res.json(task);
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
      }
    },
  );

  // Email routes
  app.get(
    "/api/emails",
    isAuthenticated,
    logActivity("view_emails"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const emails = await storage.getEmails(userId);
        res.json(emails);
      } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ message: "Failed to fetch emails" });
      }
    },
  );

  app.post(
    "/api/emails/sync",
    isAuthenticated,
    logActivity("sync_emails"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const client = await getUncachableOutlookClient();

        const messages = await client
          .api("/me/messages")
          .top(50)
          .select(
            "id,subject,from,toRecipients,ccRecipients,body,receivedDateTime,isRead,hasAttachments,importance,conversationId",
          )
          .get();

        let syncedCount = 0;
        for (const msg of messages.value) {
          const outlookId = msg.id;
          const exists = await storage.emailExists(outlookId);
          if (!exists) {
            await storage.createEmail({
              outlookId,
              userId,
              subject: msg.subject,
              from: msg.from?.emailAddress?.address || "unknown",
              to:
                msg.toRecipients?.map((r: any) => r.emailAddress?.address) ||
                [],
              cc:
                msg.ccRecipients?.map((r: any) => r.emailAddress?.address) ||
                [],
              body: msg.body?.content || "",
              receivedAt: new Date(msg.receivedDateTime),
              isRead: msg.isRead,
              hasAttachments: msg.hasAttachments,
              importance: msg.importance,
              conversationId: msg.conversationId,
            });
            syncedCount++;
          }
        }

        res.json({ message: `Synced ${syncedCount} new emails` });
      } catch (error) {
        console.error("Error syncing emails:", error);
        res.status(500).json({ message: "Failed to sync emails" });
      }
    },
  );

  // Teams API routes
  
  // Sync Teams meetings with transcripts using new application-level authentication
  app.get(
    "/api/teams/sync",
    isAuthenticated,
    logActivity("sync_teams_meetings"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        
        // Get the current user's email using new authentication
        const userPrincipalName = await getUserPrincipalName();
        
        // Fetch all meetings for the user (past 2 years)
        const meetings = await getUserOnlineMeetings(userPrincipalName);
        
        let syncedCount = 0;
        let processedCount = 0;
        let failedCount = 0;

        for (const meeting of meetings) {
          try {
            // Check if meeting already exists
            const existingMeetings = await storage.getMeetings();
            const exists = existingMeetings.some(m => m.sourceId === meeting.id);
            
            if (!exists && meeting.subject) {
              // Get transcript if available
              let transcript = "";
              let summary = "";
              let actionItems: any[] = [];
              
              if (meeting.transcripts && meeting.transcripts.length > 0) {
                for (const trans of meeting.transcripts) {
                  try {
                    const transcriptContent = await getMeetingTranscript(meeting.id, trans.id, userPrincipalName);
                    if (transcriptContent) {
                      // Convert stream to text if needed
                      transcript = typeof transcriptContent === 'string' 
                        ? transcriptContent 
                        : transcriptContent.toString();
                      break;
                    }
                  } catch (err) {
                    console.error(`Error fetching transcript for meeting ${meeting.id}:`, err);
                  }
                }
              }
              
              // Generate AI summary if we have transcript (with fallback)
              if (transcript) {
                try {
                  const aiResult = await summarizeMeeting(transcript);
                  summary = aiResult.summary;
                  actionItems = aiResult.actionItems;
                } catch (err) {
                  console.error("Error generating AI summary:", err);
                  // Create fallback summary from first 500 chars of transcript
                  summary = transcript.length > 500 
                    ? transcript.substring(0, 500) + "..." 
                    : transcript;
                  actionItems = [];
                }
              } else {
                // No transcript available, create basic summary from meeting info
                summary = `Meeting: ${meeting.subject || 'Untitled'} on ${new Date(meeting.startDateTime).toLocaleDateString()}`;
              }
              
              // Store the meeting
              const storedMeeting = await storage.createMeeting({
                title: meeting.subject || "Teams Meeting",
                description: `Teams meeting - ${meeting.joinUrl || 'No join URL'}`,
                meetingDate: new Date(meeting.startDateTime),
                transcript: transcript || null,
                summary: summary || null,
                actionItems: actionItems.length > 0 ? actionItems : null,
                source: "teams",
                sourceId: meeting.id,
                uploadedById: userId,
                attendees: meeting.participants?.attendees?.map((a: any) => a.identity?.user?.displayName).filter(Boolean) || [],
              });
              
              // Create tasks from action items
              if (actionItems && actionItems.length > 0) {
                for (const item of actionItems) {
                  await storage.createTask({
                    title: item.title || item.task || item,
                    description: `From Teams meeting: ${meeting.subject}`,
                    priority: "medium",
                    status: "pending",
                    source: "ai_meeting",
                    sourceId: storedMeeting.id,
                    assignedToId: userId,
                    assignedById: userId,
                    dueDate: item.deadline ? new Date(item.deadline) : null,
                  });
                }
              }
              
              syncedCount++;
            }
            processedCount++;
          } catch (error) {
            console.error(`Error processing meeting ${meeting.id}:`, error);
            failedCount++;
          }
        }
        
        res.json({ 
          message: `Synced ${syncedCount} new Teams meetings, processed ${processedCount} total${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
          synced: syncedCount,
          processed: processedCount,
          failed: failedCount,
          userEmail: userPrincipalName
        });
      } catch (error) {
        console.error("Error syncing Teams meetings:", error);
        res.status(500).json({ message: "Failed to sync Teams meetings" });
      }
    },
  );

  // Get Teams meetings using new authentication
  app.get(
    "/api/teams/meetings",
    isAuthenticated,
    logActivity("view_teams_meetings"),
    async (req, res) => {
      try {
        // Get the current user's email
        const userPrincipalName = await getUserPrincipalName();
        
        // Fetch meetings for the current user
        const meetings = await getUserOnlineMeetings(userPrincipalName);
        
        // Format meetings for response
        const formattedMeetings = meetings.map((meeting: any) => ({
          id: meeting.id,
          subject: meeting.subject || "Untitled Meeting",
          startDateTime: meeting.startDateTime,
          endDateTime: meeting.endDateTime,
          joinUrl: meeting.joinUrl,
          hasTranscripts: meeting.transcripts && meeting.transcripts.length > 0,
          participantCount: meeting.participants?.attendees?.length || 0,
        }));
        
        res.json(formattedMeetings);
      } catch (error) {
        console.error("Error fetching Teams meetings:", error);
        res.status(500).json({ message: "Failed to fetch Teams meetings" });
      }
    },
  );

  // Get Teams channels and messages
  app.get(
    "/api/teams/channels",
    isAuthenticated,
    logActivity("view_teams_channels"),
    async (req, res) => {
      try {
        const teams = await getUserTeams();
        const channelsWithMessages = [];
        
        for (const team of teams) {
          const channels = await getTeamChannels(team.id);
          
          for (const channel of channels) {
            const messages = await getChannelMessages(team.id, channel.id, 20);
            
            channelsWithMessages.push({
              teamId: team.id,
              teamName: team.displayName,
              channelId: channel.id,
              channelName: channel.displayName,
              channelDescription: channel.description,
              messageCount: messages.length,
              recentMessages: messages.slice(0, 5).map((msg: any) => ({
                id: msg.id,
                body: msg.body?.content,
                from: msg.from?.user?.displayName,
                createdDateTime: msg.createdDateTime,
                hasReplies: msg.replies && msg.replies.length > 0,
              })),
            });
          }
        }
        
        res.json(channelsWithMessages);
      } catch (error) {
        console.error("Error fetching Teams channels:", error);
        res.status(500).json({ message: "Failed to fetch Teams channels" });
      }
    },
  );

  // Get Teams chat messages
  app.get(
    "/api/teams/chats",
    isAuthenticated,
    logActivity("view_teams_chats"),
    async (req, res) => {
      try {
        const chats = await getUserChats(30);
        const chatsWithMessages = [];
        
        for (const chat of chats.slice(0, 10)) { // Limit to 10 most recent chats
          const messages = await getChatMessages(chat.id, 20);
          
          chatsWithMessages.push({
            id: chat.id,
            topic: chat.topic || "Unnamed chat",
            chatType: chat.chatType,
            lastUpdated: chat.lastUpdatedDateTime,
            members: chat.members?.map((m: any) => m.displayName).filter(Boolean),
            messageCount: messages.length,
            recentMessages: messages.slice(0, 5).map((msg: any) => ({
              id: msg.id,
              body: msg.body?.content,
              from: msg.from?.user?.displayName,
              createdDateTime: msg.createdDateTime,
              importance: msg.importance,
            })),
          });
        }
        
        res.json(chatsWithMessages);
      } catch (error) {
        console.error("Error fetching Teams chats:", error);
        res.status(500).json({ message: "Failed to fetch Teams chats" });
      }
    },
  );

  // Import a specific Teams meeting with transcript using new authentication
  app.post(
    "/api/teams/import-meeting",
    isAuthenticated,
    logActivity("import_teams_meeting", "meeting"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { meetingId, historical } = req.body; // Support historical flag for importing older meetings
        
        if (!meetingId) {
          return res.status(400).json({ message: "Meeting ID is required" });
        }
        
        // Get the current user's email
        const userPrincipalName = await getUserPrincipalName();
        
        // Get meetings and find the specific one
        const meetings = await getUserOnlineMeetings(userPrincipalName);
        const meeting = meetings.find((m: any) => m.id === meetingId);
        
        if (!meeting) {
          return res.status(404).json({ message: "Meeting not found" });
        }
        
        // Check if already imported
        const existingMeetings = await storage.getMeetings();
        const exists = existingMeetings.some(m => m.sourceId === meetingId);
        
        if (exists && !historical) {
          return res.status(400).json({ message: "Meeting already imported" });
        }
        
        // Get transcript if available
        let transcript = "";
        let summary = "";
        let actionItems: any[] = [];
        
        if (meeting.transcripts && meeting.transcripts.length > 0) {
          for (const trans of meeting.transcripts) {
            try {
              const transcriptContent = await getMeetingTranscript(meeting.id, trans.id, userPrincipalName);
              if (transcriptContent) {
                // Convert stream to text if needed
                transcript = typeof transcriptContent === 'string' 
                  ? transcriptContent 
                  : transcriptContent.toString();
                break;
              }
            } catch (err) {
              console.error(`Error fetching transcript:`, err);
            }
          }
        }
        
        // Generate AI summary if we have transcript (with fallback)
        if (transcript) {
          try {
            const aiResult = await summarizeMeeting(transcript);
            summary = aiResult.summary;
            actionItems = aiResult.actionItems;
          } catch (err) {
            console.error("Error generating AI summary:", err);
            // Create fallback summary from first 500 chars of transcript
            summary = transcript.length > 500 
              ? transcript.substring(0, 500) + "..." 
              : transcript;
            actionItems = [];
          }
        } else {
          // No transcript available, create basic summary from meeting info
          summary = `Meeting: ${meeting.subject || 'Untitled'} on ${new Date(meeting.startDateTime).toLocaleDateString()}`;
        }
        
        // Store the meeting
        const storedMeeting = await storage.createMeeting({
          title: meeting.subject || "Teams Meeting",
          description: `Teams meeting - ${meeting.joinUrl || 'No join URL'}`,
          meetingDate: new Date(meeting.startDateTime),
          transcript: transcript || null,
          summary: summary || null,
          actionItems: actionItems.length > 0 ? actionItems : null,
          source: "teams",
          sourceId: meeting.id,
          uploadedById: userId,
          attendees: meeting.participants?.attendees?.map((a: any) => a.identity?.user?.displayName).filter(Boolean) || [],
        });
        
        // Create tasks from action items
        if (actionItems && actionItems.length > 0) {
          for (const item of actionItems) {
            await storage.createTask({
              title: item.title || item.task || item,
              description: `From Teams meeting: ${meeting.subject}`,
              priority: "medium",
              status: "pending",
              source: "ai_meeting",
              sourceId: storedMeeting.id,
              assignedToId: userId,
              assignedById: userId,
              dueDate: item.deadline ? new Date(item.deadline) : null,
            });
          }
        }
        
        res.json({ 
          message: "Meeting imported successfully",
          meeting: storedMeeting,
          tasksCreated: actionItems.length,
          historical: !!historical
        });
      } catch (error) {
        console.error("Error importing Teams meeting:", error);
        res.status(500).json({ message: "Failed to import Teams meeting" });
      }
    },
  );

  // Sync ALL Teams meetings for ALL users (Admin only)
  app.get(
    "/api/teams/sync-all",
    isAuthenticated,
    logActivity("sync_all_teams_meetings"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        
        // Check if user is an admin
        if (user?.role !== "admin") {
          // Additional check using Teams/Azure AD admin role
          const isAdmin = await isUserAdmin(userId);
          if (!isAdmin) {
            return res.status(403).json({ 
              message: "Access denied. Admin role required for organization-wide sync." 
            });
          }
        }
        
        // Get all meetings for the entire organization
        console.log("Starting organization-wide Teams meetings sync...");
        const allMeetings = await getAllOnlineMeetings();
        
        let syncedCount = 0;
        let processedCount = 0;
        let failedCount = 0;
        const usersMeetingsCount: { [key: string]: number } = {};

        for (const meeting of allMeetings) {
          try {
            // Track meetings per user
            const organizerEmail = meeting.organizerEmail || 'unknown';
            usersMeetingsCount[organizerEmail] = (usersMeetingsCount[organizerEmail] || 0) + 1;
            
            // Check if meeting already exists
            const existingMeetings = await storage.getMeetings();
            const exists = existingMeetings.some(m => m.sourceId === meeting.id);
            
            if (!exists && meeting.subject) {
              // Get transcript if available
              let transcript = "";
              let summary = "";
              let actionItems: any[] = [];
              
              if (meeting.transcripts && meeting.transcripts.length > 0) {
                for (const trans of meeting.transcripts) {
                  try {
                    const transcriptContent = await getMeetingTranscript(
                      meeting.id, 
                      trans.id, 
                      meeting.organizerEmail
                    );
                    if (transcriptContent) {
                      // Convert stream to text if needed
                      transcript = typeof transcriptContent === 'string' 
                        ? transcriptContent 
                        : transcriptContent.toString();
                      break;
                    }
                  } catch (err) {
                    console.error(`Error fetching transcript for meeting ${meeting.id}:`, err);
                  }
                }
              }
              
              // Generate AI summary if we have transcript (with fallback)
              if (transcript) {
                try {
                  const aiResult = await summarizeMeeting(transcript);
                  summary = aiResult.summary;
                  actionItems = aiResult.actionItems;
                } catch (err) {
                  console.error("Error generating AI summary:", err);
                  // Create fallback summary from first 500 chars of transcript
                  summary = transcript.length > 500 
                    ? transcript.substring(0, 500) + "..." 
                    : transcript;
                  actionItems = [];
                }
              } else {
                // No transcript available, create basic summary from meeting info
                summary = `Meeting: ${meeting.subject || 'Untitled'} organized by ${meeting.organizerName || 'Unknown'} on ${new Date(meeting.startDateTime).toLocaleDateString()}`;
              }
              
              // Store the meeting (associate with the organizer)
              const storedMeeting = await storage.createMeeting({
                title: meeting.subject || "Teams Meeting",
                description: `Teams meeting by ${meeting.organizerName || 'Unknown'} - ${meeting.joinUrl || 'No join URL'}`,
                meetingDate: new Date(meeting.startDateTime),
                transcript: transcript || null,
                summary: summary || null,
                actionItems: actionItems.length > 0 ? actionItems : null,
                source: "teams",
                sourceId: meeting.id,
                uploadedById: meeting.organizerId || userId, // Use organizer's ID if available
                attendees: meeting.participants?.attendees?.map((a: any) => a.identity?.user?.displayName).filter(Boolean) || [],
              });
              
              // Create tasks from action items (assign to meeting organizer if possible)
              if (actionItems && actionItems.length > 0) {
                for (const item of actionItems) {
                  await storage.createTask({
                    title: item.title || item.task || item,
                    description: `From Teams meeting: ${meeting.subject} (Organizer: ${meeting.organizerName || 'Unknown'})`,
                    priority: "medium",
                    status: "pending",
                    source: "ai_meeting",
                    sourceId: storedMeeting.id,
                    assignedToId: meeting.organizerId || userId,
                    assignedById: userId, // Admin who triggered the sync
                    dueDate: item.deadline ? new Date(item.deadline) : null,
                  });
                }
              }
              
              syncedCount++;
            }
            processedCount++;
          } catch (error) {
            console.error(`Error processing meeting ${meeting.id}:`, error);
            failedCount++;
          }
        }
        
        // Prepare summary of sync operation
        const uniqueUsers = Object.keys(usersMeetingsCount).length;
        const usersSummary = Object.entries(usersMeetingsCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5) // Top 5 users
          .map(([email, count]) => `${email}: ${count} meetings`)
          .join(', ');
        
        res.json({ 
          message: `Admin sync complete: Synced ${syncedCount} new meetings from ${uniqueUsers} users, processed ${processedCount} total${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
          synced: syncedCount,
          processed: processedCount,
          failed: failedCount,
          uniqueUsers,
          topUsers: usersSummary,
          adminUser: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || userId : userId
        });
      } catch (error) {
        console.error("Error in admin Teams sync:", error);
        res.status(500).json({ message: "Failed to sync all Teams meetings" });
      }
    },
  );

  // HubSpot communication routes
  app.get(
    "/api/communications",
    isAuthenticated,
    logActivity("view_communications"),
    async (req, res) => {
      try {
        const communications = await storage.getHubspotCommunications();
        res.json(communications);
      } catch (error) {
        console.error("Error fetching communications:", error);
        res.status(500).json({ message: "Failed to fetch communications" });
      }
    },
  );

  app.post(
    "/api/communications/sync",
    isAuthenticated,
    logActivity("sync_communications"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const client = await getUncachableHubSpotClient();

        // Sync recent engagements
        const engagements =
          await client.crm.objects.meetings.basicApi.getPage(50);

        let syncedCount = 0;
        for (const engagement of engagements.results) {
          const hubspotId = engagement.id;
          const exists = await storage.hubspotCommunicationExists(hubspotId);
          if (!exists) {
            await storage.createHubspotCommunication({
              hubspotId,
              type: "meeting",
              subject:
                engagement.properties?.hs_meeting_title || "Untitled Meeting",
              body: engagement.properties?.hs_meeting_body || "",
              occurredAt: new Date(
                engagement.properties?.hs_meeting_start_time ||
                  engagement.createdAt,
              ),
              ownerId: userId,
              metadata: engagement.properties,
            });
            syncedCount++;
          }
        }

        res.json({ message: `Synced ${syncedCount} new communications` });
      } catch (error) {
        console.error("Error syncing communications:", error);
        res.status(500).json({ message: "Failed to sync communications" });
      }
    },
  );

  // Analytics routes (managers and admins only)
  app.get(
    "/api/analytics",
    isAuthenticated,
    logActivity("view_analytics"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);

        if (user?.role !== "manager" && user?.role !== "admin") {
          return res.status(403).json({ message: "Access denied" });
        }

        const timeRange = (req.query.timeRange as string) || "7d";

        const taskStats = await storage.getTaskStats(timeRange);
        const departmentStats = await storage.getDepartmentStats(timeRange);
        const userPerformance = await storage.getUserPerformance(timeRange);

        res.json({
          taskStats,
          departmentStats,
          userPerformance,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Failed to fetch analytics" });
      }
    },
  );

  // Admin routes (admins only)
  app.get(
    "/api/admin/users",
    isAuthenticated,
    logActivity("view_admin"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);

        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Access denied" });
        }

        const users = await storage.getAllUsers();
        res.json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
      }
    },
  );

  app.patch(
    "/api/admin/users/:id",
    isAuthenticated,
    logActivity("update_user", "user"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);

        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Access denied" });
        }

        const { id } = req.params;
        const updatedUser = await storage.updateUser(id, req.body);
        res.json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user" });
      }
    },
  );

  // ============================================
  // Microsoft 365 Data Sync Routes
  // ============================================

  // Calendar Sync Routes
  app.post("/api/calendar/sync", isAuthenticated, logActivity("sync_calendar"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { daysBack, daysForward, useDelta } = req.body || {};
      
      const result = await syncCalendarEvents(userId, { daysBack, daysForward, useDelta });
      
      if (result.success) {
        res.json({ 
          message: `Synced ${result.itemsProcessed} calendar events (${result.itemsCreated} created, ${result.itemsUpdated} updated)`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync calendar",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing calendar:", error);
      res.status(500).json({ message: "Failed to sync calendar" });
    }
  });

  app.get("/api/calendar/events", isAuthenticated, logActivity("view_calendar"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { start, end } = req.query;
      const startDate = start ? new Date(start as string) : undefined;
      const endDate = end ? new Date(end as string) : undefined;
      const events = await storage.getCalendarEvents(userId, startDate, endDate);
      res.json(events);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      res.status(500).json({ message: "Failed to fetch calendar events" });
    }
  });

  // Contacts Sync Routes
  app.post("/api/contacts/sync", isAuthenticated, logActivity("sync_contacts"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { pageSize, useDelta } = req.body || {};
      
      const result = await syncContacts(userId, { pageSize, useDelta });
      
      if (result.success) {
        res.json({ 
          message: `Synced ${result.itemsProcessed} contacts (${result.itemsCreated} created, ${result.itemsUpdated} updated)`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync contacts",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing contacts:", error);
      res.status(500).json({ message: "Failed to sync contacts" });
    }
  });

  app.get("/api/contacts", isAuthenticated, logActivity("view_contacts"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const contacts = await storage.getContacts(userId);
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/search", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const contacts = await storage.searchContacts(userId, query);
      res.json(contacts);
    } catch (error) {
      console.error("Error searching contacts:", error);
      res.status(500).json({ message: "Failed to search contacts" });
    }
  });

  // Drive Items (OneDrive/SharePoint) Sync Routes
  app.post("/api/drive/sync", isAuthenticated, logActivity("sync_drive"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { source, pageSize, recursive } = req.body || {};
      
      const result = await syncDriveItems(userId, { source, pageSize, recursive });
      
      if (result.success) {
        res.json({ 
          message: `Synced ${result.itemsProcessed} drive items (${result.itemsCreated} created, ${result.itemsUpdated} updated)`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync drive items",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing drive:", error);
      res.status(500).json({ message: "Failed to sync drive items" });
    }
  });

  app.get("/api/drive/items", isAuthenticated, logActivity("view_drive"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const source = req.query.source as string;
      const items = await storage.getDriveItems(userId, source);
      res.json(items);
    } catch (error) {
      console.error("Error fetching drive items:", error);
      res.status(500).json({ message: "Failed to fetch drive items" });
    }
  });

  app.get("/api/drive/search", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const items = await storage.searchDriveItems(userId, query);
      res.json(items);
    } catch (error) {
      console.error("Error searching drive items:", error);
      res.status(500).json({ message: "Failed to search drive items" });
    }
  });

  // Microsoft To Do Sync Routes
  app.post("/api/todo/sync", isAuthenticated, logActivity("sync_todo"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { includeTasks } = req.body || {};
      
      const result = await syncTodoLists(userId, { includeTasks });
      
      if (result.success) {
        res.json({ 
          message: `Synced ${result.itemsProcessed} todo items (${result.itemsCreated} created, ${result.itemsUpdated} updated)`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync To Do",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing To Do:", error);
      res.status(500).json({ message: "Failed to sync To Do" });
    }
  });

  app.get("/api/todo/lists", isAuthenticated, logActivity("view_todo"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const lists = await storage.getTodoLists(userId);
      res.json(lists);
    } catch (error) {
      console.error("Error fetching To Do lists:", error);
      res.status(500).json({ message: "Failed to fetch To Do lists" });
    }
  });

  app.get("/api/todo/tasks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tasks = await storage.getTodoTasksByUser(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching To Do tasks:", error);
      res.status(500).json({ message: "Failed to fetch To Do tasks" });
    }
  });

  app.get("/api/todo/lists/:listId/tasks", isAuthenticated, async (req: any, res) => {
    try {
      const { listId } = req.params;
      const tasks = await storage.getTodoTasks(listId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching list tasks:", error);
      res.status(500).json({ message: "Failed to fetch list tasks" });
    }
  });

  // ============================================
  // AI Features Routes
  // ============================================

  // AI Action Items
  app.get("/api/ai/action-items", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = req.query.status as string;
      const items = await storage.getAiActionItems(userId, status);
      res.json(items);
    } catch (error) {
      console.error("Error fetching action items:", error);
      res.status(500).json({ message: "Failed to fetch action items" });
    }
  });

  app.post("/api/ai/action-items", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { title, description, sourceType, sourceId, dueDate, priority, confidence } = req.body;
      
      const item = await storage.createAiActionItem({
        userId,
        title,
        description,
        sourceType,
        sourceId,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || "medium",
        status: "pending",
        extractedAt: new Date(),
        confidence: confidence || 0.8,
      });
      
      res.json(item);
    } catch (error) {
      console.error("Error creating action item:", error);
      res.status(500).json({ message: "Failed to create action item" });
    }
  });

  app.patch("/api/ai/action-items/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateAiActionItem(id, req.body);
      res.json(item);
    } catch (error) {
      console.error("Error updating action item:", error);
      res.status(500).json({ message: "Failed to update action item" });
    }
  });

  // AI Reminders
  app.get("/api/ai/reminders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = req.query.status as string;
      const reminders = await storage.getUserReminders(userId, status);
      res.json(reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  });

  app.post("/api/ai/reminders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { title, message, triggerAt, relatedType, relatedId, type, channel } = req.body;
      
      const reminder = await storage.createAiReminder({
        userId,
        title,
        message,
        triggerAt: new Date(triggerAt),
        relatedType,
        relatedId,
        type: type || "custom",
        channel: channel || "in_app",
        status: "pending",
      });
      
      res.json(reminder);
    } catch (error) {
      console.error("Error creating reminder:", error);
      res.status(500).json({ message: "Failed to create reminder" });
    }
  });

  app.patch("/api/ai/reminders/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const reminder = await storage.updateAiReminder(id, req.body);
      res.json(reminder);
    } catch (error) {
      console.error("Error updating reminder:", error);
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });

  app.get("/api/ai/reminders/pending", isAuthenticated, async (req: any, res) => {
    try {
      const before = req.query.before ? new Date(req.query.before as string) : undefined;
      const reminders = await storage.getPendingReminders(before);
      res.json(reminders);
    } catch (error) {
      console.error("Error fetching pending reminders:", error);
      res.status(500).json({ message: "Failed to fetch pending reminders" });
    }
  });

  // AI Notifications
  app.get("/api/ai/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = req.query.status as string;
      const notifications = await storage.getUserNotifications(userId, status);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/ai/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { title, body, type, channel } = req.body;
      
      const notification = await storage.createAiNotification({
        userId,
        title,
        body: body || "",
        type: type || "alert",
        channel: channel || "in_app",
        status: "pending",
      });
      
      res.json(notification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  app.patch("/api/ai/notifications/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await storage.updateAiNotification(id, req.body);
      res.json(notification);
    } catch (error) {
      console.error("Error updating notification:", error);
      res.status(500).json({ message: "Failed to update notification" });
    }
  });

  app.post("/api/ai/notifications/mark-all-read", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const notifications = await storage.getUserNotifications(userId, "unread");
      for (const notification of notifications) {
        await storage.updateAiNotification(notification.id, { status: "read" });
      }
      res.json({ message: `Marked ${notifications.length} notifications as read` });
    } catch (error) {
      console.error("Error marking notifications:", error);
      res.status(500).json({ message: "Failed to mark notifications" });
    }
  });

  // AI Insights
  app.get("/api/ai/insights", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const type = req.query.type as string;
      const insights = await storage.getAiInsights(userId, type);
      res.json(insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.post("/api/ai/insights", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { type, title, summary, data, score, scope } = req.body;
      
      const insight = await storage.createAiInsight({
        userId,
        type,
        title,
        summary,
        data: data || {},
        score,
        scope: scope || "user",
        generatedAt: new Date(),
      });
      
      res.json(insight);
    } catch (error) {
      console.error("Error creating insight:", error);
      res.status(500).json({ message: "Failed to create insight" });
    }
  });

  // ============================================
  // Sync Status Routes
  // ============================================

  app.get("/api/sync/status", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const states = await storage.getSyncStatesForUser(userId);
      res.json(states);
    } catch (error) {
      console.error("Error fetching sync status:", error);
      res.status(500).json({ message: "Failed to fetch sync status" });
    }
  });

  app.get("/api/sync/jobs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
      const jobs = await storage.getRecentSyncJobs(userId, limit);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching sync jobs:", error);
      res.status(500).json({ message: "Failed to fetch sync jobs" });
    }
  });

  app.post("/api/sync/full", isAuthenticated, logActivity("full_sync"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { 
        includeCalendar, 
        includeContacts, 
        includeDrive, 
        includeTodo, 
        includeChat, 
        includePresence 
      } = req.body || {};
      
      const result = await syncAllResources(userId, {
        includeCalendar,
        includeContacts,
        includeDrive,
        includeTodo,
        includeChat,
        includePresence,
      });
      
      res.json({ 
        message: result.summary,
        success: result.success,
        results: result.results,
      });
    } catch (error) {
      console.error("Error initiating full sync:", error);
      res.status(500).json({ message: "Failed to initiate full sync" });
    }
  });

  // ============================================
  // AI Extraction and Processing Routes
  // ============================================

  app.post("/api/ai/extract-action-items", isAuthenticated, logActivity("extract_action_items"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { daysBack, daysForward } = req.body || {};
      
      const result = await extractActionItemsFromCalendar(userId, { daysBack, daysForward });
      
      res.json({
        success: result.success,
        itemsCreated: result.itemsCreated,
        summary: result.summary,
        errors: result.errors,
      });
    } catch (error) {
      console.error("Error extracting action items:", error);
      res.status(500).json({ message: "Failed to extract action items" });
    }
  });

  app.post("/api/ai/generate-daily-digest", isAuthenticated, logActivity("generate_digest"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.body || {};
      
      const result = await generateDailyDigest(userId, { 
        date: date ? new Date(date) : undefined 
      });
      
      res.json({
        success: result.success,
        itemsCreated: result.itemsCreated,
        summary: result.summary,
        errors: result.errors,
      });
    } catch (error) {
      console.error("Error generating daily digest:", error);
      res.status(500).json({ message: "Failed to generate daily digest" });
    }
  });

  app.post("/api/ai/schedule-reminders", isAuthenticated, logActivity("schedule_reminders"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { daysAhead, reminderMinutesBefore } = req.body || {};
      
      const result = await scheduleUpcomingReminders(userId, { 
        daysAhead, 
        reminderMinutesBefore 
      });
      
      res.json({
        success: result.success,
        itemsCreated: result.itemsCreated,
        summary: result.summary,
        errors: result.errors,
      });
    } catch (error) {
      console.error("Error scheduling reminders:", error);
      res.status(500).json({ message: "Failed to schedule reminders" });
    }
  });

  // Chat Sync Routes
  app.post("/api/chat/sync", isAuthenticated, logActivity("sync_chat"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { limit, includeMessages, messagesPerChat } = req.body || {};
      
      const result = await syncChatThreads(userId, { limit, includeMessages, messagesPerChat });
      
      if (result.success) {
        res.json({ 
          message: `Synced ${result.itemsProcessed} chat items (${result.itemsCreated} created, ${result.itemsUpdated} updated)`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync chats",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing chats:", error);
      res.status(500).json({ message: "Failed to sync chats" });
    }
  });

  // Presence Sync Routes
  app.post("/api/presence/sync", isAuthenticated, logActivity("sync_presence"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const result = await syncPresence(userId);
      
      if (result.success) {
        res.json({ 
          message: `Synced presence status`,
          result
        });
      } else {
        res.status(500).json({ 
          message: "Failed to sync presence",
          errors: result.errors
        });
      }
    } catch (error) {
      console.error("Error syncing presence:", error);
      res.status(500).json({ message: "Failed to sync presence" });
    }
  });

  // ===== SYNC MANAGEMENT ROUTES =====

  // Manual sync for authenticated user - sync their own data
  app.post(
    "/api/sync/manual",
    isAuthenticated,
    logActivity("manual_sync"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const { resources } = req.body;
        
        await manualSyncUser(userId, resources);
        
        res.json({ 
          message: "Sync jobs queued successfully",
          resources: resources || ["presence", "calendar", "todo", "chat", "contacts", "drive"]
        });
      } catch (error) {
        console.error("Error queuing manual sync:", error);
        res.status(500).json({ message: "Failed to queue sync jobs" });
      }
    }
  );

  // Get sync status for authenticated user
  app.get(
    "/api/sync/status",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        
        const recentJobs = await storage.getRecentSyncJobs(userId, 10);
        const syncStates = await storage.getAllUserSyncStates(userId);
        
        res.json({
          recentJobs,
          syncStates,
          queueStats: getQueueStats()
        });
      } catch (error) {
        console.error("Error getting sync status:", error);
        res.status(500).json({ message: "Failed to get sync status" });
      }
    }
  );

  // ===== ADMIN SYNC ROUTES =====

  // Get queue stats (admin only)
  app.get(
    "/api/admin/sync/stats",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        
        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
        
        const stats = getQueueStats();
        res.json(stats);
      } catch (error) {
        console.error("Error getting sync stats:", error);
        res.status(500).json({ message: "Failed to get sync stats" });
      }
    }
  );

  // Trigger sync for all users (admin only)
  app.post(
    "/api/admin/sync/all",
    isAuthenticated,
    logActivity("admin_sync_all"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        
        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
        
        const { resourceType } = req.body;
        
        if (resourceType) {
          await enqueueSyncForAllUsers(resourceType);
          res.json({ message: `Queued ${resourceType} sync for all users` });
        } else {
          const types = ["presence", "calendar", "todo", "chat", "contacts", "drive"];
          for (const type of types) {
            await enqueueSyncForAllUsers(type);
          }
          res.json({ message: "Queued full sync for all users" });
        }
      } catch (error) {
        console.error("Error triggering admin sync:", error);
        res.status(500).json({ message: "Failed to trigger sync" });
      }
    }
  );

  // Get recent sync jobs for all users (admin only)
  app.get(
    "/api/admin/sync/jobs",
    isAuthenticated,
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        
        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
        
        const limit = parseInt(req.query.limit as string) || 50;
        const jobs = await storage.getAllRecentSyncJobs(limit);
        
        res.json(jobs);
      } catch (error) {
        console.error("Error getting sync jobs:", error);
        res.status(500).json({ message: "Failed to get sync jobs" });
      }
    }
  );

  // Sync specific user (admin only)
  app.post(
    "/api/admin/sync/user/:targetUserId",
    isAuthenticated,
    logActivity("admin_sync_user"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const user = await storage.getUser(userId);
        
        if (user?.role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
        
        const { targetUserId } = req.params;
        const { resources } = req.body;
        
        await manualSyncUser(targetUserId, resources);
        
        res.json({ 
          message: `Sync queued for user ${targetUserId}`,
          resources: resources || ["presence", "calendar", "todo", "chat", "contacts", "drive"]
        });
      } catch (error) {
        console.error("Error triggering user sync:", error);
        res.status(500).json({ message: "Failed to trigger user sync" });
      }
    }
  );

  const httpServer = createServer(app);

  return httpServer;
}
