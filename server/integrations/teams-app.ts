import { Client } from "@microsoft/microsoft-graph-client";

/**
 * Teams application-level authentication module
 * Uses application permissions instead of delegated user permissions
 * for broader access to organizational data
 */

let connectionSettings: any;
let appClient: Client | null = null;

// Get access token from the connector settings
async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=outlook",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Teams/Outlook not connected");
  }
  return accessToken;
}

// Get an uncachable Teams client for application-level access
export async function getTeamsAppClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken,
    },
  });
}

// Get the current user's principal name (email)
export async function getUserPrincipalName(): Promise<string> {
  const client = await getTeamsAppClient();
  
  try {
    const response = await client
      .api("/me")
      .select("userPrincipalName,mail")
      .get();
    
    return response.userPrincipalName || response.mail || "";
  } catch (error) {
    console.error("Error fetching user principal name:", error);
    throw error;
  }
}

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
  
  return {
    id: event.id,
    subject: event.subject || "Untitled Meeting",
    startDateTime: event.start?.dateTime,
    endDateTime: event.end?.dateTime,
    createdDateTime: event.createdDateTime,
    joinUrl: event.onlineMeeting?.joinUrl || event.onlineMeetingUrl,
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

// Get online meetings for a specific user by fetching calendar events
export async function getUserOnlineMeetings(userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    const calendarPath = userPrincipalName 
      ? `/users/${userPrincipalName}/calendar/events`
      : "/me/calendar/events";
    
    // Fetch all events from the past 2 years to now
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const now = new Date();
    
    // Use $filter for date range only (isOnlineMeeting filter not supported by Graph API)
    const filter = `start/dateTime ge '${twoYearsAgo.toISOString()}' and start/dateTime le '${now.toISOString()}'`;
    
    const response = await client
      .api(calendarPath)
      .filter(filter)
      .select("id,subject,start,end,bodyPreview,onlineMeeting,onlineMeetingUrl,attendees,organizer,isOnlineMeeting,createdDateTime,location,webLink,categories,importance,isAllDay,isCancelled,responseStatus,onlineMeetingProvider")
      .orderby("start/dateTime desc")
      .top(999) // Maximum limit for comprehensive sync
      .get();
    
    const events = response.value || [];
    
    // Filter client-side for online meetings only
    const onlineMeetings = events.filter((event: any) => event.isOnlineMeeting === true);
    
    // Convert calendar events to meeting format
    const meetings = onlineMeetings
      .map(convertCalendarEventToMeeting)
      .filter(Boolean); // Remove null values
    
    return meetings;
  } catch (error) {
    console.error("Error fetching online meetings from calendar:", error);
    
    // Fallback to calendarView if calendar/events fails
    try {
      const calendarViewPath = userPrincipalName
        ? `/users/${userPrincipalName}/calendarView`
        : "/me/calendarView";
      
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      const now = new Date();
      
      const response = await client
        .api(calendarViewPath)
        .query({
          startDateTime: twoYearsAgo.toISOString(),
          endDateTime: now.toISOString()
          // Removed $filter for isOnlineMeeting - not supported by Graph API
        })
        .select("id,subject,start,end,bodyPreview,onlineMeeting,onlineMeetingUrl,attendees,organizer,isOnlineMeeting,createdDateTime,location,webLink,categories,importance,isAllDay,isCancelled,responseStatus,onlineMeetingProvider")
        .orderby("start/dateTime desc")
        .top(999)
        .get();
      
      const events = response.value || [];
      
      // Filter client-side for online meetings only
      const onlineMeetings = events.filter((event: any) => event.isOnlineMeeting === true);
      
      // Convert calendar events to meeting format
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

// Get meeting transcript content
export async function getMeetingTranscript(meetingId: string, transcriptId: string, userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    // Build the appropriate API path
    const basePath = userPrincipalName
      ? `/users/${userPrincipalName}/onlineMeetings/${meetingId}`
      : `/me/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/transcripts/${transcriptId}/content`)
      .get();
    
    return response;
  } catch (error) {
    console.error(`Error fetching transcript for meeting ${meetingId}:`, error);
    return null;
  }
}

// Get meeting attendance reports
export async function getMeetingAttendanceReports(meetingId: string, userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    const basePath = userPrincipalName
      ? `/users/${userPrincipalName}/onlineMeetings/${meetingId}`
      : `/me/onlineMeetings/${meetingId}`;
    
    const response = await client
      .api(`${basePath}/attendanceReports`)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching attendance reports for meeting ${meetingId}:`, error);
    return [];
  }
}

// Get user's calendar events (including Teams meetings)
export async function getUserCalendarEvents(userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    const calendarPath = userPrincipalName
      ? `/users/${userPrincipalName}/calendar/calendarView`
      : "/me/calendar/calendarView";
    
    // Fetch all events from the past 2 years to future 30 days
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

// Get Teams for a user
export async function getUserTeams(userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    const teamsPath = userPrincipalName
      ? `/users/${userPrincipalName}/joinedTeams`
      : "/me/joinedTeams";
    
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

// Get user's chats
export async function getUserChats(top: number = 50, userPrincipalName?: string) {
  const client = await getTeamsAppClient();
  
  try {
    const chatsPath = userPrincipalName
      ? `/users/${userPrincipalName}/chats`
      : "/me/chats";
    
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