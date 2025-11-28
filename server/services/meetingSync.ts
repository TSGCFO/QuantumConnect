import { storage } from "../storage";
import {
  getUserOnlineMeetings,
  getAllOnlineMeetings,
  getAllMeetingTranscripts,
  getMeetingRecordings,
  getMeetingAttendanceReports,
  getMeetingAttendanceReportDetails,
} from "../integrations/teams-app";

interface MeetingSyncResult {
  success: boolean;
  meetingsProcessed: number;
  meetingsWithTranscripts: number;
  meetingsWithRecordings: number;
  meetingsWithAttendance: number;
  errors: string[];
}

interface TranscriptSyncResult {
  success: boolean;
  meetingId: string;
  hasTranscript: boolean;
  hasRecording: boolean;
  hasAttendance: boolean;
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
  let meetingsWithRecordings = 0;
  let meetingsWithAttendance = 0;
  
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
        if (result.hasRecording) {
          meetingsWithRecordings++;
        }
        if (result.hasAttendance) {
          meetingsWithAttendance++;
        }
        
        if (result.error) {
          errors.push(result.error);
        }
      } catch (error: any) {
        errors.push(`Meeting ${meeting.id}: ${error.message}`);
      }
    }
    
    console.log(`[MeetingSync] Completed: ${meetingsProcessed} meetings, ${meetingsWithTranscripts} transcripts, ${meetingsWithRecordings} recordings, ${meetingsWithAttendance} attendance reports`);
    
    return {
      success: true,
      meetingsProcessed,
      meetingsWithTranscripts,
      meetingsWithRecordings,
      meetingsWithAttendance,
      errors,
    };
  } catch (error: any) {
    console.error(`[MeetingSync] Error syncing meetings for user ${userId}:`, error);
    return {
      success: false,
      meetingsProcessed,
      meetingsWithTranscripts,
      meetingsWithRecordings,
      meetingsWithAttendance,
      errors: [error.message],
    };
  }
}

export async function syncOrgMeetingsWithTranscripts(): Promise<MeetingSyncResult> {
  console.log("[MeetingSync] Starting org-wide meeting sync");
  
  const errors: string[] = [];
  let meetingsProcessed = 0;
  let meetingsWithTranscripts = 0;
  let meetingsWithRecordings = 0;
  let meetingsWithAttendance = 0;
  
  try {
    const allMeetings = await getAllOnlineMeetings();
    console.log(`[MeetingSync] Found ${allMeetings.length} unique online meetings across organization`);
    
    for (const meeting of allMeetings) {
      try {
        const userPrincipalName = meeting.organizerEmail || meeting.calendarOwnerEmail;
        
        if (!userPrincipalName) {
          continue;
        }
        
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
        if (result.hasRecording) {
          meetingsWithRecordings++;
        }
        if (result.hasAttendance) {
          meetingsWithAttendance++;
        }
        
        if (result.error) {
          errors.push(result.error);
        }
      } catch (error: any) {
        errors.push(`Meeting ${meeting.id}: ${error.message}`);
      }
    }
    
    console.log(`[MeetingSync] Org sync completed: ${meetingsProcessed} meetings, ${meetingsWithTranscripts} transcripts, ${meetingsWithRecordings} recordings, ${meetingsWithAttendance} attendance`);
    
    return {
      success: true,
      meetingsProcessed,
      meetingsWithTranscripts,
      meetingsWithRecordings,
      meetingsWithAttendance,
      errors,
    };
  } catch (error: any) {
    console.error("[MeetingSync] Error in org-wide meeting sync:", error);
    return {
      success: false,
      meetingsProcessed,
      meetingsWithTranscripts,
      meetingsWithRecordings,
      meetingsWithAttendance,
      errors: [error.message],
    };
  }
}

async function processMeetingWithTranscript(
  userId: string | null,
  userPrincipalName: string,
  meeting: any
): Promise<TranscriptSyncResult> {
  const calendarEventId = meeting.id;
  const onlineMeetingId = meeting.onlineMeetingId;
  
  try {
    const existing = await storage.getMeetingBySourceId(calendarEventId, "teams");
    
    const attendees = (meeting.participants || []).map((p: any) => p.email).filter(Boolean);
    
    let transcript: string | null = null;
    let hasTranscript = false;
    let recordingUrls: string[] = [];
    let hasRecording = false;
    let attendanceReport: any = null;
    let hasAttendance = false;
    
    if (onlineMeetingId) {
      try {
        transcript = await getAllMeetingTranscripts(onlineMeetingId, userPrincipalName);
        hasTranscript = !!transcript;
        if (hasTranscript) {
          console.log(`[MeetingSync] Retrieved transcript for meeting ${calendarEventId}`);
        }
      } catch (transcriptError: any) {
      }
      
      try {
        recordingUrls = await getMeetingRecordings(onlineMeetingId, userPrincipalName);
        hasRecording = recordingUrls.length > 0;
        if (hasRecording) {
          console.log(`[MeetingSync] Found ${recordingUrls.length} recording(s) for meeting ${calendarEventId}`);
        }
      } catch (recordingError: any) {
      }
      
      try {
        const reports = await getMeetingAttendanceReports(onlineMeetingId, userPrincipalName);
        if (reports.length > 0) {
          const latestReport = reports[0];
          attendanceReport = await getMeetingAttendanceReportDetails(
            onlineMeetingId,
            latestReport.id,
            userPrincipalName
          );
          hasAttendance = !!attendanceReport;
          if (hasAttendance) {
            console.log(`[MeetingSync] Retrieved attendance for meeting ${calendarEventId}: ${attendanceReport.totalAttendeeCount} attendees`);
          }
        }
      } catch (attendanceError: any) {
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
    
    if (hasRecording || hasAttendance) {
      await storage.updateMeetingMetadata(calendarEventId, "teams", {
        onlineMeetingId,
        recordingUrls: hasRecording ? recordingUrls : undefined,
        attendanceReport: hasAttendance ? attendanceReport : undefined,
        hasRecording,
        hasAttendanceReport: hasAttendance,
      });
    }
    
    return {
      success: true,
      meetingId: calendarEventId,
      hasTranscript,
      hasRecording,
      hasAttendance,
    };
  } catch (error: any) {
    console.error(`[MeetingSync] Error processing meeting ${calendarEventId}:`, error);
    return {
      success: false,
      meetingId: calendarEventId,
      hasTranscript: false,
      hasRecording: false,
      hasAttendance: false,
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
