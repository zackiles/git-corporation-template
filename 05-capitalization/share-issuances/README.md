# Share Issuances

> **Navigation**: [← Capitalization](../README.md) · [← Root](../../README.md) · [Workflows](../../WORKFLOWS.md)

This folder documents individual share issuance transactions.

## Checklist for Share Issuance

- [ ] Draft board resolution authorizing issuance
- [ ] Prepare subscription agreement (if required)
- [ ] Collect consideration (payment, property, services)
- [ ] Issue share certificate
- [ ] Update shareholders register (`03-registers/shareholders-register.csv`)
- [ ] Update securities register (`03-registers/securities-register.csv`)
- [ ] Obtain signatures on all documents
- [ ] Store signed PDFs in `09-binary-artifacts/05-capitalization/share-issuances/`
- [ ] Update cap table
- [ ] File any required regulatory notices

## Templates

- `0000-templates/_share-subscription-agreement-template.md`
- `0000-templates/_share-certificate-template.md`
- `0000-templates/_closing-agenda-template.md`

## Folder Structure

For each issuance, create a folder:

```
YYYY-description/
├── summary.md
├── subscription-agreement.md (or link to template)
├── resolution-link.md (or copy of resolution)
└── [other relevant docs]
```

Signed PDFs go in the corresponding `09-binary-artifacts/` path.

## Related Workflows

- [Share Issuance](../../WORKFLOWS.md#share-issuance)
