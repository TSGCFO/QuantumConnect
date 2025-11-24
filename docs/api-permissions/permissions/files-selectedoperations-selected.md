# Files.SelectedOperations.Selected

## Overview

- **Display Name**: Access selected Files without a signed in user.
- **Permission ID**: `bd61925e-3bf4-4d62-bc0b-06b06c96d95c`
- **Type**: Application Permission
- **Scope**: Varies
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 19:35:14

## Description

Allow the application to access a subset of files without a signed in user.  The specific files and the permissions granted will be configured in SharePoint Online or OneDrive.

## Use Cases

This permission enables the following scenarios:

- Document management and migration
- File synchronization and backup
- Content collaboration
- SharePoint automation

## API Endpoints

This section provides detailed information about the Microsoft Graph API endpoints that require this permission.

### Endpoint Reference

Refer to the [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview) for detailed endpoint documentation.


## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Files.SelectedOperations.Selected"

# Use this permission to access Microsoft Graph resources
# Refer to the API endpoints section below for specific operations
```

### JavaScript/TypeScript

```javascript
// Initialize Microsoft Graph Client with this permission
const client = Client.init({
    authProvider: authProvider
});

// Use this permission to access Microsoft Graph resources
// Refer to the API endpoints section below for specific operations
```

### C#

```csharp
// Initialize Microsoft Graph Client with this permission
var graphClient = new GraphServiceClient(credential, scopes);

// Use this permission to access Microsoft Graph resources
// Refer to the API endpoints section below for specific operations
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

Other permissions in the `Files` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Files
