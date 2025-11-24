# People Permissions

## Overview

This document provides comprehensive information about **People** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. People.Read.All

**Display Name:** Read all users' relevant people lists  
**Permission ID:** b528084d-ad10-4598-8b93-929746b4d7d6  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:15  
**Risk Level:** Medium

#### Description
Allows the app to read any user's scored list of relevant people, without a signed-in user. The list can include local contacts, contacts from social networking, your organization's directory, and people from recent communications (such as email and Skype).

#### Common Use Cases
- People information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read people data
const data = await client
  .api('/peoples')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read any user's scored list of relevant people, without a signed-in user. The list can include local contacts, contacts from social networking, your organization's directory, and people from recent communications (such as email and Skype).
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

- [Microsoft Graph People Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** People  
**Total Permissions:** 1  
**Documentation Version:** 1.0
