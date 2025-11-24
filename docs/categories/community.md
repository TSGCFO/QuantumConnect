# Community Permissions

## Overview

This document provides comprehensive information about **Community** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. Community.ReadWrite.All

**Display Name:** Read and write all Viva Engage communities  
**Permission ID:** 35d59e32-eab5-4553-9345-abb62b4c703c  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:44  
**Risk Level:** Critical

#### Description
Allows the app to create Viva Engage communities, read all community properties, update community properties, and delete communities without a signed-in user.

#### Common Use Cases
- Community information retrieval
- Reporting and analytics
- Compliance and auditing
- Community management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read community data
const items = await client
  .api('/communitys')
  .get();

// Create new community
const newCommunity = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/communitys')
  .post(newCommunity);

// Update community
await client
  .api('/communitys/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete community
await client
  .api('/communitys/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create Viva Engage communities, read all community properties, update community properties, and delete communities without a signed-in user.
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

- [Microsoft Graph Community Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Community  
**Total Permissions:** 1  
**Documentation Version:** 1.0
