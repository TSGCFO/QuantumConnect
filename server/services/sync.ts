import { storage } from "../storage";
import { 
  getDirectGraphClient, 
  isDirectGraphConfigured,
  getMissingCredentials,
  getCalendarView,
  getCalendarEventsDelta,
  getContacts,
  getDriveItems,
  getTodoLists,
  getTodoTasks,
  getUserChatsDirectGraph,
  getChatMessagesDirectGraph,
  getUserPresence,
  getUserProfile,
} from "../integrations/microsoft-graph";
import OpenAI from "openai";

export interface SyncResult {
  success: boolean;
  itemsProcessed: number;
  itemsCreated: number;
  itemsUpdated: number;
  errors: string[];
  deltaToken?: string;
  permissionError?: boolean;
}

export interface AiExtractionResult {
  success: boolean;
  itemsCreated: number;
  summary: string;
  errors: string[];
}

// Permission requirements for each sync resource type
const PERMISSION_REQUIREMENTS: Record<string, string[]> = {
  calendar: ["Calendars.Read", "Calendars.ReadWrite"],
  contacts: ["Contacts.Read", "Contacts.ReadWrite"],
  drive: ["Files.Read", "Files.ReadWrite"],
  todo: ["Tasks.Read", "Tasks.ReadWrite", "Tasks.ReadWrite.All"],
  chat: ["Chat.Read", "Chat.ReadBasic", "Chat.ReadWrite"],
  presence: ["Presence.Read", "Presence.ReadWrite.All"],
};

// Helper function to check if an error is a permission (403) error
function isPermissionError(error: any): boolean {
  return error?.statusCode === 403 || error?.code === "Forbidden";
}

// Helper function to format permission error messages
function formatPermissionError(resourceType: string, error: any): string {
  const requiredPerms = PERMISSION_REQUIREMENTS[resourceType] || [];
  const errorBody = error?.body || "";
  
  // Try to extract required scopes from the error message
  const match = errorBody.match(/API requires one of '([^']+)'/);
  const actualRequired = match ? match[1] : requiredPerms.join(" or ");
  
  return `Missing permission for ${resourceType} sync. Required: ${actualRequired}. ` +
    `The Microsoft 365 connector needs additional permissions. ` +
    `Please contact your administrator to add the required scopes.`;
}

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Helper to get Microsoft user ID for a given internal user ID
async function getMicrosoftUserId(userId: string): Promise<string | null> {
  const profile = await storage.getMsUserProfile(userId);
  return profile?.msUserId || null;
}

// Helper to check if direct Graph API is available
function checkGraphApiConfigured(): void {
  if (!isDirectGraphConfigured()) {
    const missing = getMissingCredentials();
    throw new Error(
      `Microsoft Graph API not configured. Missing credentials: ${missing.join(", ")}. ` +
      `Add AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET to enable full Microsoft 365 sync.`
    );
  }
}

export async function syncCalendarEvents(
  userId: string,
  options: { daysBack?: number; daysForward?: number; useDelta?: boolean } = {}
): Promise<SyncResult> {
  const { daysBack = 30, daysForward = 30, useDelta = false } = options;

  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: "calendar",
      syncType: useDelta ? "delta" : "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    const now = new Date();
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    const endDate = new Date(now.getTime() + daysForward * 24 * 60 * 60 * 1000);

    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    const errors: string[] = [];
    let newDeltaToken: string | undefined;

    try {
      // Pre-load existing events into a Map for O(1) lookups
      const existingEvents = new Map(
        (await storage.getCalendarEvents(userId)).map(e => [e.msEventId, e])
      );

      // Get delta token if using delta sync
      let deltaToken: string | null = null;
      if (useDelta) {
        const syncState = await storage.getUserSyncState(userId, "calendar");
        deltaToken = syncState?.deltaToken || null;
      }

      let nextLink: string | undefined;
      let response: any;

      do {
        if (nextLink) {
          response = await client.api(nextLink).get();
        } else if (deltaToken && useDelta) {
          // The stored deltaToken IS the full delta link URL - call it directly
          response = await client.api(deltaToken).get();
        } else if (useDelta) {
          // First time delta sync - start with the delta endpoint
          // Note: CalendarView delta does not support $top, use Prefer header for page size
          response = await client
            .api(`/users/${msUserId}/calendarView/delta`)
            .query({
              startDateTime: startDate.toISOString(),
              endDateTime: endDate.toISOString(),
            })
            .header("Prefer", "odata.maxpagesize=50")
            .select(
              "id,subject,body,bodyPreview,start,end,location,isAllDay,isCancelled,organizer,attendees,recurrence,categories,importance,sensitivity,showAs,webLink,onlineMeeting,onlineMeetingUrl"
            )
            .get();
        } else {
          // Full sync - use calendarView with date range (no delta)
          response = await client
            .api(`/users/${msUserId}/calendarView`)
            .query({
              startDateTime: startDate.toISOString(),
              endDateTime: endDate.toISOString(),
            })
            .select(
              "id,subject,body,bodyPreview,start,end,location,isAllDay,isCancelled,organizer,attendees,recurrence,categories,importance,sensitivity,showAs,webLink,onlineMeeting,onlineMeetingUrl"
            )
            .header("Prefer", "odata.maxpagesize=50")
            .get();
        }

        for (const event of response.value || []) {
          try {
            // Use O(1) Map lookup instead of re-querying the database
            const existing = existingEvents.get(event.id);

            // Upsert returns the full record with ID - use it directly
            const dbEvent = await storage.upsertCalendarEvent({
              msEventId: event.id,
              userId,
              subject: event.subject,
              bodyContent: event.body?.content || null,
              bodyPreview: event.bodyPreview || null,
              start: new Date(event.start.dateTime),
              end: new Date(event.end.dateTime),
              location: event.location?.displayName || null,
              isAllDay: event.isAllDay || false,
              isCancelled: event.isCancelled || false,
              organizer: event.organizer?.emailAddress
                ? {
                    email: event.organizer.emailAddress.address,
                    name: event.organizer.emailAddress.name,
                  }
                : null,
              categories: event.categories || [],
              importance: event.importance || "normal",
              sensitivity: event.sensitivity || "normal",
              showAs: event.showAs || "busy",
              webLink: event.webLink || null,
              onlineMeetingUrl:
                event.onlineMeetingUrl || event.onlineMeeting?.joinUrl || null,
            });

            // Update the map with the new/updated event for subsequent lookups
            existingEvents.set(event.id, dbEvent);

            // Use dbEvent.id directly - no need to re-query
            if (event.attendees && event.attendees.length > 0) {
              for (const att of event.attendees) {
                await storage.upsertEventAttendee({
                  eventId: dbEvent.id,
                  email: att.emailAddress?.address || "",
                  name: att.emailAddress?.name || null,
                  type: att.type || "required",
                  responseStatus: att.status?.response || "none",
                });
              }
            }

            itemsProcessed++;
            if (existing) {
              itemsUpdated++;
            } else {
              itemsCreated++;
            }
          } catch (eventError: any) {
            errors.push(`Event ${event.id}: ${eventError.message}`);
          }
        }

        nextLink = response["@odata.nextLink"];
        // Extract delta token from the delta link for next sync
        if (response["@odata.deltaLink"]) {
          newDeltaToken = response["@odata.deltaLink"];
        }
      } while (nextLink);

      await storage.upsertUserSyncState({
        userId,
        resourceType: "calendar",
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: itemsProcessed,
        deltaToken: newDeltaToken || null,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
        deltaToken: newDeltaToken,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("calendar", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during calendar sync"],
    };
  }
}

export async function syncContacts(
  userId: string,
  options: { pageSize?: number; useDelta?: boolean } = {}
): Promise<SyncResult> {
  const { pageSize = 200, useDelta = false } = options;

  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: "contacts",
      syncType: useDelta ? "delta" : "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    const errors: string[] = [];
    let newDeltaToken: string | undefined;

    try {
      // Pre-load existing contacts into a Map for O(1) lookups
      const existingContacts = new Map(
        (await storage.getContacts(userId)).map(c => [c.msContactId, c])
      );

      // Get delta token if using delta sync
      let deltaToken: string | null = null;
      if (useDelta) {
        const syncState = await storage.getUserSyncState(userId, "contacts");
        deltaToken = syncState?.deltaToken || null;
      }

      let nextLink: string | undefined;
      let response: any;

      do {
        if (nextLink) {
          response = await client.api(nextLink).get();
        } else if (deltaToken && useDelta) {
          // The stored deltaToken IS the full delta link URL - call it directly
          response = await client.api(deltaToken).get();
        } else if (useDelta) {
          // First time delta sync - start with the delta endpoint
          response = await client
            .api(`/users/${msUserId}/contacts/delta`)
            .select(
              "id,displayName,givenName,surname,emailAddresses,businessPhones,mobilePhone,companyName,jobTitle,department,businessAddress,personalNotes,categories,birthday"
            )
            .top(pageSize)
            .get();
        } else {
          // Full sync - use contacts endpoint (no delta)
          response = await client
            .api(`/users/${msUserId}/contacts`)
            .select(
              "id,displayName,givenName,surname,emailAddresses,businessPhones,mobilePhone,companyName,jobTitle,department,businessAddress,personalNotes,categories,birthday"
            )
            .top(pageSize)
            .get();
        }

        for (const contact of response.value) {
          try {
            // Use O(1) Map lookup instead of re-querying the database
            const existing = existingContacts.get(contact.id);

            const phoneNumbers = [];
            if (contact.businessPhones) {
              for (const phone of contact.businessPhones) {
                phoneNumbers.push({ type: "business", number: phone });
              }
            }
            if (contact.mobilePhone) {
              phoneNumbers.push({ type: "mobile", number: contact.mobilePhone });
            }

            const dbContact = await storage.upsertContact({
              msContactId: contact.id,
              userId,
              displayName: contact.displayName || "Unknown Contact",
              givenName: contact.givenName || null,
              surname: contact.surname || null,
              emailAddresses: contact.emailAddresses || [],
              phoneNumbers: phoneNumbers.length > 0 ? phoneNumbers : null,
              companyName: contact.companyName || null,
              jobTitle: contact.jobTitle || null,
              department: contact.department || null,
              addresses: contact.businessAddress ? [contact.businessAddress] : null,
              personalNotes: contact.personalNotes || null,
              categories: contact.categories || [],
              birthday: contact.birthday || null,
            });

            // Update the map with the new/updated contact
            existingContacts.set(contact.id, dbContact);

            itemsProcessed++;
            if (existing) {
              itemsUpdated++;
            } else {
              itemsCreated++;
            }
          } catch (contactError: any) {
            errors.push(`Contact ${contact.id}: ${contactError.message}`);
          }
        }

        nextLink = response["@odata.nextLink"];
        if (response["@odata.deltaLink"]) {
          newDeltaToken = response["@odata.deltaLink"];
        }
      } while (nextLink);

      await storage.upsertUserSyncState({
        userId,
        resourceType: "contacts",
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: itemsProcessed,
        deltaToken: newDeltaToken || null,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
        deltaToken: newDeltaToken,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("contacts", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during contacts sync"],
    };
  }
}

export async function syncDriveItems(
  userId: string,
  options: { source?: "onedrive" | "sharepoint"; pageSize?: number; recursive?: boolean } = {}
): Promise<SyncResult> {
  const { source = "onedrive", pageSize = 100, recursive = false } = options;

  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: source,
      syncType: "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    const errors: string[] = [];
    const now = new Date();

    try {
      // Pre-load existing drive items into a Map for O(1) lookups
      const existingItems = new Map(
        (await storage.getDriveItems(userId, source)).map(i => [i.msDriveItemId, i])
      );

      let nextLink: string | undefined;
      let response: any;

      const foldersToProcess: string[] = ["root"];

      while (foldersToProcess.length > 0) {
        const currentFolder = foldersToProcess.shift()!;
        const apiPath =
          currentFolder === "root"
            ? `/users/${msUserId}/drive/root/children`
            : `/users/${msUserId}/drive/items/${currentFolder}/children`;

        nextLink = undefined;

        do {
          if (nextLink) {
            response = await client.api(nextLink).get();
          } else {
            response = await client
              .api(apiPath)
              .select(
                "id,name,file,folder,size,webUrl,createdDateTime,lastModifiedDateTime,parentReference,createdBy,lastModifiedBy"
              )
              .top(pageSize)
              .get();
          }

          for (const item of response.value) {
            try {
              // Use O(1) Map lookup instead of re-querying the database
              const existing = existingItems.get(item.id);

              const dbItem = await storage.upsertDriveItem({
                msDriveItemId: item.id,
                userId,
                name: item.name,
                mimeType: item.file?.mimeType || (item.folder ? "folder" : null),
                size: item.size || null,
                webUrl: item.webUrl || null,
                source,
                driveId: item.parentReference?.driveId || "unknown",
                parentId: item.parentReference?.id || null,
                parentPath: item.parentReference?.path || "/",
                isFolder: !!item.folder,
                isFile: !!item.file,
                fileExtension: item.name?.includes(".")
                  ? item.name.split(".").pop() || null
                  : null,
                createdDateTime: item.createdDateTime
                  ? new Date(item.createdDateTime)
                  : now,
                lastModifiedDateTime: item.lastModifiedDateTime
                  ? new Date(item.lastModifiedDateTime)
                  : now,
                createdByEmail: item.createdBy?.user?.email || null,
                lastModifiedByEmail: item.lastModifiedBy?.user?.email || null,
              });

              // Update the map with the new/updated item
              existingItems.set(item.id, dbItem);

              if (recursive && item.folder) {
                foldersToProcess.push(item.id);
              }

              itemsProcessed++;
              if (existing) {
                itemsUpdated++;
              } else {
                itemsCreated++;
              }
            } catch (itemError: any) {
              errors.push(`Item ${item.id}: ${itemError.message}`);
            }
          }

          nextLink = response["@odata.nextLink"];
        } while (nextLink);

        if (!recursive) break;
      }

      await storage.upsertUserSyncState({
        userId,
        resourceType: source,
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: itemsProcessed,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("drive", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during drive items sync"],
    };
  }
}

export async function syncTodoLists(
  userId: string,
  options: { includeTasks?: boolean } = {}
): Promise<SyncResult> {
  const { includeTasks = true } = options;

  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: "todo",
      syncType: "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    const errors: string[] = [];

    try {
      // Pre-load existing lists into a Map for O(1) lookups
      const existingLists = new Map(
        (await storage.getTodoLists(userId)).map(l => [l.msListId, l])
      );

      // Pre-load all existing tasks for this user into a Map for O(1) lookups
      // Key is composite: `${listId}:${msTaskId}` for uniqueness across lists
      const allExistingTasks = await storage.getTodoTasksByUser(userId);
      const existingTasks = new Map(
        allExistingTasks.map(t => [`${t.listId}:${t.msTaskId}`, t])
      );

      // Map to track msListId -> dbListId for task associations
      const msListIdToDbListId = new Map<string, string>();

      let nextLink: string | undefined;
      let response: any;

      do {
        if (nextLink) {
          response = await client.api(nextLink).get();
        } else {
          response = await client
            .api(`/users/${msUserId}/todo/lists`)
            .select("id,displayName,isOwner,isShared,wellknownListName")
            .get();
        }

        for (const list of response.value) {
          try {
            // Use O(1) Map lookup instead of re-querying the database
            const existingList = existingLists.get(list.id);

            // Upsert returns the full record with ID
            const dbList = await storage.upsertTodoList({
              msListId: list.id,
              userId,
              displayName: list.displayName,
              isOwner: list.isOwner || false,
              isShared: list.isShared || false,
              wellknownListName: list.wellknownListName || null,
            });

            // Update maps
            existingLists.set(list.id, dbList);
            msListIdToDbListId.set(list.id, dbList.id);

            itemsProcessed++;
            if (existingList) {
              itemsUpdated++;
            } else {
              itemsCreated++;
            }

            if (includeTasks) {
              let taskNextLink: string | undefined;
              let taskResponse: any;

              do {
                if (taskNextLink) {
                  taskResponse = await client.api(taskNextLink).get();
                } else {
                  taskResponse = await client
                    .api(`/users/${msUserId}/todo/lists/${list.id}/tasks`)
                    .select(
                      "id,title,body,importance,status,isReminderOn,reminderDateTime,dueDateTime,completedDateTime,startDateTime,createdDateTime,lastModifiedDateTime,categories,hasAttachments,linkedResources,recurrence,checklistItems"
                    )
                    .get();
                }

                // Use dbList.id directly - no need to re-query
                for (const task of taskResponse.value) {
                  try {
                    // Use O(1) Map lookup with composite key
                    const taskKey = `${dbList.id}:${task.id}`;
                    const existingTask = existingTasks.get(taskKey);

                    const dbTask = await storage.upsertTodoTask({
                      msTaskId: task.id,
                      listId: dbList.id,
                      userId,
                      title: task.title,
                      body: task.body?.content || null,
                      importance: task.importance || "normal",
                      status: task.status || "notStarted",
                      isReminderOn: task.isReminderOn || false,
                      reminderDateTime: task.reminderDateTime?.dateTime
                        ? new Date(task.reminderDateTime.dateTime)
                        : null,
                      dueDateTime: task.dueDateTime?.dateTime
                        ? new Date(task.dueDateTime.dateTime)
                        : null,
                      completedDateTime: task.completedDateTime?.dateTime
                        ? new Date(task.completedDateTime.dateTime)
                        : null,
                      startDateTime: task.startDateTime?.dateTime
                        ? new Date(task.startDateTime.dateTime)
                        : null,
                      categories: task.categories || [],
                      hasAttachments: task.hasAttachments || false,
                      linkedResources: task.linkedResources || null,
                      recurrence: task.recurrence || null,
                      checklistItems: task.checklistItems || null,
                    });

                    // Update the map
                    existingTasks.set(taskKey, dbTask);

                    itemsProcessed++;
                    if (existingTask) {
                      itemsUpdated++;
                    } else {
                      itemsCreated++;
                    }
                  } catch (taskError: any) {
                    errors.push(`Task ${task.id}: ${taskError.message}`);
                  }
                }

                taskNextLink = taskResponse["@odata.nextLink"];
              } while (taskNextLink);
            }
          } catch (listError: any) {
            errors.push(`List ${list.id}: ${listError.message}`);
          }
        }

        nextLink = response["@odata.nextLink"];
      } while (nextLink);

      await storage.upsertUserSyncState({
        userId,
        resourceType: "todo",
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: itemsProcessed,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("todo", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during todo lists sync"],
    };
  }
}

export async function syncChatThreads(
  userId: string,
  options: { limit?: number; includeMessages?: boolean; messagesPerChat?: number } = {}
): Promise<SyncResult> {
  const { limit = 30, includeMessages = true, messagesPerChat = 50 } = options;

  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: "chat",
      syncType: "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    let itemsUpdated = 0;
    const errors: string[] = [];

    try {
      // Pre-load existing chat threads into a Map for O(1) lookups
      const existingThreads = new Map(
        (await storage.getChatThreads(1000)).map(t => [t.msChatId, t])
      );

      // Get chats using direct Graph API
      const chatsResponse = await client
        .api(`/users/${msUserId}/chats`)
        .top(limit)
        .expand("members")
        .get();
      
      const chats = chatsResponse.value || [];

      for (const chat of chats) {
        try {
          // Use O(1) Map lookup instead of re-querying the database
          const existingThread = existingThreads.get(chat.id);

          // Upsert returns the full record with ID
          const dbThread = await storage.upsertChatThread({
            msChatId: chat.id,
            chatType: chat.chatType || "unknown",
            topic: chat.topic || null,
            createdDateTime: chat.createdDateTime
              ? new Date(chat.createdDateTime)
              : new Date(),
            lastUpdatedDateTime: chat.lastUpdatedDateTime
              ? new Date(chat.lastUpdatedDateTime)
              : new Date(),
            tenantId: chat.tenantId || "unknown",
            webUrl: chat.webUrl || null,
            onlineMeetingInfo: chat.onlineMeetingInfo || null,
          });

          // Update the map with the new/updated thread
          existingThreads.set(chat.id, dbThread);

          // Use dbThread.id directly for participants - no need to re-query
          if (chat.members && chat.members.length > 0) {
            for (const member of chat.members) {
              try {
                await storage.upsertChatParticipant({
                  chatId: dbThread.id,
                  userId: null,
                  msUserId: member.userId || member.id || "unknown",
                  displayName: member.displayName || "Unknown",
                  email: member.email || "",
                  roles: member.roles || [],
                  addedDateTime: member.visibleHistoryStartDateTime
                    ? new Date(member.visibleHistoryStartDateTime)
                    : new Date(),
                });
              } catch (memberError: any) {
                errors.push(`Member in chat ${chat.id}: ${memberError.message}`);
              }
            }
          }

          itemsProcessed++;
          if (existingThread) {
            itemsUpdated++;
          } else {
            itemsCreated++;
          }

          // Use dbThread.id directly for messages - no need to re-query
          if (includeMessages) {
            try {
              // Get chat messages using direct Graph API
              const messagesResponse = await client
                .api(`/chats/${chat.id}/messages`)
                .top(messagesPerChat)
                .get();
              const messages = messagesResponse.value || [];

              for (const msg of messages) {
                try {
                  await storage.upsertChatMessage({
                    chatId: dbThread.id,
                    msMessageId: msg.id,
                    senderId: null,
                    senderMsId: msg.from?.user?.id || "system",
                    senderDisplayName: msg.from?.user?.displayName || "System",
                    messageType: msg.messageType || "message",
                    body: msg.body?.content || "",
                    bodyContentType: msg.body?.contentType || "text",
                    importance: msg.importance || "normal",
                    mentions: msg.mentions || null,
                    attachments: msg.attachments || null,
                    reactions: msg.reactions || null,
                    sentDateTime: msg.createdDateTime
                      ? new Date(msg.createdDateTime)
                      : new Date(),
                    lastModifiedDateTime: msg.lastModifiedDateTime
                      ? new Date(msg.lastModifiedDateTime)
                      : null,
                    lastEditedDateTime: msg.lastEditedDateTime
                      ? new Date(msg.lastEditedDateTime)
                      : null,
                    deletedDateTime: msg.deletedDateTime
                      ? new Date(msg.deletedDateTime)
                      : null,
                    isDeleted: !!msg.deletedDateTime,
                  });

                  itemsProcessed++;
                } catch (msgError: any) {
                  errors.push(`Message ${msg.id}: ${msgError.message}`);
                }
              }
            } catch (msgFetchError: any) {
              errors.push(`Messages for chat ${chat.id}: ${msgFetchError.message}`);
            }
          }
        } catch (chatError: any) {
          errors.push(`Chat ${chat.id}: ${chatError.message}`);
        }
      }

      await storage.upsertUserSyncState({
        userId,
        resourceType: "chat",
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: itemsProcessed,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated,
        errors,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("chat", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during chat threads sync"],
    };
  }
}

export async function syncPresence(userId: string): Promise<SyncResult> {
  try {
    // Check if direct Graph API is configured
    checkGraphApiConfigured();

    // Get Microsoft user ID for this user
    const msUserId = await getMicrosoftUserId(userId);
    if (!msUserId) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [`No Microsoft 365 profile found for user ${userId}. User must be linked to a Microsoft account first.`],
      };
    }

    const job = await storage.createSyncJob({
      userId,
      resourceType: "presence",
      syncType: "full",
      status: "running",
    });

    const client = getDirectGraphClient();
    let itemsProcessed = 0;
    let itemsCreated = 0;
    const errors: string[] = [];

    try {
      const presenceResponse = await client.api(`/users/${msUserId}/presence`).get();

      await storage.createPresenceSnapshot({
        userId,
        availability: presenceResponse.availability || "PresenceUnknown",
        activity: presenceResponse.activity || "PresenceUnknown",
        statusMessage: presenceResponse.statusMessage?.message?.content || null,
        outOfOfficeMessage:
          presenceResponse.outOfOfficeSettings?.message || null,
        isOutOfOffice:
          presenceResponse.outOfOfficeSettings?.isOutOfOffice || false,
        recordedAt: new Date(),
        expiresAt: presenceResponse.statusMessage?.expiryDateTime
          ? new Date(presenceResponse.statusMessage.expiryDateTime)
          : null,
      });

      itemsProcessed = 1;
      itemsCreated = 1;

      await storage.upsertUserSyncState({
        userId,
        resourceType: "presence",
        lastSyncedAt: new Date(),
        status: "completed",
        itemCount: 1,
      });

      await storage.updateSyncJob(job.id, {
        status: "completed",
        completedAt: new Date(),
        itemsProcessed: 1,
      });

      return {
        success: true,
        itemsProcessed,
        itemsCreated,
        itemsUpdated: 0,
        errors,
      };
    } catch (error: any) {
      await storage.updateSyncJob(job.id, {
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
      });
      throw error;
    }
  } catch (error: any) {
    // Check if this is a permission error
    if (isPermissionError(error)) {
      return {
        success: false,
        itemsProcessed: 0,
        itemsCreated: 0,
        itemsUpdated: 0,
        errors: [formatPermissionError("presence", error)],
        permissionError: true,
      };
    }
    return {
      success: false,
      itemsProcessed: 0,
      itemsCreated: 0,
      itemsUpdated: 0,
      errors: [error.message || "Unknown error during presence sync"],
    };
  }
}

export async function extractActionItemsFromCalendar(
  userId: string,
  options: { daysBack?: number; daysForward?: number } = {}
): Promise<AiExtractionResult> {
  const { daysBack = 7, daysForward = 7 } = options;
  const errors: string[] = [];
  let itemsCreated = 0;

  try {
    const openai = getOpenAI();
    if (!openai) {
      return {
        success: false,
        itemsCreated: 0,
        summary: "OpenAI API key not configured",
        errors: ["OpenAI API key not configured"],
      };
    }

    const now = new Date();
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    const endDate = new Date(now.getTime() + daysForward * 24 * 60 * 60 * 1000);

    const events = await storage.getCalendarEvents(userId, startDate, endDate);

    const eventsWithContent = events.filter(
      (e) => e.bodyContent || e.subject
    );

    if (eventsWithContent.length === 0) {
      return {
        success: true,
        itemsCreated: 0,
        summary: "No calendar events with content found",
        errors: [],
      };
    }

    const eventsSummary = eventsWithContent
      .slice(0, 20)
      .map((e) => ({
        id: e.id,
        subject: e.subject,
        start: e.start,
        end: e.end,
        bodyPreview: e.bodyPreview?.substring(0, 500) || "",
      }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert at analyzing calendar events and extracting actionable items. 
          Extract action items, follow-ups, and tasks that should be created based on meeting subjects and descriptions.
          Focus on concrete, actionable items with clear next steps.
          Respond with JSON in this format: 
          { 
            "actionItems": [
              { 
                "title": string, 
                "description": string, 
                "priority": "low" | "medium" | "high" | "urgent",
                "sourceEventId": string,
                "dueDate": string (ISO date or null),
                "confidence": number (0-1)
              }
            ] 
          }`,
        },
        {
          role: "user",
          content: `Analyze these calendar events and extract action items:\n\n${JSON.stringify(eventsSummary, null, 2)}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    const actionItems = result.actionItems || [];

    for (const item of actionItems) {
      try {
        const sourceEvent = eventsWithContent.find(
          (e) => e.id === item.sourceEventId
        );

        await storage.createAiActionItem({
          userId,
          title: item.title,
          description: item.description,
          sourceType: "calendar_event",
          sourceId: item.sourceEventId,
          sourceUrl: sourceEvent?.webLink || null,
          priority: item.priority || "medium",
          status: "pending",
          dueDate: item.dueDate ? new Date(item.dueDate) : null,
          extractedAt: new Date(),
          confidence: item.confidence || 0.7,
        });
        itemsCreated++;
      } catch (itemError: any) {
        errors.push(`Creating action item: ${itemError.message}`);
      }
    }

    return {
      success: true,
      itemsCreated,
      summary: `Extracted ${itemsCreated} action items from ${eventsWithContent.length} calendar events`,
      errors,
    };
  } catch (error: any) {
    return {
      success: false,
      itemsCreated,
      summary: `Failed to extract action items: ${error.message}`,
      errors: [error.message, ...errors],
    };
  }
}

export async function generateDailyDigest(
  userId: string,
  options: { date?: Date } = {}
): Promise<AiExtractionResult> {
  const { date = new Date() } = options;
  const errors: string[] = [];

  try {
    const openai = getOpenAI();
    if (!openai) {
      return {
        success: false,
        itemsCreated: 0,
        summary: "OpenAI API key not configured",
        errors: ["OpenAI API key not configured"],
      };
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [events, tasks, emails, actionItems] = await Promise.all([
      storage.getCalendarEvents(userId, startOfDay, endOfDay),
      storage.getTasksByUser(userId),
      storage.getEmails(userId),
      storage.getAiActionItems(userId),
    ]);

    const pendingTasks = tasks.filter(
      (t) => t.status === "pending" || t.status === "in_progress"
    );
    const overdueTasks = pendingTasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date()
    );
    const unreadEmails = emails.filter((e) => !e.isRead).slice(0, 10);
    const pendingActionItems = actionItems.filter(
      (a) => a.status === "pending"
    );

    const digestData = {
      date: date.toISOString().split("T")[0],
      todaysEvents: events.slice(0, 10).map((e) => ({
        subject: e.subject,
        start: e.start,
        end: e.end,
        location: e.location,
        isOnlineMeeting: !!e.onlineMeetingUrl,
      })),
      pendingTasksCount: pendingTasks.length,
      overdueTasksCount: overdueTasks.length,
      topOverdueTasks: overdueTasks.slice(0, 5).map((t) => ({
        title: t.title,
        dueDate: t.dueDate,
        priority: t.priority,
      })),
      unreadEmailsCount: unreadEmails.length,
      pendingActionItemsCount: pendingActionItems.length,
      topActionItems: pendingActionItems.slice(0, 5).map((a) => ({
        title: a.title,
        priority: a.priority,
        dueDate: a.dueDate,
      })),
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a productivity assistant creating a daily digest summary.
          Analyze the user's schedule, tasks, and pending items to create a helpful daily summary.
          Highlight important meetings, overdue items, and suggest priorities for the day.
          Respond with JSON in this format:
          {
            "title": string,
            "summary": string (2-3 paragraphs),
            "topPriorities": string[] (top 3-5 priorities),
            "warnings": string[] (any urgent items or concerns),
            "productivityScore": number (0-100 estimate)
          }`,
        },
        {
          role: "user",
          content: `Create a daily digest for ${date.toDateString()}:\n\n${JSON.stringify(digestData, null, 2)}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    await storage.createAiInsight({
      userId,
      type: "daily_digest",
      scope: "user",
      title: result.title || `Daily Digest - ${date.toDateString()}`,
      summary: result.summary || "Daily digest generated",
      data: {
        date: date.toISOString(),
        topPriorities: result.topPriorities || [],
        warnings: result.warnings || [],
        eventsCount: events.length,
        pendingTasksCount: pendingTasks.length,
        overdueTasksCount: overdueTasks.length,
        unreadEmailsCount: unreadEmails.length,
        pendingActionItemsCount: pendingActionItems.length,
      },
      score: result.productivityScore || null,
      period: "daily",
      periodStart: startOfDay,
      periodEnd: endOfDay,
      generatedAt: new Date(),
    });

    return {
      success: true,
      itemsCreated: 1,
      summary: result.summary || "Daily digest created",
      errors,
    };
  } catch (error: any) {
    return {
      success: false,
      itemsCreated: 0,
      summary: `Failed to generate daily digest: ${error.message}`,
      errors: [error.message, ...errors],
    };
  }
}

export async function scheduleUpcomingReminders(
  userId: string,
  options: { daysAhead?: number; reminderMinutesBefore?: number } = {}
): Promise<AiExtractionResult> {
  const { daysAhead = 7, reminderMinutesBefore = 15 } = options;
  const errors: string[] = [];
  let itemsCreated = 0;

  try {
    const now = new Date();
    const endDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

    const events = await storage.getCalendarEvents(userId, now, endDate);
    const existingReminders = await storage.getUserReminders(userId, "pending");

    const eventsNeedingReminders = events.filter((event) => {
      if (event.isCancelled) return false;

      const hasExistingReminder = existingReminders.some(
        (r) => r.relatedId === event.id && r.relatedType === "calendar_event"
      );
      return !hasExistingReminder;
    });

    for (const event of eventsNeedingReminders) {
      try {
        const eventStart = new Date(event.start);
        const reminderTime = new Date(
          eventStart.getTime() - reminderMinutesBefore * 60 * 1000
        );

        if (reminderTime <= now) {
          continue;
        }

        let reminderMessage = `Upcoming: ${event.subject || "Meeting"}`;
        if (event.location) {
          reminderMessage += ` at ${event.location}`;
        }
        if (event.onlineMeetingUrl) {
          reminderMessage += ` (Online meeting)`;
        }

        await storage.createAiReminder({
          userId,
          type: "meeting_upcoming",
          title: `Reminder: ${event.subject || "Upcoming Meeting"}`,
          message: reminderMessage,
          relatedType: "calendar_event",
          relatedId: event.id,
          triggerAt: reminderTime,
          channel: "in_app",
          status: "pending",
        });

        itemsCreated++;
      } catch (reminderError: any) {
        errors.push(`Creating reminder for event ${event.id}: ${reminderError.message}`);
      }
    }

    const tasks = await storage.getTasksByUser(userId);
    const overdueTasks = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < now &&
        t.status !== "completed" &&
        t.status !== "cancelled"
    );

    for (const task of overdueTasks) {
      const hasExistingReminder = existingReminders.some(
        (r) => r.relatedId === task.id && r.relatedType === "task"
      );

      if (!hasExistingReminder) {
        try {
          await storage.createAiReminder({
            userId,
            type: "task_overdue",
            title: `Overdue: ${task.title}`,
            message: `This task was due on ${new Date(task.dueDate!).toLocaleDateString()}`,
            relatedType: "task",
            relatedId: task.id,
            triggerAt: new Date(),
            channel: "in_app",
            status: "pending",
          });
          itemsCreated++;
        } catch (reminderError: any) {
          errors.push(`Creating reminder for task ${task.id}: ${reminderError.message}`);
        }
      }
    }

    return {
      success: true,
      itemsCreated,
      summary: `Created ${itemsCreated} reminders for upcoming events and overdue tasks`,
      errors,
    };
  } catch (error: any) {
    return {
      success: false,
      itemsCreated,
      summary: `Failed to schedule reminders: ${error.message}`,
      errors: [error.message, ...errors],
    };
  }
}

export async function syncAllResources(
  userId: string,
  options: {
    includeCalendar?: boolean;
    includeContacts?: boolean;
    includeDrive?: boolean;
    includeTodo?: boolean;
    includeChat?: boolean;
    includePresence?: boolean;
  } = {}
): Promise<{
  success: boolean;
  results: Record<string, SyncResult>;
  summary: string;
}> {
  const {
    includeCalendar = true,
    includeContacts = true,
    includeDrive = true,
    includeTodo = true,
    includeChat = true,
    includePresence = true,
  } = options;

  const results: Record<string, SyncResult> = {};
  const syncPromises: Promise<void>[] = [];

  if (includeCalendar) {
    syncPromises.push(
      syncCalendarEvents(userId).then((r) => {
        results.calendar = r;
      })
    );
  }

  if (includeContacts) {
    syncPromises.push(
      syncContacts(userId).then((r) => {
        results.contacts = r;
      })
    );
  }

  if (includeDrive) {
    syncPromises.push(
      syncDriveItems(userId).then((r) => {
        results.drive = r;
      })
    );
  }

  if (includeTodo) {
    syncPromises.push(
      syncTodoLists(userId).then((r) => {
        results.todo = r;
      })
    );
  }

  if (includeChat) {
    syncPromises.push(
      syncChatThreads(userId).then((r) => {
        results.chat = r;
      })
    );
  }

  if (includePresence) {
    syncPromises.push(
      syncPresence(userId).then((r) => {
        results.presence = r;
      })
    );
  }

  await Promise.all(syncPromises);

  const successful = Object.values(results).filter((r) => r.success).length;
  const failed = Object.values(results).filter((r) => !r.success).length;
  const totalItems = Object.values(results).reduce(
    (sum, r) => sum + r.itemsProcessed,
    0
  );

  return {
    success: failed === 0,
    results,
    summary: `Synced ${totalItems} items across ${successful} resources. ${failed > 0 ? `${failed} resource(s) failed.` : ""}`,
  };
}
