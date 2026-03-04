# 🤖 AI Agent Command & Workflow Guide

This document defines the specialized "Human-to-AI" commands and discovery protocols supported by this project's **Two-Layer SDLC**. Future agents and users should refer to this guide to maintain architectural integrity.

---

## 🔍 Discovery & Gap Analysis Commands

Use these natural language commands to trigger deep architectural audits.

### "Check implementation for Epic [X]"

- **Action**: The agent will run `/check-implementation` across all tickets within `project-management/epics/Epic-[X]/tickets/`.
- **Goal**: Compare the current code in `web-applications/` against the **Design Bible** and **Mockups**.
- **Output**: A report identifying visual or functional drift.

### "Audit Epic [X] against PRD"

- **Action**: The agent cross-references the `PRD.md` requirements for that specific Epic against the implemented tickets.
- **Goal**: Identify "Must-Haves" that were missed during scoping or implementation.
- **Protocol**: Follows the **No-Gap Policy** (blocked from starting next Epic if gaps exist).

### "/log"

- **Action**: Logs salient changes to `activity-log.md`.
- **Usage**: Use after completing any ticket or making a major architectural pivot.

## 🛡️ Epic Hardening Protocol

When all tickets for an Epic are marked `status: done`, transition to the Hardening Phase using these commands:

### "Start the Epic Hardening protocol for Epic [X]"

- **Action**: The agent will follow the 5-step hardening sequence:
  1. **Integration**: Run `ci/pipeline.sh` to verify combined ticket logic.
  2. **Threat Modeling**: Fill out `project-management/epics/Epic-[X]/threat_model.md`.
  3. **API Contracts**: Finalize and lock `project-management/epics/Epic-[X]/api_contract.md`.
  4. **E2E Journey**: Perform a full walkthrough of the user journey.
  5. **Versioning**: Prepare semantic versioning tags for the Epic release.
- **Goal**: Transition from "feature complete" to "enterprise ready."

---

## 🛠️ SDLC Enforcement Commands

### "/task" (Epic Scoping)

- **Context**: Used at the start of a new Epic.
- **Logic**: Reads `epic_backlogs.md`, clones the `epic_template`, and generates all required tickets into the nested folder structure.
- **Gating**: Initializes `metadata.json` for every ticket with `approved: false`.

### "/execute-plan" (Ticket Implementation)

- **Context**: Used when starting a specific ticket (e.g., T-001).
- **Hardening**: Automatically sources `ci/ci_config.sh` before running any shell commands to ensure tech-agnostic validation.

### "Run CI Pipeline"### `bash ci/pipeline.sh`

- **Action**: Runs the full local CI suite.
- **Includes**: Static analysis (linting), unit tests, workflow gating (metadata check), security baseline, and TODO/FIXME check.
- **Build**: By default, the build step is skipped for speed. Use `bash ci/pipeline.sh --build=true` to verify production builds.
- **Goal**: Hardened gate before any ticket is considered `[DONE]`.

### `bash ci/release_prep.sh project-management/epics/[EPIC-NAME]`

- **Action**: Seeds the Epic Hardening phase by generating a `RELEASE_NOTES.md` and suggesting version tags. 3. **Workflow Gating** (Blocks merge if `metadata.json` implementation/tests/approval is false) 4. **Security Scanning** (Vulnerability check) 5. **Env Validation** (Check config files)

---

## ⚖️ The "No-Gap Policy" Rule

Agents are strictly prohibited from moving to a new Epic until the previous Epic's **Gap Analysis** is clear.

**Standard Checklist for "Done" Epics:**

- [ ] All tickets in the Epic folder are `status: done`.
- [ ] `enforce_workflow.sh` passes for the entire Epic tree.
- [ ] `threat_model.md` and `api_contract.md` are filled in for the Epic.
- [ ] No "Must-Have" features from `PRD.md` are unimplemented.

---

> [!TIP]
> **Pro Tip for Humans**: If the AI feels "lost," simply say **"Perform a Gap Analysis on my current progress"** and it will anchor itself back to the PRD and the Epic tree.
