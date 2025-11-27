# Corporate Minute Book Template

A Git-based template for managing your corporation's minute book—the official record of governance documents, resolutions, and corporate registers.

**Built for AI-assisted corporate governance.** Fork this repository, run the setup script, and let an AI agent handle the paperwork while you focus on building your business.

[![Template Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](VERSION)

---

## Why Git for Corporate Records?

| Traditional Minute Book | Git-Based Minute Book |
|------------------------|----------------------|
| Paper binders or scattered PDFs | Single source of truth |
| Manual version tracking | Immutable audit trail |
| Email-based approvals | PR-based review workflow |
| Hard to search | Full-text searchable |
| Single point of failure | Distributed backup |
| Human-only maintenance | AI-automatable |

## What's Included

```
├── 01-formation/           # Incorporation docs, bylaws
├── 02-constating-documents/ # Policies, shareholder agreements
├── 03-registers/           # Directors, officers, shareholders (CSV)
├── 04-meetings-and-resolutions/ # Board & shareholder minutes
├── 05-capitalization/      # Cap table, share issuances, ESOP
├── 06-regulatory-filings/  # Government filings
├── 07-finance-and-tax/     # Financial governance
├── 08-commercial-and-ip/   # Contracts, IP, HR
├── 09-binary-artifacts/    # Signed PDFs (Git LFS)
└── Templates for every common corporate action
```

---

## Quick Start

### 1. Fork or Clone This Repository

```bash
# Using GitHub CLI
gh repo create my-company-minute-book --template [this-repo-url]
cd my-company-minute-book

# Or clone directly
git clone [this-repo-url] my-company-minute-book
cd my-company-minute-book
```

### 2. Run the Setup Script

```bash
npm run setup
```

The interactive setup will:
- Ask for your corporation details (name, numbers, address)
- Generate a secretary-focused README
- Create `CORPORATION.md` with your details
- Initialize `secretary-context.json` for AI agents
- Archive template-only files

### 3. Add Your Incorporation Documents

```bash
# Add PDFs/screenshots from Corporations Canada and Ontario
cp path/to/incorporation-docs/* 09-binary-artifacts/01-formation/
```

### 4. Start Managing Corporate Actions

See `WORKFLOWS.md` for step-by-step guides to common tasks:
- Recording board resolutions
- Adding directors and officers
- Issuing shares
- Annual compliance filings

---

## Using with AI Agents

This template is designed for AI-assisted corporate governance. After running setup, the repository provides structured context optimized for AI agents.

### Key Files for AI Context

| File | Purpose |
|------|---------|
| `secretary-context.json` | **Machine-readable** index of folders, templates, registers, workflows |
| `SECRETARY.md` | Detailed instructions and orientation |
| `WORKFLOWS.md` | Step-by-step task procedures |
| `CORPORATION.md` | Corporation-specific details |

### Cursor Background Agent

Example system prompt:
```
You are the corporate secretary for [Company Name].
Load secretary-context.json for structured repository context.
Follow SECRETARY.md for operational guidelines.
Use WORKFLOWS.md for step-by-step procedures.
```

### What `secretary-context.json` Provides

- **Folder index**: All folders with descriptions
- **Template list**: All templates with paths and categories
- **Register schemas**: CSV column definitions
- **Workflow graph**: Tasks with dependencies
- **Conventions**: Naming patterns, date formats, branch prefixes
- **Compliance deadlines**: Key regulatory dates

---

## Manual Usage

Don't want AI assistance? The template works great for human secretaries too:

1. **Find the workflow** in `WORKFLOWS.md`
2. **Copy the template** (files starting with `_`)
3. **Fill in the placeholders** (marked with `[BRACKETS]`)
4. **Create a PR** for review and approval
5. **Update registers** as needed

---

## Repository Conventions

### Template Files
All templates are prefixed with `_` (e.g., `_board-resolution-template.md`). Copy them—don't edit the originals.

### Naming Conventions
- **Resolutions**: `RYYYY-NN-slug.md` (e.g., `R2025-03-appoint-cfo.md`)
- **Meetings**: `YYYY-MM-DD-slug/` (e.g., `2025-03-15-q1-board-meeting/`)
- **Dates**: Always ISO format (YYYY-MM-DD)

### Branch Naming
```
corp/add-director-smith-2025-03
corp/issuance-seed-round-2025-04
corp/meeting-board-2025-03-15
```

### Registers
CSV files in `03-registers/` are the authoritative records. Every change must reference an authorizing resolution.

---

## Jurisdiction

This template is designed for **Canadian federal corporations** (CBCA) with **Ontario** extra-provincial registration. Adapt as needed for your jurisdiction.

Templates are **not legal advice**—consult qualified counsel for your specific situation.

---

## Documentation

| Document | Audience | Purpose |
|----------|----------|---------|
| [FORK-SETUP.md](FORK-SETUP.md) | New users | Setup instructions |
| [SECRETARY.md](SECRETARY.md) | AI agents, human secretaries | Operating guide |
| [WORKFLOWS.md](WORKFLOWS.md) | Anyone doing corporate actions | Step-by-step procedures |
| [CORPORATION.md](CORPORATION.md) | Reference | Corporation-specific details |
| [MAINTAINERS.md](MAINTAINERS.md) | Template contributors | Improving this template |

## Requirements

- **Node.js**: 18 or later (for setup script)
- **Git LFS**: For binary artifacts (PDFs, scans)
- **Git**: Standard version control

---

## Contributing

Improvements to templates, documentation, and structure are welcome! See `MAINTAINERS.md` for contribution guidelines.

---

## Versioning

This template uses semantic versioning. Check `VERSION` for the current version. When updating a fork:

```bash
git fetch upstream
git diff main upstream/main -- VERSION  # Check for updates
```

---

## License

This template repository is provided as-is for organizational purposes. Templates do not constitute legal advice. Consult qualified legal counsel for corporate matters.
