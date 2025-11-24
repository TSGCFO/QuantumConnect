# User Permissions

## Overview

User permissions control access to user profile information, authentication methods, and user management operations in Microsoft 365. These permissions are essential for employee portal functionality, enabling user management, authentication, and profile operations.

**Total Permissions in Category:** 11

## Permissions List

### 1. User.Read.All

**Display Name:** Read all users' full profiles  
**Permission ID:** df021288-bdef-4463-88db-98f22de89214  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to read user profiles without a signed in user. This includes basic profile information such as display name, email, job title, department, and other directory attributes.

#### Common Use Cases
- Employee directory listing
- Organization chart display
- User search functionality
- Profile information display
- Contact information lookup

#### Code Example
```javascript
// Read a specific user's profile
const user = await client
  .api('/users/user@example.com')
  .select('displayName,mail,jobTitle,department,officeLocation')
  .get();

console.log(`Name: ${user.displayName}`);
console.log(`Email: ${user.mail}`);
console.log(`Title: ${user.jobTitle}`);
```

#### Security Considerations
- This permission provides read access to all user profiles in the organization
- Does not include sensitive information like passwords
- Consider data privacy regulations when displaying user information
- Implement appropriate access controls in your application

---

### 2. User.ReadWrite.All

**Display Name:** Read and write all users' full profiles  
**Permission ID:** 741f803b-c850-494e-b5df-cde7c675a1ca  
**Type:** Application  
**Assigned Date:** 2025-11-23 (assigned twice)

#### Description
Allows the app to read and update user profiles without a signed in user. This enables full management of user profile information.

#### Common Use Cases
- User onboarding workflows
- Profile synchronization from external systems
- Bulk user updates
- Department or location changes
- Manager assignments

#### Code Example
```javascript
// Update a user's profile
const updatedUser = {
  jobTitle: 'Senior Software Engineer',
  department: 'Engineering',
  officeLocation: 'Building 5, Floor 3'
};

await client
  .api('/users/user@example.com')
  .patch(updatedUser);

console.log('User profile updated successfully');
```

#### Security Considerations
- **HIGH RISK**: This permission allows modification of user profiles
- Implement strict validation before updating user information
- Log all user profile changes for audit purposes
- Consider requiring additional approval for sensitive field updates
- Does not allow password changes (use User-PasswordProfile.ReadWrite.All)

---

### 3. User.ReadBasic.All

**Display Name:** Read all users' basic profiles  
**Permission ID:** 97235f07-e226-4f63-ace3-39588e11d3a1  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to read a basic set of profile properties of other users in your organization without a signed-in user. Includes display name, first and last name, email address, open extensions, and photo.

#### Common Use Cases
- Basic employee directory
- People picker functionality
- Email address autocomplete
- Simple org chart
- User mentions in comments

#### Code Example
```javascript
// Get basic user information for autocomplete
const users = await client
  .api('/users')
  .select('displayName,mail,givenName,surname')
  .filter("startswith(displayName, 'John')")
  .top(10)
  .get();

users.value.forEach(user => {
  console.log(`${user.displayName} <${user.mail}>`);
});
```

#### Security Considerations
- More restricted than User.Read.All
- Only provides basic, non-sensitive information
- Suitable for public-facing employee directories
- Still includes email addresses - consider privacy implications

---

### 4. User.Invite.All

**Display Name:** Invite guest users to the organization  
**Permission ID:** 09850681-111b-4a89-9bed-3f2cae46d706  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to invite guest users to the organization, without a signed-in user.

#### Common Use Cases
- Vendor onboarding
- Partner collaboration setup
- External consultant access
- Guest user management
- B2B collaboration

#### Code Example
```javascript
// Invite a guest user
const invitation = {
  invitedUserEmailAddress: 'external.user@partner.com',
  inviteRedirectUrl: 'https://portal.example.com',
  sendInvitationMessage: true,
  invitedUserMessageInfo: {
    customizedMessageBody: 'Welcome to our collaboration portal!'
  }
};

const result = await client
  .api('/invitations')
  .post(invitation);

console.log(`Invitation sent. Redemption URL: ${result.inviteRedeemUrl}`);
```

#### Security Considerations
- **MEDIUM RISK**: Allows adding external users to your tenant
- Implement approval workflows for guest invitations
- Monitor and audit guest user invitations
- Set appropriate guest user access policies
- Review guest users regularly and remove inactive accounts

---

### 5. User.EnableDisableAccount.All

**Display Name:** Enable and disable user accounts  
**Permission ID:** 3011c876-62b7-4ada-afa2-506cbbecc68c  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to enable and disable users' accounts, without a signed-in user.

#### Common Use Cases
- Employee offboarding
- Temporary account suspension
- Security incident response
- Automated account lifecycle management
- Compliance requirements

#### Code Example
```javascript
// Disable a user account
await client
  .api('/users/user@example.com')
  .patch({
    accountEnabled: false
  });

console.log('User account disabled');

// Enable a user account
await client
  .api('/users/user@example.com')
  .patch({
    accountEnabled: true
  });

console.log('User account enabled');
```

#### Security Considerations
- **HIGH RISK**: Can disable user access to all resources
- Implement strict approval workflows
- Log all account enable/disable actions
- Consider impact on user's access to critical systems
- Ensure proper notification to affected users and managers

---

### 6. User.DeleteRestore.All

**Display Name:** Delete and restore all users  
**Permission ID:** eccc023d-eccf-4e7b-9683-8813ab36cecc  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to delete and restore all users, without a signed-in user.

#### Common Use Cases
- Employee termination workflows
- Account cleanup processes
- Accidental deletion recovery
- Compliance with data retention policies
- User lifecycle management

#### Code Example
```javascript
// Soft delete a user (moves to recycle bin)
await client
  .api('/users/user@example.com')
  .delete();

console.log('User deleted (soft delete)');

// Restore a deleted user
await client
  .api('/directory/deletedItems/user-id/restore')
  .post({});

console.log('User restored');

// Permanently delete a user
await client
  .api('/directory/deletedItems/user-id')
  .delete();

console.log('User permanently deleted');
```

#### Security Considerations
- **CRITICAL RISK**: Can permanently delete user accounts
- Implement multi-level approval for deletions
- Always use soft delete initially (30-day recovery window)
- Document deletion reasons for compliance
- Backup user data before deletion
- Consider data ownership transfer before deletion

---

### 7. User.Export.All

**Display Name:** Export user's data  
**Permission ID:** 405a51b5-8d8d-430b-9842-8be4b0e9f324  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to export data (e.g. customer content or system-generated logs), associated with any user in your company, when the app is used by a privileged user (e.g. a Company Administrator).

#### Common Use Cases
- GDPR data subject requests
- Data portability requirements
- Legal discovery processes
- Compliance audits
- User data archival

#### Code Example
```javascript
// Export user data (conceptual - actual API varies by service)
const exportRequest = {
  userId: 'user@example.com',
  dataTypes: ['emails', 'files', 'calendar', 'contacts'],
  dateRange: {
    start: '2023-01-01',
    end: '2024-12-31'
  }
};

// Note: Actual implementation depends on specific Microsoft 365 services
const exportJob = await client
  .api('/users/user@example.com/exportPersonalData')
  .post(exportRequest);

console.log(`Export job created: ${exportJob.id}`);
```

#### Security Considerations
- **HIGH RISK**: Provides access to all user data
- Use only for legitimate compliance purposes
- Encrypt exported data
- Log all export operations with justification
- Implement strict access controls
- Ensure compliance with data protection regulations

---

### 8. User.ManageIdentities.All

**Display Name:** Manage all users' identities  
**Permission ID:** c529cfca-c91b-489c-af2b-d92990b66ce6  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to read, update and delete identities that are associated with a user's account, without a signed in user. This controls the identities users can sign-in with.

#### Common Use Cases
- Multi-identity management
- External identity provider configuration
- Social login setup
- Identity federation
- Cross-tenant identity management

#### Code Example
```javascript
// Add an external identity to a user
const identity = {
  signInType: 'federated',
  issuer: 'contoso.com',
  issuerAssignedId: 'external.user@contoso.com'
};

await client
  .api('/users/user@example.com/identities')
  .post(identity);

// List user identities
const identities = await client
  .api('/users/user@example.com/identities')
  .get();

identities.value.forEach(id => {
  console.log(`Type: ${id.signInType}, Issuer: ${id.issuer}`);
});
```

#### Security Considerations
- **HIGH RISK**: Controls how users authenticate
- Verify identity provider trust before adding external identities
- Monitor for unauthorized identity changes
- Implement MFA requirements regardless of identity type
- Regular audit of user identities

---

### 9. User.RevokeSessions.All

**Display Name:** Revoke all sign in sessions for a user  
**Permission ID:** 77f3a031-c388-4f99-b373-dc68676a979e  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allow the app to revoke all sign in sessions for a user, without a signed-in user.

#### Common Use Cases
- Security incident response
- Account compromise mitigation
- Password reset workflows
- Employee termination
- Device loss scenarios

#### Code Example
```javascript
// Revoke all user sessions
await client
  .api('/users/user@example.com/revokeSignInSessions')
  .post({});

console.log('All user sessions revoked successfully');
```

#### Security Considerations
- **MEDIUM RISK**: Forces user to re-authenticate
- Use for security incidents or suspicious activity
- Notify users when sessions are revoked
- Consider impact on user's ongoing work
- Document reason for session revocation
- Combine with password reset for compromised accounts

---

### 10. User.ReadWrite.CrossCloud

**Display Name:** Read and write profiles of users that originate from an external cloud  
**Permission ID:** 5652f862-b626-407b-a3e6-248aeb95763c  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to read and update external cloud user profiles without a signed in user.

#### Common Use Cases
- Multi-cloud user synchronization
- Cross-tenant collaboration
- Hybrid cloud identity management
- External user profile updates
- B2B collaboration management

#### Code Example
```javascript
// Read external cloud user
const externalUser = await client
  .api('/users/external.user@partner.com')
  .get();

// Update external user profile
await client
  .api('/users/external.user@partner.com')
  .patch({
    jobTitle: 'External Consultant',
    companyName: 'Partner Organization'
  });
```

#### Security Considerations
- Applies only to users from external cloud environments
- Verify external user identity before updates
- Monitor cross-cloud user changes
- Consider data residency requirements
- Implement appropriate trust boundaries

---

### 11. User-ConvertToInternal.ReadWrite.All

**Display Name:** Convert an external user to internal member user  
**Permission ID:** 9d952b72-f741-4b40-9185-8c53076c2339  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allow the app to convert an external user to an internal member user, without a signed-in user.

#### Common Use Cases
- Vendor-to-employee transitions
- Contractor conversion
- Acquisition user integration
- Partner employee transfer
- Identity type migration

#### Code Example
```javascript
// Convert external user to internal member
await client
  .api('/users/external.user@example.com/convertExternalToInternalMemberUser')
  .post({});

console.log('User converted to internal member');
```

#### Security Considerations
- **HIGH RISK**: Changes user's identity type and access level
- Implement strict approval workflows
- Verify user's employment status
- Update licenses and group memberships appropriately
- Document conversion reason for compliance
- Review and update user's permissions post-conversion

---

## Best Practices for User Permissions

### 1. Least Privilege Principle
- Use `User.ReadBasic.All` instead of `User.Read.All` when only basic information is needed
- Prefer specific permissions over broad "All" permissions when possible

### 2. Data Protection
- Encrypt user data in transit and at rest
- Implement data retention policies
- Comply with GDPR and other privacy regulations
- Anonymize or pseudonymize data when possible

### 3. Audit and Monitoring
- Log all user profile changes
- Monitor for suspicious patterns (bulk updates, unusual access times)
- Regular access reviews
- Alert on high-risk operations (deletions, conversions)

### 4. Access Controls
- Implement role-based access control (RBAC)
- Use Azure AD Privileged Identity Management for privileged operations
- Regular permission audits
- Implement just-in-time access where appropriate

### 5. User Communication
- Notify users of significant profile changes
- Provide self-service options where appropriate
- Clear documentation of data usage
- Transparent privacy policies

## Common Scenarios

### Scenario 1: Employee Onboarding
```javascript
async function onboardEmployee(employeeData) {
  // Create user account
  const newUser = {
    accountEnabled: true,
    displayName: `${employeeData.firstName} ${employeeData.lastName}`,
    mailNickname: employeeData.email.split('@')[0],
    userPrincipalName: employeeData.email,
    passwordProfile: {
      forceChangePasswordNextSignIn: true,
      password: generateSecurePassword()
    },
    jobTitle: employeeData.jobTitle,
    department: employeeData.department,
    officeLocation: employeeData.location
  };

  const user = await client.api('/users').post(newUser);
  
  // Assign to groups
  await assignUserToGroups(user.id, employeeData.groups);
  
  // Assign licenses
  await assignLicenses(user.id, employeeData.licenses);
  
  return user;
}
```

### Scenario 2: Employee Offboarding
```javascript
async function offboardEmployee(userId) {
  // 1. Disable account
  await client.api(`/users/${userId}`).patch({
    accountEnabled: false
  });
  
  // 2. Revoke sessions
  await client.api(`/users/${userId}/revokeSignInSessions`).post({});
  
  // 3. Remove from groups
  await removeUserFromAllGroups(userId);
  
  // 4. Transfer ownership of resources
  await transferUserResources(userId);
  
  // 5. After retention period, delete account
  // (Implement with scheduled job)
}
```

### Scenario 3: Bulk User Updates
```javascript
async function bulkUpdateDepartment(userIds, newDepartment) {
  const updates = userIds.map(userId => ({
    userId,
    update: { department: newDepartment }
  }));
  
  // Batch updates for efficiency
  const batchRequest = {
    requests: updates.map((item, index) => ({
      id: index.toString(),
      method: 'PATCH',
      url: `/users/${item.userId}`,
      body: item.update,
      headers: { 'Content-Type': 'application/json' }
    }))
  };
  
  const response = await client.api('/$batch').post(batchRequest);
  return response;
}
```

## Related Permissions

- **User-LifeCycleInfo.ReadWrite.All** - Manage employee lifecycle information
- **User-PasswordProfile.ReadWrite.All** - Manage user passwords
- **User-Phone.ReadWrite.All** - Manage phone numbers
- **User-Mail.ReadWrite.All** - Manage email addresses
- **UserAuthenticationMethod.ReadWrite.All** - Manage authentication methods
- **Directory.ReadWrite.All** - Broader directory access

## Additional Resources

- [Microsoft Graph User Resource Documentation](https://learn.microsoft.com/en-us/graph/api/resources/user)
- [User Management Best Practices](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-users-profile-azure-portal)
- [Privacy and User Data](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Identity Governance](https://learn.microsoft.com/en-us/azure/active-directory/governance/identity-governance-overview)

---

**Last Updated:** 2025-11-23  
**Category:** User Management  
**Risk Level:** High (Multiple high-risk permissions)
