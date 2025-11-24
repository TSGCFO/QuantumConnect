# User.ManageIdentities.All

## Overview

- **Display Name**: Manage all users' identities
- **Permission ID**: `c529cfca-c91b-489c-af2b-d92990b66ce6`
- **Type**: Application Permission
- **Scope**: Varies
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 19:35:34

## Description

Allows the app to read, update and delete identities that are associated with a user's account, without a signed in user. This controls the identities users can sign-in with.

## Use Cases

This permission enables the following scenarios:

- User profile management and synchronization
- Employee onboarding and offboarding automation
- Directory synchronization with external systems
- User reporting and analytics

## API Endpoints

This section provides detailed information about the Microsoft Graph API endpoints that require this permission.


### Endpoint 1: GET /users

**Description**: List all users in the organization

**Query Parameters**:

- `$select`: Choose specific properties (e.g., displayName,mail,jobTitle)
- `$filter`: Filter results (e.g., department eq 'Sales')
- `$top`: Limit number of results (e.g., 100)
- `$orderby`: Sort results (e.g., displayName)
- `$search`: Search for users (requires ConsistencyLevel: eventual header)

**Response**: Returns a collection of user objects

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users?$select=displayName,mail&$filter=department eq 'Sales'&$top=50
```

---

### Endpoint 2: GET /users/{id}

**Description**: Get a specific user by ID or userPrincipalName

**Query Parameters**:

- `$select`: Choose specific properties to return
- `$expand`: Expand related resources (e.g., manager, directReports)

**Response**: Returns a user object

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users/john@contoso.com?$select=displayName,jobTitle&$expand=manager
```

---

### Endpoint 3: POST /users

**Description**: Create a new user

**Request Body**:

```json
{
  "accountEnabled": true,
  "displayName": "Jane Doe",
  "mailNickname": "janed",
  "userPrincipalName": "janed@contoso.com",
  "passwordProfile": {
    "forceChangePasswordNextSignIn": true,
    "password": "SecurePassword123!"
  }
}
```

**Response**: Returns the created user object

**Example Request**:

```http
POST https://graph.microsoft.com/v1.0/users
```

---

### Endpoint 4: PATCH /users/{id}

**Description**: Update user properties

**Request Body**:

```json
{
  "jobTitle": "Senior Developer",
  "department": "Engineering",
  "officeLocation": "Building 5, Room 301"
}
```

**Response**: Returns 204 No Content on success

**Example Request**:

```http
PATCH https://graph.microsoft.com/v1.0/users/john@contoso.com
```

---

### Endpoint 5: GET /users/{id}/manager

**Description**: Get the user's manager

**Response**: Returns a directoryObject (typically a user)

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users/john@contoso.com/manager
```

---

### Endpoint 6: GET /users/{id}/directReports

**Description**: Get the user's direct reports

**Query Parameters**:

- `$select`: Choose properties for direct reports

**Response**: Returns a collection of directoryObject (users)

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users/john@contoso.com/directReports
```

---


## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "User.ManageIdentities.All"

# Example: Get users
Get-MgUser -Top 10 | Select-Object DisplayName, Mail, JobTitle

# Example: Get specific user
Get-MgUser -UserId "user@contoso.com"

# Example: Get user with manager
Get-MgUser -UserId "user@contoso.com" -ExpandProperty manager
```

### JavaScript/TypeScript

```javascript
// Initialize Microsoft Graph Client
const { Client } = require('@microsoft/microsoft-graph-client');

const client = Client.init({
    authProvider: authProvider
});

// Example: Get users
const users = await client
    .api('/users')
    .top(10)
    .select('displayName,mail,jobTitle')
    .get();

// Example: Get specific user
const user = await client
    .api('/users/user@contoso.com')
    .get();
```

### C#

```csharp
using Microsoft.Graph;

// Example: Get users
var users = await graphClient.Users
    .Request()
    .Top(10)
    .Select("displayName,mail,jobTitle")
    .GetAsync();

// Example: Get specific user
var user = await graphClient.Users["user@contoso.com"]
    .Request()
    .GetAsync();
```

## Security Considerations

### Best Practices

1. **Principle of Least Privilege**: Only request this permission if absolutely necessary for your use case
2. **Credential Security**: Store client secrets and certificates securely in Azure Key Vault
3. **Audit Logging**: Log all operations performed using this permission
4. **Regular Reviews**: Periodically review whether this permission is still needed

### Risk Level

🟢 **LOW-MEDIUM**

This permission has limited scope. Still ensure appropriate security measures are in place.

### Required Actions

- [ ] Document business justification for this permission
- [ ] Implement comprehensive audit logging
- [ ] Set up monitoring and alerting for unusual activity
- [ ] Review access quarterly
- [ ] Ensure compliance with data protection regulations (GDPR, etc.)

## Related Permissions

Other permissions in the `User` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: User
