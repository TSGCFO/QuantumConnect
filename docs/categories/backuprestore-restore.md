# BackupRestore-Restore Permissions

## Overview

This document provides comprehensive information about **BackupRestore-Restore** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. BackupRestore-Restore.ReadWrite.All

**Display Name:** Read restore all sessions and start restore sessions from backups  
**Permission ID:** bebd0841-a3d8-4313-a51d-731112c8ee41  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:36  
**Risk Level:** High

#### Description
Allows the app to search all backup snapshots for Microsoft 365 resources, and restore Microsoft 365 resources from a backed-up snapshot, without a signed-in user.

#### Common Use Cases
- BackupRestore-Restore information retrieval
- Reporting and analytics
- Compliance and auditing
- BackupRestore-Restore management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read backuprestore-restore data
const items = await client
  .api('/backuprestore-restores')
  .get();

// Create new backuprestore-restore
const newBackuprestore-restore = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/backuprestore-restores')
  .post(newBackuprestore-restore);

// Update backuprestore-restore
await client
  .api('/backuprestore-restores/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete backuprestore-restore
await client
  .api('/backuprestore-restores/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to search all backup snapshots for Microsoft 365 resources, and restore Microsoft 365 resources from a backed-up snapshot, without a signed-in user.
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

- [Microsoft Graph BackupRestore-Restore Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** BackupRestore-Restore  
**Total Permissions:** 1  
**Documentation Version:** 1.0
