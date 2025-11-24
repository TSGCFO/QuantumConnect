# RoleEligibilitySchedule Permissions

## Overview

This document provides comprehensive information about **RoleEligibilitySchedule** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. RoleEligibilitySchedule.ReadWrite.Directory

**Display Name:** Read, update, and delete all eligible role assignments and schedules for your company's directory  
**Permission ID:** fee28b28-e1f3-4841-818e-2704dc62245f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:25  
**Risk Level:** High

#### Description
Allows the app to read and manage the eligible role-based access control (RBAC) assignments and schedules for your company's directory, without a signed-in user. This includes managing eligible directory role membership, and reading directory role templates, directory roles and eligible memberships.

#### Common Use Cases
- RoleEligibilitySchedule information retrieval
- Reporting and analytics
- Compliance and auditing
- RoleEligibilitySchedule management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read, update, and delete all eligible role assignments and schedules for your company's directory
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and manage the eligible role-based access control (RBAC) assignments and schedules for your company's directory, without a signed-in user. This includes managing eligible directory role membership, and reading directory role templates, directory roles and eligible memberships.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. RoleEligibilitySchedule.Remove.Directory

**Display Name:** Delete all eligible role assignments of your company's directory  
**Permission ID:** 79c7e69c-0d9f-4eff-97a8-49170a5a08ba  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:20  
**Risk Level:** Critical

#### Description
Delete all eligible privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Delete all eligible role assignments of your company's directory
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Delete all eligible privileged role-based access control (RBAC) assignments of your company's directory, without a signed-in user.
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

- [Microsoft Graph RoleEligibilitySchedule Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** RoleEligibilitySchedule  
**Total Permissions:** 2  
**Documentation Version:** 1.0
