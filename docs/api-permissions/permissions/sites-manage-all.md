# Sites.Manage.All

## Overview

- **Display Name**: Create, edit, and delete items and lists in all site collections
- **Permission ID**: `0c0bf378-bf22-4481-8f81-9e89a9b4960a`
- **Type**: Application Permission
- **Scope**: Varies
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 19:35:29

## Description

Allows the app to create or delete document libraries and lists in all site collections without a signed in user.

## Use Cases

This permission enables the following scenarios:

- Document management and migration
- File synchronization and backup
- Content collaboration
- SharePoint automation

## API Endpoints

Common endpoints that require this permission:

- Refer to [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/api/overview) for specific endpoints

## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Sites.Manage.All"

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

Other permissions in the `Sites` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Sites
