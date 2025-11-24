# LearningAssignedCourse Permissions

## Overview

This document provides comprehensive information about **LearningAssignedCourse** permissions in Microsoft Graph API.

**Total Permissions:** 1

## Permissions List

### 1. LearningAssignedCourse.ReadWrite.All

**Display Name:** Read and write all assignments  
**Permission ID:** 236c1cbd-1187-427f-b0f5-b1852454973b  
**Type:** Application  
**Assigned Date:** 2025-11-23 17:44:04  
**Risk Level:** Critical

#### Description
Allows the app to create, update, read and delete all assignments in the organization's directory, without a signed-in user.

#### Common Use Cases
- LearningAssignedCourse information retrieval
- Reporting and analytics
- Compliance and auditing
- LearningAssignedCourse management
- Automated workflows
- Data synchronization

#### Code Example
```javascript
// Read learningassignedcourse data
const items = await client
  .api('/learningassignedcourses')
  .get();

// Create new learningassignedcourse
const newLearningassignedcourse = {
  displayName: 'New Item',
  description: 'Created via API'
};

const created = await client
  .api('/learningassignedcourses')
  .post(newLearningassignedcourse);

// Update learningassignedcourse
await client
  .api('/learningassignedcourses/${created.id}')
  .patch({
    displayName: 'Updated Item'
  });

// Delete learningassignedcourse
await client
  .api('/learningassignedcourses/${created.id}')
  .delete();
```

#### Security Considerations
**CRITICAL RISK**: Allows the app to create, update, read and delete all assignments in the organization's directory, without a signed-in user.
- Implement multi-level approval workflows
- Comprehensive audit logging required
- Regular security reviews mandatory
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

- [Microsoft Graph LearningAssignedCourse Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** LearningAssignedCourse  
**Total Permissions:** 1  
**Documentation Version:** 1.0
