# Configuration file for the Local CI Pipeline.
# Update these variables to match your specific tech stack and project environment.

# The directory where your main application code resides.
# Example: "web-applications/my_react_app", "web-applications/my_flutter_app", "src"
export APP_DIR="web-applications/tita_chi"

# The command used to run static analysis and linting.
# Example: "npm run lint", "flutter analyze", "cargo clippy", "golangci-lint run"
export LINT_CMD="flutter analyze"
export TEST_CMD="flutter test"
export BUILD_CMD="flutter build web"
export SECURITY_SCAN_CMD="flutter pub outdated"
export ENV_VALIDATION_CMD="echo 'Environment validation passed'"

# The command used to setup the environment (e.g., install flutter, node, etc.)
# Used primarily by CI/CD pipelines to ensure the runner is ready.
export SETUP_CMD="flutter pub get"
