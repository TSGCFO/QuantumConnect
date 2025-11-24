# UserNotification Permissions

## Overview

This document provides comprehensive information about **UserNotification** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. UserNotification.ReadWrite.CreatedByApp

**Display Name:** Deliver and manage all user's notifications  
**Permission ID:** 4e774092-a092-48d1-90bd-baad67c7eb47  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:51  
**Risk Level:** Critical

#### Description
Allows the app to send, read, update and delete user’s notifications, without a signed-in user.

#### Common Use Cases
- UserNotification information retrieval
- Reporting and analytics
- Compliance and auditing
- UserNotification management
- Automated workflows
- Data synchronization
- UserNotification provisioning
- Automated setup processes

#### Code Example
```javascript
// Example usage for Deliver and manage all user's notifications
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to send, read, update and delete user’s notifications, without a signed-in user.
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

- [Microsoft Graph UserNotification Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** UserNotification  
**Total Permissions:** 1  
**Documentation Version:** 1.0
