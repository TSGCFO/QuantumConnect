# eDiscovery Permissions

## Overview

This document provides comprehensive information about **eDiscovery** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. eDiscovery.ReadWrite.All

**Display Name:** Read and write all eDiscovery objects  
**Permission ID:** b2620db1-3bf7-4c5b-9cb9-576d29eac736  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:52  
**Risk Level:** High

#### Description
Allows the app to read and write eDiscovery objects such as cases, custodians, review sets and other related objects without a signed-in user.

#### Common Use Cases
- eDiscovery information retrieval
- Reporting and analytics
- Compliance and auditing
- eDiscovery management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read ediscovery data
const items = await client
  .api('/ediscoverys')
  .get();

// Create new ediscovery
const newEdiscovery = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/ediscoverys')
  .post(newEdiscovery);

// Update ediscovery
await client
  .api('/ediscoverys/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete ediscovery
await client
  .api('/ediscoverys/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write eDiscovery objects such as cases, custodians, review sets and other related objects without a signed-in user.
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

- [Microsoft Graph eDiscovery Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** eDiscovery  
**Total Permissions:** 1  
**Documentation Version:** 1.0
