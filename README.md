# AI Assisted Development

**A standardized framework for building aligned, well-documented applications with AI Agents.**

This project optimizes the partnership between Human Orcherstrators and AI Coding Agents by enforcing a **Phase-Based Development** lifecycle. It ensures that context is never lost, and architectural consistency is maintained throughout the life of the project.

## 🤖 AI Agent Workflow (MUST FOLLOW)

When an AI agent starts work, it **MUST** follow the standardized lifecycle defined in **[AGENTS.md](./AGENTS.md)**:

1.  **Requirements**: Deeply analyze the problem and document goals.
2.  **Design**: Make architectural decisions based on the project's permanent context.
3.  **Planning**: Create a detailed `implementation_plan.md`.
4.  **Implementation**: Execute code only AFTER the plan is approved.
5.  **Testing**: Verify results and document them in a `walkthrough.md`.

> [!IMPORTANT]
> **Agents MUST NOT write production code without an approved Implementation Plan.**

## 🏗️ Project Structure

- **[project-management/](./project-management/)**: The Source of Truth.
  - `project/`: Foundation files (Vision, PRD, FRD, Epic Backlog).
  - `design/`: The Design Bible (Sitemap, Style Guide, Interaction Specs).
  - `tickets/`: Active development tasks with full phase documentation.
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
