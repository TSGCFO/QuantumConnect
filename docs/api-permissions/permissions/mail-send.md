# Mail.Send

## Overview

- **Display Name**: Send mail as any user
- **Permission ID**: `b633e1c5-b582-4048-a93e-9f11b44c7e96`
- **Type**: Application Permission
- **Scope**: Varies
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 19:35:16

## Description

Allows the app to send mail as any user without a signed-in user.

## Use Cases

This permission enables the following scenarios:

- Email automation and notifications
- Mailbox management and archiving
- Email-based workflow triggers
- Compliance and legal hold operations

## API Endpoints

This section provides detailed information about the Microsoft Graph API endpoints that require this permission.


### Endpoint 1: GET /users/{id}/messages

**Description**: List user's email messages

**Query Parameters**:

- `$select`: Choose message properties
- `$filter`: Filter messages (e.g., isRead eq false)
- `$top`: Limit number of messages
- `$orderby`: Sort messages (e.g., receivedDateTime desc)

**Response**: Returns a collection of message objects

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users/{id}/messages?$filter=isRead eq false&$top=25
```

---

### Endpoint 2: POST /users/{id}/sendMail

**Description**: Send an email message

**Request Body**:

```json
{
  "message": {
    "subject": "Project Update",
    "body": {
      "contentType": "HTML",
      "content": "<h1>Update</h1><p>Details here.</p>"
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": "recipient@contoso.com"
        }
      }
    ]
  },
  "saveToSentItems": true
}
```

**Response**: Returns 202 Accepted on success

**Example Request**:

```http
POST https://graph.microsoft.com/v1.0/users/{id}/sendMail
```

---

### Endpoint 3: GET /users/{id}/mailFolders

**Description**: List user's mail folders

**Response**: Returns a collection of mailFolder objects

**Example Request**:

```http
GET https://graph.microsoft.com/v1.0/users/{id}/mailFolders
```

---

### Endpoint 4: PATCH /users/{id}/messages/{message-id}

**Description**: Update message properties

**Request Body**:

```json
{
  "isRead": true,
  "categories": [
    "Important"
  ]
}
```

**Response**: Returns the updated message object

**Example Request**:

```http
PATCH https://graph.microsoft.com/v1.0/users/{id}/messages/{message-id}
```

---


## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Mail.Send"

# Example: Send an email
$message = @{
    Message = @{
        Subject = "Project Update"
        Body = @{
            ContentType = "HTML"
            Content = "<h1>Update</h1><p>Project is on track.</p>"
        }
        ToRecipients = @(
            @{
                EmailAddress = @{
                    Address = "recipient@contoso.com"
                }
            }
        )
    }
}

Send-MgUserMail -UserId "sender@contoso.com" -BodyParameter $message
```

### JavaScript/TypeScript

```javascript
// Example: Send an email
const message = {
    message: {
        subject: 'Project Update',
        body: {
            contentType: 'HTML',
            content: '<h1>Update</h1><p>Project is on track.</p>'
        },
        toRecipients: [
            {
                emailAddress: {
                    address: 'recipient@contoso.com'
                }
            }
        ]
    }
};

await client
    .api('/users/sender@contoso.com/sendMail')
    .post(message);
```

### C#

```csharp
// Example: Send an email
var message = new Message
{
    Subject = "Project Update",
    Body = new ItemBody
    {
        ContentType = BodyType.Html,
        Content = "<h1>Update</h1><p>Project is on track.</p>"
    },
    ToRecipients = new List<Recipient>
    {
        new Recipient
        {
            EmailAddress = new EmailAddress
            {
                Address = "recipient@contoso.com"
            }
        }
    }
};

await graphClient.Users["sender@contoso.com"]
    .SendMail(message, SaveToSentItems: true)
    .Request()
    .PostAsync();
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

Other permissions in the `Mail` family:

- See the [Permission Index](../reference/permission-index.md) for related permissions
- Review [Common Use Cases](../reference/common-use-cases.md) for implementation patterns

## Additional Resources

- [Microsoft Graph API Reference](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security Best Practices](../reference/security-best-practices.md)
- [Common Use Cases](../reference/common-use-cases.md)

---

**Last Updated**: 2025-11-24  
**Permission Category**: Mail
