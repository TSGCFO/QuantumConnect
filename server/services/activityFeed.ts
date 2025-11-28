import { storage } from "../storage";
import { db } from "../db";
import { emails, meetings, msCalendarEvents, msChatMessages, msChatThreads, msChatParticipants, users } from "@shared/schema";
import { desc, eq, and, gte, lte, sql, or, isNotNull, inArray } from "drizzle-orm";

export type ActivityType = "email" | "meeting" | "calendar" | "chat";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string | null;
  timestamp: Date;
  participants: string[];
  source: string;
  sourceId: string | null;
  metadata: {
    isRead?: boolean;
    hasAttachments?: boolean;
    importance?: string;
    location?: string;
    isOnlineMeeting?: boolean;
    linkedMeetingId?: string | null;
    linkType?: string | null;
  };
  rawData?: unknown;
}

export interface ActivityFeedFilters {
  userId?: string;
  types?: ActivityType[];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  includeRawData?: boolean;
}

async function getEmailActivities(filters: ActivityFeedFilters): Promise<ActivityItem[]> {
  try {
    const conditions = [];
    
    if (filters.userId) {
      conditions.push(eq(emails.userId, filters.userId));
    }
    
    if (filters.startDate) {
      conditions.push(gte(emails.receivedAt, filters.startDate));
    }
    
    if (filters.endDate) {
      conditions.push(lte(emails.receivedAt, filters.endDate));
    }
    
    const query = db.select().from(emails);
    const results = conditions.length > 0 
      ? await query.where(and(...conditions)).orderBy(desc(emails.receivedAt)).limit(filters.limit || 50)
      : await query.orderBy(desc(emails.receivedAt)).limit(filters.limit || 50);
    
    return results.map(email => ({
      id: email.id,
      type: "email" as const,
      title: email.subject || "(No subject)",
      description: email.body?.substring(0, 200) || null,
      timestamp: email.receivedAt,
      participants: [email.from, ...(email.to || []), ...(email.cc || [])],
      source: "outlook",
      sourceId: email.outlookId,
      metadata: {
        isRead: email.isRead || false,
        hasAttachments: email.hasAttachments || false,
        importance: email.importance || undefined,
        linkedMeetingId: email.linkedMeetingId,
        linkType: email.linkType,
      },
      rawData: filters.includeRawData ? email : undefined,
    }));
  } catch (error) {
    console.error("Error fetching email activities:", error);
    return [];
  }
}

async function getMeetingActivities(filters: ActivityFeedFilters): Promise<ActivityItem[]> {
  try {
    const limit = filters.limit || 50;
    
    if (filters.userId) {
      const user = await db.select().from(users).where(eq(users.id, filters.userId)).limit(1);
      const userEmail = user[0]?.email?.toLowerCase() || "";
      
      const uploadedConditions = [eq(meetings.uploadedById, filters.userId)];
      if (filters.startDate) uploadedConditions.push(gte(meetings.meetingDate, filters.startDate));
      if (filters.endDate) uploadedConditions.push(lte(meetings.meetingDate, filters.endDate));
      
      const uploadedMeetings = await db.select().from(meetings)
        .where(and(...uploadedConditions))
        .orderBy(desc(meetings.meetingDate))
        .limit(limit);
      
      let attendeeMeetings: typeof uploadedMeetings = [];
      if (userEmail) {
        const attendeeConditions = [];
        if (filters.startDate) attendeeConditions.push(gte(meetings.meetingDate, filters.startDate));
        if (filters.endDate) attendeeConditions.push(lte(meetings.meetingDate, filters.endDate));
        attendeeConditions.push(isNotNull(meetings.attendees));
        
        const potentialMeetings = await db.select().from(meetings)
          .where(attendeeConditions.length > 0 ? and(...attendeeConditions) : undefined)
          .orderBy(desc(meetings.meetingDate))
          .limit(limit * 3);
        
        attendeeMeetings = potentialMeetings.filter(m => 
          m.attendees?.some(a => 
            a.toLowerCase().includes(userEmail) || userEmail.includes(a.toLowerCase())
          )
        );
      }
      
      const allMeetings = [...uploadedMeetings, ...attendeeMeetings];
      const uniqueById = new Map(allMeetings.map(m => [m.id, m]));
      const dedupedMeetings = Array.from(uniqueById.values())
        .sort((a, b) => new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime())
        .slice(0, limit);
      
      return dedupedMeetings.map(meeting => ({
        id: meeting.id,
        type: "meeting" as const,
        title: meeting.title,
        description: meeting.summary || meeting.description || null,
        timestamp: meeting.meetingDate,
        participants: meeting.attendees || [],
        source: meeting.source,
        sourceId: meeting.sourceId || null,
        metadata: {
          hasAttachments: !!meeting.transcript,
        },
        rawData: filters.includeRawData ? meeting : undefined,
      }));
    }
    
    const conditions = [];
    if (filters.startDate) conditions.push(gte(meetings.meetingDate, filters.startDate));
    if (filters.endDate) conditions.push(lte(meetings.meetingDate, filters.endDate));
    
    const results = conditions.length > 0
      ? await db.select().from(meetings).where(and(...conditions)).orderBy(desc(meetings.meetingDate)).limit(limit)
      : await db.select().from(meetings).orderBy(desc(meetings.meetingDate)).limit(limit);
    
    return results.map(meeting => ({
      id: meeting.id,
      type: "meeting" as const,
      title: meeting.title,
      description: meeting.summary || meeting.description || null,
      timestamp: meeting.meetingDate,
      participants: meeting.attendees || [],
      source: meeting.source,
      sourceId: meeting.sourceId || null,
      metadata: {
        hasAttachments: !!meeting.transcript,
      },
      rawData: filters.includeRawData ? meeting : undefined,
    }));
  } catch (error) {
    console.error("Error fetching meeting activities:", error);
    return [];
  }
}

async function getCalendarActivities(filters: ActivityFeedFilters): Promise<ActivityItem[]> {
  try {
    const conditions = [];
    
    if (filters.userId) {
      conditions.push(eq(msCalendarEvents.userId, filters.userId));
    }
    
    if (filters.startDate) {
      conditions.push(gte(msCalendarEvents.start, filters.startDate));
    }
    
    if (filters.endDate) {
      conditions.push(lte(msCalendarEvents.start, filters.endDate));
    }
    
    const query = db.select().from(msCalendarEvents);
    const results = conditions.length > 0
      ? await query.where(and(...conditions)).orderBy(desc(msCalendarEvents.start)).limit(filters.limit || 50)
      : await query.orderBy(desc(msCalendarEvents.start)).limit(filters.limit || 50);
    
    return results.map(event => {
      const organizer = event.organizer as { email?: string; name?: string } | null;
      const participants: string[] = [];
      if (organizer?.email) {
        participants.push(organizer.email);
      } else if (organizer?.name) {
        participants.push(organizer.name);
      }
      
      return {
        id: event.id,
        type: "calendar" as const,
        title: event.subject || "(No subject)",
        description: event.bodyPreview || null,
        timestamp: event.start,
        participants,
        source: "outlook",
        sourceId: event.msEventId,
        metadata: {
          location: event.location || undefined,
          isOnlineMeeting: !!event.onlineMeetingUrl,
        },
        rawData: filters.includeRawData ? event : undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching calendar activities:", error);
    return [];
  }
}

async function getChatActivities(filters: ActivityFeedFilters): Promise<ActivityItem[]> {
  try {
    const conditions = [];
    
    if (filters.startDate) {
      conditions.push(gte(msChatMessages.sentDateTime, filters.startDate));
    }
    
    if (filters.endDate) {
      conditions.push(lte(msChatMessages.sentDateTime, filters.endDate));
    }
    
    conditions.push(eq(msChatMessages.isDeleted, false));
    
    let userChatIds: string[] = [];
    if (filters.userId) {
      const userParticipations = await db
        .select({ chatId: msChatParticipants.chatId })
        .from(msChatParticipants)
        .where(eq(msChatParticipants.userId, filters.userId));
      
      userChatIds = userParticipations.map(p => p.chatId);
      
      if (userChatIds.length > 0) {
        conditions.push(inArray(msChatMessages.chatId, userChatIds));
      } else {
        conditions.push(eq(msChatMessages.senderId, filters.userId));
      }
    }
    
    const results = await db
      .select({
        message: msChatMessages,
        chatTopic: msChatThreads.topic,
        chatType: msChatThreads.chatType,
      })
      .from(msChatMessages)
      .leftJoin(msChatThreads, eq(msChatMessages.chatId, msChatThreads.id))
      .where(and(...conditions))
      .orderBy(desc(msChatMessages.sentDateTime))
      .limit(filters.limit || 50);
    
    return results.map(({ message, chatTopic, chatType }) => ({
      id: message.id,
      type: "chat" as const,
      title: chatTopic || `${chatType || "Chat"} message`,
      description: message.body?.substring(0, 200) || null,
      timestamp: message.sentDateTime,
      participants: [message.senderDisplayName],
      source: "teams",
      sourceId: message.msMessageId,
      metadata: {
        importance: message.importance,
      },
      rawData: filters.includeRawData ? message : undefined,
    }));
  } catch (error) {
    console.error("Error fetching chat activities:", error);
    return [];
  }
}

export async function getUnifiedActivityFeed(filters: ActivityFeedFilters = {}): Promise<{
  activities: ActivityItem[];
  total: number;
  hasMore: boolean;
}> {
  const types = filters.types || ["email", "meeting", "calendar", "chat"];
  const limit = filters.limit || 50;
  const offset = filters.offset || 0;
  
  const fetchLimit = limit + offset + 10;
  const filtersWithLimit = { ...filters, limit: fetchLimit };
  
  const fetchPromises: Promise<ActivityItem[]>[] = [];
  
  if (types.includes("email")) {
    fetchPromises.push(getEmailActivities(filtersWithLimit));
  }
  if (types.includes("meeting")) {
    fetchPromises.push(getMeetingActivities(filtersWithLimit));
  }
  if (types.includes("calendar")) {
    fetchPromises.push(getCalendarActivities(filtersWithLimit));
  }
  if (types.includes("chat")) {
    fetchPromises.push(getChatActivities(filtersWithLimit));
  }
  
  const results = await Promise.all(fetchPromises);
  
  let allActivities = results.flat();
  
  allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const total = allActivities.length;
  const paginatedActivities = allActivities.slice(offset, offset + limit);
  
  return {
    activities: paginatedActivities,
    total,
    hasMore: offset + limit < total,
  };
}

export async function getActivityStats(userId?: string): Promise<{
  emailCount: number;
  meetingCount: number;
  calendarCount: number;
  chatCount: number;
  todayCount: number;
  weekCount: number;
}> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  try {
    const [emailResult, meetingResult, calendarResult, chatResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(emails).where(userId ? eq(emails.userId, userId) : undefined),
      db.select({ count: sql<number>`count(*)` }).from(meetings).where(userId ? eq(meetings.uploadedById, userId) : undefined),
      db.select({ count: sql<number>`count(*)` }).from(msCalendarEvents).where(userId ? eq(msCalendarEvents.userId, userId) : undefined),
      db.select({ count: sql<number>`count(*)` }).from(msChatMessages).where(
        and(eq(msChatMessages.isDeleted, false), userId ? eq(msChatMessages.senderId, userId) : undefined)
      ),
    ]);
    
    const todayFilters: ActivityFeedFilters = { startDate: today, userId };
    const weekFilters: ActivityFeedFilters = { startDate: weekAgo, userId };
    
    const [todayFeed, weekFeed] = await Promise.all([
      getUnifiedActivityFeed(todayFilters),
      getUnifiedActivityFeed(weekFilters),
    ]);
    
    return {
      emailCount: Number(emailResult[0]?.count || 0),
      meetingCount: Number(meetingResult[0]?.count || 0),
      calendarCount: Number(calendarResult[0]?.count || 0),
      chatCount: Number(chatResult[0]?.count || 0),
      todayCount: todayFeed.total,
      weekCount: weekFeed.total,
    };
  } catch (error) {
    console.error("Error fetching activity stats:", error);
    return {
      emailCount: 0,
      meetingCount: 0,
      calendarCount: 0,
      chatCount: 0,
      todayCount: 0,
      weekCount: 0,
    };
  }
}

export async function getActivityByType(
  type: ActivityType,
  filters: Omit<ActivityFeedFilters, "types"> = {}
): Promise<ActivityItem[]> {
  const result = await getUnifiedActivityFeed({ ...filters, types: [type] });
  return result.activities;
}

export async function searchActivities(
  query: string,
  filters: ActivityFeedFilters = {}
): Promise<ActivityItem[]> {
  const result = await getUnifiedActivityFeed(filters);
  
  const queryLower = query.toLowerCase();
  return result.activities.filter(activity => 
    activity.title.toLowerCase().includes(queryLower) ||
    (activity.description && activity.description.toLowerCase().includes(queryLower)) ||
    activity.participants.some(p => p.toLowerCase().includes(queryLower))
  );
}

export async function getRecentActivityForUser(userId: string, limit = 20): Promise<ActivityItem[]> {
  const result = await getUnifiedActivityFeed({
    userId,
    limit,
    types: ["email", "meeting", "calendar", "chat"],
  });
  return result.activities;
}
