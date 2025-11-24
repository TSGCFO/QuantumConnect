# CrossTenantInformation Permissions

## Overview

This document provides comprehensive information about **CrossTenantInformation** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. CrossTenantInformation.ReadBasic.All

**Display Name:** Read cross-tenant basic information  
**Permission ID:** cac88765-0581-4025-9725-5ebc13f729ee  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:46  
**Risk Level:** Medium

#### Description
Allows the application to obtain basic tenant information about another target tenant within the Azure AD ecosystem without a signed-in user.

#### Common Use Cases
- CrossTenantInformation information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Read cross-tenant basic information
// Implement based on specific use case
```

#### Security Considerations
**MEDIUM RISK**: Allows the application to obtain basic tenant information about another target tenant within the Azure AD ecosystem without a signed-in user.
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

- [Microsoft Graph CrossTenantInformation Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** CrossTenantInformation  
**Total Permissions:** 1  
**Documentation Version:** 1.0
