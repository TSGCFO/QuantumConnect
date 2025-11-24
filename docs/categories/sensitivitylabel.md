# SensitivityLabel Permissions

## Overview

This document provides comprehensive information about **SensitivityLabel** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. SensitivityLabel.Evaluate.All

**Display Name:** Evaluate labels tenant scope.  
**Permission ID:** 986fa56a-6680-4aac-af09-4d1765376739  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:21  
**Risk Level:** Low

#### Description
Allows the app to evaluate all sensitivity label.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Evaluate labels tenant scope.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to evaluate all sensitivity label.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. SensitivityLabel.Read

**Display Name:** Get labels application scope.  
**Permission ID:** 3b8e7aad-f6e3-4299-83f8-6fc6a5777f0b  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:30  
**Risk Level:** Low

#### Description
Allows the app to get sensitivity labels.

#### Common Use Cases
- SensitivityLabel information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Get labels application scope.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to get sensitivity labels.
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

- [Microsoft Graph SensitivityLabel Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** SensitivityLabel  
**Total Permissions:** 2  
**Documentation Version:** 1.0
