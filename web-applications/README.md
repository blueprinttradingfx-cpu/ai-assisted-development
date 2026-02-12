# Web Applications

This directory contains the consolidated codebase for all web applications in the ecosystem. Each application serves a specific purpose and is organized in its own subdirectory.

## Applications Overview

### 📊 API Layer Backend (`api-layer-be-1/`)
- **Technology**: NestJS (Node.js/TypeScript)
- **Purpose**: Central API layer providing backend services for multiple applications
- **Key Features**:
  - RESTful API endpoints
  - Database integration with TypeORM
  - JWT authentication
  - Azure Key Vault integration
  - Email services with Nodemailer
  - File storage with Azure Blob Storage
  - Caching with Redis
  - Scheduled tasks
  - Swagger documentation

**Development Commands**:
```bash
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run test         # Run unit tests
npm run lint         # Code linting
```

### 🔐 SLS Hub Authentication Service (`sls-hub-api/`)
- **Technology**: NestJS (Node.js/TypeScript)
- **Purpose**: Centralized authentication service providing single sign-on (SSO) capabilities
- **Key Features**:
  - OAuth2 authentication
  - JWT token management
  - User management and profiles
  - Portal database integration
  - WebSocket support for real-time features
  - Azure integration for secure storage
  - Comprehensive API documentation

**Development Commands**:
```bash
npm run start:dev    # Development mode
npm run start:qa     # QA environment
npm run start:prod   # Production mode
npm run test         # Run tests
npm run migration:run # Run database migrations
```

### 🖥️ SLS Hub Frontend (`sls-hub-1/`)
- **Technology**: Quasar Framework (Vue 3 + TypeScript)
- **Purpose**: Frontend application for the SLS Hub authentication portal
- **Key Features**:
  - Vue 3 with Composition API
  - Pinia for state management
  - Quasar UI components
  - Google Maps integration
  - Chart.js for data visualization
  - PDF generation capabilities
  - Excel export functionality
  - NFC support
  - Real-time WebSocket connections

**Development Commands**:
```bash
npm run dev          # Development server
npm run build        # Production build
npm run test:e2e     # End-to-end tests
npm run lint         # Code linting
```

### 👥 Members Area (`members-area/`)
- **Technology**: Laravel (PHP) + Vue.js 2
- **Purpose**: Member management portal for SLSA organization
- **Key Features**:
  - Laravel backend with Blade templates
  - Vue.js 2 frontend components
  - MySQL database integration
  - Bootstrap UI framework
  - User authentication and authorization
  - Member profile management
  - Legacy JS support (Vue 1 components)
  - Docker containerization

**Development Setup**:
```bash
# Docker-based development
docker-compose up
./setup.sh
```

## Development Standards

### Code Quality
- **Linting**: ESLint for JavaScript/TypeScript, PSR2 for PHP
- **Formatting**: Prettier for frontend code
- **Testing**: Jest for Node.js applications, Cypress for E2E tests
- **Version Control**: Git with conventional commits

### Architecture Patterns
- **API Design**: RESTful principles with OpenAPI/Swagger documentation
- **Authentication**: JWT-based with OAuth2 flows
- **Database**: TypeORM for Node.js apps, Eloquent for Laravel
- **Frontend**: Component-based architecture with reactive state management

### Security Practices
- Azure Key Vault for secret management
- Environment-based configuration
- Input validation and sanitization
- CORS and security headers
- Regular dependency updates

## Getting Started

### Prerequisites
- Node.js 22+ (for Node.js applications)
- PHP 8+ (for Laravel application)
- Docker & Docker Compose (for containerized development)
- MySQL/PostgreSQL (database backends)
- Redis (caching layer)

### Development Workflow
1. Clone the specific application directory
2. Install dependencies (`npm install` or `composer install`)
3. Configure environment variables
4. Set up database connections
5. Run migrations (if applicable)
6. Start development server

### Environment Configuration
Each application has its own `.env` file for environment-specific settings:
- Database connections
- API keys and secrets
- Service endpoints
- Feature flags

## Deployment

### Environments
- **Development**: Local development with hot reload
- **QA**: Staging environment for testing
- **Production**: Live environment with optimized builds

### CI/CD Pipeline
- Automated testing on code commits
- Build and deployment automation
- Environment-specific configuration management
- Rollback capabilities

## Shared Resources

### Packages (`../packages/`)
Common utilities, components, and shared code used across applications.

### Skills (`../skills/`)
Development patterns, best practices, and reusable capabilities.

### Project Management (`../project-management/`)
Documentation, tickets, and project tracking information.

## Support

For application-specific issues:
- Check individual application README files
- Review project documentation in `project-management/`
- Consult the development team for architectural decisions

## Contributing

1. Follow the established code standards for each application
2. Write comprehensive tests for new features
3. Update documentation as needed
4. Use conventional commit messages
5. Ensure all tests pass before submitting changes
