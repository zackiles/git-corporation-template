# Post-Fork Setup Guide

> **Congratulations on forking!** This guide walks you through initializing your corporate minute book.

## Quick Setup Checklist

- [ ] Rename your repository (recommended: `[company-name]-minute-book`)
- [ ] Delete template-repo-only files
- [ ] Configure Git LFS
- [ ] Populate initial corporate data
- [ ] Set up branch protection
- [ ] (Optional) Configure AI secretary access

---

## Step 1: Clean Up Template Files

Remove files that are only relevant to the template repository:

```bash
# Remove template maintainer docs
rm MAINTAINERS.md

# Remove this setup guide after completing setup
# (or keep for reference)
rm FORK-SETUP.md

# The .template-repo marker (if present) indicates this was a template
rm -f .template-repo
```

## Step 2: Configure Git LFS

Binary artifacts (signed PDFs, scans) should use Git LFS:

```bash
# Install Git LFS if needed
git lfs install

# Verify tracking rules in .gitattributes
cat .gitattributes
```

The repository should already have LFS configured for `09-binary-artifacts/`.

## Step 3: Populate Corporate Identity

### Update Root README

Edit `README.md` to reflect your corporation:

```markdown
# [Your Corporation Name] - Minute Book

This repository is the official minute book for [Corporation Name], 
incorporated under the Canada Business Corporations Act.

Corporation Number: [XXXXXXX]
Incorporation Date: [YYYY-MM-DD]
Fiscal Year End: [Month Day]
```

### Initialize Registers

Add your founding directors, officers, and shareholders:

**`03-registers/directors-register.csv`**:
```csv
id,full_name,address,appointment_date,cessation_date,appointing_resolution
D001,Jane Founder,"123 Startup St, Toronto ON M5V 1A1",2025-01-15,,R2025-01
```

**`03-registers/officers-register.csv`**:
```csv
id,full_name,position,appointment_date,cessation_date,appointing_resolution
O001,Jane Founder,President,2025-01-15,,R2025-01
O002,Jane Founder,Secretary,2025-01-15,,R2025-01
```

**`03-registers/shareholders-register.csv`**:
```csv
id,shareholder_name,address,share_class,number_of_shares,issue_date,certificate_number
S001,Jane Founder,"123 Startup St, Toronto ON M5V 1A1",Common,100,2025-01-15,C-001
```

### Add Formation Documents

1. Store articles of incorporation PDF in `09-binary-artifacts/01-formation/`
2. Create organizational resolution in `01-formation/organizational-resolutions/`
3. Customize bylaws from template in `01-formation/bylaws/`

## Step 4: Configure Branch Protection

Recommended GitHub branch protection rules for `main`:

- ✅ Require pull request reviews before merging
- ✅ Require review from Code Owners (directors)
- ✅ Require status checks to pass
- ✅ Do not allow bypassing the above settings
- ✅ Restrict who can push to matching branches

### CODEOWNERS File

Create `.github/CODEOWNERS`:

```
# Corporate governance requires director approval
/03-registers/           @director-github-username
/05-capitalization/      @director-github-username
/01-formation/           @director-github-username
/02-constating-documents/ @director-github-username

# Secretary can approve meeting documents
/04-meetings-and-resolutions/ @secretary-github-username @director-github-username
```

## Step 5: Set Up AI Secretary (Optional)

If using an AI agent as corporate secretary:

### Cursor Background Agent

1. Grant the agent access to this repository
2. Point it to `SECRETARY.md` as its primary instruction set
3. Configure with these permissions:
   - Read all files
   - Create branches with `corp/` prefix
   - Create pull requests
   - Cannot merge without human approval

### Context for AI

When instructing your AI secretary, reference:
- `SECRETARY.md` - Primary orientation and role definition
- `WORKFLOWS.md` - Step-by-step task instructions
- Folder-specific `README.md` files for detailed context

Example prompt:
> "You are the corporate secretary for [Company Name]. Your instructions are in SECRETARY.md. 
> When I ask you to perform corporate actions, follow the workflows in WORKFLOWS.md."

## Step 6: First Corporate Actions

Typical first actions after incorporation:

1. **Organizational Resolution** - Adopt bylaws, appoint officers, authorize shares
2. **Founder Share Issuance** - Issue initial shares to founders
3. **Banking Resolution** - Authorize opening bank accounts
4. **Initial Registers** - Populate all registers with founding data

Use templates in `01-formation/` and `04-meetings-and-resolutions/` to create these documents.

---

## Repository Structure After Setup

```
your-minute-book/
├── README.md                    # Updated with your corporation info
├── SECRETARY.md                 # Keep - AI/human secretary guide
├── WORKFLOWS.md                 # Keep - Task reference
├── 01-formation/
│   ├── bylaws/
│   │   └── 001-general-by-law.md    # Your adopted bylaws
│   ├── organizational-resolutions/
│   │   └── R2025-01-organizational.md
│   └── ...
├── 03-registers/
│   ├── directors-register.csv   # Populated with your directors
│   ├── officers-register.csv    # Populated with your officers
│   └── shareholders-register.csv # Populated with your shareholders
├── 09-binary-artifacts/
│   └── 01-formation/
│       └── articles-of-incorporation.pdf
└── ...
```

---

## Maintenance Notes

### Annual Tasks
See `WORKFLOWS.md#annual-compliance` for annual filing requirements.

### Keeping Templates Updated
This fork won't receive template updates from the upstream repository automatically. Periodically check the original template repo for improved templates and guides.

### Backup
While Git provides version history, consider:
- Enabling GitHub repository backup
- Periodic exports of critical registers
- Secure offline backup of binary artifacts

---

## Getting Help

- **Process questions**: See `99-meta/governance-process.md`
- **Workflow help**: See `WORKFLOWS.md`
- **Legal questions**: Consult qualified legal counsel

---

**You're ready!** Delete this file when setup is complete, or keep it for reference.
