# AgentCardManifest Permissions

## Overview

This document provides comprehensive information about **AgentCardManifest** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. AgentCardManifest.ReadWrite.All

**Display Name:** Read and write all agent card manifests in Agent Registry  
**Permission ID:** 228b1a03-f7ca-4348-b50d-e8a547ab61af  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:29  
**Risk Level:** High

#### Description
Allows the app to read and write to all agent card manifests in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCardManifest information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCardManifest management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read agentcardmanifest data
const items = await client
  .api('/agentcardmanifests')
  .get();

// Create new agentcardmanifest
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/agentcardmanifests')
  .post(newItem);

// Update agentcardmanifest
await client
  .api(`/agentcardmanifests/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete agentcardmanifest
await client
  .api(`/agentcardmanifests/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write to all agent card manifests in your organization's Agent Registry without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. AgentCardManifest.ReadWrite.ManagedBy

**Display Name:** Read and write managed-by agent card manifests in Agent Registry  
**Permission ID:** 77f6034c-52f5-4526-9fa1-d55a67e72cc4  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:29  
**Risk Level:** High

#### Description
Allows the app to read and write agent card manifests that name it as manager in your organization's Agent Registry without a signed-in user.

#### Common Use Cases
- AgentCardManifest information retrieval
- Reporting and analytics
- Compliance and auditing
- AgentCardManifest management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write managed-by agent card manifests in Agent Registry
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write agent card manifests that name it as manager in your organization's Agent Registry without a signed-in user.
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

- [Microsoft Graph AgentCardManifest Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** AgentCardManifest  
**Total Permissions:** 2  
**Documentation Version:** 1.0
