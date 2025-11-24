# RoleAssignmentSchedule Permissions

## Overview

This document provides comprehensive information about **RoleAssignmentSchedule** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. RoleAssignmentSchedule.ReadWrite.Directory

**Display Name:** Read, update, and delete all policies for privileged role assignments of your company's directory  
**Permission ID:** dd199f4a-f148-40a4-a2ec-f0069cc799ec  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:25  
**Risk Level:** Critical

#### Description
Allows the app to read, update, and delete policies for privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

#### Common Use Cases
- RoleAssignmentSchedule information retrieval
- Reporting and analytics
- Compliance and auditing
- RoleAssignmentSchedule management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read, update, and delete all policies for privileged role assignments of your company's directory
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, update, and delete policies for privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. RoleAssignmentSchedule.Remove.Directory

**Display Name:** Delete all active role assignments of your company's directory  
**Permission ID:** d3495511-98b7-4df3-b317-4e35c19f6129  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:20  
**Risk Level:** Critical

#### Description
Delete all active privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Delete all active role assignments of your company's directory
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Delete all active privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.
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

- [Microsoft Graph RoleAssignmentSchedule Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** RoleAssignmentSchedule  
**Total Permissions:** 2  
**Documentation Version:** 1.0
