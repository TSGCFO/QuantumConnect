/**
 * @deprecated This file uses the legacy Replit Outlook/Teams connector which is being phased out.
 * Use teams-app.ts instead which uses app-only authentication via microsoft-graph.ts.
 * 
 * Migration: Import functions from './teams-app' for all Teams API calls.
 */

import { Client } from "@microsoft/microsoft-graph-client";

let connectionSettings: any;

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
    throw new Error("Outlook not connected");
  }
  return accessToken;
}

export async function getUncachableTeamsClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken,
    },
  });
}

export async function getUserTeams() {
  const client = await getUncachableTeamsClient();
  
  try {
    const response = await client
      .api("/me/joinedTeams")
      .select("id,displayName,description")
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching user teams:", error);
    return [];
  }
}

export async function getTeamChannels(teamId: string) {
  const client = await getUncachableTeamsClient();
  
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
  const client = await getUncachableTeamsClient();
  
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

export async function getOnlineMeetings() {
  const client = await getUncachableTeamsClient();
  
  try {
    // Fetch all meetings from the past 2 years to get complete history
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    const response = await client
      .api("/me/onlineMeetings")
      .filter("startDateTime ge " + twoYearsAgo.toISOString())
      .select("id,subject,startDateTime,endDateTime,participants,joinUrl,recordingContentUrl,transcripts")
      .orderby("startDateTime desc")
      .top(200) // Increase limit to get more meetings
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching online meetings:", error);
    return [];
  }
}

export async function getMeetingRecording(meetingId: string) {
  const client = await getUncachableTeamsClient();
  
  try {
    const response = await client
      .api(`/me/onlineMeetings/${meetingId}/recordings`)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching recording for meeting ${meetingId}:`, error);
    return [];
  }
}

export async function getMeetingTranscript(meetingId: string, transcriptId: string) {
  const client = await getUncachableTeamsClient();
  
  try {
    // For transcript content, we don't need to specify responseType
    // The Graph SDK will handle it appropriately
    const response = await client
      .api(`/me/onlineMeetings/${meetingId}/transcripts/${transcriptId}/content`)
      .get();
    
    return response;
  } catch (error) {
    console.error(`Error fetching transcript for meeting ${meetingId}:`, error);
    return null;
  }
}

export async function getMeetingAttendanceReports(meetingId: string) {
  const client = await getUncachableTeamsClient();
  
  try {
    const response = await client
      .api(`/me/onlineMeetings/${meetingId}/attendanceReports`)
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Error fetching attendance reports for meeting ${meetingId}:`, error);
    return [];
  }
}

export async function getUserChats(top: number = 50) {
  const client = await getUncachableTeamsClient();
  
  try {
    const response = await client
      .api("/me/chats")
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
  const client = await getUncachableTeamsClient();
  
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

export async function getCalendarEvents() {
  const client = await getUncachableTeamsClient();
  
  try {
    // Fetch all events from the past 2 years to get complete history
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const startDateTime = twoYearsAgo.toISOString();
    
    // Include future events up to 30 days from now
    const endDateTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const response = await client
      .api("/me/calendar/calendarView")
      .query({
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      })
      .select("id,subject,start,end,location,attendees,onlineMeeting,isOnlineMeeting")
      .orderby("start/dateTime")
      .top(500) // Increase limit to get more events
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

export async function searchTeamsContent(query: string) {
  const client = await getUncachableTeamsClient();
  
  try {
    const response = await client
      .api("/search/query")
      .post({
        requests: [
          {
            entityTypes: ["message", "chatMessage", "driveItem"],
            query: {
              queryString: query,
            },
            from: 0,
            size: 25,
          },
        ],
      });
    
    return response.value?.[0]?.hitsContainers?.[0]?.hits || [];
  } catch (error) {
    console.error(`Error searching Teams content for query "${query}":`, error);
    return [];
  }
}