#!/bin/bash
set -e

# Source the dynamic CI configuration
source "$(dirname "$0")/ci_config.sh"

echo "Running Dependency Security Scan..."

# 1. Frontend (Flutter)
echo "--- Scanning Frontend ---"
cd "$ROOT_DIR/$FE_DIR" || exit 1
flutter pub outdated

# 2. Backend (Python)
echo "--- Scanning Backend ---"
cd "$ROOT_DIR/$BE_DIR" || exit 1
echo "Running Bandit (Security Linter)..."
eval "$BE_SECURITY_CMD"
echo "Running pip-audit (Vulnerability Scanner)..."
./venv/Scripts/python.exe -m pip_audit

echo "Security Scan Passed ✅"
