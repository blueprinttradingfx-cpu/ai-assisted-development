# AI Assisted Development

**It's not a "1 prompt, wait 20 minutes, and voilà" tool — it's a rigorous, enterprise-grade development process.**

This starter kit evolves your idea through the full product lifecycle: you'll define requirements like a **Product Owner**, design the experience like an **Art Director**, manage tasks like a **Project Manager**, and ship a real product like a **CEO**. You'll experience the real-world software development process — from raw idea to corporate-standard application.

## 📦 Installation

### Prerequisites

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** (v9+) - Included with Node.js
- **Python** (v3.8+) - [Download](https://python.org/)
- **Docker** - For Qdrant vector database [Download](https://docker.com/)
- **Ollama** - For local embeddings [Download](https://ollama.ai/)

### Quick Install

```bash
# Clone the repository
git clone <repository-url>
cd tita-chi

# Install all framework dependencies
make install

# Run health checks to verify installation
make test

# Start all services
make start
```

### Manual Install (Alternative)

```bash
# 1. Install Node.js dependencies
cd engine && npm install
cd ../packages/memory && npm install

# 2. Start Qdrant (in another terminal)
docker run -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant

# 3. Install Ollama and pull embedding model
ollama pull nomic-embed-text
ollama serve

# 4. Verify installation
make test
```

### Available Make Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies and tools |
| `make test` | Run framework health checks |
| `make start` | Start all framework services |
| `make status` | Check service status |
| `make stop` | Stop all services |
| `make clean` | Clean up temporary files |
| `make help` | Show all available commands |

---

## 🤖 AI Agent Workflow (Two-Layer SDLC)

When an AI agent starts work, it **MUST** follow the standardized **Two-Layer Workflow** defined in **[AGENTS.md](./AGENTS.md)**:

- **Layer 1: Ticket-Level (Velocity)**: Fast iteration on `feature/*` branches. Requirements → Design → Implementation → Unit Testing → Local CI Validation.

---

## 🚀 Quick Start

### New Project
```bash
# 1. Initialize framework structure
/init-project

# 2. Fill out vision.md with your project concept

# 3. Scope your first epic
/scope-epic core-features

# 4. Execute first ticket
/execute-plan T-001
```

### Existing Project
```bash
# Adopt framework for legacy codebase
/retrofit my-existing-project

# Check for gaps
/check-implementation
```

---

## 🛠️ Repository Intelligence

Repository Intelligence provides AI-powered codebase understanding, enabling agents to intelligently query and understand your codebase instead of blind file reading.

### Installation

1. **Install Dependencies**
```bash
cd engine
npm install
```

2. **Index Your Codebase**
```bash
# Index all source files
node dist/index.js index-repo -p ../web-applications

# Optional: Watch for changes
node dist/index.js index-repo -p ../web-applications --watch
```

3. **Generate Embeddings** (Optional - for semantic search)
```bash
# Install and start Ollama
ollama pull nomic-embed-text
ollama serve

# Generate embeddings for all code chunks
node dist/index.js embed
```

4. **Research Your Codebase**
```bash
# Search for specific functionality
node dist/index.js repo-research "authentication" --query

# Research a specific ticket
node dist/index.js repo-research "T-001"

# Get project overview
node dist/index.js overview
```

5. **Available Commands**
- `index-repo` - Index repository for intelligent search
- `search` - Semantic and keyword search
- `symbols` - Find functions, classes, methods
- `embed` - Generate semantic embeddings
- `repo-research` - Research tickets or queries with AI
- `overview` - Get project overview with patterns and insights
- `stats` - View repository statistics

### Architecture

- **tree-sitter**: Universal code parsing (Python, TypeScript, JavaScript)
- **Ollama**: Local embeddings (nomic-embed-text)
- **Qdrant**: Vector storage for semantic search
- **JSON**: Metadata storage (no database dependencies)
- **Context Builder**: Intelligent context packing for AI agents
- **Pattern Detection**: 50+ architectural patterns automatically detected

### Key Features

- **Zero Cost**: No API keys or subscriptions required
- **Local-First**: Everything runs locally
- **Framework Agnostic**: Works with any tech stack
- **Fire-Flow Compatible**: Follows proven Fire-Flow architecture

---

## 🏛️ Three-Layer SDLC

```
Layer 1: TICKET (Velocity)          Layer 2: EPIC (Hardening)         Layer 3: PI (Production)
├── Fast iteration                   ├── Integration testing           ├── Cross-epic flows
├── File Guard scope                 ├── Threat modeling               ├── Security audit
├── 70-point gate (56/70)            ├── 70-point gate (63/70)         ├── 70-point gate (70/70)
└── Breath-based execution           └── Version tagging               └── Production deploy
```

| Layer | Focus | Threshold | When |
|-------|-------|-----------|------|
| **1** | Developer velocity | 56/70 (80%) | Individual tickets |
| **2** | Feature hardening | 63/70 (90%) | Epic release |
| **3** | Production readiness | 70/70 (100%) | Production deployment |

---

## 🤖 Agent System

Four specialized agents work sequentially:

```
Researcher → Planner → Executor → Verifier
     │           │          │          │
     ▼           ▼          ▼          ▼
RESEARCH.md  BLUEPRINT.md  RECORD.md  VERIFICATION.md
```

| Agent | Purpose | Output |
|-------|---------|--------|
| **Researcher** | Discover patterns, map codebase | `RESEARCH.md` |
| **Planner** | Create implementation plan | `BLUEPRINT.md` |
| **Executor** | Implement code following plan | `RECORD.md` + code |
| **Verifier** | Validate independently | `VERIFICATION.md` |

---

## 📚 Skills Library

**26 skills** across 9 categories, framework-agnostic:

| Category | Skills | Example |
|----------|--------|---------|
| Agents | 5 | executor-v1, planner-v1 |
| Methodology | 4 | testing-patterns-v1 |
| Architecture | 7 | jwt-auth-v1, caching-v1 |
| Frontend | 2 | flutter-provider-v1 |
| Backend | 1 | fastapi-structure-v1 |

Every agent automatically searches and applies relevant skills.

---

## 🛡️ Safety Mechanisms

| Mechanism | Purpose | Trigger |
|-----------|---------|---------|
| **File Guard** | Scope enforcement | Out-of-scope edits |
| **Architecture Guard** | Layer rules | Wrong imports |
| **Circuit Breaker** | Failure detection | 3 consecutive failures |
| **70-Point Gate** | Quality scoring | <80% score |

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| `ARCHITECTURE-DIAGRAM.md` | Visual system architecture |
| `COMMAND-REFERENCE.md` | All commands with examples |
| `SYSTEM-OVERVIEW.md` | Concepts and philosophy |
| `SKILLS_INVENTORY.md` | Skills roadmap |
| `COMMANDS_AND_PROMPTS_INDEX.md` | Official command registry |

---

## 🎯 Core Commands

| Command | When to Use |
|---------|-------------|
| `/scope-epic [NAME]` | Generate tickets for new epic |
| `/execute-plan` | Implement a ticket manually |
| `/autonomous` | Run epic without checkpoints |
| `/verify-ticket` | Validate implementation |
| `/discover` | Find next priority ticket |
| `/debug` | Systematic bug hunting |

**See full list**: `COMMAND-REFERENCE.md`

---

## 🔧 Framework Principles

> **Project-Agnostic**: Works across web apps, mobile, APIs  
> **Tech-Agnostic**: FastAPI, Express, Flutter, React, etc.  
> **Starter Framework**: Bootstrap quickly, scale safely  

---

## 📊 System Status

| Component | Status |
|-----------|--------|
| Agent System | ✅ 4 agents active |
| Skills Library | ✅ 26 skills, indexed |
| Three-Layer SDLC | ✅ All layers operational |
| Safety Mechanisms | ✅ File/Architecture/Circuit guards |
| Documentation | ✅ Complete |

---

> **Start here**: `/init-project` or read `SYSTEM-OVERVIEW.md` for deep dive.

## 🏗️ Project Structure

- **[project-management/](./project-management/)**: The Source of Truth.
  - `project/`: Foundation files (Vision, PRD, FRD, Epic Backlog).
  - `design/`: The Design Bible (Sitemap, Style Guide, Interaction Specs).
  - `epics/`: Active Epics containing scoped tickets and release-level hardening documents.
- **[ci/](./ci/)**: Tech-agnostic CI/CD pipeline scripts (Lint, Test, Security, Enforce Workflow). Configure via `ci/ci_config.sh`.
- **[web-applications/](./web-applications/)**: Core application codebases.
- **[packages/](./packages/)**: Shared libraries and tools (including MCP memory).
- **[skills/](./skills/)**: Custom AI instructions and domain-specific capabilities.
- **[.agent/rules/](./.agent/rules/)**: Specialized behavioral guidelines (JS, TDD, Product Management, etc.) and best-practice instructions.

## 🤝 For Human Operators

If you are a human managing this project, please refer to the dedicated guide for initialization, curation, and verification:

> [!TIP]
> **[HUMAN.md – The Human Operator's Manual](./HUMAN.md)**

---

MIT | Inspired by [AI DevKit](https://github.com/codeaholicguy/ai-devkit)
