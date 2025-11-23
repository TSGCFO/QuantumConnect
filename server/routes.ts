import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { summarizeMeeting, answerDocumentQuestion } from "./openai";
import { getUncachableOutlookClient } from "./integrations/outlook";
import { getUncachableHubSpotClient } from "./integrations/hubspot";

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

      const answer = await answerDocumentQuestion(question, docsWithContent);
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

        const { summary, actionItems } = await summarizeMeeting(transcript);

        const meeting = await storage.createMeeting({
          title,
          description,
          meetingDate: new Date(meetingDate),
          transcript,
          summary,
          actionItems,
          source: "manual",
          uploadedById: userId,
        });

        // Create tasks from action items
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

  const httpServer = createServer(app);

  return httpServer;
}
