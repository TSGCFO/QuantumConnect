import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

let graphClient: Client | null = null;

export interface GraphClientConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

function getConfig(): GraphClientConfig | null {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    return null;
  }

  return { tenantId, clientId, clientSecret };
}

export function isDirectGraphConfigured(): boolean {
  return getConfig() !== null;
}

export function getMissingCredentials(): string[] {
  const missing: string[] = [];
  if (!process.env.AZURE_TENANT_ID) missing.push("AZURE_TENANT_ID");
  if (!process.env.AZURE_CLIENT_ID) missing.push("AZURE_CLIENT_ID");
  if (!process.env.AZURE_CLIENT_SECRET) missing.push("AZURE_CLIENT_SECRET");
  return missing;
}

export function getDirectGraphClient(): Client {
  if (graphClient) {
    return graphClient;
  }

  const config = getConfig();
  if (!config) {
    const missing = getMissingCredentials();
    throw new Error(
      `Microsoft Graph API not configured. Missing: ${missing.join(", ")}. ` +
      `Please add the Azure AD app credentials to enable full Microsoft 365 sync.`
    );
  }

  const credential = new ClientSecretCredential(
    config.tenantId,
    config.clientId,
    config.clientSecret
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  graphClient = Client.initWithMiddleware({
    authProvider,
    debugLogging: process.env.NODE_ENV === "development",
  });

  console.log("[Microsoft Graph] Direct API client initialized with client credentials");
  return graphClient;
}

export function resetGraphClient(): void {
  graphClient = null;
}

export async function getUserById(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}`).get();
}

export async function getCalendarView(
  userId: string,
  startDateTime: string,
  endDateTime: string,
  options: { top?: number; select?: string } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  let request = client
    .api(`/users/${userId}/calendarView`)
    .query({
      startDateTime,
      endDateTime,
    });

  if (options.select) {
    request = request.select(options.select);
  }

  if (options.top) {
    request = request.header("Prefer", `odata.maxpagesize=${options.top}`);
  }

  return request.get();
}

export async function getCalendarEventsDelta(
  userId: string,
  deltaLink?: string,
  options: { startDateTime?: string; endDateTime?: string; pageSize?: number } = {}
): Promise<{ value: any[]; deltaLink?: string; nextLink?: string }> {
  const client = getDirectGraphClient();
  
  if (deltaLink) {
    return client.api(deltaLink).get();
  }

  let request = client.api(`/users/${userId}/calendarView/delta`);
  
  if (options.startDateTime && options.endDateTime) {
    request = request.query({
      startDateTime: options.startDateTime,
      endDateTime: options.endDateTime,
    });
  }

  if (options.pageSize) {
    request = request.header("Prefer", `odata.maxpagesize=${options.pageSize}`);
  }

  return request.get();
}

export async function getContacts(
  userId: string,
  options: { top?: number; select?: string } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  let request = client.api(`/users/${userId}/contacts`);

  if (options.select) {
    request = request.select(options.select);
  }
  if (options.top) {
    request = request.top(options.top);
  }

  return request.get();
}

export async function getDriveItems(
  userId: string,
  folderId?: string,
  options: { top?: number } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  const path = folderId
    ? `/users/${userId}/drive/items/${folderId}/children`
    : `/users/${userId}/drive/root/children`;

  let request = client.api(path);
  if (options.top) {
    request = request.top(options.top);
  }

  return request.get();
}

export async function getTodoLists(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/todo/lists`).get();
}

export async function getTodoTasks(
  userId: string,
  listId: string
): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/todo/lists/${listId}/tasks`).get();
}

export async function getUserChatsDirectGraph(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/chats`).get();
}

export async function getChatMessagesDirectGraph(
  chatId: string,
  options: { top?: number } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  let request = client.api(`/chats/${chatId}/messages`);
  if (options.top) {
    request = request.top(options.top);
  }
  return request.get();
}

export async function getUserPresence(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/presence`).get();
}

export async function getMultipleUsersPresence(userIds: string[]): Promise<any> {
  const client = getDirectGraphClient();
  return client
    .api("/communications/getPresencesByUserId")
    .post({ ids: userIds });
}

export async function getMailFolders(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/mailFolders`).get();
}

export async function getMessages(
  userId: string,
  folderId?: string,
  options: { top?: number; filter?: string; orderBy?: string } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  const path = folderId
    ? `/users/${userId}/mailFolders/${folderId}/messages`
    : `/users/${userId}/messages`;

  let request = client.api(path);
  if (options.top) {
    request = request.top(options.top);
  }
  if (options.filter) {
    request = request.filter(options.filter);
  }
  if (options.orderBy) {
    request = request.orderby(options.orderBy);
  }

  return request.get();
}

export async function sendMail(
  userId: string,
  message: {
    subject: string;
    body: { contentType: string; content: string };
    toRecipients: { emailAddress: { address: string } }[];
  }
): Promise<void> {
  const client = getDirectGraphClient();
  await client.api(`/users/${userId}/sendMail`).post({ message });
}

export async function getUserProfile(userId: string): Promise<any> {
  const client = getDirectGraphClient();
  return client
    .api(`/users/${userId}`)
    .select("id,displayName,mail,userPrincipalName,jobTitle,department,officeLocation,manager")
    .get();
}

export async function getAllUsers(options: { top?: number } = {}): Promise<any> {
  const client = getDirectGraphClient();
  let request = client
    .api("/users")
    .select("id,displayName,mail,userPrincipalName,jobTitle,department");

  if (options.top) {
    request = request.top(options.top);
  }

  return request.get();
}

export async function getMessagesDelta(
  userId: string,
  deltaLink?: string,
  options: { 
    folderId?: string;
    pageSize?: number;
    select?: string;
    filter?: string;
  } = {}
): Promise<{ value: any[]; deltaLink?: string; nextLink?: string }> {
  const client = getDirectGraphClient();
  
  if (deltaLink) {
    return client.api(deltaLink).get();
  }

  const path = options.folderId
    ? `/users/${userId}/mailFolders/${options.folderId}/messages/delta`
    : `/users/${userId}/messages/delta`;

  let request = client.api(path);

  if (options.select) {
    request = request.select(options.select);
  }

  if (options.filter) {
    request = request.filter(options.filter);
  }

  if (options.pageSize) {
    request = request.header("Prefer", `odata.maxpagesize=${options.pageSize}`);
  }

  return request.get();
}

export async function getOnlineMeetings(
  userId: string,
  options: { top?: number; filter?: string } = {}
): Promise<any> {
  const client = getDirectGraphClient();
  let request = client.api(`/users/${userId}/onlineMeetings`);

  if (options.top) {
    request = request.top(options.top);
  }
  if (options.filter) {
    request = request.filter(options.filter);
  }

  return request.get();
}

export async function getOnlineMeetingTranscripts(
  userId: string,
  meetingId: string
): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/onlineMeetings/${meetingId}/transcripts`).get();
}

export async function getOnlineMeetingTranscriptContent(
  userId: string,
  meetingId: string,
  transcriptId: string,
  format: "vtt" | "docx" = "vtt"
): Promise<any> {
  const client = getDirectGraphClient();
  return client
    .api(`/users/${userId}/onlineMeetings/${meetingId}/transcripts/${transcriptId}/content`)
    .query({ $format: format === "docx" ? "text/vtt" : "text/vtt" })
    .get();
}

export async function getOnlineMeetingRecordings(
  userId: string,
  meetingId: string
): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/onlineMeetings/${meetingId}/recordings`).get();
}

export async function getOnlineMeetingAttendanceReports(
  userId: string,
  meetingId: string
): Promise<any> {
  const client = getDirectGraphClient();
  return client.api(`/users/${userId}/onlineMeetings/${meetingId}/attendanceReports`).get();
}
