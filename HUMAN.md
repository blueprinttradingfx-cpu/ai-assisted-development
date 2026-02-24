# 🧑‍💻 Human Workflow Guide

This guide is for the human operator managing the AI DevKit ecosystem. Your role is to act as the **Orchestrator** and **Source of Truth** for the project.

---

## 🔄 The Full Development Cycle

This framework follows a rigorous, document-driven lifecycle to ensure total alignment between your intent and the AI's execution.

### 1. Source of Truth (Foundation)

All strategic direction is housed in `project-management/project/`.

| File                   | Human's Job                                                                                                                  |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **`vision.md`**        | Keep the "North Star" clear. Define the values and ultimate success state.                                                   |
| **`PRD.md`**           | **PRD**: Product Requirements (Scope, Personas, and Roadmap). Define the boundaries of what is "In Scope" vs "Out of Scope". |
| **`FRD.md`**           | Define specific user interactions and persona-based capabilities.                                                            |
| **`epic_backlogs.md`** | Manage the breakdown of features. Ensure epics are logically structured.                                                     |
| **`backlog.md`**       | New unscoped ideas to refine into tickets.                                                                                   |

Choose if you are starting a new project or resuming work on an existing project.

## 🚀 Starting a New Project

To initialize a new project, upload the files from the Project Foundation Folder `project-management/project_template` use this prompt with an AI Architect e.g chatGPT, grok, Gemini or Claude:

```markdown
I am using the [AI-Assisted Development Framework](https://github.com/blueprinttradingfx-cpu/ai-assisted-development) to build a new project.

Act as a Senior Solution Architect. Your goal is to help me define the project foundation by filling out `vision.md`, `PRD.md`, `FRD.md`, and `epic_backlogs.md`.

Please interview me to gather all necessary details. Ask questions covering:

1. The core vision and "Why" behind the project.
2. Target audience and key problems being solved.
3. High-level feature roadmap (MVP and beyond).
4. Technical constraints or preferences.
```

Put this new files on `project-management/project/`.

---

### 2. Design Phase (Planning & Prep)

Before coding, define the visual and behavioral foundation of your project. This includes creating the "Design Bible" and generating high-fidelity mockups.

See **[design.md](./project-management/design/design.md)** for detailed instructions, AI prompts, and the Stitch workflow.

---

### 3. Ticket Generation (Alignment)

After the strategic planning and high-fidelity design phases are complete, we move to **Epic Scoping**. Instead of generating 100+ tickets at once, we focus on scoping the technical roadmap for a specific **Epic** (as defined in `epic_backlogs.md`).

**The Goal**: Iterate through ALL epics in `epic_backlogs.md` and generate their corresponding tickets BEFORE starting any feature implementation.

1. **Inform the AI**: Use this comprehensive prompt to ensure total alignment for the chosen Epic. **Repeat this for EACH epic in your backlog until the entire project is mapped out.**

   > **Prompt**: "I have completed the strategic planning and exported the final designs into `project-management/design/`.
   >
   > Your task is to **scope and generate all implementation tickets** (T-XXX to T-XXX) required to build the specific Epic: **[EPIC NAME]**.
   >
   > **Requirements for Scoping:**
   >
   > 1. **Alignment**: Every ticket's requirements MUST be anchored to the **Project Foundation** (Vision, PRD, FRD, Epic Backlog).
   > 2. **Design Fidelity**: Every ticket's design MUST follow the **Design Bible** (Sitemap, Style Guide, Interaction Guide, etc.) and reference the specific exported mockups in the design folder.
   > 3. **Traceability**: Each ticket's `design/README.md` MUST include a direct link to its corresponding exported mockup (e.g., `Reference Mockup: project-management/design/FeatureName/index.html`).
   > 4. **Structure**: Each ticket must follow the standard phase-based structure (Requirements -> Design -> Planning -> Implementation -> Testing).
   > 5. **Completeness**: Break down the entire Epic into manageable, sequential tickets.
   >
   > Do not start implementation yet. Focus exclusively on generating the full documentation for this Epic's tickets first."

2. **Scoping**: Review the AI's proposed ticket list. Ensure it covers the end-to-end user journey defined in the Sitemap.
3. **Validation & Iteration**: Check each ticket's `requirements/README.md` and `design/README.md`.
   - Ensure they reference the correct functional requirements from the FRD.
   - **CRITICAL**: Verify that each ticket contains a file path link to its relevant design mockup index.
   - **Iterate**: Once the current epic is fully scoped and validated, move to the next epic in `epic_backlogs.md` until the entire project is mapped.

4. **Execution Workflow**: Once the full set of tickets for **ALL epics** is validated and in the backlog, development begins: **Work on tickets one-by-one sequentially.** (Ask the AI agent to "start working on T-001" and wait for it to finish before moving to T-002).

### 4. Execution (Implementation & Testing)

The coding phase where the application comes to life.

- **One-by-One**: Work on tickets sequentially. ask the AI agent to "start working on T-001" and wait for it to finish before moving to T-002.
- **Manual Verification**: You must verify every feature against the ticket's success criteria.

---

## 🔄 Adopting the Framework (Existing Projects)

If you have an existing project (possibly already deployed) and want to adopt this AI-Assisted Development Framework for future scaling and maintenance, follow these steps. You do **not** need to redo the discovery interviews, but you must "anchor" the AI to your current codebase first.

### 1. Retrofit the Foundation

Manually fill out (or ask an AI to analyze the code and help you fill out) the files in `project-management/project/` based on your **existing app's current state**. This ensures the AI knows the "laws" of your project before it starts proposing changes.

### 2. Retrofit the Design Bible

Document your **existing UI patterns** in `project-management/design/` (using the design templates). This prevents the AI from introducing "design drift" when building new features.

### 3. Initialize the AI Workflow

Use this prompt with your AI Coding agent to align it with the codebase and start the structured implementation cycle:

```markdown
I am adopting the AI-Assisted Development Framework for this existing project in `web-applications/`.

1. **Analysis**: Read and analyze the current codebase and the foundation files in `project-management/project/` and `project-management/design/`.
2. **Gap Analysis**: Perform a comparison between the existing source code and the documented PRD/FRD.
3. **Workflow Shift**: Moving forward, we will use the **Epic Scoping** workflow for all new work.
4. **Backlog Refinement**: Propose the next logical features/tickets for the `backlog.md`.
5. **Alignment**: Ensure all new tickets are anchored to the existing codebase and the newly created PRD/FRD.
6. **Standards**: Interview me about the **Coding Standards** used in this project and help me generate specialized **Domain-Specific Rules** in `.agent/rules/`.
```

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

## 🚦 Handling Checkpoints (Decision Making)

The AI is instructed to stop and ask for your approval at major phases. **Never skip these.**

### 📑 Plan Approval (`implementation_plan.md`)

- **Look for**: Complexity, new dependencies, and "User Review Required" alerts.
- **Action**: Use the `/execute-plan` workflow if approved, or provide feedback.

### 📐 Design Approval

- **Look for**: Architectural changes that might impact the monorepo.
- **Action**: Ensure the design aligns with your `PRD.md`.

---

## 🧪 Verification & Feedback

When the AI says a task is `DONE`:

1. **Review the `walkthrough.md`**: Look at the logic and visual proofs.
2. **Manual Test**: Try the feature yourself in the `web-applications/` directory.
3. **Completion**: Update the `backlog.md` status to `✅ Verified`.

---

## 🚩 Rules for Success

- **Stay in `web-applications/`**: Always anchor your code here.
- **Guarding the Brain**: If the AI proposes a change that conflicts with the `vision.md`, reject it.
- **Be the Tie-Breaker**: You are the final authority on project decisions.

> [!TIP]
> **Domain-Specific Rules**: After setting up your project in `web-applications/`, ask the AI agent to: _"Create a project domain-level agent workflow and specialized rules in `.agent/rules/` based on the [Tech Stack] and best practices."_ This ensures the AI follows industry standards for your specific framework (e.g., Flutter, React, TDD).
