# Group.ReadWrite.All

## Overview

- **Display Name**: Read and write all groups
- **Permission ID**: `62a82d76-70ea-41e2-9197-370581804d09`
- **Type**: Application Permission - Read and Write
- **Scope**: Organization-wide
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:43:59

## Description

Allows the app to create groups, read all group properties and memberships, update group properties and memberships, and delete groups. Also allows the app to read and write conversations. All of these operations can be performed by the app without a signed-in user.

## Use Cases

This permission enables the following scenarios:

- Group and team management
- Dynamic group membership automation
- Access control and provisioning
- Collaboration workspace creation

## API Endpoints

Common endpoints that require this permission:

- `GET /groups`
- `POST /groups`
- `PATCH /groups/{{id}}`
- `GET /groups/{{id}}/members`
- `POST /groups/{{id}}/members/$ref`

## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Group.ReadWrite.All"

# Example: Get groups
Get-MgGroup -Top 10 | Select-Object DisplayName, Mail, GroupTypes

# Example: Create a group
New-MgGroup -BodyParameter @{
    DisplayName = "Marketing Team"
    MailNickname = "marketing"
    MailEnabled = $true
    SecurityEnabled = $false
    GroupTypes = @("Unified")
}
```

### JavaScript/TypeScript

```javascript
// Example: Get groups
const groups = await client
    .api('/groups')
    .top(10)
    .select('displayName,mail,groupTypes')
    .get();

// Example: Create a group
const newGroup = await client
    .api('/groups')
    .post({
        displayName: 'Marketing Team',
        mailNickname: 'marketing',
        mailEnabled: true,
        securityEnabled: false,
        groupTypes: ['Unified']
    });
```

### C#

```csharp
// Example: Get groups
var groups = await graphClient.Groups
    .Request()
    .Top(10)
    .GetAsync();

// Example: Create a group
var newGroup = new Group
{
    DisplayName = "Marketing Team",
    MailNickname = "marketing",
    MailEnabled = true,
    SecurityEnabled = false,
    GroupTypes = new List<string> { "Unified" }
};

await graphClient.Groups
    .Request()
    .AddAsync(newGroup);
```

## Security Considerations

### Best Practices

1. **Principle of Least Privilege**: Only request this permission if absolutely necessary for your use case
2. **Credential Security**: Store client secrets and certificates securely in Azure Key Vault
3. **Audit Logging**: Log all operations performed using this permission
4. **Regular Reviews**: Periodically review whether this permission is still needed

### Risk Level

🔴 **HIGH**

This permission grants broad write access to organizational data. Implement strict security controls and monitoring.

### Required Actions

- [ ] Document business justification for this permission
- [ ] Implement comprehensive audit logging
- [ ] Set up monitoring and alerting for unusual activity
- [ ] Review access quarterly
- [ ] Ensure compliance with data protection regulations (GDPR, etc.)

## Related Permissions

Other permissions in the `Group` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Group
