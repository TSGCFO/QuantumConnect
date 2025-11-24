# RoleManagement Permissions

## Overview

This document provides comprehensive information about **RoleManagement** permissions in Microsoft Graph API.

**Total Permissions:** 7

## Permissions List

### 1. RoleManagement.Read.All

**Display Name:** Read role management data for all RBAC providers  
**Permission ID:** c7fbd983-d9aa-4fa7-84b8-17382c103bc4  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:20  
**Risk Level:** High

#### Description
Allows the app to read role-based access control (RBAC) settings for all RBAC providers without a signed-in user. This includes reading role definitions and role assignments.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read rolemanagement data
const data = await client
  .api('/rolemanagements')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**HIGH RISK**: Allows the app to read role-based access control (RBAC) settings for all RBAC providers without a signed-in user. This includes reading role definitions and role assignments.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. RoleManagement.Read.Defender

**Display Name:** Read M365 Defender RBAC configuration  
**Permission ID:** 4d6e30d1-e64e-4ae7-bf9d-c706cc928cef  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:20  
**Risk Level:** High

#### Description
Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read rolemanagement data
const data = await client
  .api('/rolemanagements')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**HIGH RISK**: Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. RoleManagement.Read.Directory

**Display Name:** Read all directory RBAC settings  
**Permission ID:** 483bed4a-2ad3-4361-a73b-c83ccdbdc53c  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:20  
**Risk Level:** High

#### Description
Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.  This includes reading directory role templates, directory roles and memberships.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read rolemanagement data
const data = await client
  .api('/rolemanagements')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**HIGH RISK**: Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.  This includes reading directory role templates, directory roles and memberships.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. RoleManagement.Read.Exchange

**Display Name:** Read Exchange Online RBAC configuration  
**Permission ID:** c769435f-f061-4d0b-8ff1-3d39870e5f85  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:21  
**Risk Level:** High

#### Description
Allows the app to read the role-based access control (RBAC) configuration for your organization's Exchange Online service, without a signed-in user. This includes reading Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read rolemanagement data
const data = await client
  .api('/rolemanagements')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**HIGH RISK**: Allows the app to read the role-based access control (RBAC) configuration for your organization's Exchange Online service, without a signed-in user. This includes reading Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. RoleManagement.ReadWrite.Defender

**Display Name:** Read M365 Defender RBAC configuration  
**Permission ID:** 8b7e8c0a-7e9d-4049-97ec-04b5e1bcaf05  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:25  
**Risk Level:** High

#### Description
Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing
- RoleManagement management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read M365 Defender RBAC configuration
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read the role-based access control (RBAC) settings for your company's directory, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 6. RoleManagement.ReadWrite.Directory

**Display Name:** Read and write all directory RBAC settings  
**Permission ID:** 9e3f62cf-ca93-4989-b6ce-bf83c28f9fe8  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:25  
**Risk Level:** High

#### Description
Allows the app to read and manage the role-based access control (RBAC) settings for your company's directory, without a signed-in user. This includes instantiating directory roles and managing directory role membership, and reading directory role templates, directory roles and memberships.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing
- RoleManagement management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write all directory RBAC settings
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and manage the role-based access control (RBAC) settings for your company's directory, without a signed-in user. This includes instantiating directory roles and managing directory role membership, and reading directory role templates, directory roles and memberships.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 7. RoleManagement.ReadWrite.Exchange

**Display Name:** Read and write Exchange Online RBAC configuration  
**Permission ID:** 025d3225-3f02-4882-b4c0-cd5b541a4e80  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:25  
**Risk Level:** High

#### Description
Allows the app to read and manage the role-based access control (RBAC) settings for your organization's Exchange Online service, without a signed-in user. This includes reading, creating, updating, and deleting Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.

#### Common Use Cases
- RoleManagement information retrieval
- Reporting and analytics
- Compliance and auditing
- RoleManagement management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write Exchange Online RBAC configuration
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and manage the role-based access control (RBAC) settings for your organization's Exchange Online service, without a signed-in user. This includes reading, creating, updating, and deleting Exchange management role definitions, role groups, role group membership, role assignments, management scopes, and role assignment policies.
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

- [Microsoft Graph RoleManagement Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** RoleManagement  
**Total Permissions:** 7  
**Documentation Version:** 1.0
