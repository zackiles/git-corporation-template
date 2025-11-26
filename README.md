# Corporation Minute Book

This directory serves as the canonical, version-controlled "minute book" for the corporation. It provides a legally compliant, auditable record of corporate governance using Git's immutable history.

## Purpose

- **Single source of truth** for internal governance and key business documents
- **Auditable trail** via Git history and pull request reviews
- **Clear workflow** for proposing and amending corporate documents

## How to Use

### Canonical Record

- The `main` branch + `corporation/` directory is the authoritative record
- All changes must be made via pull request; direct pushes are discouraged
- Each PR should represent one logical corporate action

### Binary Artifacts

Signed PDFs, scans, receipts, and other non-text artifacts are stored in `09-binary-artifacts/`:

- The folder structure mirrors the main directories
- Markdown files link to their signed versions using relative paths
- Git LFS is recommended for this directory

### Naming Conventions

**Dated files:**
```
YYYY-MM-DD-slug.[md|pdf|...]
```

**Resolutions:**
```
RYYYY-NN-short-slug.md
```
Where `YYYY` is the year and `NN` is a zero-padded sequence number.

**Meetings:** Organized by year and date under the relevant folder.

### Example: Linking to Signed Documents

A board resolution in Markdown would link to its signed PDF:

```markdown
## Resolution R2025-01: Appointment of Officer

RESOLVED, that Jane Doe is appointed as Chief Executive Officer...

---

**Signed Copy:** [R2025-01-appointment-ceo.pdf](../09-binary-artifacts/04-meetings-and-resolutions/board/2025/R2025-01-appointment-ceo.pdf)
```

## Directory Structure

```
corporation/
├── 01-formation/              # Incorporation and initial organization
├── 02-constating-documents/   # Shareholder agreements, policies
├── 03-registers/              # Directors, officers, shareholders, securities
├── 04-meetings-and-resolutions/  # Board and shareholder minutes/resolutions
├── 05-capitalization/         # Cap table, share issuances, ESOP
├── 06-regulatory-filings/     # Federal, provincial, CRA filings
├── 07-finance-and-tax/        # Financial statements, tax, banking
├── 08-commercial-and-ip/      # Key contracts, IP, HR
├── 09-binary-artifacts/       # PDFs, scans, receipts (Git LFS)
└── 99-meta/                   # Process docs and templates
```

## Ownership

This directory is maintained by the corporation's directors and authorized officers. Changes to governance documents require appropriate corporate authorization.

## Legal Disclaimer

Documents and templates in this repository are for organizational purposes only and do not constitute legal advice. Consult qualified legal counsel for corporate matters.
