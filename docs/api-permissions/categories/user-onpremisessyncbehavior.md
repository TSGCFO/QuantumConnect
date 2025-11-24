# User-OnPremisesSyncBehavior Permissions

## Overview

This document provides comprehensive information about **User-OnPremisesSyncBehavior** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. User-OnPremisesSyncBehavior.ReadWrite.All

**Display Name:** Read and update the on-premises sync behavior of users  
**Permission ID:** a94a502d-0281-4d15-8cd2-682ac9362c4c  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:46  
**Risk Level:** High

#### Description
Allows the app to update the on-premises sync behavior of all users without a signed-in user.

#### Common Use Cases
- User-OnPremisesSyncBehavior information retrieval
- Reporting and analytics
- Compliance and auditing
- User-OnPremisesSyncBehavior management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read user-onpremisessyncbehavior data
const items = await client
  .api('/user-onpremisessyncbehaviors')
  .get();

// Create new user-onpremisessyncbehavior
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/user-onpremisessyncbehaviors')
  .post(newItem);

// Update user-onpremisessyncbehavior
await client
  .api(`/user-onpremisessyncbehaviors/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete user-onpremisessyncbehavior
await client
  .api(`/user-onpremisessyncbehaviors/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to update the on-premises sync behavior of all users without a signed-in user.
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

- [Microsoft Graph User-OnPremisesSyncBehavior Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** User-OnPremisesSyncBehavior  
**Total Permissions:** 1  
**Documentation Version:** 1.0
