# CLAUDE.md - QuantumConnect AI Employee Portal

## Project Vision

QuantumConnect is a **Hierarchical AI-Powered Employee Intelligence System** that tracks every activity across all Microsoft 365 apps used by an organization. The system provides:

- **For Department Heads**: Team performance reports, department KPIs, cross-team insights, escalation alerts
- **For Managers**: Direct report monitoring, follow-up alerts, performance summaries, coaching opportunities
- **For Employees**: Personal task reminders, meeting follow-ups, deadline alerts, AI-powered suggestions

```
                    ┌─────────────────────────────────────────┐
                    │         Microsoft 365 Data Sources       │
                    │  Teams, Outlook, Calendar, OneDrive,     │
                    │  SharePoint, To Do, Presence, Calls      │
                    └──────────────────┬──────────────────────┘
                                       │ Continuous Sync
                                       ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                        Unified Data Store                                 │
│  Meetings, Emails, Tasks, Files, Chats, Calls, Presence, Transcripts     │
└──────────────────────────────────────────────────────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │          AI Processing Layer         │
                    │  Analysis, Scoring, Recommendations  │
                    └──────────────────┬──────────────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           ▼                           ▼                           ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│   DEPARTMENT HEAD   │   │      MANAGER        │   │      EMPLOYEE       │
├─────────────────────┤   ├─────────────────────┤   ├─────────────────────┤
│ • Team performance  │   │ • Direct report     │   │ • Personal tasks    │
│   reports           │   │   monitoring        │   │ • Meeting follow-ups│
│ • Department KPIs   │   │ • Follow-up alerts  │   │ • Reminders         │
│ • Cross-team        │   │ • Performance       │   │ • Suggestions       │
│   insights          │   │   summaries         │   │ • Deadline alerts   │
│ • Escalation alerts │   │ • Coaching opps     │   │ • Action items      │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘
```

---

## Architecture

```
QuantumConnect/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # UI components (shadcn/ui)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   └── pages/             # Route pages
│   └── index.html
├── server/                    # Express.js backend
│   ├── integrations/          # Third-party API integrations
│   │   ├── microsoft-graph.ts # Core Graph API client
│   │   ├── teams-app.ts       # Teams meetings & chats
│   │   ├── outlook.ts         # Email sync
│   │   ├── onedrive.ts        # File sync
│   │   ├── sharepoint.ts      # SharePoint integration
│   │   └── hubspot.ts         # CRM integration
│   ├── services/              # Business logic services
│   │   ├── sync.ts            # Data synchronization
│   │   └── syncScheduler.ts   # Background job scheduling
│   ├── routes.ts              # API route definitions
│   ├── storage.ts             # Database access layer
│   ├── openai.ts              # AI/LLM integration
│   └── db.ts                  # Database connection
├── shared/                    # Shared code between client/server
│   └── schema.ts              # Drizzle ORM schema definitions
└── docs/                      # Documentation
```

---

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
- **node-cron** for scheduled jobs

### Integrations
- **Microsoft Graph API** - Calendar, OneDrive, SharePoint, Teams, Outlook, To Do, Presence
- **HubSpot API** - CRM communications
- **OpenAI API** - Meeting summarization, document Q&A, insight generation

---

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

---

## Current Database Schema

### Core Tables
| Table | Purpose |
|-------|---------|
| `users` | User accounts with roles (employee, manager, admin) |
| `documents` | Knowledge hub documents |
| `meetings` | Meeting records with transcripts/summaries |
| `tasks` | Task management |
| `emails` | Synced Outlook emails |
| `activity_logs` | User activity tracking |
| `hubspot_communications` | CRM interactions |

### Microsoft 365 Tables
| Table | Purpose |
|-------|---------|
| `ms_user_profiles` | M365 user profile data with manager reference |
| `ms_calendar_events` | Synced calendar events |
| `ms_event_attendees` | Event attendees |
| `ms_todo_lists` / `ms_todo_tasks` | To Do items |
| `ms_contacts` | Outlook contacts |
| `ms_drive_items` | OneDrive/SharePoint files |
| `ms_chat_threads` / `ms_chat_messages` | Teams chats |
| `ms_presence_snapshots` | Teams presence status |
| `ms_recurrence_patterns` | Recurring event patterns |

### AI Tables
| Table | Purpose |
|-------|---------|
| `ai_action_items` | AI-extracted action items from meetings/emails |
| `ai_reminders` | Scheduled reminders for users |
| `ai_notifications` | User notification delivery |
| `ai_insights` | AI-generated insights and reports |

### Sync Tables
| Table | Purpose |
|-------|---------|
| `user_sync_states` | Per-user sync status with delta tokens |
| `sync_jobs` | Sync operation audit log |

---

## Schema Enhancement Proposals

To fully support the hierarchical reporting vision, the following schema additions are proposed:

### 1. Organizational Hierarchy

```sql
-- Departments with heads
departments (
  id, name, description,
  head_user_id → users.id,    -- Department head
  parent_department_id,        -- For nested departments
  created_at, updated_at
)

-- Teams within departments
teams (
  id, name, description,
  department_id → departments.id,
  manager_id → users.id,       -- Team manager
  created_at, updated_at
)

-- Enhanced users table additions
users (
  + team_id → teams.id,
  + direct_manager_id → users.id,
  + hire_date,
  + job_level                  -- junior, mid, senior, lead, manager, director
)
```

### 2. Performance Metrics System

```sql
-- Configurable KPIs per role/department
performance_metrics (
  id, name, description,
  metric_type,                 -- count, percentage, score, duration
  target_value,                -- Expected target
  unit,                        -- calls, meetings, tasks, hours
  applies_to_role,             -- employee, manager, all
  department_id,               -- Optional: department-specific
  is_active,
  created_at
)

-- Actual metric values per employee per period
employee_metric_values (
  id, user_id → users.id,
  metric_id → performance_metrics.id,
  period_type,                 -- daily, weekly, monthly
  period_start, period_end,
  actual_value,
  target_value,                -- Snapshot of target at time
  achievement_percentage,
  created_at
)

-- Performance review periods
performance_periods (
  id, name,
  period_type,                 -- weekly, monthly, quarterly, annual
  start_date, end_date,
  status,                      -- active, closed, archived
  created_at
)
```

### 3. Follow-up Tracking & Accountability

```sql
-- Expected follow-up actions
follow_ups (
  id,
  source_type,                 -- meeting, call, email, task
  source_id,
  assigned_to_id → users.id,
  assigned_by_id → users.id,
  title, description,
  expected_action,             -- call_back, send_email, schedule_meeting
  due_date,
  status,                      -- pending, completed, overdue, dismissed
  completed_at,
  completion_notes,
  created_at, updated_at
)

-- Follow-up completion evidence
follow_up_completions (
  id,
  follow_up_id → follow_ups.id,
  completed_by_id → users.id,
  evidence_type,               -- email_sent, call_made, meeting_scheduled
  evidence_id,                 -- Reference to the actual action
  notes,
  verified_by_id → users.id,
  verified_at,
  created_at
)
```

### 4. Alert Rules Engine

```sql
-- Configurable alert triggers
alert_rules (
  id, name, description,
  rule_type,                   -- threshold, pattern, schedule, event
  trigger_condition,           -- JSON: {metric, operator, value}
  applies_to_scope,            -- user, team, department, organization
  applies_to_role,             -- employee, manager, department_head, admin
  department_id,               -- Optional: specific department
  notification_channels,       -- ['in_app', 'email', 'teams']
  priority,                    -- low, medium, high, critical
  is_active,
  created_by_id → users.id,
  created_at, updated_at
)

-- Generated alerts from rules
alert_instances (
  id,
  rule_id → alert_rules.id,
  triggered_for_user_id → users.id,
  triggered_by_user_id → users.id,  -- The employee who triggered it
  alert_data,                  -- JSON: context data
  status,                      -- pending, acknowledged, resolved, dismissed
  acknowledged_by_id → users.id,
  acknowledged_at,
  resolved_at,
  resolution_notes,
  created_at
)
```

### 5. Call/Meeting Scoring

```sql
-- Meeting/call effectiveness scores
interaction_scores (
  id,
  interaction_type,            -- meeting, call, presentation
  source_id,                   -- meeting.id or call record id
  user_id → users.id,          -- Who is being scored

  -- AI-generated scores (0-100)
  engagement_score,            -- Participation level
  preparation_score,           -- Was agenda followed, prep evident
  outcome_score,               -- Were objectives met
  follow_through_score,        -- Action items completed
  communication_score,         -- Clarity, professionalism
  overall_score,

  ai_feedback,                 -- Detailed AI analysis
  improvement_suggestions,     -- JSON array
  strengths,                   -- JSON array

  scored_at,
  created_at
)

-- Phone/video call records (separate from meetings)
call_records (
  id,
  user_id → users.id,
  ms_call_id,                  -- Microsoft Graph call ID
  call_type,                   -- inbound, outbound, missed
  participant_type,            -- internal, external, prospect, client
  participant_name,
  participant_contact,         -- phone/email
  started_at, ended_at,
  duration_seconds,
  recording_url,
  transcript,
  summary,                     -- AI-generated
  sentiment,                   -- positive, neutral, negative
  outcome,                     -- successful, callback_needed, no_answer
  hubspot_contact_id,          -- Link to CRM
  created_at
)
```

### 6. Manager Reports & Subscriptions

```sql
-- Aggregated reports for managers
manager_reports (
  id,
  report_type,                 -- daily_digest, weekly_summary, performance_review
  scope,                       -- team, department, organization
  scope_id,                    -- team.id or department.id
  generated_for_id → users.id, -- The manager receiving it
  period_start, period_end,

  report_data,                 -- JSON: full report content
  summary,                     -- Executive summary text
  key_metrics,                 -- JSON: highlighted KPIs
  alerts_summary,              -- JSON: alerts during period
  top_performers,              -- JSON: employee highlights
  attention_needed,            -- JSON: employees needing attention

  generated_at,
  viewed_at,
  created_at
)

-- Report delivery subscriptions
report_subscriptions (
  id,
  user_id → users.id,
  report_type,
  frequency,                   -- daily, weekly, monthly
  delivery_day,                -- 0-6 for weekly, 1-31 for monthly
  delivery_time,               -- HH:MM
  delivery_channels,           -- ['email', 'in_app', 'teams']
  scope,
  scope_id,
  is_active,
  last_delivered_at,
  created_at, updated_at
)
```

---

## AI Alert/Insight System Design

### Role-Based Alert Types

#### For Employees
| Alert Type | Trigger | Priority |
|------------|---------|----------|
| `task_overdue` | Task past due date | High |
| `meeting_followup_due` | Action item from meeting not completed | Medium |
| `upcoming_deadline` | Task due within 24 hours | Medium |
| `missed_followup` | Expected follow-up not performed | High |
| `calendar_conflict` | Double-booked meetings | Medium |
| `unread_priority_email` | High importance email unread > 4 hours | Medium |
| `daily_digest` | Morning summary of day's tasks/meetings | Low |

#### For Managers
| Alert Type | Trigger | Priority |
|------------|---------|----------|
| `team_task_overdue` | Direct report has overdue task | Medium |
| `team_followup_missed` | Direct report missed follow-up | High |
| `performance_drop` | Employee metric below threshold | High |
| `workload_imbalance` | Team member overloaded/underloaded | Medium |
| `attendance_pattern` | Unusual presence patterns | Medium |
| `coaching_opportunity` | Low meeting/call scores | Medium |
| `weekly_team_summary` | Team performance digest | Low |

#### For Department Heads
| Alert Type | Trigger | Priority |
|------------|---------|----------|
| `department_kpi_alert` | Department metric off target | High |
| `escalation_required` | Issue unresolved at manager level | Critical |
| `cross_team_conflict` | Resource/priority conflicts | Medium |
| `headcount_alert` | Unusual turnover/absence patterns | High |
| `budget_impact` | Activities affecting department budget | Medium |
| `monthly_department_report` | Comprehensive department analysis | Low |

### Alert Processing Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Data Sync  │────▶│ Rule Engine │────▶│ AI Analysis │────▶│ Delivery    │
│  (M365)     │     │ Evaluation  │     │ & Scoring   │     │ Service     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                           │                   │
                           ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐
                    │ alert_rules │     │ ai_insights │
                    │ (config)    │     │ (generated) │
                    └─────────────┘     └─────────────┘
```

### Insight Generation Types

| Insight Type | Scope | Frequency | Content |
|--------------|-------|-----------|---------|
| `productivity_report` | User | Weekly | Task completion, meeting efficiency, focus time |
| `workload_analysis` | User/Team | Weekly | Distribution of work, overtime patterns |
| `communication_pattern` | User | Monthly | Email/chat response times, collaboration network |
| `meeting_effectiveness` | User/Team | Weekly | Meeting scores, action item follow-through |
| `performance_trend` | User | Monthly | KPI trends, improvement areas |
| `team_health` | Team | Weekly | Collaboration metrics, workload balance |
| `department_overview` | Department | Monthly | Cross-team metrics, resource utilization |

---

## Feature Implementation Roadmap

### Phase 1: Foundation (Current State Enhancement)
**Goal**: Solidify data collection and basic hierarchy

- [ ] **1.1** Add `departments` and `teams` tables
- [ ] **1.2** Enhance `users` table with team/manager relationships
- [ ] **1.3** Implement department/team management UI (Admin)
- [ ] **1.4** Add user assignment to teams workflow
- [ ] **1.5** Create organizational hierarchy API endpoints

### Phase 2: Follow-up Tracking
**Goal**: Accountability for action items and commitments

- [ ] **2.1** Add `follow_ups` and `follow_up_completions` tables
- [ ] **2.2** AI extraction of follow-ups from meeting transcripts
- [ ] **2.3** AI extraction of follow-ups from emails
- [ ] **2.4** Follow-up dashboard for employees
- [ ] **2.5** Follow-up monitoring for managers
- [ ] **2.6** Overdue follow-up alerts

### Phase 3: Performance Metrics
**Goal**: Quantifiable KPIs across the organization

- [ ] **3.1** Add `performance_metrics` and `employee_metric_values` tables
- [ ] **3.2** Admin UI for defining metrics per role/department
- [ ] **3.3** Automated metric calculation from synced data
- [ ] **3.4** Employee performance dashboard
- [ ] **3.5** Manager team metrics view
- [ ] **3.6** Department head analytics dashboard

### Phase 4: Alert Rules Engine
**Goal**: Configurable, intelligent alerting

- [ ] **4.1** Add `alert_rules` and `alert_instances` tables
- [ ] **4.2** Rule definition UI for admins/managers
- [ ] **4.3** Real-time rule evaluation engine
- [ ] **4.4** Alert notification service (in-app, email, Teams)
- [ ] **4.5** Alert management UI (acknowledge, resolve, dismiss)
- [ ] **4.6** Alert analytics and tuning

### Phase 5: Interaction Scoring
**Goal**: AI-powered quality assessment

- [ ] **5.1** Add `interaction_scores` and `call_records` tables
- [ ] **5.2** Integrate call recording/transcription (Teams)
- [ ] **5.3** AI scoring pipeline for meetings
- [ ] **5.4** AI scoring pipeline for calls
- [ ] **5.5** Score trends and improvement tracking
- [ ] **5.6** Coaching recommendations based on scores

### Phase 6: Manager Reports
**Goal**: Automated intelligence delivery

- [ ] **6.1** Add `manager_reports` and `report_subscriptions` tables
- [ ] **6.2** Daily digest generation for all users
- [ ] **6.3** Weekly team summary for managers
- [ ] **6.4** Monthly department report for department heads
- [ ] **6.5** Report subscription management UI
- [ ] **6.6** Custom report builder

### Phase 7: Advanced AI Features
**Goal**: Predictive and prescriptive insights

- [ ] **7.1** Predictive workload analysis
- [ ] **7.2** Burnout risk detection
- [ ] **7.3** Team collaboration optimization suggestions
- [ ] **7.4** Automated meeting scheduling recommendations
- [ ] **7.5** Career development insights
- [ ] **7.6** Organization-wide trend analysis

---

## API Patterns

### Authentication
All API routes require authentication via `isAuthenticated` middleware:

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
| `/api/ai/action-items` | GET | Get AI-extracted action items |
| `/api/ai/reminders` | GET/POST | Manage reminders |
| `/api/ai/notifications` | GET | Get notifications |
| `/api/ai/insights` | GET | Get AI insights |

---

## Environment Variables

```bash
# Required
DATABASE_URL=           # PostgreSQL connection string
SESSION_SECRET=         # Session encryption key
REPL_ID=               # Replit app ID (for auth)

# Microsoft 365 Integration
AZURE_TENANT_ID=       # Azure AD tenant ID
AZURE_CLIENT_ID=       # Azure AD app client ID
AZURE_CLIENT_SECRET=   # Azure AD app client secret

# AI Features
OPENAI_API_KEY=        # OpenAI API key for AI features

# HubSpot Integration (optional)
HUBSPOT_ACCESS_TOKEN=  # HubSpot API token
```

---

## User Roles & Permissions

| Role | Access Level |
|------|--------------|
| `employee` | Own data, personal dashboard, follow-ups |
| `manager` | + Direct reports data, team analytics, alert management |
| `department_head` | + Department-wide data, cross-team analytics, KPI management |
| `admin` | Full access, system configuration, all users |

---

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

---

## Microsoft Graph Integration

Uses **client credentials flow** for application-level access to all users' data.

### Required Permissions
| Permission | Purpose |
|------------|---------|
| `User.Read.All` | Read user profiles and org hierarchy |
| `Calendars.Read` | Read calendar events |
| `Mail.Read` | Read email messages |
| `Tasks.Read` | Read To Do tasks |
| `Files.Read.All` | Read OneDrive/SharePoint files |
| `Chat.Read.All` | Read Teams chat messages |
| `Presence.Read.All` | Read Teams presence |
| `OnlineMeetings.Read.All` | Read meeting details |
| `CallRecords.Read.All` | Read call records |

---

## Design Guidelines

Follow Microsoft Fluent Design principles (see `design_guidelines.md`):
- **Typography**: Inter font, weights 400-700
- **Spacing**: Tailwind units 3, 4, 6, 8, 12, 16
- **Colors**: Neutral base with semantic status colors
- **Accessibility**: WCAG AA compliant, keyboard navigable

---

## Path Aliases

```typescript
import { something } from "@/components/ui/button";  // client/src/components/ui/button
import { schema } from "@shared/schema";             // shared/schema
```

---

## Component Library

Uses **shadcn/ui** with the **New York** style variant. Components in `client/src/components/ui/`.

```bash
npx shadcn@latest add <component-name>
```
