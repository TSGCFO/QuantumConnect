# CrossTenantUserProfileSharing Permissions

## Overview

This document provides comprehensive information about **CrossTenantUserProfileSharing** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. CrossTenantUserProfileSharing.ReadWrite.All

**Display Name:** Read all shared cross-tenant user profiles and export or delete their data  
**Permission ID:** 306785c5-c09b-4ba0-a4ee-023f3da165cb  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:46  
**Risk Level:** Critical

#### Description
Allows the application to list and query any shared user profile information associated with the current tenant without a signed-in user.  It also permits the application to export and remove external user data (e.g. customer content or system-generated logs), for any user associated with the current tenant without a signed-in user.

#### Common Use Cases
- CrossTenantUserProfileSharing information retrieval
- Reporting and analytics
- Compliance and auditing
- CrossTenantUserProfileSharing management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read crosstenantuserprofilesharing data
const items = await client
  .api('/crosstenantuserprofilesharings')
  .get();

// Create new crosstenantuserprofilesharing
const newCrosstenantuserprofilesharing = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/crosstenantuserprofilesharings')
  .post(newCrosstenantuserprofilesharing);

// Update crosstenantuserprofilesharing
await client
  .api('/crosstenantuserprofilesharings/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete crosstenantuserprofilesharing
await client
  .api('/crosstenantuserprofilesharings/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the application to list and query any shared user profile information associated with the current tenant without a signed-in user.  It also permits the application to export and remove external user data (e.g. customer content or system-generated logs), for any user associated with the current tenant without a signed-in user.
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

- [Microsoft Graph CrossTenantUserProfileSharing Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** CrossTenantUserProfileSharing  
**Total Permissions:** 1  
**Documentation Version:** 1.0
