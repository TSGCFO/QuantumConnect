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
  // New hierarchical tables
  departments,
  teams,
  teamMembers,
  performanceMetrics,
  employeeMetricValues,
  performancePeriods,
  followUps,
  followUpCompletions,
  alertRules,
  alertInstances,
  callRecords,
  interactionScores,
  managerReports,
  reportSubscriptions,
  userExtendedProfiles,
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
  // New hierarchical types
  type Department,
  type InsertDepartment,
  type Team,
  type InsertTeam,
  type TeamMember,
  type InsertTeamMember,
  type PerformanceMetric,
  type InsertPerformanceMetric,
  type EmployeeMetricValue,
  type InsertEmployeeMetricValue,
  type PerformancePeriod,
  type InsertPerformancePeriod,
  type FollowUp,
  type InsertFollowUp,
  type FollowUpCompletion,
  type InsertFollowUpCompletion,
  type AlertRule,
  type InsertAlertRule,
  type AlertInstance,
  type InsertAlertInstance,
  type CallRecord,
  type InsertCallRecord,
  type InteractionScore,
  type InsertInteractionScore,
  type ManagerReport,
  type InsertManagerReport,
  type ReportSubscription,
  type InsertReportSubscription,
  type UserExtendedProfile,
  type InsertUserExtendedProfile,
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
  getEmails(userId?: string): Promise<Email[]>;
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

  // ============================================================================
  // DEPARTMENTS
  // ============================================================================

  async createDepartment(dept: InsertDepartment): Promise<Department> {
    const [result] = await db.insert(departments).values(dept).returning();
    return result;
  }

  async getDepartments(): Promise<Department[]> {
    return await db.select().from(departments).where(eq(departments.isActive, true));
  }

  async getDepartment(id: string): Promise<Department | undefined> {
    const [result] = await db.select().from(departments).where(eq(departments.id, id));
    return result || undefined;
  }

  async updateDepartment(id: string, data: Partial<InsertDepartment>): Promise<Department> {
    const [result] = await db
      .update(departments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(departments.id, id))
      .returning();
    return result;
  }

  async deleteDepartment(id: string): Promise<void> {
    await db.update(departments).set({ isActive: false, updatedAt: new Date() }).where(eq(departments.id, id));
  }

  // ============================================================================
  // TEAMS
  // ============================================================================

  async createTeam(team: InsertTeam): Promise<Team> {
    const [result] = await db.insert(teams).values(team).returning();
    return result;
  }

  async getTeams(departmentId?: string): Promise<Team[]> {
    if (departmentId) {
      return await db
        .select()
        .from(teams)
        .where(and(eq(teams.departmentId, departmentId), eq(teams.isActive, true)));
    }
    return await db.select().from(teams).where(eq(teams.isActive, true));
  }

  async getTeam(id: string): Promise<Team | undefined> {
    const [result] = await db.select().from(teams).where(eq(teams.id, id));
    return result || undefined;
  }

  async updateTeam(id: string, data: Partial<InsertTeam>): Promise<Team> {
    const [result] = await db
      .update(teams)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(teams.id, id))
      .returning();
    return result;
  }

  async deleteTeam(id: string): Promise<void> {
    await db.update(teams).set({ isActive: false, updatedAt: new Date() }).where(eq(teams.id, id));
  }

  // ============================================================================
  // TEAM MEMBERS
  // ============================================================================

  async addTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [result] = await db.insert(teamMembers).values(member).returning();
    return result;
  }

  async getTeamMembers(teamId: string): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.isActive, true)));
  }

  async getUserTeams(userId: string): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(and(eq(teamMembers.userId, userId), eq(teamMembers.isActive, true)));
  }

  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    await db
      .update(teamMembers)
      .set({ isActive: false, leftAt: new Date() })
      .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));
  }

  // ============================================================================
  // PERFORMANCE METRICS
  // ============================================================================

  async createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric> {
    const [result] = await db.insert(performanceMetrics).values(metric).returning();
    return result;
  }

  async getPerformanceMetrics(departmentId?: string): Promise<PerformanceMetric[]> {
    if (departmentId) {
      return await db
        .select()
        .from(performanceMetrics)
        .where(and(eq(performanceMetrics.departmentId, departmentId), eq(performanceMetrics.isActive, true)))
        .orderBy(performanceMetrics.displayOrder);
    }
    return await db
      .select()
      .from(performanceMetrics)
      .where(eq(performanceMetrics.isActive, true))
      .orderBy(performanceMetrics.displayOrder);
  }

  async getPerformanceMetric(id: string): Promise<PerformanceMetric | undefined> {
    const [result] = await db.select().from(performanceMetrics).where(eq(performanceMetrics.id, id));
    return result || undefined;
  }

  async updatePerformanceMetric(id: string, data: Partial<InsertPerformanceMetric>): Promise<PerformanceMetric> {
    const [result] = await db
      .update(performanceMetrics)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(performanceMetrics.id, id))
      .returning();
    return result;
  }

  // ============================================================================
  // EMPLOYEE METRIC VALUES
  // ============================================================================

  async createEmployeeMetricValue(value: InsertEmployeeMetricValue): Promise<EmployeeMetricValue> {
    const [result] = await db.insert(employeeMetricValues).values(value).returning();
    return result;
  }

  async getEmployeeMetricValues(
    userId: string,
    metricId?: string,
    periodType?: string
  ): Promise<EmployeeMetricValue[]> {
    const conditions = [eq(employeeMetricValues.userId, userId)];
    if (metricId) conditions.push(eq(employeeMetricValues.metricId, metricId));
    if (periodType) conditions.push(eq(employeeMetricValues.periodType, periodType));

    return await db
      .select()
      .from(employeeMetricValues)
      .where(and(...conditions))
      .orderBy(desc(employeeMetricValues.periodStart));
  }

  async upsertEmployeeMetricValue(value: InsertEmployeeMetricValue): Promise<EmployeeMetricValue> {
    const [result] = await db
      .insert(employeeMetricValues)
      .values(value)
      .onConflictDoUpdate({
        target: [
          employeeMetricValues.userId,
          employeeMetricValues.metricId,
          employeeMetricValues.periodType,
          employeeMetricValues.periodStart,
        ],
        set: {
          actualValue: value.actualValue,
          targetValue: value.targetValue,
          achievementPercentage: value.achievementPercentage,
          trend: value.trend,
          previousValue: value.previousValue,
          calculatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  // ============================================================================
  // PERFORMANCE PERIODS
  // ============================================================================

  async createPerformancePeriod(period: InsertPerformancePeriod): Promise<PerformancePeriod> {
    const [result] = await db.insert(performancePeriods).values(period).returning();
    return result;
  }

  async getPerformancePeriods(status?: string): Promise<PerformancePeriod[]> {
    if (status) {
      return await db
        .select()
        .from(performancePeriods)
        .where(eq(performancePeriods.status, status))
        .orderBy(desc(performancePeriods.startDate));
    }
    return await db.select().from(performancePeriods).orderBy(desc(performancePeriods.startDate));
  }

  async getActivePerformancePeriod(periodType: string): Promise<PerformancePeriod | undefined> {
    const [result] = await db
      .select()
      .from(performancePeriods)
      .where(and(eq(performancePeriods.periodType, periodType), eq(performancePeriods.status, "active")))
      .limit(1);
    return result || undefined;
  }

  // ============================================================================
  // FOLLOW-UPS
  // ============================================================================

  async createFollowUp(followUp: InsertFollowUp): Promise<FollowUp> {
    const [result] = await db.insert(followUps).values(followUp).returning();
    return result;
  }

  async getFollowUps(userId: string, status?: string): Promise<FollowUp[]> {
    const conditions = [eq(followUps.assignedToId, userId)];
    if (status) conditions.push(eq(followUps.status, status));

    return await db
      .select()
      .from(followUps)
      .where(and(...conditions))
      .orderBy(followUps.dueDate);
  }

  async getOverdueFollowUps(userId?: string): Promise<FollowUp[]> {
    const now = new Date();
    const conditions = [eq(followUps.status, "pending"), lte(followUps.dueDate, now)];
    if (userId) conditions.push(eq(followUps.assignedToId, userId));

    return await db
      .select()
      .from(followUps)
      .where(and(...conditions))
      .orderBy(followUps.dueDate);
  }

  async getFollowUp(id: string): Promise<FollowUp | undefined> {
    const [result] = await db.select().from(followUps).where(eq(followUps.id, id));
    return result || undefined;
  }

  async updateFollowUp(id: string, data: Partial<InsertFollowUp>): Promise<FollowUp> {
    const [result] = await db
      .update(followUps)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(followUps.id, id))
      .returning();
    return result;
  }

  async completeFollowUp(id: string, notes?: string): Promise<FollowUp> {
    const [result] = await db
      .update(followUps)
      .set({
        status: "completed",
        completedAt: new Date(),
        completionNotes: notes,
        updatedAt: new Date(),
      })
      .where(eq(followUps.id, id))
      .returning();
    return result;
  }

  // ============================================================================
  // FOLLOW-UP COMPLETIONS
  // ============================================================================

  async createFollowUpCompletion(completion: InsertFollowUpCompletion): Promise<FollowUpCompletion> {
    const [result] = await db.insert(followUpCompletions).values(completion).returning();
    return result;
  }

  async getFollowUpCompletions(followUpId: string): Promise<FollowUpCompletion[]> {
    return await db
      .select()
      .from(followUpCompletions)
      .where(eq(followUpCompletions.followUpId, followUpId));
  }

  // ============================================================================
  // ALERT RULES
  // ============================================================================

  async createAlertRule(rule: InsertAlertRule): Promise<AlertRule> {
    const [result] = await db.insert(alertRules).values(rule).returning();
    return result;
  }

  async getAlertRules(active?: boolean): Promise<AlertRule[]> {
    if (active !== undefined) {
      return await db.select().from(alertRules).where(eq(alertRules.isActive, active));
    }
    return await db.select().from(alertRules);
  }

  async getAlertRule(id: string): Promise<AlertRule | undefined> {
    const [result] = await db.select().from(alertRules).where(eq(alertRules.id, id));
    return result || undefined;
  }

  async updateAlertRule(id: string, data: Partial<InsertAlertRule>): Promise<AlertRule> {
    const [result] = await db
      .update(alertRules)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(alertRules.id, id))
      .returning();
    return result;
  }

  async deleteAlertRule(id: string): Promise<void> {
    await db.update(alertRules).set({ isActive: false, updatedAt: new Date() }).where(eq(alertRules.id, id));
  }

  // ============================================================================
  // ALERT INSTANCES
  // ============================================================================

  async createAlertInstance(alert: InsertAlertInstance): Promise<AlertInstance> {
    const [result] = await db.insert(alertInstances).values(alert).returning();
    return result;
  }

  async getAlertInstances(userId: string, status?: string): Promise<AlertInstance[]> {
    const conditions = [eq(alertInstances.triggeredForUserId, userId)];
    if (status) conditions.push(eq(alertInstances.status, status));

    return await db
      .select()
      .from(alertInstances)
      .where(and(...conditions))
      .orderBy(desc(alertInstances.createdAt));
  }

  async getPendingAlerts(userId: string): Promise<AlertInstance[]> {
    return await db
      .select()
      .from(alertInstances)
      .where(and(eq(alertInstances.triggeredForUserId, userId), eq(alertInstances.status, "pending")))
      .orderBy(desc(alertInstances.createdAt));
  }

  async acknowledgeAlert(id: string, userId: string): Promise<AlertInstance> {
    const [result] = await db
      .update(alertInstances)
      .set({
        status: "acknowledged",
        acknowledgedById: userId,
        acknowledgedAt: new Date(),
      })
      .where(eq(alertInstances.id, id))
      .returning();
    return result;
  }

  async resolveAlert(id: string, userId: string, notes?: string): Promise<AlertInstance> {
    const [result] = await db
      .update(alertInstances)
      .set({
        status: "resolved",
        resolvedById: userId,
        resolvedAt: new Date(),
        resolutionNotes: notes,
      })
      .where(eq(alertInstances.id, id))
      .returning();
    return result;
  }

  async dismissAlert(id: string): Promise<AlertInstance> {
    const [result] = await db
      .update(alertInstances)
      .set({ status: "dismissed" })
      .where(eq(alertInstances.id, id))
      .returning();
    return result;
  }

  // ============================================================================
  // CALL RECORDS
  // ============================================================================

  async createCallRecord(call: InsertCallRecord): Promise<CallRecord> {
    const [result] = await db.insert(callRecords).values(call).returning();
    return result;
  }

  async getCallRecords(userId: string, startDate?: Date, endDate?: Date): Promise<CallRecord[]> {
    const conditions = [eq(callRecords.userId, userId)];
    if (startDate) conditions.push(gte(callRecords.startedAt, startDate));
    if (endDate) conditions.push(lte(callRecords.startedAt, endDate));

    return await db
      .select()
      .from(callRecords)
      .where(and(...conditions))
      .orderBy(desc(callRecords.startedAt));
  }

  async getCallRecord(id: string): Promise<CallRecord | undefined> {
    const [result] = await db.select().from(callRecords).where(eq(callRecords.id, id));
    return result || undefined;
  }

  async updateCallRecord(id: string, data: Partial<InsertCallRecord>): Promise<CallRecord> {
    const [result] = await db
      .update(callRecords)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(callRecords.id, id))
      .returning();
    return result;
  }

  async upsertCallRecord(call: InsertCallRecord): Promise<CallRecord> {
    if (call.msCallId) {
      const [result] = await db
        .insert(callRecords)
        .values(call)
        .onConflictDoUpdate({
          target: callRecords.msCallId,
          set: { ...call, updatedAt: new Date() },
        })
        .returning();
      return result;
    }
    return this.createCallRecord(call);
  }

  // ============================================================================
  // INTERACTION SCORES
  // ============================================================================

  async createInteractionScore(score: InsertInteractionScore): Promise<InteractionScore> {
    const [result] = await db.insert(interactionScores).values(score).returning();
    return result;
  }

  async getInteractionScores(userId: string, interactionType?: string): Promise<InteractionScore[]> {
    const conditions = [eq(interactionScores.userId, userId)];
    if (interactionType) conditions.push(eq(interactionScores.interactionType, interactionType));

    return await db
      .select()
      .from(interactionScores)
      .where(and(...conditions))
      .orderBy(desc(interactionScores.scoredAt));
  }

  async getInteractionScore(interactionType: string, sourceId: string): Promise<InteractionScore | undefined> {
    const [result] = await db
      .select()
      .from(interactionScores)
      .where(and(eq(interactionScores.interactionType, interactionType), eq(interactionScores.sourceId, sourceId)));
    return result || undefined;
  }

  async getAverageScores(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ avgOverall: number; avgEngagement: number; avgCommunication: number }> {
    const result = await db
      .select({
        avgOverall: sql<number>`AVG(${interactionScores.overallScore})`,
        avgEngagement: sql<number>`AVG(${interactionScores.engagementScore})`,
        avgCommunication: sql<number>`AVG(${interactionScores.communicationScore})`,
      })
      .from(interactionScores)
      .where(
        and(
          eq(interactionScores.userId, userId),
          gte(interactionScores.scoredAt, startDate),
          lte(interactionScores.scoredAt, endDate)
        )
      );
    return result[0] || { avgOverall: 0, avgEngagement: 0, avgCommunication: 0 };
  }

  // ============================================================================
  // MANAGER REPORTS
  // ============================================================================

  async createManagerReport(report: InsertManagerReport): Promise<ManagerReport> {
    const [result] = await db.insert(managerReports).values(report).returning();
    return result;
  }

  async getManagerReports(userId: string, reportType?: string): Promise<ManagerReport[]> {
    const conditions = [eq(managerReports.generatedForId, userId)];
    if (reportType) conditions.push(eq(managerReports.reportType, reportType));

    return await db
      .select()
      .from(managerReports)
      .where(and(...conditions))
      .orderBy(desc(managerReports.generatedAt));
  }

  async getManagerReport(id: string): Promise<ManagerReport | undefined> {
    const [result] = await db.select().from(managerReports).where(eq(managerReports.id, id));
    return result || undefined;
  }

  async markReportViewed(id: string): Promise<ManagerReport> {
    const [result] = await db
      .update(managerReports)
      .set({ viewedAt: new Date() })
      .where(eq(managerReports.id, id))
      .returning();
    return result;
  }

  // ============================================================================
  // REPORT SUBSCRIPTIONS
  // ============================================================================

  async createReportSubscription(subscription: InsertReportSubscription): Promise<ReportSubscription> {
    const [result] = await db.insert(reportSubscriptions).values(subscription).returning();
    return result;
  }

  async getReportSubscriptions(userId: string): Promise<ReportSubscription[]> {
    return await db
      .select()
      .from(reportSubscriptions)
      .where(eq(reportSubscriptions.userId, userId));
  }

  async getActiveReportSubscriptions(): Promise<ReportSubscription[]> {
    return await db
      .select()
      .from(reportSubscriptions)
      .where(eq(reportSubscriptions.isActive, true));
  }

  async getDueReportSubscriptions(before: Date): Promise<ReportSubscription[]> {
    return await db
      .select()
      .from(reportSubscriptions)
      .where(and(eq(reportSubscriptions.isActive, true), lte(reportSubscriptions.nextDeliveryAt, before)));
  }

  async updateReportSubscription(id: string, data: Partial<InsertReportSubscription>): Promise<ReportSubscription> {
    const [result] = await db
      .update(reportSubscriptions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reportSubscriptions.id, id))
      .returning();
    return result;
  }

  async deleteReportSubscription(id: string): Promise<void> {
    await db.delete(reportSubscriptions).where(eq(reportSubscriptions.id, id));
  }

  // ============================================================================
  // USER EXTENDED PROFILES
  // ============================================================================

  async createUserExtendedProfile(profile: InsertUserExtendedProfile): Promise<UserExtendedProfile> {
    const [result] = await db.insert(userExtendedProfiles).values(profile).returning();
    return result;
  }

  async getUserExtendedProfile(userId: string): Promise<UserExtendedProfile | undefined> {
    const [result] = await db
      .select()
      .from(userExtendedProfiles)
      .where(eq(userExtendedProfiles.userId, userId));
    return result || undefined;
  }

  async upsertUserExtendedProfile(profile: InsertUserExtendedProfile): Promise<UserExtendedProfile> {
    const [result] = await db
      .insert(userExtendedProfiles)
      .values(profile)
      .onConflictDoUpdate({
        target: userExtendedProfiles.userId,
        set: { ...profile, updatedAt: new Date() },
      })
      .returning();
    return result;
  }

  async getDirectReports(managerId: string): Promise<UserExtendedProfile[]> {
    return await db
      .select()
      .from(userExtendedProfiles)
      .where(eq(userExtendedProfiles.directManagerId, managerId));
  }

  // ============================================================================
  // HIERARCHY QUERIES
  // ============================================================================

  async getTeamWithMembers(teamId: string): Promise<{ team: Team; members: TeamMember[] } | undefined> {
    const team = await this.getTeam(teamId);
    if (!team) return undefined;
    const members = await this.getTeamMembers(teamId);
    return { team, members };
  }

  async getDepartmentWithTeams(departmentId: string): Promise<{ department: Department; teams: Team[] } | undefined> {
    const department = await this.getDepartment(departmentId);
    if (!department) return undefined;
    const teamsList = await this.getTeams(departmentId);
    return { department, teams: teamsList };
  }

  async getUserHierarchy(userId: string): Promise<{
    user: User;
    extendedProfile?: UserExtendedProfile;
    teams: TeamMember[];
    directReports: UserExtendedProfile[];
  } | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;

    const extendedProfile = await this.getUserExtendedProfile(userId);
    const userTeams = await this.getUserTeams(userId);
    const directReports = await this.getDirectReports(userId);

    return { user, extendedProfile, teams: userTeams, directReports };
  }
}

export const storage = new DatabaseStorage();
