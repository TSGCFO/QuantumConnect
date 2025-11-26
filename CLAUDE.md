# CLAUDE.md - QuantumConnect AI Employee Portal

## Project Overview

QuantumConnect is an AI-powered employee portal that integrates with Microsoft 365 services to provide a unified workspace for managing documents, meetings, tasks, emails, and communications. It features AI-powered meeting summarization, document Q&A, and automated action item extraction.

## Architecture

```
QuantumConnect/
├── client/           # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # UI components (shadcn/ui)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── pages/         # Route pages
│   └── index.html
├── server/           # Express.js backend
│   ├── integrations/      # Third-party API integrations
│   ├── services/          # Business logic services
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database access layer
│   └── db.ts              # Database connection
├── shared/           # Shared code between client/server
│   └── schema.ts          # Drizzle ORM schema definitions
└── docs/             # Documentation
```

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Wouter** for routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **shadcn/ui** (New York style) for UI components
- **Radix UI** primitives for accessible components
- **Recharts** for data visualization

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** (Neon serverless) for data storage
- **Passport.js** with OpenID Connect for authentication
- **Multer** for file uploads

### Integrations
- **Microsoft Graph API** - Calendar, OneDrive, SharePoint, Teams, Outlook, To Do, Presence
- **HubSpot API** - CRM communications
- **OpenAI API** - Meeting summarization and document Q&A

## Development Commands

```bash
# Start development server (API + client with HMR)
npm run dev

# Type check
npm run check

# Build for production
npm run build

# Start production server
npm run start

# Push database schema changes
npm run db:push
```

## Key Files

| File | Purpose |
|------|---------|
| `server/routes.ts` | All API endpoint definitions |
| `server/storage.ts` | Database operations interface (IStorage) |
| `shared/schema.ts` | Drizzle ORM table definitions and Zod schemas |
| `client/src/App.tsx` | Main React app with routing |
| `server/integrations/microsoft-graph.ts` | Microsoft Graph API client |
| `server/services/sync.ts` | Data synchronization logic |

## Database Schema

The database uses PostgreSQL with Drizzle ORM. Key tables:

### Core Tables
- `users` - User accounts with roles (employee, manager, admin)
- `documents` - Knowledge hub documents
- `meetings` - Meeting records with transcripts/summaries
- `tasks` - Task management
- `emails` - Synced Outlook emails
- `activity_logs` - User activity tracking

### Microsoft 365 Tables
- `ms_user_profiles` - M365 user profile data
- `ms_calendar_events` - Synced calendar events
- `ms_event_attendees` - Event attendees
- `ms_todo_lists` / `ms_todo_tasks` - To Do items
- `ms_contacts` - Outlook contacts
- `ms_drive_items` - OneDrive/SharePoint files
- `ms_chat_threads` / `ms_chat_messages` - Teams chats
- `ms_presence_snapshots` - Teams presence status

### AI Tables
- `ai_action_items` - AI-extracted action items
- `ai_reminders` - Scheduled reminders
- `ai_notifications` - User notifications
- `ai_insights` - AI-generated insights

### Sync Tables
- `user_sync_states` - Per-user sync status with delta tokens
- `sync_jobs` - Sync operation audit log

## API Patterns

### Authentication
All API routes require authentication via `isAuthenticated` middleware. Uses Replit Auth with OpenID Connect.

```typescript
app.get("/api/endpoint", isAuthenticated, async (req: any, res) => {
  const userId = req.user.claims.sub;
  // ...
});
```

### Activity Logging
Use `logActivity` middleware to track user actions:

```typescript
app.get("/api/documents", isAuthenticated, logActivity("view_documents"), async (req, res) => {
  // ...
});
```

### Response Format
- Success: Return JSON data directly
- Error: Return `{ message: string }` with appropriate status code

### Key API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/user` | GET | Get current user |
| `/api/dashboard/stats` | GET | Dashboard statistics |
| `/api/documents` | GET | List documents |
| `/api/documents/upload` | POST | Upload document |
| `/api/documents/ask-ai` | POST | AI document Q&A |
| `/api/meetings` | GET | List meetings |
| `/api/meetings/upload` | POST | Upload meeting with AI summary |
| `/api/tasks/my-tasks` | GET | User's tasks |
| `/api/tasks` | POST | Create task |
| `/api/tasks/:id` | PATCH | Update task |
| `/api/emails` | GET | List emails |
| `/api/emails/sync` | POST | Sync from Outlook |
| `/api/teams/sync` | GET | Sync Teams meetings |
| `/api/calendar/sync` | POST | Sync calendar |
| `/api/sync/full` | POST | Full M365 data sync |
| `/api/graph/status` | GET | Check M365 connection |
| `/api/admin/users` | GET | Admin: list all users |

## Environment Variables

```bash
# Required
DATABASE_URL=           # PostgreSQL connection string
SESSION_SECRET=         # Session encryption key
REPL_ID=               # Replit app ID (for auth)

# Microsoft 365 Integration (optional but recommended)
AZURE_TENANT_ID=       # Azure AD tenant ID
AZURE_CLIENT_ID=       # Azure AD app client ID
AZURE_CLIENT_SECRET=   # Azure AD app client secret

# AI Features (optional)
OPENAI_API_KEY=        # OpenAI API key for AI features

# HubSpot Integration (optional)
HUBSPOT_ACCESS_TOKEN=  # HubSpot API token
```

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
import { something } from "@/components/ui/button";  // client/src/components/ui/button
import { schema } from "@shared/schema";             // shared/schema
```

## Component Library

Uses **shadcn/ui** with the **New York** style variant. Components are in `client/src/components/ui/`.

To add a new shadcn component:
```bash
npx shadcn@latest add <component-name>
```

## Design Guidelines

Follow Microsoft Fluent Design principles (see `design_guidelines.md`):
- **Typography**: Inter font, weights 400-700
- **Spacing**: Tailwind units 3, 4, 6, 8, 12, 16
- **Colors**: Neutral base with semantic status colors
- **Accessibility**: WCAG AA compliant, keyboard navigable

## User Roles

- `employee` - Standard user access
- `manager` - Access to analytics
- `admin` - Full access including user management

## Code Conventions

### TypeScript
- Use TypeScript strict mode
- Define types in `shared/schema.ts` for database models
- Use Zod schemas for runtime validation

### React
- Use functional components with hooks
- Use TanStack Query for data fetching
- Use the `apiRequest` helper from `lib/queryClient.ts` for mutations

```typescript
import { apiRequest } from "@/lib/queryClient";
await apiRequest("POST", "/api/tasks", { title: "New task" });
```

### Database
- All database operations go through `storage` singleton
- Use Drizzle's query builder, not raw SQL
- Use `upsert` patterns for sync operations

### Error Handling
- Server: Log errors with `console.error`, return generic error messages
- Client: Use toast notifications for user feedback

## Microsoft Graph Integration

The app uses **client credentials flow** for Microsoft Graph API access, allowing application-level access to all users' data (with appropriate Azure AD permissions).

Key permissions required:
- `User.Read.All` - Read user profiles
- `Calendars.Read` - Read calendar events
- `Mail.Read` - Read email messages
- `Tasks.Read` - Read To Do tasks
- `Files.Read.All` - Read OneDrive/SharePoint files
- `Chat.Read.All` - Read Teams chat messages
- `Presence.Read.All` - Read Teams presence

## Sync Architecture

Data synchronization uses:
1. **Delta queries** where supported (calendar, contacts)
2. **Sync states** tracked per user per resource type
3. **Job queue** for background sync operations
4. **Scheduler** for periodic automatic syncs

## AI Features

### Meeting Summarization
- Uses OpenAI GPT to summarize meeting transcripts
- Automatically extracts action items
- Creates tasks from action items

### Document Q&A
- Search across document content
- AI answers questions using document context

### Action Item Extraction
- Scans calendar events and meetings
- Extracts actionable items
- Creates reminders automatically

## Testing

No test framework is currently configured. When adding tests:
- Use Vitest for unit tests
- Use Playwright for E2E tests
- Add test commands to package.json

## Deployment

The app runs on Replit with:
- Server on port 5000 (configurable via `PORT` env var)
- Static files served from `dist/public`
- Database: Neon PostgreSQL
