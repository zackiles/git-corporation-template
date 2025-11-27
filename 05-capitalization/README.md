# Capitalization

> **Navigation**: [← Back to Root](../README.md) · [Workflows](../WORKFLOWS.md) · [Secretary Guide](../SECRETARY.md)

This folder contains cap table, share issuances, options, and ESOP documentation.

## Contents

- **cap-table/** - Current capitalization summary
- **share-issuances/** - Individual share issuance transactions
- **options-and-ESOP/** - Stock option plans and grants

## Cap Table

The cap table provides a summary of current ownership. Authoritative signed documents (if any) are stored in `09-binary-artifacts/05-capitalization/`.

## Share Issuance Pattern

For any share issuance or funding round:

```
05-capitalization/share-issuances/YYYY-short-slug/
├── summary.md
├── supporting-resolutions.md (or link to 04-meetings-and-resolutions/)
└── [links to relevant register updates in 03-registers/]
```

Example: `05-capitalization/share-issuances/2025-seed-round/`

## Key Documents

Every issuance should include:
1. Board resolution authorizing the issuance
2. Subscription agreement (if applicable)
3. Share certificate
4. Updated registers (shareholders, securities)

## Workflow

1. Draft resolution authorizing issuance
2. Prepare subscription agreement (if applicable)
3. Update registers in `03-registers/`
4. Generate share certificate
5. Obtain all required signatures
6. Store signed PDFs in `09-binary-artifacts/05-capitalization/`
7. Link from Markdown files

## Related Workflows

- [Share Issuance](../WORKFLOWS.md#share-issuance)
- [Share Transfer](../WORKFLOWS.md#share-transfer)
- [Option Grant](../WORKFLOWS.md#option-grant)
