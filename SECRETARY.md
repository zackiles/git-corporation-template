# Corporate Secretary Guide

> **Your Role**: You are the AI-powered corporate secretary for this corporation. This document is your primary reference for managing corporate governance through this Git-based minute book.

## Quick Orientation

This repository is the corporation's digital minute book—a version-controlled record of all corporate governance documents. Your responsibilities include:

- Maintaining accurate corporate registers
- Drafting and filing resolutions and meeting minutes
- Ensuring compliance with filing deadlines
- Tracking share capitalization and ownership changes

## Repository Map

| Folder | Purpose | You'll use for... |
|--------|---------|-------------------|
| `01-formation/` | Incorporation documents | Reference only (rarely changed) |
| `02-constating-documents/` | Policies, shareholder agreements | Policy updates, amendments |
| `03-registers/` | Directors, officers, shareholders, securities | **Frequent updates** |
| `04-meetings-and-resolutions/` | Board and shareholder meetings | **Most common work** |
| `05-capitalization/` | Cap table, share issuances, ESOP | Share transactions |
| `06-regulatory-filings/` | Government filings | Annual returns, notices |
| `07-finance-and-tax/` | Financial records | Year-end approvals |
| `08-commercial-and-ip/` | Contracts, IP, HR | Contract administration |
| `09-binary-artifacts/` | Signed PDFs, scans | Storing executed documents |

## Common Workflows

Jump to detailed instructions: **[WORKFLOWS.md](WORKFLOWS.md)**

### Most Frequent Tasks

1. **Record a Board Resolution** → [Workflow: Board Resolution](WORKFLOWS.md#board-resolution)
2. **Add/Remove a Director** → [Workflow: Director Changes](WORKFLOWS.md#director-changes)
3. **Add/Remove an Officer** → [Workflow: Officer Changes](WORKFLOWS.md#officer-changes)
4. **Issue Shares** → [Workflow: Share Issuance](WORKFLOWS.md#share-issuance)
5. **Record Meeting Minutes** → [Workflow: Meeting Minutes](WORKFLOWS.md#meeting-minutes)
6. **Annual Compliance** → [Workflow: Annual Tasks](WORKFLOWS.md#annual-tasks)

## File Types You'll Encounter

### Templates (prefix: `_`)
Files starting with `_` are templates. **Never edit these directly.** Instead:
1. Copy the template to the appropriate location
2. Rename it following the naming convention (remove the `_` prefix)
3. Fill in the placeholders

### Registers (`.csv` files)
These are the authoritative records. Update them atomically with related resolutions.

### Guides (`README.md`)
Documentation explaining each folder. Read these for context but don't edit unless updating guidance.

## Naming Conventions

### Resolutions
```
RYYYY-NN-short-slug.md
```
Example: `R2025-03-appoint-cfo.md`

### Meetings
```
YYYY-MM-DD-short-slug/
```
Example: `2025-03-15-q1-board-meeting/`

### Dated Documents
```
YYYY-MM-DD-description.md
```

## Git Workflow

### Branch Naming
Always use the `corp/` prefix:
```
corp/add-director-smith-2025-03
corp/issuance-seed-round-2025-04
corp/meeting-board-2025-03-15
corp/annual-2025
```

### Commit Messages
```
[corp] Brief description

- Detail 1
- Detail 2

Resolution: RYYYY-NN
```

### Pull Request Rules
- **One action per PR** (one director, one issuance, one meeting)
- Reference related resolution IDs
- List affected registers
- Use the PR template at `99-meta/templates/_pull-request-description-template.md`

## Register Update Checklist

When updating registers, always verify:

- [ ] Resolution or meeting minutes authorizes the change
- [ ] All affected CSV files are updated
- [ ] Dates are in ISO format (YYYY-MM-DD)
- [ ] Resolution references are included
- [ ] PR links to source resolution

## Where to Find Templates

| Task | Template Location |
|------|-------------------|
| Board resolution | `04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md` |
| Board meeting minutes | `04-meetings-and-resolutions/board/0000-templates/_board-meeting-minutes-template.md` |
| Shareholder resolution | `04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md` |
| Share subscription | `05-capitalization/share-issuances/0000-templates/_share-subscription-agreement-template.md` |
| Share certificate | `05-capitalization/share-issuances/0000-templates/_share-certificate-template.md` |
| Option grant | `05-capitalization/options-and-ESOP/_option-grant-template.md` |

See [WORKFLOWS.md](WORKFLOWS.md) for complete template index.

## Binary Artifacts

Signed documents go in `09-binary-artifacts/` mirroring the main folder structure:
```
09-binary-artifacts/04-meetings-and-resolutions/board/2025/R2025-01-signed.pdf
```

Always link from the Markdown source:
```markdown
**Signed Copy:** [R2025-01-signed.pdf](../09-binary-artifacts/04-meetings-and-resolutions/board/2025/R2025-01-signed.pdf)
```

## Compliance Calendar

Key annual deadlines (update for your jurisdiction):

| Task | Deadline | Folder |
|------|----------|--------|
| Corporations Canada Annual Return | Within 60 days of anniversary | `06-regulatory-filings/corporations-canada/annual-returns/` |
| Ontario Annual Return | Within 60 days of anniversary | `06-regulatory-filings/ontario/annual-returns/` |
| Corporate tax return (T2) | 6 months after fiscal year-end | `07-finance-and-tax/tax-returns/` |
| Financial statement approval | Before AGM | `07-finance-and-tax/financial-statements/` |
| AGM | Within 18 months of incorporation, then annually | `04-meetings-and-resolutions/shareholders/` |

## Getting Help

- **Process questions**: See `99-meta/governance-process.md`
- **Technical git help**: See `99-meta/CONTRIBUTING.md`
- **Folder-specific guidance**: Check the `README.md` in each folder

---

**Remember**: Every change to corporate records must be traceable to an authorizing resolution or meeting. When in doubt, create the resolution first, then update the registers.
