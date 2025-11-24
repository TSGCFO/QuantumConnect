# Files & SharePoint Sites Permissions

## Overview

Files and Sites permissions control access to file storage, SharePoint sites, and document libraries in Microsoft 365. These permissions enable file management, document collaboration, and SharePoint operations in the employee portal.

**Total Permissions in Category:** 9 (Files: 3, Sites: 6)

## Files Permissions

### 1. Files.ReadWrite.All

**Display Name:** Read and write all files  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to read, create, update, and delete all files in all site collections without a signed in user.

#### Common Use Cases
- Document management systems
- File synchronization
- Backup and archival
- Content migration
- Automated file processing

#### Code Example
```javascript
// List files in a user's OneDrive
const driveItems = await client
  .api('/users/user@example.com/drive/root/children')
  .select('name,size,createdDateTime,lastModifiedDateTime')
  .get();

driveItems.value.forEach(item => {
  console.log(`File: ${item.name} (${item.size} bytes)`);
});

// Upload a file
const fileContent = Buffer.from('File content here');
const uploadedFile = await client
  .api('/users/user@example.com/drive/root:/Documents/newfile.txt:/content')
  .put(fileContent);

console.log(`File uploaded: ${uploadedFile.id}`);

// Download a file
const fileStream = await client
  .api(`/drives/${driveId}/items/${itemId}/content`)
  .getStream();

// Update file metadata
await client
  .api(`/drives/${driveId}/items/${itemId}`)
  .patch({
    name: 'renamed-file.txt',
    description: 'Updated description'
  });

// Delete a file
await client
  .api(`/drives/${driveId}/items/${itemId}`)
  .delete();
```

#### Security Considerations
- **CRITICAL RISK**: Full access to all files in organization
- Implement access controls and auditing
- Monitor for unauthorized access
- Encrypt sensitive files
- Implement data loss prevention (DLP)
- Regular backup of critical files

---

### 2. Files.ReadWrite.AppFolder

**Display Name:** Read and write app folder  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to read and write files in the app's dedicated folder.

#### Common Use Cases
- App-specific file storage
- User settings and preferences
- Application cache
- Temporary file storage
- App data persistence

#### Code Example
```javascript
// Access app folder
const appFolder = await client
  .api('/me/drive/special/approot')
  .get();

// Create a file in app folder
const appData = {
  userPreferences: {
    theme: 'dark',
    language: 'en-US'
  }
};

await client
  .api('/me/drive/special/approot:/config.json:/content')
  .put(JSON.stringify(appData));

// Read from app folder
const configFile = await client
  .api('/me/drive/special/approot:/config.json:/content')
  .get();

console.log('Config:', configFile);
```

#### Security Considerations
- Scoped to app's own folder (lower risk)
- Still validate file content
- Implement size limits
- Monitor storage usage

---

### 3. Files.SelectedOperations.Selected

**Display Name:** Perform selected operations on selected files  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to perform specific operations on specific files that have been granted access.

#### Common Use Cases
- Granular file access control
- User-selected file operations
- Consent-based file sharing
- Limited scope file operations
- Privacy-focused file access

#### Code Example
```javascript
// Access specific granted files
const grantedFiles = await client
  .api('/me/drive/items')
  .filter('shared/sharedWith/application/id eq \'{app-id}\'')
  .get();

// Perform operations on granted files only
for (const file of grantedFiles.value) {
  const content = await client
    .api(`/drives/${file.parentReference.driveId}/items/${file.id}/content`)
    .get();
  
  // Process file
  await processFile(content);
}
```

#### Security Considerations
- Most restrictive file permission
- Requires explicit user consent
- Audit file access grants
- Limited to selected files only

---

## Sites Permissions

### 1. Sites.ReadWrite.All

**Display Name:** Read and write items in all site collections  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to edit or delete documents and list items in all site collections without a signed in user.

#### Common Use Cases
- SharePoint site management
- Document library operations
- List item management
- Content publishing
- Site automation

#### Code Example
```javascript
// List all sites
const sites = await client
  .api('/sites')
  .filter('siteCollection/root ne null')
  .get();

// Get site by path
const site = await client
  .api('/sites/contoso.sharepoint.com:/sites/marketing')
  .get();

console.log(`Site: ${site.displayName}`);

// List document libraries
const lists = await client
  .api(`/sites/${site.id}/lists`)
  .filter('list/template eq \'documentLibrary\'')
  .get();

// Upload document to library
const document = Buffer.from('Document content');
await client
  .api(`/sites/${site.id}/drive/root:/Documents/report.docx:/content`)
  .put(document);

// Create list item
const newItem = {
  fields: {
    Title: 'New Item',
    Description: 'Item description',
    Status: 'Active'
  }
};

await client
  .api(`/sites/${site.id}/lists/${listId}/items`)
  .post(newItem);

// Update list item
await client
  .api(`/sites/${site.id}/lists/${listId}/items/${itemId}`)
  .patch({
    fields: {
      Status: 'Completed'
    }
  });
```

#### Security Considerations
- **CRITICAL RISK**: Full access to all SharePoint sites
- Implement proper authorization checks
- Audit all site modifications
- Backup sites before bulk changes
- Monitor for unauthorized changes

---

### 2. Sites.FullControl.All

**Display Name:** Full control of all site collections  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to have full control of all site collections without a signed in user.

#### Common Use Cases
- Site provisioning and configuration
- Permission management
- Site template deployment
- Structural changes
- Advanced site management

#### Code Example
```javascript
// Create a new site
const newSite = {
  displayName: 'Project Site',
  name: 'project-site',
  description: 'Site for project collaboration',
  webTemplate: 'TeamSite',
  siteDesignId: 'standard-site-design-id'
};

const createdSite = await client
  .api('/sites/root/sites')
  .post(newSite);

// Configure site permissions
const permissionGrant = {
  roles: ['write'],
  grantedToIdentities: [{
    user: {
      id: 'user-id'
    }
  }]
};

await client
  .api(`/sites/${createdSite.id}/permissions`)
  .post(permissionGrant);

// Configure site features
await client
  .api(`/sites/${createdSite.id}`)
  .patch({
    sharingCapability: 'ExternalUserAndGuestSharing',
    allowSelfServiceUpgrade: true
  });
```

#### Security Considerations
- **CRITICAL RISK**: Highest level of site access
- Extreme caution required
- Multi-level approval for usage
- Comprehensive audit logging
- Regular security reviews

---

### 3. Sites.Manage.All

**Display Name:** Manage all site collections  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to create, edit, and delete lists and document libraries in all site collections without a signed in user.

#### Common Use Cases
- Site structure management
- List and library creation
- Site content organization
- Template deployment
- Site migration

#### Code Example
```javascript
// Create a new list
const newList = {
  displayName: 'Project Tasks',
  listTemplate: 'genericList',
  columns: [
    {
      name: 'Title',
      text: {}
    },
    {
      name: 'DueDate',
      dateTime: {}
    },
    {
      name: 'AssignedTo',
      personOrGroup: {}
    }
  ]
};

const list = await client
  .api(`/sites/${siteId}/lists`)
  .post(newList);

// Create a document library
const docLibrary = {
  displayName: 'Project Documents',
  listTemplate: 'documentLibrary'
};

await client
  .api(`/sites/${siteId}/lists`)
  .post(docLibrary);

// Configure library
await client
  .api(`/sites/${siteId}/lists/${list.id}`)
  .patch({
    enableVersioning: true,
    majorVersionLimit: 50
  });
```

#### Security Considerations
- **HIGH RISK**: Can alter site structure
- Test changes in non-production first
- Backup sites before structural changes
- Document all changes
- Monitor for unintended modifications

---

### 4. Sites.Selected

**Display Name:** Access selected site collections  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to access a specific set of site collections that have been granted access.

#### Common Use Cases
- Scoped site access
- Multi-tenant applications
- Project-specific access
- Consent-based site operations
- Minimal privilege access

#### Code Example
```javascript
// List granted sites
const grantedSites = await client
  .api('/sites')
  .filter('permissions/any(p:p/grantedToIdentities/any(i:i/application/id eq \'{app-id}\'))')
  .get();

// Access only granted sites
for (const site of grantedSites.value) {
  const lists = await client
    .api(`/sites/${site.id}/lists`)
    .get();
  
  console.log(`Site: ${site.displayName}, Lists: ${lists.value.length}`);
}
```

#### Security Considerations
- Most restrictive site permission
- Requires explicit site grants
- Lower security risk
- Still requires proper auditing

---

### 5. Sites.Create.All

**Display Name:** Create sites  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to create sites without a signed in user.

#### Common Use Cases
- Automated site provisioning
- Project workspace creation
- Department site creation
- Team collaboration setup
- Site templates deployment

#### Code Example
```javascript
// Create a team site
async function createTeamSite(projectName, owners) {
  const site = {
    displayName: projectName,
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    description: `Collaboration site for ${projectName}`,
    webTemplate: 'TeamSite'
  };

  const newSite = await client
    .api('/sites/root/sites')
    .post(site);

  // Add owners
  for (const owner of owners) {
    await client
      .api(`/sites/${newSite.id}/permissions`)
      .post({
        roles: ['owner'],
        grantedToIdentities: [{
          user: { id: owner.id }
        }]
      });
  }

  return newSite;
}
```

#### Security Considerations
- Monitor site creation patterns
- Implement naming conventions
- Set default security settings
- Audit all site creations
- Implement quotas if needed

---

### 6. Sites.Archive.All

**Display Name:** Archive all sites  
**Permission ID:** *Not specified in source*  
**Type:** Application  

#### Description
Allows the app to archive and unarchive sites.

#### Common Use Cases
- Site lifecycle management
- Project closure
- Compliance archiving
- Storage optimization
- Inactive site management

#### Code Example
```javascript
// Archive a site
async function archiveSite(siteId, reason) {
  await client
    .api(`/sites/${siteId}/archive`)
    .post({
      archiveReason: reason,
      archiveDate: new Date().toISOString()
    });

  console.log(`Site ${siteId} archived`);
}

// Unarchive a site
async function unarchiveSite(siteId) {
  await client
    .api(`/sites/${siteId}/unarchive`)
    .post({});

  console.log(`Site ${siteId} restored`);
}

// List archived sites
const archivedSites = await client
  .api('/sites')
  .filter('siteCollection/isArchived eq true')
  .get();
```

#### Security Considerations
- Document archival reasons
- Set retention policies
- Verify data backup before archiving
- Monitor archive/restore operations
- Implement approval workflow

---

## Best Practices

### 1. File Security
```javascript
// Encrypt sensitive files
const crypto = require('crypto');

async function uploadEncryptedFile(drive, path, content, encryptionKey) {
  // Encrypt content
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Upload encrypted file
  await client
    .api(`/drives/${drive}/root:${path}:/content`)
    .put(Buffer.from(encrypted, 'hex'));

  // Store encryption metadata
  await client
    .api(`/drives/${drive}/root:${path}`)
    .patch({
      '@microsoft.graph.fileSystemInfo': {
        description: 'ENCRYPTED'
      }
    });
}
```

### 2. Batch Operations
```javascript
// Batch file operations for efficiency
async function batchFileOperations(operations) {
  const batchRequest = {
    requests: operations.map((op, index) => ({
      id: index.toString(),
      method: op.method,
      url: op.url,
      body: op.body
    }))
  };

  const response = await client
    .api('/$batch')
    .post(batchRequest);

  return response.responses;
}

// Example: Batch copy files
const copyOperations = files.map(file => ({
  method: 'POST',
  url: `/drives/${sourceDrive}/items/${file.id}/copy`,
  body: {
    parentReference: {
      driveId: destDrive,
      id: destFolderId
    }
  }
}));

await batchFileOperations(copyOperations);
```

### 3. File Versioning
```javascript
// Manage file versions
async function getFileVersions(driveId, itemId) {
  const versions = await client
    .api(`/drives/${driveId}/items/${itemId}/versions`)
    .get();

  return versions.value.map(v => ({
    id: v.id,
    size: v.size,
    lastModifiedDateTime: v.lastModifiedDateTime,
    lastModifiedBy: v.lastModifiedBy.user.displayName
  }));
}

// Restore previous version
async function restoreVersion(driveId, itemId, versionId) {
  await client
    .api(`/drives/${driveId}/items/${itemId}/versions/${versionId}/restoreVersion`)
    .post({});
}
```

### 4. Large File Upload
```javascript
// Upload large files in chunks
async function uploadLargeFile(driveId, filePath, localFilePath) {
  const stats = fs.statSync(localFilePath);
  const fileSize = stats.size;

  // Create upload session
  const uploadSession = await client
    .api(`/drives/${driveId}/root:${filePath}:/createUploadSession`)
    .post({
      item: {
        '@microsoft.graph.conflictBehavior': 'replace'
      }
    });

  // Upload in chunks
  const chunkSize = 320 * 1024; // 320 KB
  const fileStream = fs.createReadStream(localFilePath, { highWaterMark: chunkSize });
  
  let uploadedBytes = 0;
  
  for await (const chunk of fileStream) {
    const contentRange = `bytes ${uploadedBytes}-${uploadedBytes + chunk.length - 1}/${fileSize}`;
    
    await fetch(uploadSession.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Length': chunk.length.toString(),
        'Content-Range': contentRange
      },
      body: chunk
    });

    uploadedBytes += chunk.length;
    console.log(`Uploaded: ${(uploadedBytes / fileSize * 100).toFixed(2)}%`);
  }
}
```

## Common Scenarios

### Scenario 1: Document Collaboration Setup
```javascript
async function setupProjectWorkspace(projectName, teamMembers) {
  // Create team site
  const site = await createTeamSite(projectName, teamMembers);

  // Create document libraries
  const libraries = [
    { name: 'Requirements', template: 'documentLibrary' },
    { name: 'Design Documents', template: 'documentLibrary' },
    { name: 'Code Reviews', template: 'documentLibrary' }
  ];

  for (const lib of libraries) {
    await client
      .api(`/sites/${site.id}/lists`)
      .post({
        displayName: lib.name,
        listTemplate: lib.template
      });
  }

  // Set up permissions
  for (const member of teamMembers) {
    await client
      .api(`/sites/${site.id}/permissions`)
      .post({
        roles: ['write'],
        grantedToIdentities: [{
          user: { id: member.id }
        }]
      });
  }

  return site;
}
```

### Scenario 2: Automated File Archival
```javascript
async function archiveOldFiles(driveId, daysOld = 365) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  // Find old files
  const oldFiles = await client
    .api(`/drives/${driveId}/root/children`)
    .filter(`lastModifiedDateTime lt ${cutoffDate.toISOString()}`)
    .get();

  // Create archive folder
  const archiveFolder = await client
    .api(`/drives/${driveId}/root/children`)
    .post({
      name: `Archive_${new Date().getFullYear()}`,
      folder: {}
    });

  // Move files to archive
  for (const file of oldFiles.value) {
    await client
      .api(`/drives/${driveId}/items/${file.id}`)
      .patch({
        parentReference: {
          id: archiveFolder.id
        }
      });
  }

  console.log(`Archived ${oldFiles.value.length} files`);
}
```

## Related Permissions

- **FileStorageContainer.Selected** - Container-level access
- **Lists.SelectedOperations.Selected** - List operations
- **Group.ReadWrite.All** - Group site management
- **User.Read.All** - User information for sharing

## Additional Resources

- [OneDrive API Documentation](https://learn.microsoft.com/en-us/graph/api/resources/onedrive)
- [SharePoint Sites API](https://learn.microsoft.com/en-us/graph/api/resources/sharepoint)
- [File Upload Best Practices](https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession)
- [Site Provisioning](https://learn.microsoft.com/en-us/sharepoint/dev/solution-guidance/modern-experience-customizations-provisioning-sites)

---

**Last Updated:** 2025-11-23  
**Category:** Files & SharePoint Sites  
**Risk Level:** Critical (Multiple high-risk permissions)
