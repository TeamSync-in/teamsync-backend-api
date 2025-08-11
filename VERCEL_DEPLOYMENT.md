# Vercel Deployment Guide

This guide explains how to deploy your TeamSync Backend API to Vercel's serverless platform.

## 🚀 Quick Deployment

### Prerequisites

- Vercel account (free tier available)
- GitHub repository with your backend code
- MongoDB Atlas database (required for production)

### Method 1: Deploy from GitHub (Recommended)

1. **Connect GitHub to Vercel**

   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login to Vercel
   vercel login
   ```

2. **Deploy from GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

### Method 2: Deploy via CLI

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Deploy to Vercel**

   ```bash
   # Preview deployment
   npm run deploy:preview

   # Production deployment
   npm run deploy
   ```

## ⚙️ Environment Variables

Configure these in your Vercel dashboard under Project Settings > Environment Variables:

### Required Variables

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamsync_prod
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### Vercel-Specific URLs

```env
# Your frontend Vercel URL
FRONTEND_ORIGIN=https://your-frontend.vercel.app

# Backend callback URL (will be your Vercel backend URL)
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/auth/google/callback

# Frontend callback URL
FRONTEND_GOOGLE_CALLBACK_URL=https://your-frontend.vercel.app/google/oauth/callback
```

## 🔧 Configuration Files

### vercel.json

```json
{
  "version": 2,
  "name": "teamsync-backend-api",
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["src/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "src/index.ts": {
      "maxDuration": 30
    }
  }
}
```

## 📊 Vercel vs Traditional Hosting

| Feature          | Vercel           | Traditional VPS |
| ---------------- | ---------------- | --------------- |
| **Scaling**      | Automatic        | Manual          |
| **Cold Starts**  | Yes (~100-500ms) | No              |
| **Cost**         | Pay per use      | Fixed monthly   |
| **Maintenance**  | Zero             | High            |
| **Database**     | External only    | Can be local    |
| **File Storage** | Temporary        | Persistent      |

## 🚨 Important Considerations

### 1. **Serverless Limitations**

- **Cold Starts**: First request may be slower
- **Execution Time**: Max 30 seconds per request
- **Memory**: Limited to 1GB
- **Stateless**: No persistent file storage

### 2. **Database Requirements**

- **Must use MongoDB Atlas** or external database
- Local MongoDB won't work on Vercel
- Connection pooling is important for performance

### 3. **File Uploads**

- Temporary file system only
- Use external services like:
  - Cloudinary for images
  - AWS S3 for files
  - Vercel Blob for simple storage

### 4. **Sessions & State**

- No persistent server state
- Use JWT tokens (already implemented ✅)
- External session stores if needed

## 🔍 Testing Your Deployment

### 1. **Health Check**

```bash
curl https://your-backend.vercel.app/health
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2025-08-11T10:30:00.000Z",
  "uptime": 1.234
}
```

### 2. **API Endpoints**

```bash
# Test authentication
curl https://your-backend.vercel.app/api/auth/google

# Test protected route (with token)
curl -H "Authorization: Bearer <token>" \
     https://your-backend.vercel.app/api/users/profile
```

## 🐛 Common Issues & Solutions

### 1. **Cold Start Timeouts**

**Problem**: First request takes too long
**Solution**:

- Implement database connection pooling
- Use Vercel's warming strategies
- Optimize imports and dependencies

### 2. **CORS Errors**

**Problem**: Frontend can't access backend
**Solution**: Update CORS configuration in `src/vercel.ts`

```typescript
app.use(
  cors({
    origin: [
      "https://your-frontend.vercel.app",
      /\.vercel\.app$/, // Allow all Vercel preview deployments
    ],
    credentials: true,
  })
);
```

### 3. **Environment Variables Not Working**

**Problem**: Variables not loading
**Solution**:

- Check Vercel dashboard settings
- Redeploy after adding variables
- Use Vercel CLI: `vercel env pull`

### 4. **Database Connection Issues**

**Problem**: MongoDB connection failures
**Solution**:

- Use MongoDB Atlas (cloud)
- Check connection string format
- Whitelist Vercel IPs (0.0.0.0/0 for all)

## 📈 Performance Optimization

### 1. **Connection Pooling**

```typescript
// In database.config.ts
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
```

### 2. **Lazy Loading**

- Load heavy dependencies only when needed
- Use dynamic imports for optional features
- Minimize bundle size

### 3. **Caching Strategies**

- Use Redis for session storage
- Implement API response caching
- Cache database queries when possible

## 🔄 CI/CD Pipeline

### Automatic Deployments

Vercel automatically deploys when you:

1. Push to main branch (production)
2. Push to any branch (preview)
3. Open pull requests (preview)

### Custom Deploy Commands

```bash
# Deploy specific branch
vercel --prod --yes

# Deploy with specific environment
vercel --env production
```

## 💰 Cost Estimation

### Vercel Pro Plan Features

- **Hobby (Free)**: 100GB bandwidth, 100 serverless function executions
- **Pro ($20/month)**: 1TB bandwidth, unlimited functions
- **Enterprise**: Custom pricing

### Expected Costs

For a medium-traffic app:

- **Free tier**: Good for development/small projects
- **Pro tier**: Recommended for production apps
- **Additional costs**: MongoDB Atlas, external services

## 🚀 Go Live Checklist

- [ ] MongoDB Atlas database set up
- [ ] All environment variables configured
- [ ] Google OAuth URLs updated
- [ ] Frontend CORS origins added
- [ ] Health check endpoint working
- [ ] Domain name configured (optional)
- [ ] Monitoring set up
- [ ] Error tracking enabled

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

Your TeamSync backend is now ready for Vercel deployment! 🎉
