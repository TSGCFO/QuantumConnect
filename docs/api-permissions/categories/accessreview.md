# AccessReview Permissions

## Overview

This document provides comprehensive information about **AccessReview** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. AccessReview.ReadWrite.All

**Display Name:** Manage all access reviews  
**Permission ID:** ef5f7d5c-338f-44b0-86c3-351f46c8bb5f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:28  
**Risk Level:** Critical

#### Description
Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization, without a signed-in user.

#### Common Use Cases
- AccessReview information retrieval
- Reporting and analytics
- Compliance and auditing
- AccessReview management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read accessreview data
const items = await client
  .api('/accessreviews')
  .get();

// Create new accessreview
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/accessreviews')
  .post(newItem);

// Update accessreview
await client
  .api(`/accessreviews/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete accessreview
await client
  .api(`/accessreviews/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. AccessReview.ReadWrite.Membership

**Display Name:** Manage access reviews for group and app memberships  
**Permission ID:** 18228521-a591-40f1-b215-5fad4488c117  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:28  
**Risk Level:** Critical

#### Description
Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization for group and app memberships, without a signed-in user.

#### Common Use Cases
- AccessReview information retrieval
- Reporting and analytics
- Compliance and auditing
- AccessReview management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Manage access reviews for group and app memberships
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization for group and app memberships, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
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

- [Microsoft Graph AccessReview Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AccessReview  
**Total Permissions:** 2  
**Documentation Version:** 1.0
