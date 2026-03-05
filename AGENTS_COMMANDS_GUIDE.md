# 🤖 AI Agent Command & Workflow Guide

This document defines the specialized "Human-to-AI" commands and discovery protocols supported by this project's **Three-Layer SDLC**. Future agents and users should refer to this guide to maintain architectural integrity.

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

- **Action**: The agent will follow the 7-step hardening sequence:
  1. **Integration**: Run `ci/pipeline.sh` to verify combined ticket logic.
  2. **Threat Modeling**: Fill out `project-management/epics/Epic-[X]/threat_model.md`.
  3. **API Contracts**: Finalize and lock `project-management/epics/Epic-[X]/api_contract.md`.
  4. **Database Synchronization & Seeding**: Perform a gap analysis between `database_mapping.md` and `supabase-export.md`. Update the mapping to reflect live reality, then run `seed_comprehensive_data.py` using live user discovery to ensure the environment is ready for testing.
  5. **E2E Journey**: Perform a full walkthrough of the user journey.
  6. **Versioning**: Prepare semantic versioning tags for the Epic release.
  7. **Code Quality Verification**: Execute `python packages/code-quality-checking/quality-check.py --mode epic`. All active applications must pass the "Epic" level gate (Linting, Formatting, Basic Complexity).
- **Goal**: Transition from "feature complete" to "enterprise ready."

## 🛑 PI Pre-Hardening Protocol (Test & Coverage Enforcement)

When an epic starts transitioning toward a PI Release, you MUST execute the **Pre-Hardening Testing Protocol** before starting the formal PI Hardening.

### "Initialize Pre-Hardening Testing for PI-[X]"

- **Action**: The agent will audit and generate the comprehensive application-level test suite.
  1. **Backend Verification**: MUST run the backend's designated testing framework with coverage mapped explicitly targeting all core service and API directories to ensure NO service is skipped. A minimum of **80-100% true coverage** must be reported.
  2. **Frontend Functional & Persona Mapping**: MUST transition away from basic line/component tests and implement full **Functional Integration Tests**. This includes running persona-driven testing flows matching the application's user journeys (e.g., Onboarding -> Decision Engine -> Core Features).
  3. **Epic-Level Reporting**: Auto-generate a test suite report summarizing the functional coverage **per epic**.
- **Goal**: Guarantee that both the backend logic and the frontend user journeys are bulletproof and explicitly mapped before deployment staging.

## 🚀 Project Initiative (PI) Release Protocol

When all Epics mapped to a PI are `status: HARDENED` and the **Pre-Hardening Protocol** has passed, trigger the PI Release Phase:

### "Hardening Protocol for Project Initiative [X]"

- **Action**: The agent validates the PI-level DOD checklist:
  1. **Create Task Artifact**: MUST create a `task.md` artifact with a full hardening checklist before any other work.
  2. **Cross-Epic Audit**: Ensure all Epics connect gracefully (no broken user flows).
  3. **Zero-Mock Audit**: Verify all providers use `AsyncNotifier` and real API/DB calls.
  4. **Testing Blitz**: Reach 100% BE unit test coverage and target full FE coverage.
  5. **Security Scan**: Comprehensive penetration check and dependency review.
  6. **Enterprise Quality Verification**: Execute `python packages/code-quality-checking/quality-check.py --mode pi`. Applications must pass the "PI" level gate, which includes Dead Code Detection (`vulture`), Dependency Audits (`pip-audit`), and Documentation Coverage (`pydocstyle`).
  7. **Release Notes**: Generate `PRODUCTION_RELEASE_NOTES.md`.
- **Mandatory Artifacts**: `task.md` (checklist), `implementation_plan_pi_[X]_hardening.md` (detailed plan).
- **Goal**: Final validation before production deployment.

### `start PI-[X] with epics [X-Y]`

- **Context**: Used to initialize a new Project Initiative (PI) manifest.
- **Action**: The agent validates the range of Epics, checks their current status, and generates `project-management/epics/PI-[X]_Manifest.md`.
- **DOD**: Initializes the PI-level checklist (Zero Mock, 100% Coverage, etc.) in the manifest.
- **Goal**: Group multiple hardened epics for a production milestone.

---

## 🛠️ SDLC Enforcement Commands

### "/uat-phase" (UAT Phase Analysis)

- **Context**: Used when entering the User Acceptance Testing (UAT) phase (post-PI hardening) or when resolving a batch of manual testing bugs.
- **Logic**: Reads the UAT Bug Fixes section from `project-management/backlog.md`, performs a retrospective on the fixed bugs, updates long-term memory in `ai_lessons.md`, and generates/updates formal AI rules (`.agent/rules/`) to prevent future occurrences.
- **Goal**: Create a continuous learning loop from human UAT testing to permanent AI rule improvements.

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

---

## ⚖️ The "No-Gap Policy" Rule

Agents are strictly prohibited from moving to a new Epic until the previous Epic's **Gap Analysis** is clear.

**Standard Checklist for "Done" Epics:**

- [ ] All tickets in the Epic folder are `status: done`.
- [ ] `enforce_workflow.sh` passes for the entire Epic tree.
- [ ] `threat_model.md` and `api_contract.md` are filled in for the Epic.
- [ ] No "Must-Have" features from `PRD.md` are unimplemented.
- [ ] **Database Mapping** updated and verified against live Supabase schema.
- [ ] **Quality Gate** passed (`quality-check.py --mode epic`).

---

## 🛡️ CI/CD Integration (GitHub Actions)

The project uses GitHub Actions to enforce the Two-Layer SDLC in the cloud.

### pipeline.yml & quality.yml

- **Trigger**: Every pull request and push to main, develop, or release/\*.
- **Enforcement**:
  1. **Quality Gate (`quality.yml`)**: Blocks on failed `quality-check.py` (PI Mode) execution.
  2. **Environment Guard**: Blocks if secrets (DATABASE_URL, etc.) are missing.
  3. **Workflow Guard**: Blocks if tickets/epics skip mandatory documentation.
  4. **Quality Guard**: Blocks on lint errors, test failures, or security vulnerabilities (TODO checks included).
- **Tech-Agnostic**: Uses detection logic in ci/setup_runner.sh to support any framework defined in ci/ci_config.sh.

### Local vs. Remote

- **Remote**: GitHub Actions acts as the final arbiter for merging.

---

## 🔄 Lifecycle & Maintenance (Retrofit & Migration)

For detailed strategies, refer to the **[Migration & Retrofit Guide](./migration_guide.md)**.

### `Retrofit existing project [Name]`

- **Scenario**: Adopting the framework for a project already in `web-applications/`.
- **Action**: The agent performs deep codebase analysis, helps draft the **Project Foundation** (Vision/PRD/FRD), creates **Legacy Epics**, and establishes a **PI-0 Manifest**.
- **Goal**: Bring legacy code under framework governance with a secure baseline.

### `Migrate project to Three-Layer SDLC`

- **Scenario**: Upgrading an older framework project (Tickets only) to the Epic/PI model.
- **Action**: The agent realigns ticket folders into Epic containers, generates `epic_metadata.json`, and performs a **Retroactive Gap Analysis** against the PRD.
- **Goal**: Formalize project structure for PI-level releases.
