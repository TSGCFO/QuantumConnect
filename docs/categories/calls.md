# Calls Permissions

## Overview

This document provides comprehensive information about **Calls** permissions in Microsoft Graph API.

**Total Permissions:** 5

## Permissions List

### 1. Calls.AccessMedia.All

**Display Name:** Access media streams in a call as an app  
**Permission ID:** a7a681dc-756e-4909-b988-f160edc6655f  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:40  
**Risk Level:** Low

#### Description
Allows the app to get direct access to media streams in a call, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Access media streams in a call as an app
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to get direct access to media streams in a call, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. Calls.Initiate.All

**Display Name:** Initiate outgoing 1 to 1 calls from the app  
**Permission ID:** 284383ee-7f6e-4e40-a2a8-e85dcb029101  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:40  
**Risk Level:** Low

#### Description
Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Initiate outgoing 1 to 1 calls from the app
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 3. Calls.InitiateGroupCall.All

**Display Name:** Initiate outgoing group calls from the app  
**Permission ID:** 4c277553-8a09-487b-8023-29ee378d8324  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:41  
**Risk Level:** Low

#### Description
Allows the app to place outbound calls to multiple users and add participants to meetings in your organization, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Initiate outgoing group calls from the app
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to place outbound calls to multiple users and add participants to meetings in your organization, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 4. Calls.JoinGroupCall.All

**Display Name:** Join group calls and meetings as an app  
**Permission ID:** f6b49018-60ab-4f81-83bd-22caeabfed2d  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:41  
**Risk Level:** Low

#### Description
Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined with the privileges of a directory user to meetings in your organization.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Join group calls and meetings as an app
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined with the privileges of a directory user to meetings in your organization.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 5. Calls.JoinGroupCallAsGuest.All

**Display Name:** Join group calls and meetings as a guest  
**Permission ID:** fd7ccf6b-3d28-418b-9701-cd10f5cd2fd4  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:41  
**Risk Level:** Low

#### Description
Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined as a guest to meetings in your organization.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Join group calls and meetings as a guest
// Implement based on specific use case
```

#### Security Considerations
**LOW RISK**: Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined as a guest to meetings in your organization.
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

- [Microsoft Graph Calls Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** Calls  
**Total Permissions:** 5  
**Documentation Version:** 1.0
