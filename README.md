# AI Assisted Development

**Inspired by https://github.com/codeaholicguy/ai-devkit with enhanced project management capabilities.**

This project builds upon the foundation of AI DevKit, adding a comprehensive project management ticketing system to retain complete documentation and context throughout the development lifecycle. It maintains the core principles of standardizing how AI agents interact with codebases while providing structured documentation for every development phase.

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

## 🤝 Human Workflow: Strategic Orchestration

The human operator acts as the **Source of Truth** and **Project Manager**. Your primary role is to define the "Why" and "What", while the AI handles the "How".

For a detailed guide on how to manage backlogs, review plans, and verify features, please refer to the dedicated:

> [!TIP]
> **[HUMAN.md – The Human Operator's Manual](./HUMAN.md)**

### Quick Summary for Humans

| Action            | How to do it                                                                                            |
| :---------------- | :------------------------------------------------------------------------------------------------------ |
| **Align Vision**  | Update `vision.md`, `PRD.md`, and `epic_backlogs.md`.                                                   |
| **Add Features**  | Add a "Raw Idea" to **[backlog.md](./project-management/backlog.md)**.                                  |
| **Start Project** | Use the **[Architect Prompt](#🚀-starting-a-new-project)** below.                                       |
| **Resume Work**   | Place project in `web-applications/` and use the **[Resume Prompt](#-continuing-an-existing-project)**. |
| **Approve Plans** | Use the implementation plan checkpoint to verify the AI's approach.                                     |

---

### AI-Optimized Prompts

Use these prompts to ensure your AI agent has full context and follows the framework.

#### 🚀 Starting a New Project

_Use this in ChatGPT, Claude, or any AI assistant to initialize your project documents._

```markdown
I am using the AI-Assisted Development Framework (https://github.com/blueprinttradingfx-cpu/ai-assisted-development/) to build a new project.

Act as a Senior Solution Architect. Your goal is to help me define the project foundation by filling out `vision.md`, `PRD.md`, and `epic_backlogs.md`.

Please interview me to gather all necessary details. Ask questions one by one or in small logical groups covering:

1. The core vision and "Why" behind the project.
2. Target audience and key problems being solved.
3. High-level feature roadmap (MVP and beyond).
4. Technical constraints or preferences.

After the interview, output the content for all three files in a structured markdown format.
```

#### 🔄 Continuing an Existing Project

_Use this with your coding agent (Windsurf, Cursor, etc.) to resume work on this codebase._

> [!IMPORTANT]
> Ensure your project code is located in the `web-applications/` directory.

```markdown
I want to continue development on my project located in `web-applications/` directory using the AI-Assisted Development Framework patterns.

1. Read and analyze the existing project files: `vision.md`, `PRD.md`, and `epic_backlogs.md`.
2. Perform a "Gap Analysis": Compare the current codebase state with the goals defined in the project docs.
3. Ask me any clarifying questions needed to align your understanding with the project trajectory.
4. Propose the next logical tickets or tasks to be moved into the active roadmap.

The goal is to ensure the project docs remain the accurate Source of Truth.
```

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
