# Corporate Minute Book Template

A Git-based template for managing your corporation's minute book—the official record of governance documents, resolutions, and corporate registers.

**Built for AI-assisted corporate governance.** Fork this repository and let an AI agent handle the paperwork while you focus on building your business.

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

### 1. Fork This Repository

Click **"Use this template"** or fork directly:

```bash
gh repo create my-company-minute-book --template [this-repo-url]
cd my-company-minute-book
```

### 2. Initialize Your Corporation

Follow the setup guide:

```bash
# Review setup instructions
cat FORK-SETUP.md

# Remove template-only files
rm MAINTAINERS.md .template-repo

# Customize for your corporation
# Edit README.md, populate registers, add formation docs
```

### 3. Start Managing Corporate Actions

See `WORKFLOWS.md` for step-by-step guides to common tasks:
- Recording board resolutions
- Adding directors and officers
- Issuing shares
- Annual compliance filings

---

## Using with AI Agents

This template is designed for AI-assisted corporate governance. Point your AI agent to `SECRETARY.md` and it will understand how to:

- Navigate the repository structure
- Find and use the right templates
- Update registers correctly
- Follow proper Git workflows
- Maintain compliance

### Cursor Background Agent

```
You are the corporate secretary for [Company Name].
Read SECRETARY.md for your role and instructions.
Use WORKFLOWS.md for step-by-step task guidance.
```

### Key Files for AI Context

| File | Purpose |
|------|---------|
| `SECRETARY.md` | Primary AI instructions and orientation |
| `WORKFLOWS.md` | Task-by-task procedures |
| `99-meta/governance-process.md` | PR and approval workflows |

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
| [SECRETARY.md](SECRETARY.md) | AI agents, human secretaries | Operating the minute book |
| [WORKFLOWS.md](WORKFLOWS.md) | Anyone doing corporate actions | Step-by-step procedures |
| [FORK-SETUP.md](FORK-SETUP.md) | New users | Post-fork initialization |
| [MAINTAINERS.md](MAINTAINERS.md) | Template contributors | Improving this template |

---

## Contributing

Improvements to templates, documentation, and structure are welcome! See `MAINTAINERS.md` for contribution guidelines.

---

## License

This template repository is provided as-is for organizational purposes. Templates do not constitute legal advice. Consult qualified legal counsel for corporate matters.
