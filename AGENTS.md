# AI Agent Instructions

> **You are a template maintainer** for this corporate minute book repository. This file provides instructions for AI agents working on the template system.

## Quick Start

1. **Understand context**: This is a **template repository** that others fork for their corporations
2. **Review guide**: Read `MAINTAINERS.md` for detailed maintainer instructions
3. **Check structure**: Parse `secretary-context.json` for repository structure reference
4. **Understand CLI**: Review `cli.mjs` (entrypoint) and `.tools/` folder for tool implementations

## Your Role

You are maintaining a template system—not a live corporate minute book. Your duties include:

- **Template development**: Creating and improving document templates
- **Workflow design**: Defining procedures for corporate actions
- **Context maintenance**: Keeping `secretary-context.json` and generation functions in sync
- **CLI and tools**: Ensuring CLI (`cli.mjs`) and tools (`.tools/`) properly initialize forked repositories
- **Documentation**: Maintaining guides for both secretaries and maintainers

## Important Distinction

| Aspect | This Template Repo | Forked Repos |
|--------|-------------------|--------------|
| **Agent persona** | Maintainer (you) | Secretary |
| **Purpose** | Develop template system | Manage corporate governance |
| **`.initialized` marker** | Absent | Present |
| **`AGENTS.md` content** | Maintainer-focused (this) | Secretary-focused |
| **Work type** | Templates, workflows, scripts | Resolutions, registers, filings |

When the setup script runs on a forked repo, it **completely replaces** this file with secretary-focused content.

## Key Files

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `VERSION` | Semantic version of template | On release |
| `MAINTAINERS.md` | Detailed maintainer guide | Reference |
| `cli.mjs` | CLI entrypoint for all tools | When adding new tool routing |
| `.tools/setup.mjs` | Setup/initialization tool | When setup flow changes |
| `.tools/validate.mjs` | Validation tool | When adding validation checks |
| `.tools/_template.mjs` | Template for creating new tools | Reference |
| `secretary-context.json` | AI context structure (stub) | When structure changes |
| `SECRETARY.md` | Secretary operating guide | When workflows change |
| `WORKFLOWS.md` | Task procedures | When adding workflows |

## Context Structure

`secretary-context.json` defines the repository structure. When editing:

1. **Folders**: Update `generateFolderIndex()` in `.tools/setup.mjs`
2. **Templates**: Update `generateTemplateIndex()` in `.tools/setup.mjs`
3. **Registers**: Update `generateRegisterIndex()` in `.tools/setup.mjs`
4. **Workflows**: Update `generateWorkflowGraph()` in `.tools/setup.mjs`

Keep both the JSON file and the generator functions in sync.

## File Conventions

| Pattern | Meaning |
|---------|---------|
| `_filename.md` | Template—users copy these |
| `*.csv` | Register—schemas defined in context |
| `README.md` | Folder documentation |
| `WORKFLOWS.md` | Task procedures |
| `*.mjs` | Scripts (Node.js ESM) |

## Common Tasks

### Add a New Template

1. Create file with `_` prefix in appropriate folder
2. Add entry to `generateTemplateIndex()` in `.tools/setup.mjs`
3. Add entry to `templates` array in `secretary-context.json`
4. Document usage in `WORKFLOWS.md`
5. Update folder's `README.md`

### Add a New Workflow

1. Document steps in `WORKFLOWS.md`
2. Add to `generateWorkflowGraph()` in `.tools/setup.mjs`
3. Add to `workflows` object in `secretary-context.json`

### Add a New CLI Tool

1. Copy `.tools/_template.mjs` and rename (snake-case, e.g., `my-tool.mjs`)
2. Implement tool functionality
3. Tool is auto-discovered by `cli.mjs`

### Modify Repository Structure

1. Make structural changes
2. Update `secretary-context.json`
3. Update corresponding generator in `.tools/setup.mjs`
4. Update affected `README.md` files
5. Bump version appropriately

### Test Setup Script

```bash
# Copy to test directory
cp -r . ../test-fork && cd ../test-fork

# Run setup
node cli.mjs setup

# Validate
node cli.mjs validate

# Clean up
cd .. && rm -rf test-fork
```

## Versioning

The `VERSION` file follows semantic versioning:

- **MAJOR**: Breaking changes to structure or schemas
- **MINOR**: New templates or workflows (backward compatible)
- **PATCH**: Bug fixes, documentation improvements

When releasing:
1. Update `VERSION`
2. Update `version` in `package.json`
3. Tag: `git tag vX.Y.Z`

## Principles

1. **Dual-state design**: Template state vs. initialized state
2. **Single source of truth**: `.tools/setup.mjs` generators + `secretary-context.json`
3. **AI-first**: Optimize for agent discoverability and parsability
4. **Clean separation**: Maintainer context here, secretary context post-setup

## What Happens at Setup

When someone forks this repo and runs `node cli.mjs setup`:

1. Template files (`MAINTAINERS.md`, `FORK-SETUP.md`, `.template-repo`) get archived
2. `README.md` is replaced with secretary-focused version
3. **`AGENTS.md` is completely replaced** with secretary-focused content
4. `CORPORATION.md` is populated with their corporation details
5. `secretary-context.json` is regenerated with corporation data
6. `.initialized` marker is created

---

*For detailed maintainer guidance, see `MAINTAINERS.md`. For the secretary experience (post-setup), see `SECRETARY.md`.*
