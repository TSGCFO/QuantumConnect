# User-Phone Permissions

## Overview

This document provides comprehensive information about **User-Phone** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. User-Phone.ReadWrite.All

**Display Name:** Read and write all user mobile phone and business phones  
**Permission ID:** 86ceff06-c822-49ff-989a-d912845ffe69  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:47  
**Risk Level:** High

#### Description
Allows the app to read and write the mobile phone and business phones for all users, without a signed-in user.

#### Common Use Cases
- User-Phone information retrieval
- Reporting and analytics
- Compliance and auditing
- User-Phone management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read user-phone data
const items = await client
  .api('/user-phones')
  .get();

// Create new user-phone
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/user-phones')
  .post(newItem);

// Update user-phone
await client
  .api(`/user-phones/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete user-phone
await client
  .api(`/user-phones/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write the mobile phone and business phones for all users, without a signed-in user.
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

- [Microsoft Graph User-Phone Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** User-Phone  
**Total Permissions:** 1  
**Documentation Version:** 1.0
