import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  integer,
  boolean,
  date,
  bigint,
  real,
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

// Extended Microsoft 365 user profile data
export const msUserProfiles = pgTable("ms_user_profiles", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .references(() => users.id)
    .unique()
    .notNull(),
  msUserId: varchar("ms_user_id").unique().notNull(),
  jobTitle: text("job_title"),
  department: text("department"),
  officeLocation: text("office_location"),
  city: text("city"),
  country: text("country"),
  timezone: varchar("timezone"),
  managerId: varchar("manager_id").references(() => users.id),
  employeeType: varchar("employee_type"), // employee, contractor, etc.
  mobilePhone: varchar("mobile_phone"),
  businessPhones: text("business_phones").array(),
  preferredLanguage: varchar("preferred_language"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const msUserProfilesRelations = relations(msUserProfiles, ({ one }) => ({
  user: one(users, {
    fields: [msUserProfiles.userId],
    references: [users.id],
  }),
  manager: one(users, {
    fields: [msUserProfiles.managerId],
    references: [users.id],
  }),
}));

export const insertMsUserProfileSchema = createInsertSchema(msUserProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsUserProfile = z.infer<typeof insertMsUserProfileSchema>;
export type MsUserProfile = typeof msUserProfiles.$inferSelect;

// Track sync status per user per resource type
export const userSyncStates = pgTable(
  "user_sync_states",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    resourceType: varchar("resource_type").notNull(), // calendar, tasks, presence, chat, contacts, files
    lastSyncedAt: timestamp("last_synced_at"),
    deltaToken: text("delta_token"), // Microsoft Graph delta token for incremental sync
    status: varchar("status").notNull().default("idle"), // idle, syncing, error
    errorMessage: text("error_message"),
    itemCount: integer("item_count").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("user_sync_states_user_resource_unique").on(
      table.userId,
      table.resourceType,
    ),
  ],
);

export const userSyncStatesRelations = relations(userSyncStates, ({ one }) => ({
  user: one(users, {
    fields: [userSyncStates.userId],
    references: [users.id],
  }),
}));

export const insertUserSyncStateSchema = createInsertSchema(userSyncStates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUserSyncState = z.infer<typeof insertUserSyncStateSchema>;
export type UserSyncState = typeof userSyncStates.$inferSelect;

// Audit log for sync operations
export const syncJobs = pgTable("sync_jobs", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id), // nullable for all-user syncs
  resourceType: varchar("resource_type").notNull(),
  syncType: varchar("sync_type").notNull(), // full, delta
  status: varchar("status").notNull(), // started, completed, failed
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  itemsProcessed: integer("items_processed").default(0),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata"),
});

export const syncJobsRelations = relations(syncJobs, ({ one }) => ({
  user: one(users, {
    fields: [syncJobs.userId],
    references: [users.id],
  }),
}));

export const insertSyncJobSchema = createInsertSchema(syncJobs).omit({
  id: true,
  startedAt: true,
});
export type InsertSyncJob = z.infer<typeof insertSyncJobSchema>;
export type SyncJob = typeof syncJobs.$inferSelect;

// Microsoft 365 Calendar - Recurrence patterns for recurring events
export const msRecurrencePatterns = pgTable("ms_recurrence_patterns", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  type: varchar("type").notNull(), // daily, weekly, absoluteMonthly, relativeMonthly, absoluteYearly, relativeYearly
  interval: integer("interval").notNull(), // repeat every N days/weeks/months
  daysOfWeek: text("days_of_week").array(), // sunday, monday, etc.
  dayOfMonth: integer("day_of_month"), // for monthly/yearly
  firstDayOfWeek: varchar("first_day_of_week").default("sunday"),
  month: integer("month"), // for yearly (1-12)
  rangeType: varchar("range_type").notNull(), // endDate, noEnd, numbered
  rangeStartDate: date("range_start_date").notNull(),
  rangeEndDate: date("range_end_date"),
  numberOfOccurrences: integer("number_of_occurrences"),
});

export const msRecurrencePatternsRelations = relations(
  msRecurrencePatterns,
  ({ many }) => ({
    events: many(msCalendarEvents),
  }),
);

export const insertMsRecurrencePatternSchema = createInsertSchema(
  msRecurrencePatterns,
).omit({
  id: true,
});
export type InsertMsRecurrencePattern = z.infer<
  typeof insertMsRecurrencePatternSchema
>;
export type MsRecurrencePattern = typeof msRecurrencePatterns.$inferSelect;

// Microsoft 365 Calendar - Calendar events from Outlook
export const msCalendarEvents = pgTable("ms_calendar_events", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  msEventId: varchar("ms_event_id").unique().notNull(),
  subject: text("subject"),
  bodyPreview: text("body_preview"),
  bodyContent: text("body_content"),
  start: timestamp("start", { withTimezone: true }).notNull(),
  end: timestamp("end", { withTimezone: true }).notNull(),
  isAllDay: boolean("is_all_day").default(false),
  location: text("location"),
  onlineMeetingUrl: text("online_meeting_url"),
  isOnlineMeeting: boolean("is_online_meeting").default(false),
  organizer: jsonb("organizer"), // {email, name}
  responseStatus: varchar("response_status"), // none, organizer, tentativelyAccepted, accepted, declined
  sensitivity: varchar("sensitivity"), // normal, personal, private, confidential
  showAs: varchar("show_as"), // free, tentative, busy, oof, workingElsewhere
  importance: varchar("importance"), // low, normal, high
  isRecurring: boolean("is_recurring").default(false),
  recurrencePatternId: varchar("recurrence_pattern_id").references(
    () => msRecurrencePatterns.id,
  ),
  seriesMasterId: varchar("series_master_id"), // for recurring event instances
  isCancelled: boolean("is_cancelled").default(false),
  categories: text("categories").array(),
  webLink: text("web_link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const msCalendarEventsRelations = relations(
  msCalendarEvents,
  ({ one, many }) => ({
    user: one(users, {
      fields: [msCalendarEvents.userId],
      references: [users.id],
    }),
    recurrencePattern: one(msRecurrencePatterns, {
      fields: [msCalendarEvents.recurrencePatternId],
      references: [msRecurrencePatterns.id],
    }),
    attendees: many(msEventAttendees),
  }),
);

export const insertMsCalendarEventSchema = createInsertSchema(
  msCalendarEvents,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsCalendarEvent = z.infer<typeof insertMsCalendarEventSchema>;
export type MsCalendarEvent = typeof msCalendarEvents.$inferSelect;

// Microsoft 365 Calendar - Attendees for calendar events
export const msEventAttendees = pgTable(
  "ms_event_attendees",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    eventId: varchar("event_id")
      .references(() => msCalendarEvents.id)
      .notNull(),
    email: varchar("email").notNull(),
    name: text("name"),
    type: varchar("type").notNull(), // required, optional, resource
    responseStatus: varchar("response_status"), // none, organizer, tentativelyAccepted, accepted, declined
    responseTime: timestamp("response_time"),
  },
  (table) => [
    index("ms_event_attendees_event_id_idx").on(table.eventId),
  ],
);

export const msEventAttendeesRelations = relations(
  msEventAttendees,
  ({ one }) => ({
    event: one(msCalendarEvents, {
      fields: [msEventAttendees.eventId],
      references: [msCalendarEvents.id],
    }),
  }),
);

export const insertMsEventAttendeeSchema = createInsertSchema(
  msEventAttendees,
).omit({
  id: true,
});
export type InsertMsEventAttendee = z.infer<typeof insertMsEventAttendeeSchema>;
export type MsEventAttendee = typeof msEventAttendees.$inferSelect;

// Microsoft To Do - Task lists
export const msTodoLists = pgTable("ms_todo_lists", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  msListId: varchar("ms_list_id").unique().notNull(),
  displayName: text("display_name").notNull(),
  isOwner: boolean("is_owner").default(true),
  isShared: boolean("is_shared").default(false),
  wellknownListName: varchar("wellknown_list_name"), // none, defaultList, flaggedEmails, unknownFutureValue
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const msTodoListsRelations = relations(msTodoLists, ({ one, many }) => ({
  user: one(users, {
    fields: [msTodoLists.userId],
    references: [users.id],
  }),
  tasks: many(msTodoTasks),
}));

export const insertMsTodoListSchema = createInsertSchema(msTodoLists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsTodoList = z.infer<typeof insertMsTodoListSchema>;
export type MsTodoList = typeof msTodoLists.$inferSelect;

// Microsoft To Do - Tasks
export const msTodoTasks = pgTable(
  "ms_todo_tasks",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    listId: varchar("list_id")
      .references(() => msTodoLists.id)
      .notNull(),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    msTaskId: varchar("ms_task_id").unique().notNull(),
    title: text("title").notNull(),
    body: text("body"),
    importance: varchar("importance").notNull().default("normal"), // low, normal, high
    status: varchar("status").notNull().default("notStarted"), // notStarted, inProgress, completed, waitingOnOthers, deferred
    isReminderOn: boolean("is_reminder_on").default(false),
    reminderDateTime: timestamp("reminder_date_time", { withTimezone: true }),
    dueDateTime: timestamp("due_date_time", { withTimezone: true }),
    completedDateTime: timestamp("completed_date_time", { withTimezone: true }),
    startDateTime: timestamp("start_date_time", { withTimezone: true }),
    categories: text("categories").array(),
    hasAttachments: boolean("has_attachments").default(false),
    linkedResources: jsonb("linked_resources"), // array of {webUrl, applicationName, displayName}
    recurrence: jsonb("recurrence"), // recurrence pattern
    checklistItems: jsonb("checklist_items"), // array of {displayName, isChecked}
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("ms_todo_tasks_list_id_idx").on(table.listId),
    index("ms_todo_tasks_user_status_idx").on(table.userId, table.status),
  ],
);

export const msTodoTasksRelations = relations(msTodoTasks, ({ one }) => ({
  list: one(msTodoLists, {
    fields: [msTodoTasks.listId],
    references: [msTodoLists.id],
  }),
  user: one(users, {
    fields: [msTodoTasks.userId],
    references: [users.id],
  }),
}));

export const insertMsTodoTaskSchema = createInsertSchema(msTodoTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsTodoTask = z.infer<typeof insertMsTodoTaskSchema>;
export type MsTodoTask = typeof msTodoTasks.$inferSelect;

// Microsoft Teams - User presence/availability snapshots
export const msPresenceSnapshots = pgTable(
  "ms_presence_snapshots",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    availability: varchar("availability").notNull(), // Available, AvailableIdle, Away, BeRightBack, Busy, BusyIdle, DoNotDisturb, Offline, PresenceUnknown
    activity: varchar("activity").notNull(), // Available, Away, BeRightBack, Busy, DoNotDisturb, InACall, InAConferenceCall, Inactive, InAMeeting, Offline, OffWork, OutOfOffice, PresenceUnknown, Presenting, UrgentInterruptionsOnly
    statusMessage: text("status_message"),
    outOfOfficeMessage: text("out_of_office_message"),
    isOutOfOffice: boolean("is_out_of_office").default(false),
    recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("ms_presence_snapshots_user_recorded_idx").on(
      table.userId,
      table.recordedAt,
    ),
  ],
);

export const msPresenceSnapshotsRelations = relations(
  msPresenceSnapshots,
  ({ one }) => ({
    user: one(users, {
      fields: [msPresenceSnapshots.userId],
      references: [users.id],
    }),
  }),
);

export const insertMsPresenceSnapshotSchema = createInsertSchema(
  msPresenceSnapshots,
).omit({
  id: true,
  createdAt: true,
});
export type InsertMsPresenceSnapshot = z.infer<
  typeof insertMsPresenceSnapshotSchema
>;
export type MsPresenceSnapshot = typeof msPresenceSnapshots.$inferSelect;

// Microsoft Teams Chat - Chat threads/conversations
export const msChatThreads = pgTable("ms_chat_threads", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  msChatId: varchar("ms_chat_id").unique().notNull(),
  chatType: varchar("chat_type").notNull(), // oneOnOne, group, meeting
  topic: text("topic"),
  createdDateTime: timestamp("created_date_time", { withTimezone: true }).notNull(),
  lastUpdatedDateTime: timestamp("last_updated_date_time", { withTimezone: true }).notNull(),
  tenantId: varchar("tenant_id").notNull(),
  webUrl: text("web_url"),
  onlineMeetingInfo: jsonb("online_meeting_info"), // {meetingId, joinWebUrl}
  createdAt: timestamp("created_at").defaultNow(),
});

export const msChatThreadsRelations = relations(msChatThreads, ({ many }) => ({
  participants: many(msChatParticipants),
  messages: many(msChatMessages),
}));

export const insertMsChatThreadSchema = createInsertSchema(msChatThreads).omit({
  id: true,
  createdAt: true,
});
export type InsertMsChatThread = z.infer<typeof insertMsChatThreadSchema>;
export type MsChatThread = typeof msChatThreads.$inferSelect;

// Microsoft Teams Chat - Participants in chat threads
export const msChatParticipants = pgTable(
  "ms_chat_participants",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    chatId: varchar("chat_id")
      .references(() => msChatThreads.id)
      .notNull(),
    userId: varchar("user_id").references(() => users.id),
    msUserId: varchar("ms_user_id").notNull(),
    displayName: text("display_name").notNull(),
    email: varchar("email").notNull(),
    roles: text("roles").array(), // owner, guest, etc.
    addedDateTime: timestamp("added_date_time", { withTimezone: true }).notNull(),
  },
  (table) => [
    index("ms_chat_participants_chat_id_idx").on(table.chatId),
  ],
);

export const msChatParticipantsRelations = relations(
  msChatParticipants,
  ({ one }) => ({
    chat: one(msChatThreads, {
      fields: [msChatParticipants.chatId],
      references: [msChatThreads.id],
    }),
    user: one(users, {
      fields: [msChatParticipants.userId],
      references: [users.id],
    }),
  }),
);

export const insertMsChatParticipantSchema = createInsertSchema(
  msChatParticipants,
).omit({
  id: true,
});
export type InsertMsChatParticipant = z.infer<
  typeof insertMsChatParticipantSchema
>;
export type MsChatParticipant = typeof msChatParticipants.$inferSelect;

// Microsoft Teams Chat - Chat messages
export const msChatMessages = pgTable(
  "ms_chat_messages",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    chatId: varchar("chat_id")
      .references(() => msChatThreads.id)
      .notNull(),
    msMessageId: varchar("ms_message_id").unique().notNull(),
    senderId: varchar("sender_id").references(() => users.id),
    senderMsId: varchar("sender_ms_id").notNull(),
    senderDisplayName: text("sender_display_name").notNull(),
    messageType: varchar("message_type").notNull(), // message, chatEvent, typing, unknownFutureValue
    body: text("body").notNull(),
    bodyContentType: varchar("body_content_type").notNull(), // text, html
    importance: varchar("importance").notNull().default("normal"), // normal, high, urgent
    mentions: jsonb("mentions"), // array of {id, mentionText, mentioned: {id, displayName}}
    attachments: jsonb("attachments"), // array of {id, contentType, contentUrl, name}
    reactions: jsonb("reactions"), // array of {reactionType, createdDateTime, user}
    sentDateTime: timestamp("sent_date_time", { withTimezone: true }).notNull(),
    lastModifiedDateTime: timestamp("last_modified_date_time", { withTimezone: true }),
    lastEditedDateTime: timestamp("last_edited_date_time", { withTimezone: true }),
    deletedDateTime: timestamp("deleted_date_time", { withTimezone: true }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("ms_chat_messages_chat_id_idx").on(table.chatId),
    index("ms_chat_messages_sender_id_idx").on(table.senderId),
  ],
);

export const msChatMessagesRelations = relations(msChatMessages, ({ one }) => ({
  chat: one(msChatThreads, {
    fields: [msChatMessages.chatId],
    references: [msChatThreads.id],
  }),
  sender: one(users, {
    fields: [msChatMessages.senderId],
    references: [users.id],
  }),
}));

export const insertMsChatMessageSchema = createInsertSchema(
  msChatMessages,
).omit({
  id: true,
  createdAt: true,
});
export type InsertMsChatMessage = z.infer<typeof insertMsChatMessageSchema>;
export type MsChatMessage = typeof msChatMessages.$inferSelect;

// Microsoft Outlook Contacts
export const msContacts = pgTable("ms_contacts", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  msContactId: varchar("ms_contact_id").unique().notNull(),
  displayName: text("display_name").notNull(),
  givenName: text("given_name"),
  surname: text("surname"),
  nickname: text("nickname"),
  title: text("title"),
  jobTitle: text("job_title"),
  companyName: text("company_name"),
  department: text("department"),
  emailAddresses: jsonb("email_addresses").notNull(),
  phoneNumbers: jsonb("phone_numbers"),
  addresses: jsonb("addresses"),
  birthday: date("birthday"),
  personalNotes: text("personal_notes"),
  imAddresses: text("im_addresses").array(),
  categories: text("categories").array().notNull(),
  isFavorite: boolean("is_favorite").default(false),
  parentFolderId: varchar("parent_folder_id"),
  photo: text("photo"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const msContactsRelations = relations(msContacts, ({ one }) => ({
  user: one(users, {
    fields: [msContacts.userId],
    references: [users.id],
  }),
}));

export const insertMsContactSchema = createInsertSchema(msContacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsContact = z.infer<typeof insertMsContactSchema>;
export type MsContact = typeof msContacts.$inferSelect;

// OneDrive/SharePoint file metadata
export const msDriveItems = pgTable(
  "ms_drive_items",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    msDriveItemId: varchar("ms_drive_item_id").unique().notNull(),
    driveId: varchar("drive_id").notNull(),
    name: text("name").notNull(),
    size: bigint("size", { mode: "number" }),
    mimeType: varchar("mime_type"),
    webUrl: text("web_url"),
    downloadUrl: text("download_url"),
    parentPath: text("parent_path").notNull(),
    parentId: varchar("parent_id"),
    isFolder: boolean("is_folder").default(false),
    isFile: boolean("is_file").default(true),
    fileExtension: varchar("file_extension"),
    source: varchar("source").notNull(), // onedrive, sharepoint
    siteId: varchar("site_id"),
    siteName: text("site_name"),
    libraryId: varchar("library_id"),
    libraryName: text("library_name"),
    createdByDisplayName: text("created_by_display_name"),
    createdByEmail: varchar("created_by_email"),
    lastModifiedByDisplayName: text("last_modified_by_display_name"),
    lastModifiedByEmail: varchar("last_modified_by_email"),
    lastModifiedDateTime: timestamp("last_modified_date_time", { withTimezone: true }).notNull(),
    createdDateTime: timestamp("created_date_time", { withTimezone: true }).notNull(),
    sharingLinks: jsonb("sharing_links"), // array of {id, type, scope, webUrl}
    permissions: jsonb("permissions"), // array of permission info
    contentHash: varchar("content_hash"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("ms_drive_items_user_source_idx").on(table.userId, table.source),
  ],
);

export const msDriveItemsRelations = relations(msDriveItems, ({ one }) => ({
  user: one(users, {
    fields: [msDriveItems.userId],
    references: [users.id],
  }),
}));

export const insertMsDriveItemSchema = createInsertSchema(msDriveItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMsDriveItem = z.infer<typeof insertMsDriveItemSchema>;
export type MsDriveItem = typeof msDriveItems.$inferSelect;

// AI Action Items - Unified action items extracted by AI from emails, meetings, chats
export const aiActionItems = pgTable(
  "ai_action_items",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    title: text("title").notNull(),
    description: text("description"),
    sourceType: varchar("source_type").notNull(), // email, meeting, chat, task, manual
    sourceId: varchar("source_id"),
    sourceUrl: text("source_url"),
    priority: varchar("priority").notNull().default("medium"), // low, medium, high, urgent
    status: varchar("status").notNull().default("pending"), // pending, in_progress, completed, dismissed
    dueDate: timestamp("due_date"),
    completedAt: timestamp("completed_at"),
    extractedAt: timestamp("extracted_at").notNull(),
    confidence: real("confidence").notNull(), // AI confidence score 0-1
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("ai_action_items_user_status_idx").on(table.userId, table.status),
    index("ai_action_items_user_priority_idx").on(table.userId, table.priority),
    index("ai_action_items_due_date_idx").on(table.dueDate),
  ],
);

export const aiActionItemsRelations = relations(aiActionItems, ({ one }) => ({
  user: one(users, {
    fields: [aiActionItems.userId],
    references: [users.id],
  }),
}));

export const insertAiActionItemSchema = createInsertSchema(aiActionItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertAiActionItem = z.infer<typeof insertAiActionItemSchema>;
export type AiActionItem = typeof aiActionItems.$inferSelect;

// AI Reminders - Scheduled reminders for users
export const aiReminders = pgTable(
  "ai_reminders",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    type: varchar("type").notNull(), // task_overdue, meeting_upcoming, email_unread, action_item, custom
    title: text("title").notNull(),
    message: text("message").notNull(),
    relatedType: varchar("related_type"), // task, meeting, email, calendar_event, etc.
    relatedId: varchar("related_id"),
    triggerAt: timestamp("trigger_at").notNull(),
    channel: varchar("channel").notNull(), // in_app, email, teams, push
    status: varchar("status").notNull().default("pending"), // pending, sent, dismissed, snoozed
    sentAt: timestamp("sent_at"),
    snoozedUntil: timestamp("snoozed_until"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("ai_reminders_user_status_idx").on(table.userId, table.status),
    index("ai_reminders_trigger_at_idx").on(table.triggerAt),
    index("ai_reminders_user_trigger_idx").on(table.userId, table.triggerAt),
  ],
);

export const aiRemindersRelations = relations(aiReminders, ({ one, many }) => ({
  user: one(users, {
    fields: [aiReminders.userId],
    references: [users.id],
  }),
  notifications: many(aiNotifications),
}));

export const insertAiReminderSchema = createInsertSchema(aiReminders).omit({
  id: true,
  createdAt: true,
});
export type InsertAiReminder = z.infer<typeof insertAiReminderSchema>;
export type AiReminder = typeof aiReminders.$inferSelect;

// AI Notifications - Notification delivery tracking
export const aiNotifications = pgTable(
  "ai_notifications",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    reminderId: varchar("reminder_id").references(() => aiReminders.id),
    type: varchar("type").notNull(), // reminder, insight, alert, report
    title: text("title").notNull(),
    body: text("body").notNull(),
    channel: varchar("channel").notNull(), // in_app, email, teams, push
    status: varchar("status").notNull().default("pending"), // pending, delivered, read, failed
    sentAt: timestamp("sent_at"),
    readAt: timestamp("read_at"),
    failedReason: text("failed_reason"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("ai_notifications_user_status_idx").on(table.userId, table.status),
    index("ai_notifications_user_type_idx").on(table.userId, table.type),
    index("ai_notifications_reminder_idx").on(table.reminderId),
  ],
);

export const aiNotificationsRelations = relations(
  aiNotifications,
  ({ one }) => ({
    user: one(users, {
      fields: [aiNotifications.userId],
      references: [users.id],
    }),
    reminder: one(aiReminders, {
      fields: [aiNotifications.reminderId],
      references: [aiReminders.id],
    }),
  }),
);

export const insertAiNotificationSchema = createInsertSchema(
  aiNotifications,
).omit({
  id: true,
  createdAt: true,
});
export type InsertAiNotification = z.infer<typeof insertAiNotificationSchema>;
export type AiNotification = typeof aiNotifications.$inferSelect;

// AI Insights - AI-generated insights and reports
export const aiInsights = pgTable(
  "ai_insights",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id").references(() => users.id), // nullable for org-wide insights
    type: varchar("type").notNull(), // productivity_report, workload_analysis, communication_pattern, meeting_summary, weekly_digest
    scope: varchar("scope").notNull(), // user, team, department, organization
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    data: jsonb("data").notNull(), // structured insight data
    score: real("score"), // productivity score, sentiment score, etc.
    period: varchar("period"), // daily, weekly, monthly
    periodStart: timestamp("period_start"),
    periodEnd: timestamp("period_end"),
    generatedAt: timestamp("generated_at").notNull(),
    expiresAt: timestamp("expires_at"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("ai_insights_user_type_idx").on(table.userId, table.type),
    index("ai_insights_scope_idx").on(table.scope),
    index("ai_insights_generated_at_idx").on(table.generatedAt),
    index("ai_insights_user_period_idx").on(table.userId, table.period),
  ],
);

export const aiInsightsRelations = relations(aiInsights, ({ one }) => ({
  user: one(users, {
    fields: [aiInsights.userId],
    references: [users.id],
  }),
}));

export const insertAiInsightSchema = createInsertSchema(aiInsights).omit({
  id: true,
  createdAt: true,
});
export type InsertAiInsight = z.infer<typeof insertAiInsightSchema>;
export type AiInsight = typeof aiInsights.$inferSelect;
