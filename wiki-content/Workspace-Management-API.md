# Workspace Management API

This documentation covers all workspace-related API endpoints including creation, management, member operations, and workspace settings.

## Base URL

```
http://localhost:8000/api/workspaces
```

## Authentication

All workspace endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Create Workspace

Create a new workspace with the authenticated user as the owner.

**Endpoint:** `POST /api/workspaces`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "name": "My New Workspace",
  "description": "A workspace for our team collaboration"
}
```

**Validation Rules:**

- `name`: Required string, 3-100 characters
- `description`: Optional string, max 500 characters

**Response:**

```json
{
  "success": true,
  "data": {
    "workspace": {
      "_id": "648b5c5d5e1234567890def1",
      "name": "My New Workspace",
      "description": "A workspace for our team collaboration",
      "owner": "648b5c5d5e1234567890abcd",
      "inviteCode": "INV-ABC123DEF456",
      "projects": [],
      "members": [
        {
          "user": "648b5c5d5e1234567890abcd",
          "role": "Owner",
          "permissions": ["read", "write", "delete", "manage"],
          "joinedAt": "2023-06-15T10:30:00.000Z"
        }
      ],
      "createdAt": "2023-06-15T10:30:00.000Z",
      "updatedAt": "2023-06-15T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Workspace name is required",
  "error": "WORKSPACE_NAME_REQUIRED",
  "statusCode": 400
}
```

### Get All Workspaces

Get all workspaces where the authenticated user is a member.

**Endpoint:** `GET /api/workspaces`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10, max: 50)
- `search` (optional): Search by workspace name
- `role` (optional): Filter by user role (Owner, Admin, Member)
- `sortBy` (optional): Sort field (name, createdAt, updatedAt)
- `sortOrder` (optional): Sort order (asc, desc)

**Example Request:**

```
GET /api/workspaces?page=1&limit=20&search=team&role=Owner&sortBy=name&sortOrder=asc
```

**Response:**

```json
{
  "success": true,
  "data": {
    "workspaces": [
      {
        "_id": "648b5c5d5e1234567890def1",
        "name": "My Team Workspace",
        "description": "Our main team workspace",
        "owner": {
          "_id": "648b5c5d5e1234567890abcd",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "avatar": "https://lh3.googleusercontent.com/a/profile-pic"
        },
        "inviteCode": "INV-ABC123DEF456",
        "totalMembers": 5,
        "totalProjects": 3,
        "userRole": "Owner",
        "userPermissions": ["read", "write", "delete", "manage"],
        "createdAt": "2023-06-15T10:30:00.000Z",
        "updatedAt": "2023-06-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalWorkspaces": 3,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Get Workspace by ID

Get detailed information about a specific workspace.

**Endpoint:** `GET /api/workspaces/:workspaceId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Response:**

```json
{
  "success": true,
  "data": {
    "workspace": {
      "_id": "648b5c5d5e1234567890def1",
      "name": "My Team Workspace",
      "description": "Our main team workspace",
      "owner": {
        "_id": "648b5c5d5e1234567890abcd",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/profile-pic"
      },
      "inviteCode": "INV-ABC123DEF456",
      "members": [
        {
          "user": {
            "_id": "648b5c5d5e1234567890abcd",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "avatar": "https://lh3.googleusercontent.com/a/profile-pic"
          },
          "role": "Owner",
          "permissions": ["read", "write", "delete", "manage"],
          "joinedAt": "2023-06-15T10:30:00.000Z"
        },
        {
          "user": {
            "_id": "648b5c5d5e1234567890abce",
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "avatar": "https://lh3.googleusercontent.com/a/another-pic"
          },
          "role": "Admin",
          "permissions": ["read", "write", "delete"],
          "joinedAt": "2023-06-16T08:15:00.000Z"
        }
      ],
      "projects": [
        {
          "_id": "648b5c5d5e1234567890ghi1",
          "name": "Project Alpha",
          "description": "Our first project",
          "totalTasks": 12,
          "completedTasks": 8
        }
      ],
      "totalMembers": 5,
      "totalProjects": 3,
      "totalTasks": 47,
      "userRole": "Owner",
      "userPermissions": ["read", "write", "delete", "manage"],
      "createdAt": "2023-06-15T10:30:00.000Z",
      "updatedAt": "2023-06-15T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Workspace not found",
  "error": "WORKSPACE_NOT_FOUND",
  "statusCode": 404
}
```

### Update Workspace

Update workspace information (requires Admin or Owner role).

**Endpoint:** `PUT /api/workspaces/:workspaceId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Request Body:**

```json
{
  "name": "Updated Workspace Name",
  "description": "Updated workspace description"
}
```

**Validation Rules:**

- `name`: Optional string, 3-100 characters
- `description`: Optional string, max 500 characters

**Response:**

```json
{
  "success": true,
  "data": {
    "workspace": {
      "_id": "648b5c5d5e1234567890def1",
      "name": "Updated Workspace Name",
      "description": "Updated workspace description",
      "owner": "648b5c5d5e1234567890abcd",
      "inviteCode": "INV-ABC123DEF456",
      "updatedAt": "2023-06-15T14:30:00.000Z"
    }
  }
}
```

### Delete Workspace

Delete a workspace and all its associated data (Owner only).

**Endpoint:** `DELETE /api/workspaces/:workspaceId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Workspace deleted successfully"
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Only the workspace owner can delete this workspace",
  "error": "INSUFFICIENT_PERMISSIONS",
  "statusCode": 403
}
```

### Join Workspace by Invite Code

Join a workspace using an invite code.

**Endpoint:** `POST /api/workspaces/join`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
  "inviteCode": "INV-ABC123DEF456"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "workspace": {
      "_id": "648b5c5d5e1234567890def1",
      "name": "Team Workspace",
      "description": "Welcome to our team!",
      "totalMembers": 6,
      "userRole": "Member",
      "userPermissions": ["read", "write"]
    },
    "member": {
      "user": "648b5c5d5e1234567890abcd",
      "role": "Member",
      "permissions": ["read", "write"],
      "joinedAt": "2023-06-15T15:45:00.000Z"
    }
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Invalid invite code",
  "error": "INVALID_INVITE_CODE",
  "statusCode": 400
}
```

### Leave Workspace

Leave a workspace (Members can leave, Owners cannot leave their own workspace).

**Endpoint:** `POST /api/workspaces/:workspaceId/leave`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Left workspace successfully"
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Workspace owners cannot leave their own workspace",
  "error": "OWNER_CANNOT_LEAVE",
  "statusCode": 400
}
```

### Regenerate Invite Code

Generate a new invite code for the workspace (Admin or Owner only).

**Endpoint:** `POST /api/workspaces/:workspaceId/regenerate-invite`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Response:**

```json
{
  "success": true,
  "data": {
    "workspace": {
      "_id": "648b5c5d5e1234567890def1",
      "inviteCode": "INV-XYZ789ABC123",
      "updatedAt": "2023-06-15T16:00:00.000Z"
    }
  }
}
```

### Get Workspace Members

Get all members of a specific workspace.

**Endpoint:** `GET /api/workspaces/:workspaceId/members`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10, max: 50)
- `search` (optional): Search by member name or email
- `role` (optional): Filter by role (Owner, Admin, Member)

**Response:**

```json
{
  "success": true,
  "data": {
    "members": [
      {
        "_id": "648b5c5d5e1234567890mem1",
        "user": {
          "_id": "648b5c5d5e1234567890abcd",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "avatar": "https://lh3.googleusercontent.com/a/profile-pic"
        },
        "role": "Owner",
        "permissions": ["read", "write", "delete", "manage"],
        "joinedAt": "2023-06-15T10:30:00.000Z"
      },
      {
        "_id": "648b5c5d5e1234567890mem2",
        "user": {
          "_id": "648b5c5d5e1234567890abce",
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "avatar": "https://lh3.googleusercontent.com/a/another-pic"
        },
        "role": "Admin",
        "permissions": ["read", "write", "delete"],
        "joinedAt": "2023-06-16T08:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalMembers": 5,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

### Update Member Role

Update a member's role in the workspace (Admin or Owner only).

**Endpoint:** `PUT /api/workspaces/:workspaceId/members/:memberId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace
- `memberId`: MongoDB ObjectId of the member

**Request Body:**

```json
{
  "role": "Admin"
}
```

**Validation Rules:**

- `role`: Required string, must be one of: "Admin", "Member"
- Note: Owner role cannot be changed via this endpoint

**Response:**

```json
{
  "success": true,
  "data": {
    "member": {
      "_id": "648b5c5d5e1234567890mem2",
      "user": {
        "_id": "648b5c5d5e1234567890abce",
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      },
      "role": "Admin",
      "permissions": ["read", "write", "delete"],
      "updatedAt": "2023-06-15T17:00:00.000Z"
    }
  }
}
```

### Remove Member

Remove a member from the workspace (Admin or Owner only).

**Endpoint:** `DELETE /api/workspaces/:workspaceId/members/:memberId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `workspaceId`: MongoDB ObjectId of the workspace
- `memberId`: MongoDB ObjectId of the member

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Member removed successfully"
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Cannot remove the workspace owner",
  "error": "CANNOT_REMOVE_OWNER",
  "statusCode": 400
}
```

## Data Models

### Workspace Object

```typescript
interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string | User;
  inviteCode: string;
  members: Member[];
  projects: string[] | Project[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Member Object

```typescript
interface Member {
  _id: string;
  user: string | User;
  role: "Owner" | "Admin" | "Member";
  permissions: string[];
  joinedAt: Date;
}
```

### Workspace List Response

```typescript
interface WorkspaceListResponse {
  success: boolean;
  data: {
    workspaces: Workspace[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalWorkspaces: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
```

## Roles and Permissions

### Role Hierarchy

1. **Owner**: Full control over workspace
2. **Admin**: Manage members and projects
3. **Member**: Basic read/write access

### Permission Matrix

| Action            | Owner | Admin | Member |
| ----------------- | ----- | ----- | ------ |
| View workspace    | ✅    | ✅    | ✅     |
| Edit workspace    | ✅    | ✅    | ❌     |
| Delete workspace  | ✅    | ❌    | ❌     |
| Manage members    | ✅    | ✅    | ❌     |
| Create projects   | ✅    | ✅    | ✅     |
| Delete projects   | ✅    | ✅    | ❌     |
| Regenerate invite | ✅    | ✅    | ❌     |
| Leave workspace   | ❌    | ✅    | ✅     |

## Error Codes

| Code                     | Status | Description                       |
| ------------------------ | ------ | --------------------------------- |
| WORKSPACE_NOT_FOUND      | 404    | Workspace does not exist          |
| WORKSPACE_NAME_REQUIRED  | 400    | Workspace name is required        |
| INVALID_INVITE_CODE      | 400    | Invite code is invalid or expired |
| ALREADY_MEMBER           | 400    | User is already a member          |
| INSUFFICIENT_PERMISSIONS | 403    | User lacks required permissions   |
| OWNER_CANNOT_LEAVE       | 400    | Workspace owner cannot leave      |
| CANNOT_REMOVE_OWNER      | 400    | Cannot remove workspace owner     |
| MEMBER_NOT_FOUND         | 404    | Member not found in workspace     |
| INVALID_ROLE             | 400    | Invalid role specified            |

## Usage Examples

### JavaScript/TypeScript

#### Create Workspace

```javascript
const createWorkspace = async (name, description) => {
  try {
    const response = await fetch("/api/workspaces", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Workspace created:", data.data.workspace);
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

#### Join Workspace

```javascript
const joinWorkspace = async (inviteCode) => {
  try {
    const response = await fetch("/api/workspaces/join", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteCode }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Joined workspace:", data.data.workspace);
    } else {
      console.error("Join failed:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

#### Update Member Role

```javascript
const updateMemberRole = async (workspaceId, memberId, role) => {
  try {
    const response = await fetch(
      `/api/workspaces/${workspaceId}/members/${memberId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("Member role updated:", data.data.member);
    } else {
      console.error("Update failed:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

### cURL Examples

#### Create Workspace

```bash
curl -X POST http://localhost:8000/api/workspaces \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Team Workspace",
    "description": "A workspace for our team"
  }'
```

#### Join Workspace

```bash
curl -X POST http://localhost:8000/api/workspaces/join \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "inviteCode": "INV-ABC123DEF456"
  }'
```

#### Get Workspace Members

```bash
curl -X GET http://localhost:8000/api/workspaces/648b5c5d5e1234567890def1/members \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json"
```

## Security Considerations

1. **Access Control**: All operations validate user membership and permissions
2. **Invite Codes**: Unique codes for secure workspace joining
3. **Owner Protection**: Owners cannot be removed or demoted
4. **Data Isolation**: Users can only access workspaces they're members of
5. **Cascade Deletion**: Workspace deletion removes all associated data

## Related Documentation

- [Member Management API](Member-Management-API)
- [Project Management API](Project-Management-API)
- [Authentication API](Authentication-API)
