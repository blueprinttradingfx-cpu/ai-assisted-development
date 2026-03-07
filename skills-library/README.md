# Tita Chi Skills Library

A curated collection of reusable patterns, best practices, and implementation guides for AI-assisted development.

## Overview

The Skills Library provides AI agents with proven patterns for common development tasks. Each skill is a documented pattern that agents can search, reference, and apply during execution.

## Architecture

```
skills-library/
├── AVAILABLE_SKILLS.md           # Master index of all skills
├── README.md                       # This file
├── api-patterns/                   # API design patterns
├── authentication/                 # Auth patterns
├── database/                      # Database patterns
├── error-handling/               # Error handling patterns
├── flutter/                      # Flutter-specific patterns
├── forms/                        # Form handling patterns
├── python-fastapi/               # FastAPI patterns
├── state-management/            # State management patterns
├── testing/                      # Testing patterns
├── ui-components/                # UI component patterns
└── validation/                 # Validation patterns
```

## Skill Format

Each skill follows a standard format:

```markdown
# SKILL: [Name]

## Metadata
- **Category**: [category]
- **Scope**: [layer]
- **Difficulty**: [Simple/Medium/Complex]
- **Last Updated**: [date]
- **Effectiveness**: [High/Medium/Low] (tracked by Learning Layer)

## Problem
[What problem does this solve?]

## Solution Overview
[High-level approach]

## Implementation

### Files to Create
| File | Purpose | Layer |
|------|---------|-------|
| [path] | [description] | [ui/service/model] |

### Code Pattern
```[language]
[Code example showing the pattern]
```

### Key Principles
1. [Principle 1]
2. [Principle 2]

## Variations

### Variation A: [Name]
[When to use, differences from main pattern]

### Variation B: [Name]
[When to use, differences from main pattern]

## Integration

### With Other Skills
- [Skill name]: [How they work together]

### Dependencies
- [What must exist first]

## Examples

### Example 1: [Scenario]
[Concrete implementation example]

### Example 2: [Scenario]
[Concrete implementation example]

## Common Mistakes
- [Mistake 1]: [Why it's wrong, how to avoid]
- [Mistake 2]: [Why it's wrong, how to avoid]

## Validation Checklist
- [ ] [Specific check 1]
- [ ] [Specific check 2]

## References
- [Links to related skills]
- [Links to external resources]

## Success Metrics
- [Metric 1]: [How measured]
- [Metric 2]: [How measured]
```

## Usage by Agents

### Researcher Agent
```
Searches skills for:
- Exact pattern matches
- Layer-specific patterns
- Tech-specific patterns
- Historical solutions
```

### Planner Agent
```
Uses skills to:
- Find implementation patterns
- Estimate complexity
- Define file scope
- Identify dependencies
```

### Executor Agent
```
Applies skills to:
- Follow proven patterns
- Avoid common mistakes
- Ensure validation
- Maintain consistency
```

## Adding New Skills

When an agent discovers a useful pattern during execution:

1. **Identify the pattern**: What solved the problem?
2. **Document it**: Create skill file using template
3. **Categorize it**: Place in appropriate directory
4. **Index it**: Add to AVAILABLE_SKILLS.md
5. **Version it**: Git commit with descriptive message

### Auto-Extraction (Future)

The Learning Layer can suggest skill extraction:

```typescript
// When ticket completes successfully
if (learningLayer.shouldExtractSkill(ticketId)) {
  suggestSkillExtraction({
    pattern: extractPatternFromCode(),
    context: ticketContext,
    effectiveness: telemetry.effectivenessScore
  });
}
```

## Skill Search

Agents search skills using:

```typescript
// Search by keyword
skills.search({
  query: "flutter form validation",
  layer: "ui",
  tech: "flutter",
  limit: 5
});

// Search by category
skills.getByCategory("authentication");

// Search by effectiveness
skills.getMostEffective("api-patterns", 3);
```

## Versioning

Skills are versioned using Git:

```bash
# View skill history
git log --oneline skills-library/authentication/JWT_AUTH.md

# Rollback skill
git checkout [commit] -- skills-library/authentication/JWT_AUTH.md

# Compare versions
git diff HEAD~1 -- skills-library/authentication/JWT_AUTH.md
```

## Effectiveness Tracking

The Learning Layer tracks skill effectiveness:

```json
{
  "skill": "flutter-state-management",
  "applications": 15,
  "success_rate": 0.87,
  "avg_implementation_time": "4.2 hours",
  "common_issues": ["async initialization", "dispose handling"],
  "last_used": "2024-01-15"
}
```

Skills with low effectiveness are flagged for review.

## Comparison with Fire-Flow

| Feature | Tita Chi Skills | Fire-Flow Skills |
|---------|-----------------|------------------|
| Structure | Category-based | Category-based |
| Format | Markdown + Metadata | Markdown |
| Search | Keyword + Layer + Tech | Keyword |
| Effectiveness Tracking | Learning Layer integration | Usage analytics |
| Auto-Extraction | Learning Layer suggests | Manual or pattern detection |
| Versioning | Git | Git |

## Future Enhancements

### Phase 2: Semantic Search
- Vector embeddings for skills
- Natural language queries
- Similarity matching

### Phase 3: Skill Composition
- Skills that reference other skills
- Skill templates with parameters
- Conditional skill application

### Phase 4: Skill Marketplace
- Import skills from community
- Export project-specific skills
- Skill ratings and reviews

## Integration with Agent System

```
┌────────────────────────────────────────┐
│         Agent Needs Pattern            │
└─────────────────┬──────────────────────┘
                  │
                  ↓
┌────────────────────────────────────────┐
│      Skills Library Search             │
│  - Keyword match                       │
│  - Layer filter                        │
│  - Tech filter                         │
│  - Effectiveness sort                  │
└─────────────────┬──────────────────────┘
                  │
                  ↓
┌────────────────────────────────────────┐
│      Agent Applies Skill               │
│  - Follows implementation guide        │
│  - Uses validation checklist           │
│  - Records effectiveness               │
└────────────────────────────────────────┘
```

## Quick Start

### For Agents

```markdown
When you need a pattern:

1. Check AVAILABLE_SKILLS.md for relevant category
2. Read skill files in that category
3. Select best match based on:
   - Relevance to task
   - Effectiveness rating
   - Layer compatibility
   - Tech stack match
4. Apply the pattern
5. Record results for Learning Layer
```

### For Humans

```bash
# List all skills
cat skills-library/AVAILABLE_SKILLS.md

# Find skills for flutter
grep -r "flutter" skills-library/ --include="*.md"

# Add new skill
cp skills-library/TEMPLATE.md skills-library/category/NEW_SKILL.md
# Edit, then commit: git add . && git commit -m "Add skill: NEW_SKILL"
```
