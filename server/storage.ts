import {
  users,
  documents,
  meetings,
  tasks,
  activityLogs,
  emails,
  hubspotCommunications,
  msUserProfiles,
  userSyncStates,
  syncJobs,
  msRecurrencePatterns,
  msCalendarEvents,
  msEventAttendees,
  msTodoLists,
  msTodoTasks,
  msPresenceSnapshots,
  msChatThreads,
  msChatParticipants,
  msChatMessages,
  msContacts,
  msDriveItems,
  aiActionItems,
  aiReminders,
  aiNotifications,
  aiInsights,
  type User,
  type UpsertUser,
  type Document,
  type InsertDocument,
  type Meeting,
  type InsertMeeting,
  type Task,
  type InsertTask,
  type ActivityLog,
  type InsertActivityLog,
  type Email,
  type InsertEmail,
  type HubspotCommunication,
  type InsertHubspotCommunication,
  type MsUserProfile,
  type InsertMsUserProfile,
  type UserSyncState,
  type InsertUserSyncState,
  type SyncJob,
  type InsertSyncJob,
  type MsRecurrencePattern,
  type InsertMsRecurrencePattern,
  type MsCalendarEvent,
  type InsertMsCalendarEvent,
  type MsEventAttendee,
  type InsertMsEventAttendee,
  type MsTodoList,
  type InsertMsTodoList,
  type MsTodoTask,
  type InsertMsTodoTask,
  type MsPresenceSnapshot,
  type InsertMsPresenceSnapshot,
  type MsChatThread,
  type InsertMsChatThread,
  type MsChatParticipant,
  type InsertMsChatParticipant,
  type MsChatMessage,
  type InsertMsChatMessage,
  type MsContact,
  type InsertMsContact,
  type MsDriveItem,
  type InsertMsDriveItem,
  type AiActionItem,
  type InsertAiActionItem,
  type AiReminder,
  type InsertAiReminder,
  type AiNotification,
  type InsertAiNotification,
  type AiInsight,
  type InsertAiInsight,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte, lte, sql, or, ilike } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, data: Partial<User>): Promise<User>;

  // Document operations
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  searchDocuments(query: string): Promise<Document[]>;

  // Meeting operations
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getMeetings(): Promise<Meeting[]>;
  getMeeting(id: string): Promise<Meeting | undefined>;

  // Task operations
  createTask(task: InsertTask): Promise<Task>;
  getTasks(): Promise<Task[]>;
  getTasksByUser(userId: string): Promise<Task[]>;
  updateTask(id: string, data: Partial<Task>): Promise<Task>;

  // Activity log operations
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogs(userId?: string): Promise<ActivityLog[]>;

  // Email operations
  createEmail(email: InsertEmail): Promise<Email>;
  upsertEmail(email: InsertEmail): Promise<Email>;
  getEmails(userId?: string): Promise<Email[]>;
  getEmailByOutlookId(outlookId: string): Promise<Email | undefined>;
  emailExists(outlookId: string): Promise<boolean>;

  // HubSpot communication operations
  createHubspotCommunication(
    comm: InsertHubspotCommunication,
  ): Promise<HubspotCommunication>;
  getHubspotCommunications(): Promise<HubspotCommunication[]>;
  hubspotCommunicationExists(hubspotId: string): Promise<boolean>;

  // Analytics operations
  getTaskStats(timeRange: string): Promise<any>;
  getDepartmentStats(timeRange: string): Promise<any[]>;
  getUserPerformance(timeRange: string): Promise<any[]>;

  // MS User Profiles
  getMsUserProfile(userId: string): Promise<MsUserProfile | undefined>;
  getMsUserProfileByMsUserId(msUserId: string): Promise<MsUserProfile | undefined>;
  getAllMsUserProfiles(): Promise<MsUserProfile[]>;
  upsertMsUserProfile(profile: InsertMsUserProfile): Promise<MsUserProfile>;
  deleteMsUserProfile(userId: string): Promise<void>;

  // Sync States
  getUserSyncState(userId: string, resourceType: string): Promise<UserSyncState | undefined>;
  upsertUserSyncState(state: InsertUserSyncState): Promise<UserSyncState>;
  getSyncStatesForUser(userId: string): Promise<UserSyncState[]>;

  // Sync Jobs
  createSyncJob(job: InsertSyncJob): Promise<SyncJob>;
  updateSyncJob(id: string, data: Partial<SyncJob>): Promise<SyncJob>;
  getRecentSyncJobs(userId?: string, limit?: number): Promise<SyncJob[]>;
  getAllUserSyncStates(userId: string): Promise<UserSyncState[]>;
  getAllRecentSyncJobs(limit?: number): Promise<SyncJob[]>;

  // Calendar
  upsertCalendarEvent(event: InsertMsCalendarEvent): Promise<MsCalendarEvent>;
  getCalendarEvents(userId: string, startDate?: Date, endDate?: Date): Promise<MsCalendarEvent[]>;
  getCalendarEvent(id: string): Promise<MsCalendarEvent | undefined>;
  deleteCalendarEvent(msEventId: string): Promise<void>;
  upsertEventAttendee(attendee: InsertMsEventAttendee): Promise<MsEventAttendee>;
  getEventAttendees(eventId: string): Promise<MsEventAttendee[]>;
  upsertRecurrencePattern(pattern: InsertMsRecurrencePattern): Promise<MsRecurrencePattern>;

  // To Do
  upsertTodoList(list: InsertMsTodoList): Promise<MsTodoList>;
  getTodoLists(userId: string): Promise<MsTodoList[]>;
  upsertTodoTask(task: InsertMsTodoTask): Promise<MsTodoTask>;
  getTodoTasks(listId: string): Promise<MsTodoTask[]>;
  getTodoTasksByUser(userId: string): Promise<MsTodoTask[]>;

  // Presence
  createPresenceSnapshot(snapshot: InsertMsPresenceSnapshot): Promise<MsPresenceSnapshot>;
  getLatestPresence(userId: string): Promise<MsPresenceSnapshot | undefined>;
  getPresenceHistory(userId: string, since: Date): Promise<MsPresenceSnapshot[]>;

  // Chat
  upsertChatThread(thread: InsertMsChatThread): Promise<MsChatThread>;
  getChatThreads(limit?: number): Promise<MsChatThread[]>;
  upsertChatParticipant(participant: InsertMsChatParticipant): Promise<MsChatParticipant>;
  getChatParticipants(chatId: string): Promise<MsChatParticipant[]>;
  upsertChatMessage(message: InsertMsChatMessage): Promise<MsChatMessage>;
  getChatMessages(chatId: string, limit?: number): Promise<MsChatMessage[]>;

  // Contacts
  upsertContact(contact: InsertMsContact): Promise<MsContact>;
  getContacts(userId: string): Promise<MsContact[]>;
  getContact(id: string): Promise<MsContact | undefined>;
  searchContacts(userId: string, query: string): Promise<MsContact[]>;

  // Drive Items
  upsertDriveItem(item: InsertMsDriveItem): Promise<MsDriveItem>;
  getDriveItems(userId: string, source?: string): Promise<MsDriveItem[]>;
  getDriveItem(id: string): Promise<MsDriveItem | undefined>;
  searchDriveItems(userId: string, query: string): Promise<MsDriveItem[]>;

  // AI Action Items
  createAiActionItem(item: InsertAiActionItem): Promise<AiActionItem>;
  getAiActionItems(userId: string, status?: string): Promise<AiActionItem[]>;
  updateAiActionItem(id: string, data: Partial<AiActionItem>): Promise<AiActionItem>;

  // AI Reminders
  createAiReminder(reminder: InsertAiReminder): Promise<AiReminder>;
  getPendingReminders(before?: Date): Promise<AiReminder[]>;
  getUserReminders(userId: string, status?: string): Promise<AiReminder[]>;
  updateAiReminder(id: string, data: Partial<AiReminder>): Promise<AiReminder>;

  // AI Notifications
  createAiNotification(notification: InsertAiNotification): Promise<AiNotification>;
  getUserNotifications(userId: string, status?: string): Promise<AiNotification[]>;
  updateAiNotification(id: string, data: Partial<AiNotification>): Promise<AiNotification>;

  // AI Insights
  createAiInsight(insight: InsertAiInsight): Promise<AiInsight>;
  getAiInsights(userId?: string, type?: string): Promise<AiInsight[]>;
  getLatestInsight(userId: string, type: string): Promise<AiInsight | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.createdAt);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Document operations
  async createDocument(docData: InsertDocument): Promise<Document> {
    const [doc] = await db.insert(documents).values(docData).returning();
    return doc;
  }

  async getDocuments(): Promise<Document[]> {
    return await db.select().from(documents).orderBy(desc(documents.createdAt));
  }

  async getDocument(id: string): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc || undefined;
  }

  async searchDocuments(query: string): Promise<Document[]> {
    const searchPattern = `%${query.toLowerCase()}%`;
    return await db
      .select()
      .from(documents)
      .where(
        sql`LOWER(${documents.title}) LIKE ${searchPattern} OR LOWER(${documents.description}) LIKE ${searchPattern} OR LOWER(${documents.content}) LIKE ${searchPattern}`,
      )
      .orderBy(desc(documents.createdAt));
  }

  // Meeting operations
  async createMeeting(meetingData: InsertMeeting): Promise<Meeting> {
    const [meeting] = await db.insert(meetings).values(meetingData).returning();
    return meeting;
  }

  async getMeetings(): Promise<Meeting[]> {
    return await db.select().from(meetings).orderBy(desc(meetings.meetingDate));
  }

  async getMeeting(id: string): Promise<Meeting | undefined> {
    const [meeting] = await db
      .select()
      .from(meetings)
      .where(eq(meetings.id, id));
    return meeting || undefined;
  }

  // Task operations
  async createTask(taskData: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(taskData).returning();
    return task;
  }

  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.assignedToId, userId))
      .orderBy(desc(tasks.createdAt));
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const updateData: any = { ...data, updatedAt: new Date() };
    if (data.status === "completed" && !data.completedAt) {
      updateData.completedAt = new Date();
    }
    const [task] = await db
      .update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  // Activity log operations
  async createActivityLog(logData: InsertActivityLog): Promise<ActivityLog> {
    const [log] = await db.insert(activityLogs).values(logData).returning();
    return log;
  }

  async getActivityLogs(userId?: string): Promise<ActivityLog[]> {
    if (userId) {
      return await db
        .select()
        .from(activityLogs)
        .where(eq(activityLogs.userId, userId))
        .orderBy(desc(activityLogs.createdAt))
        .limit(100);
    }
    return await db
      .select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.createdAt))
      .limit(100);
  }

  // Email operations
  async createEmail(emailData: InsertEmail): Promise<Email> {
    const [email] = await db.insert(emails).values(emailData).returning();
    return email;
  }

  async getEmails(userId?: string): Promise<Email[]> {
    if (userId) {
      return await db
        .select()
        .from(emails)
        .where(eq(emails.userId, userId))
        .orderBy(desc(emails.receivedAt))
        .limit(100);
    }
    return await db
      .select()
      .from(emails)
      .orderBy(desc(emails.receivedAt))
      .limit(100);
  }

  async emailExists(outlookId: string): Promise<boolean> {
    const [email] = await db
      .select()
      .from(emails)
      .where(eq(emails.outlookId, outlookId));
    return !!email;
  }

  async getEmailByOutlookId(outlookId: string): Promise<Email | undefined> {
    const [email] = await db
      .select()
      .from(emails)
      .where(eq(emails.outlookId, outlookId));
    return email || undefined;
  }

  async upsertEmail(emailData: InsertEmail): Promise<Email> {
    const [email] = await db
      .insert(emails)
      .values(emailData)
      .onConflictDoUpdate({
        target: emails.outlookId,
        set: {
          subject: emailData.subject,
          bodyPreview: emailData.bodyPreview,
          sender: emailData.sender,
          recipients: emailData.recipients,
          receivedAt: emailData.receivedAt,
          isRead: emailData.isRead,
          importance: emailData.importance,
          hasAttachments: emailData.hasAttachments,
          internetMessageId: emailData.internetMessageId,
          conversationId: emailData.conversationId,
          parentFolderId: emailData.parentFolderId,
        },
      })
      .returning();
    return email;
  }

  // HubSpot communication operations
  async createHubspotCommunication(
    commData: InsertHubspotCommunication,
  ): Promise<HubspotCommunication> {
    const [comm] = await db
      .insert(hubspotCommunications)
      .values(commData)
      .returning();
    return comm;
  }

  async getHubspotCommunications(): Promise<HubspotCommunication[]> {
    return await db
      .select()
      .from(hubspotCommunications)
      .orderBy(desc(hubspotCommunications.occurredAt))
      .limit(100);
  }

  async hubspotCommunicationExists(hubspotId: string): Promise<boolean> {
    const [comm] = await db
      .select()
      .from(hubspotCommunications)
      .where(eq(hubspotCommunications.hubspotId, hubspotId));
    return !!comm;
  }

  // Analytics operations
  async getTaskStats(timeRange: string): Promise<any> {
    const daysMap: Record<string, number> = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };
    const days = daysMap[timeRange] || 7;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const allTasks = await db
      .select()
      .from(tasks)
      .where(gte(tasks.createdAt, cutoffDate));

    const total = allTasks.length;
    const completed = allTasks.filter((t) => t.status === "completed").length;
    const pending = allTasks.filter(
      (t) => t.status === "pending" || t.status === "in_progress",
    ).length;
    const overdue = allTasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "completed",
    ).length;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  }

  async getDepartmentStats(timeRange: string): Promise<any[]> {
    const daysMap: Record<string, number> = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };
    const days = daysMap[timeRange] || 7;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const allTasks = await db
      .select()
      .from(tasks)
      .where(gte(tasks.createdAt, cutoffDate));

    const allUsers = await db.select().from(users);

    const deptStats: Record<
      string,
      { totalTasks: number; completedTasks: number }
    > = {};

    for (const task of allTasks) {
      if (!task.assignedToId) continue;
      const user = allUsers.find((u) => u.id === task.assignedToId);
      const dept = user?.department || "Unassigned";

      if (!deptStats[dept]) {
        deptStats[dept] = { totalTasks: 0, completedTasks: 0 };
      }

      deptStats[dept].totalTasks++;
      if (task.status === "completed") {
        deptStats[dept].completedTasks++;
      }
    }

    return Object.entries(deptStats).map(([department, stats]) => ({
      department,
      totalTasks: stats.totalTasks,
      completedTasks: stats.completedTasks,
      completionRate:
        stats.totalTasks > 0
          ? (stats.completedTasks / stats.totalTasks) * 100
          : 0,
    }));
  }

  async getUserPerformance(timeRange: string): Promise<any[]> {
    const daysMap: Record<string, number> = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };
    const days = daysMap[timeRange] || 7;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const allTasks = await db
      .select()
      .from(tasks)
      .where(gte(tasks.createdAt, cutoffDate));

    const allUsers = await db.select().from(users);

    const userStats: Record<
      string,
      {
        userName: string;
        completedTasks: number;
        pendingTasks: number;
        overdueTasks: number;
      }
    > = {};

    for (const task of allTasks) {
      if (!task.assignedToId) continue;
      const user = allUsers.find((u) => u.id === task.assignedToId);
      if (!user) continue;

      const userId = user.id;
      const userName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.email || "Unknown";

      if (!userStats[userId]) {
        userStats[userId] = {
          userName,
          completedTasks: 0,
          pendingTasks: 0,
          overdueTasks: 0,
        };
      }

      if (task.status === "completed") {
        userStats[userId].completedTasks++;
      } else if (task.status === "pending" || task.status === "in_progress") {
        userStats[userId].pendingTasks++;
        if (task.dueDate && new Date(task.dueDate) < new Date()) {
          userStats[userId].overdueTasks++;
        }
      }
    }

    return Object.entries(userStats).map(([userId, stats]) => ({
      userId,
      ...stats,
    }));
  }

  // MS User Profiles
  async getMsUserProfile(userId: string): Promise<MsUserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(msUserProfiles)
      .where(eq(msUserProfiles.userId, userId));
    return profile || undefined;
  }

  async getMsUserProfileByMsUserId(msUserId: string): Promise<MsUserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(msUserProfiles)
      .where(eq(msUserProfiles.msUserId, msUserId));
    return profile || undefined;
  }

  async getAllMsUserProfiles(): Promise<MsUserProfile[]> {
    return await db.select().from(msUserProfiles).orderBy(msUserProfiles.createdAt);
  }

  async deleteMsUserProfile(userId: string): Promise<void> {
    await db.delete(msUserProfiles).where(eq(msUserProfiles.userId, userId));
  }

  async upsertMsUserProfile(profile: InsertMsUserProfile): Promise<MsUserProfile> {
    const [result] = await db
      .insert(msUserProfiles)
      .values(profile)
      .onConflictDoUpdate({
        target: msUserProfiles.userId,
        set: {
          ...profile,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  // Sync States
  async getUserSyncState(userId: string, resourceType: string): Promise<UserSyncState | undefined> {
    const [state] = await db
      .select()
      .from(userSyncStates)
      .where(and(eq(userSyncStates.userId, userId), eq(userSyncStates.resourceType, resourceType)));
    return state || undefined;
  }

  async upsertUserSyncState(state: InsertUserSyncState): Promise<UserSyncState> {
    const [result] = await db
      .insert(userSyncStates)
      .values(state)
      .onConflictDoUpdate({
        target: [userSyncStates.userId, userSyncStates.resourceType],
        set: {
          ...state,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getSyncStatesForUser(userId: string): Promise<UserSyncState[]> {
    return await db
      .select()
      .from(userSyncStates)
      .where(eq(userSyncStates.userId, userId))
      .orderBy(desc(userSyncStates.updatedAt));
  }

  // Sync Jobs
  async createSyncJob(job: InsertSyncJob): Promise<SyncJob> {
    const [result] = await db.insert(syncJobs).values(job).returning();
    return result;
  }

  async updateSyncJob(id: string, data: Partial<SyncJob>): Promise<SyncJob> {
    const [result] = await db
      .update(syncJobs)
      .set(data)
      .where(eq(syncJobs.id, id))
      .returning();
    return result;
  }

  async getRecentSyncJobs(userId?: string, limit: number = 50): Promise<SyncJob[]> {
    if (userId) {
      return await db
        .select()
        .from(syncJobs)
        .where(eq(syncJobs.userId, userId))
        .orderBy(desc(syncJobs.startedAt))
        .limit(limit);
    }
    return await db
      .select()
      .from(syncJobs)
      .orderBy(desc(syncJobs.startedAt))
      .limit(limit);
  }

  async getAllUserSyncStates(userId: string): Promise<UserSyncState[]> {
    return await db
      .select()
      .from(userSyncStates)
      .where(eq(userSyncStates.userId, userId));
  }

  async getAllRecentSyncJobs(limit: number = 50): Promise<SyncJob[]> {
    return await db
      .select()
      .from(syncJobs)
      .orderBy(desc(syncJobs.startedAt))
      .limit(limit);
  }

  // Calendar
  async upsertCalendarEvent(event: InsertMsCalendarEvent): Promise<MsCalendarEvent> {
    const [result] = await db
      .insert(msCalendarEvents)
      .values(event)
      .onConflictDoUpdate({
        target: msCalendarEvents.msEventId,
        set: {
          ...event,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getCalendarEvents(userId: string, startDate?: Date, endDate?: Date): Promise<MsCalendarEvent[]> {
    const conditions = [eq(msCalendarEvents.userId, userId)];
    if (startDate) {
      conditions.push(gte(msCalendarEvents.start, startDate));
    }
    if (endDate) {
      conditions.push(lte(msCalendarEvents.end, endDate));
    }
    return await db
      .select()
      .from(msCalendarEvents)
      .where(and(...conditions))
      .orderBy(desc(msCalendarEvents.start));
  }

  async getCalendarEvent(id: string): Promise<MsCalendarEvent | undefined> {
    const [event] = await db
      .select()
      .from(msCalendarEvents)
      .where(eq(msCalendarEvents.id, id));
    return event || undefined;
  }

  async deleteCalendarEvent(msEventId: string): Promise<void> {
    await db.delete(msCalendarEvents).where(eq(msCalendarEvents.msEventId, msEventId));
  }

  async upsertEventAttendee(attendee: InsertMsEventAttendee): Promise<MsEventAttendee> {
    const [result] = await db
      .insert(msEventAttendees)
      .values(attendee)
      .onConflictDoUpdate({
        target: [msEventAttendees.eventId, msEventAttendees.email],
        set: attendee,
      })
      .returning();
    return result;
  }

  async getEventAttendees(eventId: string): Promise<MsEventAttendee[]> {
    return await db
      .select()
      .from(msEventAttendees)
      .where(eq(msEventAttendees.eventId, eventId));
  }

  async upsertRecurrencePattern(pattern: InsertMsRecurrencePattern): Promise<MsRecurrencePattern> {
    const [result] = await db
      .insert(msRecurrencePatterns)
      .values(pattern)
      .onConflictDoUpdate({
        target: msRecurrencePatterns.id,
        set: pattern,
      })
      .returning();
    return result;
  }

  // To Do
  async upsertTodoList(list: InsertMsTodoList): Promise<MsTodoList> {
    const [result] = await db
      .insert(msTodoLists)
      .values(list)
      .onConflictDoUpdate({
        target: msTodoLists.msListId,
        set: {
          ...list,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getTodoLists(userId: string): Promise<MsTodoList[]> {
    return await db
      .select()
      .from(msTodoLists)
      .where(eq(msTodoLists.userId, userId))
      .orderBy(desc(msTodoLists.createdAt));
  }

  async upsertTodoTask(task: InsertMsTodoTask): Promise<MsTodoTask> {
    const [result] = await db
      .insert(msTodoTasks)
      .values(task)
      .onConflictDoUpdate({
        target: msTodoTasks.msTaskId,
        set: {
          listId: task.listId,
          userId: task.userId,
          title: task.title,
          body: task.body,
          importance: task.importance,
          status: task.status,
          isReminderOn: task.isReminderOn,
          reminderDateTime: task.reminderDateTime,
          dueDateTime: task.dueDateTime,
          completedDateTime: task.completedDateTime,
          startDateTime: task.startDateTime,
          categories: task.categories,
          hasAttachments: task.hasAttachments,
          linkedResources: task.linkedResources,
          recurrence: task.recurrence,
          checklistItems: task.checklistItems,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getTodoTasks(listId: string): Promise<MsTodoTask[]> {
    return await db
      .select()
      .from(msTodoTasks)
      .where(eq(msTodoTasks.listId, listId))
      .orderBy(desc(msTodoTasks.createdAt));
  }

  async getTodoTasksByUser(userId: string): Promise<MsTodoTask[]> {
    return await db
      .select()
      .from(msTodoTasks)
      .where(eq(msTodoTasks.userId, userId))
      .orderBy(desc(msTodoTasks.createdAt));
  }

  // Presence
  async createPresenceSnapshot(snapshot: InsertMsPresenceSnapshot): Promise<MsPresenceSnapshot> {
    const [result] = await db.insert(msPresenceSnapshots).values(snapshot).returning();
    return result;
  }

  async getLatestPresence(userId: string): Promise<MsPresenceSnapshot | undefined> {
    const [snapshot] = await db
      .select()
      .from(msPresenceSnapshots)
      .where(eq(msPresenceSnapshots.userId, userId))
      .orderBy(desc(msPresenceSnapshots.recordedAt))
      .limit(1);
    return snapshot || undefined;
  }

  async getPresenceHistory(userId: string, since: Date): Promise<MsPresenceSnapshot[]> {
    return await db
      .select()
      .from(msPresenceSnapshots)
      .where(and(eq(msPresenceSnapshots.userId, userId), gte(msPresenceSnapshots.recordedAt, since)))
      .orderBy(desc(msPresenceSnapshots.recordedAt));
  }

  // Chat
  async upsertChatThread(thread: InsertMsChatThread): Promise<MsChatThread> {
    const [result] = await db
      .insert(msChatThreads)
      .values(thread)
      .onConflictDoUpdate({
        target: msChatThreads.msChatId,
        set: thread,
      })
      .returning();
    return result;
  }

  async getChatThreads(limit: number = 50): Promise<MsChatThread[]> {
    return await db
      .select()
      .from(msChatThreads)
      .orderBy(desc(msChatThreads.lastUpdatedDateTime))
      .limit(limit);
  }

  async upsertChatParticipant(participant: InsertMsChatParticipant): Promise<MsChatParticipant> {
    const [result] = await db
      .insert(msChatParticipants)
      .values(participant)
      .onConflictDoUpdate({
        target: msChatParticipants.id,
        set: participant,
      })
      .returning();
    return result;
  }

  async getChatParticipants(chatId: string): Promise<MsChatParticipant[]> {
    return await db
      .select()
      .from(msChatParticipants)
      .where(eq(msChatParticipants.chatId, chatId));
  }

  async upsertChatMessage(message: InsertMsChatMessage): Promise<MsChatMessage> {
    const [result] = await db
      .insert(msChatMessages)
      .values(message)
      .onConflictDoUpdate({
        target: msChatMessages.msMessageId,
        set: message,
      })
      .returning();
    return result;
  }

  async getChatMessages(chatId: string, limit: number = 100): Promise<MsChatMessage[]> {
    return await db
      .select()
      .from(msChatMessages)
      .where(eq(msChatMessages.chatId, chatId))
      .orderBy(desc(msChatMessages.sentDateTime))
      .limit(limit);
  }

  // Contacts
  async upsertContact(contact: InsertMsContact): Promise<MsContact> {
    const [result] = await db
      .insert(msContacts)
      .values(contact)
      .onConflictDoUpdate({
        target: msContacts.msContactId,
        set: {
          ...contact,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getContacts(userId: string): Promise<MsContact[]> {
    return await db
      .select()
      .from(msContacts)
      .where(eq(msContacts.userId, userId))
      .orderBy(msContacts.displayName);
  }

  async getContact(id: string): Promise<MsContact | undefined> {
    const [contact] = await db
      .select()
      .from(msContacts)
      .where(eq(msContacts.id, id));
    return contact || undefined;
  }

  async searchContacts(userId: string, query: string): Promise<MsContact[]> {
    const searchPattern = `%${query}%`;
    return await db
      .select()
      .from(msContacts)
      .where(
        and(
          eq(msContacts.userId, userId),
          or(
            ilike(msContacts.displayName, searchPattern),
            ilike(msContacts.companyName, searchPattern)
          )
        )
      )
      .orderBy(msContacts.displayName);
  }

  // Drive Items
  async upsertDriveItem(item: InsertMsDriveItem): Promise<MsDriveItem> {
    const [result] = await db
      .insert(msDriveItems)
      .values(item)
      .onConflictDoUpdate({
        target: msDriveItems.msDriveItemId,
        set: {
          ...item,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getDriveItems(userId: string, source?: string): Promise<MsDriveItem[]> {
    if (source) {
      return await db
        .select()
        .from(msDriveItems)
        .where(and(eq(msDriveItems.userId, userId), eq(msDriveItems.source, source)))
        .orderBy(desc(msDriveItems.lastModifiedDateTime));
    }
    return await db
      .select()
      .from(msDriveItems)
      .where(eq(msDriveItems.userId, userId))
      .orderBy(desc(msDriveItems.lastModifiedDateTime));
  }

  async getDriveItem(id: string): Promise<MsDriveItem | undefined> {
    const [item] = await db
      .select()
      .from(msDriveItems)
      .where(eq(msDriveItems.id, id));
    return item || undefined;
  }

  async searchDriveItems(userId: string, query: string): Promise<MsDriveItem[]> {
    const searchPattern = `%${query}%`;
    return await db
      .select()
      .from(msDriveItems)
      .where(
        and(
          eq(msDriveItems.userId, userId),
          ilike(msDriveItems.name, searchPattern)
        )
      )
      .orderBy(desc(msDriveItems.lastModifiedDateTime));
  }

  // AI Action Items
  async createAiActionItem(item: InsertAiActionItem): Promise<AiActionItem> {
    const [result] = await db.insert(aiActionItems).values(item).returning();
    return result;
  }

  async getAiActionItems(userId: string, status?: string): Promise<AiActionItem[]> {
    if (status) {
      return await db
        .select()
        .from(aiActionItems)
        .where(and(eq(aiActionItems.userId, userId), eq(aiActionItems.status, status)))
        .orderBy(desc(aiActionItems.createdAt));
    }
    return await db
      .select()
      .from(aiActionItems)
      .where(eq(aiActionItems.userId, userId))
      .orderBy(desc(aiActionItems.createdAt));
  }

  async updateAiActionItem(id: string, data: Partial<AiActionItem>): Promise<AiActionItem> {
    const [result] = await db
      .update(aiActionItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(aiActionItems.id, id))
      .returning();
    return result;
  }

  // AI Reminders
  async createAiReminder(reminder: InsertAiReminder): Promise<AiReminder> {
    const [result] = await db.insert(aiReminders).values(reminder).returning();
    return result;
  }

  async getPendingReminders(before?: Date): Promise<AiReminder[]> {
    if (before) {
      return await db
        .select()
        .from(aiReminders)
        .where(and(eq(aiReminders.status, "pending"), lte(aiReminders.triggerAt, before)))
        .orderBy(aiReminders.triggerAt);
    }
    return await db
      .select()
      .from(aiReminders)
      .where(eq(aiReminders.status, "pending"))
      .orderBy(aiReminders.triggerAt);
  }

  async getUserReminders(userId: string, status?: string): Promise<AiReminder[]> {
    if (status) {
      return await db
        .select()
        .from(aiReminders)
        .where(and(eq(aiReminders.userId, userId), eq(aiReminders.status, status)))
        .orderBy(desc(aiReminders.triggerAt));
    }
    return await db
      .select()
      .from(aiReminders)
      .where(eq(aiReminders.userId, userId))
      .orderBy(desc(aiReminders.triggerAt));
  }

  async updateAiReminder(id: string, data: Partial<AiReminder>): Promise<AiReminder> {
    const [result] = await db
      .update(aiReminders)
      .set(data)
      .where(eq(aiReminders.id, id))
      .returning();
    return result;
  }

  // AI Notifications
  async createAiNotification(notification: InsertAiNotification): Promise<AiNotification> {
    const [result] = await db.insert(aiNotifications).values(notification).returning();
    return result;
  }

  async getUserNotifications(userId: string, status?: string): Promise<AiNotification[]> {
    if (status) {
      return await db
        .select()
        .from(aiNotifications)
        .where(and(eq(aiNotifications.userId, userId), eq(aiNotifications.status, status)))
        .orderBy(desc(aiNotifications.createdAt));
    }
    return await db
      .select()
      .from(aiNotifications)
      .where(eq(aiNotifications.userId, userId))
      .orderBy(desc(aiNotifications.createdAt));
  }

  async updateAiNotification(id: string, data: Partial<AiNotification>): Promise<AiNotification> {
    const [result] = await db
      .update(aiNotifications)
      .set(data)
      .where(eq(aiNotifications.id, id))
      .returning();
    return result;
  }

  // AI Insights
  async createAiInsight(insight: InsertAiInsight): Promise<AiInsight> {
    const [result] = await db.insert(aiInsights).values(insight).returning();
    return result;
  }

  async getAiInsights(userId?: string, type?: string): Promise<AiInsight[]> {
    const conditions = [];
    if (userId) {
      conditions.push(eq(aiInsights.userId, userId));
    }
    if (type) {
      conditions.push(eq(aiInsights.type, type));
    }
    if (conditions.length > 0) {
      return await db
        .select()
        .from(aiInsights)
        .where(and(...conditions))
        .orderBy(desc(aiInsights.generatedAt));
    }
    return await db
      .select()
      .from(aiInsights)
      .orderBy(desc(aiInsights.generatedAt));
  }

  async getLatestInsight(userId: string, type: string): Promise<AiInsight | undefined> {
    const [insight] = await db
      .select()
      .from(aiInsights)
      .where(and(eq(aiInsights.userId, userId), eq(aiInsights.type, type)))
      .orderBy(desc(aiInsights.generatedAt))
      .limit(1);
    return insight || undefined;
  }
}

export const storage = new DatabaseStorage();
