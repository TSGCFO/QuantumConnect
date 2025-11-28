import { Client } from "@microsoft/microsoft-graph-client";
import { getDirectGraphClient, isDirectGraphConfigured, getMissingCredentials } from "./microsoft-graph";

/**
 * Teams application-level integration module
 * Uses app-only authentication via ClientSecretCredential for broader access to organizational data
 * All Microsoft 365 access now runs through the unified microsoft-graph.ts client
 */

function ensureGraphConfigured(): void {
  if (!isDirectGraphConfigured()) {
    const missing = getMissingCredentials();
    throw new Error(
      `Microsoft Graph API not configured. Missing: ${missing.join(", ")}. ` +
      `Please add the Azure AD app credentials to enable Microsoft 365 sync.`
    );
  }
}

export function getTeamsAppClient(): Client {
  ensureGraphConfigured();
  return getDirectGraphClient();
}

export async function getUserPrincipalName(msUserId: string): Promise<string> {
  if (!msUserId) {
    throw new Error("msUserId is required for app-only authentication - /me endpoint is not supported");
  }
  
  const client = getTeamsAppClient();
  
  try {
    const response = await client
      .api(`/users/${msUserId}`)
      .select("userPrincipalName,mail")
      .get();
    
    return response.userPrincipalName || response.mail || "";
  } catch (error) {
    console.error("Error fetching user principal name:", error);
    throw error;
  }
}

function convertCalendarEventToMeeting(event: any) {
  if (!event.isOnlineMeeting || !event.onlineMeeting) {
    return null;
  }
  
  const participants = event.attendees?.map((attendee: any) => ({
    email: attendee.emailAddress?.address,
    name: attendee.emailAddress?.name,
    status: attendee.status?.response,
    type: attendee.type
  })) || [];
  
  const joinUrl = event.onlineMeeting?.joinUrl || event.onlineMeetingUrl;
  let onlineMeetingId = event.onlineMeeting?.id || null;
  
  if (!onlineMeetingId && joinUrl) {
    onlineMeetingId = extractOnlineMeetingIdFromUrl(joinUrl);
  }
  
  return {
    id: event.id,
    onlineMeetingId: onlineMeetingId,
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
    meetingProvider: event.onlineMeetingProvider || "teamsForBusiness",
    webLink: event.webLink,
    categories: event.categories || [],
    importance: event.importance,
    isAllDay: event.isAllDay || false,
    isCancelled: event.isCancelled || false,
    responseStatus: event.responseStatus
  };
}

function extractOnlineMeetingIdFromUrl(joinUrl: string): string | null {
  if (!joinUrl) return null;
  
  try {
    const url = new URL(joinUrl);
    const pathParts = url.pathname.split('/');
    
    for (const part of pathParts) {
      if (part.includes('meeting_') || part.startsWith('19%3a') || part.startsWith('19:')) {
        return decodeURIComponent(part);
      }
    }
    
    const threadId = url.searchParams.get('threadId');
    if (threadId) return threadId;
    
    return null;
  } catch {
    return null;
  }
}

export async function getUserOnlineMeetings(userPrincipalName?: string) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for app-only authentication");
    }
    
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
      if (!userPrincipalName) {
        return [];
      }
      
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

export async function getAllOnlineMeetings() {
  const client = getTeamsAppClient();
  
  try {
    const usersResponse = await client
      .api("/users")
      .select("userPrincipalName,mail,displayName,id")
      .filter("accountEnabled eq true")
      .top(999)
      .get();
    
    const users = usersResponse.value || [];
    const allMeetings: any[] = [];
    
    for (const user of users) {
      if (!user.userPrincipalName) continue;
      
      try {
        const meetings = await getUserOnlineMeetings(user.userPrincipalName);
        
        const meetingsWithUser = meetings.map((meeting: any) => ({
          ...meeting,
          // organizerEmail may be an SMTP alias, not suitable for Graph API calls
          organizerEmail: meeting.organizer?.address || user.userPrincipalName,
          organizerName: meeting.organizer?.name || user.displayName,
          organizerId: user.id,
          // Canonical UPN for Graph API calls (transcript/attendance fetching)
          // Always use this for /users/{upn}/... endpoints in app-only auth
          organizerUpn: user.userPrincipalName,
          calendarOwnerEmail: user.userPrincipalName,
          calendarOwnerName: user.displayName
        }));
        
        allMeetings.push(...meetingsWithUser);
      } catch (userError) {
        console.error(`Error fetching meetings for user ${user.userPrincipalName}:`, userError);
      }
    }
    
    const uniqueMeetings = new Map();
    allMeetings.forEach((meeting) => {
      if (!uniqueMeetings.has(meeting.id)) {
        uniqueMeetings.set(meeting.id, meeting);
      }
    });
    
    const sortedMeetings = Array.from(uniqueMeetings.values()).sort((a, b) => {
      const dateA = new Date(a.startDateTime).getTime();
      const dateB = new Date(b.startDateTime).getTime();
      return dateB - dateA;
    });
    
    return sortedMeetings;
  } catch (error) {
    console.error("Error fetching all organization meetings:", error);
    throw error;
  }
}

export async function listMeetingTranscripts(onlineMeetingId: string, userPrincipalName: string): Promise<any[]> {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for transcript access");
    }
    
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

export async function getMeetingTranscript(meetingId: string, transcriptId: string, userPrincipalName: string): Promise<string | null> {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for transcript access");
    }
    
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}/transcripts/${transcriptId}/content`;
    
    const response = await client
      .api(basePath)
      .get();
    
    return response;
  } catch (error) {
    console.error(`Error fetching transcript for meeting ${meetingId}:`, error);
    return null;
  }
}

export async function getAllMeetingTranscripts(onlineMeetingId: string, userPrincipalName: string): Promise<string | null> {
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for transcript access");
    }
    
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

export async function getMeetingAttendanceReports(meetingId: string, userPrincipalName: string) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for attendance report access");
    }
    
    const basePath = `/users/${userPrincipalName}/onlineMeetings/${meetingId}/attendanceReports`;
    
    const response = await client
      .api(basePath)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching attendance reports for meeting ${meetingId}:`, error);
    return [];
  }
}

export async function getUserCalendarEvents(userPrincipalName: string) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for calendar access");
    }
    
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

export async function isUserAdmin(userId: string): Promise<boolean> {
  const client = getTeamsAppClient();
  
  try {
    const response = await client
      .api(`/users/${userId}/memberOf`)
      .select("displayName,@odata.type")
      .get();
    
    const memberships = response.value || [];
    
    const adminRoleNames = [
      'Global Administrator',
      'Teams Administrator',
      'Application Administrator',
      'User Administrator'
    ];
    
    return memberships.some((membership: any) => 
      adminRoleNames.some(adminRole => 
        membership.displayName && membership.displayName.includes(adminRole)
      )
    );
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

export async function getUserTeams(userPrincipalName: string) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for Teams access");
    }
    
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

export async function getTeamChannels(teamId: string) {
  const client = getTeamsAppClient();
  
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

export async function getChannelMessages(teamId: string, channelId: string, top: number = 50) {
  const client = getTeamsAppClient();
  
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

export async function getUserChats(top: number = 50, userPrincipalName?: string) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for chat access");
    }
    
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

export async function getChatMessages(chatId: string, top: number = 50) {
  const client = getTeamsAppClient();
  
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

export async function getOnlineMeetings(userPrincipalName: string, options: { top?: number; filter?: string } = {}) {
  const client = getTeamsAppClient();
  
  try {
    if (!userPrincipalName) {
      throw new Error("User principal name (UPN) is required for online meetings access");
    }
    
    let request = client.api(`/users/${userPrincipalName}/onlineMeetings`);
    
    if (options.top) {
      request = request.top(options.top);
    }
    if (options.filter) {
      request = request.filter(options.filter);
    }
    
    return await request.get();
  } catch (error) {
    console.error("Error fetching online meetings:", error);
    return { value: [] };
  }
}

export async function getOrganizationUsers(options: { top?: number } = {}) {
  const client = getTeamsAppClient();
  
  try {
    let request = client
      .api("/users")
      .select("id,displayName,mail,userPrincipalName,jobTitle,department,accountEnabled")
      .filter("accountEnabled eq true");
    
    if (options.top) {
      request = request.top(options.top);
    }
    
    return await request.get();
  } catch (error) {
    console.error("Error fetching organization users:", error);
    return { value: [] };
  }
}
