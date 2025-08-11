import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import { passportAuthenticateJWT } from "./config/passport.config";

const app = express();
const BASE_PATH = config.BASE_PATH;

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// CORS configuration for Vercel
app.use(
  cors({
    origin: [
      config.FRONTEND_ORIGIN,
      "http://localhost:3000",
      "https://teamsync-frontend-subham.vercel.app", // Add your frontend Vercel URL
      /\.vercel\.app$/, // Allow all Vercel preview deployments
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Root endpoint
app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "TeamSync Backend API",
      version: "1.0.0",
      status: "active",
      environment: config.NODE_ENV,
    });
  })
);

// API routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJWT, userRoutes);
app.use(`${BASE_PATH}/workspace`, passportAuthenticateJWT, workspaceRoutes);
app.use(`${BASE_PATH}/member`, passportAuthenticateJWT, memberRoutes);
app.use(`${BASE_PATH}/project`, passportAuthenticateJWT, projectRoutes);
app.use(`${BASE_PATH}/task`, passportAuthenticateJWT, taskRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(errorHandler);

// For Vercel serverless functions
if (process.env.NODE_ENV !== "production") {
  const PORT = config.PORT || 8000;
  app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT} in ${config.NODE_ENV}`);
    await connectDatabase();
  });
} else {
  // Connect to database immediately for serverless
  connectDatabase();
}

export default app;
