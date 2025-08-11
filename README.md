# TeamSync Backend API 🚀

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust and scalable backend API for TeamSync - a modern project management and team collaboration platform. Built with Node.js, TypeScript, Express.js, and MongoDB.

## 🌟 Features

### 🔐 Authentication & Authorization

- **JWT-based authentication** with refresh token support
- **Google OAuth 2.0** integration for seamless login
- **Role-based access control** (Owner, Admin, Member)
- **Permission-based authorization** system
- **Session management** with secure cookie handling

### 🏢 Workspace Management

- **Multi-workspace support** for organizations
- **Invite-based workspace joining** with unique codes
- **Workspace analytics** and reporting
- **Member role management** and permissions
- **Workspace settings** and customization

### 📋 Project & Task Management

- **Project creation and management** within workspaces
- **Task CRUD operations** with detailed metadata
- **Task assignment** to workspace members
- **Priority levels** (Low, Medium, High)
- **Status tracking** (Backlog, Todo, In Progress, In Review, Done)
- **Due date management** and scheduling

### 👥 Team Collaboration

- **Member invitation system** with email notifications
- **Role-based permissions** for fine-grained access control
- **Member activity tracking** and audit logs
- **Real-time collaboration** ready architecture

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.0+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Google OAuth 2.0
- **Validation**: Zod schema validation
- **Security**: Helmet, CORS, Rate limiting
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Google Cloud Console](https://console.cloud.google.com/) account for OAuth setup

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/TeamSync-in/teamsync-backend-api.git
cd teamsync-backend-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:8000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:8000` by default.

### 6. Verify Installation

Visit `http://localhost:8000/api` in your browser. You should see:

```json
{
  "message": "Subham's Project Manager API"
}
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                       | Description                | Example                                          |
| ------------------------------ | -------------------------- | ------------------------------------------------ |
| `NODE_ENV`                     | Application environment    | `development`                                    |
| `PORT`                         | Server port                | `8000`                                           |
| `BASE_PATH`                    | API base path              | `/api`                                           |
| `MONGO_URI`                    | MongoDB connection string  | `mongodb://localhost:27017/teamsync`             |
| `JWT_SECRET`                   | JWT signing secret         | `your-super-secret-key`                          |
| `JWT_EXPIRES_IN`               | JWT token expiration       | `1d`                                             |
| `SESSION_SECRET`               | Session signing secret     | `your-session-secret`                            |
| `SESSION_EXPIRES_IN`           | Session expiration         | `1d`                                             |
| `GOOGLE_CLIENT_ID`             | Google OAuth client ID     | `your-google-client-id`                          |
| `GOOGLE_CLIENT_SECRET`         | Google OAuth client secret | `your-google-client-secret`                      |
| `GOOGLE_CALLBACK_URL`          | Google OAuth callback URL  | `http://localhost:8000/api/auth/google/callback` |
| `FRONTEND_ORIGIN`              | Frontend application URL   | `http://localhost:3000`                          |
| `FRONTEND_GOOGLE_CALLBACK_URL` | Frontend OAuth callback    | `http://localhost:3000/google/oauth/callback`    |

## 📁 Project Structure

```
backend/
├── src/
│   ├── @types/           # TypeScript type definitions
│   ├── config/           # Configuration files
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── http.config.ts
│   │   └── passport.config.ts
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── member.controller.ts
│   │   ├── project.controller.ts
│   │   ├── task.controller.ts
│   │   ├── user.controller.ts
│   │   └── workspace.controller.ts
│   ├── enums/           # TypeScript enums
│   │   ├── account-provider.enum.ts
│   │   ├── error-code.enum.ts
│   │   ├── role.enum.ts
│   │   └── task.enum.ts
│   ├── middlewares/     # Express middlewares
│   │   ├── asyncHandler.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── isAuthenticated.middleware.ts
│   ├── models/          # Mongoose models
│   │   ├── account.model.ts
│   │   ├── member.model.ts
│   │   ├── project.model.ts
│   │   ├── roles-permission.model.ts
│   │   ├── task.model.ts
│   │   ├── user.model.ts
│   │   └── workspace.model.ts
│   ├── routes/          # API routes
│   │   ├── auth.route.ts
│   │   ├── member.route.ts
│   │   ├── project.route.ts
│   │   ├── task.route.ts
│   │   ├── user.route.ts
│   │   └── workspace.route.ts
│   ├── seeders/         # Database seeders
│   │   └── role.seeder.ts
│   ├── services/        # Business logic
│   │   ├── auth.service.ts
│   │   ├── member.service.ts
│   │   ├── project.service.ts
│   │   ├── task.service.ts
│   │   ├── user.service.ts
│   │   └── workspace.service.ts
│   ├── utils/           # Utility functions
│   │   ├── appError.ts
│   │   ├── bcrypt.ts
│   │   ├── get-env.ts
│   │   ├── jwt.ts
│   │   ├── role-permission.ts
│   │   ├── roleGuard.ts
│   │   └── uuid.ts
│   ├── validation/      # Zod validation schemas
│   │   ├── auth.validation.ts
│   │   ├── project.validation.ts
│   │   ├── task.validation.ts
│   │   └── workspace.validation.ts
│   └── index.ts         # Application entry point
├── .env.example         # Environment variables example
├── .gitignore           # Git ignore rules
├── package.json         # Package configuration
├── tsconfig.json        # TypeScript configuration
├── LICENSE              # MIT License
└── README.md            # This file
```

## 📚 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Main Endpoints

#### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback

#### User Management

- `GET /user/profile` - Get current user profile
- `PUT /user/profile` - Update user profile

#### Workspace Management

- `POST /workspace/create/new` - Create new workspace
- `GET /workspace/all` - Get user's workspaces
- `GET /workspace/:id` - Get workspace by ID
- `PUT /workspace/update/:id` - Update workspace
- `DELETE /workspace/delete/:id` - Delete workspace
- `GET /workspace/members/:id` - Get workspace members
- `PUT /workspace/change/member/role/:id` - Change member role
- `GET /workspace/analytics/:id` - Get workspace analytics

#### Project Management

- `POST /project/create` - Create new project
- `GET /project/workspace/:workspaceId/all` - Get workspace projects
- `GET /project/:id` - Get project by ID
- `PUT /project/:id` - Update project
- `DELETE /project/:id/workspace/:workspaceId/delete` - Delete project

#### Task Management

- `POST /task/create` - Create new task
- `GET /task/workspace/:workspaceId/all` - Get workspace tasks
- `GET /task/:id` - Get task by ID
- `PUT /task/:id` - Update task
- `DELETE /task/:id/workspace/:workspaceId/delete` - Delete task

#### Member Management

- `POST /member/add` - Add member to workspace
- `GET /member/workspace/:workspaceId` - Get workspace members
- `DELETE /member/remove/:memberId/workspace/:workspaceId` - Remove member

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Input Validation** using Zod schemas
- **SQL Injection Protection** via Mongoose ODM
- **XSS Protection** through sanitization

## 🧪 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests (if configured)
npm test
```

### Database Seeding

To seed the database with initial roles:

```bash
npm run seed
```

### Code Style

This project uses ESLint and Prettier for code formatting. Make sure to run:

```bash
npm run lint
```

## 🚀 Deployment

### Docker (Recommended)

1. Build the Docker image:

```bash
docker build -t teamsync-backend-api .
```

2. Run the container:

```bash
docker run -p 8000:8000 --env-file .env teamsync-backend-api
```

### Traditional Deployment

1. Install dependencies:

```bash
npm ci --only=production
```

2. Build the project:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

### Environment-Specific Configurations

- **Development**: Uses ts-node-dev for hot reloading
- **Production**: Runs compiled JavaScript with PM2 (recommended)
- **Testing**: Uses in-memory MongoDB (if configured)

## 🤝 Contributing

We welcome contributions to TeamSync! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Subham Paul**

- GitHub: [@subhampaul](https://github.com/ItisSubham)
- LinkedIn: [Subham Paul](https://linkedin.com/in/iam-subham-paul)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the web framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Mongoose](https://mongoosejs.com/) for object modeling
- [Passport.js](http://www.passportjs.org/) for authentication
- [Zod](https://zod.dev/) for schema validation
- All contributors and the open-source community

## 📞 Support

If you have any questions, feel free to reach out:

- **Email**: extraordinary0123456789@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/TeamSync-in/teamsync-backend-api/issues)
- **Documentation**: [Wiki](https://github.com/TeamSync-in/teamsync-backend-api/wiki)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/ItisSubham">Subham Paul</a>
</div>
