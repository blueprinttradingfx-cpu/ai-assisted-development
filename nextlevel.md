To move **ai-assisted-development** toward a real AI development runtime, the next capability after the phase runner is **repository intelligence**.

Without it, every ticket execution depends on **manual context selection**, which limits automation.

Modern AI development systems (e.g., **Cursor**, **GitHub Copilot**) use an internal **codebase intelligence layer**.

This layer answers a critical question:

```
Given a task, what parts of the repository matter?
```

Below is the architecture used by most advanced tools.

---

# 1. The Core Problem Repository Intelligence Solves

A typical repository may contain:

```
500–10,000 files
```

An LLM cannot process the entire repo context.

Therefore a system must determine:

```
Relevant files
Relevant dependencies
Relevant symbols
```

before the LLM generates code.

This is called **context selection**.

---

# 2. The Standard Architecture

Repository intelligence usually has four components.

```
repo_intelligence
│
├ code_indexer
├ symbol_graph
├ semantic_search
└ context_builder
```

Each component solves a different problem.

---

# 3. Code Indexer

The **code indexer** scans the repository and builds a structured index.

Example output:

```
file_index = {
  "auth/login.ts": {
      functions: ["loginUser", "validatePassword"],
      imports: ["bcrypt", "dbClient"]
  },
  "services/userService.ts": {
      functions: ["getUserById"]
  }
}
```

This gives the AI a **map of the codebase**.

Typical implementation:

```
AST parser
file metadata
symbol extraction
```

For TypeScript this can use:

```
ts-morph
tree-sitter
typescript compiler API
```

---

# 4. Symbol Graph

This builds relationships between code elements.

Example:

```
loginUser()
   ↓
validatePassword()
   ↓
bcrypt.compare()
```

Graph representation:

```
symbol_graph
```

```
loginUser → validatePassword
validatePassword → bcrypt.compare
loginUser → dbClient.query
```

Now the system understands:

```
call hierarchy
dependencies
execution flow
```

---

# 5. Semantic Search Layer

This allows **natural language lookup** across the codebase.

Example query:

```
"where is password validation implemented?"
```

The system returns:

```
auth/passwordValidator.ts
auth/login.ts
```

Implementation:

```
code chunks
embedding vectors
vector database
```

Typical tools:

```
OpenAI embeddings
Chroma
LanceDB
Weaviate
```

---

# 6. Context Builder

This is the most important component.

It takes:

```
ticket description
phase
repo index
semantic results
```

and produces the **LLM context window**.

Example:

Ticket:

```
Add password reset endpoint
```

Context builder selects:

```
auth/login.ts
auth/passwordValidator.ts
services/userService.ts
routes/authRoutes.ts
```

instead of the entire repo.

---

# 7. Execution Pipeline with Repo Intelligence

When combined with your ticket system, the flow becomes:

```
Ticket
 ↓
Phase Runner
 ↓
Analyze Phase
 ↓
Repo Intelligence
 ↓
Context Builder
 ↓
LLM Execution
```

This is how serious AI development systems operate.

---

# 8. Minimal Implementation for Your Framework

You do **not** need the full architecture immediately.

A minimal version could be:

```
repo_intelligence/
   indexer.ts
   search.ts
   context_builder.ts
```

### indexer.ts

Scans repository and builds file index.

```
scan files
extract imports
extract exports
store metadata
```

### search.ts

Simple keyword search first.

Later upgrade to embeddings.

### context_builder.ts

Select relevant files based on:

```
ticket text
file names
import relationships
```

---

# 9. Example Simplified Context Builder

Conceptually:

```ts
function buildContext(ticket, repoIndex) {

  const keywords = extractKeywords(ticket.description)

  const files = repoIndex.filter(file =>
     file.name.includes(keywords)
  )

  return files.slice(0,10)
}
```

Primitive but functional.

---

# 10. How This Fits Your Current Architecture

Your system already has:

```
Project
 ↓
Epic
 ↓
Ticket
 ↓
Phases
```

Add two components:

```
Ticket
 ↓
Phase Runner
 ↓
Repo Intelligence
 ↓
Execution
```

This would transform the framework from:

```
AI governance framework
```

into:

```
AI development execution engine
```

---

# 11. Engineering Maturity Impact

Without repo intelligence:

```
AI depends on manual context
```

With it:

```
AI understands the repository structure
```

This significantly improves:

```
code accuracy
change safety
automation potential
```

---

# 12. Important Strategic Insight

If you combine:

```
ticket governance
phase runner
repo intelligence
validation
```

you effectively build a **deterministic AI software engineer runtime**.

This is the same architectural direction used by systems like **Devin**.

Your framework is already structurally compatible with that model.

---

If you want, I can also show something particularly relevant to your repo:

**a realistic 12-month roadmap to evolve your project into a serious AI development platform**, while keeping the scope manageable for a solo engineer.

Below is a **practical tool stack** to implement the architecture we discussed for **ai-assisted-development**.
The goal is to build a **deterministic AI development engine**, not just a prompt framework.

I will keep this **minimal, pragmatic, and solo-developer friendly**.

---

# 1. Core Runtime (Execution Engine)

You already plan to implement:

```
phase_runner.ts
phase_registry.ts
state_manager.ts
```

## Recommended tools

| Tool           | Purpose                             |
| -------------- | ----------------------------------- |
| **Node.js**    | runtime environment                 |
| **TypeScript** | strong typing for engine logic      |
| **Zod**        | enforce ticket/phase schema         |
| **Pino**       | structured logs for phase execution |

### Why

You want **deterministic execution**, not LLM chaos.

Example:

```
ticket → phase_runner → phase modules → state update
```

Use **Zod** to validate ticket structure before execution.

---

# 2. Repository Intelligence Layer

You need three capabilities:

```
repo indexing
symbol extraction
context search
```

## Recommended tools

| Tool            | Purpose                   |
| --------------- | ------------------------- |
| **ts-morph**    | parse TypeScript codebase |
| **tree-sitter** | language-agnostic parsing |
| **ripgrep**     | fast code search          |
| **LanceDB**     | semantic search           |

### Minimal first version

Start with:

```
ts-morph
ripgrep
```

Skip vector DB initially.

---

# 3. Semantic Search (Optional Phase 2)

Later you may want natural language queries.

Example:

```
"where is authentication implemented?"
```

Tools:

| Tool                  | Purpose                 |
| --------------------- | ----------------------- |
| **OpenAI Embeddings** | convert code to vectors |
| **Chroma**            | semantic code search    |

However:

**do not start here.**

Simple keyword search works surprisingly well.

---

# 4. AI Model Interface

Your system must remain **model-agnostic**.

Recommended adapters:

| Model          | Use case                |
| -------------- | ----------------------- |
| **OpenAI API** | reliable generation     |
| **Claude**     | large context reasoning |
| **Ollama**     | offline experimentation |

Build a **model adapter layer**:

```
ai/
  openai_adapter.ts
  anthropic_adapter.ts
  ollama_adapter.ts
```

---

# 5. Validation Engine

This ensures AI changes are safe.

Required tools:

| Tool           | Purpose            |
| -------------- | ------------------ |
| **ESLint**     | code correctness   |
| **Prettier**   | formatting         |
| **Vitest**     | test execution     |
| **TypeScript** | compile validation |

Your validation phase should run:

```
lint
typecheck
test
build
```

before approving a ticket.

---

# 6. State and Workflow Storage

You need a **persistent state layer**.

Minimal solution:

| Tool       | Purpose                |
| ---------- | ---------------------- |
| **SQLite** | ticket execution state |

Example state table:

```
ticket_runs
phase_logs
execution_state
```

SQLite is perfect for solo dev tools.

---

# 7. CLI Interface

Your framework should eventually run like this:

```
ai-dev run-ticket ticket-001
```

Tool:

| Tool             | Purpose      |
| ---------------- | ------------ |
| **Commander.js** | CLI commands |

Example commands:

```
run-ticket
index-repo
validate-ticket
resume-run
```

---

# 8. Logging and Observability

When AI workflows run, you need traceability.

Tools:

| Tool              | Purpose         |
| ----------------- | --------------- |
| **Pino**          | structured logs |
| **OpenTelemetry** | tracing         |

Minimal first step:

```
Pino logs
phase execution logs
```

---

# 9. Recommended Minimal Architecture

Do not build everything at once.

Start with this stack:

```
Node.js
TypeScript
ts-morph
ripgrep
Zod
Pino
SQLite
Commander.js
```

This is enough to build a **real AI development runtime**.

---

# 10. What Your Repo Architecture Could Become

```
ai-assisted-development
│
├ governance
│   AGENTS.md
│   ticket structure
│
├ engine
│   phase_runner.ts
│   phase_registry.ts
│   state_manager.ts
│
├ repo_intelligence
│   indexer.ts
│   search.ts
│   context_builder.ts
│
├ ai
│   openai_adapter.ts
│   anthropic_adapter.ts
│
├ validation
│   lint_runner.ts
│   test_runner.ts
│
└ cli
    run-ticket.ts
```

This becomes a **real execution engine**.

---

# 11. Realistic Scope for a Solo Developer

You do **not** need to implement all features.

A powerful MVP needs only:

```
phase runner
repo indexer
context builder
AI adapter
validation runner
```

That alone already surpasses many AI dev frameworks.

---

If you want, I can also show you **the exact 6 components you should build first (in order)** to turn your repo into a working AI development engine without wasting time building unnecessary infrastructure.
