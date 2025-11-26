# API Endpoints Reference

This reference guide maps Microsoft Graph API endpoints to the permissions required to access them, organized by functional area.

## Table of Contents

1. [Users and People](#users-and-people)
2. [Groups and Teams](#groups-and-teams)
3. [Mail and Calendars](#mail-and-calendars)
4. [Files and Sites](#files-and-sites)
5. [Security and Compliance](#security-and-compliance)
6. [Identity and Access](#identity-and-access)
7. [Reports and Insights](#reports-and-insights)
8. [Applications and Service Principals](#applications-and-service-principals)

---

## Users and People

### List Users

```http
GET https://graph.microsoft.com/v1.0/users
```

**Required Permission**: `User.Read.All` or `User.ReadWrite.All` or `Directory.Read.All`

**Query Parameters**:
- `$select`: Choose specific properties
- `$filter`: Filter results
- `$top`: Limit number of results
- `$skip`: Skip results for pagination
- `$orderby`: Sort results
- `$expand`: Expand related entities

**Example**:
```http
GET https://graph.microsoft.com/v1.0/users?$filter=department eq 'Sales'&$select=displayName,mail,jobTitle
```

### Get User

```http
GET https://graph.microsoft.com/v1.0/users/{id}
```

**Required Permission**: `User.Read.All` or `User.ReadWrite.All`

**Example**:
```http
GET https://graph.microsoft.com/v1.0/users/john@contoso.com
```

### Create User

```http
POST https://graph.microsoft.com/v1.0/users
```

**Required Permission**: `User.ReadWrite.All`

**Request Body**:
```json
{
    "accountEnabled": true,
    "displayName": "Jane Doe",
    "mailNickname": "janed",
    "userPrincipalName": "janed@contoso.com",
    "passwordProfile": {
        "forceChangePasswordNextSignIn": true,
        "password": "SecureP@ss123!"
    }
}
```

### Update User

```http
PATCH https://graph.microsoft.com/v1.0/users/{id}
```

**Required Permission**: `User.ReadWrite.All`

**Request Body**:
```json
{
    "jobTitle": "Senior Developer",
    "department": "Engineering"
}
```

### Delete User

```http
DELETE https://graph.microsoft.com/v1.0/users/{id}
```

**Required Permission**: `User.ReadWrite.All` (soft delete) or `User.DeleteRestore.All` (hard delete)

### Get User's Manager

```http
GET https://graph.microsoft.com/v1.0/users/{id}/manager
```

**Required Permission**: `User.Read.All`

### Get Direct Reports

```http
GET https://graph.microsoft.com/v1.0/users/{id}/directReports?$top=100
```

**Required Permission**: `User.Read.All`

**Note**: Use pagination parameters to limit result sets

### Assign Manager

```http
PUT https://graph.microsoft.com/v1.0/users/{id}/manager/$ref
```

**Required Permission**: `User.ReadWrite.All`

**Request Body**:
```json
{
    "@odata.id": "https://graph.microsoft.com/v1.0/users/{manager-id}"
}
```

---

## Groups and Teams

### List Groups

```http
GET https://graph.microsoft.com/v1.0/groups
```

**Required Permission**: `Group.Read.All` or `Group.ReadWrite.All`

**Example with Filter**:
```http
GET https://graph.microsoft.com/v1.0/groups?$filter=mailEnabled eq true and securityEnabled eq false
```

### Create Group

```http
POST https://graph.microsoft.com/v1.0/groups
```

**Required Permission**: `Group.ReadWrite.All` or `Group.Create`

**Request Body (Microsoft 365 Group)**:
```json
{
    "displayName": "Marketing Team",
    "mailNickname": "marketing",
    "mailEnabled": true,
    "securityEnabled": false,
    "groupTypes": ["Unified"]
}
```

**Request Body (Security Group)**:
```json
{
    "displayName": "IT Security Team",
    "mailNickname": "itsecurity",
    "mailEnabled": false,
    "securityEnabled": true
}
```

### Get Group Members

```http
GET https://graph.microsoft.com/v1.0/groups/{id}/members
```

**Required Permission**: `GroupMember.Read.All` or `Group.Read.All`

### Add Group Member

```http
POST https://graph.microsoft.com/v1.0/groups/{id}/members/$ref
```

**Required Permission**: `GroupMember.ReadWrite.All` or `Group.ReadWrite.All`

**Request Body**:
```json
{
    "@odata.id": "https://graph.microsoft.com/v1.0/users/{user-id}"
}
```

### Remove Group Member

```http
DELETE https://graph.microsoft.com/v1.0/groups/{id}/members/{member-id}/$ref
```

**Required Permission**: `GroupMember.ReadWrite.All` or `Group.ReadWrite.All`

### List Teams

```http
GET https://graph.microsoft.com/v1.0/teams
```

**Required Permission**: `Team.ReadBasic.All`

### Create Team

```http
POST https://graph.microsoft.com/v1.0/teams
```

**Required Permission**: `Team.Create`

**Request Body**:
```json
{
    "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
    "displayName": "Project Alpha Team",
    "description": "Team for Project Alpha"
}
```

### Get Team Channels

```http
GET https://graph.microsoft.com/v1.0/teams/{team-id}/channels
```

**Required Permission**: `Channel.ReadBasic.All` or `ChannelSettings.Read.All`

### Create Channel

```http
POST https://graph.microsoft.com/v1.0/teams/{team-id}/channels
```

**Required Permission**: `Channel.Create` or `ChannelSettings.ReadWrite.All`

**Request Body**:
```json
{
    "displayName": "Project Planning",
    "description": "Planning channel for the project"
}
```

---

## Mail and Calendars

### List Messages

```http
GET https://graph.microsoft.com/v1.0/users/{id}/messages
```

**Required Permission**: `Mail.Read` or `Mail.ReadWrite`

**Example with Filter**:
```http
GET https://graph.microsoft.com/v1.0/users/{id}/messages?$filter=isRead eq false&$orderby=receivedDateTime desc
```

### Send Mail

```http
POST https://graph.microsoft.com/v1.0/users/{id}/sendMail
```

**Required Permission**: `Mail.Send`

**Request Body**:
```json
{
    "message": {
        "subject": "Project Update",
        "body": {
            "contentType": "HTML",
            "content": "<h1>Update</h1><p>Project is on track.</p>"
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": "recipient@contoso.com"
                }
            }
        ]
    },
    "saveToSentItems": "true"
}
```

### List Calendar Events

```http
GET https://graph.microsoft.com/v1.0/users/{id}/calendar/events
```

**Required Permission**: `Calendars.Read` or `Calendars.ReadWrite`

**Example with Date Filter**:
```http
GET https://graph.microsoft.com/v1.0/users/{id}/calendar/events?$filter=start/dateTime ge '2025-12-01T00:00:00Z'
```

### Create Event

```http
POST https://graph.microsoft.com/v1.0/users/{id}/calendar/events
```

**Required Permission**: `Calendars.ReadWrite`

**Request Body**:
```json
{
    "subject": "Team Meeting",
    "start": {
        "dateTime": "2025-12-01T14:00:00",
        "timeZone": "Pacific Standard Time"
    },
    "end": {
        "dateTime": "2025-12-01T15:00:00",
        "timeZone": "Pacific Standard Time"
    },
    "attendees": [
        {
            "emailAddress": {
                "address": "attendee@contoso.com"
            },
            "type": "required"
        }
    ],
    "isOnlineMeeting": true,
    "onlineMeetingProvider": "teamsForBusiness"
}
```

### Find Meeting Times

```http
POST https://graph.microsoft.com/v1.0/users/{id}/findMeetingTimes
```

**Required Permission**: `Calendars.Read` or `Calendars.ReadWrite`

**Request Body**:
```json
{
    "attendees": [
        {
            "emailAddress": {
                "address": "user1@contoso.com"
            },
            "type": "required"
        }
    ],
    "timeConstraint": {
        "timeslots": [
            {
                "start": {
                    "dateTime": "2025-12-01T09:00:00",
                    "timeZone": "Pacific Standard Time"
                },
                "end": {
                    "dateTime": "2025-12-01T17:00:00",
                    "timeZone": "Pacific Standard Time"
                }
            }
        ]
    },
    "meetingDuration": "PT1H"
}
```

---

## Files and Sites

### List Drive Items

```http
GET https://graph.microsoft.com/v1.0/drives/{drive-id}/root/children
```

**Required Permission**: `Files.Read.All` or `Files.ReadWrite.All`

### Get Drive Item

```http
GET https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}
```

**Required Permission**: `Files.Read.All`

### Upload File (Simple)

```http
PUT https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{parent-id}:/{filename}:/content
```

**Required Permission**: `Files.ReadWrite.All`

**Headers**:
```
Content-Type: application/octet-stream
```

**Body**: File content (binary)

### Upload Large File (Session)

```http
POST https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{parent-id}:/{filename}:/createUploadSession
```

**Required Permission**: `Files.ReadWrite.All`

**Request Body**:
```json
{
    "item": {
        "@microsoft.graph.conflictBehavior": "rename"
    }
}
```

### Download File

```http
GET https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}/content
```

**Required Permission**: `Files.Read.All`

### List Sites

```http
GET https://graph.microsoft.com/v1.0/sites?search={query}
```

**Required Permission**: `Sites.Read.All`

### Get Site

```http
GET https://graph.microsoft.com/v1.0/sites/{site-id}
```

**Required Permission**: `Sites.Read.All`

### List Site Lists

```http
GET https://graph.microsoft.com/v1.0/sites/{site-id}/lists
```

**Required Permission**: `Sites.Read.All`

### Get List Items

```http
GET https://graph.microsoft.com/v1.0/sites/{site-id}/lists/{list-id}/items?expand=fields
```

**Required Permission**: `Sites.Read.All`

---

## Security and Compliance

### Get Audit Logs

```http
GET https://graph.microsoft.com/v1.0/auditLogs/directoryAudits
```

**Required Permission**: `AuditLog.Read.All`

**Example with Filter**:
```http
GET https://graph.microsoft.com/v1.0/auditLogs/directoryAudits?$filter=activityDateTime ge 2025-11-01T00:00:00Z
```

### Get Sign-in Logs

```http
GET https://graph.microsoft.com/v1.0/auditLogs/signIns
```

**Required Permission**: `AuditLog.Read.All`

**Example**:
```http
GET https://graph.microsoft.com/v1.0/auditLogs/signIns?$filter=userId eq '{user-id}'&$top=50
```

### List Access Reviews

```http
GET https://graph.microsoft.com/v1.0/identityGovernance/accessReviews/definitions
```

**Required Permission**: `AccessReview.Read.All` or `AccessReview.ReadWrite.All`

### Create Access Review

```http
POST https://graph.microsoft.com/v1.0/identityGovernance/accessReviews/definitions
```

**Required Permission**: `AccessReview.ReadWrite.All`

**Request Body**:
```json
{
    "displayName": "Q4 Group Access Review",
    "descriptionForAdmins": "Review group memberships",
    "scope": {
        "@odata.type": "#microsoft.graph.accessReviewQueryScope",
        "query": "/groups/{group-id}/members",
        "queryType": "MicrosoftGraph"
    },
    "reviewers": [
        {
            "query": "/groups/{group-id}/owners",
            "queryType": "MicrosoftGraph"
        }
    ],
    "settings": {
        "instanceDurationInDays": 14,
        "recurrence": {
            "pattern": {
                "type": "absoluteMonthly",
                "interval": 3
            }
        }
    }
}
```

### List Security Alerts

```http
GET https://graph.microsoft.com/v1.0/security/alerts_v2
```

**Required Permission**: `SecurityAlert.Read.All`

### Get Risk Detections

```http
GET https://graph.microsoft.com/v1.0/identityProtection/riskDetections
```

**Required Permission**: `IdentityRiskEvent.Read.All`

---

## Identity and Access

### List Applications

```http
GET https://graph.microsoft.com/v1.0/applications
```

**Required Permission**: `Application.Read.All` or `Application.ReadWrite.All`

### Create Application

```http
POST https://graph.microsoft.com/v1.0/applications
```

**Required Permission**: `Application.ReadWrite.All`

**Request Body**:
```json
{
    "displayName": "My Application",
    "signInAudience": "AzureADMyOrg"
}
```

### Get Service Principal

```http
GET https://graph.microsoft.com/v1.0/servicePrincipals/{id}
```

**Required Permission**: `Application.Read.All`

### Assign App Role

```http
POST https://graph.microsoft.com/v1.0/servicePrincipals/{id}/appRoleAssignments
```

**Required Permission**: `AppRoleAssignment.ReadWrite.All`

**Request Body**:
```json
{
    "principalId": "{user-or-group-id}",
    "resourceId": "{service-principal-id}",
    "appRoleId": "{app-role-id}"
}
```

### List Policies

```http
GET https://graph.microsoft.com/v1.0/policies/authorizationPolicy
```

**Required Permission**: `Policy.Read.All`

### List Conditional Access Policies

```http
GET https://graph.microsoft.com/v1.0/identity/conditionalAccess/policies
```

**Required Permission**: `Policy.Read.ConditionalAccess` or `Policy.ReadWrite.ConditionalAccess`

---

## Reports and Insights

### Get Microsoft 365 Active Users Report

```http
GET https://graph.microsoft.com/v1.0/reports/getOffice365ActiveUserDetail(period='D30')
```

**Required Permission**: `Reports.Read.All`

**Response**: CSV data

### Get Teams User Activity

```http
GET https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserDetail(period='D7')
```

**Required Permission**: `Reports.Read.All`

### Get OneDrive Usage

```http
GET https://graph.microsoft.com/v1.0/reports/getOneDriveUsageAccountDetail(period='D30')
```

**Required Permission**: `Reports.Read.All`

### Get SharePoint Site Usage

```http
GET https://graph.microsoft.com/v1.0/reports/getSharePointSiteUsageDetail(period='D30')
```

**Required Permission**: `Reports.Read.All`

### Get Mailbox Usage

```http
GET https://graph.microsoft.com/v1.0/reports/getMailboxUsageDetail(period='D30')
```

**Required Permission**: `Reports.Read.All`

---

## Applications and Service Principals

### List OAuth2 Permission Grants

```http
GET https://graph.microsoft.com/v1.0/oauth2PermissionGrants
```

**Required Permission**: `DelegatedPermissionGrant.ReadWrite.All`

### Create OAuth2 Permission Grant

```http
POST https://graph.microsoft.com/v1.0/oauth2PermissionGrants
```

**Required Permission**: `DelegatedPermissionGrant.ReadWrite.All`

**Request Body**:
```json
{
    "clientId": "{client-service-principal-id}",
    "consentType": "AllPrincipals",
    "resourceId": "{resource-service-principal-id}",
    "scope": "User.Read.All Group.Read.All"
}
```

---

## Common Query Parameters

### $select
Choose specific properties to return:
```http
GET /users?$select=displayName,mail,jobTitle
```

### $filter
Filter results:
```http
GET /users?$filter=startsWith(displayName,'J')
GET /groups?$filter=groupTypes/any(c:c eq 'Unified')
GET /users?$filter=department eq 'Sales' and jobTitle eq 'Manager'
```

### $orderby
Sort results:
```http
GET /users?$orderby=displayName
GET /users?$orderby=createdDateTime desc
```

### $top and $skip
Pagination:
```http
GET /users?$top=50
GET /users?$top=50&$skip=100
```

### $expand
Include related entities:
```http
GET /users/{id}?$expand=manager
GET /groups/{id}?$expand=members
```

### $search
Search for items:
```http
GET /users?$search="displayName:John"
```

**Requires** `ConsistencyLevel: eventual` header

### $count
Get count of items:
```http
GET /users?$count=true&$top=0
```

**Requires** `ConsistencyLevel: eventual` header

---

## Batch Requests

Process multiple requests in a single call:

```http
POST https://graph.microsoft.com/v1.0/$batch
```

**Required Permission**: Varies by individual requests

**Request Body**:
```json
{
    "requests": [
        {
            "id": "1",
            "method": "GET",
            "url": "/users/user1@contoso.com"
        },
        {
            "id": "2",
            "method": "GET",
            "url": "/users/user2@contoso.com"
        },
        {
            "id": "3",
            "method": "PATCH",
            "url": "/users/user1@contoso.com",
            "body": {
                "jobTitle": "Senior Developer"
            },
            "headers": {
                "Content-Type": "application/json"
            }
        }
    ]
}
```

**Response**:
```json
{
    "responses": [
        {
            "id": "1",
            "status": 200,
            "body": { /* user1 data */ }
        },
        {
            "id": "2",
            "status": 200,
            "body": { /* user2 data */ }
        },
        {
            "id": "3",
            "status": 204
        }
    ]
}
```

---

## Error Handling

### Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check request syntax and parameters |
| 401 | Unauthorized | Verify access token is valid |
| 403 | Forbidden | Check required permissions are granted |
| 404 | Not Found | Verify resource ID exists |
| 429 | Too Many Requests | Implement retry logic with backoff |
| 500 | Internal Server Error | Retry request after delay |
| 503 | Service Unavailable | Retry request after delay |

### Error Response Format

```json
{
    "error": {
        "code": "Authorization_RequestDenied",
        "message": "Insufficient privileges to complete the operation.",
        "innerError": {
            "request-id": "...",
            "date": "2025-11-24T10:30:00"
        }
    }
}
```

---

## Rate Limiting

Microsoft Graph implements throttling to prevent resource exhaustion:

### Limits by Service

- **User queries**: 10,000 requests per 10 seconds
- **Mail operations**: 10,000 requests per 10 seconds
- **Subscription (webhooks)**: 8,000 per app per day
- **Batch requests**: 20 requests per batch, 4 batches concurrently

### Handling Throttling

When throttled, you'll receive a `429 Too Many Requests` response with a `Retry-After` header.

**Best Practices**:
1. Implement exponential backoff
2. Respect `Retry-After` header
3. Use batch requests
4. Implement caching
5. Use delta queries for large datasets

---

## Pagination

### Using @odata.nextLink

```javascript
async function getAllUsers(graphClient) {
    let users = [];
    let response = await graphClient.api('/users').top(100).get();

    users.push(...response.value);

    while (response['@odata.nextLink']) {
        response = await graphClient.api(response['@odata.nextLink']).get();
        users.push(...response.value);
    }

    return users;
}
```

### Using $skiptoken

Some endpoints return `$skiptoken` in the nextLink:

```http
GET /users?$skiptoken={token}
```

---

## Delta Queries

Track changes efficiently:

```http
GET /users/delta
```

**Required Permission**: `User.Read.All`

**Initial Request**:
```http
GET https://graph.microsoft.com/v1.0/users/delta
```

**Response** includes `@odata.deltaLink` for tracking changes:
```json
{
    "value": [ /* users */ ],
    "@odata.deltaLink": "https://graph.microsoft.com/v1.0/users/delta?$deltatoken=..."
}
```

**Subsequent Request** using deltatoken:
```http
GET https://graph.microsoft.com/v1.0/users/delta?$deltatoken=...
```

---

## Additional Resources

- [Microsoft Graph REST API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph SDKs](https://learn.microsoft.com/en-us/graph/sdks/sdks-overview)
- [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)
- [OData Query Parameters](https://learn.microsoft.com/en-us/graph/query-parameters)
- [Permission Reference](./permission-index.md)
- [Common Use Cases](./common-use-cases.md)

---

**Last Updated**: 2025-11-24
