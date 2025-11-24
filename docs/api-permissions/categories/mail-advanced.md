# Mail-Advanced Permissions

## Overview

This document provides comprehensive information about **Mail-Advanced** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. Mail-Advanced.ReadWrite.All

**Display Name:** Read and write mail in all mailboxes, including modifying existing non-draft mails  
**Permission ID:** e118f1da-5c1c-46cf-bff6-8858d786f46f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:07  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete all email, including contents of non-draft emails in user mailboxes, without a signed-in user. Does not include permission to send mail.

#### Common Use Cases
- Mail-Advanced information retrieval
- Reporting and analytics
- Compliance and auditing
- Mail-Advanced management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read mail-advanced data
const items = await client
  .api('/mail-advanceds')
  .get();

// Create new mail-advanced
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/mail-advanceds')
  .post(newItem);

// Update mail-advanced
await client
  .api(`/mail-advanceds/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete mail-advanced
await client
  .api(`/mail-advanceds/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete all email, including contents of non-draft emails in user mailboxes, without a signed-in user. Does not include permission to send mail.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
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

- [Microsoft Graph Mail-Advanced Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Mail-Advanced  
**Total Permissions:** 1  
**Documentation Version:** 1.0
