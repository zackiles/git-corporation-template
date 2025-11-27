# Template Repository Maintainers Guide

> **Your Role**: You are developing and maintaining this template repository that others will fork for their corporations. This document is your reference for contributing to the template itself.

## Context: Template Repo vs. Forked Repo

This repository serves two distinct contexts:

| Context | Users | Purpose |
|---------|-------|---------|
| **Template Repo** (this) | Maintainers, contributors | Improving templates, guides, and structure |
| **Forked Repo** | Corporate secretaries, AI agents | Managing a real corporation's minute book |

**Your work here shapes the experience of every fork.** Changes you make will propagate to new forks but not existing ones.

## Repository Architecture

### Folder Structure Philosophy

```
01-formation/          # One-time setup (incorporation)
02-constating-documents/   # Foundational docs (rarely changed)
03-registers/          # Authoritative records (frequently updated)
04-meetings-and-resolutions/  # Ongoing governance (most activity)
05-capitalization/     # Equity management
06-regulatory-filings/ # Compliance
07-finance-and-tax/    # Financial governance
08-commercial-and-ip/  # Business operations
09-binary-artifacts/   # Signed documents (Git LFS)
99-meta/               # Meta-documentation
```

### File Type Conventions

| Type | Naming | Purpose | Edit in Fork? |
|------|--------|---------|---------------|
| **Templates** | `_*.md` | Copied and customized | Copy, don't edit original |
| **Stubs** | `*.csv`, `*.md` (in registers) | Edited directly | Yes |
| **Guides** | `README.md`, `placeholder.txt` | Documentation | Rarely |
| **Personas** | `SECRETARY.md`, `MAINTAINERS.md` | Entry points | No (delete MAINTAINERS in fork) |
| **Workflows** | `WORKFLOWS.md` | Task index | Reference only |

### Why Templates Use Underscore Prefix

Templates are prefixed with `_` (e.g., `_board-resolution-template.md`) because:
1. They sort first in file listings, making them easy to find
2. The underscore signals "don't edit me directly"
3. AI agents can easily identify templates via glob pattern `_*.md`

## Contributing Guidelines

### Adding a New Template

1. **Location**: Place in the appropriate `0000-templates/` folder or alongside related files
2. **Naming**: Use `_[description]-template.md` format
3. **Header**: Include the standard template warning:
   ```markdown
   > **TEMPLATE – NOT LEGAL ADVICE**
   >
   > This is a skeleton template. Consult qualified legal counsel.
   ```
4. **Placeholders**: Use `[BRACKETED_PLACEHOLDERS]` for values to fill in
5. **Links**: Include "Related Documents" section pointing to related templates
6. **Index**: Add to `WORKFLOWS.md` template index

### Modifying Existing Templates

1. Consider backward compatibility—existing forks won't get your changes
2. Document breaking changes in commit message
3. Update any READMEs that reference the template

### Updating Guides (README files)

Each folder's README should follow this structure:
```markdown
# [Folder Name]

Brief description (1-2 sentences).

## Contents
- List of subfolders and key files

## [Folder-Specific Sections]
- Purpose, workflows, conventions

## Related
- Links to related folders/docs
- Breadcrumb back to parent or WORKFLOWS.md
```

### Adding New Workflows

1. Document in `WORKFLOWS.md` under appropriate section
2. Include:
   - Step-by-step instructions
   - Required templates (linked)
   - Affected registers
   - Example branch name and commit message

## Testing Your Changes

### Checklist Before PR

- [ ] All template files have `_` prefix
- [ ] Placeholders use `[BRACKETED]` format
- [ ] Internal links are relative and valid
- [ ] README follows standard structure
- [ ] WORKFLOWS.md updated if adding templates
- [ ] No real corporate data included

### Simulating Fork Experience

To test as a secretary would experience:
1. Create a test branch
2. Pretend `MAINTAINERS.md` doesn't exist
3. Follow `SECRETARY.md` and `WORKFLOWS.md` for a task
4. Note friction points

## Code Review Guidelines

### What to Check

1. **Accuracy**: Legal document templates should be reviewed by counsel
2. **Completeness**: All placeholders documented
3. **Consistency**: Naming conventions followed
4. **Navigation**: Links work, breadcrumbs present
5. **AI-friendliness**: Clear structure, predictable patterns

### Merge Requirements

- At least one maintainer approval
- Legal review for substantive template changes
- Documentation updated

## Roadmap Considerations

When planning features, consider:

1. **AI Agent Usability**
   - Can an AI find the right template?
   - Are instructions unambiguous?
   - Is the workflow automatable?

2. **Jurisdictional Flexibility**
   - Templates should work for federal Canadian corporations
   - Provincial variations should be documented
   - International adaptations may need separate folders

3. **Compliance Automation**
   - Calendar reminders
   - Validation of register consistency
   - Filing deadline tracking

## File Manifest

### Entry Points (Root)
- `README.md` - For new users evaluating the project
- `SECRETARY.md` - For AI/human secretaries using a fork
- `MAINTAINERS.md` - For template developers (this file)
- `WORKFLOWS.md` - Task-based navigation index
- `FORK-SETUP.md` - Post-fork initialization guide

### Meta Documentation
- `99-meta/governance-process.md` - PR workflow for corporate changes
- `99-meta/CONTRIBUTING.md` - Technical contribution guidelines
- `99-meta/templates/` - PR and changelog templates

## Style Guide

### Markdown
- Use ATX headers (`#`, `##`, not underlines)
- Tables for structured data
- Code blocks for file paths and examples
- Relative links for internal references

### Naming
- kebab-case for files and folders
- Descriptive but concise slugs
- Dates in ISO format (YYYY-MM-DD)

### Commit Messages
For template repo changes (not corporate actions):
```
[template] Brief description

- Detail about change
- Impact on forks
```

---

**Questions?** Open an issue or discussion on the repository.
