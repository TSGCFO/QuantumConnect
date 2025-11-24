# User Permissions

## Overview

This document provides comprehensive information about **User** permissions in Microsoft Graph API.

**Total Permissions:** 11

## Permissions List

### 1. User.DeleteRestore.All

**Display Name:** Delete and restore all users  
**Permission ID:** eccc023d-eccf-4e7b-9683-8813ab36cecc  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:33  
**Risk Level:** Critical

#### Description
Allows the app to delete and restore all users, without a signed-in user.

#### Common Use Cases
- User lifecycle management
- Cleanup operations

#### Code Example
```javascript
// Example usage for Delete and restore all users
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to delete and restore all users, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. User.EnableDisableAccount.All

**Display Name:** Enable and disable user accounts  
**Permission ID:** 3011c876-62b7-4ada-afa2-506cbbecc68c  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:33  
**Risk Level:** Low

#### Description
Allows the app to enable and disable users' accounts, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Enable and disable user accounts
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to enable and disable users' accounts, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. User.Export.All

**Display Name:** Export user's data  
**Permission ID:** 405a51b5-8d8d-430b-9842-8be4b0e9f324  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:33  
**Risk Level:** Low

#### Description
Allows the app to export data (e.g. customer content or system-generated logs), associated with any user in your company, when the app is used by a privileged user (e.g. a Company Administrator).

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Export user's data
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to export data (e.g. customer content or system-generated logs), associated with any user in your company, when the app is used by a privileged user (e.g. a Company Administrator).
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. User.Invite.All

**Display Name:** Invite guest users to the organization  
**Permission ID:** 09850681-111b-4a89-9bed-3f2cae46d706  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:34  
**Risk Level:** Low

#### Description
Allows the app to invite guest users to the organization, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Invite guest users to the organization
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to invite guest users to the organization, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. User.ManageIdentities.All

**Display Name:** Manage all users' identities  
**Permission ID:** c529cfca-c91b-489c-af2b-d92990b66ce6  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:34  
**Risk Level:** Critical

#### Description
Allows the app to read, update and delete identities that are associated with a user's account, without a signed in user. This controls the identities users can sign-in with.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Manage all users' identities
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read, update and delete identities that are associated with a user's account, without a signed in user. This controls the identities users can sign-in with.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 6. User.Read.All

**Display Name:** Read all users' full profiles  
**Permission ID:** df021288-bdef-4463-88db-98f22de89214  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:34  
**Risk Level:** Medium

#### Description
Allows the app to read user profiles without a signed in user.

#### Common Use Cases
- User information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read user data
const data = await client
  .api('/users')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read user profiles without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 7. User.ReadBasic.All

**Display Name:** Read all users' basic profiles  
**Permission ID:** 97235f07-e226-4f63-ace3-39588e11d3a1  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:34  
**Risk Level:** Medium

#### Description
Allows the app to read a basic set of profile properties of other users in your organization without a signed-in user. Includes display name, first and last name, email address, open extensions, and photo.

#### Common Use Cases
- User information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Example usage for Read all users' basic profiles
// Implement based on specific use case
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read a basic set of profile properties of other users in your organization without a signed-in user. Includes display name, first and last name, email address, open extensions, and photo.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 8. User.ReadWrite.All

**Display Name:** Read and write all users' full profiles  
**Permission ID:** 741f803b-c850-494e-b5df-cde7c675a1ca  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:02:10  
**Risk Level:** High

#### Description
Allows the app to read and update user profiles without a signed in user.

#### Common Use Cases
- User information retrieval
- Reporting and analytics
- Compliance and auditing
- User management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read user data
const items = await client
  .api('/users')
  .get();

// Create new user
const newUser = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/users')
  .post(newUser);

// Update user
await client
  .api('/users/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete user
await client
  .api('/users/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and update user profiles without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 9. User.ReadWrite.All

**Display Name:** Read and write all users' full profiles  
**Permission ID:** 741f803b-c850-494e-b5df-cde7c675a1ca  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:47  
**Risk Level:** High

#### Description
Allows the app to read and update user profiles without a signed in user.

#### Common Use Cases
- User information retrieval
- Reporting and analytics
- Compliance and auditing
- User management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read user data
const items = await client
  .api('/users')
  .get();

// Create new user
const newUser = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/users')
  .post(newUser);

// Update user
await client
  .api('/users/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete user
await client
  .api('/users/${created.id}')
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and update user profiles without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 10. User.ReadWrite.CrossCloud

**Display Name:** Read and write profiles of users that originate from an external cloud.  
**Permission ID:** 5652f862-b626-407b-a3e6-248aeb95763c  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:47  
**Risk Level:** High

#### Description
Allows the app to read and update external cloud user profiles without a signed in user.

#### Common Use Cases
- User information retrieval
- Reporting and analytics
- Compliance and auditing
- User management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write profiles of users that originate from an external cloud.
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and update external cloud user profiles without a signed in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 11. User.RevokeSessions.All

**Display Name:** Revoke all sign in sessions for a user  
**Permission ID:** 77f3a031-c388-4f99-b373-dc68676a979e  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:34  
**Risk Level:** Low

#### Description
Allow the app to revoke all sign in sessions for a user, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Revoke all sign in sessions for a user
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allow the app to revoke all sign in sessions for a user, without a signed-in user.
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

- [Microsoft Graph User Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** User  
**Total Permissions:** 11  
**Documentation Version:** 1.0
