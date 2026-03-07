# AI Assisted Development Framework - Commands Index

> **Complete index of all framework commands with descriptions and examples**
> 
> This document serves as the single source of truth for all commands available in the framework.

---

## 📋 Command Quick Reference

| Command | Category | Purpose | When to Use |
|---------|----------|---------|-------------|
| `make install` | Setup | Install all framework dependencies | First-time setup |
| `make install-check` | Setup | Check prerequisites before installation | Pre-install verification |
| `make test` | Setup | Run framework health checks | Verify installation |
| `make start` | Setup | Start all framework services | Begin development |
| `make status` | Setup | Check service status | Diagnostics |
| `make stop` | Setup | Stop all framework services | End of session |
| `make clean` | Setup | Clean temporary files | Reset environment |
| `make help` | Setup | Show available commands | Help reference |
| `ai-engine run <ticket>` | Execution | Execute SDLC for a ticket | Running tickets |
| `ai-engine status <ticket>` | Status | Check ticket progress | Pre-execution |
| `ai-engine deps <ticket>` | Status | Show ticket dependencies | Dependency analysis |
| `ai-engine next` | Status | List ready tickets | Planning |
| `ai-engine context <ticket>` | Status | Generate AI context pack | Focused work |
| `ai-engine validate <ticket>` | Status | Run guards without advancing | Pre-flight check |
| `ai-engine index-repo [options]` | Repository | Index codebase for search | Initial setup |
| `ai-engine search <query>` | Repository | Search repository | Code discovery |
| `ai-engine symbols <name>` | Repository | Find symbols by name | Code navigation |
| `ai-engine dependents <symbol>` | Repository | Find symbol dependents | Impact analysis |
| `ai-engine embed [options]` | Repository | Generate embeddings | After indexing |
| `ai-engine stats` | Repository | Show repository stats | Understanding scope |
| `ai-engine repo-research` | Repository | Deep research on ticket | Context gathering |
| `ai-engine overview` | Repository | Project overview | Onboarding |
| `ai-engine session start [options]` | Session | Create new session | New development session |
| `ai-engine session list [options]` | Session | List recent sessions | Finding session |
| `ai-engine session stats` | Session | Show session statistics | Review activity |
| `ai-engine session current` | Session | Show active session | Confirmation |
| `ai-engine session use <sessionId>` | Session | Switch session | Resuming work |
| `ai-engine research <ticketId>` | Agent | Run researcher agent | Discovery phase |
| `ai-engine plan <ticketId>` | Agent | Run planner agent | Design phase |
| `ai-engine execute <ticketId>` | Agent | Run executor agent | Implementation |
| `ai-engine verify <ticketId>` | Agent | Run verifier agent | Validation |
| `ai-engine agent-status <ticketId>` | Agent | Check agent status | Monitoring |
| `ai-engine agents` | Agent | List available agents | Understanding system |
| `ai-engine framework-test` | Framework | Run health checks | Troubleshooting |
| `ai-engine project-init [options]` | Framework | Initialize project | Setup |
| `ai-engine framework-start` | Framework | Start services | Alternative start |
| `ai-engine insights [options]` | Framework | Show learning metrics | Retrospectives |
| `/scope-epic` | Agent | Create epic tickets | Epic breakdown |
| `/review-requirements` | Agent | Validate requirements | Requirements phase |
| `/review-design` | Agent | Review design docs | Design phase |
| `/execute-plan` | Agent | Execute via agent | Implementation |
| `/writing-test` | Agent | Generate tests | Testing |
| `/check-implementation` | Agent | Validate vs design | Quality check |
| `/update-planning` | Agent | Reconcile planning | Planning sync |
| `/code-review` | Agent | Conduct code review | Quality |
| `/capture-knowledge` | Agent | Document insights | Knowledge capture |
| `/frontend-test-suite` | Agent | Frontend testing | Frontend work |
| `/backend-test-suite` | Agent | Backend testing | Backend work |
| `/autonomous` | Agent | Execute automatically | Well-scoped epics |
| `/verify-ticket` | Agent | Verify ticket | Quality check |
| `/debug` | Agent | Debug issues | Bug fixing |
| `/discover` | Agent | Discover patterns | Exploration |
| `/review` | Agent | Quick review | Code review |
| `/handoff` | Agent | Save session state | End of session |
| `/resume` | Agent | Restore session state | Continue work |
| `bash ci/verify.sh` | Quality | Layer 1 verification | Post-implementation |
| `bash ci/verify.sh --layer2` | Quality | Layer 2 verification | Epic hardening |
| `bash ci/verify.sh --layer3` | Quality | Layer 3 verification | Production |
| `ci/pipeline.sh` | Quality | CI pipeline | Pre-commit |
| `python packages/code-quality-checking/quality-check.py --mode epic` | Quality | Code quality check | Epic gate |
| `/log` | Agent | Log changes to activity log | After major changes |
| `/init-project` | Agent | Bootstrap new project | New project setup |
| `/align-agent` | Agent | Sync AI with project state | New AI session |
| `/uat-phase` | Agent | UAT phase analysis | Post-PI testing |
| `/autonomous` | Agent | Execute automatically | Well-scoped epics |
| `/debug` | Agent | Debug issues | Bug fixing |
| `/reflect` | Agent | Document failures | After mistakes |
| `/remember` | Agent | Save patterns | Knowledge capture |
| `/dashboard` | Agent | Generate project dashboard | Project overview |
| `"Check implementation for Epic [X]"` | Agent | Check Epic implementation | Validation |
| `"Audit Epic [X] against PRD"` | Agent | Audit Epic vs PRD | Gap analysis |
| `"Start the Epic Hardening protocol for Epic [X]"` | Agent | Epic hardening sequence | Epic completion |
| `"Initialize Pre-Hardening Testing for PI-[X]"` | Agent | Pre-hardening testing | PI preparation |
| `"Hardening Protocol for Project Initiative [X]"` | Agent | PI hardening protocol | Production release |
| `start PI-[X] with epics [X-Y]` | Agent | Initialize PI manifest | New PI |
| `"Run AI SDLC Engine"` | Agent | Autonomous ticket execution | Full SDLC |
| `"Check Ticket Status"` | Agent | Check ticket readiness | Pre-execution |
| `"Show Dependency Tree"` | Agent | Show ticket dependencies | Planning |
| `"List Ready Tickets"` | Agent | List executable tickets | Sprint planning |
| `"Generate AI Context"` | Agent | Generate ticket context | Pre-implementation |
| `"Validate Ticket Scope"` | Agent | Validate ticket scope | Post-implementation |
| `"Show Learning Insights"` | Agent | Show learning metrics | Retrospectives |
| `"Retrofit existing project [Name]"` | Agent | Adopt framework for legacy | Legacy adoption |
| `"Migrate project to Three-Layer SDLC"` | Agent | Upgrade project structure | Framework migration |

---

## 🏗️ 1. Framework Lifecycle Commands (Makefile)

### `make install`

**Purpose**: Install all framework dependencies and tools.

**When to use**: First-time setup after cloning the repository.

**What it does**:
1. Checks prerequisites (Node.js, npm, Python, Docker)
2. Installs Node.js dependencies for engine and packages
3. Installs Python tools from requirements.txt
4. Starts Qdrant Docker container
5. Checks Ollama installation and pulls nomic-embed-text model
6. Runs post-install health checks

**Example**:
```bash
make install
```

---

### `make install-check`

**Purpose**: Check prerequisites before installation.

**When to use**: Before running `make install` to ensure system readiness.

**What it does**:
1. Checks Node.js installation and version
2. Checks npm installation
3. Checks Python installation
4. Checks Docker installation (optional but recommended)
5. Reports any missing prerequisites

**Example**:
```bash
make install-check
```

---

### `make test`

**Purpose**: Execute framework health checks on Engine, Memory, Qdrant, Ollama, and SQLite.

**When to use**: After installation or when diagnosing issues.

**What it does**:
1. Checks Engine package status
2. Checks Memory package status
3. Verifies Qdrant connection on localhost:6333
4. Generates framework-health.json report
5. Reports overall status (healthy/degraded/unhealthy)

**Example**:
```bash
make test
```

---

### `make start`

**Purpose**: Start all required services (Qdrant, Ollama) and initialize health check flags.

**When to use**: Beginning of each development session.

**What it does**:
1. Starts Qdrant Docker container (if not running)
2. Checks Ollama status
3. Updates .agent/flags/last-status-check.txt
4. Shows service status

**Example**:
```bash
make start
```

---

### `make status`

**Purpose**: Check if all framework services are running and healthy.

**When to use**: Diagnostics or before starting work.

**What it does**:
1. Checks if Qdrant is running
2. Checks if Ollama is running
3. Verifies Engine installation
4. Verifies Memory package installation
5. Logs timestamp to .agent/flags/last-status-check.txt

**Example**:
```bash
make status
```

---

### `make stop`

**Purpose**: Stop all framework services and containers.

**When to use**: End of development session or maintenance.

**What it does**:
1. Stops Qdrant Docker container
2. Reports status

**Example**:
```bash
make stop
```

---

### `make clean`

**Purpose**: Remove all generated data, indexes, and reset framework state.

**When to use**: Resetting environment or troubleshooting.

**What it does**:
1. Removes framework-health.json
2. Removes .context/*.md files
3. Removes node_modules directories

**Example**:
```bash
make clean
```

---

### `make help`

**Purpose**: Display available Makefile targets with descriptions.

**When to use**: Learning available commands.

**What it does**:
1. Displays categorized list of make targets
2. Shows descriptions for each target

**Example**:
```bash
make help
```

---

## 🎫 2. Ticket Workflow Commands (ai-engine)

### `ai-engine run <ticketId>`

**Purpose**: Execute the SDLC engine for a specific ticket (e.g., T-123).

**When to use**: Executing a ticket through the development lifecycle.

**What it does**:
1. Loads ticket metadata
2. Advances ticket through phases (research → design → implement → validate → done)
3. Runs File Guard and Architecture Guard
4. Updates ticket status

**Example**:
```bash
ai-engine run T-042
```

---

### `ai-engine status <ticketId>`

**Purpose**: Show current status, phase, dependencies, and blockers for a ticket.

**When to use**: Checking if ticket is ready to execute or diagnosing blockers.

**What it does**:
1. Displays ticket title, status, phase, type
2. Shows dependencies and execution readiness
3. Lists any blockers
4. Shows failure count if any

**Example**:
```bash
ai-engine status T-042
```

---

### `ai-engine deps <ticketId>`

**Purpose**: Display dependency tree and analyze if ticket can be executed.

**When to use**: Understanding ticket relationships and blockers.

**What it does**:
1. Builds dependency graph
2. Displays tree structure
3. Identifies blocked tickets

**Example**:
```bash
ai-engine deps T-042
```

---

### `ai-engine next`

**Purpose**: List all tickets ready for execution based on dependency resolution.

**When to use**: Finding what to work on next.

**What it does**:
1. Builds dependency graph
2. Identifies tickets with all dependencies met
3. Lists ready tickets with titles

**Example**:
```bash
ai-engine next
```

---

### `ai-engine context <ticketId>`

**Purpose**: Generate AI context pack for focused ticket work.

**When to use**: Preparing focused context for AI work.

**What it does**:
1. Gathers ticket requirements
2. Collects relevant code files
3. Includes PRD references
4. Generates .context/T-XXX.md file

**Example**:
```bash
ai-engine context T-042
```

---

### `ai-engine validate <ticketId>`

**Purpose**: Run all guards (File Guard, Architecture Guard) without advancing ticket.

**When to use**: Pre-flight check before execution or debugging.

**What it does**:
1. Runs File Guard to check scope violations
2. Runs Architecture Guard to check imports
3. Reports violations without changing status

**Example**:
```bash
ai-engine validate T-042
```

---

## 🔍 3. Repository Intelligence Commands (ai-engine)

### `ai-engine index-repo [options]`

**Purpose**: Index repository for intelligent search with options: --path, --watch, --reset, --parallel, --workers.

**When to use**: Initial setup or when codebase changes significantly.

**What it does**:
1. Parses code files (TS, TSX, JS, JSX, Python, Dart)
2. Generates embeddings via Ollama
3. Stores vectors in Qdrant
4. Creates search index

**Options**:
- `--path <path>`: Repository path (default: ./web-applications)
- `--watch`: Watch for changes and auto-reindex
- `--reset`: Reset index before indexing
- `--parallel`: Use parallel processing
- `--workers <number>`: Number of parallel workers

**Example**:
```bash
ai-engine index-repo --parallel
```

---

### `ai-engine search <query>`

**Purpose**: Search repository by meaning or keyword with semantic/keyword/hybrid modes.

**When to use**: Finding code related to a concept or feature.

**What it does**:
1. Performs semantic/keyword/hybrid search
2. Returns relevant code chunks
3. Shows relevance scores

**Options**:
- `-t, --type <type>`: Search type (semantic, keyword, hybrid)
- `-l, --limit <limit>`: Number of results
- `-s, --threshold <threshold>`: Similarity threshold

**Example**:
```bash
ai-engine search "payment processing"
```

---

### `ai-engine symbols <name>`

**Purpose**: Find functions, classes, methods by name across the codebase.

**When to use**: Finding specific functions or classes by name.

**What it does**:
1. Searches symbol database
2. Returns matching symbols
3. Shows type, location, signature

**Example**:
```bash
ai-engine symbols "processPayment"
```

---

### `ai-engine dependents <symbol>`

**Purpose**: Locate all files that import or depend on a specific symbol.

**When to use**: Impact analysis before refactoring.

**What it does**:
1. Analyzes import graph
2. Finds all files importing the symbol
3. Lists dependent files

**Example**:
```bash
ai-engine dependents "processPayment"
```

---

### `ai-engine embed [options]`

**Purpose**: Create vector embeddings for code chunks with --force and --batch options.

**When to use**: After indexing or when embeddings are stale.

**What it does**:
1. Generates vector embeddings via Ollama
2. Stores in Qdrant
3. Caches results locally

**Options**:
- `-f, --force`: Force re-generation
- `-b, --batch <size>`: Batch size

**Example**:
```bash
ai-engine embed
```

---

### `ai-engine stats`

**Purpose**: Show repository intelligence statistics (files, symbols, vectors, cache).

**When to use**: Understanding codebase scope.

**What it does**:
1. Counts files, symbols, imports, chunks
2. Reports vector counts
3. Shows cache statistics

**Example**:
```bash
ai-engine stats
```

---

### `ai-engine repo-research <ticketOrQuery>`

**Purpose**: Deep research on ticket or query using Repository Intelligence.

**When to use**: Gathering comprehensive context.

**What it does**:
1. Searches for relevant files
2. Analyzes similar implementations
3. Suggests skills and approaches

**Example**:
```bash
ai-engine repo-research T-042
```

---

### `ai-engine overview`

**Purpose**: Get high-level project overview with Repository Intelligence insights.

**When to use**: Onboarding or understanding project structure.

**What it does**:
1. Analyzes project structure
2. Identifies key components
3. Maps architectural patterns

**Example**:
```bash
ai-engine overview
```

---

## 🔄 4. Session Management Commands (ai-engine)

### `ai-engine session start [options]`

**Purpose**: Create a new session for the current project with optional --name.

**When to use**: Beginning of a new development session.

**What it does**:
1. Creates session in SQLite database
2. Generates unique session ID
3. Outputs AI_SESSION_ID for environment variable

**Options**:
- `-n, --name <name>`: Session name

**Example**:
```bash
ai-engine session start
```

---

### `ai-engine session list [options]`

**Purpose**: Show recent sessions with --limit for number of results.

**When to use**: Finding previous sessions.

**What it does**:
1. Queries session database
2. Displays ID, project, queries, last activity

**Options**:
- `-n, --limit <number>`: Number to show

**Example**:
```bash
ai-engine session list
```

---

### `ai-engine session stats <sessionId>`

**Purpose**: Display statistics for the current or specified session.

**When to use**: Reviewing session activity.

**What it does**:
1. Loads session data
2. Shows query count
3. Displays learned patterns

**Example**:
```bash
ai-engine session stats abc123
```

---

### `ai-engine session current`

**Purpose**: Show details of the currently active session.

**When to use**: Confirming active session.

**What it does**:
1. Checks AI_SESSION_ID env var
2. Loads session data
3. Displays details

**Example**:
```bash
ai-engine session current
```

---

### `ai-engine session use <sessionId>`

**Purpose**: Switch to a different session for context continuity.

**When to use**: Resuming work on a different session.

**What it does**:
1. Verifies session exists
2. Displays session details
3. Prompts to set AI_SESSION_ID

**Example**:
```bash
ai-engine session use abc123
```

---

## 🤖 5. Agent System Commands (ai-engine)

### `ai-engine research <ticketId>`

**Purpose**: Run researcher agent to discover patterns and map codebase.

**When to use**: Discovery phase before planning.

**What it does**:
1. Reads ticket metadata and PRD
2. Searches skills library
3. Maps codebase
4. Writes RESEARCH.md

**Example**:
```bash
ai-engine research T-042
```

---

### `ai-engine plan <ticketId>`

**Purpose**: Run planner agent to create detailed BLUEPRINT.md implementation plan.

**When to use**: Design phase of ticket.

**What it does**:
1. Reads RESEARCH.md and PRD
2. Creates implementation plan
3. Writes BLUEPRINT.md

**Example**:
```bash
ai-engine plan T-042
```

---

### `ai-engine execute <ticketId>`

**Purpose**: Run executor agent to implement code according to BLUEPRINT.

**When to use**: Implementation phase.

**What it does**:
1. Reads BLUEPRINT.md
2. Implements code changes
3. Enforces guards
4. Writes RECORD.md

**Example**:
```bash
ai-engine execute T-042
```

---

### `ai-engine verify <ticketId>`

**Purpose**: Run verifier agent to validate implementation against requirements.

**When to use**: Validation phase.

**What it does**:
1. Reads BLUEPRINT.md and RECORD.md
2. Examines implementation
3. Runs 70-point validation
4. Produces VERIFICATION.md

**Example**:
```bash
ai-engine verify T-042
```

---

### `ai-engine agent-status <ticketId>`

**Purpose**: Show execution status of all agents (Researcher, Planner, Executor, Verifier).

**When to use**: Monitoring pipeline progress.

**What it does**:
1. Checks for agent output files
2. Reports completion status
3. Shows overall progress

**Example**:
```bash
ai-engine agent-status T-042
```

---

### `ai-engine agents`

**Purpose**: Display available agents, their purposes, and usage flow.

**When to use**: Understanding the agent system.

**What it does**:
1. Displays all agents
2. Shows command, purpose, input, output
3. Displays usage flow

**Example**:
```bash
ai-engine agents
```

---

## 🔧 6. Framework Management Commands (ai-engine)

### `ai-engine framework-test`

**Purpose**: Run comprehensive health checks on all framework components.

**When to use**: Troubleshooting or periodic checks.

**What it does**:
1. Checks Engine component
2. Checks Memory package
3. Verifies Qdrant connection
4. Checks Ollama status
5. Generates health report

**Example**:
```bash
ai-engine framework-test
```

---

### `ai-engine project-init [options]`

**Purpose**: Initialize new, continue, or migrate project with --type flag.

**When to use**: Project setup or migration.

**What it does**:
1. Prompts for project name and path
2. Creates project structure
3. Generates tech_stack.json

**Options**:
- `--type <type>`: new, continue, migrate

**Example**:
```bash
ai-engine project-init --type new
```

---

### `ai-engine framework-start`

**Purpose**: Start framework services and verify health status.

**When to use**: Alternative to `make start`.

**What it does**:
1. Checks and starts Qdrant
2. Checks Ollama status
3. Initializes health monitoring

**Example**:
```bash
ai-engine framework-start
```

---

### `ai-engine insights [options]`

**Purpose**: Display learning insights and metrics with optional --export to JSON.

**When to use**: Retrospectives or process improvement.

**What it does**:
1. Analyzes session data
2. Generates insights
3. Shows metrics

**Options**:
- `--export <path>`: Export to JSON

**Example**:
```bash
ai-engine insights
```

---

## 🎯 7. Agent Slash Commands (Workflow Triggers)

### `/scope-epic`

**Purpose**: Create and scaffold tickets for a new epic (planning phase only).

**When to use**: Breaking down epics into tickets.

**What it does**:
1. Reads epic_backlogs.md
2. Analyzes PRD requirements
3. Creates epic folder structure
4. Generates tickets

**Example**:
```
/scope-epic user-authentication
```

---

### `/review-requirements`

**Purpose**: Validate requirements document for completeness and clarity.

**When to use**: After drafting requirements.

**What it does**:
1. Reviews PRD.md
2. Checks for gaps
3. Validates clarity

**Example**:
```
/review-requirements
```

---

### `/review-design`

**Purpose**: Ensure design doc aligns with requirements and highlights decisions.

**When to use**: After drafting design.

**What it does**:
1. Reviews design documents
2. Compares with PRD
3. Identifies decisions

**Example**:
```
/review-design
```

---

### `/execute-plan`

**Purpose**: Work through planning doc tasks interactively for implementation.

**When to use**: Manual execution with full pipeline.

**What it does**: Runs research → plan → execute → verify

**Example**:
```
/execute-plan T-042
```

---

### `/writing-test`

**Purpose**: Produce unit/integration tests targeting 80-100% coverage.

**When to use**: After implementation or adding missing tests.

**What it does**:
1. Analyzes code to test
2. Generates unit tests
3. Generates integration tests

**Example**:
```
/writing-test T-042
```

---

### `/check-implementation`

**Purpose**: Validate changes against design docs and requirements.

**When to use**: Before marking epic complete.

**What it does**:
1. Compares code vs design
2. Identifies gaps
3. Flags drift

**Example**:
```
/check-implementation Epic-001
```

---

### `/update-planning`

**Purpose**: Reconcile planning doc with latest implementation status.

**When to use**: When implementation diverges from plan.

**What it does**:
1. Reviews current status
2. Updates planning.md
3. Syncs with reality

**Example**:
```
/update-planning
```

---

### `/code-review`

**Purpose**: Conduct structured code review with file list and docs.

**When to use**: Pre-push or regular maintenance.

**What it does**:
1. Reads design docs
2. Reviews code
3. Generates report

**Example**:
```
/code-review
```

---

### `/capture-knowledge`

**Purpose**: Document key insights and patterns discovered during work.

**When to use**: After discovering useful patterns.

**What it does**:
1. Captures insights
2. Documents patterns
3. Saves to knowledge base

**Example**:
```
/capture-knowledge
```

---

### `/frontend-test-suite`

**Purpose**: Run comprehensive frontend testing workflow.

**When to use**: Wrapping up frontend feature.

**What it does**:
1. Generates component tests
2. Generates integration tests
3. Targets 80-100% coverage

**Example**:
```
/frontend-test-suite
```

---

### `/backend-test-suite`

**Purpose**: Run comprehensive backend API testing workflow.

**When to use**: Wrapping up backend feature.

**What it does**:
1. Generates unit tests
2. Generates API tests
3. Targets 80-100% coverage

**Example**:
```
/backend-test-suite
```

---

### `/autonomous`

**Purpose**: Execute complete pipeline automatically for all tickets.

**When to use**: Well-scoped, low-risk epics.

**What it does**:
1. Loops through tickets
2. Auto-researches
3. Auto-plans
4. Auto-implements
5. Auto-verifies

**Example**:
```
/autonomous epic-001
```

---

### `/verify-ticket`

**Purpose**: Run verification pipeline on completed ticket.

**When to use**: Quality check via Verifier Agent.

**What it does**:
1. Activates Verifier Agent
2. Runs 70-point validation
3. Produces VERIFICATION.md

**Example**:
```
/verify-ticket T-042
```

---

### `/debug`

**Purpose**: Enter debug loop to fix issues when verification fails.

**When to use**: When tests fail or bugs found.

**What it does**:
1. Clarifies issue
2. Reproduces problem
3. Hypothesizes causes
4. Isolates root cause
5. Plans fix
6. Validates solution

**Example**:
```
/debug
```

---

### `/discover`

**Purpose**: Researcher agent discovers patterns in new codebase area.

**When to use**: Exploring new codebase area.

**What it does**:
1. Maps codebase
2. Finds patterns
3. Suggests skills

**Example**:
```
/discover
```

---

### `/review`

**Purpose**: Structured code review following framework standards.

**When to use**: Quick review.

**What it does**:
1. Reviews code
2. Checks standards
3. Reports issues

**Example**:
```
/review
```

---

### `/handoff`

**Purpose**: Save current session state for context continuity.

**When to use**: End of session.

**What it does**:
1. Captures context
2. Writes ACTIVE_SESSION.md
3. Records blockers

**Example**:
```
/handoff
```

---

### `/resume`

**Purpose**: Restore context from last handoff and continue work.

**When to use**: Starting after handoff.

**What it does**:
1. Reads ACTIVE_SESSION.md
2. Restores context
3. Continues work

**Example**:
```
/resume
```

---

## ✅ 8. Quality Gate Commands

### `bash ci/verify.sh`

**Purpose**: Run Layer 1 verification (Developer Velocity, ≥56/70 threshold).

**When to use**: Post-implementation quality check.

**What it does**:
1. Runs 70-point validation
2. Checks code quality, tests, architecture
3. Reports score (must be ≥56/70)

**Example**:
```bash
bash ci/verify.sh
```

---

### `bash ci/verify.sh --layer2`

**Purpose**: Run Layer 2 verification (Epic Hardening, ≥63/70 threshold).

**When to use**: Epic completion.

**What it does**:
1. Runs Layer 1 checks
2. Adds epic-level validations
3. Reports score (must be ≥63/70)

**Example**:
```bash
bash ci/verify.sh --layer2
```

---

### `bash ci/verify.sh --layer3`

**Purpose**: Run Layer 3 verification (Production Readiness, 70/70 threshold).

**When to use**: Production release.

**What it does**:
1. Runs all checks
2. Enterprise quality verification
3. Reports score (must be 70/70)

**Example**:
```bash
bash ci/verify.sh --layer3
```

---

### `ci/pipeline.sh`

**Purpose**: Execute full CI pipeline for integration testing.

**When to use**: Pre-commit or epic hardening.

**What it does**:
1. Runs quality_check.sh
2. Runs todo_check.sh
3. Runs env_validation.sh

**Options**:
- `--build=true`: Enable build verification

**Example**:
```bash
ci/pipeline.sh
```

---

### `python packages/code-quality-checking/quality-check.py --mode epic`

**Purpose**: Run code quality verification for Epic-level gate.

**When to use**: Epic hardening.

**What it does**:
1. Checks code quality
2. Verifies linting
3. Checks complexity

**Example**:
```bash
python packages/code-quality-checking/quality-check.py --mode epic
```

---

## 🎯 9. Discovery & Analysis Commands

### `Check implementation for Epic [X]`

**Purpose**: Check Epic implementation against Design Bible and Mockups.

**When to use**: Validating Epic completion or identifying drift.

**What it does**:
1. Runs `/check-implementation` across all tickets in Epic
2. Compares code in `web-applications/` against design docs
3. Identifies visual or functional drift
4. Generates report with findings

**Example**:
```
Check implementation for Epic-001
```

---

### `Audit Epic [X] against PRD`

**Purpose**: Cross-reference Epic implementation against PRD requirements.

**When to use**: Ensuring no "Must-Haves" were missed.

**What it does**:
1. Reads PRD.md requirements for Epic
2. Cross-references against implemented tickets
3. Identifies missed requirements
4. Follows No-Gap Policy

**Example**:
```
Audit Epic-001 against PRD
```

---

### `/log`

**Purpose**: Log salient changes to activity-log.md.

**When to use**: After completing tickets or major architectural changes.

**What it does**:
1. Captures changes made
2. Records rationale
3. Updates activity-log.md
4. Links to relevant tickets

**Example**:
```
/log
```

---

### `/init-project`

**Purpose**: Bootstrap new AI Assisted Development Framework project.

**When to use**: Starting completely new project.

**What it does**:
1. Generates vision.md, PRD.md, FRD.md templates
2. Fills templates based on user prompt
3. Creates project-management structure
4. Sets up initial configuration

**Example**:
```
/init-project
```

---

### `/align-agent`

**Purpose**: Sync new AI session with existing project state.

**When to use**: Starting new AI session on existing project.

**What it does**:
1. Forces AI to read PRD
2. Reads Interaction Guides
3. Checks active DB schema
4. Prevents wild assumptions

**Example**:
```
/align-agent
```

---

## 🚀 10. Epic & PI Management Commands

### `Start the Epic Hardening protocol for Epic [X]`

**Purpose**: Execute 8-step Epic hardening sequence.

**When to use**: All Epic tickets marked done.

**What it does**:
1. Integration testing via ci/pipeline.sh
2. Threat modeling
3. API contract finalization
4. Database synchronization
5. E2E journey testing
6. Versioning preparation
7. Code quality verification
8. Verification gate (≥63/70)

**Example**:
```
Start the Epic Hardening protocol for Epic-001
```

---

### `Initialize Pre-Hardening Testing for PI-[X]`

**Purpose**: Audit and generate comprehensive test suite for PI.

**When to use**: Before PI hardening begins.

**What it does**:
1. Backend verification (80-100% coverage)
2. Frontend functional integration tests
3. Persona-driven testing flows
4. Epic-level reporting

**Example**:
```
Initialize Pre-Hardening Testing for PI-001
```

---

### `Hardening Protocol for Project Initiative [X]`

**Purpose**: Validate PI-level DOD checklist.

**When to use**: All Epics hardened and pre-hardening passed.

**What it does**:
1. Creates task.md artifact
2. Cross-Epic audit
3. Zero-Mock audit
4. Testing blitz (100% BE coverage)
5. Security scan
6. Enterprise quality verification
7. Release notes generation

**Example**:
```
Hardening Protocol for Project Initiative 001
```

---

### `start PI-[X] with epics [X-Y]`

**Purpose**: Initialize new Project Initiative manifest.

**When to use**: Starting new PI with multiple Epics.

**What it does**:
1. Validates Epic range
2. Checks Epic status
3. Generates PI-[X]_Manifest.md
4. Initializes PI-level checklist

**Example**:
```
start PI-001 with epics 001-003
```

---

## 🛠️ 11. Advanced Automation Commands

### `/autonomous`

**Purpose**: Execute complete pipeline automatically for all tickets.

**When to use**: Well-scoped, low-risk Epics.

**What it does**:
1. Loops through all Epic tickets
2. Auto-researches, plans, implements, verifies
3. Auto-debugging on failures
4. Marks DONE without stopping

**Example**:
```
/autonomous epic-001
```

---

### `/debug`

**Purpose**: Systematic debugging protocol.

**When to use**: Bug reports or test failures.

**What it does**:
1. Identifies failing log
2. Reads PRD baseline
3. Drafts explicit fix plan
4. Writes test to prove fix

**Example**:
```
/debug
```

---

### `/reflect`

**Purpose**: Document failures for continuous improvement.

**When to use**: Circuit breaker triggers or hallucinations.

**What it does**:
1. Documents exact trigger
2. Identifies root cause
3. Records correction
4. Updates ai_lessons.md

**Example**:
```
/reflect
```

---

### `/remember`

**Purpose**: Extract and save patterns as permanent rules.

**When to use**: Solving major architectural/UI problems.

**What it does**:
1. Extracts pattern from solution
2. Writes to .agent/rules/ file
3. Uses memory MCP for storage
4. Makes searchable for future

**Example**:
```
/remember
```

---

### `/dashboard`

**Purpose**: Generate visual project health dashboard.

**When to use**: Wanting project overview.

**What it does**:
1. Runs dashboard_sync.py script
2. Syncs ticket metadata.json
3. Generates progress bars in DASHBOARD.md
4. Zero-token compilation of state

**Example**:
```
/dashboard
```

---

### `/uat-phase`

**Purpose**: UAT phase analysis and learning loop.

**When to use**: Post-PI hardening or batch UAT bug fixes.

**What it does**:
1. Reads UAT Bug Fixes from backlog.md
2. Performs retrospective on fixes
3. Updates ai_lessons.md
4. Generates/updates .agent/rules/

**Example**:
```
/uat-phase
```

---

## 🔄 12. Migration & Retrofit Commands

### `Retrofit existing project [Name]`

**Purpose**: Adopt framework for legacy projects.

**When to use**: Bringing existing project under framework governance.

**What it does**:
1. Deep codebase analysis
2. Helps draft Project Foundation docs
3. Creates Legacy Epics
4. Establishes PI-0 Manifest

**Example**:
```
Retrofit existing project MyApp
```

---

### `Migrate project to Three-Layer SDLC`

**Purpose**: Upgrade project to Epic/PI model.

**When to use**: Migrating from Tickets-only to full structure.

**What it does**:
1. Realigns tickets into Epic containers
2. Generates epic_metadata.json
3. Performs retroactive gap analysis
4. Formalizes project structure

**Example**:
```
Migrate project to Three-Layer SDLC
```

---

## 🏛️ 13. Architecture Registry Commands

### `ai-engine architecture register`

**Purpose**: Register a module in the architecture registry to prevent code duplication.

**When to use**: After creating a new service, manager, or component.

**What it does**:
1. Records module name, type, and primary file
2. Tracks responsibilities and dependencies
3. Updates `engine/architecture/registry.json`
4. Links to tickets for traceability

**Example**:
```bash
ai-engine architecture register AuthService service src/services/auth.ts \
  --description "Handles user authentication and JWT tokens" \
  --responsibilities "login,logout,token-refresh" \
  --ticket T-042
```

---

### `ai-engine architecture query`

**Purpose**: Query the architecture registry for module information.

**When to use**: Finding existing modules before creating new ones.

**What it does**:
1. Lists modules by type (service, manager, repository, etc.)
2. Shows module details including responsibilities
3. Displays dependency tree
4. Suggests relevant modules

**Example**:
```bash
ai-engine architecture query --type service
ai-engine architecture query --module AuthService
```

---

### `ai-engine architecture validate`

**Purpose**: Validate architecture layer rules and import violations.

**When to use**: Pre-commit or CI pipeline checks.

**What it does**:
1. Checks layer boundaries (ui → services → models → utils)
2. Detects unauthorized imports
3. Reports architectural drift
4. Enforces consistent structure

**Example**:
```bash
ai-engine architecture validate
ai-engine architecture validate --files "src/services/*.ts"
```

---

### `ai-engine architecture rules`

**Purpose**: Display current architecture layer rules.

**When to use**: Understanding what imports are allowed per layer.

**What it does**:
1. Shows layer definitions
2. Lists allowed imports per layer
3. Displays file patterns for each layer

**Example**:
```bash
ai-engine architecture rules
```

---

### `ai-engine architecture update`

**Purpose**: Auto-update architecture registry from codebase.

**When to use**: Initial setup or after major refactors.

**What it does**:
1. Scans codebase for module patterns (*Service, *Manager, etc.)
2. Auto-detects module types from naming
3. Registers new modules
4. Updates existing module metadata

**Example**:
```bash
ai-engine architecture update --scan
```

---

### `ai-engine architecture suggest`

**Purpose**: Suggest existing modules for a responsibility.

**When to use**: Before creating new functionality to avoid duplication.

**What it does**:
1. Searches for modules with similar responsibilities
2. Provides confidence scores
3. Recommends existing modules over new ones
4. Prevents service fragmentation

**Example**:
```bash
ai-engine architecture suggest "user authentication" --type service
```

---

### `ai-engine architecture export`

**Purpose**: Export architecture registry as markdown documentation.

**When to use**: Creating project documentation or onboarding guides.

**What it does**:
1. Generates comprehensive module documentation
2. Groups modules by type
3. Lists responsibilities and dependencies
4. Outputs to file or stdout

**Example**:
```bash
ai-engine architecture export --output ARCHITECTURE.md
```

---

## 📝 Common Command Sequences

### Morning Startup
```bash
make status                           # Check services
ai-engine session list                # Find session
export AI_SESSION_ID=<id>             # Set session
ai-engine index-repo --parallel       # Ensure fresh index
ai-engine next                        # See ready tickets
```

### New Ticket Flow
```bash
ai-engine status T-001                # Check if ready
ai-engine deps T-001                  # See dependencies
ai-engine research T-001              # Gather context
# ... implement ...
ai-engine validate T-001              # Check scope
bash ci/verify.sh                     # Verify quality
```

### Epic Hardening
```bash
"Start Epic Hardening protocol for Epic 3"
# (runs full 8-step sequence via AGENTS_PROMPTS_INDEX.md)
```

### End of Day
```bash
ai-engine session stats $AI_SESSION_ID  # Review learning
/handoff                                 # Save state
```

---

## See Also

- `AGENTS_PROMPTS_INDEX.md` - Natural language prompts mapped to commands
- `AGENTS.md` - Framework optimization guidelines and rules
- `Framework_Overview.md` - Complete framework architecture and phases
- `COMMAND-REFERENCE.md` - Detailed technical command reference
