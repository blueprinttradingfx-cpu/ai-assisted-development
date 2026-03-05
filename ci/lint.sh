#!/bin/bash
set -e

# Source the dynamic CI configuration
source "$(dirname "$0")/ci_config.sh"

echo "Running static analysis (Lint)..."

# 1. Frontend (Flutter)
echo "--- Checking Frontend ---"
cd "$ROOT_DIR/$FE_DIR" || exit 1
eval "$FE_LINT_CMD"

# 2. Backend (Python)
echo "--- Checking Backend ---"
cd "$ROOT_DIR/$BE_DIR" || exit 1
echo "Running Ruff..."
eval "$BE_LINT_CMD"
echo "Running Mypy..."
eval "$BE_TYPECHECK_CMD"

echo "Lint Passed ✅"
