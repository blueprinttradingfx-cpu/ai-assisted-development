import os
import json
import argparse
import shutil
import re
from datetime import datetime

def create_ticket(epic_path, ticket_id, title):
    tickets_dir = os.path.join(epic_path, "tickets")
    ticket_dir = os.path.join(tickets_dir, f"T-{ticket_id:03d}")
    
    if os.path.exists(ticket_dir):
        print(f"Skipping T-{ticket_id:03d}: Directory already exists.")
        return

    os.makedirs(ticket_dir, exist_ok=True)
    
    # 1. Create subdirectories
    subdirs = ["requirements", "design", "planning", "implementation", "testing"]
    for subdir in subdirs:
        sub_path = os.path.join(ticket_dir, subdir)
        os.makedirs(sub_path, exist_ok=True)
        
        # Create README.md in each subdir
        readme_path = os.path.join(sub_path, "README.md")
        with open(readme_path, "w", encoding="utf-8") as f:
            if subdir == "requirements":
                f.write(f"# T-{ticket_id:03d}: {title} (Requirements)\n\n## Goal\n\n## User Story\n\n## Acceptance Criteria\n")
            elif subdir == "design":
                f.write(f"# T-{ticket_id:03d}: Design Notes\n\n## Architecture\n\n## Reference Mockups\n\n## Data Models\n")
            elif subdir == "planning":
                f.write(f"# T-{ticket_id:03d}: Implementation Plan\n\n## Breath 1: Database/Models\n- [ ] Task\n\n## Breath 2: Services/API\n- [ ] Task\n\n## Breath 3: UI\n- [ ] Task\n")
            elif subdir == "implementation":
                f.write(f"# T-{ticket_id:03d}: Implementation Log\n\n")
            elif subdir == "testing":
                f.write(f"# T-{ticket_id:03d}: Testing Strategy\n\n## Unit Tests\n\n## Integration Tests\n")

    # 2. Create metadata.json mapping exactly to project requirements
    metadata = {
        "ticket_id": f"T-{ticket_id:03d}",
        "title": title,
        "status": "planned",
        "dependencies": [],
        "requirements_done": False,
        "design_done": False,
        "implementation_done": False,
        "tests_done": False,
        "approved": False
    }
    
    metadata_path = os.path.join(ticket_dir, "metadata.json")
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"Generated T-{ticket_id:03d}: {title}")

def main():
    parser = argparse.ArgumentParser(description="Instantly scaffold tickets for an Epic.")
    parser.add_argument("--epic", required=True, help="The name of the epic folder (e.g. 'epic-014-new-feature')")
    parser.add_argument("--tickets", required=True, nargs="+", help="List of 'ID:Title' strings. Example: '55:Create login screen' '56:Add auth endpoints'")
    args = parser.parse_args()

    # Determine project root dynamically
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, "..")) if os.path.basename(script_dir) == ".agent" else script_dir
    
    epic_path = os.path.join(project_root, "project-management", "epics", args.epic)
    
    if not os.path.exists(epic_path):
        print(f"Epic folder not found: {epic_path}")
        print("Creating it now based on epic_template...")
        template_path = os.path.join(project_root, "project-management", "epics", "epic_template")
        if os.path.exists(template_path):
            try:
                # Copy epic template but skip the generic 'tickets' folder to avoid junk
                shutil.copytree(template_path, epic_path, ignore=shutil.ignore_patterns('tickets'))
                os.makedirs(os.path.join(epic_path, "tickets"), exist_ok=True)
                print(f"Created epic folder: {args.epic}")
            except Exception as e:
                print(f"Failed to copy template: {e}")
                exit(1)
        else:
             print(f"Error: Could not find epic template at {template_path}")
             exit(1)

    print(f"Scaffolding tickets for {args.epic}...")
    
    for ticket_data in args.tickets:
        try:
            # Parse format "ID:Title with spaces"
            parts = ticket_data.split(":", 1)
            ticket_id = int(parts[0])
            title = parts[1].strip()
            create_ticket(epic_path, ticket_id, title)
        except Exception as e:
            print(f"Failed to parse ticket input '{ticket_data}'. Expected format 'ID:Title'. Error: {e}")

    print("Scaffolding complete.")

if __name__ == "__main__":
    main()
