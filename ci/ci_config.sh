# Configuration file for the Local CI Pipeline.
# Update these variables to match your specific tech stack and project environment.

# Frontend (Flutter)
export FE_DIR="web-applications/tita_chi"
export FE_LINT_CMD="flutter analyze"
export FE_TEST_CMD="flutter test"
export FE_BUILD_CMD="flutter build web"

# Backend (Python)
export BE_DIR="web-applications/tita_chi_intelligence"
export BE_LINT_CMD="./venv/Scripts/python.exe -m ruff check ."
export BE_TYPECHECK_CMD="./venv/Scripts/python.exe -m mypy app"
export BE_TEST_CMD="./venv/Scripts/python.exe -m pytest tests/"
export BE_SECURITY_CMD="./venv/Scripts/python.exe -m bandit -r app"

# Legacy compatibility (optional)
export APP_DIR="$FE_DIR"
export LINT_CMD="$FE_LINT_CMD"
export TEST_CMD="$FE_TEST_CMD"

# Environment Setup
export FE_SETUP_CMD="flutter pub get"
export BE_SETUP_CMD="./venv/Scripts/pip install -r requirements.txt"
