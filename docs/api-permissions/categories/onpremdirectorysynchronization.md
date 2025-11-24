# OnPremDirectorySynchronization Permissions

## Overview

This document provides comprehensive information about **OnPremDirectorySynchronization** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. OnPremDirectorySynchronization.ReadWrite.All

**Display Name:** Read and write all on-premises directory synchronization information  
**Permission ID:** c22a92cc-79bf-4bb1-8b6c-e0a05d3d80ce  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:12  
**Risk Level:** High

#### Description
Allows the app to read and write all on-premises directory synchronization information for the organization, without a signed-in user.

#### Common Use Cases
- OnPremDirectorySynchronization information retrieval
- Reporting and analytics
- Compliance and auditing
- OnPremDirectorySynchronization management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read onpremdirectorysynchronization data
const items = await client
  .api('/onpremdirectorysynchronizations')
  .get();

// Create new onpremdirectorysynchronization
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/onpremdirectorysynchronizations')
  .post(newItem);

// Update onpremdirectorysynchronization
await client
  .api(`/onpremdirectorysynchronizations/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete onpremdirectorysynchronization
await client
  .api(`/onpremdirectorysynchronizations/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write all on-premises directory synchronization information for the organization, without a signed-in user.
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

- [Microsoft Graph OnPremDirectorySynchronization Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** OnPremDirectorySynchronization  
**Total Permissions:** 1  
**Documentation Version:** 1.0
