# AgentInstance Permissions

## Overview

This document provides comprehensive information about **AgentInstance** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. AgentInstance.ReadWrite.All

**Display Name:** Read and write all agent instances in Agent Registry  
**Permission ID:** 07abdd95-78dc-4353-bd32-09f880ea43d0  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:30  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete all agent instances in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentInstance information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentInstance management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read agentinstance data
const items = await client
  .api('/agentinstances')
  .get();

// Create new agentinstance
const newAgentinstance = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/agentinstances')
  .post(newAgentinstance);

// Update agentinstance
await client
  .api('/agentinstances/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete agentinstance
await client
  .api('/agentinstances/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete all agent instances in your organization's Agent Registry without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. AgentInstance.ReadWrite.ManagedBy

**Display Name:** Read and write managed-by agent instances in Agent Registry  
**Permission ID:** 782ab1bf-24f1-4c27-8bbc-2006d42792a6  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:30  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete agent instances that designate the calling app as their manager in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentInstance information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentInstance management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write managed-by agent instances in Agent Registry
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete agent instances that designate the calling app as their manager in your organization's Agent Registry without a signed-in user.
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

- [Microsoft Graph AgentInstance Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AgentInstance  
**Total Permissions:** 2  
**Documentation Version:** 1.0
