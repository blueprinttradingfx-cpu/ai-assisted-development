#!/bin/bash
set -e

# Source the dynamic CI configuration
source "$(dirname "$0")/ci_config.sh"

echo "Running Dependency Security Scan..."

# Navigate to the dynamic application directory
cd "$APP_DIR" || { echo "❌ Application directory '$APP_DIR' not found. Please update ci/ci_config.sh."; exit 1; }

# Run the generic security scan command defined in the config
if [ -n "$SECURITY_SCAN_CMD" ]; then
    eval "$SECURITY_SCAN_CMD"
    echo "Security Scan Passed ✅"
else
    echo "⚠️ No SECURITY_SCAN_CMD defined in ci_config.sh. Skipping."
fi
