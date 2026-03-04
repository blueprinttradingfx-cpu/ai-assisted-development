#!/bin/bash
# Tech-agnostic runner setup script for CI/CD.

set -e

source "$(dirname "$0")/ci_config.sh"

echo "Checking environment for $LINT_CMD..."

# Detect Flutter
if [[ "$LINT_CMD" == *"flutter"* ]]; then
    echo "Stack detected: Flutter"
    if ! command -v flutter &> /dev/null; then
        echo "Updating PATH for Flutter (expected in subosito/flutter-action context or similar)"
        # Note: In a real GHA, we'd use a specialized action, but to be agnostic 
        # we can provide hints or fail gracefully with instructions.
    fi
fi

# Detect Node/NPM
if [[ "$LINT_CMD" == *"npm"* || "$LINT_CMD" == *"yarn"* ]]; then
    echo "Stack detected: Node.js"
    npm install
fi

# Run the project-defined setup command
if [ -n "$SETUP_CMD" ]; then
    echo "Running SETUP_CMD: $SETUP_CMD"
    eval "$SETUP_CMD"
fi

echo "Runner setup complete ✅"
