# API Permissions Quick Reference Guide

## Table of Contents
- [Permission Search](#permission-search)
- [Permissions by Risk Level](#permissions-by-risk-level)
- [Common Use Case Patterns](#common-use-case-patterns)
- [Resource-Specific Permissions](#resource-specific-permissions)
- [Security Checklist](#security-checklist)

## Permission Search

### By Resource Type

#### User & Identity Management
| Permission | Scope | Use Case |
|------------|-------|----------|
| `User.Read.All` | Read all users | Employee directory, org charts |
| `User.ReadWrite.All` | Manage all users | User onboarding, profile updates |
| `User.ReadBasic.All` | Read basic profiles | Simple lookups, autocomplete |
| `User.Invite.All` | Invite guests | External collaboration |
| `UserAuthenticationMethod.ReadWrite.All` | Manage auth methods | MFA setup, security |

#### Email & Communication
| Permission | Scope | Use Case |
|------------|-------|----------|
| `Mail.Read` | Read all mailboxes | Compliance, archival |
| `Mail.ReadWrite` | Manage all mail | Email automation |
| `Mail.Send` | Send as any user | Notifications, alerts |
| `MailboxSettings.ReadWrite` | Mailbox settings | Auto-replies, preferences |
| `Calendars.ReadWrite` | All calendars | Meeting scheduling |

#### Teams & Collaboration
| Permission | Scope | Use Case |
|------------|-------|----------|
| `Team.Create` | Create teams | Team provisioning |
| `Channel.Create` | Create channels | Channel setup |
| `Chat.ReadWrite.All` | All chats | Chatbots, moderation |
| `Chat.Read.All` | Read all chats | Compliance monitoring |
| `TeamsAppInstallation.ReadWrite.All` | Manage app installations | App deployment |

#### Files & SharePoint
| Permission | Scope | Use Case |
|------------|-------|----------|
| `Files.ReadWrite.All` | All files | Document management |
| `Sites.ReadWrite.All` | All sites | Site automation |
| `Sites.FullControl.All` | Full site control | Site provisioning |
| `Files.ReadWrite.AppFolder` | App folder only | App data storage |

#### Security & Compliance
| Permission | Scope | Use Case |
|------------|-------|----------|
| `AuditLog.Read.All` | Read audit logs | Compliance reporting |
| `SecurityIncident.ReadWrite.All` | Manage incidents | Security operations |
| `Policy.ReadWrite.ConditionalAccess` | Conditional access | Security policies |
| `IdentityRiskyUser.ReadWrite.All` | Risk detection | Identity protection |

## Permissions by Risk Level

### Critical Risk ⚠️
**Requires: Multi-level approval, comprehensive logging, regular audits**

- `User.DeleteRestore.All` - Can delete user accounts
- `Mail.ReadWrite` - Full email access and modification
- `Files.ReadWrite.All` - All file access
- `Sites.FullControl.All` - Complete site control
- `Chat.ManageDeletion.All` - Delete conversations
- `Application.ReadWrite.All` - Manage applications
- `Directory.ReadWrite.All` - Directory modifications
- `DeviceManagementManagedDevices.PrivilegedOperations.All` - Device wipe/reset
- `User-PasswordProfile.ReadWrite.All` - Reset passwords

### High Risk ⚡
**Requires: Approval workflow, logging, monitoring**

- `User.ReadWrite.All` - Modify user profiles
- `User.EnableDisableAccount.All` - Enable/disable accounts
- `Mail.Send` - Send email as any user
- `Chat.ReadWrite.All` - Read/write all chats
- `Files.ReadWrite.All` - Read/write all files
- `Sites.ReadWrite.All` - Modify all sites
- `Group.ReadWrite.All` - Manage groups
- `Application.ReadWrite.OwnedBy` - Manage owned apps
- `Policy.ReadWrite.ConditionalAccess` - Security policies

### Medium Risk 🔶
**Requires: Standard access controls, basic logging**

- `User.Read.All` - Read all user profiles
- `Chat.Read.All` - Read all chats
- `Mail.Read` - Read all mail
- `Files.Read.All` - Read all files
- `Team.ReadBasic.All` - List all teams
- `AuditLog.Read.All` - Read audit logs
- `Calendar.Read` - Read calendars
- `Contacts.Read` - Read contacts

### Low Risk ✅
**Requires: Basic access controls**

- `User.ReadBasic.All` - Read basic user info
- `Files.ReadWrite.AppFolder` - App folder only
- `Chat.ReadBasic.All` - Chat names and members
- `Team.Create` - Create teams
- `Channel.Create` - Create channels

## Common Use Case Patterns

### Pattern 1: Employee Onboarding
```
Required Permissions:
✓ User.ReadWrite.All
✓ Group.ReadWrite.All
✓ Mail.Send
✓ Calendars.ReadWrite
✓ TeamsAppInstallation.ReadWrite.All
```

### Pattern 2: Document Management
```
Required Permissions:
✓ Files.ReadWrite.All
✓ Sites.ReadWrite.All
✓ User.Read.All
✓ Group.Read.All
```

### Pattern 3: Security Monitoring
```
Required Permissions:
✓ AuditLog.Read.All
✓ SecurityIncident.ReadWrite.All
✓ IdentityRiskyUser.Read.All
✓ Chat.Read.All
✓ Mail.Read
```

### Pattern 4: Team Collaboration
```
Required Permissions:
✓ Team.Create
✓ Channel.Create
✓ Chat.ReadWrite.All
✓ TeamsAppInstallation.ReadWrite.All
✓ User.Read.All
```

### Pattern 5: Automated Notifications
```
Required Permissions:
✓ Mail.Send
✓ Chat.ReadWrite.All
✓ TeamsActivity.Send
✓ User.Read.All
```

## Resource-Specific Permissions

### Users
```
Basic Access:     User.ReadBasic.All
Standard Access:  User.Read.All
Full Management:  User.ReadWrite.All
Lifecycle:        User.DeleteRestore.All
                  User.EnableDisableAccount.All
Authentication:   UserAuthenticationMethod.ReadWrite.All
Password:         User-PasswordProfile.ReadWrite.All
Sessions:         User.RevokeSessions.All
```

### Mail
```
Read Only:       Mail.Read
Read/Write:      Mail.ReadWrite
Send:            Mail.Send
Settings:        MailboxSettings.ReadWrite
Folders:         MailboxFolder.ReadWrite.All
Import/Export:   MailboxItem.ImportExport.All
```

### Teams & Chat
```
Teams:           Team.Create, Team.ReadBasic.All
Channels:        Channel.Create, Channel.ReadBasic.All
Chat:            Chat.Read.All, Chat.ReadWrite.All
Messages:        ChannelMessage.Read.All
Members:         TeamMember.ReadWrite.All
Apps:            TeamsAppInstallation.ReadWrite.All
```

### Files & Sites
```
Files:           Files.ReadWrite.All
                 Files.ReadWrite.AppFolder
Sites:           Sites.ReadWrite.All
                 Sites.FullControl.All
                 Sites.Manage.All
Lists:           Lists.SelectedOperations.Selected
```

## Security Checklist

### Before Requesting Permissions
- [ ] Document specific use case
- [ ] Identify minimum required permissions
- [ ] Check for less privileged alternatives
- [ ] Plan access control mechanisms
- [ ] Design audit logging strategy

### Implementation
- [ ] Implement least privilege access
- [ ] Add comprehensive logging
- [ ] Set up monitoring alerts
- [ ] Create approval workflows for high-risk operations
- [ ] Implement rate limiting
- [ ] Add error handling
- [ ] Encrypt sensitive data

### Ongoing Maintenance
- [ ] Regular permission audits (quarterly)
- [ ] Review access logs monthly
- [ ] Remove unused permissions
- [ ] Update documentation
- [ ] Security training for developers
- [ ] Incident response procedures
- [ ] Compliance reviews

## Permission Naming Conventions

### Understanding Permission Names

```
{Resource}.{Operation}.{Scope}

Examples:
- User.Read.All          → Read ALL users
- Mail.ReadWrite        → Read/Write mail (limited scope)
- Files.Read.All        → Read ALL files
- Team.Create           → Create teams (no scope = basic)
```

### Common Operations
- **Read** - View data
- **ReadWrite** - View and modify data
- **Manage** - Full control including deletion
- **Create** - Create new items
- **Delete** - Remove items
- **Send** - Send messages/emails

### Common Scopes
- **.All** - Organization-wide access
- **.Selected** - User-selected items only
- **.OwnedBy** - Items owned by the app
- **.WhereInstalled** - Where app is installed

## Quick Troubleshooting

### Permission Denied Errors

**Error:** `Insufficient privileges to complete the operation`

**Solutions:**
1. Verify permission is assigned in Azure AD
2. Check permission type (Delegated vs Application)
3. Ensure admin consent has been granted
4. Wait for permission propagation (up to 30 min)

**Error:** `Access denied`

**Solutions:**
1. Check user has appropriate role
2. Verify conditional access policies
3. Check for IP/location restrictions
4. Review MFA requirements

### Rate Limiting

**Error:** `429 Too Many Requests`

**Solutions:**
1. Implement exponential backoff
2. Use batch requests
3. Cache frequently accessed data
4. Implement request throttling

## Code Examples by Pattern

### Pattern: Reading Data
```javascript
const data = await client
  .api('/resource')
  .select('id,displayName,property1,property2')
  .filter('property eq \'value\'')
  .top(50)
  .orderby('displayName')
  .get();
```

### Pattern: Writing Data
```javascript
const newItem = {
  displayName: 'Item Name',
  property1: 'value1'
};

const created = await client
  .api('/resource')
  .post(newItem);
```

### Pattern: Batch Operations
```javascript
const batch = {
  requests: [
    { id: '1', method: 'GET', url: '/users/user1' },
    { id: '2', method: 'GET', url: '/users/user2' }
  ]
};

const response = await client
  .api('/$batch')
  .post(batch);
```

### Pattern: Error Handling
```javascript
async function safeAPICall(operation) {
  const maxRetries = 3;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (error.statusCode === 429) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
```

## Compliance Requirements

### GDPR
- Right to access: `User.Export.All`, `Mail.Read`
- Right to erasure: `User.DeleteRestore.All`
- Data portability: `*.Export.All` permissions
- Consent management: Document all data access

### HIPAA (Healthcare)
- Audit all access to PHI
- Encrypt data in transit and at rest
- Implement access controls
- Regular security assessments
- Required permissions: `AuditLog.Read.All`

### SOC 2
- Comprehensive logging: `AuditLog.Read.All`
- Access control reviews
- Security monitoring
- Incident response procedures

## Permission Request Template

```markdown
## Permission Request

**Requested By:** [Name]
**Date:** [Date]
**Permission:** [Permission Name]

### Justification
[Why is this permission needed?]

### Use Case
[Specific feature or functionality]

### Scope
[Organization-wide or limited?]

### Risk Assessment
- Risk Level: [Critical/High/Medium/Low]
- Data Access: [What data will be accessed?]
- Mitigation: [How will risks be mitigated?]

### Implementation Plan
- Access Controls: [How will access be controlled?]
- Logging: [What will be logged?]
- Monitoring: [How will usage be monitored?]

### Approval
- Security Review: [ ] Approved [ ] Pending
- Compliance Review: [ ] Approved [ ] Pending
- Manager Approval: [ ] Approved [ ] Pending
```

---

**Last Updated:** 2025-11-23  
**Total Permissions Documented:** 400  
**Categories:** 246  
**Version:** 1.0
