# BackupRestore-Control Permissions

## Overview

This document provides comprehensive information about **BackupRestore-Control** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. BackupRestore-Control.ReadWrite.All

**Display Name:** Update or read the status of the M365 backup service  
**Permission ID:** fb240865-88f8-4a1d-923f-98dbc7920860  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:35  
**Risk Level:** High

#### Description
Allows the app to update or read the status of M365 backup service (enable/disable), without signed in user

#### Common Use Cases
- BackupRestore-Control information retrieval
- Reporting and analytics
- Compliance and auditing
- BackupRestore-Control management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read backuprestore-control data
const items = await client
  .api('/backuprestore-controls')
  .get();

// Create new backuprestore-control
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/backuprestore-controls')
  .post(newItem);

// Update backuprestore-control
await client
  .api(`/backuprestore-controls/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete backuprestore-control
await client
  .api(`/backuprestore-controls/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to update or read the status of M365 backup service (enable/disable), without signed in user
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

- [Microsoft Graph BackupRestore-Control Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** BackupRestore-Control  
**Total Permissions:** 1  
**Documentation Version:** 1.0
