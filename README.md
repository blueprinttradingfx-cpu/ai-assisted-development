# AI Assisted Development

**It's not a "1 prompt, wait 20 minutes, and voilà" tool — it's a rigorous, enterprise-grade development process.**

This starter kit evolves your idea through the full product lifecycle: you'll define requirements like a **Product Owner**, design the experience like an **Art Director**, manage tasks like a **Project Manager**, and ship a real product like a **CEO**. You'll experience the real-world software development process — from raw idea to corporate-standard application.

## 🤖 AI Agent Workflow (Two-Layer SDLC)

When an AI agent starts work, it **MUST** follow the standardized **Two-Layer Workflow** defined in **[AGENTS.md](./AGENTS.md)**:

- **Layer 1: Ticket-Level (Velocity)**: Fast iteration on `feature/*` branches. Requirements → Design → Implementation → Unit Testing → Local CI Validation.
- **Layer 2: Epic-Level (Hardening)**: Release gating on `epic/*` branches. Global CI Validation → Threat Modeling → API Contracts → E2E Testing → Versioning.

> [!TIP]
> **New to the project?** See the **[Agent Command Guide](./project-management/AGENTS_COMMANDS_GUIDE.md)** for a list of all supported natural language and slash commands.

> [!IMPORTANT]
> **Agents MUST NOT write production code without an approved Implementation Plan and MUST verify all changes with a passing CLI test output before completion.**

## 🏗️ Project Structure

- **[project-management/](./project-management/)**: The Source of Truth.
  - `project/`: Foundation files (Vision, PRD, FRD, Epic Backlog).
  - `design/`: The Design Bible (Sitemap, Style Guide, Interaction Specs).
  - `epics/`: Active Epics containing scoped tickets and release-level hardening documents.
- **[ci/](./ci/)**: Tech-agnostic CI/CD pipeline scripts (Lint, Test, Security, Enforce Workflow). Configure via `ci/ci_config.sh`.
- **[web-applications/](./web-applications/)**: Core application codebases.
- **[packages/](./packages/)**: Shared libraries and tools (including MCP memory).
- **[skills/](./skills/)**: Custom AI instructions and domain-specific capabilities.
- **[.agent/rules/](./.agent/rules/)**: Specialized behavioral guidelines (JS, TDD, Product Management, etc.) and best-practice instructions.

## 🤝 For Human Operators

If you are a human managing this project, please refer to the dedicated guide for initialization, curation, and verification:

> [!TIP]
> **[HUMAN.md – The Human Operator's Manual](./HUMAN.md)**

---

MIT | Inspired by [AI DevKit](https://github.com/codeaholicguy/ai-devkit)
