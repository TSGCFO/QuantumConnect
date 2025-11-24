# AuditLogsQuery-CRM Permissions

## Overview

This document provides comprehensive information about **AuditLogsQuery-CRM** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. AuditLogsQuery-CRM.Read.All

**Display Name:** Read audit logs data from Dynamics CRM workload  
**Permission ID:** 20e6f8e4-ffac-4cf7-82f7-70ddb7564318  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:33  
**Risk Level:** Medium

#### Description
Allows the app to read and query audit logs from Dynamics CRM workload, without a signed-in user

#### Common Use Cases
- AuditLogsQuery-CRM information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read auditlogsquery-crm data
const data = await client
  .api('/auditlogsquery-crms')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read and query audit logs from Dynamics CRM workload, without a signed-in user
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

- [Microsoft Graph AuditLogsQuery-CRM Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AuditLogsQuery-CRM  
**Total Permissions:** 1  
**Documentation Version:** 1.0
