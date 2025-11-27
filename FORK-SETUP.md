# Post-Fork Setup Guide

> **Quick Start**: After forking/cloning, run `npm run setup` to initialize your corporate minute book.

## Prerequisites

- Node.js 18 or later
- Git with Git LFS installed
- Your corporation's incorporation documents (PDFs or screenshots)

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
- Populate `secretary-context.json` for AI agents
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

4. Update `secretary-context.json`:
   - Set `initialized` to `true`
   - Fill in `corporation` object with your details

5. Add your initial director to `03-registers/directors-register.csv`

## Configuring AI Secretary

For AI agents (e.g., Cursor background agents):

1. Point the agent to `secretary-context.json` as the primary context file
2. Use `SECRETARY.md` for detailed operational instructions
3. Reference `WORKFLOWS.md` for specific task procedures

Example system prompt:
```
You are the corporate secretary for [Corporation Name].
Load secretary-context.json for structured repository context.
Follow SECRETARY.md for operational guidelines.
Use WORKFLOWS.md for step-by-step procedures.
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
