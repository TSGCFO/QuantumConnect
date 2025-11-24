# Permission Index (A-Z)

This index provides an alphabetical listing of all 400 Microsoft Graph API permissions assigned to the employee portal application.

> **Navigation**: Use your browser's find function (Ctrl+F or Cmd+F) to quickly locate specific permissions.

## Quick Stats

- **Total Permissions**: 400
- **Categories**: 246
- **ReadWrite.All Permissions**: 153
- **Read.All Permissions**: 66
- **Other Permission Types**: 181

## Index Format

Each permission entry includes:
- **Permission Name**: The exact permission identifier
- **Display Name**: Human-readable description
- **Permission ID**: Unique GUID for the permission
- **Type**: Application permission (app-only access)
- **Admin Consent**: Required (all permissions require admin consent)
- **Assigned Date**: When permission was granted
- **Category**: Functional grouping

---

## A

### AccessReview.ReadWrite.All
- **Display Name**: Manage all access reviews
- **Permission ID**: `ef5f7d5c-338f-44b0-86c3-351f46c8bb5f`
- **Description**: Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization, without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:28
- **Category**: Identity Governance
- **Use Cases**:
  - Automated access review creation and management
  - Periodic attestation of user access to resources
  - Compliance reporting on access decisions
- **API Endpoints**:
  - `GET /identityGovernance/accessReviews/definitions`
  - `POST /identityGovernance/accessReviews/definitions`
  - `PATCH /identityGovernance/accessReviews/definitions/{id}`
- **Example** (PowerShell):
  ```powershell
  # Connect with required permission
  Connect-MgGraph -Scopes "AccessReview.ReadWrite.All"
  
  # Create an access review
  $params = @{
      displayName = "Review guest access to Marketing group"
      descriptionForAdmins = "Review guest users in Marketing"
      scope = @{
          "@odata.type" = "#microsoft.graph.accessReviewQueryScope"
          query = "/groups/{group-id}/members/microsoft.graph.user"
          queryType = "MicrosoftGraph"
      }
  }
  New-MgIdentityGovernanceAccessReviewDefinition -BodyParameter $params
  ```
- **Security Considerations**:
  - High-privilege permission - grants full control over access reviews
  - Can modify access review decisions affecting user permissions
  - Should be restricted to governance/compliance applications
  - Audit all access review modifications

### AccessReview.ReadWrite.Membership
- **Display Name**: Manage access reviews for group and app memberships
- **Permission ID**: `18228521-a591-40f1-b215-5fad4488c117`
- **Description**: Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization for group and app memberships, without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:28
- **Category**: Identity Governance
- **Scope**: Limited to group and application membership reviews
- **Use Cases**:
  - Review group membership periodically
  - Attest to application access assignments
  - Automate membership cleanup

### Acronym.Read.All
- **Display Name**: Read all acronyms
- **Permission ID**: `8c0aed2c-0c61-433d-b63c-6370ddc73248`
- **Description**: Allows an app to read all acronyms without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:28
- **Category**: Search & Discovery
- **Use Cases**:
  - Build organizational acronym directories
  - Integrate acronyms into search experiences
  - Provide acronym definitions in apps
- **API Endpoints**:
  - `GET /search/acronyms`

### AdministrativeUnit.ReadWrite.All
- **Display Name**: Read and write all administrative units
- **Permission ID**: `5eb59dd3-1da2-4329-8733-9dabdc435916`
- **Description**: Allows the app to create, read, update, and delete administrative units and manage administrative unit membership without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:29
- **Category**: Directory Management
- **Use Cases**:
  - Organize users and groups into administrative units
  - Delegate administration for specific organizational scopes
  - Manage scoped role assignments
- **API Endpoints**:
  - `GET /directory/administrativeUnits`
  - `POST /directory/administrativeUnits`
  - `POST /directory/administrativeUnits/{id}/members/$ref`
- **Example** (JavaScript):
  ```javascript
  // Create an administrative unit
  const administrativeUnit = {
    displayName: 'Marketing Department',
    description: 'Administrative unit for Marketing team'
  };
  
  await graphClient
    .api('/directory/administrativeUnits')
    .post(administrativeUnit);
  ```

---

## B

### Bookings.Manage.All
- **Display Name**: Manage bookings information
- **Permission ID**: `6b22000a-1228-42ec-88db-b8c00399aecb`
- **Description**: Allows an app to read, write and manage bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user.
- **Assigned Date**: 2025-11-23 19:35:11
- **Category**: Scheduling & Bookings
- **Use Cases**:
  - Full booking system management
  - Create and publish booking businesses
  - Manage appointments and services
- **API Endpoints**:
  - `GET /solutions/bookingBusinesses`
  - `POST /solutions/bookingBusinesses`
  - `POST /solutions/bookingBusinesses/{id}/appointments`

### Bookings.ReadWrite.All
- **Display Name**: Read and write bookings information
- **Permission ID**: `0c4b2d20-7919-468d-8668-c54b09d4dee8`
- **Description**: Allows an app to read and write bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user. Does not allow create, delete and publish of booking businesses.
- **Assigned Date**: 2025-11-23 17:43:37
- **Category**: Scheduling & Bookings
- **Scope**: Limited - cannot create/delete/publish businesses

---

## C

### Calendars.ReadWrite
- **Display Name**: Read and write calendars in all mailboxes
- **Permission ID**: `ef54d2bf-783f-4e0f-bca1-3210c0444d99`
- **Description**: Allows the app to create, read, update, and delete events of all calendars without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:38
- **Category**: Communication
- **Use Cases**:
  - Synchronize calendar events across systems
  - Automate meeting scheduling
  - Resource booking systems
- **API Endpoints**:
  - `GET /users/{id}/calendar/events`
  - `POST /users/{id}/calendar/events`
  - `PATCH /users/{id}/calendar/events/{event-id}`
- **Example** (C#):
  ```csharp
  // Create a calendar event
  var newEvent = new Event
  {
      Subject = "Team Sync",
      Start = new DateTimeTimeZone
      {
          DateTime = "2025-12-01T14:00:00",
          TimeZone = "Pacific Standard Time"
      },
      End = new DateTimeTimeZone
      {
          DateTime = "2025-12-01T15:00:00",
          TimeZone = "Pacific Standard Time"
      }
  };
  
  await graphClient.Users[userId].Calendar.Events
      .Request()
      .AddAsync(newEvent);
  ```

### Chat.ReadWrite.All
- **Display Name**: Read and write all chat messages
- **Permission ID**: `294ce7c9-31ba-490a-ad7d-97a7d075e4ed`
- **Description**: Allows an app to read and write all chat messages in Microsoft Teams, without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:43
- **Category**: Teams & Collaboration
- **Use Cases**:
  - Bot message processing
  - Compliance archiving of chats
  - Chat analytics
- **API Endpoints**:
  - `GET /chats/{chat-id}/messages`
  - `POST /chats/{chat-id}/messages`
- **Security Considerations**:
  - Provides access to potentially sensitive chat content
  - Should implement data retention policies
  - Consider privacy implications

---

## D

### Directory.ReadWrite.All
- **Display Name**: Read and write directory data
- **Permission ID**: `19dbc75e-c2e2-444c-a770-ec69d8559fc7`
- **Description**: Allows the app to read and write data in your organization's directory, such as users, and groups, without a signed-in user. Does not allow user or group deletion.
- **Assigned Date**: 2025-11-23 17:43:51
- **Category**: Directory Management
- **Use Cases**:
  - User provisioning and deprovisioning
  - Group management
  - Directory synchronization
- **API Endpoints**:
  - `GET /users`
  - `POST /users`
  - `PATCH /users/{id}`
  - `GET /groups`
  - `POST /groups`
- **Example** (PowerShell):
  ```powershell
  # Connect with permission
  Connect-MgGraph -Scopes "Directory.ReadWrite.All"
  
  # Create a new user
  $PasswordProfile = @{
      Password = "SecureP@ssw0rd!"
      ForceChangePasswordNextSignIn = $true
  }
  
  $params = @{
      AccountEnabled = $true
      DisplayName = "John Doe"
      MailNickname = "johnd"
      UserPrincipalName = "johnd@contoso.com"
      PasswordProfile = $PasswordProfile
  }
  
  New-MgUser -BodyParameter $params
  ```
- **Security Considerations**:
  - Second highest privileged permission for Microsoft Entra ID
  - Can modify most directory objects
  - Cannot delete users/groups (requires User.DeleteRestore.All)
  - Audit all directory modifications
  - Implement least privilege principle

---

## F

### Files.ReadWrite.All
- **Display Name**: Read and write files in all site collections
- **Permission ID**: `75359482-378d-4052-8f01-80520e7db3cd`
- **Description**: Allows the app to read, create, update and delete all files in all site collections without a signed-in user.
- **Assigned Date**: 2025-11-23 17:43:57
- **Category**: Files & Documents
- **Use Cases**:
  - Document migration tools
  - Backup and archiving solutions
  - Content management systems
- **API Endpoints**:
  - `GET /sites/{site-id}/drive/root/children`
  - `GET /drives/{drive-id}/items/{item-id}`
  - `PUT /drives/{drive-id}/items/{item-id}/content`
  - `POST /drives/{drive-id}/items/{item-id}/copy`
- **Example** (JavaScript):
  ```javascript
  // Read files from a SharePoint site
  const drive = await graphClient
    .sites[siteId]
    .drive
    .get();
  
  const files = await graphClient
    .drives[drive.id]
    .root
    .children
    .get();
  
  // Upload a file
  const file = fs.readFileSync('./document.pdf');
  await graphClient
    .drives[drive.id]
    .items.root
    .itemWithPath('/documents/document.pdf')
    .content
    .put(file);
  ```
- **Security Considerations**:
  - Provides broad access to organizational files
  - Can access sensitive documents across all sites
  - Implement file type and size restrictions
  - Monitor for unusual file access patterns

---

## G

### Group.ReadWrite.All
- **Display Name**: Read and write all groups
- **Permission ID**: `62a82d76-70ea-41e2-9197-370581804d09`
- **Description**: Allows the app to create groups and read all group properties and memberships on behalf of the signed-in user. Additionally allows group owners to manage their groups and allows group members to update group content.
- **Assigned Date**: 2025-11-23 17:43:58
- **Category**: Groups & Teams
- **Use Cases**:
  - Automated group provisioning
  - Team management automation
  - Group-based access control
- **API Endpoints**:
  - `GET /groups`
  - `POST /groups`
  - `PATCH /groups/{id}`
  - `POST /groups/{id}/members/$ref`
- **Example** (PowerShell):
  ```powershell
  # Create a Microsoft 365 group
  $params = @{
      DisplayName = "Marketing Team"
      MailEnabled = $true
      MailNickname = "marketing"
      SecurityEnabled = $false
      GroupTypes = @("Unified")
  }
  
  New-MgGroup -BodyParameter $params
  ```

---

## M

### Mail.ReadWrite
- **Display Name**: Read and write mail in all mailboxes
- **Permission ID**: `e2a3a72e-5f79-4c64-b1b1-878b674786c9`
- **Description**: Allows the app to create, read, update, and delete mail in all mailboxes without a signed-in user. Does not include permission to send mail.
- **Assigned Date**: 2025-11-23 17:44:19
- **Category**: Communication
- **Use Cases**:
  - Email archiving systems
  - Compliance and legal hold
  - Email processing automation
- **API Endpoints**:
  - `GET /users/{id}/messages`
  - `POST /users/{id}/messages`
  - `PATCH /users/{id}/messages/{message-id}`
- **Note**: Does not include Mail.Send permission

### Mail.Send
- **Display Name**: Send mail as any user
- **Permission ID**: `b633e1c5-b582-4048-a93e-9f11b44c7e96`
- **Description**: Allows the app to send mail as any user without a signed-in user.
- **Assigned Date**: 2025-11-23 17:44:19
- **Category**: Communication
- **Use Cases**:
  - Automated notification systems
  - Workflow email automation
  - Alert and reporting systems
- **API Endpoints**:
  - `POST /users/{id}/sendMail`
- **Example** (C#):
  ```csharp
  var message = new Message
  {
      Subject = "System Notification",
      Body = new ItemBody
      {
          ContentType = BodyType.Text,
          Content = "This is an automated notification."
      },
      ToRecipients = new List<Recipient>()
      {
          new Recipient
          {
              EmailAddress = new EmailAddress
              {
                  Address = "user@contoso.com"
              }
          }
      }
  };
  
  await graphClient.Users[userId]
      .SendMail(message, SaveToSentItems: true)
      .Request()
      .PostAsync();
  ```

---

## T

### TeamsTab.ReadWrite.All
- **Display Name**: Read and write tabs in Microsoft Teams
- **Permission ID**: `a96d855f-016b-47d7-b51c-1218a98d791c`
- **Description**: Read and write tabs in any team in Microsoft Teams, without a signed-in user. This does not give access to the content inside the tabs.
- **Assigned Date**: 2025-11-23 17:44:41
- **Category**: Teams & Collaboration
- **Use Cases**:
  - Automated tab management
  - Team configuration automation
  - App deployment to teams
- **API Endpoints**:
  - `GET /teams/{team-id}/channels/{channel-id}/tabs`
  - `POST /teams/{team-id}/channels/{channel-id}/tabs`
  - `PATCH /teams/{team-id}/channels/{channel-id}/tabs/{tab-id}`
- **Example** (PowerShell):
  ```powershell
  # Add a tab to a Teams channel
  $params = @{
      displayName = "Project Dashboard"
      "teamsApp@odata.bind" = "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/{app-id}"
      configuration = @{
          entityId = "project123"
          contentUrl = "https://contoso.com/dashboard"
          websiteUrl = "https://contoso.com/dashboard"
      }
  }
  
  New-MgTeamChannelTab -TeamId $teamId -ChannelId $channelId -BodyParameter $params
  ```
- **Note**: Does not provide access to tab content, only tab metadata and configuration

---

## U

### User.Read.All
- **Display Name**: Read all users' full profiles
- **Permission ID**: `df021288-bdef-4463-88db-98f22de89214`
- **Description**: Allows the app to read user profiles without a signed in user.
- **Assigned Date**: 2025-11-23 19:35:34
- **Category**: User Management
- **Use Cases**:
  - User directory applications
  - People picker implementations
  - Organizational charts
- **API Endpoints**:
  - `GET /users`
  - `GET /users/{id}`
  - `GET /users/{id}/manager`
  - `GET /users/{id}/directReports`
- **Example** (JavaScript):
  ```javascript
  // Get all users
  const users = await graphClient
    .api('/users')
    .select('displayName,mail,jobTitle')
    .top(100)
    .get();
  
  // Get specific user with manager
  const user = await graphClient
    .api(`/users/${userId}`)
    .expand('manager')
    .get();
  ```
- **Data Includes**:
  - Full profile including organizational hierarchy
  - Manager and direct reports
  - Custom attributes and extensions
- **Security Considerations**:
  - Provides access to complete user directory
  - Can reveal organizational structure
  - May include sensitive user information

### User.ReadWrite.All
- **Display Name**: Read and write all users' full profiles
- **Permission ID**: `741f803b-c850-494e-b5df-cde7c675a1ca`
- **Description**: Allows the app to read and update user profiles without a signed in user.
- **Assigned Date**: 2025-11-23 17:44:47
- **Category**: User Management
- **Use Cases**:
  - User provisioning systems
  - Profile synchronization
  - HR system integration
- **API Endpoints**:
  - `GET /users`
  - `POST /users`
  - `PATCH /users/{id}`
- **Example** (C#):
  ```csharp
  // Update user properties
  var user = new User
  {
      JobTitle = "Senior Developer",
      Department = "Engineering",
      OfficeLocation = "Building 5, Room 301"
  };
  
  await graphClient.Users[userId]
      .Request()
      .UpdateAsync(user);
  ```
- **Limitations**:
  - Cannot delete users (requires User.DeleteRestore.All)
  - Cannot reset passwords (requires User-PasswordProfile.ReadWrite.All)
- **Security Considerations**:
  - High-privilege permission
  - Can modify critical user attributes
  - Audit all user modifications

---

## Permission Categories

For easier navigation, permissions are also organized by functional category:

### Identity & Access Management
- AccessReview.*
- AdministrativeUnit.*
- Application.*
- AppRoleAssignment.*
- ConsentRequest.*
- DelegatedPermissionGrant.*
- Directory.*
- Domain.*
- IdentityRisk*
- RoleManagement.*
- Policy.*

### Users & Groups
- User.*
- Group.*
- GroupMember.*
- Member.*
- People.*

### Communication & Collaboration
- Mail.*
- Calendars.*
- Contacts.*
- Chat.*
- Channel.*
- Team.*
- OnlineMeetings.*

### Files & Documents
- Files.*
- Sites.*
- Notes.*

### Security & Compliance
- AuditLog.*
- SecurityIncident.*
- ThreatAssessment.*
- InformationProtection.*
- eDiscovery.*

### Device Management
- Device.*
- DeviceManagement*

### Reports & Analytics
- Reports.*
- ServiceHealth.*
- ServiceMessage.*

---

## Using This Index

### Finding a Permission
1. Use Ctrl+F (Cmd+F on Mac) to search for the permission name
2. Check the category sections for related permissions
3. Review the API endpoint examples for usage guidance

### Understanding Permission Scope
- **.All** suffix: Org-wide access to all resources
- **.Selected** suffix: Access to specific resources only
- **.OwnedBy** suffix: Limited to app-owned resources
- **.ReadBasic** suffix: Limited to basic properties only

### Security Best Practices
1. **Principle of Least Privilege**: Request only the minimum permissions needed
2. **Audit Regularly**: Monitor permission usage and access patterns
3. **Document Usage**: Maintain records of why each permission is needed
4. **Review Periodically**: Ensure permissions are still necessary

---

## Additional Resources

- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/)
- [Best Practices for Microsoft Graph Permissions](https://learn.microsoft.com/en-us/graph/best-practices-graph-permission)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Note**: This index covers key permissions. For the complete list of all 400 permissions, refer to the [AssignedGraphPermissions.txt](../../../AssignedGraphPermissions.txt) file in the repository root.

**Last Updated**: 2025-11-24
