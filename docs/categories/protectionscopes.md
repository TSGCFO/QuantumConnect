# ProtectionScopes Permissions

## Overview

This document provides comprehensive information about **ProtectionScopes** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. ProtectionScopes.Compute.All

**Display Name:** Compute Purview policies at tenant scope  
**Permission ID:** e5a76501-dbb0-492c-ab55-5d09e8837263  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:21  
**Risk Level:** Low

#### Description
Allows the app to identify Purview data protection, compliance and governance policy scopes defined for all users across tenant.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Compute Purview policies at tenant scope
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to identify Purview data protection, compliance and governance policy scopes defined for all users across tenant.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. ProtectionScopes.Compute.User

**Display Name:** Compute Purview policies for an individual user  
**Permission ID:** fe696d63-5e1f-4515-8232-cccc316903c6  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:21  
**Risk Level:** Low

#### Description
Allows the app to identify Purview data protection, compliance and governance policy scopes defined for an individual user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Compute Purview policies for an individual user
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to identify Purview data protection, compliance and governance policy scopes defined for an individual user.
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

- [Microsoft Graph ProtectionScopes Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** ProtectionScopes  
**Total Permissions:** 2  
**Documentation Version:** 1.0
