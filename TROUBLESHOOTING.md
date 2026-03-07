# 🛠️ Troubleshooting Guide

> **Standard procedures for diagnosing and fixing framework issues**

This guide provides solutions for common problems encountered during installation, development, and deployment.

---

## 🏗️ Framework Lifecycle Issues

### 📦 Installation Failures

#### `make install` fails with "command not found"
- **Cause**: Node.js, Python, or Docker is not installed or not in your PATH.
- **Fix**: Run `make install-check` to see what's missing. Install the required tool and restart your terminal.

#### `npm install` fails in `engine/` or `packages/memory/`
- **Cause**: Incompatible Node.js version or network issues.
- **Fix**: 
  1. Ensure you are using Node.js v18+. 
  2. Run `npm cache clean --force`.
  3. Delete `node_modules` and `package-lock.json`, then run `npm install` again.

---

## 📊 Repository Intelligence Issues

### 🔍 Indexing Problems

#### `ai-engine index-repo` hangs or is extremely slow
- **Cause**: Large number of ignored files (e.g., `node_modules`, `dist`) being scanned.
- **Fix**: Ensure your `.gitignore` is up to date. Use the `--parallel` flag to speed up processing.

#### `Qdrant` connection refused
- **Cause**: Qdrant container is not running.
- **Fix**: Run `make start` or `docker run -d -p 6333:6333 qdrant/qdrant`.

#### Embeddings not generating
- **Cause**: Ollama service is not running or model `nomic-embed-text` is missing.
- **Fix**:
  1. Run `ollama serve`.
  2. Run `ollama pull nomic-embed-text`.

---

## 🧠 Session & Context Issues

### 💾 Session Persistence

#### `AI_SESSION_ID` not recognized
- **Cause**: Environment variable not set in the current shell.
- **Fix**: Run `export AI_SESSION_ID=<id>` (macOS/Linux) or `$env:AI_SESSION_ID="<id>"` (PowerShell).

#### Session database locked
- **Cause**: Multiple processes trying to write to `session_data.db` simultaneously.
- **Fix**: Close other instances of the engine or delete the `.db-journal` file if it exists.

---

## 🛡️ Quality Gate & CI Issues

### ❌ Verification Failures

#### `ci/verify.sh` score too low
- **Cause**: Missing documentation, low test coverage, or linting errors.
- **Fix**:
  1. Check the output of `ci/verify.sh` for specific point deductions.
  2. Run `npm run lint` and `npm test` to fix base issues.
  3. Ensure all tickets in the epic have `approved: true` in their `metadata.json`.

#### `Circuit Breaker` triggered
- **Cause**: Two consecutive failures on the same quality gate.
- **Fix**: You must manually intervene and fix the root cause before the AI can proceed. Check `.agent/flags/circuit-breaker-status.txt` for details.

---

## 🚨 Emergency Reset

If the framework state becomes corrupted:

1. **Stop all services**: `make stop`
2. **Clean temporary files**: `make clean`
3. **Delete the session database**: `rm session_data.db` (Caution: deletes all session history)
4. **Re-initialize**: `make install`
5. **Start fresh**: `make start`

---

## 📞 Getting Help

If your issue is not listed here:
1. Check `activity-log.md` for recent changes.
2. Run `make test` and share the `framework-health.json` output.
3. Consult `AGENTS_COMMANDS_GUIDE.md` for correct usage patterns.
