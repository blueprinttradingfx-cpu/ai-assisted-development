# Project Management

This directory contains the project's ticket system, backlog, and templates for AI-assisted development.

## 🔄 Workflow for AI Agents

AI agents should follow the standardized, multi-phase development workflow defined in [AGENTS.md](file:///c:/www/AGENTS.md).

This workflow includes:

1. **Decision Matrix**: Choosing between Lean (Track A) or Full (Track B) tracks based on task complexity.
2. **Backlog Interaction**: Checking `backlog.md` for priorities.
3. **Ticket Initialization**: Creating ticket folders in `tickets/T-XXX/` and using templates from `ticket_templates/`.
4. **Phase-Based Execution**: Following the Requirements → Design → Planning → Execution lifecycle.
5. **Memory & Skills**: Utilizing the `memory` skill for persistent knowledge and `skills/` for domain-specific instructions.
6. **Approval & Completion**: Mandatory User checkpoints and status updates.

## 📂 Structure

- `backlog.md`: Raw ideas and ready-for-review tickets.
- `tickets/`: Folder for each ticket containing phase documentation.
- `ticket_templates/`: Templates for implementation plans, requirements, etc.
