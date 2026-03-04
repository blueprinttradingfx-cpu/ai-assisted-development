#!/bin/bash
set -e

# Source the dynamic CI configuration
source "$(dirname "$0")/ci_config.sh"

echo "Running Unit Tests..."

# Navigate to the dynamic application directory
cd "$APP_DIR" || { echo "❌ Application directory '$APP_DIR' not found. Please update ci/ci_config.sh."; exit 1; }

# Run the generic test command defined in the config
eval "$TEST_CMD"

echo "Tests Passed ✅"
