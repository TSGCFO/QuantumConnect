# User-ConvertToInternal Permissions

## Overview

This document provides comprehensive information about **User-ConvertToInternal** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. User-ConvertToInternal.ReadWrite.All

**Display Name:** Convert an external user to internal member user  
**Permission ID:** 9d952b72-f741-4b40-9185-8c53076c2339  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:33  
**Risk Level:** High

#### Description
Allow the app to convert an external user to an internal member user, without a signed-in user.

#### Common Use Cases
- User-ConvertToInternal information retrieval
- Reporting and analytics
- Compliance and auditing
- User-ConvertToInternal management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read user-converttointernal data
const items = await client
  .api('/user-converttointernals')
  .get();

// Create new user-converttointernal
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/user-converttointernals')
  .post(newItem);

// Update user-converttointernal
await client
  .api(`/user-converttointernals/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete user-converttointernal
await client
  .api(`/user-converttointernals/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allow the app to convert an external user to an internal member user, without a signed-in user.
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

- [Microsoft Graph User-ConvertToInternal Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** User-ConvertToInternal  
**Total Permissions:** 1  
**Documentation Version:** 1.0
