# ServiceHealth Permissions

## Overview

This document provides comprehensive information about **ServiceHealth** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. ServiceHealth.Read.All

**Display Name:** Read service health  
**Permission ID:** 79c261e0-fe76-4144-aad5-bdc68fbe4037  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:32  
**Risk Level:** Medium

#### Description
Allows the app to read your tenant's service health information, without a signed-in user. Health information may include service issues or service health overviews.

#### Common Use Cases
- ServiceHealth information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read servicehealth data
const data = await client
  .api('/servicehealths')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read your tenant's service health information, without a signed-in user. Health information may include service issues or service health overviews.
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

- [Microsoft Graph ServiceHealth Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** ServiceHealth  
**Total Permissions:** 1  
**Documentation Version:** 1.0
