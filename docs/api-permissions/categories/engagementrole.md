# EngagementRole Permissions

## Overview

This document provides comprehensive information about **EngagementRole** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. EngagementRole.ReadWrite.All

**Display Name:** Modify Viva Engage role membership  
**Permission ID:** 3ede5358-7366-4da8-a2f7-472bf9c7cc34  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:55  
**Risk Level:** High

#### Description
Allows the app to assign Viva Engage role to a user, and remove a Viva Engage role from a user without a signed-in user.

#### Common Use Cases
- EngagementRole information retrieval
- Reporting and analytics
- Compliance and auditing
- EngagementRole management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read engagementrole data
const items = await client
  .api('/engagementroles')
  .get();

// Create new engagementrole
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/engagementroles')
  .post(newItem);

// Update engagementrole
await client
  .api(`/engagementroles/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete engagementrole
await client
  .api(`/engagementroles/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to assign Viva Engage role to a user, and remove a Viva Engage role from a user without a signed-in user.
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

- [Microsoft Graph EngagementRole Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** EngagementRole  
**Total Permissions:** 1  
**Documentation Version:** 1.0
