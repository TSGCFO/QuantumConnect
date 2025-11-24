# AccessReview.ReadWrite.All

## Overview

- **Display Name**: Manage all access reviews
- **Permission ID**: `ef5f7d5c-338f-44b0-86c3-351f46c8bb5f`
- **Type**: Application Permission - Read and Write
- **Scope**: Organization-wide
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:43:28

## Description

Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings in the organization, without a signed-in user.

## Use Cases

This permission enables the following scenarios:

- Automated workflows and integrations
- Custom business applications
- System monitoring and reporting
- Administrative automation

## API Endpoints

This section provides detailed information about the Microsoft Graph API endpoints that require this permission.

### Endpoint Reference

Refer to the [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview) for detailed endpoint documentation.


## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "AccessReview.ReadWrite.All"

# Use this permission to access Microsoft Graph resources
# Refer to the API endpoints section below for specific operations
```

### JavaScript/TypeScript

```javascript
// Initialize Microsoft Graph Client with this permission
const client = Client.init({
    authProvider: authProvider
});

// Use this permission to access Microsoft Graph resources
// Refer to the API endpoints section below for specific operations
```

### C#

```csharp
// Initialize Microsoft Graph Client with this permission
var graphClient = new GraphServiceClient(credential, scopes);

// Use this permission to access Microsoft Graph resources
// Refer to the API endpoints section below for specific operations
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

Other permissions in the `AccessReview` family may include read-only versions, write versions, or more specific scopes:

**Permission Naming Patterns:**
- `.Read` - Read access only
- `.ReadWrite` - Read and write access
- `.Read.All` - Read access to all resources of this type
- `.ReadWrite.All` - Full read/write access to all resources
- `.ReadBasic.All` - Read basic properties only

**Common Related Permission Types:**
- Application permissions (app-only access, no user required)
- Delegated permissions (on behalf of a signed-in user)

**Choosing the Right Permission:**
1. Start with the most restrictive permission that meets your needs
2. Use delegated permissions for user-facing applications
3. Use application permissions for background services
4. Prefer `.Read` over `.ReadWrite` if you don't need write access
5. Prefer specific permissions over broad `.All` permissions

**Permission Consent:**
- Delegated permissions can be consented by users (for their own data) or admins (for all users)
- Application permissions always require admin consent
- Some high-privilege permissions require additional security review


## Additional Resources

### Microsoft Graph API Overview

Microsoft Graph is the gateway to data and intelligence in Microsoft cloud services like Microsoft Entra and Microsoft 365. The Microsoft Graph API offers a single endpoint (`https://graph.microsoft.com`) to provide access to rich, people-centric data and insights in the Microsoft cloud.

**Key Services Accessible via Microsoft Graph:**
- **Microsoft 365 core services**: Calendar, Excel, OneDrive, OneNote, Outlook/Exchange, People (Outlook contacts), Planner, SharePoint, Teams, To Do
- **Enterprise Mobility + Security services**: Advanced Threat Protection, Microsoft Entra, Identity Manager, and Intune
- **Windows services**: activities, devices, notifications

### Understanding Permissions

Microsoft Graph supports two access scenarios:

**Delegated Access (on behalf of a user)**
- Used when a signed-in user is present
- App acts on behalf of the user
- User must consent to the permissions
- Permissions are called "delegated permissions" or "scopes"

**App-only Access (without a user)**
- Used for background services, daemons, or automated processes
- App acts with its own identity
- Only administrators can consent
- Permissions are called "application permissions" or "app roles"

| Permission Type | Use Case | Who Consents | Examples |
|----------------|----------|--------------|----------|
| Delegated | Web/Mobile apps with user sign-in | User or Admin | User.Read, Mail.Read |
| Application | Background services, daemons | Admin only | User.Read.All, Mail.Read |

### Authentication Requirements

To access Microsoft Graph, your application needs:

1. **Application Registration**: Register your app in Microsoft Entra admin center to get:
   - Application (client) ID
   - Directory (tenant) ID
   - Client secret or certificate

2. **Access Token**: Obtain via OAuth 2.0 flow:
   ```http
   POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token
   Content-Type: application/x-www-form-urlencoded
   
   client_id={client_id}
   &scope=https://graph.microsoft.com/.default
   &client_secret={client_secret}
   &grant_type=client_credentials
   ```

3. **API Call**: Include the token in requests:
   ```http
   GET https://graph.microsoft.com/v1.0/users
   Authorization: Bearer {access_token}
   ```

### Best Practices

1. **Apply Least Privilege**: Request only the minimum permissions required
2. **Use the Correct Permission Type**: Use delegated for interactive apps, application for background services
3. **Secure Your Credentials**: Store secrets in Azure Key Vault, use certificates when possible
4. **Handle Errors Gracefully**: Implement retry logic for throttling (429 errors)
5. **Use SDKs**: Microsoft provides SDKs for .NET, JavaScript, Java, Python, Go, PowerShell

### Rate Limiting and Throttling

Microsoft Graph implements rate limiting to prevent resource exhaustion:

- **Response Code**: 429 Too Many Requests
- **Retry-After Header**: Indicates how long to wait before retrying
- **Best Practice**: Implement exponential backoff with jitter

```python
import time
import random

def retry_with_backoff(func, max_retries=5):
    for attempt in range(max_retries):
        try:
            return func()
        except RateLimitException as e:
            if attempt == max_retries - 1:
                raise
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(wait_time)
```

### Query Parameters Reference

| Parameter | Description | Example |
|-----------|-------------|---------|
| `$select` | Choose specific properties | `?$select=displayName,mail` |
| `$filter` | Filter results | `?$filter=department eq 'Sales'` |
| `$orderby` | Sort results | `?$orderby=displayName` |
| `$top` | Limit results | `?$top=10` |
| `$skip` | Skip results (pagination) | `?$skip=10` |
| `$count` | Include count of items | `?$count=true` |
| `$expand` | Include related resources | `?$expand=manager` |
| `$search` | Search (requires header) | `?$search="displayName:John"` |

**Note**: `$search` requires the header `ConsistencyLevel: eventual`

### Error Handling

Common error codes and their meanings:

| Code | Description | Action |
|------|-------------|--------|
| 400 | Bad Request | Check request syntax |
| 401 | Unauthorized | Token invalid or expired |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Implement retry with backoff |
| 500 | Internal Server Error | Retry later |
| 503 | Service Unavailable | Retry later |

### Pagination

For large result sets, Microsoft Graph returns paginated responses:

```json
{
  "value": [...],
  "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$skiptoken=..."
}
```

Continue fetching until `@odata.nextLink` is not present in the response.
---

**Last Updated**: 2025-11-24  
**Permission Category**: AccessReview
