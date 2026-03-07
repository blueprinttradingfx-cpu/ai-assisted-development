# AI Development Runtime - Engine

The execution engine for AI-assisted development. Enforces governance, manages dependencies, and controls AI context.

## Overview

This engine transforms your AI development framework from documentation into an operational system with:

- **Phase Runner**: Enforces SDLC phase progression
- **Dependency Engine**: DAG-based ticket execution ordering
- **File Guard**: Prevents unauthorized file modifications
- **Architecture Guard**: Enforces layer boundaries
- **Context Builder**: Generates focused AI context packs
- **Learning Layer**: Captures telemetry for continuous improvement

## Installation

```bash
cd engine
npm install
```

> **⚠️ REQUIRED: You must actively use this system.** This is not an automatic background tool. Tickets need `metadata.json` files with proper schema, and you must run CLI commands to enforce governance. See [Usage Requirements](#usage-requirements) below.

## Usage Requirements

To effectively utilize this system, you must:

* Actively run CLI commands to enforce governance and advance phases
* Ensure tickets have proper `metadata.json` files with the required schema
* Regularly check the status of tickets and dependencies
* Use the system to generate context and validate file scope

## CLI Commands

### Core Commands

```bash
# Run the engine for a ticket (advances phases)
npm run start -- run T-123

# Check ticket status
npm run start -- status T-123

# Show dependency tree
npm run start -- deps T-123

# List tickets ready to execute
npm run start -- next

# Generate AI context pack
npm run start -- context T-123

# Run all guards (validation only)
npm run start -- validate T-123

# Show learning insights
npm run start -- insights

# Export learning data
npm run start -- insights --export data.json
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLI Layer                               │
│  (commands: run, status, deps, context, validate, insights) │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Governance Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Phase Runner │  │    State     │  │  Validation  │      │
│  │              │  │   Manager    │  │   Runner     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Execution Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dependency  │  │   Context    │  │   Learning   │      │
│  │   Engine     │  │   Builder    │  │    Layer     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Safety Layer                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  File Guard  │  │   Architecture │                    │
│  │              │  │     Guard       │                    │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## Configuration

### Ticket Metadata Schema

Tickets must include a `metadata.json` with:

```json
{
  "ticket_id": "T-123",
  "title": "Implement login service",
  "status": "draft",
  "ticket_type": "feature",
  "current_phase": "requirements",
  "depends_on": ["T-100", "T-101"],
  "file_scope": {
    "allowed": ["src/services/authService.ts", "tests/authService.test.ts"],
    "excluded": []
  },
  "layer": "service"
}
```

### Architecture Rules

Create `engine/config/architecture_rules.json`:

```json
{
  "layers": [
    {
      "name": "ui",
      "patterns": ["src/ui/**/*", "src/components/**/*"],
      "allowedImports": ["service", "model", "utils"],
      "description": "UI layer"
    },
    {
      "name": "service",
      "patterns": ["src/services/**/*"],
      "allowedImports": ["model", "utils", "infra"],
      "description": "Business logic"
    },
    {
      "name": "model",
      "patterns": ["src/models/**/*"],
      "allowedImports": ["utils"],
      "description": "Data models"
    }
  ],
  "strictMode": false,
  "excludePatterns": ["**/*.test.*"]
}
```

## How It Works

### 1. Dependency Enforcement

Tickets declare dependencies via `depends_on`. The engine:
- Builds a DAG from all tickets
- Detects cycles
- Only allows execution when dependencies are `completed`

```bash
# Check if ticket can execute
npm run start -- status T-123
# Shows: Can execute: ✗ No, Blocked by: T-100
```

### 2. File Scope Enforcement

Tickets declare allowed files via `file_scope.allowed`. The engine:
- Checks git diff against allowed patterns
- Blocks commits that modify out-of-scope files
- Supports glob patterns

```bash
# Preview what files a ticket can modify
npm run start -- validate T-123
```

### 3. Architecture Enforcement

Layer rules prevent architectural erosion:
- UI cannot import database layer
- Services cannot import UI components
- Each layer has allowed import targets

### 4. Context Generation

AI receives focused context instead of reading arbitrary files:

```bash
# Generate .context/T-123.md
npm run start -- context T-123
```

Context includes:
- Ticket goal and current phase
- Dependency files (for reference)
- Allowed files (scope)
- Architecture rules for the layer
- Project documentation links

### 5. Learning System

After each ticket completes, the engine records:
- Files modified
- Phases executed
- Attempts (circuit breaker tracking)
- Duration
- Pass/fail status

```bash
# View insights
npm run start -- insights
```

Insights include:
- File volatility (most changed files)
- Phase failure rates
- Architecture coupling detection
- Ticket complexity recommendations

## Integration with AI Workflow

### Standard Workflow

1. **Create ticket** with dependencies and file scope
2. **Check status**: `ai-engine status T-123`
3. **Generate context**: `ai-engine context T-123`
4. **AI reads context** from `.context/T-123.md`
5. **AI implements** within file scope
6. **Validate**: `ai-engine validate T-123`
7. **Run engine**: `ai-engine run T-123` (advances phase)
8. **Repeat** until complete

### Circuit Breaker

If validation fails 3 times:
- Circuit breaker triggers
- Human intervention required
- Failure count tracked in metadata

## Tech Agnostic Design

The engine works with any tech stack:

- **Web projects**: Patterns like `src/components/**/*`, `src/services/**/*`
- **Mobile**: `lib/ui/**/*`, `lib/services/**/*`
- **Backend**: `internal/handlers/**/*`, `internal/models/**/*`
- **Multi-language**: Supports TS, JS, Python, Dart, Rust import parsing

Configure via `architecture_rules.json` and ticket `file_scope`.

## File Structure

```
engine/
├── src/
│   ├── index.ts              # CLI entry point
│   ├── phase_runner.ts       # Phase orchestration
│   ├── state_manager.ts      # Ticket metadata I/O
│   ├── validation_runner.ts  # CI verification hook
│   ├── schemas/
│   │   └── ticket_schema.ts  # Zod validation schemas
│   ├── dependency_engine.ts  # DAG and dependency logic
│   ├── file_guard.ts         # File scope enforcement
│   ├── architecture_guard.ts # Layer/import validation
│   ├── context_builder.ts    # AI context generation
│   └── learning_layer.ts     # Telemetry and analytics
├── config/
│   └── architecture_rules.json
├── package.json
└── tsconfig.json
```

## License

MIT
