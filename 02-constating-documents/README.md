# Constating Documents

> **Navigation**: [← Back to Root](../README.md) · [Workflows](../WORKFLOWS.md) · [Secretary Guide](../SECRETARY.md)

This folder holds documents that define how the corporation operates beyond statutes and bylaws.

## Contents

- **shareholders-agreements/** - Shareholder agreements and related documents
- **policies/** - Corporate policies (dividends, signing authority, etc.)
- **amendments/** - Amendments to constating documents

## Governance Change Workflow

Every governance change should follow this process:

1. Draft the document as Markdown in the appropriate subfolder
2. Open a pull request for review and approval
3. Once approved (PR merged), obtain signatures
4. Deposit signed PDF in `09-binary-artifacts/02-constating-documents/...`
5. Update the Markdown file with a link to the signed PDF

## Templates

- `shareholders-agreements/_unanimous-shareholders-agreement-template.md` - For shareholder governance
- `policies/_dividend-policy-template.md` - Dividend decision criteria and process
- `policies/_signing-authority-policy-template.md` - Authorized signatories and limits
- `amendments/_amendment-template.md` - General amendment structure

## Related Workflows

- [Update Bylaws](../WORKFLOWS.md#update-bylaws)
- [Update Policy](../WORKFLOWS.md#update-policy)
