# 🧑‍💻 Human Workflow Guide

This guide is for the human operator managing the AI DevKit ecosystem. Your role is to act as the **Orchestrator** and **Source of Truth** for the project.

## 🧠 Your Core Responsibilities

As the human in the loop, you are responsible for the "Why" and the "What", while the AI handles the "How".

1.  **Guarding the Brain**: Maintaining the core source of truth files in `project-management/project/`.
2.  **Backlog Management**: Converting your ideas into structured "Raw Ideas" in the backlog.
3.  **Checkpoint Reviews**: Critically reviewing AI-generated designs and plans before execution.
4.  **Verification**: Validating that the implemented feature actually solves your problem.

---

## 🗺️ The Project Foundation

Always keep these three files aligned. If you change your mind about the project direction, update these FIRST.

| File                   | Human's Job                                                                        |
| :--------------------- | :--------------------------------------------------------------------------------- |
| **`vision.md`**        | Keep the "North Star" clear. Define the values and ultimate success state.         |
| **`PRD.md`**           | Update the roadmap. Define the boundaries of what is "In Scope" vs "Out of Scope". |
| **`epic_backlogs.md`** | Manage the breakdown of features. Ensure epics are logically structured.           |

---

## 💡 How to Feed the machine (The Backlog)

When you have a new idea, don't just tell the AI to "do it". Use the **[project-management/backlog.md](./project-management/backlog.md)**.

### 1. Add a Raw Idea

Add a bullet point under `## 💡 Raw Ideas (Unscoped)`.

> **Example**: "Add a dark mode toggle to the settings page. It should persist in localStorage."

### 2. The Discovery Phase

Ask your AI agent:

> "Analyze the new entries in the backlog. Pick the top priority and help me scope it into a ticket."

---

## 🚦 Handling Checkpoints

The AI is instructed to stop and ask for your approval at major phases:

### 📑 Plan Approval (`implementation_plan.md`)

- **Look for**: Complexity, new dependencies, and "User Review Required" alerts.
- **Action**: Say "Approved" or provide feedback to refine the approach.

### 📐 Design Approval

- **Look for**: Architectural changes that might impact other parts of the monorepo.
- **Action**: Ensure the design aligns with your `PRD.md`.

---

## 🧪 Verification & Feedback

When the AI says a task is `DONE`:

1.  **Review the `walkthrough.md`**: Look at the screenshots or terminal output.
2.  **Manual Test**: Try the feature yourself in the `web-applications/` directory.
3.  **Completion**: Update the `backlog.md` status to `✅ Verified`.

---

## 🚩 Rules for Success

- **Put projects in `web-applications/`**: Always initialize or move your application code here.
- **Never bypass the plan**: If the AI starts coding without a plan, stop it and ask for the `implementation_plan.md`.
- **Be the Tie-Breaker**: If two agents (or an agent and a skill) conflict, your decision is the law.
