import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth with role-based access control
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("employee"), // employee, manager, admin
  department: varchar("department"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const upsertUserSchema = createInsertSchema(users);
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

// Documents in the knowledge hub
export const documents = pgTable("documents", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // policy, training, operational, other
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type").notNull(),
  source: varchar("source").notNull(), // upload, onedrive, sharepoint
  sourceId: varchar("source_id"), // external ID from OneDrive/SharePoint
  uploadedById: varchar("uploaded_by_id").references(() => users.id),
  content: text("content"), // extracted text content for AI search
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [documents.uploadedById],
    references: [users.id],
  }),
}));

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// Meeting notes and recordings
export const meetings = pgTable("meetings", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  meetingDate: timestamp("meeting_date").notNull(),
  attendees: text("attendees").array(), // user IDs
  transcript: text("transcript"),
  summary: text("summary"), // AI-generated
  actionItems: jsonb("action_items"), // AI-extracted action items
  source: varchar("source").notNull(), // manual, teams, hubspot
  sourceId: varchar("source_id"), // external meeting ID
  uploadedById: varchar("uploaded_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const meetingsRelations = relations(meetings, ({ one }) => ({
  uploadedBy: one(users, {
    fields: [meetings.uploadedById],
    references: [users.id],
  }),
}));

export const insertMeetingSchema = createInsertSchema(meetings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type Meeting = typeof meetings.$inferSelect;

// Tasks and action items
export const tasks = pgTable("tasks", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  assignedToId: varchar("assigned_to_id").references(() => users.id),
  assignedById: varchar("assigned_by_id").references(() => users.id),
  status: varchar("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  priority: varchar("priority").notNull().default("medium"), // low, medium, high, urgent
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  source: varchar("source").notNull().default("manual"), // manual, ai_meeting, ai_email
  sourceId: varchar("source_id"), // meeting or email ID
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  assignedTo: one(users, {
    fields: [tasks.assignedToId],
    references: [users.id],
  }),
  assignedBy: one(users, {
    fields: [tasks.assignedById],
    references: [users.id],
  }),
}));

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Activity logs for tracking all portal interactions
export const activityLogs = pgTable("activity_logs", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action").notNull(), // login, logout, view_document, upload_document, etc.
  resourceType: varchar("resource_type"), // document, meeting, task, email, etc.
  resourceId: varchar("resource_id"),
  metadata: jsonb("metadata"), // additional context
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

// Email communications from Outlook
export const emails = pgTable("emails", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  outlookId: varchar("outlook_id").unique().notNull(),
  userId: varchar("user_id").references(() => users.id),
  subject: text("subject"),
  from: text("from").notNull(),
  to: text("to").array(),
  cc: text("cc").array(),
  body: text("body"),
  receivedAt: timestamp("received_at").notNull(),
  isRead: boolean("is_read").default(false),
  hasAttachments: boolean("has_attachments").default(false),
  importance: varchar("importance"),
  conversationId: varchar("conversation_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailsRelations = relations(emails, ({ one }) => ({
  user: one(users, {
    fields: [emails.userId],
    references: [users.id],
  }),
}));

export const insertEmailSchema = createInsertSchema(emails).omit({
  id: true,
  createdAt: true,
});
export type InsertEmail = z.infer<typeof insertEmailSchema>;
export type Email = typeof emails.$inferSelect;

// HubSpot communications (client/prospect interactions)
export const hubspotCommunications = pgTable("hubspot_communications", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  hubspotId: varchar("hubspot_id").unique().notNull(),
  type: varchar("type").notNull(), // meeting, call, email, note
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  companyName: text("company_name"),
  subject: text("subject"),
  body: text("body"),
  ownerId: varchar("owner_id").references(() => users.id),
  occurredAt: timestamp("occurred_at").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hubspotCommunicationsRelations = relations(
  hubspotCommunications,
  ({ one }) => ({
    owner: one(users, {
      fields: [hubspotCommunications.ownerId],
      references: [users.id],
    }),
  }),
);

export const insertHubspotCommunicationSchema = createInsertSchema(
  hubspotCommunications,
).omit({
  id: true,
  createdAt: true,
});
export type InsertHubspotCommunication = z.infer<
  typeof insertHubspotCommunicationSchema
>;
export type HubspotCommunication = typeof hubspotCommunications.$inferSelect;
