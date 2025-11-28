import { Client } from "@microsoft/microsoft-graph-client";
import { getDirectGraphClient, isDirectGraphConfigured, getMissingCredentials } from "./microsoft-graph";

/**
 * Teams application-level authentication module
 * Uses the same Azure AD app-only credentials as microsoft-graph.ts
 * for consistent authentication across all M365 operations
 */

// Get the Teams client using the shared Azure AD client credentials
export async function getTeamsAppClient(): Promise<Client> {
  if (!isDirectGraphConfigured()) {
    const missing = getMissingCredentials();
    throw new Error(
      `Microsoft Graph API not configured for Teams. Missing: ${missing.join(", ")}. ` +
      `Please add the Azure AD app credentials to enable Teams integration.`
    );
  }
  
  // Use the shared Graph client from microsoft-graph.ts
  return getDirectGraphClient();
}

// Get the current user's principal name (email)
// Note: getUserPrincipalName() has been removed - app-only auth cannot use /me endpoint
// The user's principal name should be retrieved from storage (user.email) instead
// See getUserPrincipalNameFromStorage() in routes.ts for the replacement implementation

// Helper function to convert calendar events to meeting format
function convertCalendarEventToMeeting(event: any) {
  // Only process if it's an online meeting
  if (!event.isOnlineMeeting || !event.onlineMeeting) {
    return null;
  }
  
  // Extract attendee emails
  const participants = event.attendees?.map((attendee: any) => ({
    email: attendee.emailAddress?.address,
    name: attendee.emailAddress?.name,
    status: attendee.status?.response,
    type: attendee.type
  })) || [];
  
  // Get the online meeting ID from the join URL if not directly available
  const joinUrl = event.onlineMeeting?.joinUrl || event.onlineMeetingUrl;
  let onlineMeetingId = event.onlineMeeting?.id || null;
  
  // If no direct ID, try to extract from join URL
  if (!onlineMeetingId && joinUrl) {
    onlineMeetingId = extractOnlineMeetingIdFromUrl(joinUrl);
  }
  
  return {
    id: event.id,                    // Calendar event ID
    onlineMeetingId: onlineMeetingId, // Teams online meeting ID (for transcript retrieval)
    subject: event.subject || "Untitled Meeting",
    startDateTime: event.start?.dateTime,
    endDateTime: event.end?.dateTime,
    createdDateTime: event.createdDateTime,
    joinUrl: joinUrl,
    participants: participants,
    organizer: event.organizer?.emailAddress,
    bodyPreview: event.bodyPreview,
    location: event.location?.displayName,
    isOnlineMeeting: true,
    // Additional fields from the calendar event
    meetingProvider: event.onlineMeetingProvider || "teamsForBusiness",
    webLink: event.webLink,
    categories: event.categories || [],
    importance: event.importance,
    isAllDay: event.isAllDay || false,
    isCancelled: event.isCancelled || false,
    responseStatus: event.responseStatus
  };
}

// Extract online meeting ID from join URL
function extractOnlineMeetingIdFromUrl(joinUrl: string): string | null {
  if (!joinUrl) return null;
  
  try {
    const url = new URL(joinUrl);
    const pathParts = url.pathname.split('/');
    
    // Look for the meeting identifier in the path
    // Teams join URLs: https://teams.microsoft.com/l/meetup-join/19%3ameeting_...
    for (const part of pathParts) {
      if (part.includes('meeting_') || part.startsWith('19%3a') || part.startsWith('19:')) {
        return decodeURIComponent(part);
      }
    }
    
    // Try thread ID from query string
    const threadId = url.searchParams.get('threadId');
    if (threadId) return threadId;
    
    return null;
  } catch {
    return null;
  }
}

// Get online meetings for a specific user by fetching calendar events (app-only access)
export async function getUserOnlineMeetings(userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getUserOnlineMeetings requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const calendarPath = `/users/${userPrincipalName}/calendar/events`;
    
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const now = new Date();
    
    const filter = `start/dateTime ge '${twoYearsAgo.toISOString()}' and start/dateTime le '${now.toISOString()}'`;
    
    const response = await client
      .api(calendarPath)
      .filter(filter)
      .select("id,subject,start,end,bodyPreview,onlineMeeting,onlineMeetingUrl,attendees,organizer,isOnlineMeeting,createdDateTime,location,webLink,categories,importance,isAllDay,isCancelled,responseStatus,onlineMeetingProvider")
      .orderby("start/dateTime desc")
      .top(999)
      .get();
    
    const events = response.value || [];
    const onlineMeetings = events.filter((event: any) => event.isOnlineMeeting === true);
    const meetings = onlineMeetings
      .map(convertCalendarEventToMeeting)
      .filter(Boolean);
    
    return meetings;
  } catch (error) {
    console.error("Error fetching online meetings from calendar:", error);
    
    try {
      const calendarViewPath = `/users/${userPrincipalName}/calendarView`;
      
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      const now = new Date();
      
      const response = await client
        .api(calendarViewPath)
        .query({
          startDateTime: twoYearsAgo.toISOString(),
          endDateTime: now.toISOString()
        })
        .select("id,subject,start,end,bodyPreview,onlineMeeting,onlineMeetingUrl,attendees,organizer,isOnlineMeeting,createdDateTime,location,webLink,categories,importance,isAllDay,isCancelled,responseStatus,onlineMeetingProvider")
        .orderby("start/dateTime desc")
        .top(999)
        .get();
      
      const events = response.value || [];
      const onlineMeetings = events.filter((event: any) => event.isOnlineMeeting === true);
      const meetings = onlineMeetings
        .map(convertCalendarEventToMeeting)
        .filter(Boolean);
      
      return meetings;
    } catch (fallbackError) {
      console.error("Error fetching online meetings from calendarView:", fallbackError);
      return [];
    }
  }
}

// Get ALL online meetings for the entire organization (requires admin permissions)
export async function getAllOnlineMeetings() {
  const client = await getTeamsAppClient();
  
  try {
    // Get all users in the organization first
    const usersResponse = await client
      .api("/users")
      .select("userPrincipalName,mail,displayName,id")
      .filter("accountEnabled eq true")
      .top(999)
      .get();
    
    const users = usersResponse.value || [];
    const allMeetings = [];
    
    // Fetch meetings for each user using calendar API
    for (const user of users) {
      if (!user.userPrincipalName) continue;
      
      try {
        const meetings = await getUserOnlineMeetings(user.userPrincipalName);
        
        // Add user info to each meeting if not already present
        const meetingsWithUser = meetings.map((meeting: any) => ({
          ...meeting,
          // Preserve organizer from calendar event if available, otherwise use user info
          organizerEmail: meeting.organizer?.address || user.userPrincipalName,
          organizerName: meeting.organizer?.name || user.displayName,
          organizerId: user.id,
          // Add the user who owns this calendar entry (might be different from organizer)
          calendarOwnerEmail: user.userPrincipalName,
          calendarOwnerName: user.displayName
        }));
        
        allMeetings.push(...meetingsWithUser);
      } catch (userError) {
        console.error(`Error fetching meetings for user ${user.userPrincipalName}:`, userError);
        // Continue with other users even if one fails
      }
    }
    
    // Remove duplicates (same meeting might appear in multiple calendars)
    const uniqueMeetings = new Map();
    allMeetings.forEach((meeting) => {
      // Use meeting ID as unique identifier
      if (!uniqueMeetings.has(meeting.id)) {
        uniqueMeetings.set(meeting.id, meeting);
      }
    });
    
    // Convert map to array and sort by date
    const sortedMeetings = Array.from(uniqueMeetings.values()).sort((a, b) => {
      const dateA = new Date(a.startDateTime).getTime();
      const dateB = new Date(b.startDateTime).getTime();
      return dateB - dateA; // Descending order (newest first)
    });
    
    return sortedMeetings;
  } catch (error) {
    console.error("Error fetching all organization meetings:", error);
    throw error;
  }
}

// List available transcripts for a meeting (app-only access)
export async function listMeetingTranscripts(onlineMeetingId: string, userPrincipalName: string): Promise<any[]> {
  if (!userPrincipalName) {
    console.warn("[Teams] listMeetingTranscripts requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${onlineMeetingId}/transcripts`;
    
    const response = await client
      .api(basePath)
      .select("id,createdDateTime,meetingId,meetingOrganizerId")
      .get();
    
    return response.value || [];
  } catch (error: any) {
    if (error?.statusCode === 404 || error?.code === "NotFound") {
      return [];
    }
    console.error(`Error listing transcripts for meeting ${onlineMeetingId}:`, error?.message);
    return [];
  }
}

// Get meeting transcript content (app-only access)
export async function getMeetingTranscript(meetingId: string, transcriptId: string, userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getMeetingTranscript requires userPrincipalName for app-only access");
    return null;
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/transcripts/${transcriptId}/content`)
      .get();
    
    return response;
  } catch (error) {
    console.error(`Error fetching transcript for meeting ${meetingId}:`, error);
    return null;
  }
}

// Get all transcripts content for a meeting (concatenated) - app-only access
export async function getAllMeetingTranscripts(onlineMeetingId: string, userPrincipalName: string): Promise<string | null> {
  if (!userPrincipalName) {
    console.warn("[Teams] getAllMeetingTranscripts requires userPrincipalName for app-only access");
    return null;
  }
  
  try {
    const transcripts = await listMeetingTranscripts(onlineMeetingId, userPrincipalName);
    
    if (transcripts.length === 0) {
      return null;
    }
    
    const transcriptContents: string[] = [];
    
    for (const transcript of transcripts) {
      const content = await getMeetingTranscript(onlineMeetingId, transcript.id, userPrincipalName);
      if (content) {
        transcriptContents.push(content);
      }
    }
    
    return transcriptContents.length > 0 ? transcriptContents.join("\n\n---\n\n") : null;
  } catch (error) {
    console.error(`Error fetching all transcripts for meeting ${onlineMeetingId}:`, error);
    return null;
  }
}

// Get meeting attendance reports (app-only access)
export async function getMeetingAttendanceReports(meetingId: string, userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getMeetingAttendanceReports requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/attendanceReports`)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching attendance reports for meeting ${meetingId}:`, error);
    return [];
  }
}

// Get detailed attendance report with attendees
export async function getMeetingAttendanceReportDetails(
  meetingId: string,
  reportId: string,
  userPrincipalName: string
): Promise<{
  totalAttendeeCount: number;
  attendees: Array<{
    email: string;
    totalAttendanceInSeconds: number;
    role: string;
  }>;
} | null> {
  if (!userPrincipalName) {
    return null;
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/attendanceReports/${reportId}?$expand=attendanceRecords`)
      .get();
    
    const attendees = (response.attendanceRecords || []).map((record: any) => ({
      email: record.emailAddress || record.identity?.email || "",
      totalAttendanceInSeconds: record.totalAttendanceInSeconds || 0,
      role: record.role || "attendee",
    }));
    
    return {
      totalAttendeeCount: response.totalParticipantCount || attendees.length,
      attendees,
    };
  } catch (error) {
    console.error(`Error fetching attendance report details for meeting ${meetingId}:`, error);
    return null;
  }
}

// Get meeting recordings
export async function getMeetingRecordings(meetingId: string, userPrincipalName: string): Promise<string[]> {
  if (!userPrincipalName) {
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/recordings`)
      .get();
    
    const recordings = response.value || [];
    return recordings
      .map((recording: any) => recording.recordingContentUrl || recording.contentUrl)
      .filter(Boolean);
  } catch (error: any) {
    if (error.statusCode !== 404 && error.statusCode !== 403) {
      console.error(`Error fetching recordings for meeting ${meetingId}:`, error);
    }
    return [];
  }
}

// Get user's calendar events (including Teams meetings) - app-only access
export async function getUserCalendarEvents(userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getUserCalendarEvents requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const calendarPath = `/users/${userPrincipalName}/calendar/calendarView`;
    
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const startDateTime = twoYearsAgo.toISOString();
    
    const endDateTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const response = await client
      .api(calendarPath)
      .query({
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      })
      .select("id,subject,start,end,location,attendees,onlineMeeting,isOnlineMeeting,organizer")
      .orderby("start/dateTime")
      .top(999)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

// Check if user has admin role
export async function isUserAdmin(userId: string): Promise<boolean> {
  const client = await getTeamsAppClient();
  
  try {
    // Check for Global Administrator or Teams Administrator roles
    const response = await client
      .api(`/users/${userId}/memberOf`)
      .filter("startswith(displayName, 'Administrator') or startswith(displayName, 'Admin')")
      .get();
    
    const roles = response.value || [];
    
    // Check for specific admin roles
    const adminRoleNames = [
      'Global Administrator',
      'Teams Administrator',
      'Application Administrator',
      'User Administrator'
    ];
    
    return roles.some((role: any) => 
      adminRoleNames.some(adminRole => 
        role.displayName && role.displayName.includes(adminRole)
      )
    );
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// Get Teams for a user (app-only access)
export async function getUserTeams(userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getUserTeams requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const teamsPath = `/users/${userPrincipalName}/joinedTeams`;
    
    const response = await client
      .api(teamsPath)
      .select("id,displayName,description")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching user teams:", error);
    return [];
  }
}

// Get channels for a team
export async function getTeamChannels(teamId: string) {
  const client = await getTeamsAppClient();
  
  try {
    const response = await client
      .api(`/teams/${teamId}/channels`)
      .select("id,displayName,description")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching channels for team ${teamId}:`, error);
    return [];
  }
}

// Get messages from a channel
export async function getChannelMessages(teamId: string, channelId: string, top: number = 50) {
  const client = await getTeamsAppClient();
  
  try {
    const response = await client
      .api(`/teams/${teamId}/channels/${channelId}/messages`)
      .top(top)
      .expand("replies")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching messages for channel ${channelId}:`, error);
    return [];
  }
}

// Get user's chats (app-only access)
export async function getUserChats(top: number = 50, userPrincipalName: string) {
  if (!userPrincipalName) {
    console.warn("[Teams] getUserChats requires userPrincipalName for app-only access");
    return [];
  }
  
  const client = await getTeamsAppClient();
  
  try {
    const chatsPath = `/users/${userPrincipalName}/chats`;
    
    const response = await client
      .api(chatsPath)
      .top(top)
      .expand("members")
      .select("id,topic,chatType,createdDateTime,lastUpdatedDateTime,members")
      .orderby("lastUpdatedDateTime desc")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return [];
  }
}

// Get messages from a chat
export async function getChatMessages(chatId: string, top: number = 50) {
  const client = await getTeamsAppClient();
  
  try {
    const response = await client
      .api(`/chats/${chatId}/messages`)
      .top(top)
      .select("id,body,from,createdDateTime,attachments,importance")
      .orderby("createdDateTime desc")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching messages for chat ${chatId}:`, error);
    return [];
  }
}