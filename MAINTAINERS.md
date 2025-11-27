# Template Repository Maintainers Guide

> **Your Role**: You are developing and maintaining this template repository that others will fork for their corporations.

## Quick Reference

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `VERSION` | Semantic version of template | On release |
| `AGENTS.md` | AI agent discovery/instructions | When agent behavior changes |
| `secretary-context.json` | AI agent context (stub) | When structure changes |
| `setup.mjs` | Initialization script | When setup flow changes |
| `SECRETARY.md` | Secretary operating guide | When workflows change |
| `WORKFLOWS.md` | Task procedures | When adding/changing workflows |

## Context: Template vs. Forked Repos

| Aspect | Template Repo | Forked Repo |
|--------|---------------|-------------|
| **State** | Uninitialized | Initialized |
| **`.initialized` marker** | Absent | Present |
| **`AGENTS.md`** | Generic placeholders | Populated with corporation name/number |
| **`secretary-context.json`** | Stub (nulls) | Populated |
| **`CORPORATION.md`** | Placeholder | Filled in |
| **`README.md`** | GitHub-focused | Secretary-focused |
| **`MAINTAINERS.md`** | Present | Archived |
| **`FORK-SETUP.md`** | Present | Archived |

## Versioning Strategy

### Semantic Versioning

The `VERSION` file contains the current template version:

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes to structure, workflows, or register schemas
- **MINOR**: New templates, workflows, or features (backward compatible)
- **PATCH**: Bug fixes, documentation improvements

### Version Bump Checklist

1. Update `VERSION` file
2. Update `version` in `package.json`
3. Update `version` in `secretary-context.json`
4. Document changes in release notes
5. Tag release: `git tag v1.2.3`

### Breaking Changes

If you make breaking changes:
1. Document migration steps
2. Consider providing a migration script
3. Update setup.mjs if initialization flow changes

## Secretary Context File

### Purpose

`secretary-context.json` provides AI agents with structured context:
- Folder index with descriptions
- Template paths and categories
- Register schemas
- Workflow graphs with dependencies
- Naming conventions
- Compliance deadlines

### Maintaining the Context File

The context file exists in two states:

1. **Template state** (in this repo): Stub with `initialized: false` and null corporation data
2. **Initialized state** (after setup): Populated with specific corporation data

When you change repository structure:

1. Update `secretary-context.json` (the stub)
2. Update the generation functions in `setup.mjs`:
   - `generateFolderIndex()`
   - `generateTemplateIndex()`
   - `generateRegisterIndex()`
   - `generateWorkflowGraph()`
3. Ensure both sources match

### Adding New Templates

1. Create the template file with `_` prefix
2. Add entry to `templates` array in `secretary-context.json`
3. Add entry to `generateTemplateIndex()` in `setup.mjs`
4. Update `WORKFLOWS.md` with usage instructions
5. Update folder README with reference

### Adding New Registers

1. Create CSV file with header row
2. Add schema to `03-registers/README.md`
3. Add entry to `registers` array in `secretary-context.json`
4. Add entry to `generateRegisterIndex()` in `setup.mjs`

### Adding New Workflows

1. Document in `WORKFLOWS.md`
2. Add to `workflows` object in `secretary-context.json`
3. Add to `generateWorkflowGraph()` in `setup.mjs`

## Setup Script

### How It Works

`setup.mjs` transforms a forked repo from template state to initialized state:

```
Template State                    Initialized State
─────────────────                 ─────────────────
README.md (GitHub-focused)   →    README.md (secretary-focused)
MAINTAINERS.md               →    .template-archive/MAINTAINERS.md
FORK-SETUP.md                →    .template-archive/FORK-SETUP.md
.template-repo               →    .template-archive/.template-repo
secretary-context.json (stub) →   secretary-context.json (populated)
CORPORATION.md (placeholder) →    CORPORATION.md (filled)
directors-register.csv (empty) →  directors-register.csv (initial director)
(no marker)                  →    .initialized
```

### Testing Setup Script

```bash
# Create test directory
cp -r . ../test-fork
cd ../test-fork

# Run setup
npm run setup

# Validate
npm run validate

# Clean up
cd .. && rm -rf test-fork
```

### Modifying Setup Script

Key functions to modify:

| Function | Purpose |
|----------|---------|
| `generateFolderIndex()` | Folder descriptions |
| `generateTemplateIndex()` | Template list |
| `generateRegisterIndex()` | Register list |
| `generateWorkflowGraph()` | Workflow definitions |
| `generateSecretaryReadme()` | Post-setup README |
| `generateCorporationFile()` | CORPORATION.md content |
| `interactiveSetup()` | Setup wizard flow |

## File Type Conventions

| Type | Naming | Example | Edit in Fork? |
|------|--------|---------|---------------|
| Templates | `_*.md` | `_board-resolution-template.md` | Copy, don't edit |
| Registers | `*.csv` | `directors-register.csv` | Yes |
| Guides | `README.md` | `03-registers/README.md` | Rarely |
| Entry Points | `SECRETARY.md`, etc. | Root level | Reference only |
| Config | `*.json` | `secretary-context.json` | Via setup script |

## Contributing Workflow

### Adding a Feature

1. Create feature branch: `git checkout -b feature/description`
2. Make changes
3. Update relevant documentation
4. Update `secretary-context.json` if structure changed
5. Test with `npm run validate`
6. Open PR with description

### Updating Templates

1. Edit template file (with `_` prefix)
2. Update folder README if needed
3. Update `WORKFLOWS.md` if usage changed
4. Bump PATCH version

### Changing Structure

1. Update folder/file structure
2. Update `secretary-context.json`
3. Update `setup.mjs` generation functions
4. Update all affected READMEs
5. Update `SECRETARY.md` if needed
6. Bump MINOR or MAJOR version

## Quality Checklist

Before releasing:

- [ ] All template files have `_` prefix
- [ ] `secretary-context.json` matches actual structure
- [ ] `setup.mjs` generates matching context
- [ ] All internal links work
- [ ] Navigation breadcrumbs present in READMEs
- [ ] `WORKFLOWS.md` covers all templates
- [ ] `npm run validate` passes
- [ ] Version updated in `VERSION`, `package.json`, `secretary-context.json`

## Repository Architecture

```
/
├── setup.mjs                    # Initialization script
├── package.json                 # Script runner
├── VERSION                      # Semantic version
├── secretary-context.json       # AI context (stub)
├── secretary-context.schema.json # JSON schema
│
├── AGENTS.md                    # AI agent discovery (primary)
├── README.md                    # For GitHub visitors
├── SECRETARY.md                 # Operational guide (AI + human)
├── WORKFLOWS.md                 # Task procedures
├── CORPORATION.md               # Corp details (placeholder)
├── MAINTAINERS.md               # This file
├── FORK-SETUP.md                # Setup instructions
│
├── .template-repo               # Template marker
├── .gitattributes               # Git LFS config
│
├── 01-09 folders/               # Corporate structure
└── 99-meta/                     # Meta documentation
```

## Testing Personas

When making changes, verify experience for all personas:

### 1. GitHub Visitor (evaluating)
- Does README.md clearly explain AI-first value proposition?
- Is the setup process clear?
- Is it obvious this is designed for AI agents?

### 2. New User (setting up)
- Does `npm run setup` work smoothly?
- Are error messages helpful?
- Is the path to AI agent usage clear?

### 3. AI Agent Secretary (primary operating persona)
- Does `AGENTS.md` provide clear discovery instructions?
- Does `secretary-context.json` provide sufficient context?
- Are workflows machine-parseable?
- Can an agent execute common tasks autonomously?

### 4. Human Secretary (alternative operating persona)
- Can they find the right workflow in `WORKFLOWS.md`?
- Are template placeholders clear?
- Does `SECRETARY.md` provide adequate guidance?

### 5. Maintainer (this persona)
- Is it clear what to update when making changes?
- Are there single sources of truth?
- Is `AGENTS.md` kept in sync with `secretary-context.json`?

---

**Questions?** Open an issue or discussion on the repository.
