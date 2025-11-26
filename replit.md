# Employee Portal - AI-Powered 3PL System

## Overview

An AI-powered employee portal designed for 3PL Ontario that integrates document management, task tracking, meeting analysis, and communication logging. The system leverages Microsoft 365 ecosystem integrations (Outlook, OneDrive, SharePoint) and HubSpot for comprehensive workflow automation and AI-enhanced productivity features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component System**: Built on shadcn/ui components (Radix UI primitives) with a custom design system following Microsoft Fluent Design principles. The component library emphasizes:

- Consistent spacing using Tailwind's utility-first approach
- Inter font family for clean, enterprise-grade typography
- Responsive layouts with mobile-first breakpoints
- Accessible components via Radix UI primitives

**Styling Approach**: Tailwind CSS with custom design tokens defined in CSS variables. Theme system supports light/dark modes with carefully crafted color palettes for cards, popovers, buttons, and semantic states (primary, secondary, muted, destructive, accent).

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Authentication state managed through custom `useAuth` hook with session-based persistence.

**Routing**: Wouter for lightweight client-side routing with role-based route protection (employee, manager, admin roles).

**Key Design Decisions**:

- No React Server Components (RSC) - traditional SPA approach for simpler deployment
- Path aliases configured for clean imports (`@/` for client code, `@shared/` for shared types)
- Separation of concerns: UI components isolated from business logic and API calls

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**Development vs Production**:

- Development mode uses Vite middleware for hot module replacement
- Production serves pre-built static assets from dist/public directory
- Separate entry points (`index-dev.ts` vs `index-prod.ts`) for environment-specific setup

**Authentication & Authorization**:

- Replit Auth integration using OpenID Connect (OIDC) via Passport.js strategy
- Session management with PostgreSQL-backed session store (`connect-pg-simple`)
- Role-based access control (employee, manager, admin) enforced at route level
- Session TTL of 1 week with secure, httpOnly cookies

**API Design**:

- RESTful endpoints organized by resource type (documents, tasks, meetings, emails, communications)
- Activity logging middleware tracks user actions for audit trails
- Multer middleware for file upload handling (in-memory storage)

**Key Architectural Patterns**:

- Storage abstraction layer separating database operations from route handlers
- Centralized error handling and logging with formatted timestamps
- Request/response interception for performance monitoring on `/api` routes

### Data Storage

**Database**: PostgreSQL via Neon serverless with WebSocket support for connection pooling.

**ORM**: Drizzle ORM providing type-safe database queries with schema-first approach.

**Schema Design** (26 tables total):

**Core Tables:**
- **Users**: Core authentication table with role-based access (employee/manager/admin), department assignment, and profile metadata
- **Documents**: Knowledge hub storage with category classification (policy/training/operational), file metadata, and search capabilities
- **Tasks**: Task management with assignment, priority, status tracking, and due dates
- **Meetings**: Meeting records with AI-generated summaries and extracted action items
- **Emails**: Synced from Outlook with sender/recipient tracking and read status
- **HubSpot Communications**: CRM communication logs with contact/company associations
- **Activity Logs**: Audit trail capturing user actions, resource access, and IP/user agent data
- **Sessions**: PostgreSQL-backed session storage for authentication persistence

**Microsoft 365 Sync Infrastructure:**
- **ms_user_profiles**: Extended Microsoft 365 user data (manager, job title, location, timezone)
- **user_sync_states**: Per-user delta sync tracking with tokens for incremental updates
- **sync_jobs**: Sync job history with status, timing, and error tracking

**Microsoft 365 Data Tables:**
- **ms_calendar_events**: Calendar events with recurrence, attendees, and online meeting links
- **ms_event_attendees**: Event participant data with response status
- **ms_recurrence_patterns**: Recurring event pattern definitions
- **ms_todo_lists**: Microsoft To Do task lists per user
- **ms_todo_tasks**: Individual tasks with reminders, due dates, and checklists
- **ms_presence_snapshots**: Teams presence/availability status history
- **ms_chat_threads**: Teams chat threads (1:1, group, meeting chats)
- **ms_chat_participants**: Chat participant membership
- **ms_chat_messages**: Chat messages with sender and content
- **ms_contacts**: Outlook contacts with phone, email, and address data
- **ms_drive_items**: OneDrive/SharePoint file metadata

**AI Enablement Tables:**
- **ai_action_items**: AI-extracted action items from meetings/emails with confidence scores
- **ai_reminders**: Proactive reminder system with scheduling and delivery tracking
- **ai_notifications**: User notification queue with multi-channel support
- **ai_insights**: AI-generated productivity insights and reports

**Migration Strategy**: Drizzle Kit for schema migrations with `npm run db:push` for safe updates.

### Sync Services

**Location**: `server/services/sync.ts`

**Sync Functions** (with pagination and delta token support):
- `syncCalendarEvents`: Calendar events with attendees and recurrence patterns
- `syncContacts`: Outlook contacts with phone/email/address data
- `syncDriveItems`: OneDrive/SharePoint files with recursive folder scanning
- `syncTodoLists`: Microsoft To Do lists and tasks
- `syncChatThreads`: Teams chats with participants and messages
- `syncPresence`: Current user presence status
- `syncAllResources`: Orchestrates parallel sync of all resources

**AI Helper Functions**:
- `extractActionItemsFromCalendar`: GPT-4o extracts action items from meeting subjects/descriptions
- `generateDailyDigest`: Creates AI-powered daily productivity insights
- `scheduleUpcomingReminders`: Auto-schedules reminders for events and overdue tasks

**Key Features**:
- Delta sync support using Microsoft Graph `@odata.deltaLink` for incremental updates
- Pre-loaded Maps for O(1) existing record lookups (no O(n²) database access)
- Sync job tracking with start/end timestamps and item counts
- Error accumulation with graceful degradation

### Sync Scheduler

**Location**: `server/services/syncScheduler.ts`

**Tiered Scheduling** (node-cron):
- **Presence**: Every 5 minutes - Real-time availability status
- **Calendar/Chat/ToDo**: Every 30 minutes - Core productivity data
- **Files/Contacts**: Every 2 hours - Less frequently changing data

**Queue Management**:
- In-memory job queue with sequential per-user processing
- User locks prevent concurrent Microsoft Graph calls for same user
- Configurable concurrency (default 2 parallel users)
- Exponential backoff retry (5 max retries with delays: 1s, 2s, 4s, 8s, 16s)

**API Endpoints**:
- `POST /api/sync/manual` - User triggers sync of their own data
- `GET /api/sync/status` - View user's sync history and queue status
- `GET /api/admin/sync/stats` - Admin: Queue statistics
- `POST /api/admin/sync/all` - Admin: Trigger sync for all users
- `GET /api/admin/sync/jobs` - Admin: View all recent sync jobs
- `POST /api/admin/sync/user/:userId` - Admin: Sync specific user

**Lifecycle**:
- Auto-starts on server startup
- Graceful shutdown waits for in-flight jobs (30s timeout)
- Handles SIGTERM/SIGINT for clean container stops

### External Dependencies

**Microsoft Graph API Integration**:

- **Outlook**: Email synchronization with access to inbox, sent items, and metadata
- **OneDrive**: Document storage and retrieval capabilities
- **SharePoint**: Enterprise content management integration
- OAuth token management with automatic refresh using Replit Connectors API
- Uncacheable client pattern ensures fresh access tokens per request

**HubSpot API Integration**:

- CRM communication logging (calls, emails, meetings, notes)
- Contact and company association tracking
- OAuth authentication via Replit Connectors with token refresh
- API client initialization using `@hubspot/api-client` package

**OpenAI GPT Integration**:

- Model: GPT-5 for AI-powered features
- **Meeting Summarization**: Analyzes transcripts to generate concise summaries and extract action items
- **Document Q&A**: Answers questions about uploaded documents using RAG-like context
- JSON response format for structured data extraction
- Error handling with fallback responses when AI processing fails

**Replit Platform Services**:

- **Replit Auth**: Authentication provider with OIDC integration
- **Replit Connectors**: Managed OAuth flows for third-party integrations (Microsoft, HubSpot)
- Environment variables for secure credential storage
- Development tooling: Cartographer for code mapping, runtime error overlay, dev banner

**UI Dependencies**:

- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- React Hook Form with Zod validation for form management
- CMDK for command palette functionality
- Vaul for drawer components

**Development Tools**:

- TypeScript for type safety across frontend and backend
- ESBuild for production backend bundling
- PostCSS with Tailwind and Autoprefixer
- tsx for TypeScript execution in development
