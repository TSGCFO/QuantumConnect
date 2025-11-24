# QuantumConnect - Employee Portal

AI-powered employee portal for 3PL Ontario that integrates document management, task tracking, meeting analysis, and communication logging.

## Documentation

### Microsoft Graph API Permissions

This application uses **97 Microsoft Graph API permissions** to integrate with Microsoft 365 services.

📖 **[Complete Graph API Permissions Documentation](./GRAPH_API_PERMISSIONS.md)**

The documentation includes:
- Detailed description of each permission
- Practical code examples with usage scenarios
- Security and compliance considerations
- Risk-based classification (High 🔴, Medium 🟡, Low 🟢)
- Best practices for permission management
- Compliance framework mappings (SOC 2, ISO 27001, GDPR, HIPAA)

### Quick Links

- **[Permission Statistics](./GRAPH_API_PERMISSIONS.md#permission-statistics)** - Overview of all 97 permissions by type and risk level
- **[Quick Reference](./GRAPH_API_PERMISSIONS.md#quick-reference)** - Alphabetical list with risk indicators
- **[Security Guidelines](./GRAPH_API_PERMISSIONS.md#security-guidelines)** - Risk-based access control and monitoring
- **[Best Practices](./GRAPH_API_PERMISSIONS.md#best-practices)** - Application development and permission management
- **[Compliance Frameworks](./GRAPH_API_PERMISSIONS.md#compliance-frameworks)** - SOC 2, ISO 27001, GDPR, HIPAA

### High-Level Permission Categories

The application has permissions across **79 categories**, including:

#### Core Access & Identity (High Risk 🔴)
- User management and profiles
- Role and policy administration
- Conditional access policies
- Domain management

#### Communication & Collaboration
- Mail access (read/write)
- Teams meetings and channels
- Chat and presence
- Calendar and bookings

#### Data & Files
- OneDrive and SharePoint access
- Document management
- File ingestion and search

#### Compliance & Security
- Audit log queries
- Risk detection
- Security alerts
- Access reviews

## Architecture

For detailed architecture information, see:
- **[System Architecture](./replit.md#system-architecture)** - Frontend, backend, and data storage
- **[Design Guidelines](./design_guidelines.md)** - UI/UX design principles

## Security & Compliance

### Permission Management

All Graph API permissions are:
- ✅ Documented with usage examples
- ✅ Classified by risk level
- ✅ Subject to regular review
- ✅ Monitored for unusual activity
- ✅ Aligned with compliance requirements

### Security Contacts

- **Security Team:** security@company.com
- **IT Support:** itsupport@company.com
- **Compliance:** compliance@company.com

## Development

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database migrations
npm run db:push
```

## Technology Stack

- **Frontend:** React + TypeScript + Vite
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL (Neon serverless) + Drizzle ORM
- **Authentication:** Replit Auth (OIDC)
- **Integrations:** 
  - Microsoft Graph API (Office 365, OneDrive, SharePoint)
  - HubSpot API (CRM)
  - OpenAI GPT-5 (AI features)

## Project Structure

```
├── client/               # React frontend application
├── server/              # Express backend server
├── shared/              # Shared types and utilities
├── AssignedGraphPermissions.txt  # Raw permissions data
├── GRAPH_API_PERMISSIONS.md      # Comprehensive permissions documentation
├── design_guidelines.md          # UI/UX design system
└── replit.md                     # Detailed system architecture
```

## License

MIT

---

**For detailed Microsoft Graph API permission documentation, see [GRAPH_API_PERMISSIONS.md](./GRAPH_API_PERMISSIONS.md)**
