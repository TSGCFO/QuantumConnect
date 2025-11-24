# Mail.ReadWrite

## Overview

- **Display Name**: Read and write mail in all mailboxes
- **Permission ID**: `e2a3a72e-5f79-4c64-b1b1-878b674786c9`
- **Type**: Application Permission - Read and Write
- **Scope**: Limited
- **Admin Consent Required**: Yes
- **Assigned Date**: 2025-11-23 17:44:07

## Description

Allows the app to create, read, update, and delete mail in all mailboxes without a signed-in user. Does not include permission to send mail.

## Use Cases

This permission enables the following scenarios:

- Email automation and notifications
- Mailbox management and archiving
- Email-based workflow triggers
- Compliance and legal hold operations

## API Endpoints

Common endpoints that require this permission:

- `GET /users/{{id}}/messages`
- `POST /users/{{id}}/sendMail`
- `GET /users/{{id}}/mailFolders`
- `PATCH /users/{{id}}/messages/{{message-id}}`

## Code Examples

### PowerShell

```powershell
# Connect to Microsoft Graph
Connect-MgGraph -Scopes "Mail.ReadWrite"

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
