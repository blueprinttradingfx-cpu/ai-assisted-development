# AI DevKit Rules

## Project Context

This project uses ai-devkit for structured AI-assisted development. Phase documentation is located within each ticket folder in `project-management/tickets/T-XXX/`. The core codebase is consolidated under `web-applications/`, shared assets are in `packages/`, and custom AI instructions are in `skills/`.

## Documentation Structure

- `project-management/tickets/T-XXX/requirements/README.md` - Problem understanding and requirements
- `project-management/tickets/T-XXX/design/README.md` - System architecture and design decisions
- `project-management/tickets/T-XXX/planning/README.md` - Task breakdown and project planning
- `project-management/tickets/T-XXX/implementation/README.md` - Implementation guides and notes
- `project-management/tickets/T-XXX/testing/README.md` - Testing strategy and test cases
- `project-management/tickets/T-XXX/deployment/` - Deployment and infrastructure docs
- `project-management/tickets/T-XXX/monitoring/` - Monitoring and observability setup

## Code Style & Standards

- Follow the project's established code style and conventions
- Write clear, self-documenting code with meaningful variable names
- Add comments for complex logic or non-obvious decisions

## Development Workflow

Before starting, categorize the ticket to choose the most efficient **Workflow Track**:

### 📊 Decision Matrix

- **Track A (Lean)**: Bug fixes, minor UI tweaks, or single-file logic updates. (Touches < 3 files)
- **Track B (Full)**: New features, architectural changes, or complex refactors. (Touches >= 3 files or adds new tables/API endpoints)

### 🔄 Workflow Track A: Lean (Small/Medium)

1. **Initialize**: Create `tickets/T-XXX/` folder. Copy only `TEMPLATE-implementation_plan.md` to the root as `implementation_plan.md`.
2. **Plan**: Use headers in `implementation_plan.md` (Requirements, Design, Plan) to document the approach concisely.
3. **Execute**: Create `tasks.md` in the root and implement.
4. **Finalize**: Set `**Status**: [DONE]` and update `backlog.md`.

### 🔄 Workflow Track B: Full (Major Features)

1. **Initialize**: Create `tickets/T-XXX/` and all subfolders (`requirements/`, `design/`, etc.) from `ticket_templates/`.
2. **Phase-Based Execution**: Strictly follow the Requirements → Design → Planning → Implementation → Testing sequence, updating each folder's `README.md`.
3. **Approval**: Present the `implementation_plan.md` (summary) for explicit user approval at each major phase.
4. **Finalize**: Set `**Status**: [DONE]` and update `backlog.md`.

### 📝 Core Workflow Rules (Applies to All)

- **Read the Backlog**: Check `project-management/backlog.md` to understand current priorities.
- **Backlog Update**: Move/Link the item in `backlog.md` under **🔍 Ready for Review** when starting.
- **Approval**: **Wait for explicit approval** on plans/designs before code execution.
- **Completion**: update `backlog.md` to **✅ Verified** when confirmed.

## AI Interaction Guidelines

- When implementing features, first check relevant phase documentation
- For new features, start with requirements clarification
- Update phase docs when significant changes or decisions are made

## Skills (Extend Your Capabilities)

Skills are packaged capabilities that teach you new competencies, patterns, and best practices. Check for installed skills in the project's skill directory and use them to enhance your work.

### Using Installed Skills

1. **Check for skills**: Look for `SKILL.md` files in the project's skill directory
2. **Read skill instructions**: Each skill contains detailed guidance on when and how to use it
3. **Apply skill knowledge**: Follow the patterns, commands, and best practices defined in the skill

### Key Installed Skills

- **memory**: Use AI DevKit's memory service via CLI commands when MCP is unavailable. Read the skill for detailed `memory store` and `memory search` command usage.

### When to Reference Skills

- Before implementing features that match a skill's domain
- When MCP tools are unavailable but skill provides CLI alternatives
- To follow established patterns and conventions defined in skills

## Knowledge Memory (Always Use When Helpful)

The AI assistant should proactively use knowledge memory throughout all interactions.

> **Tip**: If MCP is unavailable, use the **memory skill** for detailed CLI command reference.

### When to Search Memory

- Before starting any task, search for relevant project conventions, patterns, or decisions
- When you need clarification on how something was done before
- To check for existing solutions to similar problems
- To understand project-specific terminology or standards

**How to search**:

- Use `memory.searchKnowledge` MCP tool with relevant keywords, tags, and scope
- If MCP tools are unavailable, use `npx ai-devkit memory search` CLI command (see memory skill for details)
- Example: Search for "authentication patterns" when implementing auth features

### When to Store Memory

- After making important architectural or design decisions
- When discovering useful patterns or solutions worth reusing
- If the user explicitly asks to "remember this" or save guidance
- When you establish new conventions or standards for the project

**How to store**:

- Use `memory.storeKnowledge` MCP tool
- If MCP tools are unavailable, use `npx ai-devkit memory store` CLI command (see memory skill for details)
- Include clear title, detailed content, relevant tags, and appropriate scope
- Make knowledge specific and actionable, not generic advice

### Memory Best Practices

- **Be Proactive**: Search memory before asking the user repetitive questions
- **Be Specific**: Store knowledge that's actionable and reusable
- **Use Tags**: Tag knowledge appropriately for easy discovery (e.g., "api", "testing", "architecture")
- **Scope Appropriately**: Use `global` for general patterns, `project:<name>` for project-specific knowledge

## Testing & Quality

- Write tests alongside implementation
- Follow the testing strategy defined in `project-management/tickets/T-XXX/testing/`
- Use `/writing-test` to generate unit and integration tests targeting 100% coverage
- Ensure code passes all tests before considering it complete

## Documentation

- Update phase documentation when requirements or design changes
- Keep inline code comments focused and relevant
- Document architectural decisions and their rationale
- Use mermaid diagrams for any architectural or data-flow visuals (update existing diagrams if needed)
- Record test coverage results and outstanding gaps in `project-management/tickets/T-XXX/testing/`

## Key Commands

When working on this project, you can run commands to:

- Understand project requirements and goals (`review-requirements`)
- Review architectural decisions (`review-design`)
- Plan and execute tasks (`execute-plan`)
- Verify implementation against design (`check-implementation`)
- Writing tests (`writing-test`)
- Perform structured code reviews (`code-review`)
- Log salient changes (`/log`)
- Product discovery (`/discover`)
- Task epic planning (`/task`)

## Activity Log Requirement

**Agents should maintain a high-level history of major changes in `activity-log.md`.**

- Use the `/log` command after completing significantly complex work or making architectural decisions.
- Keep entries concise and focused on "what" and "why".

## Progressive Discovery

**Agents should minimize context consumption by only reading relevant documentation.**

- Start with root `index.md` or `README.md`.
- Only drill into specialized subfolders (e.g., specific ticket folders or specialized rules) when the task requires it.

## Specialized Rules

Specialized rules are available in `.agent/rules/`:

- `javascript.md`: JS/TS best practices.
- `tdd.md`: Test-driven development discipline.
- `security.md`: JWT and timing-safe comparison guidance.
- `productmanager.md`: Product discovery and story mapping.
- `task-creator.md`: Systematic task planning and execution.
- `ui.md`: UI/UX and motion design principles.
- `user-testing.md`: Test generation from user journeys.
- `agent-orchestrator.md`: Coordination for complex tasks.
- `requirements.md`: Systematic requirements analysis.
