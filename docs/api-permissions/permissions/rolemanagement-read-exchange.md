# RoleManagement.Read.Exchange

## Overview

- **Display Name**: Read Exchange Online RBAC configuration
- **Permission ID**: `c769435f-f061-4d0b-8ff1-3d39870e5f85`
- **Type**: Application Permission - Read Only
- **Scope**: Limited
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 19:35:21

## Description

Allows the app to read the role-based access control (RBAC) configuration for your organization's Exchange Online service, without a signed-in user. This includes reading Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.

## Use Cases

This permission enables the following scenarios:

- Automated workflows and integrations
- Custom business applications
- System monitoring and reporting
- Administrative automation

## API Endpoints

Common endpoints that require this permission:

- Refer to [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/api/overview) for specific endpoints

## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "RoleManagement.Read.Exchange"

# Use this permission to access Microsoft Graph resources
# Refer to Microsoft Graph API documentation for specific endpoints
```

### JavaScript/TypeScript

```javascript
// Initialize Microsoft Graph Client with this permission
const client = Client.init({
    authProvider: authProvider
});

// Use this permission to access Microsoft Graph resources
// Refer to Microsoft Graph API documentation for specific endpoints
```

### C#

```csharp
// Initialize Microsoft Graph Client with this permission
var graphClient = new GraphServiceClient(credential, scopes);

// Use this permission to access Microsoft Graph resources
// Refer to Microsoft Graph API documentation for specific endpoints
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

Other permissions in the `RoleManagement` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: RoleManagement
