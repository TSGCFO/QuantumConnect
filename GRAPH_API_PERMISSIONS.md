# Microsoft Graph API Permissions Documentation

## Overview

This document provides comprehensive documentation for all **97 Microsoft Graph API permissions** assigned to the **employee portal** application.

**App Name:** employee portal  
**App ID:** bc9aec39-5f2a-4808-9738-959f655c4306  
**Total Permissions:** 97  
**Documentation Generated:** November 24, 2025

## Table of Contents

- [Overview](#overview)
- [Permission Statistics](#permission-statistics)
- [Quick Reference](#quick-reference)
- [Detailed Permissions](#detailed-permissions)

## Permission Statistics

| Permission Type | Count |
|----------------|-------|
| ReadWrite.All | 36 |
| Read.All | 17 |
| Other | 44 |

## Quick Reference

Below is an alphabetical list of all permissions:

- `APIConnectors.ReadWrite.All` - Read and write API connectors for authentication flows
- `AccessReview.ReadWrite.Membership` - Manage access reviews for group and app memberships
- `Acronym.Read.All` - Read all acronyms
- `AgentCardManifest.ReadWrite.All` - Read and write all agent card manifests in Agent Registry
- `Application-RemoteDesktopConfig.ReadWrite.All` - Read and write the remote desktop security configuration for all apps
- `AuditLogsQuery-Exchange.Read.All` - Read audit logs data from Exchange workload
- `BackupRestore-Monitor.Read.All` - Read all monitoring, quota and billing information for the tenant
- `Bookings.Manage.All` - Manage bookings information
- `Bookings.ReadWrite.All` - Read and write bookings information
- `Bookmark.Read.All` - Read all bookmarks
- `BusinessScenarioData.ReadWrite.OwnedBy` - Read and write data for all business scenarios this app creates or owns
- `CallAiInsights.Read.All` - Read all AI Insights for calls.
- `Calls.JoinGroupCall.All` - Join group calls and meetings as an app
- `Channel.Delete.All` - Delete channels
- `Chat.UpdatePolicyViolation.All` - Flag chat messages for violating policy
- `Community.ReadWrite.All` - Read and write all Viva Engage communities
- `Contacts-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of contacts
- `CustomAuthenticationExtension.Receive.Payload` - Receive custom authentication extension HTTP requests
- `CustomSecAttributeDefinition.ReadWrite.All` - Read and write custom security attribute definitions
- `CustomTags.ReadWrite.All` - Read and write custom tags data
- `Device.ReadWrite.All` - Read and write devices
- `DeviceTemplate.Create` - Create device template
- `DirectoryRecommendations.ReadWrite.All` - Read and update all Azure AD recommendations
- `Domain.ReadWrite.All` - Read and write domains
- `ExternalConnection.ReadWrite.OwnedBy` - Read and write external connections
- `ExternalItem.ReadWrite.OwnedBy` - Read and write external items
- `FileIngestion.Ingest` - Ingest SharePoint and OneDrive content to make it available in the search index
- `FileIngestionHybridOnboarding.Manage` - Manage onboarding for a Hybrid Cloud tenant
- `Files.ReadWrite.AppFolder` - Have full access to the application's folder without a signed in user.
- `Group-Conversation.ReadWrite.All` - Read and write all group conversations
- `Group-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of groups
- `IdentityRiskEvent.ReadWrite.All` - Read and write all risk detection information
- `IdentityUserFlow.ReadWrite.All` - Read and write all identity user flows
- `IndustryData-DataConnector.ReadWrite.All` - Manage data connector definitions
- `IndustryData-InboundFlow.ReadWrite.All` - Manage inbound flow definitions
- `IndustryData-Run.Read.All` - View current and previous runs
- `Mail.ReadWrite` - Read and write mail in all mailboxes
- `MultiTenantOrganization.ReadWrite.All` - Read and write all multi-tenant organization details and tenants
- `OnlineMeetingAiInsight.Read.Chat` - Read all AI Insights for online meetings where the Teams application is installed.
- `OnlineMeetingArtifact.Read.All` - Read online meeting artifacts
- `OnlineMeetings.ReadWrite.All` - Read and create online meetings
- `OrgContact.Read.All` - Read organizational contacts
- `OrgSettings-DynamicsVoice.ReadWrite.All` - Read and write organization-wide Dynamics customer voice settings
- `OrgSettings-Microsoft365Install.ReadWrite.All` - Read and write organization-wide Microsoft 365 apps installation settings
- `Place.Read.All` - Read all company places
- `PlaceDevice.ReadWrite.All` - Read and write all workplace devices
- `Policy.Read.AuthenticationMethod` - Read authentication method policies
- `Policy.Read.ConditionalAccess` - Read your organization's conditional access policies
- `Policy.Read.DeviceConfiguration` - Read your organization's device configuration policies
- `Policy.Read.PermissionGrant` - Read consent and permission grant policies
- `Policy.ReadWrite.AuthenticationFlows` - Read and write authentication flow policies
- `Policy.ReadWrite.AuthenticationMethod` - Read and write all authentication method policies
- `Policy.ReadWrite.ConditionalAccess` - Read and write your organization's conditional access policies
- `Policy.ReadWrite.FedTokenValidation` - Read and write your organization's federated token validation policy
- `Policy.ReadWrite.IdentityProtection` - Read and write your organization’s identity protection policy
- `Policy.ReadWrite.PermissionGrant` - Manage consent and permission grant policies
- `Presence.ReadWrite.All` - Read and write presence information for all users
- `ProtectionScopes.Compute.All` - Compute Purview policies at tenant scope
- `PublicKeyInfrastructure.ReadWrite.All` - Read and write all certificate based authentication configurations
- `RealTimeActivityFeed.Read.All` - Access real-time enriched data in a meeting as an app
- `RoleAssignmentSchedule.Remove.Directory` - Delete all active role assignments of your company's directory
- `RoleEligibilitySchedule.ReadWrite.Directory` - Read, update, and delete all eligible role assignments and schedules for your company's directory
- `RoleManagement.ReadWrite.Defender` - Read M365 Defender RBAC configuration
- `RoleManagement.ReadWrite.Exchange` - Read and write Exchange Online RBAC configuration
- `RoleManagementAlert.ReadWrite.Directory` - Read all alert data, configure alerts, and take actions on all alerts for your company's directory
- `RoleManagementPolicy.ReadWrite.Directory` - Read, update, and delete all policies for privileged role assignments of your company's directory
- `Schedule.ReadWrite.All` - Read and write all schedule items
- `SchedulePermissions.ReadWrite.All` - Read/Write schedule permissions for a role
- `SecurityIdentitiesUserActions.ReadWrite.All` - Read and perform all identity security available user actions
- `ServiceActivity-Exchange.Read.All` - Read all Exchange service activity
- `ServiceActivity-Microsoft365Web.Read.All` - Read all Microsoft 365 Web service activity
- `ServiceActivity-Teams.Read.All` - Read all Teams service activity
- `SharePointTenantSettings.ReadWrite.All` - Read and change SharePoint and OneDrive tenant settings
- `Sites.Selected` - Access selected site collections
- `SynchronizationData-User.Upload` - Upload user data to the identity synchronization service
- `TeamMember.ReadWriteNonOwnerRole.All` - Add and remove members with non-owner role for all teams
- `TeamSettings.ReadWrite.All` - Read and change all teams' settings
- `TeamsActivity.Read.All` - Read all users' teamwork activity feed
- `TeamsAppInstallation.ManageSelectedForUser.All` - Manage installation and permission grants of selected Teams apps for all user accounts
- `TeamsAppInstallation.ReadForChat.All` - Read installed Teams apps for all chats
- `TeamsAppInstallation.ReadForUser.All` - Read installed Teams apps for all users
- `TeamsAppInstallation.ReadWriteAndConsentSelfForChat.All` - Allow the Teams app to manage itself and its permission grants for all chats
- `TeamsResourceAccount.Read.All` - Read Teams resource accounts
- `TeamsTab.Read.All` - Read tabs in Microsoft Teams.
- `TeamsTab.ReadWriteForChat.All` - Allow the Teams app to manage all tabs for all chats
- `TeamsTelephoneNumber.Read.All` - Read Tenant-Acquired Telephone Number Details
- `TeamsTelephoneNumber.ReadWrite.All` - Read and Modify Tenant-Acquired Telephone Number Details
- `Teamwork.Migrate.All` - Create chat and channel messages with anyone's identity and with any timestamp
- `User-Mail.ReadWrite.All` - Read and write all secondary mail addresses for users
- `User-OnPremisesSyncBehavior.ReadWrite.All` - Read and update the on-premises sync behavior of users
- `User-Phone.ReadWrite.All` - Read and write all user mobile phone and business phones
- `User.ReadBasic.All` - Read all users' basic profiles
- `User.ReadWrite.All` - Read and write all users' full profiles
- `User.RevokeSessions.All` - Revoke all sign in sessions for a user
- `UserAuthMethod-External.ReadWrite.All` - Read and write all users' external authentication methods
- `VirtualAppointmentNotification.Send` - Send notification regarding virtual appointments as any user
- `WorkforceIntegration.ReadWrite.All` - Read and write workforce integrations

## Detailed Permissions


### APIConnectors

#### APIConnectors.ReadWrite.All

**Permission ID:** `1dfe531a-24a6-4f1b-80f4-7a0dc5a0a171`  
**Display Name:** Read and write API connectors for authentication flows  
**Assigned Date:** 2025-11-23 17:43:31

**Description:**  
Allows the app to read, create and manage the API connectors used in user authentication flows, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update apiconnectors
const result = await graphClient
  .api('/apiconnectors')
  .post({
    // resource properties
  });

// Read apiconnectors
const data = await graphClient
  .api('/apiconnectors')
  .get();

// Update apiconnectors
await graphClient
  .api('/apiconnectors/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### AccessReview

#### AccessReview.ReadWrite.Membership

**Permission ID:** `18228521-a591-40f1-b215-5fad4488c117`  
**Display Name:** Manage access reviews for group and app memberships  
**Assigned Date:** 2025-11-23 17:43:28

**Description:**  
Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization for group and app memberships, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update accessreview
const result = await graphClient
  .api('/accessreview')
  .post({
    // resource properties
  });

// Read accessreview
const data = await graphClient
  .api('/accessreview')
  .get();

// Update accessreview
await graphClient
  .api('/accessreview/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Acronym

#### Acronym.Read.All

**Permission ID:** `8c0aed2c-0c61-433d-b63c-6370ddc73248`  
**Display Name:** Read all acronyms  
**Assigned Date:** 2025-11-23 17:43:28

**Description:**  
Allows an app to read all acronyms without a signed-in user.

**Usage Examples:**

```javascript
// Read acronym data
const data = await graphClient
  .api('/acronym')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/acronym')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### AgentCardManifest

#### AgentCardManifest.ReadWrite.All

**Permission ID:** `228b1a03-f7ca-4348-b50d-e8a547ab61af`  
**Display Name:** Read and write all agent card manifests in Agent Registry  
**Assigned Date:** 2025-11-23 17:43:29

**Description:**  
Allows the app to read and write to all agent card manifests in your organization's Agent Registry without a signed-in user.

**Usage Examples:**

```javascript
// Create or update agentcardmanifest
const result = await graphClient
  .api('/agentcardmanifest')
  .post({
    // resource properties
  });

// Read agentcardmanifest
const data = await graphClient
  .api('/agentcardmanifest')
  .get();

// Update agentcardmanifest
await graphClient
  .api('/agentcardmanifest/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Application-RemoteDesktopConfig

#### Application-RemoteDesktopConfig.ReadWrite.All

**Permission ID:** `3be0012a-cc4e-426b-895b-f9c836bf6381`  
**Display Name:** Read and write the remote desktop security configuration for all apps  
**Assigned Date:** 2025-11-23 17:43:31

**Description:**  
Allows the app to read and write the remote desktop security configuration for all apps in your organization, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update application-remotedesktopconfig
const result = await graphClient
  .api('/application-remotedesktopconfig')
  .post({
    // resource properties
  });

// Read application-remotedesktopconfig
const data = await graphClient
  .api('/application-remotedesktopconfig')
  .get();

// Update application-remotedesktopconfig
await graphClient
  .api('/application-remotedesktopconfig/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### AuditLogsQuery-Exchange

#### AuditLogsQuery-Exchange.Read.All

**Permission ID:** `6b0d2622-d34e-4470-935b-b96550e5ca8d`  
**Display Name:** Read audit logs data from Exchange workload  
**Assigned Date:** 2025-11-23 17:43:34

**Description:**  
Allows the app to read and query audit logs from Exchange workload, without a signed-in user

**Usage Examples:**

```javascript
// Read auditlogsquery-exchange data
const data = await graphClient
  .api('/auditlogsquery-exchange')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/auditlogsquery-exchange')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### BackupRestore-Monitor

#### BackupRestore-Monitor.Read.All

**Permission ID:** `ecae8511-f2d7-4be4-bdbf-91f244d45986`  
**Display Name:** Read all monitoring, quota and billing information for the tenant  
**Assigned Date:** 2025-11-23 17:43:35

**Description:**  
Allows the app to monitor all backup and restore jobs, view quota usage and billing details, without a signed-in user.

**Usage Examples:**

```javascript
// Read backuprestore-monitor data
const data = await graphClient
  .api('/backuprestore-monitor')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/backuprestore-monitor')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/bookings')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Bookings.ReadWrite.All

**Permission ID:** `0c4b2d20-7919-468d-8668-c54b09d4dee8`  
**Display Name:** Read and write bookings information  
**Assigned Date:** 2025-11-23 17:43:37

**Description:**  
Allows an app to read and write bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user. Does not allow create, delete and publish of booking businesses.

**Usage Examples:**

```javascript
// Create or update bookings
const result = await graphClient
  .api('/bookings')
  .post({
    // resource properties
  });

// Read bookings
const data = await graphClient
  .api('/bookings')
  .get();

// Update bookings
await graphClient
  .api('/bookings/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Bookmark

#### Bookmark.Read.All

**Permission ID:** `be95e614-8ef3-49eb-8464-1c9503433b86`  
**Display Name:** Read all bookmarks  
**Assigned Date:** 2025-11-23 17:43:37

**Description:**  
Allows an app to read all bookmarks without a signed-in user.

**Usage Examples:**

```javascript
// Read bookmark data
const data = await graphClient
  .api('/bookmark')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/bookmark')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### BusinessScenarioData

#### BusinessScenarioData.ReadWrite.OwnedBy

**Permission ID:** `f2d21f22-5d80-499e-91cc-0a8a4ce16f54`  
**Display Name:** Read and write data for all business scenarios this app creates or owns  
**Assigned Date:** 2025-11-23 17:43:38

**Description:**  
Allows the app to fully manage the data associated with the business scenarios it owns, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update businessscenariodata
const result = await graphClient
  .api('/businessscenariodata')
  .post({
    // resource properties
  });

// Read businessscenariodata
const data = await graphClient
  .api('/businessscenariodata')
  .get();

// Update businessscenariodata
await graphClient
  .api('/businessscenariodata/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### CallAiInsights

#### CallAiInsights.Read.All

**Permission ID:** `792b782b-7822-4b92-8103-77e44f2f706c`  
**Display Name:** Read all AI Insights for calls.  
**Assigned Date:** 2025-11-23 17:43:38

**Description:**  
Allows the app to read all AI Insights for all calls, without a signed-in user.

**Usage Examples:**

```javascript
// Read callaiinsights data
const data = await graphClient
  .api('/callaiinsights')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/callaiinsights')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/calls')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/channel')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/chat')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Community

#### Community.ReadWrite.All

**Permission ID:** `35d59e32-eab5-4553-9345-abb62b4c703c`  
**Display Name:** Read and write all Viva Engage communities  
**Assigned Date:** 2025-11-23 17:43:44

**Description:**  
Allows the app to create Viva Engage communities, read all community properties, update community properties, and delete communities without a signed-in user.

**Usage Examples:**

```javascript
// Create or update community
const result = await graphClient
  .api('/community')
  .post({
    // resource properties
  });

// Read community
const data = await graphClient
  .api('/community')
  .get();

// Update community
await graphClient
  .api('/community/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Contacts-OnPremisesSyncBehavior

#### Contacts-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `c8948c23-e66b-42db-83fd-770b71ab78d2`  
**Display Name:** Read and update the on-premises sync behavior of contacts  
**Assigned Date:** 2025-11-23 17:43:45

**Description:**  
Allows the app to update the on-premises sync behavior of all contacts in all mailboxes without a signed-in user.

**Usage Examples:**

```javascript
// Create or update contacts-onpremisessyncbehavior
const result = await graphClient
  .api('/contacts-onpremisessyncbehavior')
  .post({
    // resource properties
  });

// Read contacts-onpremisessyncbehavior
const data = await graphClient
  .api('/contacts-onpremisessyncbehavior')
  .get();

// Update contacts-onpremisessyncbehavior
await graphClient
  .api('/contacts-onpremisessyncbehavior/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/customauthenticationextension')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### CustomSecAttributeDefinition

#### CustomSecAttributeDefinition.ReadWrite.All

**Permission ID:** `12338004-21f4-4896-bf5e-b75dfaf1016d`  
**Display Name:** Read and write custom security attribute definitions  
**Assigned Date:** 2025-11-23 17:43:47

**Description:**  
Allows the app to read and write custom security attribute definitions for the tenant without a signed in user.

**Usage Examples:**

```javascript
// Create or update customsecattributedefinition
const result = await graphClient
  .api('/customsecattributedefinition')
  .post({
    // resource properties
  });

// Read customsecattributedefinition
const data = await graphClient
  .api('/customsecattributedefinition')
  .get();

// Update customsecattributedefinition
await graphClient
  .api('/customsecattributedefinition/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### CustomTags

#### CustomTags.ReadWrite.All

**Permission ID:** `2f503208-e509-4e39-974c-8cc16e5785c9`  
**Display Name:** Read and write custom tags data  
**Assigned Date:** 2025-11-23 17:43:48

**Description:**  
Read and write custom tags data, without a signed-in user

**Usage Examples:**

```javascript
// Create or update customtags
const result = await graphClient
  .api('/customtags')
  .post({
    // resource properties
  });

// Read customtags
const data = await graphClient
  .api('/customtags')
  .get();

// Update customtags
await graphClient
  .api('/customtags/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Device

#### Device.ReadWrite.All

**Permission ID:** `1138cb37-bd11-4084-a2b7-9f71582aeddb`  
**Display Name:** Read and write devices  
**Assigned Date:** 2025-11-23 17:43:49

**Description:**  
Allows the app to read and write all device properties without a signed in user.  Does not allow device creation, device deletion or update of device alternative security identifiers.

**Usage Examples:**

```javascript
// Create or update device
const result = await graphClient
  .api('/device')
  .post({
    // resource properties
  });

// Read device
const data = await graphClient
  .api('/device')
  .get();

// Update device
await graphClient
  .api('/device/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/devicetemplate')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### DirectoryRecommendations

#### DirectoryRecommendations.ReadWrite.All

**Permission ID:** `0e9eea12-4f01-45f6-9b8d-3ea4c8144158`  
**Display Name:** Read and update all Azure AD recommendations  
**Assigned Date:** 2025-11-23 17:43:51

**Description:**  
Allows the app to read and update all Azure AD recommendations, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update directoryrecommendations
const result = await graphClient
  .api('/directoryrecommendations')
  .post({
    // resource properties
  });

// Read directoryrecommendations
const data = await graphClient
  .api('/directoryrecommendations')
  .get();

// Update directoryrecommendations
await graphClient
  .api('/directoryrecommendations/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Domain

#### Domain.ReadWrite.All

**Permission ID:** `7e05723c-0bb0-42da-be95-ae9f08a6e53c`  
**Display Name:** Read and write domains  
**Assigned Date:** 2025-11-23 17:43:52

**Description:**  
Allows the app to read and write all domain properties without a signed in user.  Also allows the app to add,  verify and remove domains.

**Usage Examples:**

```javascript
// Create or update domain
const result = await graphClient
  .api('/domain')
  .post({
    // resource properties
  });

// Read domain
const data = await graphClient
  .api('/domain')
  .get();

// Update domain
await graphClient
  .api('/domain/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### ExternalConnection

#### ExternalConnection.ReadWrite.OwnedBy

**Permission ID:** `f431331c-49a6-499f-be1c-62af19c34a9d`  
**Display Name:** Read and write external connections  
**Assigned Date:** 2025-11-23 17:43:56

**Description:**  
Allows the app to read and write external connections without a signed-in user. The app can only read and write external connections that it is authorized to, or it can create new external connections.

**Usage Examples:**

```javascript
// Create or update externalconnection
const result = await graphClient
  .api('/externalconnection')
  .post({
    // resource properties
  });

// Read externalconnection
const data = await graphClient
  .api('/externalconnection')
  .get();

// Update externalconnection
await graphClient
  .api('/externalconnection/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### ExternalItem

#### ExternalItem.ReadWrite.OwnedBy

**Permission ID:** `8116ae0f-55c2-452d-9944-d18420f5b2c8`  
**Display Name:** Read and write external items  
**Assigned Date:** 2025-11-23 17:43:57

**Description:**  
Allows the app to read and write external items without a signed-in user. The app can only read external items of the connection that it is authorized to.

**Usage Examples:**

```javascript
// Create or update externalitem
const result = await graphClient
  .api('/externalitem')
  .post({
    // resource properties
  });

// Read externalitem
const data = await graphClient
  .api('/externalitem')
  .get();

// Update externalitem
await graphClient
  .api('/externalitem/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/fileingestion')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/fileingestionhybridonboarding')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Files

#### Files.ReadWrite.AppFolder

**Permission ID:** `b47b160b-1054-4efd-9ca0-e2f614696086`  
**Display Name:** Have full access to the application's folder without a signed in user.  
**Assigned Date:** 2025-11-23 17:43:58

**Description:**  
Allows the app to read, create, update and delete files in the application's folder without a signed in user.

**Usage Examples:**

```javascript
// Create or update files
const result = await graphClient
  .api('/files')
  .post({
    // resource properties
  });

// Read files
const data = await graphClient
  .api('/files')
  .get();

// Update files
await graphClient
  .api('/files/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Group-Conversation

#### Group-Conversation.ReadWrite.All

**Permission ID:** `6679c91b-820a-4900-ab47-e97b197a89c4`  
**Display Name:** Read and write all group conversations  
**Assigned Date:** 2025-11-23 17:43:59

**Description:**  
Allows the app to read and write conversations of the groups this app has access to without a signed-in user.

**Usage Examples:**

```javascript
// Create or update group-conversation
const result = await graphClient
  .api('/group-conversation')
  .post({
    // resource properties
  });

// Read group-conversation
const data = await graphClient
  .api('/group-conversation')
  .get();

// Update group-conversation
await graphClient
  .api('/group-conversation/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Group-OnPremisesSyncBehavior

#### Group-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `2d9bd318-b883-40be-9df7-63ec4fcdc424`  
**Display Name:** Read and update the on-premises sync behavior of groups  
**Assigned Date:** 2025-11-23 17:43:59

**Description:**  
Allows the app to update the on-premises sync behavior of all groups without a signed-in user.

**Usage Examples:**

```javascript
// Create or update group-onpremisessyncbehavior
const result = await graphClient
  .api('/group-onpremisessyncbehavior')
  .post({
    // resource properties
  });

// Read group-onpremisessyncbehavior
const data = await graphClient
  .api('/group-onpremisessyncbehavior')
  .get();

// Update group-onpremisessyncbehavior
await graphClient
  .api('/group-onpremisessyncbehavior/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### IdentityRiskEvent

#### IdentityRiskEvent.ReadWrite.All

**Permission ID:** `db06fb33-1953-4b7b-a2ac-f1e2c854f7ae`  
**Display Name:** Read and write all risk detection information  
**Assigned Date:** 2025-11-23 17:44:00

**Description:**  
Allows the app to read and update identity risk detection information for your organization without a signed-in user. Update operations include confirming risk event detections.

**Usage Examples:**

```javascript
// Create or update identityriskevent
const result = await graphClient
  .api('/identityriskevent')
  .post({
    // resource properties
  });

// Read identityriskevent
const data = await graphClient
  .api('/identityriskevent')
  .get();

// Update identityriskevent
await graphClient
  .api('/identityriskevent/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### IdentityUserFlow

#### IdentityUserFlow.ReadWrite.All

**Permission ID:** `65319a09-a2be-469d-8782-f6b07debf789`  
**Display Name:** Read and write all identity user flows  
**Assigned Date:** 2025-11-23 19:35:15

**Description:**  
Allows the app to read or write your organization's user flows, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update identityuserflow
const result = await graphClient
  .api('/identityuserflow')
  .post({
    // resource properties
  });

// Read identityuserflow
const data = await graphClient
  .api('/identityuserflow')
  .get();

// Update identityuserflow
await graphClient
  .api('/identityuserflow/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### IndustryData-DataConnector

#### IndustryData-DataConnector.ReadWrite.All

**Permission ID:** `eda0971c-482e-4345-b28f-69c309cb8a34`  
**Display Name:** Manage data connector definitions  
**Assigned Date:** 2025-11-23 17:44:01

**Description:**  
Allows the app to read and write data connectors without a signed-in user.

**Usage Examples:**

```javascript
// Create or update industrydata-dataconnector
const result = await graphClient
  .api('/industrydata-dataconnector')
  .post({
    // resource properties
  });

// Read industrydata-dataconnector
const data = await graphClient
  .api('/industrydata-dataconnector')
  .get();

// Update industrydata-dataconnector
await graphClient
  .api('/industrydata-dataconnector/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### IndustryData-InboundFlow

#### IndustryData-InboundFlow.ReadWrite.All

**Permission ID:** `e688c61f-d4c6-4d64-a197-3bcf6ba1d6ad`  
**Display Name:** Manage inbound flow definitions  
**Assigned Date:** 2025-11-23 17:44:01

**Description:**  
Allows the app to read and write inbound data flows without a signed-in user.

**Usage Examples:**

```javascript
// Create or update industrydata-inboundflow
const result = await graphClient
  .api('/industrydata-inboundflow')
  .post({
    // resource properties
  });

// Read industrydata-inboundflow
const data = await graphClient
  .api('/industrydata-inboundflow')
  .get();

// Update industrydata-inboundflow
await graphClient
  .api('/industrydata-inboundflow/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### IndustryData-Run

#### IndustryData-Run.Read.All

**Permission ID:** `f6f5d10b-3024-4d1d-b674-aae4df4a1a73`  
**Display Name:** View current and previous runs  
**Assigned Date:** 2025-11-23 17:44:02

**Description:**  
Allows the app to read current and previous IndustryData runs without a signed-in user.

**Usage Examples:**

```javascript
// Read industrydata-run data
const data = await graphClient
  .api('/industrydata-run')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/industrydata-run')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Mail

#### Mail.ReadWrite

**Permission ID:** `e2a3a72e-5f79-4c64-b1b1-878b674786c9`  
**Display Name:** Read and write mail in all mailboxes  
**Assigned Date:** 2025-11-23 17:44:07

**Description:**  
Allows the app to create, read, update, and delete mail in all mailboxes without a signed-in user. Does not include permission to send mail.

**Usage Examples:**

```javascript
// Create or update mail
const result = await graphClient
  .api('/mail')
  .post({
    // resource properties
  });

// Read mail
const data = await graphClient
  .api('/mail')
  .get();

// Update mail
await graphClient
  .api('/mail/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### MultiTenantOrganization

#### MultiTenantOrganization.ReadWrite.All

**Permission ID:** `920def01-ca61-4d2d-b3df-105b46046a70`  
**Display Name:** Read and write all multi-tenant organization details and tenants  
**Assigned Date:** 2025-11-23 17:44:08

**Description:**  
Allows the app to read and write all multi-tenant organization details and tenants, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update multitenantorganization
const result = await graphClient
  .api('/multitenantorganization')
  .post({
    // resource properties
  });

// Read multitenantorganization
const data = await graphClient
  .api('/multitenantorganization')
  .get();

// Update multitenantorganization
await graphClient
  .api('/multitenantorganization/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OnlineMeetingAiInsight

#### OnlineMeetingAiInsight.Read.Chat

**Permission ID:** `01892c31-3b66-4bcf-b5f5-bf0a03d5ed9f`  
**Display Name:** Read all AI Insights for online meetings where the Teams application is installed.  
**Assigned Date:** 2025-11-23 17:44:10

**Description:**  
Allows the teams-app to read all aiInsights for online meetings where the Teams-app is installed, without a signed-in user.

**Usage Examples:**

```javascript
// Read onlinemeetingaiinsight data
const data = await graphClient
  .api('/onlinemeetingaiinsight')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/onlinemeetingaiinsight')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OnlineMeetingArtifact

#### OnlineMeetingArtifact.Read.All

**Permission ID:** `df01ed3b-eb61-4eca-9965-6b3d789751b2`  
**Display Name:** Read online meeting artifacts  
**Assigned Date:** 2025-11-23 17:44:11

**Description:**  
Allows the app to read online meeting artifacts in your organization, without a signed-in user.

**Usage Examples:**

```javascript
// Read onlinemeetingartifact data
const data = await graphClient
  .api('/onlinemeetingartifact')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/onlinemeetingartifact')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OnlineMeetings

#### OnlineMeetings.ReadWrite.All

**Permission ID:** `b8bb2037-6e08-44ac-a4ea-4674e010e2a4`  
**Display Name:** Read and create online meetings  
**Assigned Date:** 2025-11-23 17:44:11

**Description:**  
Allows the app to read and create online meetings as an application in your organization.

**Usage Examples:**

```javascript
// Create or update onlinemeetings
const result = await graphClient
  .api('/onlinemeetings')
  .post({
    // resource properties
  });

// Read onlinemeetings
const data = await graphClient
  .api('/onlinemeetings')
  .get();

// Update onlinemeetings
await graphClient
  .api('/onlinemeetings/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OrgContact

#### OrgContact.Read.All

**Permission ID:** `e1a88a34-94c4-4418-be12-c87b00e26bea`  
**Display Name:** Read organizational contacts  
**Assigned Date:** 2025-11-23 17:44:13

**Description:**  
Allows the app to read all organizational contacts without a signed-in user.  These contacts are managed by the organization and are different from a user's personal contacts.

**Usage Examples:**

```javascript
// Read orgcontact data
const data = await graphClient
  .api('/orgcontact')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/orgcontact')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OrgSettings-DynamicsVoice

#### OrgSettings-DynamicsVoice.ReadWrite.All

**Permission ID:** `c3f1cc32-8bbd-4ab6-bd33-f270e0d9e041`  
**Display Name:** Read and write organization-wide Dynamics customer voice settings  
**Assigned Date:** 2025-11-23 17:44:13

**Description:**  
Allows the app to read and write organization-wide Dynamics customer voice settings, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update orgsettings-dynamicsvoice
const result = await graphClient
  .api('/orgsettings-dynamicsvoice')
  .post({
    // resource properties
  });

// Read orgsettings-dynamicsvoice
const data = await graphClient
  .api('/orgsettings-dynamicsvoice')
  .get();

// Update orgsettings-dynamicsvoice
await graphClient
  .api('/orgsettings-dynamicsvoice/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### OrgSettings-Microsoft365Install

#### OrgSettings-Microsoft365Install.ReadWrite.All

**Permission ID:** `83f7232f-763c-47b2-a097-e35d2cbe1da5`  
**Display Name:** Read and write organization-wide Microsoft 365 apps installation settings  
**Assigned Date:** 2025-11-23 17:44:14

**Description:**  
Allows the app to read and write organization-wide Microsoft 365 apps installation settings, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update orgsettings-microsoft365install
const result = await graphClient
  .api('/orgsettings-microsoft365install')
  .post({
    // resource properties
  });

// Read orgsettings-microsoft365install
const data = await graphClient
  .api('/orgsettings-microsoft365install')
  .get();

// Update orgsettings-microsoft365install
await graphClient
  .api('/orgsettings-microsoft365install/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Place

#### Place.Read.All

**Permission ID:** `913b9306-0ce1-42b8-9137-6a7df690a760`  
**Display Name:** Read all company places  
**Assigned Date:** 2025-11-23 17:44:15

**Description:**  
Allows the app to read company places (conference rooms and room lists) for calendar events and other applications, without a signed-in user.

**Usage Examples:**

```javascript
// Read place data
const data = await graphClient
  .api('/place')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/place')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### PlaceDevice

#### PlaceDevice.ReadWrite.All

**Permission ID:** `2d510721-5c4e-43cd-bfdb-ac0f8819fb92`  
**Display Name:** Read and write all workplace devices  
**Assigned Date:** 2025-11-23 17:44:15

**Description:**  
Allows the app to read and write all workplace devices, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update placedevice
const result = await graphClient
  .api('/placedevice')
  .post({
    // resource properties
  });

// Read placedevice
const data = await graphClient
  .api('/placedevice')
  .get();

// Update placedevice
await graphClient
  .api('/placedevice/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Policy

#### Policy.Read.AuthenticationMethod

**Permission ID:** `8e3bc81b-d2f3-4b7b-838c-32c88218d2f0`  
**Display Name:** Read authentication method policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the app to read all authentication method policies for the tenant, without a signed-in user.

**Usage Examples:**

```javascript
// Read policy data
const data = await graphClient
  .api('/policy')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.Read.ConditionalAccess

**Permission ID:** `37730810-e9ba-4e46-b07e-8ca78d182097`  
**Display Name:** Read your organization's conditional access policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the app to read your organization's conditional access policies, without a signed-in user.

**Usage Examples:**

```javascript
// Read policy data
const data = await graphClient
  .api('/policy')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.Read.DeviceConfiguration

**Permission ID:** `bdba4817-6ba1-4a7c-8a01-be9bc7c242dd`  
**Display Name:** Read your organization's device configuration policies  
**Assigned Date:** 2025-11-23 19:35:18

**Description:**  
Allows the application to read your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.

**Usage Examples:**

```javascript
// Read policy data
const data = await graphClient
  .api('/policy')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.Read.PermissionGrant

**Permission ID:** `9e640839-a198-48fb-8b9a-013fd6f6cbcd`  
**Display Name:** Read consent and permission grant policies  
**Assigned Date:** 2025-11-23 19:35:19

**Description:**  
Allows the app to read policies related to consent and permission grants for applications, without a signed-in user.

**Usage Examples:**

```javascript
// Read policy data
const data = await graphClient
  .api('/policy')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/policy')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.AuthenticationFlows

**Permission ID:** `25f85f3c-f66c-4205-8cd5-de92dd7f0cec`  
**Display Name:** Read and write authentication flow policies  
**Assigned Date:** 2025-11-23 17:44:16

**Description:**  
Allows the app to read and write all authentication flow policies for the tenant, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.AuthenticationMethod

**Permission ID:** `29c18626-4985-4dcd-85c0-193eef327366`  
**Display Name:** Read and write all authentication method policies  
**Assigned Date:** 2025-11-23 17:44:17

**Description:**  
Allows the app to read and write all authentication method policies for the tenant, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.ConditionalAccess

**Permission ID:** `01c0a623-fc9b-48e9-b794-0756f8e8f067`  
**Display Name:** Read and write your organization's conditional access policies  
**Assigned Date:** 2025-11-23 17:44:17

**Description:**  
Allows the app to read and write your organization's conditional access policies, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.FedTokenValidation

**Permission ID:** `90bbca0b-227c-4cdc-8083-1c6cfb95bac6`  
**Display Name:** Read and write your organization's federated token validation policy  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the application to read and update the organization's federated token validation policy without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.IdentityProtection

**Permission ID:** `2dcf8603-09eb-4078-b1ec-d30a1a76b873`  
**Display Name:** Read and write your organization’s identity protection policy  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the app to read and write your organization’s identity protection policy without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### Policy.ReadWrite.PermissionGrant

**Permission ID:** `a402ca1c-2696-4531-972d-6e5ee4aa11ea`  
**Display Name:** Manage consent and permission grant policies  
**Assigned Date:** 2025-11-23 17:44:19

**Description:**  
Allows the app to manage policies related to consent and permission grants for applications, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update policy
const result = await graphClient
  .api('/policy')
  .post({
    // resource properties
  });

// Read policy
const data = await graphClient
  .api('/policy')
  .get();

// Update policy
await graphClient
  .api('/policy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Presence

#### Presence.ReadWrite.All

**Permission ID:** `83cded22-8297-4ff6-a7fa-e97e9545a259`  
**Display Name:** Read and write presence information for all users  
**Assigned Date:** 2025-11-23 17:44:20

**Description:**  
Allows the app to read all presence information and write activity and availability of all users in the directory without a signed-in user. Presence information includes activity, availability, status note, calendar out-of-office message, time zone and location.

**Usage Examples:**

```javascript
// Create or update presence
const result = await graphClient
  .api('/presence')
  .post({
    // resource properties
  });

// Read presence
const data = await graphClient
  .api('/presence')
  .get();

// Update presence
await graphClient
  .api('/presence/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/protectionscopes')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### PublicKeyInfrastructure

#### PublicKeyInfrastructure.ReadWrite.All

**Permission ID:** `a2b63618-5350-462d-b1b3-ba6eb3684e26`  
**Display Name:** Read and write all certificate based authentication configurations  
**Assigned Date:** 2025-11-23 17:44:22

**Description:**  
Allows the application to read and write certificate-based authentication configuration such as all public key infrastructures (PKI) and certificate authorities (CA) configured for the organization, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update publickeyinfrastructure
const result = await graphClient
  .api('/publickeyinfrastructure')
  .post({
    // resource properties
  });

// Read publickeyinfrastructure
const data = await graphClient
  .api('/publickeyinfrastructure')
  .get();

// Update publickeyinfrastructure
await graphClient
  .api('/publickeyinfrastructure/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### RealTimeActivityFeed

#### RealTimeActivityFeed.Read.All

**Permission ID:** `abafe00f-ea87-4c63-b8a8-0e7bb0a88144`  
**Display Name:** Access real-time enriched data in a meeting as an app  
**Assigned Date:** 2025-11-23 17:44:22

**Description:**  
Allows the app to get direct access to real-time enriched data in a meeting, without a signed-in user.

**Usage Examples:**

```javascript
// Read realtimeactivityfeed data
const data = await graphClient
  .api('/realtimeactivityfeed')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/realtimeactivityfeed')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/roleassignmentschedule')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### RoleEligibilitySchedule

#### RoleEligibilitySchedule.ReadWrite.Directory

**Permission ID:** `fee28b28-e1f3-4841-818e-2704dc62245f`  
**Display Name:** Read, update, and delete all eligible role assignments and schedules for your company's directory  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read and manage the eligible role-based access control (RBAC) assignments and schedules for your company's directory, without a signed-in user. This includes managing eligible directory role membership, and reading directory role templates, directory roles and eligible memberships.

**Usage Examples:**

```javascript
// Create or update roleeligibilityschedule
const result = await graphClient
  .api('/roleeligibilityschedule')
  .post({
    // resource properties
  });

// Read roleeligibilityschedule
const data = await graphClient
  .api('/roleeligibilityschedule')
  .get();

// Update roleeligibilityschedule
await graphClient
  .api('/roleeligibilityschedule/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### RoleManagement

#### RoleManagement.ReadWrite.Defender

**Permission ID:** `8b7e8c0a-7e9d-4049-97ec-04b5e1bcaf05`  
**Display Name:** Read M365 Defender RBAC configuration  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update rolemanagement
const result = await graphClient
  .api('/rolemanagement')
  .post({
    // resource properties
  });

// Read rolemanagement
const data = await graphClient
  .api('/rolemanagement')
  .get();

// Update rolemanagement
await graphClient
  .api('/rolemanagement/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### RoleManagement.ReadWrite.Exchange

**Permission ID:** `025d3225-3f02-4882-b4c0-cd5b541a4e80`  
**Display Name:** Read and write Exchange Online RBAC configuration  
**Assigned Date:** 2025-11-23 17:44:25

**Description:**  
Allows the app to read and manage the role-based access control (RBAC) settings for your organization's Exchange Online service, without a signed-in user. This includes reading, creating, updating, and deleting Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.

**Usage Examples:**

```javascript
// Create or update rolemanagement
const result = await graphClient
  .api('/rolemanagement')
  .post({
    // resource properties
  });

// Read rolemanagement
const data = await graphClient
  .api('/rolemanagement')
  .get();

// Update rolemanagement
await graphClient
  .api('/rolemanagement/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### RoleManagementAlert

#### RoleManagementAlert.ReadWrite.Directory

**Permission ID:** `11059518-d6a6-4851-98ed-509268489c4a`  
**Display Name:** Read all alert data, configure alerts, and take actions on all alerts for your company's directory  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to read and manage all role-based access control (RBAC) alerts for your company's directory, without a signed-in user. This includes managing alert settings, initiating alert scans, dismissing alerts, remediating alert incidents, and reading alert statuses, alert definitions, alert configurations and incidents that lead to an alert.

**Usage Examples:**

```javascript
// Create or update rolemanagementalert
const result = await graphClient
  .api('/rolemanagementalert')
  .post({
    // resource properties
  });

// Read rolemanagementalert
const data = await graphClient
  .api('/rolemanagementalert')
  .get();

// Update rolemanagementalert
await graphClient
  .api('/rolemanagementalert/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### RoleManagementPolicy

#### RoleManagementPolicy.ReadWrite.Directory

**Permission ID:** `31e08e0a-d3f7-4ca2-ac39-7343fb83e8ad`  
**Display Name:** Read, update, and delete all policies for privileged role assignments of your company's directory  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to read, update, and delete policies for privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update rolemanagementpolicy
const result = await graphClient
  .api('/rolemanagementpolicy')
  .post({
    // resource properties
  });

// Read rolemanagementpolicy
const data = await graphClient
  .api('/rolemanagementpolicy')
  .get();

// Update rolemanagementpolicy
await graphClient
  .api('/rolemanagementpolicy/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### Schedule

#### Schedule.ReadWrite.All

**Permission ID:** `b7760610-0545-4e8a-9ec3-cce9e63db01c`  
**Display Name:** Read and write all schedule items  
**Assigned Date:** 2025-11-23 17:44:26

**Description:**  
Allows the app to manage all schedules, schedule groups, shifts and associated entities in the Teams or Shifts application without a signed-in user.

**Usage Examples:**

```javascript
// Create or update schedule
const result = await graphClient
  .api('/schedule')
  .post({
    // resource properties
  });

// Read schedule
const data = await graphClient
  .api('/schedule')
  .get();

// Update schedule
await graphClient
  .api('/schedule/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### SchedulePermissions

#### SchedulePermissions.ReadWrite.All

**Permission ID:** `7239b71d-b402-4150-b13d-78ecfe8df441`  
**Display Name:** Read/Write schedule permissions for a role  
**Assigned Date:** 2025-11-23 17:44:27

**Description:**  
Allows the app to read/write schedule permissions for a specific role in Shifts application without a signed-in user.

**Usage Examples:**

```javascript
// Create or update schedulepermissions
const result = await graphClient
  .api('/schedulepermissions')
  .post({
    // resource properties
  });

// Read schedulepermissions
const data = await graphClient
  .api('/schedulepermissions')
  .get();

// Update schedulepermissions
await graphClient
  .api('/schedulepermissions/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### SecurityIdentitiesUserActions

#### SecurityIdentitiesUserActions.ReadWrite.All

**Permission ID:** `b4146a3a-dd4f-4af4-8d91-7cc0eef3d041`  
**Display Name:** Read and perform all identity security available user actions  
**Assigned Date:** 2025-11-23 17:44:30

**Description:**  
Allows the app to read and write identity security available user actions without a signed-in user.

**Usage Examples:**

```javascript
// Create or update securityidentitiesuseractions
const result = await graphClient
  .api('/securityidentitiesuseractions')
  .post({
    // resource properties
  });

// Read securityidentitiesuseractions
const data = await graphClient
  .api('/securityidentitiesuseractions')
  .get();

// Update securityidentitiesuseractions
await graphClient
  .api('/securityidentitiesuseractions/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### ServiceActivity-Exchange

#### ServiceActivity-Exchange.Read.All

**Permission ID:** `2b655018-450a-4845-81e7-d603b1ebffdb`  
**Display Name:** Read all Exchange service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Exchange service activity, without a signed-in user.

**Usage Examples:**

```javascript
// Read serviceactivity-exchange data
const data = await graphClient
  .api('/serviceactivity-exchange')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/serviceactivity-exchange')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### ServiceActivity-Microsoft365Web

#### ServiceActivity-Microsoft365Web.Read.All

**Permission ID:** `c766cb16-acc4-4663-ba09-6eedef5876c5`  
**Display Name:** Read all Microsoft 365 Web service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Microsoft 365 Web service activity, without a signed-in user.

**Usage Examples:**

```javascript
// Read serviceactivity-microsoft365web data
const data = await graphClient
  .api('/serviceactivity-microsoft365web')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/serviceactivity-microsoft365web')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### ServiceActivity-Teams

#### ServiceActivity-Teams.Read.All

**Permission ID:** `4dfee10b-fa4a-41b5-b34d-ccf54cc0c394`  
**Display Name:** Read all Teams service activity  
**Assigned Date:** 2025-11-23 17:44:31

**Description:**  
Allows the app to read all Teams service activity, without a signed-in user.

**Usage Examples:**

```javascript
// Read serviceactivity-teams data
const data = await graphClient
  .api('/serviceactivity-teams')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/serviceactivity-teams')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### SharePointTenantSettings

#### SharePointTenantSettings.ReadWrite.All

**Permission ID:** `19b94e34-907c-4f43-bde9-38b1909ed408`  
**Display Name:** Read and change SharePoint and OneDrive tenant settings  
**Assigned Date:** 2025-11-23 17:44:33

**Description:**  
Allows the application to read and change the tenant-level settings of SharePoint and OneDrive, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update sharepointtenantsettings
const result = await graphClient
  .api('/sharepointtenantsettings')
  .post({
    // resource properties
  });

// Read sharepointtenantsettings
const data = await graphClient
  .api('/sharepointtenantsettings')
  .get();

// Update sharepointtenantsettings
await graphClient
  .api('/sharepointtenantsettings/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/sites')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/synchronizationdata-user')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamMember

#### TeamMember.ReadWriteNonOwnerRole.All

**Permission ID:** `4437522e-9a86-4a41-a7da-e380edd4a97d`  
**Display Name:** Add and remove members with non-owner role for all teams  
**Assigned Date:** 2025-11-23 17:44:36

**Description:**  
Add and remove members from all teams, without a signed-in user. Does not allow adding or removing a member with the owner role. Additionally, does not allow the app to elevate an existing member to the owner role.

**Usage Examples:**

```javascript
// Create or update teammember
const result = await graphClient
  .api('/teammember')
  .post({
    // resource properties
  });

// Read teammember
const data = await graphClient
  .api('/teammember')
  .get();

// Update teammember
await graphClient
  .api('/teammember/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamSettings

#### TeamSettings.ReadWrite.All

**Permission ID:** `bdd80a03-d9bc-451d-b7c4-ce7c63fe3c8f`  
**Display Name:** Read and change all teams' settings  
**Assigned Date:** 2025-11-23 17:44:41

**Description:**  
Read and change all teams' settings, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update teamsettings
const result = await graphClient
  .api('/teamsettings')
  .post({
    // resource properties
  });

// Read teamsettings
const data = await graphClient
  .api('/teamsettings')
  .get();

// Update teamsettings
await graphClient
  .api('/teamsettings/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamsActivity

#### TeamsActivity.Read.All

**Permission ID:** `70dec828-f620-4914-aa83-a29117306807`  
**Display Name:** Read all users' teamwork activity feed  
**Assigned Date:** 2025-11-23 17:44:36

**Description:**  
Allows the app to read all users' teamwork activity feed, without a signed-in user.

**Usage Examples:**

```javascript
// Read teamsactivity data
const data = await graphClient
  .api('/teamsactivity')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamsactivity')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/teamsappinstallation')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### TeamsAppInstallation.ReadForChat.All

**Permission ID:** `cc7e7635-2586-41d6-adaa-a8d3bcad5ee5`  
**Display Name:** Read installed Teams apps for all chats  
**Assigned Date:** 2025-11-23 19:35:31

**Description:**  
Allows the app to read the Teams apps that are installed in any chat, without a signed-in user. Does not give the ability to read application-specific settings.

**Usage Examples:**

```javascript
// Read teamsappinstallation data
const data = await graphClient
  .api('/teamsappinstallation')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamsappinstallation')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### TeamsAppInstallation.ReadForUser.All

**Permission ID:** `9ce09611-f4f7-4abd-a629-a05450422a97`  
**Display Name:** Read installed Teams apps for all users  
**Assigned Date:** 2025-11-23 19:35:31

**Description:**  
Allows the app to read the Teams apps that are installed for any user, without a signed-in user. Does not give the ability to read application-specific settings.

**Usage Examples:**

```javascript
// Read teamsappinstallation data
const data = await graphClient
  .api('/teamsappinstallation')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamsappinstallation')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### TeamsAppInstallation.ReadWriteAndConsentSelfForChat.All

**Permission ID:** `ba1ba90b-2d8f-487e-9f16-80728d85bb5c`  
**Display Name:** Allow the Teams app to manage itself and its permission grants for all chats  
**Assigned Date:** 2025-11-23 17:44:37

**Description:**  
Allows a Teams app to read, install, upgrade, and uninstall itself for any chat, without a signed-in user, and manage its permission grants for accessing those specific chats' data.

**Usage Examples:**

```javascript
// Create or update teamsappinstallation
const result = await graphClient
  .api('/teamsappinstallation')
  .post({
    // resource properties
  });

// Read teamsappinstallation
const data = await graphClient
  .api('/teamsappinstallation')
  .get();

// Update teamsappinstallation
await graphClient
  .api('/teamsappinstallation/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamsResourceAccount

#### TeamsResourceAccount.Read.All

**Permission ID:** `b55aa226-33a1-4396-bcf4-edce5e7a31c1`  
**Display Name:** Read Teams resource accounts  
**Assigned Date:** 2025-11-23 17:44:41

**Description:**  
Allows the app to read your tenant's resource accounts without a signed-in user.

**Usage Examples:**

```javascript
// Read teamsresourceaccount data
const data = await graphClient
  .api('/teamsresourceaccount')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamsresourceaccount')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamsTab

#### TeamsTab.Read.All

**Permission ID:** `46890524-499a-4bb2-ad64-1476b4f3e1cf`  
**Display Name:** Read tabs in Microsoft Teams.  
**Assigned Date:** 2025-11-23 19:35:32

**Description:**  
Read the names and settings of tabs inside any team in Microsoft Teams, without a signed-in user. This does not give access to the content inside the tabs.

**Usage Examples:**

```javascript
// Read teamstab data
const data = await graphClient
  .api('/teamstab')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamstab')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### TeamsTab.ReadWriteForChat.All

**Permission ID:** `fd9ce730-a250-40dc-bd44-8dc8d20f39ea`  
**Display Name:** Allow the Teams app to manage all tabs for all chats  
**Assigned Date:** 2025-11-23 17:44:42

**Description:**  
Allows a Teams app to read, install, upgrade, and uninstall all tabs for any chat, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update teamstab
const result = await graphClient
  .api('/teamstab')
  .post({
    // resource properties
  });

// Read teamstab
const data = await graphClient
  .api('/teamstab')
  .get();

// Update teamstab
await graphClient
  .api('/teamstab/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### TeamsTelephoneNumber

#### TeamsTelephoneNumber.Read.All

**Permission ID:** `39b17d18-680c-41f4-b9c2-5f30629e7cb6`  
**Display Name:** Read Tenant-Acquired Telephone Number Details  
**Assigned Date:** 2025-11-23 19:35:32

**Description:**  
Allows the app to read your tenant's acquired telephone number details, without a signed-in user. Acquired telephone numbers may include attributes related to assigned object, emergency location, network site, etc.

**Usage Examples:**

```javascript
// Read teamstelephonenumber data
const data = await graphClient
  .api('/teamstelephonenumber')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/teamstelephonenumber')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### TeamsTelephoneNumber.ReadWrite.All

**Permission ID:** `0a42382f-155c-4eb1-9bdc-21548ccaa387`  
**Display Name:** Read and Modify Tenant-Acquired Telephone Number Details  
**Assigned Date:** 2025-11-23 17:44:43

**Description:**  
Allows the app to read your tenant's acquired telephone number details, without a signed-in user. Acquired telephone numbers may include attributes related to assigned object, emergency location, network site, etc.

**Usage Examples:**

```javascript
// Create or update teamstelephonenumber
const result = await graphClient
  .api('/teamstelephonenumber')
  .post({
    // resource properties
  });

// Read teamstelephonenumber
const data = await graphClient
  .api('/teamstelephonenumber')
  .get();

// Update teamstelephonenumber
await graphClient
  .api('/teamstelephonenumber/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/teamwork')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### User

#### User.ReadBasic.All

**Permission ID:** `97235f07-e226-4f63-ace3-39588e11d3a1`  
**Display Name:** Read all users' basic profiles  
**Assigned Date:** 2025-11-23 19:35:34

**Description:**  
Allows the app to read a basic set of profile properties of other users in your organization without a signed-in user. Includes display name, first and last name, email address, open extensions, and photo.

**Usage Examples:**

```javascript
// Read user data
const data = await graphClient
  .api('/user')
  .get();

// Query with filters
const filtered = await graphClient
  .api('/user')
  .filter("property eq 'value'")
  .top(10)
  .get();
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### User.ReadWrite.All

**Permission ID:** `741f803b-c850-494e-b5df-cde7c675a1ca`  
**Display Name:** Read and write all users' full profiles  
**Assigned Date:** 2025-11-23 17:44:47

**Description:**  
Allows the app to read and update user profiles without a signed in user.

**Usage Examples:**

```javascript
// Create or update user
const result = await graphClient
  .api('/user')
  .post({
    // resource properties
  });

// Read user
const data = await graphClient
  .api('/user')
  .get();

// Update user
await graphClient
  .api('/user/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---

#### User.RevokeSessions.All

**Permission ID:** `77f3a031-c388-4f99-b373-dc68676a979e`  
**Display Name:** Revoke all sign in sessions for a user  
**Assigned Date:** 2025-11-23 19:35:34

**Description:**  
Allow the app to revoke all sign in sessions for a user, without a signed-in user.

**Usage Examples:**

```javascript
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/user')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### User-Mail

#### User-Mail.ReadWrite.All

**Permission ID:** `280d0935-0796-47d1-8d26-273470a3f17a`  
**Display Name:** Read and write all secondary mail addresses for users  
**Assigned Date:** 2025-11-23 17:44:46

**Description:**  
Allows the app to read and write secondary mail addresses for all users, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update user-mail
const result = await graphClient
  .api('/user-mail')
  .post({
    // resource properties
  });

// Read user-mail
const data = await graphClient
  .api('/user-mail')
  .get();

// Update user-mail
await graphClient
  .api('/user-mail/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### User-OnPremisesSyncBehavior

#### User-OnPremisesSyncBehavior.ReadWrite.All

**Permission ID:** `a94a502d-0281-4d15-8cd2-682ac9362c4c`  
**Display Name:** Read and update the on-premises sync behavior of users  
**Assigned Date:** 2025-11-23 17:44:46

**Description:**  
Allows the app to update the on-premises sync behavior of all users without a signed-in user.

**Usage Examples:**

```javascript
// Create or update user-onpremisessyncbehavior
const result = await graphClient
  .api('/user-onpremisessyncbehavior')
  .post({
    // resource properties
  });

// Read user-onpremisessyncbehavior
const data = await graphClient
  .api('/user-onpremisessyncbehavior')
  .get();

// Update user-onpremisessyncbehavior
await graphClient
  .api('/user-onpremisessyncbehavior/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### User-Phone

#### User-Phone.ReadWrite.All

**Permission ID:** `86ceff06-c822-49ff-989a-d912845ffe69`  
**Display Name:** Read and write all user mobile phone and business phones  
**Assigned Date:** 2025-11-23 17:44:47

**Description:**  
Allows the app to read and write the mobile phone and business phones for all users, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update user-phone
const result = await graphClient
  .api('/user-phone')
  .post({
    // resource properties
  });

// Read user-phone
const data = await graphClient
  .api('/user-phone')
  .get();

// Update user-phone
await graphClient
  .api('/user-phone/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### UserAuthMethod-External

#### UserAuthMethod-External.ReadWrite.All

**Permission ID:** `c7a22c2e-5b01-4129-8159-6c8be2c78f16`  
**Display Name:** Read and write all users' external authentication methods  
**Assigned Date:** 2025-11-23 17:44:48

**Description:**  
Allows the application to read and write external authentication methods of all users in your organization, without a signed-in user. This does not allow the app to see secret information like passwords, or to sign-in or otherwise use the authentication methods.

**Usage Examples:**

```javascript
// Create or update userauthmethod-external
const result = await graphClient
  .api('/userauthmethod-external')
  .post({
    // resource properties
  });

// Read userauthmethod-external
const data = await graphClient
  .api('/userauthmethod-external')
  .get();

// Update userauthmethod-external
await graphClient
  .api('/userauthmethod-external/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

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
// Use this permission to perform specialized operations
const result = await graphClient
  .api('/virtualappointmentnotification')
  .post({
    // operation-specific parameters
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


### WorkforceIntegration

#### WorkforceIntegration.ReadWrite.All

**Permission ID:** `202bf709-e8e6-478e-bcfd-5d63c50b68e3`  
**Display Name:** Read and write workforce integrations  
**Assigned Date:** 2025-11-23 17:44:53

**Description:**  
Allows the app to manage workforce integrations to synchronize data from Microsoft Teams Shifts, without a signed-in user.

**Usage Examples:**

```javascript
// Create or update workforceintegration
const result = await graphClient
  .api('/workforceintegration')
  .post({
    // resource properties
  });

// Read workforceintegration
const data = await graphClient
  .api('/workforceintegration')
  .get();

// Update workforceintegration
await graphClient
  .api('/workforceintegration/{id}')
  .patch({
    // updated properties
  });
```

**Common Use Cases:**

- Organizational automation and workflow management
- Integration with business systems
- Compliance and security monitoring
- Reporting and analytics

**Security Considerations:**

- **High Privilege:** This permission grants broad access - implement strict controls
- **Audit Logging:** Log all operations for compliance
- **Least Privilege:** Only grant if absolutely necessary
- **Regular Review:** Periodically review usage and necessity
- **Monitoring:** Implement alerting for suspicious activity

---


## Security and Compliance

### Best Practices

1. **Principle of Least Privilege:** Only grant permissions absolutely necessary
2. **Regular Audits:** Review permissions quarterly
3. **Monitoring:** Implement comprehensive logging and alerting
4. **Conditional Access:** Use Azure AD policies to restrict usage
5. **Secret Management:** Store credentials in Azure Key Vault

### Compliance Frameworks

These permissions should be reviewed against:
- SOC 2 Type II
- ISO 27001
- GDPR
- HIPAA (if applicable)
- PCI DSS (if applicable)

## Additional Resources

- [Microsoft Graph API Documentation](https://docs.microsoft.com/graph/)
- [Graph API Permissions Reference](https://docs.microsoft.com/graph/permissions-reference)
- [Azure AD Best Practices](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal)

---

*Documentation generated on November 24, 2025*
