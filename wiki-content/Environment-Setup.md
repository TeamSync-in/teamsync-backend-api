# Environment Setup

This guide covers all environment variables and configuration options for the TeamSync Backend API.

## Environment Variables

### Required Variables

These variables are essential for the application to run:

#### Database Configuration

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/teamsync_db
```

**Options:**

- Local MongoDB: `mongodb://localhost:27017/teamsync_db`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database_name`
- Docker MongoDB: `mongodb://mongo:27017/teamsync_db`

#### JWT Configuration

```env
# Secret key for signing JWT tokens (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# JWT token expiration time
JWT_EXPIRES_IN=1d
```

**JWT_EXPIRES_IN Options:**

- `1d` - 1 day
- `7d` - 7 days
- `24h` - 24 hours
- `3600s` - 3600 seconds

#### Google OAuth Configuration

```env
# Google OAuth credentials from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# OAuth callback URL (backend endpoint)
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
```

### Server Configuration

```env
# Application environment
NODE_ENV=development

# Port number for the server
PORT=8000

# Base path for all API routes
BASE_PATH=/api
```

### Frontend Configuration

```env
# Frontend application URL for CORS and redirects
FRONTEND_ORIGIN=http://localhost:3000

# Frontend OAuth callback URL
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/oauth/callback
```

### Optional Variables

#### Session Configuration

```env
# Session secret for cookie signing
SESSION_SECRET=your-super-secret-session-key

# Session expiration time
SESSION_EXPIRES_IN=1d
```

#### Email Configuration (Future Feature)

```env
# Email service configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Redis Configuration (Future Feature)

```env
# Redis URL for caching and sessions
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password
```

## Environment-Specific Configurations

### Development Environment

`.env.development`:

```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/teamsync_dev
FRONTEND_ORIGIN=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/oauth/callback
```

### Production Environment

`.env.production`:

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamsync_prod
FRONTEND_ORIGIN=https://yourapp.com
GOOGLE_CALLBACK_URL=https://api.yourapp.com/api/auth/google/callback
FRONTEND_GOOGLE_CALLBACK_URL=https://yourapp.com/google/oauth/callback
```

### Testing Environment

`.env.test`:

```env
NODE_ENV=test
PORT=8001
MONGO_URI=mongodb://localhost:27017/teamsync_test
JWT_SECRET=test-jwt-secret
SESSION_SECRET=test-session-secret
```

## Google OAuth Setup Guide

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project"
3. Enter project name: "TeamSync Backend"
4. Click "Create"

### Step 2: Enable Google+ API

1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure consent screen if prompted
4. Choose "Web application"
5. Add authorized redirect URIs:
   - Development: `http://localhost:8000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`

### Step 4: Configure Environment

Copy the Client ID and Client Secret to your `.env` file:

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

## Security Best Practices

### Secret Generation

Generate strong secrets using:

```bash
# Generate random string
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Environment Security

1. **Never commit `.env` files** to version control
2. **Use different secrets** for each environment
3. **Rotate secrets regularly** in production
4. **Use environment-specific values** for URLs
5. **Validate environment variables** on startup

### Production Considerations

1. **Use HTTPS** for all URLs in production
2. **Set secure JWT expiration** times
3. **Use environment variables** instead of hardcoded values
4. **Monitor for exposed secrets** in logs
5. **Use secret management services** for sensitive data

## Validation

The application validates environment variables on startup. Missing required variables will cause the application to exit with an error.

### Custom Validation

Add custom validation in `src/config/app.config.ts`:

```typescript
import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  // Validate required environment variables
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "8000"),
  MONGO_URI: getEnv("MONGO_URI"), // Required - will throw if missing
  JWT_SECRET: getEnv("JWT_SECRET"), // Required - will throw if missing
  // ... other variables
});
```

## Troubleshooting

### Common Issues

**Environment variables not loading:**

- Check file name is exactly `.env`
- Ensure file is in project root
- Verify no spaces around `=` in variable definitions

**MongoDB connection failed:**

- Verify `MONGO_URI` format
- Check MongoDB is running (for local)
- Verify network access (for Atlas)

**Google OAuth errors:**

- Verify client ID and secret
- Check authorized redirect URIs
- Ensure Google+ API is enabled

**JWT token issues:**

- Verify `JWT_SECRET` is set
- Check token expiration settings
- Ensure secret is same across restarts

## Examples

### Complete .env Example

```env
# ==================================================
# TeamSync Backend Environment Configuration
# ==================================================

# Database Configuration
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamsync_db

# JWT Configuration
JWT_SECRET=super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1d

# Session Configuration
SESSION_SECRET=super-secret-session-key-change-in-production
SESSION_EXPIRES_IN=1d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Frontend Configuration
FRONTEND_ORIGIN=http://localhost:3000
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/oauth/callback

# Server Configuration
NODE_ENV=development
PORT=8000
BASE_PATH=/api
```

## Related Documentation

- [Installation Guide](Installation-Guide)
- [Google OAuth Setup](Google-OAuth-Setup)
- [Security Guidelines](Security-Guidelines)
