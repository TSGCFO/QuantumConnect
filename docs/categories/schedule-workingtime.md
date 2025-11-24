# Schedule-WorkingTime Permissions

## Overview

This document provides comprehensive information about **Schedule-WorkingTime** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. Schedule-WorkingTime.ReadWrite.All

**Display Name:** Trigger working time policies and read the working time status  
**Permission ID:** 0b21c159-dbf4-4dbb-a6f6-490e412c716e  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:26  
**Risk Level:** High

#### Description
Allows the app to trigger the working time policies and read the working time status for other users in your organization, without a signed-in user.

#### Common Use Cases
- Schedule-WorkingTime information retrieval
- Reporting and analytics
- Compliance and auditing
- Schedule-WorkingTime management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read schedule-workingtime data
const items = await client
  .api('/schedule-workingtimes')
  .get();

// Create new schedule-workingtime
const newSchedule-workingtime = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/schedule-workingtimes')
  .post(newSchedule-workingtime);

// Update schedule-workingtime
await client
  .api('/schedule-workingtimes/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete schedule-workingtime
await client
  .api('/schedule-workingtimes/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to trigger the working time policies and read the working time status for other users in your organization, without a signed-in user.
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

- [Microsoft Graph Schedule-WorkingTime Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Schedule-WorkingTime  
**Total Permissions:** 1  
**Documentation Version:** 1.0
