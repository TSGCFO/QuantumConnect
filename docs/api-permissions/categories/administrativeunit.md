# AdministrativeUnit Permissions

## Overview

This document provides comprehensive information about **AdministrativeUnit** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. AdministrativeUnit.ReadWrite.All

**Display Name:** Read and write all administrative units  
**Permission ID:** 5eb59dd3-1da2-4329-8733-9dabdc435916  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:29  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete administrative units and manage administrative unit membership without a signed-in user.

#### Common Use Cases
- AdministrativeUnit information retrieval
- Reporting and analytics
- Compliance and auditing
- AdministrativeUnit management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read administrativeunit data
const items = await client
  .api('/administrativeunits')
  .get();

// Create new administrativeunit
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/administrativeunits')
  .post(newItem);

// Update administrativeunit
await client
  .api(`/administrativeunits/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete administrativeunit
await client
  .api(`/administrativeunits/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete administrative units and manage administrative unit membership without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
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

- [Microsoft Graph AdministrativeUnit Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AdministrativeUnit  
**Total Permissions:** 1  
**Documentation Version:** 1.0
