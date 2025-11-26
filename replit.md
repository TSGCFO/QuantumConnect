# Employee Portal - AI-Powered 3PL System

## Overview

The AI-powered ERP employee portal for 3PL Ontario is an organizational intelligence platform. Its primary function is to track all activities across Microsoft 365 applications, link this data to the organizational hierarchy, and use AI to provide actionable insights at individual employee, manager, and department head levels. This system aims to enhance productivity, improve collaboration, and ensure compliance within the organization.

### Core Capabilities

**1. Comprehensive M365 Activity Tracking**
- Captures all interactions across Microsoft 365: Teams meetings/chats, Outlook emails, OneDrive/SharePoint files, calendar events, To-Do tasks, and presence status
- Unified data model links every activity to specific users and departments
- Delta sync ensures near-real-time data without excessive API calls

**2. Organizational Intelligence**
- Full department hierarchy with parent/child relationships and department heads
- Multi-department user memberships (employees can belong to multiple departments)
- Manager-employee relationships for reporting chains
- Resource and activity tracking tied to organizational structure

**3. Dual-Level AI Insights**

*For Department Heads & Managers:*
- Employee performance reports and activity summaries
- Missed follow-up alerts (e.g., sales calls without follow-through)
- Meeting transcript analysis to identify action items and commitments
- Team productivity metrics and workload analysis
- Cross-department collaboration insights

*For Individual Employees:*
- Personal task reminders and deadline alerts
- AI-extracted action items from emails and meetings
- Proactive suggestions based on work patterns
- Daily/weekly productivity digests

**4. Governance & Compliance**
- Policy engine to control AI behavior and data access
- Comprehensive audit trail for all AI actions and permission usage
- Graph API permission catalog documenting what data is accessible

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend uses React with TypeScript (Vite), built on shadcn/ui components following Microsoft Fluent Design principles. Styling is handled by Tailwind CSS with custom design tokens, supporting light/dark modes. TanStack Query manages server state, while a custom `useAuth` hook handles authentication. Wouter provides client-side routing with role-based protection. Key decisions include using a traditional SPA approach, path aliases for clean imports, and clear separation of concerns.

### Backend Architecture

The backend is an Express.js application with TypeScript. It supports both development (Vite middleware) and production (static asset serving) environments. Authentication and authorization are managed via Replit Auth (Passport.js) and PostgreSQL-backed session management, enforcing role-based access control (employee, manager, admin). The API is RESTful, with activity logging and Multer for file uploads. Core architectural patterns include a storage abstraction layer, centralized error handling, and request/response interception.

### Data Storage

The system uses PostgreSQL (Neon serverless) with Drizzle ORM for type-safe queries. The database schema includes 38 tables, categorized as:

#### Core Tables
- `users`: Authentication with role-based access (employee/manager/admin), department assignment, profile metadata
- `documents`: Knowledge hub with category classification, file metadata, search capabilities
- `tasks`: Task management with assignment, priority, status tracking, due dates
- `meetings`: Meeting records with AI-generated summaries and action items
- `emails`: Synced from Outlook with sender/recipient tracking, read status
- `hubspot_communications`: CRM logs with contact/company associations
- `activity_logs`: Audit trail for user actions, resource access, IP/user agent
- `sessions`: PostgreSQL-backed session storage

#### Organizational Structure Tables
- `departments`: Hierarchical structure with:
  - `name`, `code`, `description` for identification
  - `headId` references department head (user)
  - `parentDepartmentId` for nested hierarchy (e.g., Sales → Inside Sales → SDR Team)
- `user_department_memberships`: Many-to-many user-department relationships:
  - `userId`, `departmentId` for the association
  - `role`: "member", "manager", or "head"
  - `joinedAt`, `leftAt` for historical tracking

#### Graph Permission Catalog Tables
Documents and tracks Microsoft Graph API permissions:
- `permission_categories`: Groups permissions by area (Mail, Calendar, Files, Teams)
- `graph_permissions`: Permission definitions with name, type, scope, adminConsentRequired, riskLevel
- `graph_permission_endpoints`: API endpoints each permission enables (method, path)
- `graph_permission_examples`: Code samples in multiple languages
- `graph_permission_grants`: Tracks permissions granted to users/groups/apps

#### Unified Resource & Activity Tracking Tables
- `resources`: Generic registry for all synced M365 items (meetings, calls, chats, emails, files)
  - `type`, `sourceSystem`, `externalId` for identification
  - `ownerUserId`, `departmentId` for organizational context
  - `title`, `summary`, `occurredAt`, `metadata`
- `activities`: Links resources to actors for reporting
  - `resourceId`, `actorUserId`, `targetUserId`, `departmentId`
  - `type`, `status`, `occurredAt`, `durationSeconds`
  - `sentimentScore`, `qualityScore`, `metrics` for AI analysis

#### Governance & Audit Tables
- `policies`: Rules for AI behavior and data access
  - `name`, `description`, `scope` (organization/department/team)
  - `departmentId`, `enforcementRules` (JSON), `isActive`
- `audit_events`: Comprehensive audit trail
  - `actorType` (user/ai_system/service), `actorId`, `action`
  - `permissionId`, `policyId`, `targetUserId`, `targetResourceId`
  - `outcome` (pending/succeeded/failed/denied), `detail`

#### Microsoft 365 Sync Infrastructure
- `ms_user_profiles`: Extended M365 user data (manager, job title, timezone)
- `user_sync_states`: Per-user delta sync tracking with tokens
- `sync_jobs`: Sync job history with status, timing, error tracking

#### Microsoft 365 Data Tables
- `ms_calendar_events`: Calendar with recurrence, attendees, online meeting links
- `ms_event_attendees`: Participant data with response status
- `ms_recurrence_patterns`: Recurring event patterns
- `ms_todo_lists`: Microsoft To Do task lists
- `ms_todo_tasks`: Tasks with reminders, due dates, checklists
- `ms_presence_snapshots`: Teams presence/availability history
- `ms_chat_threads`: Teams chats (1:1, group, meeting)
- `ms_chat_participants`: Chat membership
- `ms_chat_messages`: Messages with sender and content
- `ms_contacts`: Outlook contacts with phone, email, address
- `ms_drive_items`: OneDrive/SharePoint file metadata

#### AI Enablement Tables
- `ai_action_items`: AI-extracted action items with confidence scores
- `ai_reminders`: Proactive reminder system with scheduling
- `ai_notifications`: Multi-channel notification queue
- `ai_insights`: AI-generated productivity insights and reports

Drizzle Kit is used for schema migrations (`npm run db:push`).

### Permission Ingestion Service

**Location**: `server/services/permissionIngestion.ts`

**Purpose**: Populates the Graph Permission Catalog by parsing markdown documentation files describing Microsoft Graph permissions.

**Source Data**: `docs/api-permissions/permissions/` contains 280+ markdown files documenting:
- Permission name, display name, type (Delegated/Application)
- Admin consent requirements and risk level
- API endpoints enabled by the permission
- Code examples in multiple languages

**Key Function**:
```typescript
ingestGraphPermissionDocs(rootDir?: string): Promise<{
  categoriesUpserted: number;
  permissionsProcessed: number;
  endpointsProcessed: number;
  examplesProcessed: number;
}>
```

**Storage Methods** (in `server/storage.ts`):
- `upsertPermissionCategory(data)`: Insert/update category by name
- `upsertGraphPermission(data)`: Insert/update permission by name
- `replaceGraphPermissionEndpoints(permissionId, endpoints)`: Replace endpoints
- `replaceGraphPermissionExamples(permissionId, examples)`: Replace examples

### Sync Services

**Location**: `server/services/sync.ts`

**Sync Functions** (with pagination and delta token support):
- `syncCalendarEvents`: Calendar events with attendees and recurrence
- `syncContacts`: Outlook contacts
- `syncDriveItems`: OneDrive/SharePoint files
- `syncTodoLists`: Microsoft To Do lists and tasks
- `syncChatThreads`: Teams chats with participants and messages
- `syncPresence`: Current user presence status
- `syncAllResources`: Orchestrates parallel sync

**AI Helper Functions**:
- `extractActionItemsFromCalendar`: GPT-4o extracts action items
- `generateDailyDigest`: AI-powered productivity insights
- `scheduleUpcomingReminders`: Auto-schedules reminders

**Key Features**:
- Delta sync using `@odata.deltaLink` for incremental updates
- Pre-loaded Maps for O(1) record lookups
- Sync job tracking with error accumulation

### Sync Scheduler

**Location**: `server/services/syncScheduler.ts`

**Tiered Scheduling** (node-cron):
- Presence: Every 5 minutes
- Calendar/Chat/ToDo: Every 30 minutes
- Files/Contacts: Every 2 hours

**Queue Management**:
- In-memory job queue with sequential per-user processing
- User locks prevent concurrent Graph calls
- Exponential backoff retry (5 max retries)

**API Endpoints**:
- `POST /api/sync/manual` - User triggers own sync
- `GET /api/sync/status` - User's sync history
- `GET /api/admin/sync/stats` - Queue statistics (admin)
- `POST /api/admin/sync/all` - Sync all users (admin)
- `POST /api/admin/sync/user/:userId` - Sync specific user (admin)

### Admin M365 Account Linking

**Location**: `client/src/pages/admin.tsx`

Allows administrators to link portal users to Microsoft 365 accounts:
1. Admin views users with M365 link status
2. Clicks "Link" to search M365 users
3. Selects matching account and confirms
4. Creates `ms_user_profiles` record with `msUserId`
5. Sync services use this ID for Graph API calls

**Admin API Endpoints**:
- `GET /api/admin/users` - Lists users with M365 status
- `POST /api/admin/users/:userId/link-m365` - Link user
- `DELETE /api/admin/users/:userId/link-m365` - Unlink user

## External Dependencies

- **Microsoft Graph API**: Outlook, OneDrive, SharePoint integration with OAuth via Replit Connectors
- **HubSpot API**: CRM communication logging via Replit Connectors
- **OpenAI GPT**: GPT-5 for meeting summarization, document Q&A, structured extraction
- **Replit Platform**: Auth (OIDC), Connectors (OAuth), environment variables
- **UI**: Radix UI, Lucide React, React Hook Form, Zod, CMDK, Vaul
- **Development**: TypeScript, ESBuild, PostCSS, Tailwind, tsx

---

## Implementation Status & Next Steps

### Completed (Recent Merge Commits)

**Schema Complete:**
- Graph Permission Catalog (5 tables): `permission_categories`, `graph_permissions`, `graph_permission_endpoints`, `graph_permission_examples`, `graph_permission_grants`
- Organizational Structure (2 tables): `departments`, `user_department_memberships`
- Resource & Activity Tracking (2 tables): `resources`, `activities`
- Governance Framework (2 tables): `policies`, `audit_events`
- All Drizzle relations defined with proper indexes

**Services Complete:**
- Permission Ingestion Service (`permissionIngestion.ts`)
- Storage methods for permission CRUD operations
- Permission documentation (280+ markdown files in `docs/api-permissions/`)

### Still Required

1. **Database Migration**
   - Run `npm run db:push` to create new tables in PostgreSQL
   - Verify all indexes and constraints applied

2. **Permission Ingestion Trigger**
   - Add API endpoint: `POST /api/admin/permissions/ingest`
   - Or CLI command for on-demand ingestion
   - Consider scheduled refresh (weekly)

3. **Permission Catalog Admin UI**
   - Browse permissions by category
   - View details (endpoints, examples, risk level)
   - Search/filter capabilities

4. **Department Management UI**
   - Create/edit departments and hierarchy
   - Assign department heads
   - Manage user memberships

5. **Resource-Activity Integration**
   - Update sync services to create `resources` records
   - Generate `activities` when syncing M365 data
   - Link activities to departments

6. **AI Integration with New Schema**
   - Use `resources`/`activities` for AI analysis
   - Create `audit_events` when AI accesses data
   - Evaluate `policies` before AI actions
   - Generate department-level insights

7. **Manager/Department Head Reports**
   - Team activity summaries
   - Missed follow-up alerts
   - Performance metrics from meeting analysis

8. **Policy Engine Implementation**
   - Define policy rule schema (JSON)
   - Build evaluation logic
   - Integrate with AI decision points
