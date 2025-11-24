# Policy Permissions

## Overview

This document provides comprehensive information about **Policy** permissions in Microsoft Graph API.

**Total Permissions:** 23

## Permissions List

### 1. Policy.Read.All

**Display Name:** Read your organization's policies  
**Permission ID:** 246dd0d5-5bd0-4def-940b-0421030a5b68  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:18  
**Risk Level:** Medium

#### Description
Allows the app to read all your organization's policies without a signed in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**MEDIUM RISK**: Allows the app to read all your organization's policies without a signed in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. Policy.Read.AuthenticationMethod

**Display Name:** Read authentication method policies  
**Permission ID:** 8e3bc81b-d2f3-4b7b-838c-32c88218d2f0  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:18  
**Risk Level:** Low

#### Description
Allows the app to read all authentication method policies for the tenant, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the app to read all authentication method policies for the tenant, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. Policy.Read.ConditionalAccess

**Display Name:** Read your organization's conditional access policies  
**Permission ID:** 37730810-e9ba-4e46-b07e-8ca78d182097  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:18  
**Risk Level:** Low

#### Description
Allows the app to read your organization's conditional access policies, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the app to read your organization's conditional access policies, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. Policy.Read.DeviceConfiguration

**Display Name:** Read your organization's device configuration policies  
**Permission ID:** bdba4817-6ba1-4a7c-8a01-be9bc7c242dd  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:18  
**Risk Level:** Low

#### Description
Allows the application to read your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the application to read your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. Policy.Read.IdentityProtection

**Display Name:** Read your organization’s identity protection policy  
**Permission ID:** b21b72f6-4e6a-4533-9112-47eea9f97b28  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:18  
**Risk Level:** Low

#### Description
Allows the app to read your organization’s identity protection policy without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the app to read your organization’s identity protection policy without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 6. Policy.Read.PermissionGrant

**Display Name:** Read consent and permission grant policies  
**Permission ID:** 9e640839-a198-48fb-8b9a-013fd6f6cbcd  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:19  
**Risk Level:** Low

#### Description
Allows the app to read policies related to consent and permission grants for applications, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing

#### Code Example
```javascript
// Read policy data
const data = await client
  .api('/policys')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {
  console.log(`Item: ${item.displayName}`);
});
```

#### Security Considerations
**LOW RISK**: Allows the app to read policies related to consent and permission grants for applications, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 7. Policy.ReadWrite.AccessReview

**Display Name:** Read and write your organization's directory access review default policy  
**Permission ID:** 77c863fd-06c0-47ce-a7eb-49773e89d319  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:16  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's directory access review default policy without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's directory access review default policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's directory access review default policy without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 8. Policy.ReadWrite.ApplicationConfiguration

**Display Name:** Read and write your organization's application configuration policies  
**Permission ID:** be74164b-cff1-491c-8741-e671cb536e13  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:16  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's application configuration policies, without a signed-in user.  This includes policies such as activityBasedTimeoutPolicy, claimsMappingPolicy, homeRealmDiscoveryPolicy, tokenIssuancePolicy  and tokenLifetimePolicy.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's application configuration policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's application configuration policies, without a signed-in user.  This includes policies such as activityBasedTimeoutPolicy, claimsMappingPolicy, homeRealmDiscoveryPolicy, tokenIssuancePolicy  and tokenLifetimePolicy.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 9. Policy.ReadWrite.AuthenticationFlows

**Display Name:** Read and write authentication flow policies  
**Permission ID:** 25f85f3c-f66c-4205-8cd5-de92dd7f0cec  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:16  
**Risk Level:** High

#### Description
Allows the app to read and write all authentication flow policies for the tenant, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write authentication flow policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write all authentication flow policies for the tenant, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 10. Policy.ReadWrite.AuthenticationMethod

**Display Name:** Read and write all authentication method policies  
**Permission ID:** 29c18626-4985-4dcd-85c0-193eef327366  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:17  
**Risk Level:** High

#### Description
Allows the app to read and write all authentication method policies for the tenant, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write all authentication method policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write all authentication method policies for the tenant, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 11. Policy.ReadWrite.Authorization

**Display Name:** Read and write your organization's authorization policy  
**Permission ID:** fb221be6-99f2-473f-bd32-01c6a0e9ca3b  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:17  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's authorization policy without a signed in user. For example, authorization policies can control some of the permissions that the out-of-the-box user role has by default.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's authorization policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's authorization policy without a signed in user. For example, authorization policies can control some of the permissions that the out-of-the-box user role has by default.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 12. Policy.ReadWrite.ConditionalAccess

**Display Name:** Read and write your organization's conditional access policies  
**Permission ID:** 01c0a623-fc9b-48e9-b794-0756f8e8f067  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:17  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's conditional access policies, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's conditional access policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's conditional access policies, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 13. Policy.ReadWrite.ConsentRequest

**Display Name:** Read and write your organization's consent request policy  
**Permission ID:** 999f8c63-0a38-4f1b-91fd-ed1947bdd1a9  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:17  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's consent requests policy without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's consent request policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's consent requests policy without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 14. Policy.ReadWrite.CrossTenantAccess

**Display Name:** Read and write your organization's cross tenant access policies  
**Permission ID:** 338163d7-f101-4c92-94ba-ca46fe52447c  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:18  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's cross-tenant access policies and configuration for automatic user consent settings to suppress consent prompts for users of the other tenant on behalf of the signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's cross tenant access policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's cross-tenant access policies and configuration for automatic user consent settings to suppress consent prompts for users of the other tenant on behalf of the signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 15. Policy.ReadWrite.CrossTenantCapability

**Display Name:** Read and write your organization's M365 cross tenant access capabilities  
**Permission ID:** a6325ae7-2b73-4dbd-abed-fbeacfbf8696  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:18  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's M365 cross tenant access capabilities without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's M365 cross tenant access capabilities
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's M365 cross tenant access capabilities without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 16. Policy.ReadWrite.DeviceConfiguration

**Display Name:** Read and write your organization's device configuration policies  
**Permission ID:** 230fb2d5-aa21-49c1-bfa7-ae1be179d867  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:18  
**Risk Level:** High

#### Description
Allows the application to read and write your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's device configuration policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the application to read and write your organization's device configuration policies without a signed-in user.  For example, device registration policy can limit initial provisioning controls using quota restrictions, additional authentication and authorization checks.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 17. Policy.ReadWrite.ExternalIdentities

**Display Name:** Read and write your organization's external identities policy  
**Permission ID:** 03cc4f92-788e-4ede-b93f-199424d144a5  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:18  
**Risk Level:** High

#### Description
Allows the application to read and update the organization's external identities policy without a signed-in user.  For example, external identities policy controls if users invited to access resources in your organization via B2B collaboration or B2B direct connect are allowed to self-service leave.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's external identities policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the application to read and update the organization's external identities policy without a signed-in user.  For example, external identities policy controls if users invited to access resources in your organization via B2B collaboration or B2B direct connect are allowed to self-service leave.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 18. Policy.ReadWrite.FeatureRollout

**Display Name:** Read and write feature rollout policies  
**Permission ID:** 2044e4f1-e56c-435b-925c-44cd8f6ba89a  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:19  
**Risk Level:** Critical

#### Description
Allows the app to read and write feature rollout policies without a signed-in user. Includes abilities to assign and remove users and groups to rollout of a specific feature.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write feature rollout policies
// Implement based on specific use case
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to read and write feature rollout policies without a signed-in user. Includes abilities to assign and remove users and groups to rollout of a specific feature.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 19. Policy.ReadWrite.FedTokenValidation

**Display Name:** Read and write your organization's federated token validation policy  
**Permission ID:** 90bbca0b-227c-4cdc-8083-1c6cfb95bac6  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:19  
**Risk Level:** High

#### Description
Allows the application to read and update the organization's federated token validation policy without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's federated token validation policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the application to read and update the organization's federated token validation policy without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 20. Policy.ReadWrite.IdentityProtection

**Display Name:** Read and write your organization’s identity protection policy  
**Permission ID:** 2dcf8603-09eb-4078-b1ec-d30a1a76b873  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:19  
**Risk Level:** High

#### Description
Allows the app to read and write your organization’s identity protection policy without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization’s identity protection policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization’s identity protection policy without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 21. Policy.ReadWrite.PermissionGrant

**Display Name:** Manage consent and permission grant policies  
**Permission ID:** a402ca1c-2696-4531-972d-6e5ee4aa11ea  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:19  
**Risk Level:** High

#### Description
Allows the app to manage policies related to consent and permission grants for applications, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Manage consent and permission grant policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to manage policies related to consent and permission grants for applications, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 22. Policy.ReadWrite.SecurityDefaults

**Display Name:** Read and write your organization's security defaults policy  
**Permission ID:** 1c6e93a6-28e2-4cbb-9f64-1a46a821124d  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:20  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's security defaults policy, without a signed-in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's security defaults policy
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's security defaults policy, without a signed-in user.
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 23. Policy.ReadWrite.TrustFramework

**Display Name:** Read and write your organization's trust framework policies  
**Permission ID:** 79a677f7-b79d-40d0-a36a-3e6f8688dd7a  
**Type:** Application  
**Assigned Date:** 2025-11-23 18:28:26  
**Risk Level:** High

#### Description
Allows the app to read and write your organization's trust framework policies without a signed in user.

#### Common Use Cases
- Policy information retrieval
- Reporting and analytics
- Compliance and auditing
- Policy management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Example usage for Read and write your organization's trust framework policies
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write your organization's trust framework policies without a signed in user.
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

- [Microsoft Graph Policy Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Policy  
**Total Permissions:** 23  
**Documentation Version:** 1.0
