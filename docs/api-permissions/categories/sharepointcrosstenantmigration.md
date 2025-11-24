# SharePointCrossTenantMigration Permissions

## Overview

This document provides comprehensive information about **SharePointCrossTenantMigration** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. SharePointCrossTenantMigration.Manage.All

**Display Name:** Read, write and manage SharePoint Cross-Tenant migration settings and tasks  
**Permission ID:** a0521574-fcd8-4742-b29c-f796df57ea70  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:21  
**Risk Level:** High

#### Description
Allows the app to read, write and manage your tenant's SharePoint Cross-Tenant migration settings and tasks, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Read, write and manage SharePoint Cross-Tenant migration settings and tasks
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read, write and manage your tenant's SharePoint Cross-Tenant migration settings and tasks, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. SharePointCrossTenantMigration.Read.All

**Display Name:** Read SharePoint Cross-Tenant migration settings and tasks  
**Permission ID:** f5fa52a5-b9ab-4dc3-885e-9e5b4a67068e  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:32  
**Risk Level:** Medium

#### Description
Allows the app to read your tenant's SharePoint Cross-Tenant migration settings and tasks, without a signed-in user.

#### Common Use Cases
- SharePointCrossTenantMigration information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read sharepointcrosstenantmigration data
const data = await client
  .api('/sharepointcrosstenantmigrations')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read your tenant's SharePoint Cross-Tenant migration settings and tasks, without a signed-in user.
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

- [Microsoft Graph SharePointCrossTenantMigration Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** SharePointCrossTenantMigration  
**Total Permissions:** 2  
**Documentation Version:** 1.0
