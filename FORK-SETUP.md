# Post-Fork Setup Guide

> **Quick Start**: After forking/cloning, run `npm run setup` to initialize your AI-powered corporate minute book.

## Prerequisites

- Node.js 18 or later
- Git with Git LFS installed
- Your corporation's incorporation documents (PDFs or screenshots)
- An AI agent tool: Cursor, Claude Code, or any `AGENTS.md`-compatible tool (recommended)

## Setup Steps

### 1. Clone or Fork

```bash
# Clone (or use "Use this template" on GitHub)
git clone [your-fork-url]
cd [your-repo-name]
```

### 2. Run Setup Script

**Interactive mode:**
```bash
npm run setup
```

**Or with a config file (for automation):**
```bash
# Create config file
cat > corp-config.json << 'EOF'
{
  "name": "Your Corporation Inc.",
  "federalNumber": "1234567-8",
  "provincialNumber": "ON-9876543",
  "incorporationDate": "2025-01-15",
  "fiscalYearEnd": "December 31",
  "registeredAddress": "123 Main St, Toronto ON M5V 1A1",
  "initialDirector": {
    "name": "Director Name",
    "address": "456 Oak Ave, Toronto ON M4M 2B2"
  }
}
EOF

npm run setup -- --config corp-config.json
```

The setup wizard will:
- Ask for your corporation details (name, numbers, address, initial director)
- Archive template-only files
- Generate a secretary-focused README
- Create `CORPORATION.md` with your details
- Populate `AGENTS.md` with your corporation context (AI entry point)
- Populate `secretary-context.json` with structured context for AI agents
- Initialize the directors register

### 3. Add Incorporation Documents

After setup, add your incorporation documents:

```bash
# Add to the binary artifacts folder
cp path/to/articles-of-incorporation.pdf 09-binary-artifacts/01-formation/
cp path/to/certificate-of-incorporation.pdf 09-binary-artifacts/01-formation/
cp path/to/ontario-registration.pdf 09-binary-artifacts/01-formation/

# If you have screenshots instead of PDFs
cp path/to/screenshot.png 09-binary-artifacts/01-formation/
```

### 4. Commit Initial State

```bash
git add -A
git commit -m "[corp] Initialize minute book for [Your Corporation Name]"
```

### 5. Set Up Branch Protection (Recommended)

On GitHub, configure branch protection for `main`:
- Require pull request reviews
- Require review from CODEOWNERS (directors)
- Restrict direct pushes

## What the Setup Script Does

| Action | Result |
|--------|--------|
| Archives `MAINTAINERS.md` | Moved to `.template-archive/` |
| Archives `FORK-SETUP.md` | Moved to `.template-archive/` |
| Archives `.template-repo` | Moved to `.template-archive/` |
| Archives original `README.md` | Saved as `.template-archive/README.template.md` |
| Generates new `README.md` | Secretary-focused for your corporation |
| Creates `CORPORATION.md` | Filled with your corporation details |
| Populates `AGENTS.md` | AI agent instructions with your corporation context |
| Updates `secretary-context.json` | AI-ready structured context |
| Updates directors register | Adds initial director |
| Creates `.initialized` marker | Prevents accidental re-initialization |

## Manual Setup (Alternative)

If you prefer not to use the setup script:

1. Delete these files:
   - `MAINTAINERS.md`
   - `FORK-SETUP.md`
   - `.template-repo`

2. Edit `README.md` to focus on your corporation

3. Fill in `CORPORATION.md` with your details

4. Replace `AGENTS.md` with secretary-focused content:
   - The template contains maintainer instructions (not relevant for your corporation)
   - Copy the secretary-focused content from `setup.mjs` (`generateAgentsFile` function)
   - Replace `[Corporation Name]` with your corporation's legal name
   - Replace `[Corporation Number]` with your federal corporation number

5. Update `secretary-context.json`:
   - Set `initialized` to `true`
   - Fill in `corporation` object with your details

6. Add your initial director to `03-registers/directors-register.csv`

## Using Your AI Secretary

After setup, your repository is ready for AI-powered corporate governance.

### How Context Loading Works

`AGENTS.md` serves as the **primary entry point** for AI agents. It's designed to be auto-discovered and provides instructions that guide the agent to progressively load additional context as needed:

```
AGENTS.md (entry point - always loaded first)
    ↓ instructs agent to load
secretary-context.json (structured data: folders, templates, registers, workflows)
    ↓ references for details
CORPORATION.md (entity-specific: name, numbers, addresses)
SECRETARY.md (operational guide: procedures, conventions)
WORKFLOWS.md (task procedures: step-by-step instructions)
```

This **lazy loading approach** means agents only load what they need for their current task, rather than consuming all context upfront.

### Automatic Discovery (Recommended)

AI tools supporting the `AGENTS.md` standard will automatically discover and follow these instructions:

| Tool | How It Works |
|------|--------------|
| **Cursor** | Opens repo, auto-reads `AGENTS.md`, follows context chain |
| **Claude Code** | Opens repo, auto-reads `AGENTS.md`, follows context chain |
| **Other agents** | Point to `AGENTS.md` as primary entry point |

### Context Files Reference

| File | Purpose | When Loaded |
|------|---------|-------------|
| `AGENTS.md` | Entry point with role definition and instructions | Always (auto-discovered) |
| `secretary-context.json` | Machine-readable structure, schemas, workflows | For any corporate task |
| `CORPORATION.md` | Corporation name, numbers, addresses | When entity details needed |
| `SECRETARY.md` | Detailed operational guidance | For complex procedures |
| `WORKFLOWS.md` | Step-by-step task procedures | For specific corporate actions |

### Manual Configuration

For agents without `AGENTS.md` support, provide this system prompt:

```
You are the corporate secretary for [Corporation Name].

Start by reading AGENTS.md for your role and instructions.
Load secretary-context.json for structured repository context.
Reference CORPORATION.md for entity-specific details.
Follow SECRETARY.md for operational guidelines.
Use WORKFLOWS.md for step-by-step procedures.

Load context progressively based on the task at hand.
```

## First Corporate Actions

After setup, typical first actions are:

1. **Create organizational resolution** - Adopt bylaws, appoint officers, authorize shares
2. **Appoint officers** - CEO, Secretary, etc.
3. **Issue founder shares** - Initial equity to founders
4. **Set up banking** - Banking resolution for account opening

See `WORKFLOWS.md#initial-setup` for detailed procedures.

## Keeping Up with Template Updates

This fork won't automatically receive template updates. To check for updates:

```bash
# Add upstream remote (one time)
git remote add upstream [original-template-url]

# Fetch updates
git fetch upstream

# Review changes
git diff main upstream/main -- VERSION

# If desired, merge specific files (carefully)
git checkout upstream/main -- path/to/updated/template
```

**Note**: Only update template files (those starting with `_`). Never overwrite your corporate data.

## Troubleshooting

### "Repository already initialized"

The `.initialized` marker exists. To reinitialize:
```bash
rm .initialized
npm run setup
```

### Setup script not found

Ensure you have Node.js 18+ installed:
```bash
node --version  # Should be v18.0.0 or higher
```

### Need to validate state

```bash
npm run validate
```

This checks for missing files and reports issues.

---

*Delete this file after completing setup, or find it archived in `.template-archive/` after running `npm run setup`.*
