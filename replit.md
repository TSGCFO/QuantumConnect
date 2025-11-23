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

**Schema Design**:
- **Users**: Core authentication table with role-based access (employee/manager/admin), department assignment, and profile metadata
- **Documents**: Knowledge hub storage with category classification (policy/training/operational), file metadata, and search capabilities
- **Tasks**: Task management with assignment, priority, status tracking, and due dates
- **Meetings**: Meeting records with AI-generated summaries and extracted action items
- **Emails**: Synced from Outlook with sender/recipient tracking and read status
- **HubSpot Communications**: CRM communication logs with contact/company associations
- **Activity Logs**: Audit trail capturing user actions, resource access, and IP/user agent data
- **Sessions**: PostgreSQL-backed session storage for authentication persistence

**Migration Strategy**: Drizzle Kit for schema migrations stored in `/migrations` directory.

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