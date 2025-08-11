# Authentication API

The TeamSync Backend API provides comprehensive authentication features including JWT-based authentication and Google OAuth 2.0 integration.

## Overview

All authentication endpoints are available under `/api/auth` and handle user registration, login, logout, and OAuth flows.

## Endpoints

### Register User

**POST** `/api/auth/register`

Register a new user with email and password.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64f5a1b2c3d4e5f6789012ab",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-11T10:30:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**

- `201` - User created successfully
- `400` - Invalid input data
- `409` - Email already exists

### Login User

**POST** `/api/auth/login`

Authenticate user with email and password.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "_id": "64f5a1b2c3d4e5f6789012ab",
    "name": "John Doe",
    "email": "john@example.com",
    "currentWorkspace": "64f5a1b2c3d4e5f6789012cd"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**

- `200` - Login successful
- `400` - Invalid credentials
- `404` - User not found

### Logout User

**POST** `/api/auth/logout`

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "message": "Logout successful"
}
```

**Status Codes:**

- `200` - Logout successful
- `401` - Unauthorized

### Google OAuth

#### Initiate Google OAuth

**GET** `/api/auth/google`

Redirects to Google OAuth consent screen.

**Query Parameters:**

- `returnUrl` (optional) - URL to redirect after successful authentication

**Response:**
Redirects to Google OAuth consent screen.

#### Google OAuth Callback

**GET** `/api/auth/google/callback`

Handles the callback from Google OAuth.

**Response:**
Redirects to frontend with authentication result.

**Success Redirect:**

```
{FRONTEND_ORIGIN}/google/oauth/callback?token={jwt-token}&user={user-data}
```

**Error Redirect:**

```
{FRONTEND_ORIGIN}/google/oauth/callback?error={error-message}
```

## Authentication Flow

### JWT Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token (localStorage recommended)
5. Client includes token in subsequent requests
6. Server validates token for protected routes

### Google OAuth Flow

1. Frontend redirects to `/api/auth/google`
2. User consents on Google
3. Google redirects to `/api/auth/google/callback`
4. Server exchanges code for user info
5. Server creates/updates user account
6. Server generates JWT token
7. Server redirects to frontend with token

## Token Usage

Include the JWT token in the Authorization header for all protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

## Error Responses

All authentication endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "errorCode": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `UNAUTHORIZED` - Invalid credentials
- `USER_NOT_FOUND` - User does not exist
- `EMAIL_ALREADY_EXISTS` - Email is already registered
- `TOKEN_EXPIRED` - JWT token has expired
- `OAUTH_ERROR` - Google OAuth authentication failed

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens have configurable expiration
- Rate limiting is applied to prevent brute force attacks
- CORS is configured for cross-origin requests
- Input validation using Zod schemas

## Examples

### cURL Examples

**Register:**

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Logout:**

```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer your-jwt-token"
```

### JavaScript Examples

**Using Fetch API:**

```javascript
// Register
const registerUser = async (userData) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Login
const loginUser = async (credentials) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Authenticated request
const makeAuthenticatedRequest = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
```

## Related Documentation

- [User Management API](User-Management-API)
- [Security Guidelines](Security-Guidelines)
- [Error Codes](Error-Codes)
