# FileStorageContainer Permissions

## Overview

This document provides comprehensive information about **FileStorageContainer** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. FileStorageContainer.Selected

**Display Name:** Access selected file storage containers  
**Permission ID:** 40dc41bc-0f7e-42ff-89bd-d9516947e474  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:58  
**Risk Level:** Low

#### Description
Allows the application to utilize the file storage container platform to manage containers, without a signed-in user. The specific file storage containers and the permissions granted to them will be configured in Microsoft 365 by the developer of each container type.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Access selected file storage containers
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the application to utilize the file storage container platform to manage containers, without a signed-in user. The specific file storage containers and the permissions granted to them will be configured in Microsoft 365 by the developer of each container type.
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

- [Microsoft Graph FileStorageContainer Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** FileStorageContainer  
**Total Permissions:** 1  
**Documentation Version:** 1.0
