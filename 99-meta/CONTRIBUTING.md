# Contributing to Corporation Documents

Technical guidelines for contributing to the corporate minute book.

## Getting Started

1. Clone the repository
2. Install Git LFS: `git lfs install`
3. Pull LFS files: `git lfs pull`

## Making Changes

### 1. Create a Branch

```bash
git checkout -b corp/description-YYYY-MM
```

Follow the naming conventions in `governance-process.md`.

### 2. Edit or Add Files

- Use existing templates where available
- Follow the naming conventions
- Link to related documents

### 3. Update Registers

If your change affects corporate registers:
- Update the relevant CSV files in `03-registers/`
- Include the resolution reference in PR description

### 4. Add Binary Artifacts

If you have signed documents:
- Add PDFs to the appropriate folder in `09-binary-artifacts/`
- Update Markdown files with links

### 5. Open Pull Request

- Use the PR description template
- Request appropriate reviewers
- Wait for approval before merging

## Git Guidelines

### Do NOT

- Force push to `main`
- Rewrite history on shared branches
- Delete merged branches without notification
- Commit sensitive data (passwords, tokens)

### Do

- Write clear commit messages
- Keep commits atomic (one logical change per commit)
- Sign commits if required by policy
- Pull before pushing

## File Formats

### Markdown Files

- Use templates from `0000-templates/` folders
- Include all required sections
- Link to related documents

### CSV Files

- Use exact column names from schema
- Use ISO date format (YYYY-MM-DD)
- Quote fields containing commas

### Binary Files

- Use descriptive filenames
- Follow naming conventions
- Ensure Git LFS is tracking the file

## Commit Messages

Format:
```
[corp] Brief description

- Detail 1
- Detail 2

Resolves: #issue-number (if applicable)
Resolution: RYYYY-NN (if applicable)
```

Example:
```
[corp] Add Q1 2025 board meeting minutes

- Board meeting held 2025-03-15
- Three resolutions passed
- Updated directors register

Resolution: R2025-01, R2025-02, R2025-03
```

## Questions

Contact the Secretary or a director for questions about:
- Process and procedures
- Document requirements
- Review requirements

For technical issues, contact the repository administrator.
