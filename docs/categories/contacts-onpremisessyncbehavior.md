# Contacts-OnPremisesSyncBehavior Permissions

## Overview

This document provides comprehensive information about **Contacts-OnPremisesSyncBehavior** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. Contacts-OnPremisesSyncBehavior.ReadWrite.All

**Display Name:** Read and update the on-premises sync behavior of contacts  
**Permission ID:** c8948c23-e66b-42db-83fd-770b71ab78d2  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:45  
**Risk Level:** High

#### Description
Allows the app to update the on-premises sync behavior of all contacts in all mailboxes without a signed-in user.

#### Common Use Cases
- Contacts-OnPremisesSyncBehavior information retrieval
- Reporting and analytics
- Compliance and auditing
- Contacts-OnPremisesSyncBehavior management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read contacts-onpremisessyncbehavior data
const items = await client
  .api('/contacts-onpremisessyncbehaviors')
  .get();

// Create new contacts-onpremisessyncbehavior
const newContacts-onpremisessyncbehavior = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/contacts-onpremisessyncbehaviors')
  .post(newContacts-onpremisessyncbehavior);

// Update contacts-onpremisessyncbehavior
await client
  .api('/contacts-onpremisessyncbehaviors/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete contacts-onpremisessyncbehavior
await client
  .api('/contacts-onpremisessyncbehaviors/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to update the on-premises sync behavior of all contacts in all mailboxes without a signed-in user.
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

- [Microsoft Graph Contacts-OnPremisesSyncBehavior Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Contacts-OnPremisesSyncBehavior  
**Total Permissions:** 1  
**Documentation Version:** 1.0
