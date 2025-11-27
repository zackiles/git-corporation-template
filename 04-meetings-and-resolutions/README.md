# Meetings and Resolutions

> **Navigation**: [← Back to Root](../README.md) · [Workflows](../WORKFLOWS.md) · [Secretary Guide](../SECRETARY.md)

This folder contains board and shareholder minutes and resolutions, organized by year.

**This is where most corporate secretary work happens.**

## Directory Structure

```
04-meetings-and-resolutions/
├── board/
│   ├── 0000-templates/
│   │   ├── board-meeting-minutes-template.md
│   │   └── board-resolution-template.md
│   └── YYYY/
│       └── YYYY-MM-DD-short-slug/
│           ├── minutes.md
│           └── resolutions/
│               └── RYYYY-NN-short-slug.md
└── shareholders/
    ├── 0000-templates/
    │   ├── shareholder-meeting-minutes-template.md
    │   └── shareholder-resolution-template.md
    └── YYYY/
        └── YYYY-MM-DD-short-slug/
            ├── minutes.md
            └── resolutions/
                └── RYYYY-NN-short-slug.md
```

## Naming Conventions

### Meetings

Meetings are organized by year and date:
```
board/YYYY/YYYY-MM-DD-short-slug/
```

Example: `board/2025/2025-03-15-q1-review/`

### Resolutions

Resolutions use this format:
```
RYYYY-NN-short-slug.md
```

- `R` prefix indicates resolution
- `YYYY` is the year
- `NN` is a zero-padded sequence number (01, 02, etc.)
- `short-slug` is a brief descriptor

Example: `R2025-03-appoint-cfo.md`

## Signed Documents

Signed versions of resolutions and minutes are stored in:
```
09-binary-artifacts/04-meetings-and-resolutions/...
```

Each Markdown file should link to its signed PDF using relative paths.

## Workflow

1. Create the meeting folder: `YYYY/YYYY-MM-DD-slug/`
2. Draft `minutes.md` using the template
3. Draft resolutions in `resolutions/` folder
4. Open PR for review
5. After meeting, finalize and obtain signatures
6. Store signed PDFs in `09-binary-artifacts/`
7. Update Markdown files with links to signed versions

## Related Workflows

- [Board Resolution](../WORKFLOWS.md#board-resolution)
- [Meeting Minutes](../WORKFLOWS.md#meeting-minutes)
- [Annual General Meeting](../WORKFLOWS.md#annual-general-meeting-agm)
- [Shareholder Resolution](../WORKFLOWS.md#shareholder-resolution-written)
