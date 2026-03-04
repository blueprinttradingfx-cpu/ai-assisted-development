#!/bin/bash
set -e

echo "Running Metadata Gating Enforcement..."

EPICS_DIR="./project-management/epics"

if [ ! -d "$EPICS_DIR" ]; then
    echo "No /epics directory found. Skipping gating check."
    exit 0
fi

# Function to get JSON value (jq with grep fallback)
get_json_val() {
    local key=$1
    local file=$2
    if command -v jq &> /dev/null; then
        jq -r ".$key" "$file"
    else
        # Fallback for environments without jq (e.g. Windows Git Bash)
        # Search for "key": true or "key": "true"
        if grep -q "\"$key\":\s*true" "$file" || grep -q "\"$key\":\s*\"true\"" "$file"; then
            echo "true"
        else
            echo "false"
        fi
    fi
}

for epic in "$EPICS_DIR"/*; do
  # Skip templates
  if [[ "$epic" == *"template"* ]]; then
    continue
  fi
  
  if [ -d "$epic" ]; then
    echo "🔍 Checking epic: $epic"
    if [ -d "$epic/tickets" ]; then
      for ticket in "$epic"/tickets/*; do
        # Skip ticket templates
        if [[ "$ticket" == *"template"* ]]; then
          continue
        fi
        if [ -d "$ticket" ]; then
          echo "  Ticket: $ticket"
          meta_file="$ticket/metadata.json"
          if [ -f "$meta_file" ]; then
            tests_done=$(get_json_val "tests_done" "$meta_file")
            implementation_done=$(get_json_val "implementation_done" "$meta_file")
            approved=$(get_json_val "approved" "$meta_file")
            
            if [ "$tests_done" != "true" ] || [ "$implementation_done" != "true" ] || [ "$approved" != "true" ]; then
              echo "    ❌ Blocked: Ticket $ticket not ready for merge (Tests, Implementation, or Approval is false)"
              exit 1
            fi
          else
            echo "    ❌ Blocked: Missing metadata.json in $ticket"
            exit 1
          fi
        fi
      done
    fi
  fi
done

echo "Metadata gating enforced. All tickets in Epic are Approved ✅"
