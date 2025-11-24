# AgentCard Permissions

## Overview

This document provides comprehensive information about **AgentCard** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. AgentCard.ReadWrite.All

**Display Name:** Read and write all agent cards in Agent Registry  
**Permission ID:** ef566853-42d6-45a5-bed9-5ccb82c98b4f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:29  
**Risk Level:** Critical

#### Description
Allows the app to create, read, update, and delete all agent cards and manage their skills in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCard information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCard management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read agentcard data
const items = await client
  .api('/agentcards')
  .get();

// Create new agentcard
const newAgentcard = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/agentcards')
  .post(newAgentcard);

// Update agentcard
await client
  .api('/agentcards/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete agentcard
await client
  .api('/agentcards/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, read, update, and delete all agent cards and manage their skills in your organization's Agent Registry without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. AgentCard.ReadWrite.ManagedBy

**Display Name:** Read and write managed-by agent cards in Agent Registry  
**Permission ID:** 9c4a07db-e0c1-4fb0-8e85-dfd8ae3b8201  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:29  
**Risk Level:** High

#### Description
Allows the app to read and update agent cards that designate the calling app as their manager and manage their skills in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCard information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCard management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write managed-by agent cards in Agent Registry
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and update agent cards that designate the calling app as their manager and manage their skills in your organization's Agent Registry without a signed-in user.
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

- [Microsoft Graph AgentCard Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AgentCard  
**Total Permissions:** 2  
**Documentation Version:** 1.0
