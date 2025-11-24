# Sites Permissions

## Overview

This document provides comprehensive information about **Sites** permissions in Microsoft Graph API.

**Total Permissions:** 6

## Permissions List

### 1. Sites.Archive.All

**Display Name:** Archive/reactivate Site Collections without a signed in user.  
**Permission ID:** e3530185-4080-478c-a4ab-39322704df58  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:22  
**Risk Level:** Low

#### Description
Allow the application to archive/reactivate site collections without a signed in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Archive/reactivate Site Collections without a signed in user.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allow the application to archive/reactivate site collections without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. Sites.Create.All

**Display Name:** Create Site Collections without a signed in user.  
**Permission ID:** 80819dd8-2b3b-4551-a1ad-2700fc44f533  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:29  
**Risk Level:** Low

#### Description
Allow the application to create site collections without a signed in user. Upon creation the application will be granted Sites.Selected(application) + FullControl to the newly created site.

#### Common Use Cases
- Sites provisioning
- Automated setup processes

#### Code Example
```javascript
// Example usage for Create Site Collections without a signed in user.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allow the application to create site collections without a signed in user. Upon creation the application will be granted Sites.Selected(application) + FullControl to the newly created site.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. Sites.FullControl.All

**Display Name:** Have full control of all site collections  
**Permission ID:** a82116e5-55eb-4c41-a434-62fe8a61c773  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:29  
**Risk Level:** Low

#### Description
Allows the app to have full control of all site collections without a signed in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Have full control of all site collections
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to have full control of all site collections without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. Sites.Manage.All

**Display Name:** Create, edit, and delete items and lists in all site collections  
**Permission ID:** 0c0bf378-bf22-4481-8f81-9e89a9b4960a  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:29  
**Risk Level:** Critical

#### Description
Allows the app to create or delete document libraries and lists in all site collections without a signed in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Create, edit, and delete items and lists in all site collections
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create or delete document libraries and lists in all site collections without a signed in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. Sites.ReadWrite.All

**Display Name:** Read and write items in all site collections  
**Permission ID:** 9492366f-7969-46a4-8d15-ed1a20078fff  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:33  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete documents and list items in all site collections without a signed in user.

#### Common Use Cases
- Sites information retrieval
- Reporting and analytics
- Compliance and auditing
- Sites management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read sites data
const items = await client
  .api('/sites')
  .get();

// Create new sites
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/sites')
  .post(newItem);

// Update sites
await client
  .api(`/sites/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete sites
await client
  .api(`/sites/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete documents and list items in all site collections without a signed in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 6. Sites.Selected

**Display Name:** Access selected site collections  
**Permission ID:** 883ea226-0bf2-4a8f-9f9d-92c9162a727d  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:29  
**Risk Level:** Low

#### Description
Allow the application to access a subset of site collections without a signed in user.  The specific site collections and the permissions granted will be configured in SharePoint Online.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Access selected site collections
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allow the application to access a subset of site collections without a signed in user.  The specific site collections and the permissions granted will be configured in SharePoint Online.
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

- [Microsoft Graph Sites Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Sites  
**Total Permissions:** 6  
**Documentation Version:** 1.0
