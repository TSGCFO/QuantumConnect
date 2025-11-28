import cron from "node-cron";
import { storage } from "../storage";
import {
  syncCalendarEvents,
  syncContacts,
  syncDriveItems,
  syncTodoLists,
  syncChatThreads,
  syncPresence,
  syncEmails,
  SyncResult,
} from "./sync";

export interface SyncJob {
  id: string;
  userId: string;
  resourceType: "presence" | "calendar" | "contacts" | "drive" | "todo" | "chat" | "email";
  priority: number;
  retryCount: number;
  scheduledAt: Date;
  lastError?: string;
}

export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  activeUsers: string[];
}

const MAX_RETRIES = 5;
const BACKOFF_DELAYS = [1000, 2000, 4000, 8000, 16000];
const DEFAULT_CONCURRENCY = 2;

const syncQueue: SyncJob[] = [];
const processingJobs: Map<string, SyncJob> = new Map();
const userLocks: Set<string> = new Set();

let completedCount = 0;
let failedCount = 0;

let cronJobs: ReturnType<typeof cron.schedule>[] = [];
let isRunning = false;
let isShuttingDown = false;

let processingPromise: Promise<void> | null = null;

function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function log(message: string, level: "info" | "error" | "warn" = "info"): void {
  const timestamp = new Date().toISOString();
  const prefix = `[SyncScheduler ${timestamp}]`;
  switch (level) {
    case "error":
      console.error(`${prefix} ERROR: ${message}`);
      break;
    case "warn":
      console.warn(`${prefix} WARN: ${message}`);
      break;
    default:
      console.log(`${prefix} ${message}`);
  }
}

export function enqueueSync(
  userId: string,
  resourceType: string,
  priority: number = 5
): void {
  const validTypes = ["presence", "calendar", "contacts", "drive", "todo", "chat", "email"];
  if (!validTypes.includes(resourceType)) {
    log(`Invalid resource type: ${resourceType}`, "error");
    return;
  }

  const existingJob = syncQueue.find(
    (job) => job.userId === userId && job.resourceType === resourceType
  );
  if (existingJob) {
    if (priority < existingJob.priority) {
      existingJob.priority = priority;
      sortQueue();
    }
    return;
  }

  const processingKey = `${userId}:${resourceType}`;
  if (processingJobs.has(processingKey)) {
    return;
  }

  const job: SyncJob = {
    id: generateJobId(),
    userId,
    resourceType: resourceType as SyncJob["resourceType"],
    priority,
    retryCount: 0,
    scheduledAt: new Date(),
  };

  syncQueue.push(job);
  sortQueue();

  log(`Enqueued sync job: ${job.id} for user ${userId}, resource: ${resourceType}`);

  if (isRunning && !isShuttingDown && !processingPromise) {
    processingPromise = processQueue().finally(() => {
      processingPromise = null;
    });
  }
}

function sortQueue(): void {
  syncQueue.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.scheduledAt.getTime() - b.scheduledAt.getTime();
  });
}

export async function enqueueSyncForAllUsers(resourceType: string): Promise<void> {
  try {
    const users = await storage.getAllUsers();
    log(`Enqueueing ${resourceType} sync for ${users.length} users`);

    for (const user of users) {
      enqueueSync(user.id, resourceType);
    }
  } catch (error: any) {
    log(`Failed to enqueue sync for all users: ${error.message}`, "error");
  }
}

async function executeSyncJob(job: SyncJob): Promise<SyncResult> {
  const startTime = Date.now();
  log(`Starting sync: ${job.resourceType} for user ${job.userId}`);

  let result: SyncResult;

  switch (job.resourceType) {
    case "presence":
      result = await syncPresence(job.userId);
      break;
    case "calendar":
      result = await syncCalendarEvents(job.userId, { useDelta: true });
      break;
    case "contacts":
      result = await syncContacts(job.userId, { useDelta: true });
      break;
    case "drive":
      result = await syncDriveItems(job.userId);
      break;
    case "todo":
      result = await syncTodoLists(job.userId);
      break;
    case "chat":
      result = await syncChatThreads(job.userId);
      break;
    case "email":
      result = await syncEmails(job.userId, { useDelta: true });
      break;
    default:
      throw new Error(`Unknown resource type: ${job.resourceType}`);
  }

  const duration = Date.now() - startTime;
  log(
    `Completed sync: ${job.resourceType} for user ${job.userId} in ${duration}ms - ` +
      `processed: ${result.itemsProcessed}, created: ${result.itemsCreated}, updated: ${result.itemsUpdated}`
  );

  return result;
}

async function processJob(job: SyncJob): Promise<void> {
  const processingKey = `${job.userId}:${job.resourceType}`;
  processingJobs.set(processingKey, job);

  try {
    const result = await executeSyncJob(job);

    if (!result.success) {
      throw new Error(result.errors.join("; ") || "Sync failed with unknown error");
    }

    completedCount++;
  } catch (error: any) {
    job.lastError = error.message;
    job.retryCount++;

    log(
      `Sync failed for ${job.resourceType} (user: ${job.userId}), attempt ${job.retryCount}/${MAX_RETRIES}: ${error.message}`,
      "error"
    );

    try {
      const recentJobs = await storage.getRecentSyncJobs(job.userId, 1);
      if (recentJobs.length > 0) {
        await storage.updateSyncJob(recentJobs[0].id, {
          status: "failed",
          errorMessage: error.message,
          completedAt: new Date(),
        });
      }
    } catch (dbError: any) {
      log(`Failed to update sync job in database: ${dbError.message}`, "error");
    }

    if (job.retryCount < MAX_RETRIES) {
      const delay = BACKOFF_DELAYS[job.retryCount - 1] || BACKOFF_DELAYS[BACKOFF_DELAYS.length - 1];
      log(`Scheduling retry for ${job.id} in ${delay}ms`);

      setTimeout(() => {
        if (!isShuttingDown) {
          syncQueue.push(job);
          sortQueue();

          if (isRunning && !processingPromise) {
            processingPromise = processQueue().finally(() => {
              processingPromise = null;
            });
          }
        }
      }, delay);
    } else {
      log(`Max retries exceeded for ${job.resourceType} (user: ${job.userId})`, "error");
      failedCount++;
    }
  } finally {
    processingJobs.delete(processingKey);
    userLocks.delete(job.userId);
  }
}

async function processQueue(): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  const activeWorkers: Promise<void>[] = [];

  while (syncQueue.length > 0 && !isShuttingDown) {
    while (activeWorkers.length < DEFAULT_CONCURRENCY && syncQueue.length > 0) {
      const job = getNextAvailableJob();
      if (!job) {
        break;
      }

      const jobIndex = syncQueue.indexOf(job);
      if (jobIndex > -1) {
        syncQueue.splice(jobIndex, 1);
      }

      userLocks.add(job.userId);

      const workerPromise = processJob(job).finally(() => {
        const idx = activeWorkers.indexOf(workerPromise);
        if (idx > -1) {
          activeWorkers.splice(idx, 1);
        }
      });

      activeWorkers.push(workerPromise);
    }

    if (activeWorkers.length > 0) {
      await Promise.race(activeWorkers);
    } else {
      break;
    }
  }

  if (activeWorkers.length > 0) {
    await Promise.all(activeWorkers);
  }
}

function getNextAvailableJob(): SyncJob | null {
  for (const job of syncQueue) {
    if (!userLocks.has(job.userId)) {
      return job;
    }
  }
  return null;
}

export function getQueueStats(): QueueStats {
  const activeUsers = new Set<string>();
  processingJobs.forEach((job) => {
    activeUsers.add(job.userId);
  });

  return {
    pending: syncQueue.length,
    processing: processingJobs.size,
    completed: completedCount,
    failed: failedCount,
    activeUsers: Array.from(activeUsers),
  };
}

export async function manualSyncUser(
  userId: string,
  resources?: string[]
): Promise<void> {
  const allResources: SyncJob["resourceType"][] = [
    "presence",
    "calendar",
    "contacts",
    "drive",
    "todo",
    "chat",
    "email",
  ];

  const resourcesToSync = resources
    ? (resources.filter((r) =>
        allResources.includes(r as SyncJob["resourceType"])
      ) as SyncJob["resourceType"][])
    : allResources;

  log(`Manual sync triggered for user ${userId}: ${resourcesToSync.join(", ")}`);

  for (const resourceType of resourcesToSync) {
    enqueueSync(userId, resourceType, 1);
  }

  if (isRunning && !processingPromise) {
    processingPromise = processQueue().finally(() => {
      processingPromise = null;
    });
  }
}

export function startScheduler(): void {
  if (isRunning) {
    log("Scheduler is already running", "warn");
    return;
  }

  isRunning = true;
  isShuttingDown = false;
  log("Starting sync scheduler...");

  const presenceJob = cron.schedule("*/5 * * * *", async () => {
    if (isShuttingDown) return;
    log("Cron triggered: Presence sync (every 5 minutes)");
    await enqueueSyncForAllUsers("presence");
  });
  cronJobs.push(presenceJob);

  const calendarChatTodoEmailJob = cron.schedule("*/30 * * * *", async () => {
    if (isShuttingDown) return;
    log("Cron triggered: Calendar/Chat/ToDo/Email sync (every 30 minutes)");
    await enqueueSyncForAllUsers("calendar");
    await enqueueSyncForAllUsers("chat");
    await enqueueSyncForAllUsers("todo");
    await enqueueSyncForAllUsers("email");
  });
  cronJobs.push(calendarChatTodoEmailJob);

  const filesContactsJob = cron.schedule("0 */2 * * *", async () => {
    if (isShuttingDown) return;
    log("Cron triggered: Files/Contacts sync (every 2 hours)");
    await enqueueSyncForAllUsers("drive");
    await enqueueSyncForAllUsers("contacts");
  });
  cronJobs.push(filesContactsJob);

  log("Sync scheduler started with the following schedules:");
  log("  - Presence: Every 5 minutes (*/5 * * * *)");
  log("  - Calendar/Chat/ToDo/Email: Every 30 minutes (*/30 * * * *)");
  log("  - Files/Contacts: Every 2 hours (0 */2 * * *)");
}

export async function stopScheduler(): Promise<void> {
  if (!isRunning) {
    log("Scheduler is not running", "warn");
    return;
  }

  log("Stopping sync scheduler...");
  isShuttingDown = true;

  for (const job of cronJobs) {
    job.stop();
  }
  cronJobs = [];

  if (processingJobs.size > 0) {
    log(`Waiting for ${processingJobs.size} active jobs to complete...`);
    
    const maxWaitTime = 30000;
    const startWait = Date.now();
    
    while (processingJobs.size > 0 && Date.now() - startWait < maxWaitTime) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (processingJobs.size > 0) {
      log(`${processingJobs.size} jobs did not complete within timeout`, "warn");
    }
  }

  syncQueue.length = 0;

  isRunning = false;
  log("Sync scheduler stopped");
}
