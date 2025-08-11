# User Management API

This documentation covers all user-related API endpoints including profile management, user operations, and account settings.

## Base URL

```
http://localhost:8000/api/users
```

## Authentication

All user endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Get Current User Profile

Get the authenticated user's profile information.

**Endpoint:** `GET /api/users/profile`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "648b5c5d5e1234567890abcd",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "avatar": "https://lh3.googleusercontent.com/a/profile-pic",
      "provider": "google",
      "accountId": "google-account-id-123",
      "isEmailVerified": true,
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
  "message": "Unauthorized",
  "error": "UNAUTHORIZED",
  "statusCode": 401
}
```

### Update User Profile

Update the authenticated user's profile information.

**Endpoint:** `PUT /api/users/profile`

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
  "name": "Updated Name",
  "email": "new.email@example.com"
}
```

**Validation Rules:**

- `name`: Optional string, 2-100 characters
- `email`: Optional string, valid email format

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "648b5c5d5e1234567890abcd",
      "name": "Updated Name",
      "email": "new.email@example.com",
      "avatar": "https://lh3.googleusercontent.com/a/profile-pic",
      "provider": "google",
      "accountId": "google-account-id-123",
      "isEmailVerified": true,
      "createdAt": "2023-06-15T10:30:00.000Z",
      "updatedAt": "2023-06-15T12:45:00.000Z"
    }
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Email already exists",
  "error": "EMAIL_ALREADY_EXISTS",
  "statusCode": 400
}
```

### Get All Users

Get a list of all users in the system (typically for admin purposes).

**Endpoint:** `GET /api/users`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 10, max: 100)
- `search` (optional): Search by name or email
- `sortBy` (optional): Sort field (name, email, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)

**Example Request:**

```
GET /api/users?page=1&limit=20&search=john&sortBy=name&sortOrder=asc
```

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "648b5c5d5e1234567890abcd",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/profile-pic",
        "provider": "google",
        "isEmailVerified": true,
        "createdAt": "2023-06-15T10:30:00.000Z"
      },
      {
        "_id": "648b5c5d5e1234567890abce",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/another-pic",
        "provider": "google",
        "isEmailVerified": true,
        "createdAt": "2023-06-16T08:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 47,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Get User by ID

Get detailed information about a specific user by their ID.

**Endpoint:** `GET /api/users/:userId`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Path Parameters:**

- `userId`: MongoDB ObjectId of the user

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "648b5c5d5e1234567890abcd",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "avatar": "https://lh3.googleusercontent.com/a/profile-pic",
      "provider": "google",
      "accountId": "google-account-id-123",
      "isEmailVerified": true,
      "createdAt": "2023-06-15T10:30:00.000Z",
      "updatedAt": "2023-06-15T10:30:00.000Z",
      "workspaces": [
        {
          "_id": "648b5c5d5e1234567890def1",
          "name": "Personal Workspace",
          "role": "Owner"
        }
      ],
      "totalWorkspaces": 3,
      "totalProjects": 12,
      "totalTasks": 47
    }
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "User not found",
  "error": "USER_NOT_FOUND",
  "statusCode": 404
}
```

### Delete User Account

Delete the authenticated user's account and all associated data.

**Endpoint:** `DELETE /api/users/profile`

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
  "confirmDeletion": true,
  "password": "optional-password-for-verification"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "User account deleted successfully"
  }
}
```

**Error Responses:**

```json
{
  "success": false,
  "message": "Deletion not confirmed",
  "error": "DELETION_NOT_CONFIRMED",
  "statusCode": 400
}
```

### Upload User Avatar

Upload or update the user's profile picture.

**Endpoint:** `POST /api/users/avatar`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "multipart/form-data"
}
```

**Request Body (Form Data):**

- `avatar`: Image file (JPEG, PNG, GIF, max 5MB)

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "648b5c5d5e1234567890abcd",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "avatar": "https://storage.example.com/avatars/user-avatar.jpg",
      "updatedAt": "2023-06-15T14:20:00.000Z"
    }
  }
}
```

### Get User Statistics

Get statistical information about the user's activity.

**Endpoint:** `GET /api/users/stats`

**Headers:**

```json
{
  "Authorization": "Bearer <jwt-token>",
  "Content-Type": "application/json"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalWorkspaces": 3,
      "ownedWorkspaces": 1,
      "memberWorkspaces": 2,
      "totalProjects": 12,
      "totalTasks": 47,
      "completedTasks": 32,
      "pendingTasks": 15,
      "tasksCreatedThisMonth": 8,
      "tasksCompletedThisMonth": 12,
      "lastLoginAt": "2023-06-15T10:30:00.000Z",
      "accountCreatedAt": "2023-05-01T09:15:00.000Z"
    }
  }
}
```

## Data Models

### User Object

```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "google" | "email";
  accountId: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Profile Response

```typescript
interface UserProfileResponse {
  success: boolean;
  data: {
    user: User;
  };
}
```

### Users List Response

```typescript
interface UsersListResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
```

## Error Codes

| Code                   | Status | Description                       |
| ---------------------- | ------ | --------------------------------- |
| UNAUTHORIZED           | 401    | User not authenticated            |
| USER_NOT_FOUND         | 404    | User does not exist               |
| EMAIL_ALREADY_EXISTS   | 400    | Email is already registered       |
| INVALID_USER_DATA      | 400    | Invalid user information provided |
| DELETION_NOT_CONFIRMED | 400    | Account deletion not confirmed    |
| AVATAR_UPLOAD_FAILED   | 400    | Failed to upload avatar image     |
| FILE_TOO_LARGE         | 400    | Avatar file exceeds size limit    |
| INVALID_FILE_TYPE      | 400    | Avatar file type not supported    |

## Usage Examples

### JavaScript/TypeScript

#### Get Current User Profile

```javascript
const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log("User profile:", data.data.user);
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

#### Update User Profile

```javascript
const updateProfile = async (name, email) => {
  try {
    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Profile updated:", data.data.user);
    } else {
      console.error("Update failed:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

#### Upload Avatar

```javascript
const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch("/api/users/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Avatar uploaded:", data.data.user.avatar);
    } else {
      console.error("Upload failed:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

### cURL Examples

#### Get Current User Profile

```bash
curl -X GET http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json"
```

#### Update User Profile

```bash
curl -X PUT http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "new.email@example.com"
  }'
```

#### Upload Avatar

```bash
curl -X POST http://localhost:8000/api/users/avatar \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "avatar=@/path/to/avatar.jpg"
```

## Rate Limiting

User API endpoints have the following rate limits:

- Profile operations: 100 requests per 15 minutes
- Avatar upload: 10 requests per hour
- User listing: 30 requests per minute

## Security Considerations

1. **Personal Data**: User endpoints handle sensitive personal information
2. **Avatar Upload**: File uploads are validated for type and size
3. **Account Deletion**: Requires explicit confirmation to prevent accidental deletion
4. **Email Updates**: Email changes may require verification in future versions
5. **Privacy**: User listing may be restricted based on workspace membership

## Related Documentation

- [Authentication API](Authentication-API)
- [Workspace Management API](Workspace-Management-API)
- [Error Handling Guide](Error-Handling-Guide)
