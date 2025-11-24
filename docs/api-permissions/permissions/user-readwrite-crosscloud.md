# User.ReadWrite.CrossCloud

## Overview

- **Display Name**: Read and write profiles of users that originate from an external cloud.
- **Permission ID**: `5652f862-b626-407b-a3e6-248aeb95763c`
- **Type**: Application Permission - Read and Write
- **Scope**: Limited
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:44:47

## Description

Allows the app to read and update external cloud user profiles without a signed in user.

## Use Cases

This permission enables the following scenarios:

- User profile management and synchronization
- Employee onboarding and offboarding automation
- Directory synchronization with external systems
- User reporting and analytics

## API Endpoints

Common endpoints that require this permission:

- `GET /users`
- `POST /users`
- `PATCH /users/{{id}}`
- `GET /users/{{id}}/manager`
- `GET /users/{{id}}/directReports`

## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "User.ReadWrite.CrossCloud"

# Example: Get users
Get-MgUser -Top 10 | Select-Object DisplayName, Mail, JobTitle

# Example: Get specific user
Get-MgUser -UserId "user@contoso.com"
```

### JavaScript/TypeScript

```javascript
// Initialize Microsoft Graph Client
const { Client } = require('@microsoft/microsoft-graph-client');

const client = Client.init({
    authProvider: authProvider
});

// Example: Get users
const users = await client
    .api('/users')
    .top(10)
    .select('displayName,mail,jobTitle')
    .get();

// Example: Get specific user
const user = await client
    .api('/users/user@contoso.com')
    .get();
```

### C#

```csharp
using Microsoft.Graph;

// Example: Get users
var users = await graphClient.Users
    .Request()
    .Top(10)
    .Select("displayName,mail,jobTitle")
    .GetAsync();

// Example: Get specific user
var user = await graphClient.Users["user@contoso.com"]
    .Request()
    .GetAsync();
```

## Security Considerations

### Best Practices

1. **Principle of Least Privilege**: Only request this permission if absolutely necessary for your use case
2. **Credential Security**: Store client secrets and certificates securely in Azure Key Vault
3. **Audit Logging**: Log all operations performed using this permission
4. **Regular Reviews**: Periodically review whether this permission is still needed

### Risk Level

🟢 **LOW-MEDIUM**

This permission has limited scope. Still ensure appropriate security measures are in place.

### Required Actions

- [ ] Document business justification for this permission
- [ ] Implement comprehensive audit logging
- [ ] Set up monitoring and alerting for unusual activity
- [ ] Review access quarterly
- [ ] Ensure compliance with data protection regulations (GDPR, etc.)

## Related Permissions

Other permissions in the `User` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: User
