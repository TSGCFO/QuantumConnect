# Bookings.ReadWrite.All

## Overview

- **Display Name**: Read and write bookings information
- **Permission ID**: `0c4b2d20-7919-468d-8668-c54b09d4dee8`
- **Type**: Application Permission - Read and Write
- **Scope**: Organization-wide
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:43:37

## Description

Allows an app to read and write bookings appointments, businesses, customers, services, and staff on behalf of the signed-in user. Does not allow create, delete and publish of booking businesses.

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
Connect-MgGraph -Scopes "Bookings.ReadWrite.All"

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

🔴 **HIGH**

This permission grants broad write access to organizational data. Implement strict security controls and monitoring.

### Required Actions

- [ ] Document business justification for this permission
- [ ] Implement comprehensive audit logging
- [ ] Set up monitoring and alerting for unusual activity
- [ ] Review access quarterly
- [ ] Ensure compliance with data protection regulations (GDPR, etc.)

## Related Permissions

Other permissions in the `Bookings` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Bookings
