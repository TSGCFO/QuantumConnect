# Chat Permissions

## Overview

This document provides comprehensive information about **Chat** permissions in Microsoft Graph API.

**Total Permissions:** 9

## Permissions List

### 1. Chat.Create

**Display Name:** Create chats  
**Permission ID:** d9c48af6-9ad9-47ad-82c3-63757137b9af  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:42  
**Risk Level:** Low

#### Description
Allows the app to create chats without a signed-in user.

#### Common Use Cases
- Chat provisioning
- Automated setup processes

#### Code Example
```javascript
// Example usage for Create chats
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to create chats without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. Chat.ManageDeletion.All

**Display Name:** Delete and recover deleted chats  
**Permission ID:** 9c7abde0-eacd-4319-bf9e-35994b1a1717  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:42  
**Risk Level:** Critical

#### Description
Allows the app to delete and recover deleted chats, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Delete and recover deleted chats
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to delete and recover deleted chats, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. Chat.Read.All

**Display Name:** Read all chat messages  
**Permission ID:** 6b7d71aa-70aa-4810-a8d9-5d9fb2830017  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:42  
**Risk Level:** Medium

#### Description
Allows the app to read all 1-to-1 or group chat messages in Microsoft Teams.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read chat data
const data = await client
  .api('/chats')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read all 1-to-1 or group chat messages in Microsoft Teams.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. Chat.Read.WhereInstalled

**Display Name:** Read all chat messages for chats where the associated Teams application is installed.  
**Permission ID:** 1c1b4c8e-3cc7-4c58-8470-9b92c9d5848b  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:43  
**Risk Level:** Low

#### Description
Allows the app to read all one-to-one or group chat messages in Microsoft Teams for chats where the associated Teams application is installed, without a signed-in user.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read chat data
const data = await client
  .api('/chats')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the app to read all one-to-one or group chat messages in Microsoft Teams for chats where the associated Teams application is installed, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. Chat.ReadBasic.All

**Display Name:** Read names and members of all chat threads  
**Permission ID:** b2e060da-3baf-4687-9611-f4ebc0f0cbde  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:43  
**Risk Level:** Medium

#### Description
Read names and members of all one-to-one and group chats in Microsoft Teams, without a signed-in user.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Read names and members of all chat threads
// Implement based on specific use case
```

#### Security Considerations
**MEDIUM RISK**: Read names and members of all one-to-one and group chats in Microsoft Teams, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 6. Chat.ReadBasic.WhereInstalled

**Display Name:** Read names and members of all chat threads where the associated Teams application is installed.  
**Permission ID:** 818ba5bd-5b3e-4fe0-bbe6-aa4686669073  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:43  
**Risk Level:** Low

#### Description
Allows the app to read names and members of all one-to-one and group chats in Microsoft Teams where the associated Teams application is installed, without a signed-in user.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Read names and members of all chat threads where the associated Teams application is installed.
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to read names and members of all one-to-one and group chats in Microsoft Teams where the associated Teams application is installed, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 7. Chat.ReadWrite.All

**Display Name:** Read and write all chat messages  
**Permission ID:** 294ce7c9-31ba-490a-ad7d-97a7d075e4ed  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:43  
**Risk Level:** High

#### Description
Allows an app to read and write all chat messages in Microsoft Teams, without a signed-in user.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing
- Chat management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read chat data
const items = await client
  .api('/chats')
  .get();

// Create new chat
const newChat = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/chats')
  .post(newChat);

// Update chat
await client
  .api('/chats/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete chat
await client
  .api('/chats/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows an app to read and write all chat messages in Microsoft Teams, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 8. Chat.ReadWrite.WhereInstalled

**Display Name:** Read and write all chat messages for chats where the associated Teams application is installed.  
**Permission ID:** ad73ce80-f3cd-40ce-b325-df12c33df713  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:43  
**Risk Level:** High

#### Description
Allows the app to read and write all chat messages in Microsoft Teams for chats where the associated Teams application is installed, without a signed-in user.

#### Common Use Cases
- Chat information retrieval
- Reporting and analytics
- Compliance and auditing
- Chat management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write all chat messages for chats where the associated Teams application is installed.
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write all chat messages in Microsoft Teams for chats where the associated Teams application is installed, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 9. Chat.UpdatePolicyViolation.All

**Display Name:** Flag chat messages for violating policy  
**Permission ID:** 7e847308-e030-4183-9899-5235d7270f58  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:51:43  
**Risk Level:** High

#### Description
Allows the app to update Microsoft Teams 1-to-1 or group chat messages by patching a set of Data Loss Prevention (DLP) policy violation properties to handle the output of DLP processing.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Flag chat messages for violating policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to update Microsoft Teams 1-to-1 or group chat messages by patching a set of Data Loss Prevention (DLP) policy violation properties to handle the output of DLP processing.
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

- [Microsoft Graph Chat Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Chat  
**Total Permissions:** 9  
**Documentation Version:** 1.0
