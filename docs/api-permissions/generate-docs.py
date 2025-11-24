#!/usr/bin/env python3
"""
API Permissions Documentation Generator

This script generates comprehensive documentation for all API permissions
listed in the AssignedGraphPermissions.txt file.
"""

import re
import os
from pathlib import Path

def parse_permissions(content):
    """Parse permissions file into structured data"""
    categories = {}
    lines = content.split('\n')
    
    current_category = None
    current_permission = {}
    
    for line in lines:
        line = line.strip()
        
        # Match category headers
        category_match = re.match(r'^\[(\d+)\]\s+(.+?)\s+-\s+(\d+)\s+permissions?', line)
        if category_match:
            _, category_name, count = category_match.groups()
            current_category = category_name
            categories[category_name] = {
                'count': int(count),
                'permissions': []
            }
            continue
        
        # Match permission fields
        if line.startswith('Permission:'):
            if current_permission.get('name') and current_category:
                categories[current_category]['permissions'].append(dict(current_permission))
            current_permission = {
                'name': line.replace('Permission:', '').strip()
            }
        elif line.startswith('Display Name:'):
            current_permission['displayName'] = line.replace('Display Name:', '').strip()
        elif line.startswith('Description:'):
            current_permission['description'] = line.replace('Description:', '').strip()
        elif line.startswith('Permission ID:'):
            current_permission['id'] = line.replace('Permission ID:', '').strip()
        elif line.startswith('Assigned Date:'):
            current_permission['assignedDate'] = line.replace('Assigned Date:', '').strip()
            if current_category and current_permission.get('name'):
                categories[current_category]['permissions'].append(dict(current_permission))
                current_permission = {}
    
    return categories

def generate_slug(name):
    """Generate URL-friendly slug from category name"""
    return re.sub(r'[^a-z0-9-]', '', name.lower().replace(' ', '-'))

def get_risk_level(permission):
    """Determine risk level based on permission properties"""
    name = permission['name'].lower()
    description = permission.get('description', '').lower()
    
    if 'delete' in name or 'remove' in name or 'delete' in description:
        return 'Critical'
    if 'readwrite' in name or 'manage' in name or 'write' in description:
        return 'High'
    if 'read' in name and '.all' in name:
        return 'Medium'
    return 'Low'

def generate_use_cases(permission):
    """Generate common use cases based on permission"""
    name = permission['name']
    resource = name.split('.')[0]
    
    cases = []
    if 'Read' in name:
        cases.extend([
            f"- {resource} information retrieval",
            "- Reporting and analytics",
            "- Compliance and auditing"
        ])
    if 'Write' in name or 'ReadWrite' in name:
        cases.extend([
            f"- {resource} management",
            "- Automated workflows",
            "- Data synchronization"
        ])
    if 'Create' in name:
        cases.extend([
            f"- {resource} provisioning",
            "- Automated setup processes"
        ])
    if 'Delete' in name:
        cases.extend([
            f"- {resource} lifecycle management",
            "- Cleanup operations"
        ])
    
    return '\n'.join(cases) if cases else '- General API operations'

def generate_example(permission):
    """Generate code example based on permission type"""
    name = permission['name']
    resource = name.split('.')[0].lower()
    
    # Handle plural form correctly - don't add 's' if already ends with 's'
    resource_plural = resource if resource.endswith('s') else f"{resource}s"
    
    if '.Read.All' in name or '.Read.' in name:
        return f"""```javascript
// Read {resource} data
const data = await client
  .api('/{resource_plural}')
  .select('id,displayName')
  .top(50)
  .get();

data.value.forEach(item => {{
  console.log(`Item: ${{item.displayName}}`);
}});
```"""
    
    elif '.ReadWrite.All' in name:
        return f"""```javascript
// Read {resource} data
const items = await client
  .api('/{resource_plural}')
  .get();

// Create new {resource}
const newItem = {{
  displayName: 'New Item',
  description: 'Created via API'
}};

const created = await client
  .api('/{resource_plural}')
  .post(newItem);

// Update {resource}
await client
  .api(`/{resource_plural}/${{created.id}}`)
  .patch({{
    displayName: 'Updated Item'
  }});

// Delete {resource}
await client
  .api(`/{resource_plural}/${{created.id}}`)
  .delete();
```"""
    
    return f"""```javascript
// Example usage for {permission['displayName']}
// Implement based on specific use case
```"""

def generate_security_considerations(permission):
    """Generate security considerations"""
    risk_level = get_risk_level(permission)
    considerations = [f"**{risk_level.upper()} RISK**: {permission.get('description', 'Permission description')}"]
    
    if risk_level == 'Critical':
        considerations.extend([
            '- Implement multi-level approval workflows',
            '- Comprehensive audit logging required',
            '- Regular security reviews mandatory'
        ])
    
    if '.All' in permission['name']:
        considerations.append('- Organization-wide scope requires strict access controls')
    
    considerations.extend([
        '- Monitor for unauthorized access',
        '- Comply with data protection regulations'
    ])
    
    return '\n'.join(considerations)

def generate_category_doc(category_name, category_data):
    """Generate markdown documentation for a category"""
    permissions = category_data['permissions']
    count = category_data['count']
    
    doc = f"""# {category_name} Permissions

## Overview

This document provides comprehensive information about **{category_name}** permissions in Microsoft Graph API.

**Total Permissions:** {count}

## Permissions List

"""
    
    for idx, perm in enumerate(permissions, 1):
        risk_level = get_risk_level(perm)
        
        doc += f"""### {idx}. {perm['name']}

**Display Name:** {perm.get('displayName', 'N/A')}  
**Permission ID:** {perm.get('id', 'N/A')}  
**Type:** Application  
**Assigned Date:** {perm.get('assignedDate', 'N/A')}  
**Risk Level:** {risk_level}

#### Description
{perm.get('description', 'No description available')}

#### Common Use Cases
{generate_use_cases(perm)}

#### Code Example
{generate_example(perm)}

#### Security Considerations
{generate_security_considerations(perm)}

---

"""
    
    doc += f"""## Best Practices

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

- [Microsoft Graph {category_name} Documentation](https://learn.microsoft.com/en-us/graph/api/resources/)
- [Permission Best Practices](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Security and Compliance](https://learn.microsoft.com/en-us/graph/security-authorization)

---

**Last Updated:** 2025-11-23  
**Category:** {category_name}  
**Total Permissions:** {count}  
**Documentation Version:** 1.0
"""
    
    return doc

def main():
    # Read permissions file
    permissions_file = Path(__file__).parent.parent.parent / 'AssignedGraphPermissions.txt'
    content = permissions_file.read_text()
    
    print('Parsing permissions from AssignedGraphPermissions.txt...')
    categories = parse_permissions(content)
    
    output_dir = Path(__file__).parent / 'categories'
    output_dir.mkdir(exist_ok=True)
    
    print(f'Found {len(categories)} categories')
    
    total_generated = 0
    
    for category_name, category_data in categories.items():
        slug = generate_slug(category_name)
        filepath = output_dir / f'{slug}.md'
        
        # Skip if already exists (manually created docs)
        if filepath.exists():
            print(f'Skipping {category_name} (already exists)')
            continue
        
        doc = generate_category_doc(category_name, category_data)
        filepath.write_text(doc)
        
        print(f'Generated: {filepath.name}')
        total_generated += 1
    
    print(f'\nGenerated {total_generated} new documentation files')
    print(f'Skipped {len(categories) - total_generated} existing files')

if __name__ == '__main__':
    main()
