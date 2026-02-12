# AI DevKit

**The standard for AI-assisted software development.**

AI DevKit is an open-source ecosystem designed to bridge the gap between human intent and AI execution. It provides a suite of tools that standardize how AI agents interact with codebases, manage context, and execute development workflows.

## Vision

The capabilities of AI coding agents are growing exponentially, but they often struggle with:

1.  **Context**: Losing track of broad project requirements and architectural decisions.
2.  **Consistency**: Generating code that doesn't follow project-specific patterns.
3.  **Process**: coding without a structured plan, leading to "spaghetti code".

**AI DevKit** solves this by enforcing a **Phase-Based Development** lifecycle—ensuring agents follow the same rigorous engineering
standards as senior developers: Requirements → Design → Planning → Implementation → Testing.

## Project Structure

This is a monorepo structured for AI-assisted development:

- **[packages/](./packages/)**: Shared assets and internal libraries.
  - [@ai-devkit/memory](./packages/memory): MCP-based long-term memory service for agents.
- **[project-management/](./project-management/)**: The brain of the development process.
  - [backlog.md](./project-management/backlog.md): Central list of ideas and ready tasks.
  - [tickets/](./project-management/tickets/): Active and completed development tasks with full phase documentation.
- **[web-applications/](./web-applications/)**: Core application code (API, Frontend, etc.). All new applications MUST be created or placed within this directory.
- **[skills/](./skills/)**: Custom AI instructions and domain-specific capabilities.
- **[docs/](./docs/)**: General project documentation.

## 🤝 Human Workflow: Adding Tasks

Humans should use the backlog to communicate requirements to AI agents.

### Adding to the Backlog

1. Open **[project-management/backlog.md](./project-management/backlog.md)**.
2. Add your idea or requirement under the **💡 Raw Ideas (Unscoped)** section.
3. Provide a brief description or link to external requirements.

Once an item is in the backlog, an AI agent can pick it up, scope it into a ticket (e.g., `T-XXX`), and move it to the **ROADMAP**.

## 🤖 AI Workflow: Phase-Based Development

AI agents follow a standardized workflow defined in **[AGENTS.md](./AGENTS.md)**:

1. **Requirements**: Problem definition and goal clarification.
2. **Design**: Architectural decisions and system design.
3. **Planning**: Technical task breakdown and implementation plan.
4. **Implementation**: Code execution and testing.
5. **Testing**: Verification and quality assurance.

Agents will request approval at major checkpoints (Plan/Design) before proceeding to code execution.

## Contributing

We welcome contributions! Whether you're building a new agent integration, adding a memory adapter, or improving our templates.

MIT
