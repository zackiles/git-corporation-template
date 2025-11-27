# Corporate Minute Book Template

**Your AI-powered corporate secretary.** Fork this repository and let an AI agent handle the paperwork—resolutions, registers, filings, and compliance—while you focus on building your business.

A Git-based minute book template designed for AI agents (Cursor, Claude Code, or any tool supporting `AGENTS.md`) to autonomously manage corporate governance for Canadian federal corporations.

[![Template Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](VERSION)

---

## Why an AI Corporate Secretary?

| Traditional Approach | AI Secretary Approach |
|---------------------|----------------------|
| Hire expensive legal admin | Fork a repo, run setup |
| Manual document drafting | AI generates from templates |
| Track deadlines in calendars | AI monitors compliance |
| Email-based approvals | PR-based review workflow |
| Paper binders or scattered PDFs | Searchable Git history |
| Single point of failure | Distributed, version-controlled |

**The AI secretary knows your corporation.** After setup, `secretary-context.json` provides complete context—entity details, folder structure, templates, register schemas, workflows, and compliance deadlines—enabling autonomous operation.

---

## Quick Start

### 1. Fork This Repository

```bash
# Using GitHub CLI
gh repo create my-company-minute-book --template [this-repo-url] --private
cd my-company-minute-book

# Or clone directly
git clone [this-repo-url] my-company-minute-book
cd my-company-minute-book
```

### 2. Run Setup

```bash
npm run setup
```

The setup wizard will:
- Ask for your corporation details (name, numbers, address)
- Generate `CORPORATION.md` with your entity information
- Populate `secretary-context.json` for AI agents
- Create `AGENTS.md` with agent instructions
- Initialize the directors register
- Archive template-only documentation

### 3. Add Incorporation Documents

```bash
cp path/to/incorporation-docs/* 09-binary-artifacts/01-formation/
```

### 4. Point Your AI Agent

Your repository is now ready for AI-assisted corporate governance:

| Tool | Setup |
|------|-------|
| **Cursor** | Open the repo; Cursor auto-discovers `AGENTS.md` |
| **Claude Code** | Open the repo; reads `AGENTS.md` automatically |
| **Other agents** | Point to `AGENTS.md` or `secretary-context.json` |

---

## How It Works

### AI Agent Discovery

AI tools supporting the `AGENTS.md` standard automatically discover how to operate in your repository. The file instructs agents to:

1. Load `secretary-context.json` for structured context
2. Reference `CORPORATION.md` for entity details
3. Follow `WORKFLOWS.md` for task procedures
4. Use templates to generate documents

### What Your AI Secretary Can Do

| Task | How |
|------|-----|
| **Draft a board resolution** | Copies template, fills placeholders, creates PR |
| **Add a director** | Creates resolution, updates register, notes filing deadline |
| **Issue shares** | Prepares subscription agreement, certificate, updates cap table |
| **Track compliance** | Monitors deadlines in `secretary-context.json` |
| **Maintain registers** | Updates CSVs with proper resolution references |

### Context Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Instructions for AI agents (auto-discovered) |
| `secretary-context.json` | Machine-readable repository map |
| `CORPORATION.md` | Your corporation's specific details |
| `SECRETARY.md` | Detailed operational guidelines |
| `WORKFLOWS.md` | Step-by-step task procedures |

---

## Repository Structure

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

## Working with Your AI Secretary

### Giving Instructions

Ask your AI agent naturally:

> "Create a board resolution to appoint Jane Smith as CFO effective March 15, 2025"

> "Issue 10,000 common shares to John Doe at $0.01 per share"

> "What compliance filings are due this month?"

> "Add a new director and update the registers"

The agent uses `AGENTS.md` and `secretary-context.json` to understand context, find templates, and execute workflows correctly.

### Review and Approve

AI-generated corporate actions come as pull requests:

1. **Review** the resolution, register updates, and any documents
2. **Request changes** if needed
3. **Approve and merge** to make it official
4. **Store signed copies** in `09-binary-artifacts/`

### Hybrid Workflow

Combine AI efficiency with human oversight:

- **AI drafts** → Human reviews → Human signs
- **AI tracks** compliance → Human files with government
- **AI maintains** registers → Human verifies accuracy

---

## Manual Usage (Alternative)

Prefer to manage corporate records yourself? The template works without AI assistance:

1. **Find the workflow** in `WORKFLOWS.md`
2. **Copy the template** (files starting with `_`)
3. **Fill in placeholders** (marked with `[BRACKETS]`)
4. **Create a PR** for review and approval
5. **Update registers** as needed

See `SECRETARY.md` for detailed human secretary instructions.

---

## Conventions

### Template Files
All templates are prefixed with `_` (e.g., `_board-resolution-template.md`). Copy them—don't edit the originals.

### Naming
- **Resolutions**: `RYYYY-NN-slug.md` (e.g., `R2025-03-appoint-cfo.md`)
- **Meetings**: `YYYY-MM-DD-slug/` (e.g., `2025-03-15-q1-board-meeting/`)
- **Dates**: Always ISO format (YYYY-MM-DD)

### Branch Naming
```
corp/add-director-smith-2025-03
corp/issuance-seed-round-2025-04
corp/meeting-board-2025-03-15
```

---

## Jurisdiction

Designed for **Canadian federal corporations** (CBCA) with **Ontario** extra-provincial registration. Adapt as needed for your jurisdiction.

Templates are **not legal advice**—consult qualified counsel for your specific situation.

---

## Documentation

| Document | Audience | Purpose |
|----------|----------|---------|
| [AGENTS.md](AGENTS.md) | AI agents | Auto-discovered agent instructions |
| [SECRETARY.md](SECRETARY.md) | AI agents, human secretaries | Detailed operational guide |
| [WORKFLOWS.md](WORKFLOWS.md) | Anyone doing corporate actions | Step-by-step procedures |
| [CORPORATION.md](CORPORATION.md) | Reference | Your corporation's details |
| [FORK-SETUP.md](FORK-SETUP.md) | New users | Detailed setup instructions |
| [MAINTAINERS.md](MAINTAINERS.md) | Template contributors | Improving this template |

---

## Requirements

- **Node.js**: 18+ (for setup script)
- **Git LFS**: For binary artifacts (PDFs, scans)
- **AI Agent**: Cursor, Claude Code, or any `AGENTS.md`-compatible tool (recommended)

---

## Contributing

Improvements to templates, documentation, and AI agent support welcome! See `MAINTAINERS.md` for contribution guidelines.

---

## Versioning

This template uses semantic versioning. Check `VERSION` for the current version.

```bash
git fetch upstream
git diff main upstream/main -- VERSION  # Check for updates
```

---

## License

This template repository is provided as-is for organizational purposes. Templates do not constitute legal advice. Consult qualified legal counsel for corporate matters.
