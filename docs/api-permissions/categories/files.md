# Files Permissions

## Overview

This document provides comprehensive information about **Files** permissions in Microsoft Graph API.

**Total Permissions:** 3

## Permissions List

### 1. Files.ReadWrite.All

**Display Name:** Read and write files in all site collections  
**Permission ID:** 75359482-378d-4052-8f01-80520e7db3cd  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:58  
**Risk Level:** Critical

#### Description
Allows the app to read, create, update and delete all files in all site collections without a signed in user.

#### Common Use Cases
- Files information retrieval
- Reporting and analytics
- Compliance and auditing
- Files management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read files data
const items = await client
  .api('/filess')
  .get();

// Create new files
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/filess')
  .post(newItem);

// Update files
await client
  .api(`/filess/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete files
await client
  .api(`/filess/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, create, update and delete all files in all site collections without a signed in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. Files.ReadWrite.AppFolder

**Display Name:** Have full access to the application's folder without a signed in user.  
**Permission ID:** b47b160b-1054-4efd-9ca0-e2f614696086  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:58  
**Risk Level:** Critical

#### Description
Allows the app to read, create, update and delete files in the application's folder without a signed in user.

#### Common Use Cases
- Files information retrieval
- Reporting and analytics
- Compliance and auditing
- Files management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Have full access to the application's folder without a signed in user.
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, create, update and delete files in the application's folder without a signed in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. Files.SelectedOperations.Selected

**Display Name:** Access selected Files without a signed in user.  
**Permission ID:** bd61925e-3bf4-4d62-bc0b-06b06c96d95c  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:14  
**Risk Level:** Low

#### Description
Allow the application to access a subset of files without a signed in user.  The specific files and the permissions granted will be configured in SharePoint Online or OneDrive.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Access selected Files without a signed in user.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allow the application to access a subset of files without a signed in user.  The specific files and the permissions granted will be configured in SharePoint Online or OneDrive.
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

- [Microsoft Graph Files Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Files  
**Total Permissions:** 3  
**Documentation Version:** 1.0
