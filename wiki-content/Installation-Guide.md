# Installation Guide

This guide will help you set up the TeamSync Backend API on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+**: [Download from nodejs.org](https://nodejs.org/)
- **npm 9+**: Comes with Node.js
- **MongoDB**: [Local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: [Download from git-scm.com](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/TeamSync-in/teamsync-backend-api.git
cd teamsync-backend-api
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Express.js for the web framework
- Mongoose for MongoDB integration
- TypeScript for type safety
- Passport.js for authentication
- And many more...

## Step 3: Environment Configuration

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
nano .env
# or
code .env
```

## Step 4: Database Setup

### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGO_URI` in `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/teamsync_db
   ```

### Option B: MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/teamsync_db
   ```

## Step 5: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:8000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`
6. Update `.env` with your credentials:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## Step 6: Seed Database

```bash
npm run seed
```

This creates the initial roles (Owner, Admin, Member) in your database.

## Step 7: Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:8000`

## Step 8: Verify Installation

Visit `http://localhost:8000/api` in your browser. You should see:

```json
{
  "message": "Subham's Project Manager API"
}
```

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

**MongoDB connection failed:**

- Check if MongoDB is running
- Verify connection string in `.env`
- Check network connectivity for Atlas

**Google OAuth errors:**

- Verify client ID and secret
- Check authorized redirect URIs
- Ensure Google+ API is enabled

### Getting Help

If you encounter issues:

1. Check existing [GitHub Issues](https://github.com/TeamSync-in/teamsync-backend-api/issues)
2. Create a new issue with detailed error information
3. Join our community discussions

## Next Steps

- [Environment Setup Guide](Environment-Setup)
- [API Documentation](Authentication-API)
- [Contributing Guidelines](Contributing)
