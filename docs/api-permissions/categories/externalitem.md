# ExternalItem Permissions

## Overview

This document provides comprehensive information about **ExternalItem** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. ExternalItem.ReadWrite.All

**Display Name:** Read and write items in external datasets  
**Permission ID:** 38c3d6ee-69ee-422f-b954-e17819665354  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:56  
**Risk Level:** High

#### Description
Allow the app to read or write items in all external datasets that the app is authorized to access

#### Common Use Cases
- ExternalItem information retrieval
- Reporting and analytics
- Compliance and auditing
- ExternalItem management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read externalitem data
const items = await client
  .api('/externalitems')
  .get();

// Create new externalitem
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/externalitems')
  .post(newItem);

// Update externalitem
await client
  .api(`/externalitems/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete externalitem
await client
  .api(`/externalitems/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allow the app to read or write items in all external datasets that the app is authorized to access
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. ExternalItem.ReadWrite.OwnedBy

**Display Name:** Read and write external items  
**Permission ID:** 8116ae0f-55c2-452d-9944-d18420f5b2c8  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:57  
**Risk Level:** High

#### Description
Allows the app to read and write external items without a signed-in user. The app can only read external items of the connection that it is authorized to.

#### Common Use Cases
- ExternalItem information retrieval
- Reporting and analytics
- Compliance and auditing
- ExternalItem management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write external items
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write external items without a signed-in user. The app can only read external items of the connection that it is authorized to.
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

- [Microsoft Graph ExternalItem Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** ExternalItem  
**Total Permissions:** 2  
**Documentation Version:** 1.0
