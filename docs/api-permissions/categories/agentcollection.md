# AgentCollection Permissions

## Overview

This document provides comprehensive information about **AgentCollection** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. AgentCollection.ReadWrite.All

**Display Name:** Read and write all collections in Agent Registry  
**Permission ID:** feb31d7d-a227-4487-898c-e014840d07b3  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:30  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete all collections and manage their membership in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCollection information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCollection management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read agentcollection data
const items = await client
  .api('/agentcollections')
  .get();

// Create new agentcollection
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/agentcollections')
  .post(newItem);

// Update agentcollection
await client
  .api(`/agentcollections/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete agentcollection
await client
  .api(`/agentcollections/${created.id}`)
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete all collections and manage their membership in your organization's Agent Registry without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. AgentCollection.ReadWrite.ManagedBy

**Display Name:** Read and write managed-by collections in Agent Registry  
**Permission ID:** 2e0fb698-9996-479f-926b-ce63f4397829  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:30  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete collections that designate the calling app as their manager and manage their membership in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCollection information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCollection management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write managed-by collections in Agent Registry
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete collections that designate the calling app as their manager and manage their membership in your organization's Agent Registry without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
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

- [Microsoft Graph AgentCollection Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AgentCollection  
**Total Permissions:** 2  
**Documentation Version:** 1.0
