# ProgramControl Permissions

## Overview

This document provides comprehensive information about **ProgramControl** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. ProgramControl.ReadWrite.All

**Display Name:** Manage all programs  
**Permission ID:** 60a901ed-09f7-4aa5-a16e-7dd3d6f9de36  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:21  
**Risk Level:** Critical

#### Description
Allows the app to read, update, delete and perform actions on programs and program controls in the organization, without a signed-in user.

#### Common Use Cases
- ProgramControl information retrieval
- Reporting and analytics
- Compliance and auditing
- ProgramControl management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read programcontrol data
const items = await client
  .api('/programcontrols')
  .get();

// Create new programcontrol
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/programcontrols')
  .post(newItem);

// Update programcontrol
await client
  .api(`/programcontrols/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete programcontrol
await client
  .api(`/programcontrols/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, update, delete and perform actions on programs and program controls in the organization, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
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

- [Microsoft Graph ProgramControl Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** ProgramControl  
**Total Permissions:** 1  
**Documentation Version:** 1.0
