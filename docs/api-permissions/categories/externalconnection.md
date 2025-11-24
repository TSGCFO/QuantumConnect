# ExternalConnection Permissions

## Overview

This document provides comprehensive information about **ExternalConnection** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. ExternalConnection.ReadWrite.All

**Display Name:** Read and write all external connections  
**Permission ID:** 34c37bc0-2b40-4d5e-85e1-2365cd256d79  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:56  
**Risk Level:** High

#### Description
Allows the app to read and write all external connections without a signed-in user.

#### Common Use Cases
- ExternalConnection information retrieval
- Reporting and analytics
- Compliance and auditing
- ExternalConnection management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read externalconnection data
const items = await client
  .api('/externalconnections')
  .get();

// Create new externalconnection
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/externalconnections')
  .post(newItem);

// Update externalconnection
await client
  .api(`/externalconnections/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete externalconnection
await client
  .api(`/externalconnections/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write all external connections without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. ExternalConnection.ReadWrite.OwnedBy

**Display Name:** Read and write external connections  
**Permission ID:** f431331c-49a6-499f-be1c-62af19c34a9d  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:56  
**Risk Level:** High

#### Description
Allows the app to read and write external connections without a signed-in user. The app can only read and write external connections that it is authorized to, or it can create new external connections.

#### Common Use Cases
- ExternalConnection information retrieval
- Reporting and analytics
- Compliance and auditing
- ExternalConnection management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write external connections
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write external connections without a signed-in user. The app can only read and write external connections that it is authorized to, or it can create new external connections.
- Monitor for unauthorized access
- Comply with data protection regulations

---

## Best Practices

### 1. Access Control
- Implement role-based access control (RBAC)
- Use least privilege principle
- Regular permission audits
- Monitor usage patterns

### 2. Security
- Encrypt sensitive data in transit and at rest
- Implement comprehensive logging
- Regular security assessments
- Incident response procedures

### 3. Compliance
- GDPR compliance for data access
- Data retention policies
- Audit trail maintenance
- Privacy impact assessments

### 4. Monitoring
- Track all API calls
- Alert on suspicious patterns
- Regular access reviews
- Performance monitoring

## Related Permissions

This category may be used in conjunction with:
- **User.Read.All** - User information access
- **Directory.Read.All** - Directory data access
- **AuditLog.Read.All** - Audit logging

## Additional Resources

- [Microsoft Graph ExternalConnection Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** ExternalConnection  
**Total Permissions:** 2  
**Documentation Version:** 1.0
