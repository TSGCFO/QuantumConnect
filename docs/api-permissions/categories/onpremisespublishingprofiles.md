# OnPremisesPublishingProfiles Permissions

## Overview

This document provides comprehensive information about **OnPremisesPublishingProfiles** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. OnPremisesPublishingProfiles.ReadWrite.All

**Display Name:** Manage on-premises published resources  
**Permission ID:** 0b57845e-aa49-4e6f-8109-ce654fffa618  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:12  
**Risk Level:** Critical

#### Description
Allows the app to create, view, update and delete on-premises published resources, on-premises agents and agent groups, as part of a hybrid identity configuration, without a signed in user.

#### Common Use Cases
- OnPremisesPublishingProfiles information retrieval
- Reporting and analytics
- Compliance and auditing
- OnPremisesPublishingProfiles management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read onpremisespublishingprofiles data
const items = await client
  .api('/onpremisespublishingprofiless')
  .get();

// Create new onpremisespublishingprofiles
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/onpremisespublishingprofiless')
  .post(newItem);

// Update onpremisespublishingprofiles
await client
  .api(`/onpremisespublishingprofiless/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete onpremisespublishingprofiles
await client
  .api(`/onpremisespublishingprofiless/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, view, update and delete on-premises published resources, on-premises agents and agent groups, as part of a hybrid identity configuration, without a signed in user.
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

- [Microsoft Graph OnPremisesPublishingProfiles Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** OnPremisesPublishingProfiles  
**Total Permissions:** 1  
**Documentation Version:** 1.0
