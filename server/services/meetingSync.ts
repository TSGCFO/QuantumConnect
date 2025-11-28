import { storage } from "../storage";
import {
  getTeamsAppClient,
  getUserOnlineMeetings,
  getAllOnlineMeetings,
  getAllMeetingTranscripts,
} from "../integrations/teams-app";

interface MeetingSyncResult {
  success: boolean;
  meetingsProcessed: number;
  meetingsWithTranscripts: number;
  errors: string[];
}

interface TranscriptSyncResult {
  success: boolean;
  meetingId: string;
  hasTranscript: boolean;
  error?: string;
}

export async function syncUserMeetingsWithTranscripts(
  userId: string,
  userPrincipalName: string
): Promise<MeetingSyncResult> {
  console.log(`[MeetingSync] Starting meeting sync for user ${userId} (${userPrincipalName})`);
  
  const errors: string[] = [];
  let meetingsProcessed = 0;
  let meetingsWithTranscripts = 0;
  
  try {
    const meetings = await getUserOnlineMeetings(userPrincipalName);
    console.log(`[MeetingSync] Found ${meetings.length} online meetings for ${userPrincipalName}`);
    
    for (const meeting of meetings) {
      try {
        const result = await processMeetingWithTranscript(userId, userPrincipalName, meeting);
        meetingsProcessed++;
        
        if (result.hasTranscript) {
          meetingsWithTranscripts++;
        }
        
        if (result.error) {
          errors.push(result.error);
        }
      } catch (error: any) {
        errors.push(`Meeting ${meeting.id}: ${error.message}`);
      }
    }
    
    console.log(`[MeetingSync] Completed: ${meetingsProcessed} meetings processed, ${meetingsWithTranscripts} with transcripts`);
    
    return {
      success: true,
      meetingsProcessed,
      meetingsWithTranscripts,
      errors,
    };
  } catch (error: any) {
    console.error(`[MeetingSync] Error syncing meetings for user ${userId}:`, error);
    return {
      success: false,
      meetingsProcessed,
      meetingsWithTranscripts,
      errors: [error.message],
    };
  }
}

export async function syncOrgMeetingsWithTranscripts(): Promise<MeetingSyncResult> {
  console.log("[MeetingSync] Starting org-wide meeting sync");
  
  const errors: string[] = [];
  let meetingsProcessed = 0;
  let meetingsWithTranscripts = 0;
  
  try {
    const allMeetings = await getAllOnlineMeetings();
    console.log(`[MeetingSync] Found ${allMeetings.length} unique online meetings across organization`);
    
    for (const meeting of allMeetings) {
      try {
        const userPrincipalName = meeting.organizerEmail || meeting.calendarOwnerEmail;
        
        if (!userPrincipalName) {
          continue;
        }
        
        // Try to find user by MS user profile
        let userId: string | null = null;
        if (meeting.organizerId) {
          const profile = await storage.getMsUserProfileByMsUserId(meeting.organizerId);
          if (profile) {
            userId = profile.userId;
          }
        }
        
        const result = await processMeetingWithTranscript(
          userId || null,
          userPrincipalName,
          meeting
        );
        
        meetingsProcessed++;
        
        if (result.hasTranscript) {
          meetingsWithTranscripts++;
        }
        
        if (result.error) {
          errors.push(result.error);
        }
      } catch (error: any) {
        errors.push(`Meeting ${meeting.id}: ${error.message}`);
      }
    }
    
    console.log(`[MeetingSync] Org sync completed: ${meetingsProcessed} meetings, ${meetingsWithTranscripts} with transcripts`);
    
    return {
      success: true,
      meetingsProcessed,
      meetingsWithTranscripts,
      errors,
    };
  } catch (error: any) {
    console.error("[MeetingSync] Error in org-wide meeting sync:", error);
    return {
      success: false,
      meetingsProcessed,
      meetingsWithTranscripts,
      errors: [error.message],
    };
  }
}

async function processMeetingWithTranscript(
  userId: string | null,
  userPrincipalName: string,
  meeting: any
): Promise<TranscriptSyncResult> {
  // Use calendar event ID for storage, but onlineMeetingId for transcript retrieval
  const calendarEventId = meeting.id;
  const onlineMeetingId = meeting.onlineMeetingId;
  
  try {
    const existing = await storage.getMeetingBySourceId(calendarEventId, "teams");
    
    const attendees = (meeting.participants || []).map((p: any) => p.email).filter(Boolean);
    
    let transcript: string | null = null;
    let hasTranscript = false;
    
    // Only attempt transcript retrieval if we have an onlineMeetingId
    if (onlineMeetingId) {
      try {
        transcript = await getAllMeetingTranscripts(onlineMeetingId, userPrincipalName);
        hasTranscript = !!transcript;
        if (hasTranscript) {
          console.log(`[MeetingSync] Retrieved transcript for meeting ${calendarEventId}`);
        }
      } catch (transcriptError: any) {
        // Transcripts may not be available for most meetings - this is normal
      }
    }
    
    await storage.upsertMeeting({
      title: meeting.subject || "Untitled Meeting",
      description: meeting.bodyPreview || null,
      meetingDate: meeting.startDateTime ? new Date(meeting.startDateTime) : new Date(),
      attendees: attendees.length > 0 ? attendees : null,
      transcript: transcript,
      summary: null,
      actionItems: null,
      source: "teams",
      sourceId: calendarEventId,
      uploadedById: userId,
    });
    
    return {
      success: true,
      meetingId: calendarEventId,
      hasTranscript,
    };
  } catch (error: any) {
    console.error(`[MeetingSync] Error processing meeting ${calendarEventId}:`, error);
    return {
      success: false,
      meetingId: calendarEventId,
      hasTranscript: false,
      error: error.message,
    };
  }
}

export async function getOnlineMeetingsForUser(userPrincipalName: string) {
  return await getUserOnlineMeetings(userPrincipalName);
}

export async function getOrganizationOnlineMeetings() {
  return await getAllOnlineMeetings();
}
