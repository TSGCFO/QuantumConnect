# DeviceLocalCredential Permissions

## Overview

This document provides comprehensive information about **DeviceLocalCredential** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. DeviceLocalCredential.Read.All

**Display Name:** Read device local credential passwords  
**Permission ID:** 884b599e-4d48-43a5-ba94-15c414d00588  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:49  
**Risk Level:** Medium

#### Description
Allows the app to read device local credential properties including passwords, without a signed-in user.

#### Common Use Cases
- DeviceLocalCredential information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read devicelocalcredential data
const data = await client
  .api('/devicelocalcredentials')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read device local credential properties including passwords, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. DeviceLocalCredential.ReadBasic.All

**Display Name:** Read device local credential properties  
**Permission ID:** db51be59-e728-414b-b800-e0f010df1a79  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:49  
**Risk Level:** Medium

#### Description
Allows the app to read device local credential properties excluding passwords, without a signed-in user.

#### Common Use Cases
- DeviceLocalCredential information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Read device local credential properties
// Implement based on specific use case
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read device local credential properties excluding passwords, without a signed-in user.
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

- [Microsoft Graph DeviceLocalCredential Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** DeviceLocalCredential  
**Total Permissions:** 2  
**Documentation Version:** 1.0
