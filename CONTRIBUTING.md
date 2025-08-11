# Contributing to TeamSync Backend 🤝

First off, thank you for considering contributing to TeamSync! It's people like you that make TeamSync such a great tool. We welcome contributions from everyone, whether it's a bug report, feature request, documentation improvement, or code contribution.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running (local or cloud)
- Git installed
- A GitHub account

### Quick Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/TeamSync-in/teamsync-backend-api.git`
3. Install dependencies: `npm install`
4. Copy environment file: `cp .env.example .env`
5. Configure your `.env` file
6. Start development server: `npm run dev`

## 🛠️ How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Detailed description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, Node.js version, etc.)
- **Screenshots or error logs** if applicable

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear title** for the enhancement
- **Detailed description** of the proposed feature
- **Use case** explaining why this would be useful
- **Potential implementation** ideas (if any)

### 📝 Improving Documentation

Documentation improvements are always appreciated:

- Fix typos or grammatical errors
- Add examples or clarifications
- Update outdated information
- Add missing documentation

### 💻 Code Contributions

We welcome code contributions! Here are some areas where you can help:

- **Bug fixes**
- **New features**
- **Performance improvements**
- **Security enhancements**
- **Test coverage improvements**
- **Code refactoring**

## 🔧 Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/TeamSync-in/teamsync-backend-api.git
cd teamsync-backend-api
```

### 2. Set Up Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Database Setup

Make sure MongoDB is running and update your `MONGO_URI` in `.env`.

### 4. Start Development

```bash
# Start development server with hot reload
npm run dev

# The server will start at http://localhost:8000
```

### 5. Verify Setup

Visit `http://localhost:8000/api` - you should see the API welcome message.

## 📏 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### Code Style

- Use **2 spaces** for indentation
- Use **semicolons** at the end of statements
- Use **single quotes** for strings
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and interfaces
- Use **UPPER_SNAKE_CASE** for constants

### File Organization

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define database schemas
- **Utils**: Helper functions
- **Middlewares**: Express middleware functions
- **Validation**: Zod schemas for input validation

### Error Handling

- Use custom error classes
- Provide meaningful error messages
- Include proper HTTP status codes
- Log errors appropriately

### Security Best Practices

- Validate all input data
- Use parameterized queries
- Sanitize user input
- Implement proper authentication
- Follow OWASP guidelines

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

```bash
feat(auth): add Google OAuth integration
fix(tasks): resolve task deletion permission issue
docs(api): update authentication endpoints documentation
refactor(controllers): extract common validation logic
test(services): add unit tests for workspace service
```

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:

   ```bash
   npm run test
   npm run lint
   ```

4. **Commit your changes** with conventional commit messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Pull Request Template

When creating a pull request, please include:

- **Clear title** describing the change
- **Description** of what was changed and why
- **Testing** information (how was it tested?)
- **Screenshots** (if UI changes)
- **Breaking changes** (if any)
- **Related issues** (link to issues)

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by maintainers
3. **Testing** in different environments
4. **Approval** and merge by maintainers

## 🐛 Issue Guidelines

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if it's already fixed in the latest version
- Make sure it's related to the backend (not frontend)

### Issue Templates

We provide templates for:

- **Bug reports**
- **Feature requests**
- **Documentation improvements**
- **Questions**

### Issue Labels

We use labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high/medium/low` - Priority levels

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Update tests for modified code
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

## 📚 Additional Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## ❓ Questions?

If you have questions that aren't covered in this guide:

- Check existing [GitHub Issues](https://github.com/TeamSync-in/teamsync-backend-api/issues)
- Create a new issue with the `question` label
- Reach out to maintainers

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Hall of fame (for major contributors)

---

Thank you for contributing to TeamSync! 🎉
