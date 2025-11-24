# Microsoft Graph API Permissions Documentation

## Overview

This document provides **comprehensive and detailed documentation** for all **97 Microsoft Graph API permissions** assigned to the **employee portal** application. Each permission includes detailed descriptions, practical code examples, common use cases, and security considerations.

**App Name:** employee portal  
**App ID:** bc9aec39-5f2a-4808-9738-959f655c4306  
**Total Permissions:** 97  
**Categories:** 79  
**Documentation Generated:** November 24, 2025

## Table of Contents

- [Overview](#overview)
- [Permission Statistics](#permission-statistics)
- [Quick Reference](#quick-reference)
- [Security Guidelines](#security-guidelines)
- [Detailed Permissions](#detailed-permissions)
  
  - [APIConnectors](#apiconnectors)
  - [AccessReview](#accessreview)
  - [Acronym](#acronym)
  - [AgentCardManifest](#agentcardmanifest)
  - [Application-RemoteDesktopConfig](#application-remotedesktopconfig)
  - [AuditLogsQuery-Exchange](#auditlogsquery-exchange)
  - [BackupRestore-Monitor](#backuprestore-monitor)
  - [Bookings](#bookings)
  - [Bookmark](#bookmark)
  - [BusinessScenarioData](#businessscenariodata)
  - [CallAiInsights](#callaiinsights)
  - [Calls](#calls)
  - [Channel](#channel)
  - [Chat](#chat)
  - [Community](#community)
  - [Contacts-OnPremisesSyncBehavior](#contacts-onpremisessyncbehavior)
  - [CustomAuthenticationExtension](#customauthenticationextension)
  - [CustomSecAttributeDefinition](#customsecattributedefinition)
  - [CustomTags](#customtags)
  - [Device](#device)
  - [DeviceTemplate](#devicetemplate)
  - [DirectoryRecommendations](#directoryrecommendations)
  - [Domain](#domain)
  - [ExternalConnection](#externalconnection)
  - [ExternalItem](#externalitem)
  - [FileIngestion](#fileingestion)
  - [FileIngestionHybridOnboarding](#fileingestionhybridonboarding)
  - [Files](#files)
  - [Group-Conversation](#group-conversation)
  - [Group-OnPremisesSyncBehavior](#group-onpremisessyncbehavior)
  - [IdentityRiskEvent](#identityriskevent)
  - [IdentityUserFlow](#identityuserflow)
  - [IndustryData-DataConnector](#industrydata-dataconnector)
  - [IndustryData-InboundFlow](#industrydata-inboundflow)
  - [IndustryData-Run](#industrydata-run)
  - [Mail](#mail)
  - [MultiTenantOrganization](#multitenantorganization)
  - [OnlineMeetingAiInsight](#onlinemeetingaiinsight)
  - [OnlineMeetingArtifact](#onlinemeetingartifact)
  - [OnlineMeetings](#onlinemeetings)
  - [OrgContact](#orgcontact)
  - [OrgSettings-DynamicsVoice](#orgsettings-dynamicsvoice)
  - [OrgSettings-Microsoft365Install](#orgsettings-microsoft365install)
  - [Place](#place)
  - [PlaceDevice](#placedevice)
  - [Policy](#policy)
  - [Presence](#presence)
  - [ProtectionScopes](#protectionscopes)
  - [PublicKeyInfrastructure](#publickeyinfrastructure)
  - [RealTimeActivityFeed](#realtimeactivityfeed)
  - [RoleAssignmentSchedule](#roleassignmentschedule)
  - [RoleEligibilitySchedule](#roleeligibilityschedule)
  - [RoleManagement](#rolemanagement)
  - [RoleManagementAlert](#rolemanagementalert)
  - [RoleManagementPolicy](#rolemanagementpolicy)
  - [Schedule](#schedule)
  - [SchedulePermissions](#schedulepermissions)
  - [SecurityIdentitiesUserActions](#securityidentitiesuseractions)
  - [ServiceActivity-Exchange](#serviceactivity-exchange)
  - [ServiceActivity-Microsoft365Web](#serviceactivity-microsoft365web)
  - [ServiceActivity-Teams](#serviceactivity-teams)
  - [SharePointTenantSettings](#sharepointtenantsettings)
  - [Sites](#sites)
  - [SynchronizationData-User](#synchronizationdata-user)
  - [TeamMember](#teammember)
  - [TeamSettings](#teamsettings)
  - [TeamsActivity](#teamsactivity)
  - [TeamsAppInstallation](#teamsappinstallation)
  - [TeamsResourceAccount](#teamsresourceaccount)
  - [TeamsTab](#teamstab)
  - [TeamsTelephoneNumber](#teamstelephonenumber)
  - [Teamwork](#teamwork)
  - [User](#user)
  - [User-Mail](#user-mail)
  - [User-OnPremisesSyncBehavior](#user-onpremisessyncbehavior)
  - [User-Phone](#user-phone)
  - [UserAuthMethod-External](#userauthmethod-external)
  - [VirtualAppointmentNotification](#virtualappointmentnotification)
  - [WorkforceIntegration](#workforceintegration)
- [Best Practices](#best-practices)
- [Compliance Frameworks](#compliance-frameworks)

---

## Permission Statistics

### By Permission Scope

| Permission Type | Count | Risk Level | Description |
|----------------|-------|-----------|-------------|
| ReadWrite.All | 36 | High | Full control with organization-wide scope |
| Read.All | 17 | Medium | Read-only with organization-wide scope |
| ReadWrite (Limited) | 20 | Medium | Full control with limited scope |
| Read (Limited) | 8 | Low | Read-only with limited scope |
| Specialized | 16 | Varies | Special purpose permissions |
| **Total** | **97** | | |

### Permission Distribution

1. **Policy** - 10 permissions
2. **TeamsAppInstallation** - 4 permissions
3. **User** - 3 permissions
4. **Bookings** - 2 permissions
5. **RoleManagement** - 2 permissions
6. **TeamsTab** - 2 permissions
7. **TeamsTelephoneNumber** - 2 permissions
8. **AccessReview** - 1 permission
9. **Acronym** - 1 permission
10. **AgentCardManifest** - 1 permission


---

## Quick Reference

### High-Privilege Permissions ⚠️

These permissions require extra scrutiny and monitoring:

- `Device.ReadWrite.All` - Read and write devices
- `Domain.ReadWrite.All` - Read and write domains
- `Mail.ReadWrite` - Read and write mail in all mailboxes
- `PlaceDevice.ReadWrite.All` - Read and write all workplace devices
- `Policy.ReadWrite.ConditionalAccess` - Read and write your organization's conditional access policies
- `RoleAssignmentSchedule.Remove.Directory` - Delete all active role assignments of your company's directory
- `RoleEligibilitySchedule.ReadWrite.Directory` - Read, update, and delete all eligible role assignments and schedules for your company's directory
- `User.ReadWrite.All` - Read and write all users' full profiles
- `User-Mail.ReadWrite.All` - Read and write all secondary mail addresses for users


### All Permissions (Alphabetical)

- 🔴 High | `APIConnectors.ReadWrite.All` - Read and write API connectors for authentication flows
- 🟡 Medium | `AccessReview.ReadWrite.Membership` - Manage access reviews for group and app memberships
- 🟢 Low | `Acronym.Read.All` - Read all acronyms
- 🔴 High | `AgentCardManifest.ReadWrite.All` - Read and write all agent card manifests in Agent Registry
- 🔴 High | `Application-RemoteDesktopConfig.ReadWrite.All` - Read and write the remote desktop security configuration for all apps
- 🟢 Low | `AuditLogsQuery-Exchange.Read.All` - Read audit logs data from Exchange workload
- 🟢 Low | `BackupRestore-Monitor.Read.All` - Read all monitoring, quota and billing information for the tenant
- 🟢 Low | `Bookings.Manage.All` - Manage bookings information
- 🔴 High | `Bookings.ReadWrite.All` - Read and write bookings information
- 🟢 Low | `Bookmark.Read.All` - Read all bookmarks
- 🟡 Medium | `BusinessScenarioData.ReadWrite.OwnedBy` - Read and write data for all business scenarios this app creates or owns
- 🟢 Low | `CallAiInsights.Read.All` - Read all AI Insights for calls.
- 🟢 Low | `Calls.JoinGroupCall.All` - Join group calls and meetings as an app
- 🟢 Low | `Channel.Delete.All` - Delete channels
- 🟢 Low | `Chat.UpdatePolicyViolation.All` - Flag chat messages for violating policy
- 🔴 High | `Community.ReadWrite.All` - Read and write all Viva Engage communities
- 🔴 High | `Contacts-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of contacts
- 🟢 Low | `CustomAuthenticationExtension.Receive.Payload` - Receive custom authentication extension HTTP requests
- 🔴 High | `CustomSecAttributeDefinition.ReadWrite.All` - Read and write custom security attribute definitions
- 🔴 High | `CustomTags.ReadWrite.All` - Read and write custom tags data
- 🔴 High | `Device.ReadWrite.All` - Read and write devices
- 🟢 Low | `DeviceTemplate.Create` - Create device template
- 🔴 High | `DirectoryRecommendations.ReadWrite.All` - Read and update all Azure AD recommendations
- 🔴 High | `Domain.ReadWrite.All` - Read and write domains
- 🟡 Medium | `ExternalConnection.ReadWrite.OwnedBy` - Read and write external connections
- 🟡 Medium | `ExternalItem.ReadWrite.OwnedBy` - Read and write external items
- 🟢 Low | `FileIngestion.Ingest` - Ingest SharePoint and OneDrive content to make it available in the search index
- 🟢 Low | `FileIngestionHybridOnboarding.Manage` - Manage onboarding for a Hybrid Cloud tenant
- 🟡 Medium | `Files.ReadWrite.AppFolder` - Have full access to the application's folder without a signed in user.
- 🔴 High | `Group-Conversation.ReadWrite.All` - Read and write all group conversations
- 🔴 High | `Group-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of groups
- 🔴 High | `IdentityRiskEvent.ReadWrite.All` - Read and write all risk detection information
- 🔴 High | `IdentityUserFlow.ReadWrite.All` - Read and write all identity user flows
- 🔴 High | `IndustryData-DataConnector.ReadWrite.All` - Manage data connector definitions
- 🔴 High | `IndustryData-InboundFlow.ReadWrite.All` - Manage inbound flow definitions
- 🟢 Low | `IndustryData-Run.Read.All` - View current and previous runs
- 🟡 Medium | `Mail.ReadWrite` - Read and write mail in all mailboxes
- 🔴 High | `MultiTenantOrganization.ReadWrite.All` - Read and write all multi-tenant organization details and tenants
- 🟢 Low | `OnlineMeetingAiInsight.Read.Chat` - Read all AI Insights for online meetings where the Teams application is installed.
- 🟢 Low | `OnlineMeetingArtifact.Read.All` - Read online meeting artifacts
- 🔴 High | `OnlineMeetings.ReadWrite.All` - Read and create online meetings
- 🟢 Low | `OrgContact.Read.All` - Read organizational contacts
- 🔴 High | `OrgSettings-DynamicsVoice.ReadWrite.All` - Read and write organization-wide Dynamics customer voice settings
- 🔴 High | `OrgSettings-Microsoft365Install.ReadWrite.All` - Read and write organization-wide Microsoft 365 apps installation settings
- 🟢 Low | `Place.Read.All` - Read all company places
- 🔴 High | `PlaceDevice.ReadWrite.All` - Read and write all workplace devices
- 🟢 Low | `Policy.Read.AuthenticationMethod` - Read authentication method policies
- 🟢 Low | `Policy.Read.ConditionalAccess` - Read your organization's conditional access policies
- 🟢 Low | `Policy.Read.DeviceConfiguration` - Read your organization's device configuration policies
- 🟢 Low | `Policy.Read.PermissionGrant` - Read consent and permission grant policies
- 🟡 Medium | `Policy.ReadWrite.AuthenticationFlows` - Read and write authentication flow policies
- 🟡 Medium | `Policy.ReadWrite.AuthenticationMethod` - Read and write all authentication method policies
- 🟡 Medium | `Policy.ReadWrite.ConditionalAccess` - Read and write your organization's conditional access policies
- 🟡 Medium | `Policy.ReadWrite.FedTokenValidation` - Read and write your organization's federated token validation policy
- 🟡 Medium | `Policy.ReadWrite.IdentityProtection` - Read and write your organization’s identity protection policy
- 🟡 Medium | `Policy.ReadWrite.PermissionGrant` - Manage consent and permission grant policies
- 🔴 High | `Presence.ReadWrite.All` - Read and write presence information for all users
- 🟢 Low | `ProtectionScopes.Compute.All` - Compute Purview policies at tenant scope
- 🔴 High | `PublicKeyInfrastructure.ReadWrite.All` - Read and write all certificate based authentication configurations
- 🟢 Low | `RealTimeActivityFeed.Read.All` - Access real-time enriched data in a meeting as an app
- 🟢 Low | `RoleAssignmentSchedule.Remove.Directory` - Delete all active role assignments of your company's directory
- 🟡 Medium | `RoleEligibilitySchedule.ReadWrite.Directory` - Read, update, and delete all eligible role assignments and schedules for your company's directory
- 🟡 Medium | `RoleManagement.ReadWrite.Defender` - Read M365 Defender RBAC configuration
- 🟡 Medium | `RoleManagement.ReadWrite.Exchange` - Read and write Exchange Online RBAC configuration
- 🟡 Medium | `RoleManagementAlert.ReadWrite.Directory` - Read all alert data, configure alerts, and take actions on all alerts for your company's directory
- 🟡 Medium | `RoleManagementPolicy.ReadWrite.Directory` - Read, update, and delete all policies for privileged role assignments of your company's directory
- 🔴 High | `Schedule.ReadWrite.All` - Read and write all schedule items
- 🔴 High | `SchedulePermissions.ReadWrite.All` - Read/Write schedule permissions for a role
- 🔴 High | `SecurityIdentitiesUserActions.ReadWrite.All` - Read and perform all identity security available user actions
- 🟢 Low | `ServiceActivity-Exchange.Read.All` - Read all Exchange service activity
- 🟢 Low | `ServiceActivity-Microsoft365Web.Read.All` - Read all Microsoft 365 Web service activity
- 🟢 Low | `ServiceActivity-Teams.Read.All` - Read all Teams service activity
- 🔴 High | `SharePointTenantSettings.ReadWrite.All` - Read and change SharePoint and OneDrive tenant settings
- 🟢 Low | `Sites.Selected` - Access selected site collections
- 🟢 Low | `SynchronizationData-User.Upload` - Upload user data to the identity synchronization service
- 🟡 Medium | `TeamMember.ReadWriteNonOwnerRole.All` - Add and remove members with non-owner role for all teams
- 🔴 High | `TeamSettings.ReadWrite.All` - Read and change all teams' settings
- 🟢 Low | `TeamsActivity.Read.All` - Read all users' teamwork activity feed
- 🟢 Low | `TeamsAppInstallation.ManageSelectedForUser.All` - Manage installation and permission grants of selected Teams apps for all user accounts
- 🟢 Low | `TeamsAppInstallation.ReadForChat.All` - Read installed Teams apps for all chats
- 🟢 Low | `TeamsAppInstallation.ReadForUser.All` - Read installed Teams apps for all users
- 🟡 Medium | `TeamsAppInstallation.ReadWriteAndConsentSelfForChat.All` - Allow the Teams app to manage itself and its permission grants for all chats
- 🟢 Low | `TeamsResourceAccount.Read.All` - Read Teams resource accounts
- 🟢 Low | `TeamsTab.Read.All` - Read tabs in Microsoft Teams.
- 🟡 Medium | `TeamsTab.ReadWriteForChat.All` - Allow the Teams app to manage all tabs for all chats
- 🟢 Low | `TeamsTelephoneNumber.Read.All` - Read Tenant-Acquired Telephone Number Details
- 🔴 High | `TeamsTelephoneNumber.ReadWrite.All` - Read and Modify Tenant-Acquired Telephone Number Details
- 🟢 Low | `Teamwork.Migrate.All` - Create chat and channel messages with anyone's identity and with any timestamp
- 🔴 High | `User-Mail.ReadWrite.All` - Read and write all secondary mail addresses for users
- 🔴 High | `User-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of users
- 🔴 High | `User-Phone.ReadWrite.All` - Read and write all user mobile phone and business phones
- 🟢 Low | `User.ReadBasic.All` - Read all users' basic profiles
- 🔴 High | `User.ReadWrite.All` - Read and write all users' full profiles
- 🟢 Low | `User.RevokeSessions.All` - Revoke all sign in sessions for a user
- 🔴 High | `UserAuthMethod-External.ReadWrite.All` - Read and write all users' external authentication methods
- 🟢 Low | `VirtualAppointmentNotification.Send` - Send notification regarding virtual appointments as any user
- 🔴 High | `WorkforceIntegration.ReadWrite.All` - Read and write workforce integrations


---

## Security Guidelines

### Risk-Based Access Control

Permissions are classified by risk level:

- **🔴 High Risk:** Can modify critical organizational resources
  - Require approval from Security team
  - Implement comprehensive audit logging
  - Monitor usage patterns for anomalies
  
- **🟡 Medium Risk:** Can access or modify specific resources
  - Require manager approval
  - Log all operations
  - Review quarterly
  
- **🟢 Low Risk:** Read-only access to non-sensitive data
  - Standard approval process
  - Basic logging
  - Annual review

### Monitoring Requirements

For all permissions:

1. **Real-time Alerts:** Unusual activity patterns, bulk operations, after-hours access
2. **Audit Logs:** Retain for minimum 1 year, 7 years for compliance data
3. **Access Reviews:** Quarterly for high-risk, semi-annually for medium-risk
4. **Performance Metrics:** Track API usage, error rates, throttling events

### Incident Response

If suspicious activity detected:

1. Alert Security Operations Center (SOC)
2. Temporarily disable application if needed
3. Review audit logs for affected timeframe
4. Assess impact and data exposure
5. Implement remediation steps
6. Update access controls and monitoring

---

## Detailed Permissions


### APIConnectors

#### APIConnectors.ReadWrite.All

**Permission ID:** `1dfe531a-24a6-4f1b-80f4-7a0dc5a0a171`  
**Display Name:** Read and write API connectors for authentication flows  
**Assigned Date:** 2025-11-23 17:43:31

**Description:**  
Allows the app to read, create and manage the API connectors used in user authentication flows, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new apiconnectors
const result = await graphClient
  .api('/apiconnectors')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get apiconnectors with filters
const data = await graphClient
  .api('/apiconnectors')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing apiconnectors
await graphClient
  .api('/apiconnectors/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### AccessReview

#### AccessReview.ReadWrite.Membership

**Permission ID:** `18228521-a591-40f1-b215-5fad4488c117`  
**Display Name:** Manage access reviews for group and app memberships  
**Assigned Date:** 2025-11-23 17:43:28

**Description:**  
Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization for group and app memberships, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new accessreview
const result = await graphClient
  .api('/accessreview')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get accessreview with filters
const data = await graphClient
  .api('/accessreview')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing accessreview
await graphClient
  .api('/accessreview/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Acronym

#### Acronym.Read.All

**Permission ID:** `8c0aed2c-0c61-433d-b63c-6370ddc73248`  
**Display Name:** Read all acronyms  
**Assigned Date:** 2025-11-23 17:43:28

**Description:**  
Allows an app to read all acronyms without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all acronym
const data = await graphClient
  .api('/acronym')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/acronym')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/acronym';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### AgentCardManifest

#### AgentCardManifest.ReadWrite.All

**Permission ID:** `228b1a03-f7ca-4348-b50d-e8a547ab61af`  
**Display Name:** Read and write all agent card manifests in Agent Registry  
**Assigned Date:** 2025-11-23 17:43:29

**Description:**  
Allows the app to read and write to all agent card manifests in your organization's Agent Registry without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new agentcardmanifest
const result = await graphClient
  .api('/agentcardmanifest')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get agentcardmanifest with filters
const data = await graphClient
  .api('/agentcardmanifest')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing agentcardmanifest
await graphClient
  .api('/agentcardmanifest/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Application-RemoteDesktopConfig

#### Application-RemoteDesktopConfig.ReadWrite.All

**Permission ID:** `3be0012a-cc4e-426b-895b-f9c836bf6381`  
**Display Name:** Read and write the remote desktop security configuration for all apps  
**Assigned Date:** 2025-11-23 17:43:31

**Description:**  
Allows the app to read and write the remote desktop security configuration for all apps in your organization, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new application/remotedesktopconfig
const result = await graphClient
  .api('/application/remotedesktopconfig')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get application/remotedesktopconfig with filters
const data = await graphClient
  .api('/application/remotedesktopconfig')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing application/remotedesktopconfig
await graphClient
  .api('/application/remotedesktopconfig/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### AuditLogsQuery-Exchange

#### AuditLogsQuery-Exchange.Read.All

**Permission ID:** `6b0d2622-d34e-4470-935b-b96550e5ca8d`  
**Display Name:** Read audit logs data from Exchange workload  
**Assigned Date:** 2025-11-23 17:43:34

**Description:**  
Allows the app to read and query audit logs from Exchange workload, without a signed-in user

**Usage Examples:**

1. **List Resources**
```javascript
// Get all auditlogsquery/exchange
const data = await graphClient
  .api('/auditlogsquery/exchange')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/auditlogsquery/exchange')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/auditlogsquery/exchange';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### BackupRestore-Monitor

#### BackupRestore-Monitor.Read.All

**Permission ID:** `ecae8511-f2d7-4be4-bdbf-91f244d45986`  
**Display Name:** Read all monitoring, quota and billing information for the tenant  
**Assigned Date:** 2025-11-23 17:43:35

**Description:**  
Allows the app to monitor all backup and restore jobs, view quota usage and billing details, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all backuprestore/monitor
const data = await graphClient
  .api('/backuprestore/monitor')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/backuprestore/monitor')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/backuprestore/monitor';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Bookings

#### Bookings.Manage.All

**Permission ID:** `6b22000a-1228-42ec-88db-b8c00399aecb`  
**Display Name:** Manage bookings information  
**Assigned Date:** 2025-11-23 19:35:11

**Description:**  
Allows an app to read, write and manage bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user.

**Usage Examples:**

```javascript
// Execute bookings operation
const result = await graphClient
  .api('/bookings')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Bookings.ReadWrite.All

**Permission ID:** `0c4b2d20-7919-468d-8668-c54b09d4dee8`  
**Display Name:** Read and write bookings information  
**Assigned Date:** 2025-11-23 17:43:37

**Description:**  
Allows an app to read and write bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user. Does not allow create, delete and publish of booking businesses.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new bookings
const result = await graphClient
  .api('/bookings')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get bookings with filters
const data = await graphClient
  .api('/bookings')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing bookings
await graphClient
  .api('/bookings/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Bookmark

#### Bookmark.Read.All

**Permission ID:** `be95e614-8ef3-49eb-8464-1c9503433b86`  
**Display Name:** Read all bookmarks  
**Assigned Date:** 2025-11-23 17:43:37

**Description:**  
Allows an app to read all bookmarks without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all bookmark
const data = await graphClient
  .api('/bookmark')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/bookmark')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/bookmark';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### BusinessScenarioData

#### BusinessScenarioData.ReadWrite.OwnedBy

**Permission ID:** `f2d21f22-5d80-499e-91cc-0a8a4ce16f54`  
**Display Name:** Read and write data for all business scenarios this app creates or owns  
**Assigned Date:** 2025-11-23 17:43:38

**Description:**  
Allows the app to fully manage the data associated with the business scenarios it owns, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new businessscenariodata
const result = await graphClient
  .api('/businessscenariodata')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get businessscenariodata with filters
const data = await graphClient
  .api('/businessscenariodata')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing businessscenariodata
await graphClient
  .api('/businessscenariodata/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### CallAiInsights

#### CallAiInsights.Read.All

**Permission ID:** `792b782b-7822-4b92-8103-77e44f2f706c`  
**Display Name:** Read all AI Insights for calls.  
**Assigned Date:** 2025-11-23 17:43:38

**Description:**  
Allows the app to read all AI Insights for all calls, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all callaiinsights
const data = await graphClient
  .api('/callaiinsights')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/callaiinsights')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/callaiinsights';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Calls

#### Calls.JoinGroupCall.All

**Permission ID:** `f6b49018-60ab-4f81-83bd-22caeabfed2d`  
**Display Name:** Join group calls and meetings as an app  
**Assigned Date:** 2025-11-23 17:43:41

**Description:**  
Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined with the privileges of a directory user to meetings in your organization.

**Usage Examples:**

```javascript
// Execute calls operation
const result = await graphClient
  .api('/calls')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Channel

#### Channel.Delete.All

**Permission ID:** `6a118a39-1227-45d4-af0c-ea7b40d210bc`  
**Display Name:** Delete channels  
**Assigned Date:** 2025-11-23 17:51:41

**Description:**  
Delete channels in any team, without a signed-in user.

**Usage Examples:**

```javascript
// Execute channel operation
const result = await graphClient
  .api('/channel')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Chat

#### Chat.UpdatePolicyViolation.All

**Permission ID:** `7e847308-e030-4183-9899-5235d7270f58`  
**Display Name:** Flag chat messages for violating policy  
**Assigned Date:** 2025-11-23 17:51:43

**Description:**  
Allows the app to update Microsoft Teams 1-to-1 or group chat messages by patching a set of Data Loss Prevention (DLP) policy violation properties to handle the output of DLP processing.

**Usage Examples:**

```javascript
// Execute chat operation
const result = await graphClient
  .api('/chat')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Security Impact:** Affects identity and access management
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Community

#### Community.ReadWrite.All

**Permission ID:** `35d59e32-eab5-4553-9345-abb62b4c703c`  
**Display Name:** Read and write all Viva Engage communities  
**Assigned Date:** 2025-11-23 17:43:44

**Description:**  
Allows the app to create Viva Engage communities, read all community properties, update community properties, and delete communities without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new community
const result = await graphClient
  .api('/community')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get community with filters
const data = await graphClient
  .api('/community')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing community
await graphClient
  .api('/community/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Contacts-OnPremisesSyncBehavior

#### Contacts-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `c8948c23-e66b-42db-83fd-770b71ab78d2`  
**Display Name:** Read and update the on-premises sync behavior of contacts  
**Assigned Date:** 2025-11-23 17:43:45

**Description:**  
Allows the app to update the on-premises sync behavior of all contacts in all mailboxes without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new contacts/onpremisessyncbehavior
const result = await graphClient
  .api('/contacts/onpremisessyncbehavior')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get contacts/onpremisessyncbehavior with filters
const data = await graphClient
  .api('/contacts/onpremisessyncbehavior')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing contacts/onpremisessyncbehavior
await graphClient
  .api('/contacts/onpremisessyncbehavior/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### CustomAuthenticationExtension

#### CustomAuthenticationExtension.Receive.Payload

**Permission ID:** `214e810f-fda8-4fd7-a475-29461495eb00`  
**Display Name:** Receive custom authentication extension HTTP requests  
**Assigned Date:** 2025-11-23 17:51:44

**Description:**  
Allows custom authentication extensions associated with the app to receive HTTP requests triggered by an authentication event. The request can include information about a user, client and resource service principals, and other information about the authentication.

**Usage Examples:**

```javascript
// Execute customauthenticationextension operation
const result = await graphClient
  .api('/customauthenticationextension')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### CustomSecAttributeDefinition

#### CustomSecAttributeDefinition.ReadWrite.All

**Permission ID:** `12338004-21f4-4896-bf5e-b75dfaf1016d`  
**Display Name:** Read and write custom security attribute definitions  
**Assigned Date:** 2025-11-23 17:43:47

**Description:**  
Allows the app to read and write custom security attribute definitions for the tenant without a signed in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new customsecattributedefinition
const result = await graphClient
  .api('/customsecattributedefinition')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get customsecattributedefinition with filters
const data = await graphClient
  .api('/customsecattributedefinition')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing customsecattributedefinition
await graphClient
  .api('/customsecattributedefinition/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### CustomTags

#### CustomTags.ReadWrite.All

**Permission ID:** `2f503208-e509-4e39-974c-8cc16e5785c9`  
**Display Name:** Read and write custom tags data  
**Assigned Date:** 2025-11-23 17:43:48

**Description:**  
Read and write custom tags data, without a signed-in user

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new customtags
const result = await graphClient
  .api('/customtags')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get customtags with filters
const data = await graphClient
  .api('/customtags')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing customtags
await graphClient
  .api('/customtags/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Device

#### Device.ReadWrite.All

**Permission ID:** `1138cb37-bd11-4084-a2b7-9f71582aeddb`  
**Display Name:** Read and write devices  
**Assigned Date:** 2025-11-23 17:43:49

**Description:**  
Allows the app to read and write all device properties without a signed in user.  Does not allow device creation, device deletion or update of device alternative security identifiers.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new device
const result = await graphClient
  .api('/device')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get device with filters
const data = await graphClient
  .api('/device')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing device
await graphClient
  .api('/device/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### DeviceTemplate

#### DeviceTemplate.Create

**Permission ID:** `abf6441f-0772-4932-96e7-0191478dd73a`  
**Display Name:** Create device template  
**Assigned Date:** 2025-11-23 19:35:13

**Description:**  
Allows the app to create device templates. The app is marked as owner of the created device template. As a member of owners, the app will be allowed to manage devices created from the template.

**Usage Examples:**

```javascript
// Execute devicetemplate operation
const result = await graphClient
  .api('/devicetemplate')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### DirectoryRecommendations

#### DirectoryRecommendations.ReadWrite.All

**Permission ID:** `0e9eea12-4f01-45f6-9b8d-3ea4c8144158`  
**Display Name:** Read and update all Azure AD recommendations  
**Assigned Date:** 2025-11-23 17:43:51

**Description:**  
Allows the app to read and update all Azure AD recommendations, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new directoryrecommendations
const result = await graphClient
  .api('/directoryrecommendations')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get directoryrecommendations with filters
const data = await graphClient
  .api('/directoryrecommendations')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing directoryrecommendations
await graphClient
  .api('/directoryrecommendations/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Domain

#### Domain.ReadWrite.All

**Permission ID:** `7e05723c-0bb0-42da-be95-ae9f08a6e53c`  
**Display Name:** Read and write domains  
**Assigned Date:** 2025-11-23 17:43:52

**Description:**  
Allows the app to read and write all domain properties without a signed in user.  Also allows the app to add,  verify and remove domains.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new domain
const result = await graphClient
  .api('/domain')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get domain with filters
const data = await graphClient
  .api('/domain')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing domain
await graphClient
  .api('/domain/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ExternalConnection

#### ExternalConnection.ReadWrite.OwnedBy

**Permission ID:** `f431331c-49a6-499f-be1c-62af19c34a9d`  
**Display Name:** Read and write external connections  
**Assigned Date:** 2025-11-23 17:43:56

**Description:**  
Allows the app to read and write external connections without a signed-in user. The app can only read and write external connections that it is authorized to, or it can create new external connections.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new externalconnection
const result = await graphClient
  .api('/externalconnection')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get externalconnection with filters
const data = await graphClient
  .api('/externalconnection')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing externalconnection
await graphClient
  .api('/externalconnection/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ExternalItem

#### ExternalItem.ReadWrite.OwnedBy

**Permission ID:** `8116ae0f-55c2-452d-9944-d18420f5b2c8`  
**Display Name:** Read and write external items  
**Assigned Date:** 2025-11-23 17:43:57

**Description:**  
Allows the app to read and write external items without a signed-in user. The app can only read external items of the connection that it is authorized to.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new externalitem
const result = await graphClient
  .api('/externalitem')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get externalitem with filters
const data = await graphClient
  .api('/externalitem')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing externalitem
await graphClient
  .api('/externalitem/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### FileIngestion

#### FileIngestion.Ingest

**Permission ID:** `65891b00-2fd9-4e33-be27-04a53132e3df`  
**Display Name:** Ingest SharePoint and OneDrive content to make it available in the search index  
**Assigned Date:** 2025-11-23 17:43:57

**Description:**  
Allows the app to ingest SharePoint and OneDrive content to make it available in the search index, without a signed-in user.

**Usage Examples:**

```javascript
// Execute fileingestion operation
const result = await graphClient
  .api('/fileingestion')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### FileIngestionHybridOnboarding

#### FileIngestionHybridOnboarding.Manage

**Permission ID:** `766c601b-c009-4438-8290-c8b05fa00c4b`  
**Display Name:** Manage onboarding for a Hybrid Cloud tenant  
**Assigned Date:** 2025-11-23 17:43:57

**Description:**  
Allows the app to manage onboarding for a Hybrid Cloud tenant, without a signed-in user.

**Usage Examples:**

```javascript
// Execute fileingestionhybridonboarding operation
const result = await graphClient
  .api('/fileingestionhybridonboarding')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Files

#### Files.ReadWrite.AppFolder

**Permission ID:** `b47b160b-1054-4efd-9ca0-e2f614696086`  
**Display Name:** Have full access to the application's folder without a signed in user.  
**Assigned Date:** 2025-11-23 17:43:58

**Description:**  
Allows the app to read, create, update and delete files in the application's folder without a signed in user.

**Usage Examples:**

1. **Upload File to App Folder**
```javascript
// Create application-specific folder and upload file
const fileContent = 'Configuration data for the app';

const uploadedFile = await graphClient
  .api('/me/drive/special/approot:/config.json:/content')
  .put(fileContent);

console.log('File uploaded:', uploadedFile.name);
```

2. **Read File from App Folder**
```javascript
// Read application configuration file
const fileContent = await graphClient
  .api('/me/drive/special/approot:/config.json:/content')
  .get();

const config = JSON.parse(fileContent);
```

3. **List Files in App Folder**
```javascript
// List all files in the app folder
const files = await graphClient
  .api('/me/drive/special/approot/children')
  .get();

files.value.forEach(file => {
  console.log(`${file.name} - ${file.size} bytes`);
});
```

4. **Delete File**
```javascript
// Remove old file from app folder
await graphClient
  .api('/me/drive/special/approot:/old-data.json')
  .delete();
```

**Common Use Cases:**

- **App Configuration:** Store application-specific settings per user
- **Cache Management:** Cache data locally in user's OneDrive
- **Offline Data:** Store data for offline access
- **User Preferences:** Save user-specific preferences and state
- **Temporary Storage:** Store intermediate processing results

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Group-Conversation

#### Group-Conversation.ReadWrite.All

**Permission ID:** `6679c91b-820a-4900-ab47-e97b197a89c4`  
**Display Name:** Read and write all group conversations  
**Assigned Date:** 2025-11-23 17:43:59

**Description:**  
Allows the app to read and write conversations of the groups this app has access to without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new group/conversation
const result = await graphClient
  .api('/group/conversation')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get group/conversation with filters
const data = await graphClient
  .api('/group/conversation')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing group/conversation
await graphClient
  .api('/group/conversation/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Group-OnPremisesSyncBehavior

#### Group-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `2d9bd318-b883-40be-9df7-63ec4fcdc424`  
**Display Name:** Read and update the on-premises sync behavior of groups  
**Assigned Date:** 2025-11-23 17:43:59

**Description:**  
Allows the app to update the on-premises sync behavior of all groups without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new group/onpremisessyncbehavior
const result = await graphClient
  .api('/group/onpremisessyncbehavior')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get group/onpremisessyncbehavior with filters
const data = await graphClient
  .api('/group/onpremisessyncbehavior')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing group/onpremisessyncbehavior
await graphClient
  .api('/group/onpremisessyncbehavior/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### IdentityRiskEvent

#### IdentityRiskEvent.ReadWrite.All

**Permission ID:** `db06fb33-1953-4b7b-a2ac-f1e2c854f7ae`  
**Display Name:** Read and write all risk detection information  
**Assigned Date:** 2025-11-23 17:44:00

**Description:**  
Allows the app to read and update identity risk detection information for your organization without a signed-in user. Update operations include confirming risk event detections.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new identityriskevent
const result = await graphClient
  .api('/identityriskevent')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get identityriskevent with filters
const data = await graphClient
  .api('/identityriskevent')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing identityriskevent
await graphClient
  .api('/identityriskevent/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### IdentityUserFlow

#### IdentityUserFlow.ReadWrite.All

**Permission ID:** `65319a09-a2be-469d-8782-f6b07debf789`  
**Display Name:** Read and write all identity user flows  
**Assigned Date:** 2025-11-23 19:35:15

**Description:**  
Allows the app to read or write your organization's user flows, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new identityuserflow
const result = await graphClient
  .api('/identityuserflow')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get identityuserflow with filters
const data = await graphClient
  .api('/identityuserflow')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing identityuserflow
await graphClient
  .api('/identityuserflow/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### IndustryData-DataConnector

#### IndustryData-DataConnector.ReadWrite.All

**Permission ID:** `eda0971c-482e-4345-b28f-69c309cb8a34`  
**Display Name:** Manage data connector definitions  
**Assigned Date:** 2025-11-23 17:44:01

**Description:**  
Allows the app to read and write data connectors without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new industrydata/dataconnector
const result = await graphClient
  .api('/industrydata/dataconnector')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get industrydata/dataconnector with filters
const data = await graphClient
  .api('/industrydata/dataconnector')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing industrydata/dataconnector
await graphClient
  .api('/industrydata/dataconnector/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### IndustryData-InboundFlow

#### IndustryData-InboundFlow.ReadWrite.All

**Permission ID:** `e688c61f-d4c6-4d64-a197-3bcf6ba1d6ad`  
**Display Name:** Manage inbound flow definitions  
**Assigned Date:** 2025-11-23 17:44:01

**Description:**  
Allows the app to read and write inbound data flows without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new industrydata/inboundflow
const result = await graphClient
  .api('/industrydata/inboundflow')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get industrydata/inboundflow with filters
const data = await graphClient
  .api('/industrydata/inboundflow')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing industrydata/inboundflow
await graphClient
  .api('/industrydata/inboundflow/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### IndustryData-Run

#### IndustryData-Run.Read.All

**Permission ID:** `f6f5d10b-3024-4d1d-b674-aae4df4a1a73`  
**Display Name:** View current and previous runs  
**Assigned Date:** 2025-11-23 17:44:02

**Description:**  
Allows the app to read current and previous IndustryData runs without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all industrydata/run
const data = await graphClient
  .api('/industrydata/run')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/industrydata/run')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/industrydata/run';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Mail

#### Mail.ReadWrite

**Permission ID:** `e2a3a72e-5f79-4c64-b1b1-878b674786c9`  
**Display Name:** Read and write mail in all mailboxes  
**Assigned Date:** 2025-11-23 17:44:07

**Description:**  
Allows the app to create, read, update, and delete mail in all mailboxes without a signed-in user. Does not include permission to send mail.

**Usage Examples:**

1. **Read Recent Emails**
```javascript
// Get recent emails from all mailboxes
const messages = await graphClient
  .api('/users/{userId}/messages')
  .top(50)
  .orderby('receivedDateTime desc')
  .select('subject,from,receivedDateTime,isRead')
  .get();

// Process unread messages
const unreadMessages = messages.value.filter(m => !m.isRead);
```

2. **Create Draft Email**
```javascript
// Create a draft email
const draft = await graphClient
  .api('/users/{userId}/messages')
  .post({
    subject: 'Monthly Report',
    body: {
      contentType: 'HTML',
      content: '<h1>Report</h1><p>Details...</p>'
    },
    toRecipients: [
      {
        emailAddress: {
          address: 'manager@company.com'
        }
      }
    ]
  });
```

3. **Move Email to Folder**
```javascript
// Move email to a specific folder
await graphClient
  .api(`/users/{userId}/messages/{messageId}/move`)
  .post({
    destinationId: 'archive-folder-id'
  });
```

**Common Use Cases:**

- **Email Automation:** Automatically process and route incoming emails
- **Archival System:** Move old emails to archive folders
- **Compliance Scanning:** Scan emails for policy violations or sensitive data
- **Email Analytics:** Generate reports on email volume and patterns
- **Integration:** Sync emails with CRM or ticketing systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### MultiTenantOrganization

#### MultiTenantOrganization.ReadWrite.All

**Permission ID:** `920def01-ca61-4d2d-b3df-105b46046a70`  
**Display Name:** Read and write all multi-tenant organization details and tenants  
**Assigned Date:** 2025-11-23 17:44:08

**Description:**  
Allows the app to read and write all multi-tenant organization details and tenants, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new multitenantorganization
const result = await graphClient
  .api('/multitenantorganization')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get multitenantorganization with filters
const data = await graphClient
  .api('/multitenantorganization')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing multitenantorganization
await graphClient
  .api('/multitenantorganization/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OnlineMeetingAiInsight

#### OnlineMeetingAiInsight.Read.Chat

**Permission ID:** `01892c31-3b66-4bcf-b5f5-bf0a03d5ed9f`  
**Display Name:** Read all AI Insights for online meetings where the Teams application is installed.  
**Assigned Date:** 2025-11-23 17:44:10

**Description:**  
Allows the teams-app to read all aiInsights for online meetings where the Teams-app is installed, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all onlinemeetingaiinsight
const data = await graphClient
  .api('/onlinemeetingaiinsight')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/onlinemeetingaiinsight')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/onlinemeetingaiinsight';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OnlineMeetingArtifact

#### OnlineMeetingArtifact.Read.All

**Permission ID:** `df01ed3b-eb61-4eca-9965-6b3d789751b2`  
**Display Name:** Read online meeting artifacts  
**Assigned Date:** 2025-11-23 17:44:11

**Description:**  
Allows the app to read online meeting artifacts in your organization, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all onlinemeetingartifact
const data = await graphClient
  .api('/onlinemeetingartifact')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/onlinemeetingartifact')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/onlinemeetingartifact';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OnlineMeetings

#### OnlineMeetings.ReadWrite.All

**Permission ID:** `b8bb2037-6e08-44ac-a4ea-4674e010e2a4`  
**Display Name:** Read and create online meetings  
**Assigned Date:** 2025-11-23 17:44:11

**Description:**  
Allows the app to read and create online meetings as an application in your organization.

**Usage Examples:**

1. **Create Scheduled Meeting**
```javascript
// Create a Teams meeting
const meeting = await graphClient
  .api('/users/{userId}/onlineMeetings')
  .post({
    startDateTime: '2025-12-01T10:00:00Z',
    endDateTime: '2025-12-01T11:00:00Z',
    subject: 'Project Kickoff Meeting',
    participants: {
      attendees: [
        {
          identity: {
            user: {
              id: 'user-id-1'
            }
          },
          upn: 'attendee1@company.com'
        }
      ]
    },
    lobbyBypassSettings: {
      scope: 'organization'
    },
    allowMeetingChat: 'enabled'
  });

console.log('Join URL:', meeting.joinUrl);
```

2. **Get Meeting Details**
```javascript
// Retrieve meeting information
const meetingDetails = await graphClient
  .api(`/users/{userId}/onlineMeetings/{meetingId}`)
  .get();

// Access meeting recording
if (meetingDetails.recording) {
  console.log('Recording URL:', meetingDetails.recording.contentUrl);
}
```

3. **Update Meeting Settings**
```javascript
// Modify meeting settings
await graphClient
  .api(`/users/{userId}/onlineMeetings/{meetingId}`)
  .patch({
    allowMeetingChat: 'disabled',
    allowTeamworkReactions: false,
    recordAutomatically: true
  });
```

**Common Use Cases:**

- **Meeting Automation:** Create recurring team meetings programmatically
- **Calendar Integration:** Sync meetings with project management tools
- **Meeting Analytics:** Track meeting frequency and attendance
- **Automated Scheduling:** Schedule meetings based on participant availability
- **Recording Management:** Automatically organize and archive meeting recordings

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OrgContact

#### OrgContact.Read.All

**Permission ID:** `e1a88a34-94c4-4418-be12-c87b00e26bea`  
**Display Name:** Read organizational contacts  
**Assigned Date:** 2025-11-23 17:44:13

**Description:**  
Allows the app to read all organizational contacts without a signed-in user.  These contacts are managed by the organization and are different from a user's personal contacts.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all orgcontact
const data = await graphClient
  .api('/orgcontact')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/orgcontact')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/orgcontact';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OrgSettings-DynamicsVoice

#### OrgSettings-DynamicsVoice.ReadWrite.All

**Permission ID:** `c3f1cc32-8bbd-4ab6-bd33-f270e0d9e041`  
**Display Name:** Read and write organization-wide Dynamics customer voice settings  
**Assigned Date:** 2025-11-23 17:44:13

**Description:**  
Allows the app to read and write organization-wide Dynamics customer voice settings, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new orgsettings/dynamicsvoice
const result = await graphClient
  .api('/orgsettings/dynamicsvoice')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get orgsettings/dynamicsvoice with filters
const data = await graphClient
  .api('/orgsettings/dynamicsvoice')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing orgsettings/dynamicsvoice
await graphClient
  .api('/orgsettings/dynamicsvoice/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### OrgSettings-Microsoft365Install

#### OrgSettings-Microsoft365Install.ReadWrite.All

**Permission ID:** `83f7232f-763c-47b2-a097-e35d2cbe1da5`  
**Display Name:** Read and write organization-wide Microsoft 365 apps installation settings  
**Assigned Date:** 2025-11-23 17:44:14

**Description:**  
Allows the app to read and write organization-wide Microsoft 365 apps installation settings, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new orgsettings/microsoft365install
const result = await graphClient
  .api('/orgsettings/microsoft365install')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get orgsettings/microsoft365install with filters
const data = await graphClient
  .api('/orgsettings/microsoft365install')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing orgsettings/microsoft365install
await graphClient
  .api('/orgsettings/microsoft365install/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Place

#### Place.Read.All

**Permission ID:** `913b9306-0ce1-42b8-9137-6a7df690a760`  
**Display Name:** Read all company places  
**Assigned Date:** 2025-11-23 17:44:15

**Description:**  
Allows the app to read company places (conference rooms and room lists) for calendar events and other applications, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all place
const data = await graphClient
  .api('/place')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/place')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/place';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### PlaceDevice

#### PlaceDevice.ReadWrite.All

**Permission ID:** `2d510721-5c4e-43cd-bfdb-ac0f8819fb92`  
**Display Name:** Read and write all workplace devices  
**Assigned Date:** 2025-11-23 17:44:15

**Description:**  
Allows the app to read and write all workplace devices, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new placedevice
const result = await graphClient
  .api('/placedevice')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get placedevice with filters
const data = await graphClient
  .api('/placedevice')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing placedevice
await graphClient
  .api('/placedevice/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Policy

#### Policy.Read.AuthenticationMethod

**Permission ID:** `8e3bc81b-d2f3-4b7b-838c-32c88218d2f0`  
**Display Name:** Read authentication method policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the app to read all authentication method policies for the tenant, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all policy
const data = await graphClient
  .api('/policy')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/policy';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.Read.ConditionalAccess

**Permission ID:** `37730810-e9ba-4e46-b07e-8ca78d182097`  
**Display Name:** Read your organization's conditional access policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the app to read your organization's conditional access policies, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all policy
const data = await graphClient
  .api('/policy')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/policy';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.Read.DeviceConfiguration

**Permission ID:** `bdba4817-6ba1-4a7c-8a01-be9bc7c242dd`  
**Display Name:** Read your organization's device configuration policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the application to read your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all policy
const data = await graphClient
  .api('/policy')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/policy';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.Read.PermissionGrant

**Permission ID:** `9e640839-a198-48fb-8b9a-013fd6f6cbcd`  
**Display Name:** Read consent and permission grant policies  
**Assigned Date:** 2025-11-23 19:35:19

**Description:**  
Allows the app to read policies related to consent and permission grants for applications, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all policy
const data = await graphClient
  .api('/policy')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/policy';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.AuthenticationFlows

**Permission ID:** `25f85f3c-f66c-4205-8cd5-de92dd7f0cec`  
**Display Name:** Read and write authentication flow policies  
**Assigned Date:** 2025-11-23 17:44:16

**Description:**  
Allows the app to read and write all authentication flow policies for the tenant, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.AuthenticationMethod

**Permission ID:** `29c18626-4985-4dcd-85c0-193eef327366`  
**Display Name:** Read and write all authentication method policies  
**Assigned Date:** 2025-11-23 17:44:17

**Description:**  
Allows the app to read and write all authentication method policies for the tenant, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.ConditionalAccess

**Permission ID:** `01c0a623-fc9b-48e9-b794-0756f8e8f067`  
**Display Name:** Read and write your organization's conditional access policies  
**Assigned Date:** 2025-11-23 17:44:17

**Description:**  
Allows the app to read and write your organization's conditional access policies, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.FedTokenValidation

**Permission ID:** `90bbca0b-227c-4cdc-8083-1c6cfb95bac6`  
**Display Name:** Read and write your organization's federated token validation policy  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the application to read and update the organization's federated token validation policy without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.IdentityProtection

**Permission ID:** `2dcf8603-09eb-4078-b1ec-d30a1a76b873`  
**Display Name:** Read and write your organization’s identity protection policy  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the app to read and write your organization’s identity protection policy without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### Policy.ReadWrite.PermissionGrant

**Permission ID:** `a402ca1c-2696-4531-972d-6e5ee4aa11ea`  
**Display Name:** Manage consent and permission grant policies  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the app to manage policies related to consent and permission grants for applications, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get policy with filters
const data = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing policy
await graphClient
  .api('/policy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Presence

#### Presence.ReadWrite.All

**Permission ID:** `83cded22-8297-4ff6-a7fa-e97e9545a259`  
**Display Name:** Read and write presence information for all users  
**Assigned Date:** 2025-11-23 17:44:20

**Description:**  
Allows the app to read all presence information and write activity and availability of all users in the directory without a signed-in user. Presence information includes activity, availability, status note, calendar out-of-office message, time zone and location.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new presence
const result = await graphClient
  .api('/presence')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get presence with filters
const data = await graphClient
  .api('/presence')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing presence
await graphClient
  .api('/presence/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ProtectionScopes

#### ProtectionScopes.Compute.All

**Permission ID:** `e5a76501-dbb0-492c-ab55-5d09e8837263`  
**Display Name:** Compute Purview policies at tenant scope  
**Assigned Date:** 2025-11-23 17:44:21

**Description:**  
Allows the app to identify Purview data protection, compliance and governance policy scopes defined for all users across tenant.

**Usage Examples:**

```javascript
// Execute protectionscopes operation
const result = await graphClient
  .api('/protectionscopes')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### PublicKeyInfrastructure

#### PublicKeyInfrastructure.ReadWrite.All

**Permission ID:** `a2b63618-5350-462d-b1b3-ba6eb3684e26`  
**Display Name:** Read and write all certificate based authentication configurations  
**Assigned Date:** 2025-11-23 17:44:22

**Description:**  
Allows the application to read and write certificate-based authentication configuration such as all public key infrastructures (PKI) and certificate authorities (CA) configured for the organization, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new publickeyinfrastructure
const result = await graphClient
  .api('/publickeyinfrastructure')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get publickeyinfrastructure with filters
const data = await graphClient
  .api('/publickeyinfrastructure')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing publickeyinfrastructure
await graphClient
  .api('/publickeyinfrastructure/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RealTimeActivityFeed

#### RealTimeActivityFeed.Read.All

**Permission ID:** `abafe00f-ea87-4c63-b8a8-0e7bb0a88144`  
**Display Name:** Access real-time enriched data in a meeting as an app  
**Assigned Date:** 2025-11-23 17:44:22

**Description:**  
Allows the app to get direct access to real-time enriched data in a meeting, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all realtimeactivityfeed
const data = await graphClient
  .api('/realtimeactivityfeed')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/realtimeactivityfeed')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/realtimeactivityfeed';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RoleAssignmentSchedule

#### RoleAssignmentSchedule.Remove.Directory

**Permission ID:** `d3495511-98b7-4df3-b317-4e35c19f6129`  
**Display Name:** Delete all active role assignments of your company's directory  
**Assigned Date:** 2025-11-23 19:35:20

**Description:**  
Delete all active privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

**Usage Examples:**

```javascript
// Execute roleassignmentschedule operation
const result = await graphClient
  .api('/roleassignmentschedule')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RoleEligibilitySchedule

#### RoleEligibilitySchedule.ReadWrite.Directory

**Permission ID:** `fee28b28-e1f3-4841-818e-2704dc62245f`  
**Display Name:** Read, update, and delete all eligible role assignments and schedules for your company's directory  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read and manage the eligible role-based access control (RBAC) assignments and schedules for your company's directory, without a signed-in user. This includes managing eligible directory role membership, and reading directory role templates, directory roles and eligible memberships.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new roleeligibilityschedule
const result = await graphClient
  .api('/roleeligibilityschedule')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get roleeligibilityschedule with filters
const data = await graphClient
  .api('/roleeligibilityschedule')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing roleeligibilityschedule
await graphClient
  .api('/roleeligibilityschedule/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RoleManagement

#### RoleManagement.ReadWrite.Defender

**Permission ID:** `8b7e8c0a-7e9d-4049-97ec-04b5e1bcaf05`  
**Display Name:** Read M365 Defender RBAC configuration  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new rolemanagement
const result = await graphClient
  .api('/rolemanagement')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get rolemanagement with filters
const data = await graphClient
  .api('/rolemanagement')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing rolemanagement
await graphClient
  .api('/rolemanagement/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### RoleManagement.ReadWrite.Exchange

**Permission ID:** `025d3225-3f02-4882-b4c0-cd5b541a4e80`  
**Display Name:** Read and write Exchange Online RBAC configuration  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read and manage the role-based access control (RBAC) settings for your organization's Exchange Online service, without a signed-in user. This includes reading, creating, updating, and deleting Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new rolemanagement
const result = await graphClient
  .api('/rolemanagement')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get rolemanagement with filters
const data = await graphClient
  .api('/rolemanagement')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing rolemanagement
await graphClient
  .api('/rolemanagement/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RoleManagementAlert

#### RoleManagementAlert.ReadWrite.Directory

**Permission ID:** `11059518-d6a6-4851-98ed-509268489c4a`  
**Display Name:** Read all alert data, configure alerts, and take actions on all alerts for your company's directory  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to read and manage all role-based access control (RBAC) alerts for your company's directory, without a signed-in user. This includes managing alert settings, initiating alert scans, dismissing alerts, remediating alert incidents, and reading alert statuses, alert definitions, alert configurations and incidents that lead to an alert.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new rolemanagementalert
const result = await graphClient
  .api('/rolemanagementalert')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get rolemanagementalert with filters
const data = await graphClient
  .api('/rolemanagementalert')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing rolemanagementalert
await graphClient
  .api('/rolemanagementalert/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### RoleManagementPolicy

#### RoleManagementPolicy.ReadWrite.Directory

**Permission ID:** `31e08e0a-d3f7-4ca2-ac39-7343fb83e8ad`  
**Display Name:** Read, update, and delete all policies for privileged role assignments of your company's directory  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to read, update, and delete policies for privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new rolemanagementpolicy
const result = await graphClient
  .api('/rolemanagementpolicy')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get rolemanagementpolicy with filters
const data = await graphClient
  .api('/rolemanagementpolicy')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing rolemanagementpolicy
await graphClient
  .api('/rolemanagementpolicy/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Schedule

#### Schedule.ReadWrite.All

**Permission ID:** `b7760610-0545-4e8a-9ec3-cce9e63db01c`  
**Display Name:** Read and write all schedule items  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to manage all schedules, schedule groups, shifts and associated entities in the Teams or Shifts application without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new schedule
const result = await graphClient
  .api('/schedule')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get schedule with filters
const data = await graphClient
  .api('/schedule')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing schedule
await graphClient
  .api('/schedule/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### SchedulePermissions

#### SchedulePermissions.ReadWrite.All

**Permission ID:** `7239b71d-b402-4150-b13d-78ecfe8df441`  
**Display Name:** Read/Write schedule permissions for a role  
**Assigned Date:** 2025-11-23 17:44:27

**Description:**  
Allows the app to read/write schedule permissions for a specific role in Shifts application without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new schedulepermissions
const result = await graphClient
  .api('/schedulepermissions')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get schedulepermissions with filters
const data = await graphClient
  .api('/schedulepermissions')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing schedulepermissions
await graphClient
  .api('/schedulepermissions/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### SecurityIdentitiesUserActions

#### SecurityIdentitiesUserActions.ReadWrite.All

**Permission ID:** `b4146a3a-dd4f-4af4-8d91-7cc0eef3d041`  
**Display Name:** Read and perform all identity security available user actions  
**Assigned Date:** 2025-11-23 17:44:30

**Description:**  
Allows the app to read and write identity security available user actions without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new securityidentitiesuseractions
const result = await graphClient
  .api('/securityidentitiesuseractions')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get securityidentitiesuseractions with filters
const data = await graphClient
  .api('/securityidentitiesuseractions')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing securityidentitiesuseractions
await graphClient
  .api('/securityidentitiesuseractions/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ServiceActivity-Exchange

#### ServiceActivity-Exchange.Read.All

**Permission ID:** `2b655018-450a-4845-81e7-d603b1ebffdb`  
**Display Name:** Read all Exchange service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Exchange service activity, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all serviceactivity/exchange
const data = await graphClient
  .api('/serviceactivity/exchange')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/serviceactivity/exchange')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/serviceactivity/exchange';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ServiceActivity-Microsoft365Web

#### ServiceActivity-Microsoft365Web.Read.All

**Permission ID:** `c766cb16-acc4-4663-ba09-6eedef5876c5`  
**Display Name:** Read all Microsoft 365 Web service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Microsoft 365 Web service activity, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all serviceactivity/microsoft365web
const data = await graphClient
  .api('/serviceactivity/microsoft365web')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/serviceactivity/microsoft365web')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/serviceactivity/microsoft365web';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### ServiceActivity-Teams

#### ServiceActivity-Teams.Read.All

**Permission ID:** `4dfee10b-fa4a-41b5-b34d-ccf54cc0c394`  
**Display Name:** Read all Teams service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Teams service activity, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all serviceactivity/teams
const data = await graphClient
  .api('/serviceactivity/teams')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/serviceactivity/teams')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/serviceactivity/teams';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### SharePointTenantSettings

#### SharePointTenantSettings.ReadWrite.All

**Permission ID:** `19b94e34-907c-4f43-bde9-38b1909ed408`  
**Display Name:** Read and change SharePoint and OneDrive tenant settings  
**Assigned Date:** 2025-11-23 17:44:33

**Description:**  
Allows the application to read and change the tenant-level settings of SharePoint and OneDrive, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new sharepointtenantsettings
const result = await graphClient
  .api('/sharepointtenantsettings')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get sharepointtenantsettings with filters
const data = await graphClient
  .api('/sharepointtenantsettings')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing sharepointtenantsettings
await graphClient
  .api('/sharepointtenantsettings/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Sites

#### Sites.Selected

**Permission ID:** `883ea226-0bf2-4a8f-9f9d-92c9162a727d`  
**Display Name:** Access selected site collections  
**Assigned Date:** 2025-11-23 19:35:29

**Description:**  
Allow the application to access a subset of site collections without a signed in user.  The specific site collections and the permissions granted will be configured in SharePoint Online.

**Usage Examples:**

```javascript
// Execute sites operation
const result = await graphClient
  .api('/sites')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### SynchronizationData-User

#### SynchronizationData-User.Upload

**Permission ID:** `db31e92a-b9ea-4d87-bf6a-75a37a9ca35a`  
**Display Name:** Upload user data to the identity synchronization service  
**Assigned Date:** 2025-11-23 17:44:35

**Description:**  
Allows the application to upload bulk user data to the identity synchronization service, without a signed-in user.

**Usage Examples:**

```javascript
// Execute synchronizationdata/user operation
const result = await graphClient
  .api('/synchronizationdata/user')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamMember

#### TeamMember.ReadWriteNonOwnerRole.All

**Permission ID:** `4437522e-9a86-4a41-a7da-e380edd4a97d`  
**Display Name:** Add and remove members with non-owner role for all teams  
**Assigned Date:** 2025-11-23 17:44:36

**Description:**  
Add and remove members from all teams, without a signed-in user. Does not allow adding or removing a member with the owner role. Additionally, does not allow the app to elevate an existing member to the owner role.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new teammember
const result = await graphClient
  .api('/teammember')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get teammember with filters
const data = await graphClient
  .api('/teammember')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing teammember
await graphClient
  .api('/teammember/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamSettings

#### TeamSettings.ReadWrite.All

**Permission ID:** `bdd80a03-d9bc-451d-b7c4-ce7c63fe3c8f`  
**Display Name:** Read and change all teams' settings  
**Assigned Date:** 2025-11-23 17:44:41

**Description:**  
Read and change all teams' settings, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new teamsettings
const result = await graphClient
  .api('/teamsettings')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get teamsettings with filters
const data = await graphClient
  .api('/teamsettings')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing teamsettings
await graphClient
  .api('/teamsettings/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamsActivity

#### TeamsActivity.Read.All

**Permission ID:** `70dec828-f620-4914-aa83-a29117306807`  
**Display Name:** Read all users' teamwork activity feed  
**Assigned Date:** 2025-11-23 17:44:36

**Description:**  
Allows the app to read all users' teamwork activity feed, without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamsactivity
const data = await graphClient
  .api('/teamsactivity')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamsactivity')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamsactivity';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamsAppInstallation

#### TeamsAppInstallation.ManageSelectedForUser.All

**Permission ID:** `e97a9235-5b3c-43c4-b37d-6786a173fae4`  
**Display Name:** Manage installation and permission grants of selected Teams apps for all user accounts  
**Assigned Date:** 2025-11-23 19:35:30

**Description:**  
Allows the app to read, install, upgrade, and uninstall selected Teams apps in any user account, without a signed-in user. Gives the ability to manage permission grants for accessing those specific users' data.

**Usage Examples:**

```javascript
// Execute teamsappinstallation operation
const result = await graphClient
  .api('/teamsappinstallation')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### TeamsAppInstallation.ReadForChat.All

**Permission ID:** `cc7e7635-2586-41d6-adaa-a8d3bcad5ee5`  
**Display Name:** Read installed Teams apps for all chats  
**Assigned Date:** 2025-11-23 19:35:31

**Description:**  
Allows the app to read the Teams apps that are installed in any chat, without a signed-in user. Does not give the ability to read application-specific settings.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamsappinstallation
const data = await graphClient
  .api('/teamsappinstallation')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamsappinstallation')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamsappinstallation';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### TeamsAppInstallation.ReadForUser.All

**Permission ID:** `9ce09611-f4f7-4abd-a629-a05450422a97`  
**Display Name:** Read installed Teams apps for all users  
**Assigned Date:** 2025-11-23 19:35:31

**Description:**  
Allows the app to read the Teams apps that are installed for any user, without a signed-in user. Does not give the ability to read application-specific settings.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamsappinstallation
const data = await graphClient
  .api('/teamsappinstallation')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamsappinstallation')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamsappinstallation';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### TeamsAppInstallation.ReadWriteAndConsentSelfForChat.All

**Permission ID:** `ba1ba90b-2d8f-487e-9f16-80728d85bb5c`  
**Display Name:** Allow the Teams app to manage itself and its permission grants for all chats  
**Assigned Date:** 2025-11-23 17:44:37

**Description:**  
Allows a Teams app to read, install, upgrade, and uninstall itself for any chat, without a signed-in user, and manage its permission grants for accessing those specific chats' data.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new teamsappinstallation
const result = await graphClient
  .api('/teamsappinstallation')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get teamsappinstallation with filters
const data = await graphClient
  .api('/teamsappinstallation')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing teamsappinstallation
await graphClient
  .api('/teamsappinstallation/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamsResourceAccount

#### TeamsResourceAccount.Read.All

**Permission ID:** `b55aa226-33a1-4396-bcf4-edce5e7a31c1`  
**Display Name:** Read Teams resource accounts  
**Assigned Date:** 2025-11-23 17:44:41

**Description:**  
Allows the app to read your tenant's resource accounts without a signed-in user.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamsresourceaccount
const data = await graphClient
  .api('/teamsresourceaccount')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamsresourceaccount')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamsresourceaccount';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamsTab

#### TeamsTab.Read.All

**Permission ID:** `46890524-499a-4bb2-ad64-1476b4f3e1cf`  
**Display Name:** Read tabs in Microsoft Teams.  
**Assigned Date:** 2025-11-23 19:35:32

**Description:**  
Read the names and settings of tabs inside any team in Microsoft Teams, without a signed-in user. This does not give access to the content inside the tabs.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamstab
const data = await graphClient
  .api('/teamstab')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamstab')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamstab';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### TeamsTab.ReadWriteForChat.All

**Permission ID:** `fd9ce730-a250-40dc-bd44-8dc8d20f39ea`  
**Display Name:** Allow the Teams app to manage all tabs for all chats  
**Assigned Date:** 2025-11-23 17:44:42

**Description:**  
Allows a Teams app to read, install, upgrade, and uninstall all tabs for any chat, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new teamstab
const result = await graphClient
  .api('/teamstab')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get teamstab with filters
const data = await graphClient
  .api('/teamstab')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing teamstab
await graphClient
  .api('/teamstab/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### TeamsTelephoneNumber

#### TeamsTelephoneNumber.Read.All

**Permission ID:** `39b17d18-680c-41f4-b9c2-5f30629e7cb6`  
**Display Name:** Read Tenant-Acquired Telephone Number Details  
**Assigned Date:** 2025-11-23 19:35:32

**Description:**  
Allows the app to read your tenant's acquired telephone number details, without a signed-in user. Acquired telephone numbers may include attributes related to assigned object, emergency location, network site, etc.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all teamstelephonenumber
const data = await graphClient
  .api('/teamstelephonenumber')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/teamstelephonenumber')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/teamstelephonenumber';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### TeamsTelephoneNumber.ReadWrite.All

**Permission ID:** `0a42382f-155c-4eb1-9bdc-21548ccaa387`  
**Display Name:** Read and Modify Tenant-Acquired Telephone Number Details  
**Assigned Date:** 2025-11-23 17:44:43

**Description:**  
Allows the app to read your tenant's acquired telephone number details, without a signed-in user. Acquired telephone numbers may include attributes related to assigned object, emergency location, network site, etc.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new teamstelephonenumber
const result = await graphClient
  .api('/teamstelephonenumber')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get teamstelephonenumber with filters
const data = await graphClient
  .api('/teamstelephonenumber')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing teamstelephonenumber
await graphClient
  .api('/teamstelephonenumber/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### Teamwork

#### Teamwork.Migrate.All

**Permission ID:** `dfb0dd15-61de-45b2-be36-d6a69fba3c79`  
**Display Name:** Create chat and channel messages with anyone's identity and with any timestamp  
**Assigned Date:** 2025-11-23 19:35:33

**Description:**  
Allows the app to create chat and channel messages, without a signed in user. The app specifies which user appears as the sender, and can backdate the message to appear as if it was sent long ago. The messages can be sent to any chat or channel in the organization.

**Usage Examples:**

```javascript
// Execute teamwork operation
const result = await graphClient
  .api('/teamwork')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### User

#### User.ReadBasic.All

**Permission ID:** `97235f07-e226-4f63-ace3-39588e11d3a1`  
**Display Name:** Read all users' basic profiles  
**Assigned Date:** 2025-11-23 19:35:34

**Description:**  
Allows the app to read a basic set of profile properties of other users in your organization without a signed-in user. Includes display name, first and last name, email address, open extensions, and photo.

**Usage Examples:**

1. **List Resources**
```javascript
// Get all user
const data = await graphClient
  .api('/user')
  .get();

console.log(`Found ${data.value.length} items`);
```

2. **Query with Filters**
```javascript
// Filter and search
const filtered = await graphClient
  .api('/user')
  .filter("property eq 'value'")
  .orderby('createdDateTime desc')
  .top(20)
  .get();
```

3. **Export Data**
```javascript
// Export for reporting
const allData = [];
let nextLink = '/user';

while (nextLink) {
  const response = await graphClient.api(nextLink).get();
  allData.push(...response.value);
  nextLink = response['@odata.nextLink'];
}

// Generate report
console.log(`Exported ${allData.length} records`);
```

**Common Use Cases:**

- Reporting and analytics
- Compliance auditing
- Data export and archival
- Integration with dashboards
- Monitoring and alerts

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### User.ReadWrite.All

**Permission ID:** `741f803b-c850-494e-b5df-cde7c675a1ca`  
**Display Name:** Read and write all users' full profiles  
**Assigned Date:** 2025-11-23 17:44:47

**Description:**  
Allows the app to read and update user profiles without a signed in user.

**Usage Examples:**

1. **Create New User**
```javascript
// Provision a new user account
const newUser = await graphClient
  .api('/users')
  .post({
    accountEnabled: true,
    displayName: 'John Doe',
    mailNickname: 'johnd',
    userPrincipalName: 'john.doe@company.com',
    passwordProfile: {
      forceChangePasswordNextSignIn: true,
      password: 'TempPassword123!'
    },
    department: 'Engineering',
    jobTitle: 'Software Engineer'
  });
```

2. **Update User Properties**
```javascript
// Update user department and manager
await graphClient
  .api(`/users/{userId}`)
  .patch({
    department: 'Marketing',
    jobTitle: 'Marketing Manager',
    officeLocation: 'Building 2, Floor 3'
  });

// Assign manager
await graphClient
  .api(`/users/{userId}/manager/$ref`)
  .put({
    '@odata.id': `https://graph.microsoft.com/v1.0/users/{managerId}`
  });
```

3. **Bulk User Operations**
```javascript
// Get all users in a department
const users = await graphClient
  .api('/users')
  .filter("department eq 'Sales'")
  .select('id,displayName,mail,jobTitle')
  .get();

// Update all users' property
for (const user of users.value) {
  await graphClient
    .api(`/users/${user.id}`)
    .patch({
      companyName: 'Acme Corp - Updated'
    });
}
```

**Common Use Cases:**

- **User Onboarding:** Automate new employee account creation
- **Directory Synchronization:** Sync user data with HR systems
- **Organizational Changes:** Update user information during reorganizations
- **Offboarding:** Disable accounts and transfer data when employees leave
- **Bulk Updates:** Apply changes to multiple users simultaneously

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---

#### User.RevokeSessions.All

**Permission ID:** `77f3a031-c388-4f99-b373-dc68676a979e`  
**Display Name:** Revoke all sign in sessions for a user  
**Assigned Date:** 2025-11-23 19:35:34

**Description:**  
Allow the app to revoke all sign in sessions for a user, without a signed-in user.

**Usage Examples:**

```javascript
// Execute user operation
const result = await graphClient
  .api('/user')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### User-Mail

#### User-Mail.ReadWrite.All

**Permission ID:** `280d0935-0796-47d1-8d26-273470a3f17a`  
**Display Name:** Read and write all secondary mail addresses for users  
**Assigned Date:** 2025-11-23 17:44:46

**Description:**  
Allows the app to read and write secondary mail addresses for all users, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new user/mail
const result = await graphClient
  .api('/user/mail')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get user/mail with filters
const data = await graphClient
  .api('/user/mail')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing user/mail
await graphClient
  .api('/user/mail/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Privacy Concern:** May contain personal or confidential information
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### User-OnPremisesSyncBehavior

#### User-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `a94a502d-0281-4d15-8cd2-682ac9362c4c`  
**Display Name:** Read and update the on-premises sync behavior of users  
**Assigned Date:** 2025-11-23 17:44:46

**Description:**  
Allows the app to update the on-premises sync behavior of all users without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new user/onpremisessyncbehavior
const result = await graphClient
  .api('/user/onpremisessyncbehavior')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get user/onpremisessyncbehavior with filters
const data = await graphClient
  .api('/user/onpremisessyncbehavior')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing user/onpremisessyncbehavior
await graphClient
  .api('/user/onpremisessyncbehavior/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### User-Phone

#### User-Phone.ReadWrite.All

**Permission ID:** `86ceff06-c822-49ff-989a-d912845ffe69`  
**Display Name:** Read and write all user mobile phone and business phones  
**Assigned Date:** 2025-11-23 17:44:47

**Description:**  
Allows the app to read and write the mobile phone and business phones for all users, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new user/phone
const result = await graphClient
  .api('/user/phone')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get user/phone with filters
const data = await graphClient
  .api('/user/phone')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing user/phone
await graphClient
  .api('/user/phone/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### UserAuthMethod-External

#### UserAuthMethod-External.ReadWrite.All

**Permission ID:** `c7a22c2e-5b01-4129-8159-6c8be2c78f16`  
**Display Name:** Read and write all users' external authentication methods  
**Assigned Date:** 2025-11-23 17:44:48

**Description:**  
Allows the application to read and write external authentication methods of all users in your organization, without a signed-in user. This does not allow the app to see secret information like passwords, or to sign-in or otherwise use the authentication methods.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new userauthmethod/external
const result = await graphClient
  .api('/userauthmethod/external')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get userauthmethod/external with filters
const data = await graphClient
  .api('/userauthmethod/external')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing userauthmethod/external
await graphClient
  .api('/userauthmethod/external/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Security Impact:** Affects identity and access management
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### VirtualAppointmentNotification

#### VirtualAppointmentNotification.Send

**Permission ID:** `97e45b36-1250-48e4-bd70-2df6dab7e94a`  
**Display Name:** Send notification regarding virtual appointments as any user  
**Assigned Date:** 2025-11-23 17:44:52

**Description:**  
Allows the application to send notification regarding virtual appointments as any user, without a signed-in user. The app must also be authorized to access an individual user's data by the online meetings application access policy.

**Usage Examples:**

```javascript
// Execute virtualappointmentnotification operation
const result = await graphClient
  .api('/virtualappointmentnotification')
  .post({
    // operation parameters
  });
```

**Common Use Cases:**

- Specialized operations
- Workflow automation
- System integration
- Administrative tasks

**Security Considerations:**

- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


### WorkforceIntegration

#### WorkforceIntegration.ReadWrite.All

**Permission ID:** `202bf709-e8e6-478e-bcfd-5d63c50b68e3`  
**Display Name:** Read and write workforce integrations  
**Assigned Date:** 2025-11-23 17:44:53

**Description:**  
Allows the app to manage workforce integrations to synchronize data from Microsoft Teams Shifts, without a signed-in user.

**Usage Examples:**

1. **Create Resource**
```javascript
// Create new workforceintegration
const result = await graphClient
  .api('/workforceintegration')
  .post({
    // resource properties
    displayName: 'Example',
    description: 'Created via API'
  });
```

2. **Read Resource**
```javascript
// Get workforceintegration with filters
const data = await graphClient
  .api('/workforceintegration')
  .filter("property eq 'value'")
  .select('id,displayName')
  .top(50)
  .get();
```

3. **Update Resource**
```javascript
// Update existing workforceintegration
await graphClient
  .api('/workforceintegration/{id}')
  .patch({
    displayName: 'Updated Name',
    // other properties
  });
```

**Common Use Cases:**

- Automated provisioning and deprovisioning
- Integration with business workflows
- Bulk operations and migrations
- Synchronization with external systems

**Security Considerations:**

- **🔴 High Privilege:** Organization-wide access - implement strict controls
- **Data Modification:** Can alter organizational data - require approval workflows
- **Audit Logging:** Log all API calls for compliance and security
- **Least Privilege:** Only grant if absolutely necessary for application function
- **Regular Review:** Review usage quarterly and remove if no longer needed
- **Monitoring:** Set up alerts for unusual activity patterns

---


## Best Practices

### Application Development

1. **Error Handling**
   - Implement retry logic with exponential backoff
   - Handle rate limiting (HTTP 429) gracefully
   - Log errors with correlation IDs for debugging

2. **Performance Optimization**
   - Use batch requests to combine multiple operations
   - Implement caching for frequently accessed data
   - Use delta queries to track changes efficiently
   - Select only required fields to minimize payload

3. **Security Implementation**
   - Store credentials in Azure Key Vault
   - Use Managed Identities when possible
   - Implement certificate-based authentication
   - Rotate secrets regularly (90 days maximum)

### Permission Management

1. **Just-in-Time Access**
   - Request permissions only when needed
   - Implement time-limited grants for sensitive operations
   - Use separate service principals for different functions

2. **Separation of Duties**
   - Split permissions across multiple app registrations
   - Use different principals for read vs. write operations
   - Implement approval workflows for privilege escalation

3. **Environment Isolation**
   - Separate credentials for Dev/Test/Prod
   - Different permission sets per environment
   - Test with minimum permissions in development

### Monitoring and Compliance

1. **Continuous Monitoring**
   - Track API usage patterns and trends
   - Alert on unusual activity (bulk operations, after-hours access)
   - Monitor for failed authentication attempts
   - Track permission changes

2. **Regular Audits**
   - Quarterly review of all granted permissions
   - Remove unused permissions
   - Verify business justification still valid
   - Check for least-privilege violations

3. **Documentation**
   - Maintain permission usage matrix
   - Document business justification for each permission
   - Keep runbooks for incident response
   - Track permission request and approval history

---

## Compliance Frameworks

### SOC 2 Type II

**Requirements:**
- Access controls and authorization
- Audit logging and monitoring
- Change management procedures
- Incident response planning

**Implementation:**
- All high-privilege permissions require approval
- Comprehensive audit logs retained for 1+ years
- Quarterly access reviews
- Documented incident response procedures

### ISO 27001

**Requirements:**
- Information security management
- Access control policy
- Cryptographic controls
- Security monitoring

**Implementation:**
- Permissions mapped to job roles
- Encryption for data at rest and in transit
- Real-time security monitoring
- Regular security assessments

### GDPR (General Data Protection Regulation)

**Requirements:**
- Data protection by design
- Right to access and deletion
- Data breach notification
- Privacy impact assessments

**Implementation:**
- Minimize data collection and retention
- Implement data subject rights workflows
- 72-hour breach notification procedure
- Privacy impact assessment for new features

### HIPAA (Health Insurance Portability and Accountability Act)

**Requirements:**
- Protected health information (PHI) safeguards
- Access controls and audit trails
- Encryption requirements
- Business associate agreements

**Implementation:**
- Additional encryption for health data
- Comprehensive audit logging
- Access restricted to authorized users only
- BAA in place with Microsoft

---

## Additional Resources

### Microsoft Documentation

- [Microsoft Graph API Documentation](https://docs.microsoft.com/graph/)
- [Graph API Permissions Reference](https://docs.microsoft.com/graph/permissions-reference)
- [Best Practices for Graph API](https://docs.microsoft.com/graph/best-practices-concept)
- [Throttling Guidance](https://docs.microsoft.com/graph/throttling)

### Development Tools

- [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) - Interactive API testing
- [Graph SDKs](https://docs.microsoft.com/graph/sdks/sdks-overview) - Client libraries
- [Postman Collection](https://www.postman.com/microsoftgraph) - API collection for testing

### Security Resources

- [Azure AD Security Best Practices](https://docs.microsoft.com/azure/active-directory/fundamentals/security-operations-introduction)
- [Application Security](https://docs.microsoft.com/azure/security/fundamentals/application-security-best-practices)
- [Key Vault Documentation](https://docs.microsoft.com/azure/key-vault/)

---

## Changelog

### Version 1.0 - November 24, 2025
- Initial comprehensive documentation for {len(permissions)} Graph API permissions
- Detailed usage examples with code samples
- Security and compliance guidelines
- Best practices for permission management
- Risk-based classification system

---

## Support and Contact

For questions about these permissions:

- **Security Team:** security@company.com
- **IT Support:** itsupport@company.com
- **Compliance:** compliance@company.com

For permission requests or modifications:
1. Submit request through IT Service Portal
2. Include business justification
3. Specify required scope and duration
4. Await approval from Security and IT teams

---

*This documentation is maintained by the IT Security and Compliance team. Last updated: November 24, 2025*
