# RFC: `corporation/` Minute-Book-as-Code Structure

## 1. Summary

Create a `corporation/` top-level directory in the existing repo that acts as the canonical, version-controlled “minute book” for the corporation.  
This RFC defines:

- Directory structure under `corporation/`
- Which templates and READMEs to add
- How to handle binary artifacts (PDFs, scans, receipts) via a dedicated subfolder and optional Git LFS
- Conventions for naming and updating documents

An implementation agent should follow this RFC to fully stub out the structure and initial documentation.

---

## 2. Problem & Rationale

### 2.1 Problem

The corporation needs:

- A legally compliant, auditable “minute book”
- A single source of truth for internal governance and key business documents
- A clear workflow to propose/amend corporate documents (e.g., by PR)

Ad-hoc Google Docs / email chains / random PDFs make it hard to:

- Track history of changes to governance documents
- Show auditors/investors a clean, coherent record
- Keep director/ shareholder/ securities registers consistent with resolutions and closing docs

### 2.2 Rationale for Using Git

- Git history + PRs = immutable audit trail + review process for corporate changes.
- Branches = “proposed governance change” workflows.
- Repo-level protections (required reviewers, CI checks) = governance controls.
- Structured directory layout = quick onboarding for lawyers, accountants, and future engineers.

The `corporation/` tree will be treated as:

- The internal source of truth for corporate documentation and process.
- A mirror of the statutory “minute book” concept, with extra structure for automation.

---

## 3. Scope

### 3.1 In Scope

- Creating `corporation/` directory and all subdirectories specified below.
- Adding initial READMEs and templates.
- Adding a dedicated subfolder for binary artifacts (PDFs, scans, receipts) and configuring Git LFS hooks where indicated.
- Defining naming conventions for files under `corporation/`.

### 3.2 Out of Scope

- Backfilling past corporate documents (this can be done later, following this structure).
- Actual legal drafting of agreements or resolutions (templates here are placeholders, not legal advice).
- CI integration (e.g., linting/register validation) beyond basic suggestions in the docs.

---

## 4. High-Level Structure

`corporation/` is a self-contained hierarchy. Only `corporation/` contains corp-related assets; other repo content is unrelated.

```text
corporation/
  README.md
  01-formation/
  02-constating-documents/
  03-registers/
  04-meetings-and-resolutions/
  05-capitalization/
  06-regulatory-filings/
  07-finance-and-tax/
  08-commercial-and-ip/
  09-binary-artifacts/        # PDFs/scans/receipts/etc, Git LFS target
  99-meta/
```

Each folder gets its own `README.md` describing what belongs there and basic update rules.

---

## 5. Detailed Directory Design

### 5.1 `corporation/README.md`

Engineer must create a top-level README explaining:

- Purpose: “minute-book-as-code” concept, legal-ish context, and who owns this directory.
- How to use:
  - Treat `main` branch + `corporation/` as canonical record.
  - All changes via PR; direct pushes discouraged.
  - Signed PDF artifacts go in `09-binary-artifacts/` with references from the Markdown files.
- Naming conventions:
  - Dated files: `YYYY-MM-DD-slug.[md|pdf|...]`
  - Resolutions: `RYYYY-NN-short-slug.md`
  - Meetings organized by year and date.
- Binary handling:
  - PDF/scan/receipt artifacts go under `09-binary-artifacts/` (see section 7).
  - Markdown files link to them using relative paths.

Include a short example of how a board resolution Markdown file links to its signed PDF in `09-binary-artifacts/`.

---

### 5.2 `01-formation/`

Purpose: documents relating to incorporation and initial organization.

Structure:

```text
corporation/
  01-formation/
    README.md
    federal/
      placeholder.txt
    ontario-extra-provincial/
      placeholder.txt
    organizational-resolutions/
      placeholder.txt
    bylaws/
      001-general-by-law-template.md
      README.md
```

`01-formation/README.md` should:

- Describe what goes here (articles, certificates, initial notices, initial board/shareholder resolutions, bylaws).
- State that signed versions (PDFs) live in `09-binary-artifacts/01-formation/...` and are linked from Markdown.

`001-general-by-law-template.md`:

- Skeleton of a general by-law: numbered articles, placeholder sections for:
  - Corporate name/registered office
  - Directors/officers
  - Meetings (board and shareholders)
  - Banking/borrowing
  - Dividends
- Clearly marked as “TEMPLATE – NOT LEGAL ADVICE”.

---

### 5.3 `02-constating-documents/`

Purpose: core internal “constitution” docs (shareholder agreements, policies, amendments).

Structure:

```text
corporation/
  02-constating-documents/
    README.md
    shareholders-agreements/
      unanimous-shareholders-agreement-template.md
    policies/
      dividend-policy-template.md
      signing-authority-policy-template.md
    amendments/
      amendment-template.md
```

`README.md` should explain:

- This folder holds documents that define how the corporation operates (beyond statutes and bylaws).
- Every governance change should be:
  1. Drafted as Markdown here.
  2. Approved (PR merged).
  3. Signed PDF deposited in `09-binary-artifacts/02-constating-documents/...`.
  4. Linked from the Markdown file.

Templates:

- `unanimous-shareholders-agreement-template.md` – skeleton with headings for shares, transfers, governance, restrictions, dispute resolution.
- `dividend-policy-template.md` – simple sections for decision criteria and process.
- `signing-authority-policy-template.md` – sections for authorized signatories, limits, and dual-signature rules.
- `amendment-template.md` – general “amendment to [doc]” structure with placeholders for old vs new provisions.

---

### 5.4 `03-registers/`

Purpose: machine-diffable registers for directors, officers, shareholders, securities, etc.

Structure:

```text
corporation/
  03-registers/
    README.md
    directors-register.csv
    officers-register.csv
    shareholders-register.csv
    securities-register.csv
    share-transfers-register.csv
    debt-obligations-register.csv
    isc-register.md
    real-property-register.md
```

`README.md` must define:

- Column schema for each CSV (exact column names, required/optional), e.g.:

  - `directors-register.csv`: `id,full_name,address,appointment_date,cessation_date`
  - `shareholders-register.csv`: `id,shareholder_name,share_class,number_of_shares,issue_date,certificate_number`
  - Etc.

- Rules:
  - Every change to a register must be associated with:
    - A resolution or meeting minutes under `04-meetings-and-resolutions/` and/or
    - Documents under `05-capitalization/`.
  - PR description must reference the relevant resolution ID.

`isc-register.md` and `real-property-register.md`:

- Markdown tables with column definitions and placeholders.
- Clear note that they should be kept in sync with legal requirements and filings.

---

### 5.5 `04-meetings-and-resolutions/`

Purpose: board and shareholder minutes/resolutions, organized by year.

Structure:

```text
corporation/
  04-meetings-and-resolutions/
    README.md
    board/
      README.md
      0000-templates/
        board-meeting-minutes-template.md
        board-resolution-template.md
      2025/
        placeholder.txt
    shareholders/
      README.md
      0000-templates/
        shareholder-meeting-minutes-template.md
        shareholder-resolution-template.md
      2025/
        placeholder.txt
```

`README.md` (top of `04-meetings-and-resolutions/`) should:

- Explain the directory structure: `board/<year>/<meeting-or-resolution>/...`.
- Naming convention:

  ```text
  board/<year>/<YYYY-MM-DD-short-slug>/
    minutes.md
    resolutions/
      RYYYY-NN-short-slug.md
  ```

- State that signed versions (if resolutions are signed individually) go under `09-binary-artifacts/04-meetings-and-resolutions/...` and are linked from the Markdown.

Templates:

- `board-meeting-minutes-template.md`:
  - Fields: date, time, place, participants, agenda, resolutions passed, adjournment.
- `board-resolution-template.md`:
  - Single-resolution format with "WHEREAS" and "RESOLVED" sections.
- Shareholder equivalents with similar structure.

---

### 5.6 `05-capitalization/`

Purpose: cap table, share issuances, options/ESOP.

Structure:

```text
corporation/
  05-capitalization/
    README.md
    cap-table/
      cap-table-template.md
    share-issuances/
      README.md
      0000-templates/
        share-subscription-agreement-template.md
        share-certificate-template.md
        closing-agenda-template.md
    options-and-ESOP/
      README.md
      esop-plan-template.md
      option-grant-template.md
      option-grants-register.csv
```

`README.md` must describe:

- Cap table: kept as a Markdown or CSV that summarizes current ownership; authoritative PDFs (if any) go in `09-binary-artifacts`.
- For any issuance or round, the pattern:

  ```text
  05-capitalization/share-issuances/YYYY-<short-slug>/
    summary.md
    supporting-resolutions.md (or link to RYYYY-NN in 04/)
    links to relevant register updates in 03-registers/
  ```

- `share-issuances/README.md`: step-by-step checklist for an issuance:
  - Draft resolution → update registers → generate share certs → get signatures → store PDFs.

Templates to provide:

- Subscription agreement skeleton.
- Share certificate skeleton (with placeholders for shareholder name, class, number, certificate number, signatures).
- ESOP plan outline and single option grant template.
- `option-grants-register.csv` with columns like `grant_id,employee_name,number_of_options,strike_price,grant_date,vesting_start,vesting_terms`.

---

### 5.7 `06-regulatory-filings/`

Purpose: federal, provincial, CRA, and license/permit filings.

Structure:

```text
corporation/
  06-regulatory-filings/
    README.md
    corporations-canada/
      README.md
      annual-returns/
        placeholder.txt
      notices/
        placeholder.txt
    ontario/
      README.md
      extra-provincial/
        placeholder.txt
      annual-returns/
        placeholder.txt
    cra/
      README.md
      placeholder.txt
    licenses-and-permits/
      README.md
      placeholder.txt
```

READMEs should:

- Describe where confirmation PDFs and scanned filings live in `09-binary-artifacts/06-regulatory-filings/...`.
- Suggest linking each filing to any related governance docs (e.g., changes to directors/registered office) in `03-registers` and `04-meetings-and-resolutions`.

---

### 5.8 `07-finance-and-tax/`

Purpose: high-level finance/tax docs and resolutions, not general bookkeeping.

Structure:

```text
corporation/
  07-finance-and-tax/
    README.md
    financial-statements/
      financial-statement-approval-resolution-template.md
    tax-returns/
      README.md
      placeholder.txt
    banking/
      README.md
      open-bank-account-resolution-template.md
```

`README.md` should explain:

- Where to store board resolutions approving financial statements.
- Where to refer to actual statements (PDFs in `09-binary-artifacts/07-finance-and-tax/...`).
- Bank account mandates and related resolutions.

Templates:

- `financial-statement-approval-resolution-template.md`.
- `open-bank-account-resolution-template.md`.

---

### 5.9 `08-commercial-and-ip/`

Purpose: key commercial contracts, IP assignments, registrations, and employee-IP related templates.

Structure:

```text
corporation/
  08-commercial-and-ip/
    README.md
    key-contracts/
      README.md
      0000-templates/
        msa-template.md
        nda-template.md
    ip/
      README.md
      assignments/
        ip-assignment-template.md
      registrations/
        trademarks/
          placeholder.txt
        patents/
          placeholder.txt
    hr/
      README.md
      employee-ip-and-confidentiality-template.md
```

READMEs should describe:

- Only “key” contracts go here (e.g., major customer MSAs, long-term vendor contracts, IP assignments).
- PDFs for executed versions live in `09-binary-artifacts/08-commercial-and-ip/...` with links from Markdown summaries.

Templates:

- MSA skeleton.
- NDA skeleton.
- IP assignment skeleton.
- Employee IP & confidentiality agreement skeleton.

---

### 5.10 `09-binary-artifacts/` (PDFs, scans, receipts, etc.)

Purpose: centralized home for all non-text artifacts (PDFs, scanned docs, receipts, images) that are referenced by Markdown docs.

Structure:

```text
corporation/
  09-binary-artifacts/
    README.md
    01-formation/
    02-constating-documents/
    03-registers/
    04-meetings-and-resolutions/
    05-capitalization/
    06-regulatory-filings/
    07-finance-and-tax/
    08-commercial-and-ip/
    receipts/
      README.md
      2025/
        placeholder.txt
```

`09-binary-artifacts/README.md` must:

- Clearly state: “All non-text corp artifacts go here.”
- Describe the convention of mirroring the main folder structure:
  - Example: `corporation/04-meetings-and-resolutions/board/2025/...` Markdown links to `corporation/09-binary-artifacts/04-meetings-and-resolutions/board/2025/...`.
- Explain how receipt images/PDFs should be named and stored under `receipts/YYYY/`.
- Mention Git LFS:

  - Recommend using Git LFS for this directory.
  - Add a `.gitattributes` snippet (see section 7) to transparently store large binaries in LFS.

The implementation agent should create at least one dummy placeholder file (e.g., `.keep` or `placeholder.txt`) in each subfolder so the tree materializes in git.

---

### 5.11 `99-meta/`

Purpose: meta-docs about how to use this structure and how PR-based governance works.

Structure:

```text
corporation/
  99-meta/
    README.md
    governance-process.md
    CONTRIBUTING.md
    templates/
      changelog-entry-template.md
      pull-request-description-template.md
```

Docs:

- `README.md`:
  - Short explanation: this folder contains meta-process descriptions, not legal docs.
- `governance-process.md`:
  - Define required reviewers for certain folders (e.g., “directors or trusted admins must review PRs touching `03-registers` or `05-capitalization`”).
  - Define branch naming conventions for corp changes: `corp/add-director-<name>-YYYY-MM`, `corp/seed-round-YYYY-MM`, etc.
  - PR rules: one logical corporate action per PR where possible.
- `CONTRIBUTING.md`:
  - Technical guidelines: no force-push to `main`, sign commits if desired, etc.
  - Steps for adding a corporate action:
    1. Create branch.
    2. Edit or add relevant Markdown files.
    3. Update registers.
    4. Add links to or placeholders for binary artifacts.
    5. Open PR with description using the template.
- Templates:
  - `changelog-entry-template.md`: short, human-readable entry summarizing each corporate action (link to PR, date, affected files).
  - `pull-request-description-template.md`: fields for summary, affected registers, resolutions, relevant filings.

---

## 6. Git LFS Configuration

The implementation agent should:

1. Add a `.gitattributes` file in the repo root (or update existing) with at least:

   ```gitattributes
   # Corporate binary artifacts
   corporation/09-binary-artifacts/** filter=lfs diff=lfs merge=lfs -text
   ```

2. Ensure `README.md` under `09-binary-artifacts/` includes a short “Using Git LFS” section that:

   - States that contributors must have Git LFS installed.
   - Gives basic commands:

     ```bash
     git lfs install
     git lfs track "corporation/09-binary-artifacts/**"
     ```

   - Notes any repo-specific setup or limitations.

---

## 7. Implementation Steps for the Agent

1. Create `corporation/` in the repo root.
2. Create all subdirectories and placeholder files as specified in sections 5 and 6.
3. Add all required `README.md` files with the described content.
4. Add all specified templates (Markdown and CSV skeletons).
5. Add or update `.gitattributes` to track `corporation/09-binary-artifacts/**` with Git LFS.
6. Commit these changes in a single “Introduce corporation/ minute-book structure” commit (or PR).
7. Optionally add a top-level note in the repo’s main `README.md` that links to `corporation/README.md` for corporate governance documentation.
