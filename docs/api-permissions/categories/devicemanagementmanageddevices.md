# DeviceManagementManagedDevices Permissions

## Overview

This document provides comprehensive information about **DeviceManagementManagedDevices** permissions in Microsoft Graph API.

**Total Permissions:** 2

## Permissions List

### 1. DeviceManagementManagedDevices.PrivilegedOperations.All

**Display Name:** Perform user-impacting remote actions on Microsoft Intune devices  
**Permission ID:** 5b07b0dd-2377-4e44-a38d-703f09a0dc3c  
**Type:** Application  
**Assigned Date:** 2025-11-23 19:35:12  
**Risk Level:** High

#### Description
Allows the app to perform remote high impact actions such as wiping the device or resetting the passcode on devices managed by Microsoft Intune, without a signed-in user.

#### Common Use Cases
- General API operations

#### Code Example
```javascript
// Example usage for Perform user-impacting remote actions on Microsoft Intune devices
// Implement based on specific use case
```

#### Security Considerations
**HIGH RISK**: Allows the app to perform remote high impact actions such as wiping the device or resetting the passcode on devices managed by Microsoft Intune, without a signed-in user.
- Organization-wide scope requires strict access controls
- Monitor for unauthorized access
- Comply with data protection regulations

---

### 2. DeviceManagementManagedDevices.ReadWrite.All

**Display Name:** Read and write Microsoft Intune devices  
**Permission ID:** 243333ab-4d21-40cb-a475-36241daa0842  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:43:50  
**Risk Level:** High

#### Description
Allows the app to read and write the properties of devices managed by Microsoft Intune, without a signed-in user. Does not allow high impact operations such as remote wipe and password reset on the device’s owner

#### Common Use Cases
- DeviceManagementManagedDevices information retrieval
- Reporting and analytics
- Compliance and auditing
- DeviceManagementManagedDevices management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read devicemanagementmanageddevices data
const items = await client
  .api('/devicemanagementmanageddevicess')
  .get();

// Create new devicemanagementmanageddevices
const newItem = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/devicemanagementmanageddevicess')
  .post(newItem);

// Update devicemanagementmanageddevices
await client
  .api(`/devicemanagementmanageddevicess/${created.id}`)
  .patch({
    displayName: 'Updated Item'
  });

// Delete devicemanagementmanageddevices
await client
  .api(`/devicemanagementmanageddevicess/${created.id}`)
  .delete();
```

#### Security Considerations
**HIGH RISK**: Allows the app to read and write the properties of devices managed by Microsoft Intune, without a signed-in user. Does not allow high impact operations such as remote wipe and password reset on the device’s owner
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

- [Microsoft Graph DeviceManagementManagedDevices Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** DeviceManagementManagedDevices  
**Total Permissions:** 2  
**Documentation Version:** 1.0
