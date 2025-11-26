# Common Use Cases

This guide provides real-world scenarios and implementation examples for using the Microsoft Graph API permissions assigned to the employee portal application.

## Table of Contents

1. [User Management](#user-management)
2. [Group and Team Management](#group-and-team-management)
3. [Email and Calendar](#email-and-calendar)
4. [File and Document Management](#file-and-document-management)
5. [Teams and Collaboration](#teams-and-collaboration)
6. [Security and Compliance](#security-and-compliance)
7. [Reporting and Analytics](#reporting-and-analytics)

---

## User Management

### Use Case 1: Employee Onboarding Automation

**Permissions Required:**
- `User.ReadWrite.All`
- `Group.ReadWrite.All`
- `Directory.ReadWrite.All`

**Scenario**: Automatically provision new employees with user accounts, group memberships, and initial configurations when they are added to the HR system.

**Implementation** (PowerShell):

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "User.ReadWrite.All", "Group.ReadWrite.All"

# Create new user
$PasswordProfile = @{
    Password = "Temp@Pass123!"
    ForceChangePasswordNextSignIn = $true
}

$newUser = @{
    AccountEnabled = $true
    DisplayName = "Jane Smith"
    MailNickname = "janes"
    UserPrincipalName = "janes@contoso.com"
    PasswordProfile = $PasswordProfile
    JobTitle = "Marketing Specialist"
    Department = "Marketing"
    OfficeLocation = "Building 3, Floor 2"
}

$user = New-MgUser -BodyParameter $newUser

# Add to department group
$groupId = (Get-MgGroup -Filter "displayName eq 'Marketing Team'").Id
New-MgGroupMember -GroupId $groupId -DirectoryObjectId $user.Id

# Assign manager
$managerId = (Get-MgUser -Filter "mail eq 'manager@contoso.com'").Id
Set-MgUserManagerByRef -UserId $user.Id -BodyParameter @{
    "@odata.id" = "https://graph.microsoft.com/v1.0/users/$managerId"
}

Write-Host "User provisioned successfully: $($user.UserPrincipalName)"
```

**JavaScript Example**:

```javascript
const { Client } = require('@microsoft/microsoft-graph-client');

async function onboardEmployee(employeeData) {
    const client = Client.init({
        authProvider: authProvider
    });

    // Create user
    const user = {
        accountEnabled: true,
        displayName: employeeData.name,
        mailNickname: employeeData.alias,
        userPrincipalName: `${employeeData.alias}@contoso.com`,
        passwordProfile: {
            forceChangePasswordNextSignIn: true,
            password: generateSecurePassword()
        },
        jobTitle: employeeData.jobTitle,
        department: employeeData.department
    };

    const newUser = await client.api('/users').post(user);

    // Add to groups
    for (const groupName of employeeData.groups) {
        const group = await client
            .api('/groups')
            .filter(`displayName eq '${groupName}'`)
            .get();
        
        if (group.value.length > 0) {
            await client
                .api(`/groups/${group.value[0].id}/members/$ref`)
                .post({
                    "@odata.id": `https://graph.microsoft.com/v1.0/users/${newUser.id}`
                });
        }
    }

    return newUser;
}
```

### Use Case 2: User Profile Synchronization

**Permissions Required:**
- `User.Read.All`
- `User.ReadWrite.All`

**Scenario**: Sync user profile information from HR system to Microsoft 365.

**Implementation** (C#):

```csharp
using Microsoft.Graph;
using Azure.Identity;

public async Task SyncUserProfile(string userId, UserProfileData hrData)
{
    var scopes = new[] { "https://graph.microsoft.com/.default" };
    var clientSecretCredential = new ClientSecretCredential(
        tenantId, clientId, clientSecret);
    
    var graphClient = new GraphServiceClient(clientSecretCredential, scopes);

    var user = new User
    {
        JobTitle = hrData.JobTitle,
        Department = hrData.Department,
        OfficeLocation = hrData.OfficeLocation,
        EmployeeId = hrData.EmployeeId,
        MobilePhone = hrData.MobilePhone
    };

    await graphClient.Users[userId]
        .Request()
        .UpdateAsync(user);
}
```

---

## Group and Team Management

### Use Case 3: Automated Team Creation for Projects

**Permissions Required:**
- `Group.ReadWrite.All`
- `Team.Create`
- `TeamMember.ReadWrite.All`

**Scenario**: Automatically create Microsoft Teams when new projects are initiated in project management system.

**Implementation** (PowerShell):

```powershell
# Create a new team with channels
function New-ProjectTeam {
    param(
        [string]$ProjectName,
        [string]$ProjectOwner,
        [string[]]$TeamMembers
    )

    # Create Microsoft 365 Group
    $group = New-MgGroup -BodyParameter @{
        DisplayName = $ProjectName
        MailNickname = ($ProjectName -replace '\s', '').ToLower()
        MailEnabled = $true
        SecurityEnabled = $false
        GroupTypes = @("Unified")
        Owners = @("https://graph.microsoft.com/v1.0/users/$ProjectOwner")
    }

    # Create Team from Group
    $team = New-MgTeam -GroupId $group.Id -BodyParameter @{
        MemberSettings = @{
            AllowCreateUpdateChannels = $true
        }
        MessagingSettings = @{
            AllowUserEditMessages = $true
        }
    }

    # Create custom channels
    $channels = @("Planning", "Design", "Development", "Testing")
    foreach ($channelName in $channels) {
        New-MgTeamChannel -TeamId $group.Id -BodyParameter @{
            DisplayName = $channelName
            Description = "$channelName for $ProjectName"
        }
    }

    # Add team members
    foreach ($member in $TeamMembers) {
        New-MgTeamMember -TeamId $group.Id -BodyParameter @{
            "@odata.type" = "#microsoft.graph.aadUserConversationMember"
            Roles = @()
            "User@odata.bind" = "https://graph.microsoft.com/v1.0/users/$member"
        }
    }

    return $team
}
```

---

## Email and Calendar

### Use Case 4: Automated Meeting Scheduling

**Permissions Required:**
- `Calendars.ReadWrite`
- `Mail.Send`

**Scenario**: Automatically schedule recurring team meetings and send invitations.

**Implementation** (JavaScript):

```javascript
async function scheduleTeamMeeting(graphClient, meetingDetails) {
    // Create calendar event
    const event = {
        subject: meetingDetails.subject,
        body: {
            contentType: 'HTML',
            content: meetingDetails.agenda
        },
        start: {
            dateTime: meetingDetails.startTime,
            timeZone: 'Pacific Standard Time'
        },
        end: {
            dateTime: meetingDetails.endTime,
            timeZone: 'Pacific Standard Time'
        },
        location: {
            displayName: meetingDetails.location
        },
        attendees: meetingDetails.attendees.map(email => ({
            emailAddress: {
                address: email
            },
            type: 'required'
        })),
        recurrence: {
            pattern: {
                type: 'weekly',
                interval: 1,
                daysOfWeek: ['monday']
            },
            range: {
                type: 'endDate',
                startDate: meetingDetails.startDate,
                endDate: meetingDetails.endDate
            }
        },
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness'
    };

    const newEvent = await graphClient
        .api(`/users/${meetingDetails.organizer}/calendar/events`)
        .post(event);

    return newEvent;
}
```

### Use Case 5: Email Notification System

**Permissions Required:**
- `Mail.Send`

**Scenario**: Send automated email notifications for workflow approvals, alerts, and reminders.

**Implementation** (C#):

```csharp
public async Task SendNotificationEmail(
    GraphServiceClient graphClient,
    string senderUserId,
    List<string> recipients,
    string subject,
    string htmlBody)
{
    var message = new Message
    {
        Subject = subject,
        Body = new ItemBody
        {
            ContentType = BodyType.Html,
            Content = htmlBody
        },
        ToRecipients = recipients.Select(email => new Recipient
        {
            EmailAddress = new EmailAddress
            {
                Address = email
            }
        }).ToList(),
        Importance = Importance.High
    };

    await graphClient.Users[senderUserId]
        .SendMail(message, SaveToSentItems: true)
        .Request()
        .PostAsync();
}
```

---

## File and Document Management

### Use Case 6: Document Migration to SharePoint

**Permissions Required:**
- `Files.ReadWrite.All`
- `Sites.ReadWrite.All`

**Scenario**: Migrate documents from file server to SharePoint Online.

**Implementation** (PowerShell):

```powershell
function Copy-FilesToSharePoint {
    param(
        [string]$SourcePath,
        [string]$SiteId,
        [string]$DriveId,
        [string]$TargetFolder
    )

    # Get all files from source
    $files = Get-ChildItem -Path $SourcePath -Recurse -File

    foreach ($file in $files) {
        # Read file content
        $fileContent = Get-Content -Path $file.FullName -Raw -Encoding Byte

        # Get relative path
        $relativePath = $file.FullName.Substring($SourcePath.Length)
        $targetPath = Join-Path $TargetFolder $relativePath

        # Upload to SharePoint
        $uploadUrl = "https://graph.microsoft.com/v1.0/drives/$DriveId/root:/$targetPath:/content"
        
        Invoke-MgGraphRequest -Method PUT -Uri $uploadUrl -Body $fileContent

        Write-Host "Uploaded: $($file.Name)"
    }
}
```

**JavaScript Example**:

```javascript
async function uploadFileToSharePoint(graphClient, file, siteId, folderPath) {
    const fileStream = fs.createReadStream(file.path);
    const fileSize = fs.statSync(file.path).size;

    // For large files, use upload session
    if (fileSize > 4 * 1024 * 1024) {
        const uploadSession = await graphClient
            .api(`/sites/${siteId}/drive/root:/${folderPath}/${file.name}:/createUploadSession`)
            .post({});

        // Upload file in chunks
        return await uploadLargeFile(uploadSession.uploadUrl, fileStream, fileSize);
    } else {
        // Simple upload for small files
        return await graphClient
            .api(`/sites/${siteId}/drive/root:/${folderPath}/${file.name}:/content`)
            .put(fileStream);
    }
}
```

---

## Teams and Collaboration

### Use Case 7: Teams Channel Message Automation

**Permissions Required:**
- `ChannelMessage.Read.All`
- `Chat.ReadWrite.All`

**Scenario**: Post automated updates and announcements to Teams channels.

**Implementation** (PowerShell):

```powershell
function Send-TeamsChannelMessage {
    param(
        [string]$TeamId,
        [string]$ChannelId,
        [string]$MessageContent
    )

    $message = @{
        body = @{
            content = $MessageContent
            contentType = "html"
        }
    }

    New-MgTeamChannelMessage -TeamId $TeamId -ChannelId $ChannelId -BodyParameter $message
}

# Example: Post daily standup reminder
Send-TeamsChannelMessage -TeamId $teamId -ChannelId $channelId -MessageContent @"
<h2>🌅 Daily Standup Reminder</h2>
<p>Good morning team! Our daily standup starts in 15 minutes.</p>
<ul>
    <li>What did you accomplish yesterday?</li>
    <li>What will you work on today?</li>
    <li>Any blockers?</li>
</ul>
"@
```

### Use Case 8: Bot Integration with Teams

**Permissions Required:**
- `Chat.Read.All`
- `Chat.ReadWrite.All`
- `TeamsAppInstallation.ReadWriteForChat.All`

**Scenario**: Bot that responds to messages and provides information.

**Implementation** (JavaScript):

```javascript
async function handleTeamsMessage(graphClient, chatId, userMessage) {
    // Read the message
    const messages = await graphClient
        .api(`/chats/${chatId}/messages`)
        .top(1)
        .get();

    // Process and generate response
    let responseContent = processMessage(userMessage);

    // Send response
    const response = {
        body: {
            contentType: 'html',
            content: responseContent
        }
    };

    await graphClient
        .api(`/chats/${chatId}/messages`)
        .post(response);
}
```

---

## Security and Compliance

### Use Case 9: Access Review Automation

**Permissions Required:**
- `AccessReview.ReadWrite.All`
- `User.Read.All`
- `Group.Read.All`

**Scenario**: Automate quarterly access reviews for sensitive groups.

**Implementation** (PowerShell):

```powershell
function Start-QuarterlyAccessReview {
    param([string]$GroupId)

    $group = Get-MgGroup -GroupId $GroupId

    $reviewDefinition = @{
        displayName = "Q4 2025 - $($group.DisplayName) Access Review"
        descriptionForAdmins = "Quarterly review of $($group.DisplayName) membership"
        descriptionForReviewers = "Please review and confirm whether these users still need access"
        scope = @{
            "@odata.type" = "#microsoft.graph.accessReviewQueryScope"
            query = "/groups/$GroupId/members"
            queryType = "MicrosoftGraph"
        }
        reviewers = @(
            @{
                query = "/groups/$GroupId/owners"
                queryType = "MicrosoftGraph"
            }
        )
        settings = @{
            mailNotificationsEnabled = $true
            reminderNotificationsEnabled = $true
            instanceDurationInDays = 14
            recurrence = @{
                pattern = @{
                    type = "absoluteMonthly"
                    interval = 3
                }
                range = @{
                    type = "noEnd"
                    startDate = (Get-Date).ToString("yyyy-MM-dd")
                }
            }
            defaultDecisionEnabled = $true
            defaultDecision = "Deny"
        }
    }

    New-MgIdentityGovernanceAccessReviewDefinition -BodyParameter $reviewDefinition
}
```

### Use Case 10: Audit Log Analysis

**Permissions Required:**
- `AuditLog.Read.All`
- `Directory.Read.All`

**Scenario**: Monitor and report on sensitive administrative actions.

**Implementation** (C#):

```csharp
public async Task<List<AdminAction>> GetAdminActions(
    GraphServiceClient graphClient,
    DateTime startDate)
{
    var auditLogs = await graphClient
        .AuditLogs
        .DirectoryAudits
        .Request()
        .Filter($"activityDateTime ge {startDate:yyyy-MM-dd}")
        .Top(100)
        .GetAsync();

    var adminActions = new List<AdminAction>();

    foreach (var log in auditLogs)
    {
        if (log.Category == "UserManagement" || 
            log.Category == "GroupManagement" ||
            log.Category == "ApplicationManagement")
        {
            adminActions.Add(new AdminAction
            {
                Activity = log.ActivityDisplayName,
                User = log.InitiatedBy?.User?.UserPrincipalName,
                Timestamp = log.ActivityDateTime,
                Result = log.Result,
                TargetResources = log.TargetResources
            });
        }
    }

    return adminActions;
}
```

---

## Reporting and Analytics

### Use Case 11: User Activity Reports

**Permissions Required:**
- `Reports.Read.All`
- `User.Read.All`

**Scenario**: Generate monthly activity reports for license optimization.

**Implementation** (PowerShell):

```powershell
function Get-MonthlyUserActivityReport {
    # Get Microsoft 365 active users report
    $report = Get-MgReportOffice365ActiveUserDetail -Period 'D30'

    # Parse CSV data
    $users = $report | ConvertFrom-Csv

    # Analyze usage
    $analysis = $users | Group-Object {
        $_.HasExchangeLicense -eq 'True' -and 
        $_.HasTeamsLicense -eq 'True' -and
        $_.HasSharePointLicense -eq 'True'
    } | Select-Object @{
        Name = 'Category'
        Expression = {if ($_.Name -eq 'True') {'Active'} else {'Inactive'}}
    }, Count

    return $analysis
}
```

**JavaScript Example**:

```javascript
async function generateUsageReport(graphClient) {
    // Get Teams usage report
    const teamsReport = await graphClient
        .api('/reports/getTeamsUserActivityUserDetail(period=\'D30\')')
        .get();

    // Get OneDrive usage
    const oneDriveReport = await graphClient
        .api('/reports/getOneDriveUsageAccountDetail(period=\'D30\')')
        .get();

    // Get SharePoint usage
    const sharePointReport = await graphClient
        .api('/reports/getSharePointSiteUsageDetail(period=\'D30\')')
        .get();

    return {
        teams: parseCSV(teamsReport),
        oneDrive: parseCSV(oneDriveReport),
        sharePoint: parseCSV(sharePointReport)
    };
}
```

---

## Best Practices

### Error Handling

Always implement proper error handling for Graph API calls:

```javascript
async function callGraphWithRetry(apiCall, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await apiCall();
        } catch (error) {
            if (error.statusCode === 429) {
                // Rate limited - wait and retry
                const retryAfter = error.headers['Retry-After'] || (i + 1) * 2;
                await sleep(retryAfter * 1000);
            } else if (error.statusCode >= 500) {
                // Server error - retry
                await sleep((i + 1) * 1000);
            } else {
                // Client error - don't retry
                throw error;
            }
        }
    }
    throw new Error('Max retries exceeded');
}
```

### Batch Requests

Use batch requests for multiple operations:

```javascript
async function batchUpdateUsers(graphClient, userUpdates) {
    const batch = {
        requests: userUpdates.map((update, index) => ({
            id: index.toString(),
            method: 'PATCH',
            url: `/users/${update.id}`,
            body: update.data,
            headers: {
                'Content-Type': 'application/json'
            }
        }))
    };

    const response = await graphClient
        .api('/$batch')
        .post(batch);

    return response.responses;
}
```

### Pagination Handling

```powershell
function Get-AllUsers {
    $allUsers = @()
    $uri = "https://graph.microsoft.com/v1.0/users?`$top=999"

    do {
        $response = Invoke-MgGraphRequest -Uri $uri -Method GET
        $allUsers += $response.value
        $uri = $response.'@odata.nextLink'
    } while ($uri)

    return $allUsers
}
```

---

## Additional Resources

- [Microsoft Graph SDK Documentation](https://learn.microsoft.com/en-us/graph/sdks/sdks-overview)
- [Microsoft Graph REST API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)
- [Permission Index](./permission-index.md)
- [Security Best Practices](./security-best-practices.md)

---

**Last Updated**: 2025-11-24
