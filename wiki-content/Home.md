# TeamSync Backend API Documentation

Welcome to the comprehensive documentation for TeamSync Backend API! This wiki provides detailed information about the API, its features, and how to use it effectively.

TeamSync is a powerful team collaboration platform that enables organizations to manage workspaces, projects, and tasks with robust authentication and role-based access control.

## 📖 Quick Navigation

### 🏁 Getting Started

- [Installation Guide](Installation-Guide) - Complete setup instructions and prerequisites
- [Environment Setup](Environment-Setup) - Configure environment variables and secrets
- [Authentication API](Authentication-API) - Google OAuth integration and JWT authentication

### 📚 API Documentation

- [User Management API](User-Management-API) - Profile management and user operations
- [Workspace Management API](Workspace-Management-API) - Workspace creation, member management, and permissions
- [Project Management API](Project-Management-API) - Project lifecycle and organization _(Coming Soon)_
- [Task Management API](Task-Management-API) - Task creation, assignment, and tracking _(Coming Soon)_
- [Member Management API](Member-Management-API) - Team collaboration features _(Coming Soon)_

### 🛠️ Development Resources

- [Contributing Guidelines](../CONTRIBUTING.md) - How to contribute to the project
- [Docker Setup](Docker-Setup) - Containerized development environment
- [Database Schema](Database-Schema) - MongoDB collections and relationships
- [API Testing](API-Testing) - Postman collections and testing strategies

### 📖 Reference

- [Error Handling](Error-Handling) - Standard error codes and responses
- [Security Guidelines](Security-Guidelines) - Best practices and security measures
- [Rate Limiting](Rate-Limiting) - API usage limits and throttling
- [Changelog](../CHANGELOG.md) - Version history and updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB 5.0+
- Google Cloud Console account (for OAuth)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/TeamSync-in/teamsync-backend-api.git
cd teamsync-backend-api

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev
```

### Using Docker

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f backend
```

## 🏗️ Architecture Overview

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with custom middleware
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Google OAuth 2.0
- **Validation**: Zod schemas
- **Development**: Nodemon, ESLint, Prettier

### Key Features

- 🔐 **Secure Authentication** - JWT tokens with Google OAuth integration
- 👥 **Multi-workspace Support** - Organize teams across different workspaces
- 🎯 **Role-based Permissions** - Owner, Admin, and Member roles with granular permissions
- 📊 **Project Management** - Create and manage projects within workspaces
- ✅ **Task Tracking** - Comprehensive task management with status tracking
- 🚀 **RESTful API** - Clean, documented endpoints following REST principles

## 📋 API Endpoints Overview

### Authentication

- `POST /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Handle OAuth callback
- `POST /api/auth/logout` - Logout and invalidate tokens

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload profile picture

### Workspaces

- `GET /api/workspaces` - List user workspaces
- `POST /api/workspaces` - Create new workspace
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace
- `POST /api/workspaces/join` - Join workspace with invite code

### Projects & Tasks

- Full CRUD operations for projects and tasks
- Status tracking and assignment management
- Priority and due date handling

## 🧪 Testing the API

### Using cURL

```bash
# Get user profile
curl -X GET http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer <your-jwt-token>"

# Create workspace
curl -X POST http://localhost:8000/api/workspaces \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Workspace", "description": "Team workspace"}'
```

### Using Postman

Import the provided Postman collection for comprehensive API testing with pre-configured requests and environment variables.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](../CONTRIBUTING.md) for details on:

- Setting up the development environment
- Code style and conventions
- Pull request process
- Issue reporting

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Submit a pull request

## 📞 Support & Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/TeamSync-in/teamsync-backend-api/issues)
- **Discussions**: [Join community discussions](https://github.com/TeamSync-in/teamsync-backend-api/discussions)
- **Email**: extraordinary0123456789@gmail.com
- **Documentation**: This wiki contains comprehensive guides and API reference

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🏷️ Version Information

- **Current Version**: 1.0.0
- **API Version**: v1
- **Node.js**: 18+ Required
- **Database**: MongoDB 5.0+

---

**Last Updated**: August 11, 2025  
**Maintained by**: TeamSync Development Team
