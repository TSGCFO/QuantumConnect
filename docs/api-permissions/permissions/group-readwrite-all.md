# Group.ReadWrite.All

## Overview

- **Display Name**: Read and write all groups
- **Permission ID**: `62a82d76-70ea-41e2-9197-370581804d09`
- **Type**: Application Permission - Read and Write
- **Scope**: Organization-wide
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:43:59

## Description

Allows the app to create groups, read all group properties and memberships, update group properties and memberships, and delete groups. Also allows the app to read and write conversations. All of these operations can be performed by the app without a signed-in user.

## Use Cases

This permission enables the following scenarios:

- Group and team management
- Dynamic group membership automation
- Access control and provisioning
- Collaboration workspace creation

## API Endpoints

This section provides detailed information about the Microsoft Graph API endpoints that require this permission.


### Endpoint 1: GET /groups

**Description**: List all groups in the organization

**Query Parameters**:

- `$select`: Choose specific properties
- `$filter`: Filter results (e.g., groupTypes/any(c:c eq 'Unified'))
- `$top`: Limit number of results
- `$orderby`: Sort results
- `$search`: Search for groups (requires ConsistencyLevel: eventual header)

**Response**: Returns a collection of group objects

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/groups?$filter=mailEnabled eq true and securityEnabled eq false
```

---

### Endpoint 2: GET /groups/{id}

**Description**: Get a specific group by ID

**Query Parameters**:

- `$select`: Choose specific properties
- `$expand`: Expand related resources (e.g., members, owners)

**Response**: Returns a group object

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/groups/{id}?$expand=members
```

---

### Endpoint 3: POST /groups

**Description**: Create a new group

**Request Body**:

```json
{
  "displayName": "Marketing Team",
  "mailNickname": "marketing",
  "mailEnabled": true,
  "securityEnabled": false,
  "groupTypes": [
    "Unified"
  ]
}
```

**Response**: Returns the created group object

**Example Request**:

```http
POST https://graph.microsoft.com/v1.0/groups
```

---

### Endpoint 4: PATCH /groups/{id}

**Description**: Update group properties

**Request Body**:

```json
{
  "description": "Updated description",
  "displayName": "Updated Name"
}
```

**Response**: Returns 204 No Content on success

**Example Request**:

```http
PATCH https://graph.microsoft.com/v1.0/groups/{id}
```

---

### Endpoint 5: GET /groups/{id}/members

**Description**: List group members

**Query Parameters**:

- `$select`: Choose properties for members
- `$top`: Limit number of results

**Response**: Returns a collection of directoryObject

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/groups/{id}/members
```

---

### Endpoint 6: POST /groups/{id}/members/$ref

**Description**: Add a member to the group

**Request Body**:

```json
{
  "@odata.id": "https://graph.microsoft.com/v1.0/users/{user-id}"
}
```

**Response**: Returns 204 No Content on success

**Example Request**:

```http
POST https://graph.microsoft.com/v1.0/groups/{id}/members/$ref
```

---

### Endpoint 7: DELETE /groups/{id}/members/{member-id}/$ref

**Description**: Remove a member from the group

**Response**: Returns 204 No Content on success

**Example Request**:

```http
DELETE https://graph.microsoft.com/v1.0/groups/{id}/members/{member-id}/$ref
```

---


## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Group.ReadWrite.All"

# Example: Get groups
Get-MgGroup -Top 10 | Select-Object DisplayName, Mail, GroupTypes

# Example: Create a group
New-MgGroup -BodyParameter @{
    DisplayName = "Marketing Team"
    MailNickname = "marketing"
    MailEnabled = $true
    SecurityEnabled = $false
    GroupTypes = @("Unified")
}
```

### JavaScript/TypeScript

```javascript
// Example: Get groups
const groups = await client
    .api('/groups')
    .top(10)
    .select('displayName,mail,groupTypes')
    .get();

// Example: Create a group
const newGroup = await client
    .api('/groups')
    .post({
        displayName: 'Marketing Team',
        mailNickname: 'marketing',
        mailEnabled: true,
        securityEnabled: false,
        groupTypes: ['Unified']
    });
```

### C#

```csharp
// Example: Get groups
var groups = await graphClient.Groups
    .Request()
    .Top(10)
    .GetAsync();

// Example: Create a group
var newGroup = new Group
{
    DisplayName = "Marketing Team",
    MailNickname = "marketing",
    MailEnabled = true,
    SecurityEnabled = false,
    GroupTypes = new List<string> { "Unified" }
};

await graphClient.Groups
    .Request()
    .AddAsync(newGroup);
```

## Security Considerations

### Best Practices

1. **Principle of Least Privilege**: Only request this permission if absolutely necessary for your use case
2. **Credential Security**: Store client secrets and certificates securely in Azure Key Vault
3. **Audit Logging**: Log all operations performed using this permission
4. **Regular Reviews**: Periodically review whether this permission is still needed

### Risk Level

🔴 **HIGH**

This permission grants broad write access to organizational data. Implement strict security controls and monitoring.

### Required Actions

- [ ] Document business justification for this permission
- [ ] Implement comprehensive audit logging
- [ ] Set up monitoring and alerting for unusual activity
- [ ] Review access quarterly
- [ ] Ensure compliance with data protection regulations (GDPR, etc.)

## Related Permissions

Other permissions in the `Group` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Group
