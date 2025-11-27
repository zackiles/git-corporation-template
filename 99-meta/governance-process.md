# Governance Process

This document defines the PR-based governance workflow for corporate changes.

## Required Reviewers

Changes to certain folders require specific reviewers:

| Folder | Required Reviewers |
|--------|-------------------|
| `03-registers/` | Directors or trusted admins |
| `05-capitalization/` | Directors or trusted admins |
| `01-formation/` | Directors |
| `02-constating-documents/` | Directors |
| `04-meetings-and-resolutions/` | Secretary or Directors |

## Branch Naming Conventions

Use the following prefixes for corporate change branches:

| Type of Change | Branch Pattern | Example |
|----------------|----------------|---------|
| Add director | `corp/add-director-<name>-YYYY-MM` | `corp/add-director-smith-2025-03` |
| Remove director | `corp/remove-director-<name>-YYYY-MM` | `corp/remove-director-jones-2025-06` |
| Share issuance | `corp/issuance-<description>-YYYY-MM` | `corp/issuance-seed-round-2025-04` |
| Funding round | `corp/round-<name>-YYYY-MM` | `corp/round-series-a-2025-09` |
| Policy change | `corp/policy-<description>-YYYY-MM` | `corp/policy-signing-authority-2025-03` |
| Annual filings | `corp/annual-YYYY` | `corp/annual-2025` |
| Meeting | `corp/meeting-<type>-YYYY-MM-DD` | `corp/meeting-board-2025-03-15` |

## PR Rules

### One Action Per PR

Each PR should represent one logical corporate action where possible:
- One director appointment
- One share issuance
- One policy update
- One meeting's minutes and resolutions

### PR Description

Use the template in `templates/_pull-request-description-template.md` for all corporate PRs.

### Linked Documents

PRs must reference:
- Relevant resolutions (by ID)
- Affected registers
- Related filings (if any)

### Review Process

1. Create branch following naming convention
2. Make changes following templates
3. Open PR with complete description
4. Obtain required approvals
5. Merge to main

### Post-Merge Actions

After merging:
1. Obtain signatures on documents (if required)
2. Store signed PDFs in `09-binary-artifacts/`
3. Update register entries with resolution references
4. File any required regulatory notices

## Emergency Changes

In urgent situations (e.g., immediate director resignation), changes may be merged with single director approval, followed by ratification at the next board meeting.

## Audit Trail

The Git history serves as the audit trail. Do not:
- Force push to main
- Rewrite history on merged branches
- Delete branches without archiving

## Annual Review

This governance process should be reviewed annually by the Board.
