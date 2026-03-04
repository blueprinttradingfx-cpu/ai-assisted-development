#!/bin/bash
set -e

# Source the dynamic CI configuration
source "$(dirname "$0")/ci_config.sh"

echo "Running Environment Configuration Validation..."

# Navigate to the dynamic application directory
cd "$APP_DIR" || { echo "❌ Application directory '$APP_DIR' not found. Please update ci/ci_config.sh."; exit 1; }

# Run the generic environment validation command defined in the config
if [ -n "$ENV_VALIDATION_CMD" ]; then
    eval "$ENV_VALIDATION_CMD"
    echo "Environment Validation Passed ✅"
else
    echo "⚠️ No ENV_VALIDATION_CMD defined in ci_config.sh. Skipping."
fi
