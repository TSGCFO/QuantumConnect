# OnlineMeetingAiInsight Permissions

## Overview

This document provides comprehensive information about **OnlineMeetingAiInsight** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. OnlineMeetingAiInsight.Read.All

**Display Name:** Read all AI Insights for online meetings.  
**Permission ID:** c0cf7895-985f-42d4-a693-b618f36674ad  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:10  
**Risk Level:** Medium

#### Description
Allows the app to read all AI Insights for all online meetings, without a signed-in user.

#### Common Use Cases
- OnlineMeetingAiInsight information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read onlinemeetingaiinsight data
const data = await client
  .api('/onlinemeetingaiinsights')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read all AI Insights for all online meetings, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. OnlineMeetingAiInsight.Read.Chat

**Display Name:** Read all AI Insights for online meetings where the Teams application is installed.  
**Permission ID:** 01892c31-3b66-4bcf-b5f5-bf0a03d5ed9f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:10  
**Risk Level:** Low

#### Description
Allows the teams-app to read all aiInsights for online meetings where the Teams-app is installed, without a signed-in user.

#### Common Use Cases
- OnlineMeetingAiInsight information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read onlinemeetingaiinsight data
const data = await client
  .api('/onlinemeetingaiinsights')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the teams-app to read all aiInsights for online meetings where the Teams-app is installed, without a signed-in user.
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

- [Microsoft Graph OnlineMeetingAiInsight Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** OnlineMeetingAiInsight  
**Total Permissions:** 2  
**Documentation Version:** 1.0
