# Quick Start Guide - API Permissions

This quick start guide helps you get started with the Microsoft Graph API permissions assigned to the employee portal application.

## 🚀 Getting Started in 5 Minutes

### 1. Understand Your Permissions

The employee portal has **400 Microsoft Graph API permissions** across **246 categories**. These permissions enable:

- User and group management
- Email and calendar automation
- File and document management
- Teams collaboration
- Security and compliance
- Reporting and analytics

### 2. Choose Your Development Language

We provide examples in:
- **PowerShell** - Great for scripting and automation
- **JavaScript/TypeScript** - Perfect for Node.js applications
- **C#** - Ideal for .NET applications

### 3. Set Up Authentication

#### Option A: PowerShell (Quickest)

```powershell
# Install Microsoft Graph PowerShell SDK
Install-Module Microsoft.Graph -Scope CurrentUser

# Connect to Microsoft Graph
Connect-MgGraph -Scopes "User.Read.All", "Group.Read.All"

# Test the connection
Get-MgUser -Top 5 | Select DisplayName, Mail
```

#### Option B: JavaScript/Node.js

```bash
# Install Microsoft Graph JavaScript SDK
npm install @microsoft/microsoft-graph-client @azure/identity
```

```javascript
const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');

// Initialize credential
const credential = new ClientSecretCredential(
    process.env.TENANT_ID,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

// Create Graph client
const client = Client.initWithMiddleware({
    authProvider: {
        getAccessToken: async () => {
            const token = await credential.getToken(
                'https://graph.microsoft.com/.default'
            );
            return token.token;
        }
    }
});

// Test the connection
const users = await client.api('/users').top(5).get();
console.log(users.value);
```

#### Option C: C#/.NET

```bash
# Install Microsoft Graph .NET SDK
dotnet add package Microsoft.Graph
dotnet add package Azure.Identity
```

```csharp
using Microsoft.Graph;
using Azure.Identity;

var scopes = new[] { "https://graph.microsoft.com/.default" };
var credential = new ClientSecretCredential(
    tenantId, clientId, clientSecret);

var graphClient = new GraphServiceClient(credential, scopes);

// Test the connection
var users = await graphClient.Users
    .Request()
    .Top(5)
    .GetAsync();

foreach (var user in users)
{
    Console.WriteLine($"{user.DisplayName} - {user.Mail}");
}
```

### 4. Try Common Operations

#### Read Users

```powershell
# Get all users in Sales department
Get-MgUser -Filter "department eq 'Sales'" -Property DisplayName,Mail,JobTitle
```

```javascript
// Get users with filter
const users = await client
    .api('/users')
    .filter("department eq 'Sales'")
    .select('displayName,mail,jobTitle')
    .get();
```

#### Send Email

```powershell
# Send an email
$message = @{
    Message = @{
        Subject = "Test Email"
        Body = @{
            ContentType = "Text"
            Content = "This is a test email from Graph API"
        }
        ToRecipients = @(
            @{
                EmailAddress = @{
                    Address = "user@contoso.com"
                }
            }
        )
    }
}

Send-MgUserMail -UserId "sender@contoso.com" -BodyParameter $message
```

#### Create Team

```javascript
// Create a new team
const team = {
    'template@odata.bind': "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
    displayName: 'Project Team',
    description: 'Team for project collaboration'
};

const newTeam = await client.api('/teams').post(team);
```

---

## 📚 Key Documentation

### Essential Guides

1. **[Permission Index](./reference/permission-index.md)** - Alphabetical listing of all permissions with examples
2. **[Common Use Cases](./reference/common-use-cases.md)** - Real-world scenarios and implementations
3. **[Security Best Practices](./reference/security-best-practices.md)** - Security guidelines and compliance
4. **[API Endpoints Reference](./reference/api-endpoints.md)** - Complete endpoint documentation

### Quick Links

- **Main README**: [docs/api-permissions/README.md](./README.md)
- **Category Guides**: [docs/api-permissions/categories/](./categories/)
- **Code Examples**: See each permission in the [Permission Index](./reference/permission-index.md)

---

## 🔑 Most Used Permissions

### User Management
- `User.Read.All` - Read user profiles
- `User.ReadWrite.All` - Manage user accounts

### Groups & Teams
- `Group.ReadWrite.All` - Manage groups
- `Team.Create` - Create Teams
- `TeamMember.ReadWrite.All` - Manage team members

### Communication
- `Mail.Send` - Send emails
- `Calendars.ReadWrite` - Manage calendars
- `Chat.ReadWrite.All` - Access Teams chats

### Files
- `Files.ReadWrite.All` - Manage files in SharePoint/OneDrive
- `Sites.ReadWrite.All` - Manage SharePoint sites

---

## 💡 Common Scenarios

### Scenario 1: Onboard New Employee

```powershell
# 1. Create user account
$user = New-MgUser -BodyParameter @{
    AccountEnabled = $true
    DisplayName = "Jane Smith"
    MailNickname = "janes"
    UserPrincipalName = "janes@contoso.com"
    PasswordProfile = @{
        Password = "TempPass123!"
        ForceChangePasswordNextSignIn = $true
    }
    JobTitle = "Developer"
    Department = "Engineering"
}

# 2. Add to groups
$groupId = (Get-MgGroup -Filter "displayName eq 'Engineering Team'").Id
New-MgGroupMember -GroupId $groupId -DirectoryObjectId $user.Id

# 3. Send welcome email
Send-MgUserMail -UserId "hr@contoso.com" -BodyParameter @{
    Message = @{
        Subject = "Welcome to the team!"
        Body = @{
            ContentType = "HTML"
            Content = "<h1>Welcome Jane!</h1><p>Your account is ready.</p>"
        }
        ToRecipients = @(@{
            EmailAddress = @{ Address = $user.Mail }
        })
    }
}
```

### Scenario 2: Create Project Team

```javascript
// 1. Create Microsoft 365 Group
const group = await client.api('/groups').post({
    displayName: 'Project Alpha',
    mailNickname: 'projectalpha',
    mailEnabled: true,
    securityEnabled: false,
    groupTypes: ['Unified']
});

// 2. Create Team from Group
const team = await client
    .api(`/groups/${group.id}/team`)
    .put({
        memberSettings: {
            allowCreateUpdateChannels: true
        }
    });

// 3. Add channels
await client.api(`/teams/${group.id}/channels`).post({
    displayName: 'Planning',
    description: 'Project planning discussions'
});

// 4. Add members
await client.api(`/teams/${group.id}/members`).post({
    '@odata.type': '#microsoft.graph.aadUserConversationMember',
    roles: [],
    'user@odata.bind': `https://graph.microsoft.com/v1.0/users/{user-id}`
});
```

### Scenario 3: Generate Monthly Report

```csharp
// Get usage reports
var activeUsers = await graphClient
    .Reports
    .GetOffice365ActiveUserDetail("D30")
    .Request()
    .GetAsync();

var teamsActivity = await graphClient
    .Reports
    .GetTeamsUserActivityUserDetail("D30")
    .Request()
    .GetAsync();

// Parse and analyze
var csvData = Encoding.UTF8.GetString(activeUsers);
var users = ParseCsv(csvData);

// Generate summary
var summary = new
{
    TotalUsers = users.Count,
    ActiveUsers = users.Count(u => u.HasExchangeLicense),
    TeamsUsers = users.Count(u => u.HasTeamsLicense),
    Date = DateTime.Now
};

// Email report
await SendReportEmail(summary);
```

---

## 🔒 Security Checklist

Before using any permission, ensure:

- [ ] Permission is actually needed for your use case
- [ ] Credentials are stored securely (Azure Key Vault recommended)
- [ ] Using least-privileged permission possible
- [ ] Implementing proper error handling
- [ ] Logging all API calls for audit
- [ ] Rate limiting is implemented
- [ ] Token expiration is handled
- [ ] Data is encrypted in transit and at rest

---

## 🐛 Troubleshooting

### "Insufficient privileges" Error

**Problem**: `403 Forbidden` or `Authorization_RequestDenied`

**Solutions**:
1. Verify permission is granted to the app
2. Check admin consent was provided
3. Ensure you're using the correct permission type (Delegated vs Application)
4. Verify token includes the required scopes

### "Too Many Requests" Error

**Problem**: `429 Too Many Requests`

**Solution**:
```javascript
async function retryWithBackoff(apiCall, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await apiCall();
        } catch (error) {
            if (error.statusCode === 429) {
                const retryAfter = error.headers['Retry-After'] || (i + 1) * 2;
                await sleep(retryAfter * 1000);
            } else {
                throw error;
            }
        }
    }
    throw new Error('Max retries exceeded');
}
```

### Authentication Failures

**Problem**: Token expired or invalid

**Solution**:
```csharp
// Implement automatic token refresh
public class TokenManager
{
    private string _cachedToken;
    private DateTime _tokenExpiry;

    public async Task<string> GetTokenAsync()
    {
        if (string.IsNullOrEmpty(_cachedToken) || 
            DateTime.UtcNow >= _tokenExpiry)
        {
            var token = await AcquireNewTokenAsync();
            _cachedToken = token.Token;
            _tokenExpiry = token.ExpiresOn.UtcDateTime;
        }
        return _cachedToken;
    }
}
```

---

## 📖 Learning Resources

### Microsoft Learn Paths
- [Microsoft Graph Fundamentals](https://learn.microsoft.com/en-us/training/modules/msgraph-intro-overview/)
- [Access User Data with Microsoft Graph](https://learn.microsoft.com/en-us/training/modules/msgraph-access-user-data/)
- [Manage Groups with Microsoft Graph](https://learn.microsoft.com/en-us/training/modules/msgraph-manage-groups/)

### Tools
- [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) - Test API calls
- [Graph SDKs](https://learn.microsoft.com/en-us/graph/sdks/sdks-overview) - Download SDKs
- [Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference) - Official docs

### Sample Code
- [Microsoft Graph Samples](https://github.com/microsoftgraph)
- [Code Examples in This Repo](./reference/common-use-cases.md)

---

## 🆘 Getting Help

### Internal Resources
1. Review the [Permission Index](./reference/permission-index.md)
2. Check [Common Use Cases](./reference/common-use-cases.md)
3. Consult [Security Best Practices](./reference/security-best-practices.md)

### External Resources
1. [Microsoft Graph Documentation](https://learn.microsoft.com/en-us/graph/)
2. [Stack Overflow - microsoft-graph-api tag](https://stackoverflow.com/questions/tagged/microsoft-graph-api)
3. [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/topics/microsoft-graph.html)

### Support
- **Internal**: Contact your IT department or application administrator
- **Microsoft Support**: For production issues with Microsoft Graph

---

## 🎯 Next Steps

1. **Review your specific needs** - What operations will your app perform?
2. **Check required permissions** - Use the [Permission Index](./reference/permission-index.md)
3. **Review security guidelines** - Follow [Security Best Practices](./reference/security-best-practices.md)
4. **Start with examples** - Copy from [Common Use Cases](./reference/common-use-cases.md)
5. **Test thoroughly** - Use [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)
6. **Monitor and audit** - Implement logging and monitoring from day one

---

**Ready to build? Start with the [Permission Index](./reference/permission-index.md) to find the permissions you need!**

---

**Last Updated**: 2025-11-24
