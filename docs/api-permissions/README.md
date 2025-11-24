# Microsoft Graph API Permissions Documentation

## Overview

This documentation provides comprehensive information about all **400 Microsoft Graph API permissions** assigned to the Employee Portal application. These permissions enable the application to interact with Microsoft 365 services on behalf of the organization.

**App Name:** employee portal  
**App ID:** bc9aec39-5f2a-4808-9738-959f655c4306  
**Total Permissions:** 400  
**Total Categories:** 246  
**Last Updated:** 2025-11-23

## Table of Contents

- [Understanding Permission Types](#understanding-permission-types)
- [Security Best Practices](#security-best-practices)
- [Permission Categories](#permission-categories)
- [Quick Reference](#quick-reference)
- [Usage Examples](#usage-examples)

## Understanding Permission Types

Microsoft Graph API permissions are categorized by their scope and access level:

### By Scope
- **ReadWrite.All** (153 permissions): Full control with organization-wide scope
- **Read.All** (66 permissions): Read-only access with organization-wide scope
- **ReadWrite** (45 permissions): Full control with limited scope
- **Read** (16 permissions): Read-only with limited scope
- **Other** (78 permissions): Specialized permissions (Send, Manage, Create, Delete, etc.)

### Permission Naming Convention

Permission names follow a consistent pattern:
```
{ResourceType}.{Operation}.{Scope}
```

**Examples:**
- `User.Read.All` - Read all users in the organization
- `Mail.ReadWrite` - Read and write mail in all mailboxes
- `Team.Create` - Create teams
- `Files.ReadWrite.All` - Read and write all files

## Security Best Practices

### 1. Principle of Least Privilege
Only request permissions that are absolutely necessary for your application's functionality.

### 2. Regular Audits
Periodically review and remove unused permissions to minimize security risks.

### 3. Sensitive Permissions
Be especially careful with permissions that:
- Allow deletion of data
- Access sensitive user information (passwords, authentication methods)
- Modify security settings
- Perform privileged operations

### 4. Monitoring and Logging
Implement comprehensive logging for all actions performed using these permissions.

### 5. User Consent
For delegated permissions, ensure users understand what access they're granting.

## Permission Categories

Permissions are organized into 246 categories. Here are the major categories:

### Top Categories by Permission Count

1. **[TeamsAppInstallation](./categories/teams-app-installation.md)** - 25 permissions
2. **[Policy](./categories/policy.md)** - 23 permissions
3. **[User](./categories/user.md)** - 11 permissions
4. **[TeamsTab](./categories/teams-tab.md)** - 9 permissions
5. **[Chat](./categories/chat.md)** - 9 permissions
6. **[RoleManagement](./categories/role-management.md)** - 7 permissions
7. **[Sites](./categories/sites.md)** - 6 permissions
8. **[Calls](./categories/calls.md)** - 5 permissions

### All Categories (Alphabetical)

<details>
<summary>Click to expand all categories</summary>

- [AccessReview](./categories/access-review.md) - 2 permissions
- [Acronym](./categories/acronym.md) - 1 permission
- [AdministrativeUnit](./categories/administrative-unit.md) - 1 permission
- [AgentCard](./categories/agent-card.md) - 2 permissions
- [AgentCardManifest](./categories/agent-card-manifest.md) - 2 permissions
- [AgentCollection](./categories/agent-collection.md) - 2 permissions
- [AgentInstance](./categories/agent-instance.md) - 2 permissions
- [AiEnterpriseInteraction](./categories/ai-enterprise-interaction.md) - 1 permission
- [APIConnectors](./categories/api-connectors.md) - 1 permission
- [AppCatalog](./categories/app-catalog.md) - 1 permission
- [Application](./categories/application.md) - 3 permissions
- [Application-RemoteDesktopConfig](./categories/application-remote-desktop-config.md) - 1 permission
- [AppRoleAssignment](./categories/app-role-assignment.md) - 1 permission
- [ApprovalSolution](./categories/approval-solution.md) - 1 permission
- [AuditActivity](./categories/audit-activity.md) - 2 permissions
- [AuditLog](./categories/audit-log.md) - 1 permission
- [AuditLogsQuery](./categories/audit-logs-query.md) - 7 permissions
- [AuthenticationContext](./categories/authentication-context.md) - 1 permission
- [BackupRestore](./categories/backup-restore.md) - 4 permissions
- [Bookings](./categories/bookings.md) - 3 permissions
- [Bookmark](./categories/bookmark.md) - 1 permission
- [BrowserSiteLists](./categories/browser-site-lists.md) - 1 permission
- [BusinessScenario](./categories/business-scenario.md) - 2 permissions
- [Calendars](./categories/calendars.md) - 1 permission
- [Calls](./categories/calls.md) - 5 permissions
- [CallRecords](./categories/call-records.md) - 5 permissions
- [Channel](./categories/channel.md) - 3 permissions
- [Chat](./categories/chat.md) - 9 permissions
- [Community](./categories/community.md) - 1 permission
- [ConfigurationMonitoring](./categories/configuration-monitoring.md) - 1 permission
- [ConsentRequest](./categories/consent-request.md) - 1 permission
- [Contacts](./categories/contacts.md) - 2 permissions
- [Content](./categories/content.md) - 2 permissions
- [ContentActivity](./categories/content-activity.md) - 2 permissions
- [CrossTenantInformation](./categories/cross-tenant-information.md) - 1 permission
- [CustomAuthenticationExtension](./categories/custom-authentication-extension.md) - 2 permissions
- [CustomDetection](./categories/custom-detection.md) - 1 permission
- [CustomSecAttribute](./categories/custom-sec-attribute.md) - 4 permissions
- [CustomTags](./categories/custom-tags.md) - 1 permission
- [DelegatedAdminRelationship](./categories/delegated-admin-relationship.md) - 1 permission
- [DelegatedPermissionGrant](./categories/delegated-permission-grant.md) - 1 permission
- [Device](./categories/device.md) - 1 permission
- [DeviceManagement](./categories/device-management.md) - 6 permissions
- [DeviceTemplate](./categories/device-template.md) - 2 permissions
- [Directory](./categories/directory.md) - 1 permission
- [Domain](./categories/domain.md) - 2 permissions
- [eDiscovery](./categories/ediscovery.md) - 1 permission
- [Engagement](./categories/engagement.md) - 5 permissions
- [EntitlementManagement](./categories/entitlement-management.md) - 1 permission
- [EventListener](./categories/event-listener.md) - 1 permission
- [ExternalConnection](./categories/external-connection.md) - 2 permissions
- [ExternalItem](./categories/external-item.md) - 2 permissions
- [Files](./categories/files.md) - 3 permissions
- [FileStorage](./categories/file-storage.md) - 2 permissions
- [Group](./categories/group.md) - 5 permissions
- [HealthMonitoring](./categories/health-monitoring.md) - 2 permissions
- [IdentityRisk](./categories/identity-risk.md) - 3 permissions
- [IdentityUserFlow](./categories/identity-user-flow.md) - 1 permission
- [IndustryData](./categories/industry-data.md) - 9 permissions
- [InformationProtectionPolicy](./categories/information-protection-policy.md) - 1 permission
- [Insights](./categories/insights.md) - 1 permission
- [Learning](./categories/learning.md) - 2 permissions
- [LifecycleWorkflows](./categories/lifecycle-workflows.md) - 6 permissions
- [Mail](./categories/mail.md) - 8 permissions
- [Member](./categories/member.md) - 1 permission
- [MultiTenantOrganization](./categories/multi-tenant-organization.md) - 1 permission
- [NetworkAccess](./categories/network-access.md) - 2 permissions
- [Notes](./categories/notes.md) - 1 permission
- [OnlineMeeting](./categories/online-meeting.md) - 5 permissions
- [OnPremises](./categories/on-premises.md) - 2 permissions
- [Organization](./categories/organization.md) - 2 permissions
- [OrgSettings](./categories/org-settings.md) - 5 permissions
- [People](./categories/people.md) - 2 permissions
- [Place](./categories/place.md) - 3 permissions
- [Policy](./categories/policy.md) - 23 permissions
- [Presence](./categories/presence.md) - 1 permission
- [PrivilegedAccess](./categories/privileged-access.md) - 1 permission
- [ProgramControl](./categories/program-control.md) - 1 permission
- [ProtectionScopes](./categories/protection-scopes.md) - 2 permissions
- [ProvisioningLog](./categories/provisioning-log.md) - 1 permission
- [PublicKeyInfrastructure](./categories/public-key-infrastructure.md) - 1 permission
- [QnA](./categories/qna.md) - 1 permission
- [RealTimeActivityFeed](./categories/real-time-activity-feed.md) - 1 permission
- [RecordsManagement](./categories/records-management.md) - 1 permission
- [Reports](./categories/reports.md) - 2 permissions
- [ResourceSpecificPermissionGrant](./categories/resource-specific-permission-grant.md) - 3 permissions
- [RiskPreventionProviders](./categories/risk-prevention-providers.md) - 1 permission
- [RoleManagement](./categories/role-management.md) - 7 permissions
- [Schedule](./categories/schedule.md) - 3 permissions
- [SearchConfiguration](./categories/search-configuration.md) - 1 permission
- [Security](./categories/security.md) - 2 permissions
- [SensitivityLabel](./categories/sensitivity-label.md) - 2 permissions
- [ServiceActivity](./categories/service-activity.md) - 4 permissions
- [ServiceHealth](./categories/service-health.md) - 2 permissions
- [ServicePrincipalEndpoint](./categories/service-principal-endpoint.md) - 1 permission
- [SharePoint](./categories/sharepoint.md) - 3 permissions
- [ShortNotes](./categories/short-notes.md) - 1 permission
- [SignInIdentifier](./categories/sign-in-identifier.md) - 1 permission
- [Sites](./categories/sites.md) - 6 permissions
- [SpiffeTrustDomain](./categories/spiffe-trust-domain.md) - 1 permission
- [Storyline](./categories/storyline.md) - 1 permission
- [SubjectRightsRequest](./categories/subject-rights-request.md) - 1 permission
- [Synchronization](./categories/synchronization.md) - 3 permissions
- [Tasks](./categories/tasks.md) - 1 permission
- [Team](./categories/team.md) - 2 permissions
- [TeamsActivity](./categories/teams-activity.md) - 2 permissions
- [TeamsAppInstallation](./categories/teams-app-installation.md) - 25 permissions
- [TeamsSettings](./categories/teams-settings.md) - 2 permissions
- [TeamsTab](./categories/teams-tab.md) - 9 permissions
- [Teamwork](./categories/teamwork.md) - 4 permissions
- [User](./categories/user.md) - 11 permissions
- [UserAuthMethod](./categories/user-auth-method.md) - 9 permissions
- [UserNotification](./categories/user-notification.md) - 1 permission
- [UserShiftPreferences](./categories/user-shift-preferences.md) - 1 permission
- [VirtualAppointment](./categories/virtual-appointment.md) - 2 permissions
- [VirtualEvent](./categories/virtual-event.md) - 2 permissions
- [WindowsUpdates](./categories/windows-updates.md) - 1 permission
- [WorkforceIntegration](./categories/workforce-integration.md) - 1 permission

</details>

## Quick Reference

### Most Commonly Used Permissions

#### User Management
```
User.Read.All                    - Read all user profiles
User.ReadWrite.All               - Read and write all user profiles
User.Invite.All                  - Invite guest users
UserAuthenticationMethod.ReadWrite.All - Manage user authentication methods
```

#### Mail Operations
```
Mail.Read                        - Read mail in all mailboxes
Mail.ReadWrite                   - Read and write mail
Mail.Send                        - Send mail as any user
MailboxSettings.ReadWrite        - Read and write mailbox settings
```

#### Calendar Management
```
Calendars.ReadWrite              - Read and write calendars in all mailboxes
```

#### Teams & Collaboration
```
Team.Create                      - Create teams
Channel.Create                   - Create channels
Chat.ReadWrite.All              - Read and write all chat messages
TeamsAppInstallation.ReadWrite.All - Manage Teams app installations
```

#### Files & SharePoint
```
Files.ReadWrite.All             - Read and write all files
Sites.ReadWrite.All             - Read and write items in all site collections
Sites.FullControl.All           - Full control of all site collections
```

#### Security & Compliance
```
AuditLog.Read.All               - Read audit log data
SecurityIncident.ReadWrite.All  - Read and write security incidents
Policy.ReadWrite.ConditionalAccess - Read and write conditional access policies
```

## Usage Examples

### Example 1: Reading User Information

**Permission Required:** `User.Read.All`

```javascript
import { Client } from '@microsoft/microsoft-graph-client';

// Initialize Graph client
const client = Client.init({
  authProvider: (done) => {
    done(null, accessToken);
  }
});

// Read user information
async function getUserInfo(userId) {
  try {
    const user = await client
      .api(`/users/${userId}`)
      .select('displayName,mail,jobTitle,department')
      .get();
    
    console.log(`User: ${user.displayName}`);
    console.log(`Email: ${user.mail}`);
    console.log(`Job Title: ${user.jobTitle}`);
    
    return user;
  } catch (error) {
    console.error('Error reading user:', error);
    throw error;
  }
}
```

### Example 2: Sending Email

**Permission Required:** `Mail.Send`

```javascript
async function sendEmail(subject, body, recipients) {
  const message = {
    subject: subject,
    body: {
      contentType: 'HTML',
      content: body
    },
    toRecipients: recipients.map(email => ({
      emailAddress: { address: email }
    }))
  };

  try {
    await client
      .api('/me/sendMail')
      .post({ message: message });
    
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
```

### Example 3: Creating a Team

**Permission Required:** `Team.Create`

```javascript
async function createTeam(displayName, description) {
  const team = {
    'template@odata.bind': 'https://graph.microsoft.com/v1.0/teamsTemplates(\'standard\')',
    displayName: displayName,
    description: description,
    members: [
      {
        '@odata.type': '#microsoft.graph.aadUserConversationMember',
        roles: ['owner'],
        'user@odata.bind': `https://graph.microsoft.com/v1.0/users('user-id')`
      }
    ]
  };

  try {
    const newTeam = await client
      .api('/teams')
      .post(team);
    
    console.log(`Team created with ID: ${newTeam.id}`);
    return newTeam;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}
```

### Example 4: Reading Files from SharePoint

**Permission Required:** `Files.Read.All` or `Sites.Read.All`

```javascript
async function listDriveItems(driveId) {
  try {
    const items = await client
      .api(`/drives/${driveId}/root/children`)
      .select('name,size,lastModifiedDateTime')
      .top(50)
      .get();
    
    items.value.forEach(item => {
      console.log(`File: ${item.name} (${item.size} bytes)`);
    });
    
    return items.value;
  } catch (error) {
    console.error('Error reading files:', error);
    throw error;
  }
}
```

### Example 5: Managing Calendar Events

**Permission Required:** `Calendars.ReadWrite`

```javascript
async function createCalendarEvent(subject, startTime, endTime, attendees) {
  const event = {
    subject: subject,
    start: {
      dateTime: startTime,
      timeZone: 'Pacific Standard Time'
    },
    end: {
      dateTime: endTime,
      timeZone: 'Pacific Standard Time'
    },
    attendees: attendees.map(email => ({
      emailAddress: {
        address: email
      },
      type: 'required'
    }))
  };

  try {
    const newEvent = await client
      .api('/me/calendar/events')
      .post(event);
    
    console.log(`Event created: ${newEvent.id}`);
    return newEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}
```

## Permission Request Template

When requesting new permissions, use this template:

```
Permission Name: [e.g., User.Read.All]
Justification: [Why is this permission needed?]
Use Case: [Specific feature or functionality]
Scope: [Organization-wide or limited?]
Security Review: [Completed/Pending]
Alternative Considered: [Less privileged alternatives]
```

## Related Documentation

- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Permission Types Overview](https://learn.microsoft.com/en-us/graph/auth/auth-concepts)
- [Best Practices for Graph API](https://learn.microsoft.com/en-us/graph/best-practices-concept)
- [Security Considerations](https://learn.microsoft.com/en-us/graph/security-authorization)

## Support and Updates

For questions or issues related to API permissions:
1. Check the specific category documentation
2. Review Microsoft Graph documentation
3. Contact the IT security team for permission changes
4. Submit a ticket for access issues

---

**Last Updated:** 2025-11-23  
**Documentation Version:** 1.0  
**App Version:** employee portal v1.0
