# Tita Chi: Commands & Prompts Master Index

This document serves as the official registry of all supported conversational prompts and executeable Slash-Commands (`/command`) within the Tita Chi Three-Layer SDLC framework. Using commands triggers predefined AI-agent workflows. Using prompts allows for conversational, ad-hoc guidance.

---

## 🏗️ 1. Project Initialization & Scoping

| Action                  | Slash Command        | Equivalent Conversational Prompt                                                                                       |
| :---------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Start New Project**   | `/init-project`      | "Act as a Senior Solution Architect. Help me define the project foundation by filling out vision.md, PRD.md..."        |
| **Epic Scoping**        | `/scope-epic [NAME]` | "I have completed the strategic planning... Your task is to scope and generate all implementation tickets for Epic..." |
| **Backlog Discovery**   | `/discover`          | "Analyze the new entries in the backlog. Pick the top priority and help me scope it into a ticket."                    |
| **Align Agent Context** | `/align-agent`       | "I am adopting the AI-Assisted Development Framework... Read and analyze current codebase..."                          |

---

## ⚡ 2. Execution & Feature Development

| Action                   | Slash Command           | Equivalent Conversational Prompt                                                                |
| :----------------------- | :---------------------- | :---------------------------------------------------------------------------------------------- |
| **Execute Ticket**       | `/execute-plan`         | "Start working on T-XXX according to the implementation plan."                                  |
| **Test Generation**      | `/writing-test`         | "Generate unit and functional tests for this feature targeting 80-100% coverage."               |
| **Code Review**          | `/code-review`          | "Review the active codebase against the design and interaction guide."                          |
| **Check Implementation** | `/check-implementation` | "Compare the current implementation with the design and requirements docs to ensure alignment." |
| **Log Changes**          | `/log`                  | "Log these salient architectural changes into `activity-log.md`."                               |

---

## 🛡️ 3. Verification & CI/CD Hardening

| Action                           | Slash Command    | Equivalent Conversational Prompt                                                            |
| :------------------------------- | :--------------- | :------------------------------------------------------------------------------------------ |
| **Layer 1: Ticket Verification** | `/verify-ticket` | "Run `bash ci/verify.sh` and score the ticket. Generate `verification_report.md`."          |
| **Layer 2: Epic Audit**          | `/audit-layer-1` | "Execute `python packages/code-quality-checking/quality-check.py --mode epic`."             |
| **Layer 2: Epic Hardening**      | `/harden-epic`   | "Start the Epic Hardening protocol for Epic [X]. Fill out threat models and API contracts." |
| **Layer 3: PI Pre-Hardening**    | `/pre-harden-pi` | "Initialize Pre-Hardening Testing for PI-[X]. Write tests for every single service..."      |
| **Layer 3: PI Manifest Setup**   | `/init-pi`       | "Start PI-[X] with Epics 0 through N."                                                      |
| **Layer 3: PI Hardening**        | `/harden-pi`     | "Hardening Protocol for Project Initiative [X]. Enforce the DOD Checklist."                 |
| **UAT Phase**                    | `/uat-phase`     | "Handle the UAT Testing Phase, bug fixing, and post-PI retrospectives."                     |

---

## 🔄 4. Migration & Retrofitting

| Action                     | Slash Command   | Equivalent Conversational Prompt                                                   |
| :------------------------- | :-------------- | :--------------------------------------------------------------------------------- |
| **Retrofit Legacy Code**   | `/retrofit`     | "Retrofit existing project [Name]. Run a gap analysis against a drafted PRD."      |
| **Migrate SDLC Structure** | `/migrate-sdlc` | "Migrate project to Three-Layer SDLC. Move existing tickets into Epic containers." |

---

## 🧠 5. Advanced Automation & Memory (Dominion Flow Features)

| Action                    | Slash Command | Equivalent Conversational Prompt                                                   |
| :------------------------ | :------------ | :--------------------------------------------------------------------------------- |
| **Autonomous Execution**  | `/autonomous` | "Execute all tickets in this Epic autonomously without checkpoints."               |
| **Systematic Debugging**  | `/debug`      | "Initiate state-tracing to hunt down this bug."                                    |
| **Knowledge Extraction**  | `/remember`   | "Extract the solution we just built into a reusable rule in `.agent/rules/`."      |
| **Failure Documentation** | `/reflect`    | "Analyze why the last approach failed and document the lesson in `ai_lessons.md`." |
| **Project Dashboard UI**  | `/dashboard`  | "Generate a visual dashboard overview of Epics, tickets, and release progress."    |

---

> **Note on Workflow Execution**: When a `/` command is triggered, the AI automatically loads the corresponding instruction set stored in `.agent/workflows/`. For example, typing `/scope-epic` forces the AI to execute the exact 8-step Epic Scoping protocol formally defined in the system.
