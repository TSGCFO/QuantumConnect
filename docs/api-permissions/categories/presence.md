# Presence Permissions

## Overview

This document provides comprehensive information about **Presence** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. Presence.ReadWrite.All

**Display Name:** Read and write presence information for all users  
**Permission ID:** 83cded22-8297-4ff6-a7fa-e97e9545a259  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:20  
**Risk Level:** High

#### Description
Allows the app to read all presence information and write activity and availability of all users in the directory without a signed-in user. Presence information includes activity, availability, status note, calendar out-of-office message, time zone and location.

#### Common Use Cases
- Presence information retrieval
- Reporting and analytics
- Compliance and auditing
- Presence management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read presence data
const items = await client
  .api('/presences')
  .get();

// Create new presence
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/presences')
  .post(newItem);

// Update presence
await client
  .api(`/presences/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete presence
await client
  .api(`/presences/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read all presence information and write activity and availability of all users in the directory without a signed-in user. Presence information includes activity, availability, status note, calendar out-of-office message, time zone and location.
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

- [Microsoft Graph Presence Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Presence  
**Total Permissions:** 1  
**Documentation Version:** 1.0
