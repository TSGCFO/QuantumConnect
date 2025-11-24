# Mail Permissions

## Overview

Mail permissions control access to email functionality in Microsoft 365, including reading, writing, sending, and managing mailbox items. These permissions are critical for employee portal email integration, notifications, and communication features.

**Total Permissions in Category:** 8

## Permissions List

### 1. Mail.Read

**Display Name:** Read mail in all mailboxes  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to read mail in all mailboxes without a signed-in user.

#### Common Use Cases
- Email monitoring and archival
- Compliance scanning
- Email analytics
- Automated email processing
- eDiscovery operations

#### Code Example
```javascript
// Read messages from a user's mailbox
const messages = await client
  .api('/users/user@example.com/messages')
  .select('subject,from,receivedDateTime,bodyPreview')
  .top(25)
  .orderby('receivedDateTime DESC')
  .get();

messages.value.forEach(msg => {
  console.log(`From: ${msg.from.emailAddress.address}`);
  console.log(`Subject: ${msg.subject}`);
  console.log(`Date: ${msg.receivedDateTime}`);
  console.log('---');
});
```

#### Security Considerations
- **HIGH RISK**: Provides access to all email content
- Implement data loss prevention (DLP) policies
- Audit all mail access operations
- Consider encryption for sensitive communications
- Comply with privacy regulations

---

### 2. Mail.ReadWrite

**Display Name:** Read and write mail in all mailboxes  
**Permission ID:** ef54d2bf-783f-4e0f-bca1-3210c0444d99  
**Type:** Application  
**Assigned Date:** 2025-11-23

#### Description
Allows the app to create, read, update, and delete mail in all mailboxes without a signed-in user.

#### Common Use Cases
- Email management applications
- Automated email organization
- Email archival systems
- Mailbox cleanup operations
- Message classification

#### Code Example
```javascript
// Create and send a draft message
const draft = {
  subject: 'Automated Report',
  body: {
    contentType: 'HTML',
    content: '<h1>Monthly Report</h1><p>Please find attached...</p>'
  },
  toRecipients: [
    {
      emailAddress: {
        address: 'recipient@example.com'
      }
    }
  ]
};

const message = await client
  .api('/users/sender@example.com/messages')
  .post(draft);

// Update message
await client
  .api(`/users/sender@example.com/messages/${message.id}`)
  .patch({
    importance: 'high',
    categories: ['Important', 'Reports']
  });

// Delete message
await client
  .api(`/users/sender@example.com/messages/${message.id}`)
  .delete();
```

#### Security Considerations
- **CRITICAL RISK**: Can modify or delete emails
- Implement strict access controls
- Log all write operations
- Consider retention policies before deletion
- Backup critical emails before modification

---

### 3. Mail.Send

**Display Name:** Send mail as any user  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to send mail as any user without a signed-in user.

#### Common Use Cases
- Automated notifications
- System alerts
- Workflow notifications
- Bulk email campaigns
- Automated responses

#### Code Example
```javascript
// Send email as a specific user
async function sendEmail(fromUser, toUser, subject, body) {
  const message = {
    subject: subject,
    body: {
      contentType: 'HTML',
      content: body
    },
    toRecipients: [
      {
        emailAddress: {
          address: toUser
        }
      }
    ]
  };

  await client
    .api(`/users/${fromUser}/sendMail`)
    .post({ 
      message: message,
      saveToSentItems: true
    });

  console.log('Email sent successfully');
}

// Example usage
await sendEmail(
  'noreply@example.com',
  'employee@example.com',
  'Welcome to the Employee Portal',
  '<h1>Welcome!</h1><p>Your account has been created.</p>'
);
```

#### Security Considerations
- **HIGH RISK**: Can send email as any user
- Implement sender verification
- Use dedicated service accounts for automated emails
- Monitor for spoofing or abuse
- Implement rate limiting
- Log all sent messages

---

### 4. Mail-Advanced.ReadWrite.All

**Display Name:** *Advanced mail operations*  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to perform advanced mail operations including reading, writing, and managing extended mail properties.

#### Common Use Cases
- Advanced mail filtering
- Custom mail rules
- Extended property management
- Mail flow configuration
- Advanced archival operations

#### Code Example
```javascript
// Create a message with custom extended properties
const message = {
  subject: 'Custom Properties Example',
  body: {
    contentType: 'Text',
    content: 'This message has custom properties'
  },
  toRecipients: [{
    emailAddress: { address: 'user@example.com' }
  }],
  singleValueExtendedProperties: [
    {
      id: 'String {66f5a359-4659-4830-9070-00047ec6ac6e} Name CustomProperty',
      value: 'CustomValue'
    }
  ]
};

await client
  .api('/users/me/messages')
  .post(message);
```

#### Security Considerations
- Advanced permissions require careful handling
- Document all extended property usage
- Monitor for unusual property modifications

---

### 5. MailboxSettings.ReadWrite

**Display Name:** Read and write user mailbox settings  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to read and write mailbox settings without a signed-in user.

#### Common Use Cases
- Automatic reply configuration
- Time zone settings management
- Language preferences
- Mailbox rules configuration
- Delegation settings

#### Code Example
```javascript
// Read mailbox settings
const settings = await client
  .api('/users/user@example.com/mailboxSettings')
  .get();

console.log(`Time Zone: ${settings.timeZone}`);
console.log(`Language: ${settings.language.locale}`);

// Update automatic replies
const autoReply = {
  automaticRepliesSetting: {
    status: 'scheduled',
    externalAudience: 'all',
    scheduledStartDateTime: {
      dateTime: '2024-12-20T00:00:00',
      timeZone: 'Pacific Standard Time'
    },
    scheduledEndDateTime: {
      dateTime: '2024-12-31T00:00:00',
      timeZone: 'Pacific Standard Time'
    },
    internalReplyMessage: 'I am out of office until January 1st.',
    externalReplyMessage: 'I am currently out of office.'
  }
};

await client
  .api('/users/user@example.com/mailboxSettings')
  .patch(autoReply);
```

#### Security Considerations
- Settings can affect user experience
- Validate time zones and date ranges
- Notify users of setting changes
- Audit automatic reply configurations

---

### 6. MailboxFolder.ReadWrite.All

**Display Name:** Read and write mail folders  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to create, read, update, and delete mail folders in all mailboxes.

#### Common Use Cases
- Folder organization automation
- Archive folder creation
- Folder hierarchy management
- Bulk folder operations
- Email classification systems

#### Code Example
```javascript
// Create a new mail folder
const folder = {
  displayName: 'Project Alpha',
  isHidden: false
};

const newFolder = await client
  .api('/users/user@example.com/mailFolders')
  .post(folder);

console.log(`Created folder: ${newFolder.id}`);

// Create a subfolder
const subfolder = {
  displayName: 'Design Documents'
};

await client
  .api(`/users/user@example.com/mailFolders/${newFolder.id}/childFolders`)
  .post(subfolder);

// Move messages to folder
await client
  .api(`/users/user@example.com/messages/${messageId}/move`)
  .post({
    destinationId: newFolder.id
  });

// Delete folder
await client
  .api(`/users/user@example.com/mailFolders/${newFolder.id}`)
  .delete();
```

#### Security Considerations
- Folder deletions can affect user workflow
- Consider recovery options before deletion
- Audit folder structure changes
- Respect user's folder organization

---

### 7. MailboxItem.Read.All

**Display Name:** Read all mailbox items  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to read mailbox items including emails, calendar events, contacts, and tasks.

#### Common Use Cases
- Comprehensive mailbox search
- Data migration
- Backup operations
- eDiscovery
- Compliance scanning

#### Code Example
```javascript
// Search across all mailbox items
const searchQuery = {
  requests: [
    {
      entityTypes: ['message'],
      query: {
        queryString: 'subject:urgent AND from:manager@example.com'
      },
      from: 0,
      size: 25
    }
  ]
};

const results = await client
  .api('/search/query')
  .post(searchQuery);

results.value[0].hitsContainers[0].hits.forEach(hit => {
  console.log(`Found: ${hit.resource.subject}`);
});
```

#### Security Considerations
- Comprehensive access to mailbox data
- Implement strict access controls
- Log all search operations
- Comply with data protection regulations

---

### 8. MailboxItem.ImportExport.All

**Display Name:** Import and export mailbox items  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to import and export mailbox items for migration or backup purposes.

#### Common Use Cases
- Mailbox migration
- Backup and restore operations
- Data archival
- Legal hold exports
- Tenant-to-tenant migrations

#### Code Example
```javascript
// Export mailbox items (conceptual - actual implementation varies)
async function exportMailbox(userId, options) {
  const exportRequest = {
    userId: userId,
    itemTypes: ['messages', 'calendar', 'contacts'],
    dateRange: {
      start: options.startDate,
      end: options.endDate
    },
    format: 'PST' // or 'EML', 'MSG'
  };

  // Create export job
  const job = await client
    .api('/compliance/ediscovery/exportJobs')
    .post(exportRequest);

  return job;
}

// Import mailbox items
async function importMessages(userId, messages) {
  for (const msgData of messages) {
    await client
      .api(`/users/${userId}/messages`)
      .post(msgData);
  }
}
```

#### Security Considerations
- **CRITICAL RISK**: Can export all mailbox data
- Encrypt exported data
- Secure storage for exports
- Audit all import/export operations
- Comply with data residency requirements
- Implement data retention policies

---

## Best Practices for Mail Permissions

### 1. Email Security
```javascript
// Example: Secure email handling
async function sendSecureEmail(recipient, subject, body, attachments) {
  // Validate recipient
  if (!isValidEmailAddress(recipient)) {
    throw new Error('Invalid recipient');
  }

  // Scan for sensitive content
  if (containsSensitiveData(body)) {
    // Apply encryption or DLP policies
    body = encryptSensitiveContent(body);
  }

  // Send email with tracking
  const messageId = await sendEmail(recipient, subject, body, attachments);
  
  // Log for audit
  logEmailActivity({
    messageId,
    recipient,
    subject,
    timestamp: new Date(),
    sender: getCurrentUser()
  });

  return messageId;
}
```

### 2. Rate Limiting
```javascript
// Implement rate limiting for bulk operations
class EmailRateLimiter {
  constructor(maxPerMinute = 30) {
    this.maxPerMinute = maxPerMinute;
    this.queue = [];
  }

  async sendEmail(params) {
    // Add to queue
    this.queue.push(params);

    // Process queue with rate limiting
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.maxPerMinute);
      
      await Promise.all(
        batch.map(p => this.sendSingleEmail(p))
      );

      if (this.queue.length > 0) {
        await this.delay(60000); // Wait 1 minute
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 3. Error Handling
```javascript
async function robustEmailOperation(operation) {
  const maxRetries = 3;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Check if error is retryable
      if (error.code === 'ErrorMailboxStoreUnavailable') {
        await delay(Math.pow(2, i) * 1000); // Exponential backoff
        continue;
      }
      
      // Non-retryable error
      throw error;
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
}
```

### 4. Batch Operations
```javascript
// Batch multiple mail operations for efficiency
async function batchMailOperations(operations) {
  const batchRequest = {
    requests: operations.map((op, index) => ({
      id: index.toString(),
      method: op.method,
      url: op.url,
      body: op.body,
      headers: { 'Content-Type': 'application/json' }
    }))
  };

  const response = await client
    .api('/$batch')
    .post(batchRequest);

  return response.responses;
}

// Example usage
const operations = [
  {
    method: 'PATCH',
    url: '/users/user1@example.com/messages/msg1',
    body: { isRead: true }
  },
  {
    method: 'PATCH',
    url: '/users/user1@example.com/messages/msg2',
    body: { isRead: true }
  },
  // ... up to 20 operations per batch
];

await batchMailOperations(operations);
```

## Common Scenarios

### Scenario 1: Automated Email Notifications
```javascript
async function sendOnboardingEmail(newEmployee) {
  const template = await loadEmailTemplate('onboarding');
  
  const personalizedContent = template
    .replace('{{name}}', newEmployee.displayName)
    .replace('{{startDate}}', newEmployee.startDate)
    .replace('{{manager}}', newEmployee.manager);

  await sendEmail(
    'hr@example.com',
    newEmployee.email,
    'Welcome to the Company!',
    personalizedContent
  );

  // Create calendar event for first day
  await createCalendarEvent(newEmployee.email, {
    subject: 'First Day Orientation',
    start: newEmployee.startDate + 'T09:00:00',
    duration: 120
  });
}
```

### Scenario 2: Email Archive and Cleanup
```javascript
async function archiveOldEmails(userId, daysOld = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  // Create archive folder if it doesn't exist
  const archiveFolder = await getOrCreateFolder(userId, 'Archive');

  // Find old messages
  const oldMessages = await client
    .api(`/users/${userId}/messages`)
    .filter(`receivedDateTime lt ${cutoffDate.toISOString()}`)
    .select('id,subject,receivedDateTime')
    .get();

  console.log(`Found ${oldMessages.value.length} messages to archive`);

  // Move messages to archive (in batches)
  const batchSize = 20;
  for (let i = 0; i < oldMessages.value.length; i += batchSize) {
    const batch = oldMessages.value.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(msg =>
        client
          .api(`/users/${userId}/messages/${msg.id}/move`)
          .post({ destinationId: archiveFolder.id })
      )
    );

    console.log(`Archived ${Math.min(i + batchSize, oldMessages.value.length)} messages`);
  }
}
```

### Scenario 3: Email Analytics
```javascript
async function generateEmailStats(userId, startDate, endDate) {
  const messages = await client
    .api(`/users/${userId}/messages`)
    .filter(
      `receivedDateTime ge ${startDate.toISOString()} and ` +
      `receivedDateTime le ${endDate.toISOString()}`
    )
    .select('from,receivedDateTime,hasAttachments,importance')
    .top(1000)
    .get();

  const stats = {
    total: messages.value.length,
    withAttachments: messages.value.filter(m => m.hasAttachments).length,
    highImportance: messages.value.filter(m => m.importance === 'high').length,
    bySender: {}
  };

  // Count by sender
  messages.value.forEach(msg => {
    const sender = msg.from.emailAddress.address;
    stats.bySender[sender] = (stats.bySender[sender] || 0) + 1;
  });

  // Top senders
  stats.topSenders = Object.entries(stats.bySender)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([sender, count]) => ({ sender, count }));

  return stats;
}
```

## Related Permissions

- **MailboxConfigItem.Read** - Read mailbox configuration
- **MailboxConfigItem.ReadWrite** - Modify mailbox configuration
- **User.ReadWrite.All** - Manage user accounts
- **Calendars.ReadWrite** - Calendar integration
- **Files.ReadWrite.All** - File attachments

## Compliance Considerations

### GDPR Compliance
- Implement right to access (export user emails)
- Support right to erasure (delete emails on request)
- Data portability (export in standard format)
- Consent management for email processing

### Data Retention
```javascript
// Example retention policy enforcement
async function applyRetentionPolicy(userId, policyDays = 365) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - policyDays);

  const oldMessages = await client
    .api(`/users/${userId}/messages`)
    .filter(`receivedDateTime lt ${cutoffDate.toISOString()}`)
    .select('id')
    .get();

  // Delete messages past retention period
  for (const message of oldMessages.value) {
    await client
      .api(`/users/${userId}/messages/${message.id}`)
      .delete();
  }

  console.log(`Deleted ${oldMessages.value.length} messages per retention policy`);
}
```

## Additional Resources

- [Microsoft Graph Mail API Documentation](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview)
- [Email Best Practices](https://learn.microsoft.com/en-us/graph/outlook-mail-concept-overview)
- [Batch Requests](https://learn.microsoft.com/en-us/graph/json-batching)
- [Rate Limiting](https://learn.microsoft.com/en-us/graph/throttling)

---

**Last Updated:** 2025-11-23  
**Category:** Mail Management  
**Risk Level:** Critical (High-risk permissions for email access)
