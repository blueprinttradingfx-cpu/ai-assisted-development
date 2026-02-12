# AI Coding Assistant Instructions for SLSA Digital Ecosystem

## Architecture Overview
This is a microservices-based ecosystem for Surf Life Saving Australia (SLSA), consisting of multiple Node.js/NestJS APIs, Vue/Quasar frontends, and legacy PHP systems. Services include authentication (SLS Hub), member management, surf guard applications, and admin portals.

- **APIs**: NestJS with TypeORM, custom repositories for complex queries
- **Frontends**: Vue.js/Quasar with Vite, Next.js for newer apps
- **Databases**: MSSQL (primary), MySQL (legacy), Redis for caching
- **Deployment**: Docker containers, Azure Pipelines (dev/qa/prod), manual QA/prod via VPN/SSH

## Key Patterns & Conventions
- **Custom Repositories**: Extend TypeORM repositories for business logic (e.g., `MembersCustomRepository`)
- **DTOs**: Use class-validator for request validation (e.g., `GetPendingMemberRequestsValidatorDto`)
- **Environment Config**: Copy `.env.example` to `.env`, update host variables from DevOps
- **Hosts File**: Add `127.0.0.1 api-layer.slsa.test surfguard.slsa.test` etc. for local dev
- **Migrations**: Run `npm run typeorm:apilayer:migrate` after DB setup
- **Seeding**: Use console commands like `npm run console apilayer:seed create:admin`
- **Linting**: ESLint with Prettier, run `npm run lint:fix` before commits (Husky pre-commit hook)
- **Testing**: Jest for unit tests, Cypress for E2E in frontend projects

## Development Workflow
1. `docker-compose up -d` to start services
2. Run `./setup.sh` or manual DB setup in containers
3. `npm run start:dev` for hot-reload (debug port 9229)
4. Access via local domains (e.g., `http://api-layer.slsa.test`)
5. For DB updates: Run migrations, seed data as needed
6. Deploy: PR to QA branch, monitor Azure builds; manual merge/deploy for QA/prod

## Integration Points
- **Auth**: Centralized via SLS Hub API (JWT tokens)
- **Cross-Service**: APIs call each other via HTTP (e.g., composite layer aggregates data)
- **External**: Azure Key Vault, Blob Storage, Email via Mailhog locally
- **Legacy**: Members Area (PHP/Laravel) integrates with new APIs

## Common Pitfalls
- Ensure Docker has 12GB+ RAM allocated
- Update hosts file for local domain resolution
- Use Git Bash on Windows for shell scripts
- Clear Jest cache if tests fail: `npm run clear_jest`
- For QA/prod: Connect VPN, SSH to servers, run migrations manually

Reference: [api-layer-be-1/src/slshub/v1/pending-member-requests/](api-layer-be-1/src/slshub/v1/pending-member-requests/) for service structure example.