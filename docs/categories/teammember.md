# TeamMember Permissions

## Overview

This document provides comprehensive information about **TeamMember** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. TeamMember.ReadWrite.All

**Display Name:** Add and remove members from all teams  
**Permission ID:** 0121dc95-1b9f-4aed-8bac-58c5ac466691  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:36  
**Risk Level:** Critical

#### Description
Add and remove members from all teams, without a signed-in user. Also allows changing a team member's role, for example from owner to non-owner.

#### Common Use Cases
- TeamMember information retrieval
- Reporting and analytics
- Compliance and auditing
- TeamMember management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read teammember data
const items = await client
  .api('/teammembers')
  .get();

// Create new teammember
const newTeammember = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/teammembers')
  .post(newTeammember);

// Update teammember
await client
  .api('/teammembers/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete teammember
await client
  .api('/teammembers/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Add and remove members from all teams, without a signed-in user. Also allows changing a team member's role, for example from owner to non-owner.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. TeamMember.ReadWriteNonOwnerRole.All

**Display Name:** Add and remove members with non-owner role for all teams  
**Permission ID:** 4437522e-9a86-4a41-a7da-e380edd4a97d  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:36  
**Risk Level:** Critical

#### Description
Add and remove members from all teams, without a signed-in user. Does not allow adding or removing a member with the owner role. Additionally, does not allow the app to elevate an existing member to the owner role.

#### Common Use Cases
- TeamMember information retrieval
- Reporting and analytics
- Compliance and auditing
- TeamMember management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Add and remove members with non-owner role for all teams
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Add and remove members from all teams, without a signed-in user. Does not allow adding or removing a member with the owner role. Additionally, does not allow the app to elevate an existing member to the owner role.
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

- [Microsoft Graph TeamMember Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** TeamMember  
**Total Permissions:** 2  
**Documentation Version:** 1.0
