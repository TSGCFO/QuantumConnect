import {
  users,
  documents,
  meetings,
  tasks,
  activityLogs,
  emails,
  hubspotCommunications,
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
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte, sql } from "drizzle-orm";

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
    comm: InsertHubspotCommunication
  ): Promise<HubspotCommunication>;
  getHubspotCommunications(): Promise<HubspotCommunication[]>;
  hubspotCommunicationExists(hubspotId: string): Promise<boolean>;

  // Analytics operations
  getTaskStats(timeRange: string): Promise<any>;
  getDepartmentStats(timeRange: string): Promise<any[]>;
  getUserPerformance(timeRange: string): Promise<any[]>;
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
    return await db
      .select()
      .from(documents)
      .orderBy(desc(documents.createdAt));
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
        sql`LOWER(${documents.title}) LIKE ${searchPattern} OR LOWER(${documents.description}) LIKE ${searchPattern} OR LOWER(${documents.content}) LIKE ${searchPattern}`
      )
      .orderBy(desc(documents.createdAt));
  }

  // Meeting operations
  async createMeeting(meetingData: InsertMeeting): Promise<Meeting> {
    const [meeting] = await db
      .insert(meetings)
      .values(meetingData)
      .returning();
    return meeting;
  }

  async getMeetings(): Promise<Meeting[]> {
    return await db
      .select()
      .from(meetings)
      .orderBy(desc(meetings.meetingDate));
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
    commData: InsertHubspotCommunication
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
      (t) => t.status === "pending" || t.status === "in_progress"
    ).length;
    const overdue = allTasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "completed"
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
}

export const storage = new DatabaseStorage();
