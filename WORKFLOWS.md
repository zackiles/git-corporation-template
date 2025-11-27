# Corporate Workflows

> **Navigation Index**: This document provides step-by-step workflows for common corporate actions. Each workflow links to relevant templates and registers.

---

## Quick Navigation

| Category | Common Tasks |
|----------|--------------|
| [Board Actions](#board-actions) | Resolutions, meetings, approvals |
| [Director Changes](#director-changes) | Appointments, resignations, removals |
| [Officer Changes](#officer-changes) | Appointments, resignations, title changes |
| [Share Transactions](#share-transactions) | Issuances, transfers, options |
| [Shareholder Actions](#shareholder-actions) | Meetings, resolutions, AGM |
| [Annual Compliance](#annual-compliance) | Filings, returns, renewals |
| [Policy Updates](#policy-updates) | Bylaws, policies, amendments |
| [Financial Approvals](#financial-approvals) | Statements, budgets, banking |

---

## Board Actions

### Board Resolution

**When**: Any decision requiring board approval that doesn't occur at a meeting.

**Steps**:
1. Copy template: `04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md`
2. Create target folder: `04-meetings-and-resolutions/board/YYYY/` (if needed)
3. Save as: `RYYYY-NN-short-slug.md` (e.g., `R2025-04-approve-contract.md`)
4. Fill in all `[PLACEHOLDERS]`
5. Create branch: `corp/resolution-[slug]-YYYY-MM`
6. Open PR, obtain required approvals
7. After approval, obtain signatures
8. Store signed PDF in `09-binary-artifacts/04-meetings-and-resolutions/board/YYYY/`
9. Update resolution with link to signed copy

**Template**: [`_board-resolution-template.md`](04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md)

**Registers affected**: None directly (but resolution may authorize register changes)

---

### Meeting Minutes

**When**: Recording proceedings of a board or shareholder meeting.

**Steps**:
1. Create meeting folder: `04-meetings-and-resolutions/board/YYYY/YYYY-MM-DD-slug/`
2. Copy template: `_board-meeting-minutes-template.md` → `minutes.md`
3. Create `resolutions/` subfolder if resolutions will be passed
4. Document attendees, agenda, discussions, votes
5. For each resolution passed, create resolution file in `resolutions/`
6. Create branch: `corp/meeting-board-YYYY-MM-DD`
7. Open PR
8. After meeting, finalize minutes and obtain signatures
9. Store signed minutes in `09-binary-artifacts/`

**Template**: [`_board-meeting-minutes-template.md`](04-meetings-and-resolutions/board/0000-templates/_board-meeting-minutes-template.md)

---

## Director Changes

### Appoint Director

**When**: Adding a new director to the board.

**Prerequisites**: Shareholder resolution or written consent (for most corporations).

**Steps**:
1. Prepare director resolution or shareholder resolution authorizing appointment
2. Create branch: `corp/add-director-[name]-YYYY-MM`
3. Create resolution file in appropriate folder
4. Update `03-registers/directors-register.csv`:
   ```csv
   id,full_name,address,appointment_date,cessation_date,appointing_resolution
   D003,Jane Smith,"123 Main St, Toronto ON",2025-03-15,,R2025-04
   ```
5. Open PR with reference to resolution
6. After approval, file notice with Corporations Canada (if required)
7. Store any signed documents in `09-binary-artifacts/`

**Templates**:
- [`_board-resolution-template.md`](04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md) (for board appointment)
- [`_shareholder-resolution-template.md`](04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md) (for shareholder election)

**Registers affected**: `directors-register.csv`

**Regulatory filings**: Corporations Canada Form 6 (within 15 days)

---

### Remove/Resign Director

**When**: Director resigns or is removed.

**Steps**:
1. Obtain resignation letter or prepare removal resolution
2. Create branch: `corp/remove-director-[name]-YYYY-MM`
3. Create resignation acceptance or removal resolution
4. Update `03-registers/directors-register.csv`:
   - Add `cessation_date` to existing row
5. Open PR
6. File notice with Corporations Canada
7. Store resignation letter in `09-binary-artifacts/`

**Registers affected**: `directors-register.csv`

**Regulatory filings**: Corporations Canada Form 6 (within 15 days)

---

## Officer Changes

### Appoint Officer

**When**: Appointing CEO, CFO, Secretary, or other officer.

**Authority**: Board resolution required.

**Steps**:
1. Prepare board resolution authorizing appointment
2. Create branch: `corp/add-officer-[title]-[name]-YYYY-MM`
3. Create resolution in `04-meetings-and-resolutions/board/YYYY/`
4. Update `03-registers/officers-register.csv`:
   ```csv
   id,full_name,position,appointment_date,cessation_date,appointing_resolution
   O003,Jane Smith,Chief Financial Officer,2025-03-15,,R2025-05
   ```
5. Open PR
6. Consider updating signing authority policy if needed

**Template**: [`_board-resolution-template.md`](04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md)

**Registers affected**: `officers-register.csv`

---

### Remove/Resign Officer

**When**: Officer resigns or is removed by the board.

**Steps**:
1. Obtain resignation or prepare removal resolution
2. Create branch: `corp/remove-officer-[title]-[name]-YYYY-MM`
3. Update `03-registers/officers-register.csv`:
   - Add `cessation_date` to existing row
4. Review and update signing authorities
5. Open PR

**Registers affected**: `officers-register.csv`

---

## Share Transactions

### Share Issuance

**When**: Issuing new shares to shareholders.

**Authority**: Board resolution required (and possibly shareholder approval for certain classes).

**Steps**:
1. Verify authorized share capital permits issuance
2. Create issuance folder: `05-capitalization/share-issuances/YYYY-slug/`
3. Prepare documents:
   - Board resolution authorizing issuance
   - Subscription agreement (from template)
   - Share certificate
4. Create branch: `corp/issuance-[description]-YYYY-MM`
5. Update registers:
   - `03-registers/shareholders-register.csv`
   - `03-registers/securities-register.csv`
6. Update `05-capitalization/cap-table/` if maintaining cap table
7. Open PR
8. After approval, execute documents
9. Store signed documents in `09-binary-artifacts/05-capitalization/`

**Templates**:
- [`_share-subscription-agreement-template.md`](05-capitalization/share-issuances/0000-templates/_share-subscription-agreement-template.md)
- [`_share-certificate-template.md`](05-capitalization/share-issuances/0000-templates/_share-certificate-template.md)
- [`_board-resolution-template.md`](04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md)

**Registers affected**: `shareholders-register.csv`, `securities-register.csv`

---

### Share Transfer

**When**: Existing shareholder transfers shares to another party.

**Steps**:
1. Verify transfer restrictions (USA, ROFR, etc.)
2. Prepare transfer documentation
3. Create branch: `corp/transfer-[from]-to-[to]-YYYY-MM`
4. Update registers:
   - `03-registers/share-transfers-register.csv` (add transfer record)
   - `03-registers/shareholders-register.csv` (update holdings)
   - `03-registers/securities-register.csv` (cancel old cert, issue new)
5. Open PR
6. Issue new certificate, cancel old certificate

**Registers affected**: `share-transfers-register.csv`, `shareholders-register.csv`, `securities-register.csv`

---

### Option Grant

**When**: Granting stock options under ESOP.

**Prerequisites**: ESOP plan must be in place.

**Steps**:
1. Verify option pool availability
2. Prepare option grant agreement from template
3. Create branch: `corp/option-grant-[name]-YYYY-MM`
4. Update `05-capitalization/options-and-ESOP/option-grants-register.csv`
5. Store signed grant agreement

**Template**: [`_option-grant-template.md`](05-capitalization/options-and-ESOP/_option-grant-template.md)

**Registers affected**: `option-grants-register.csv`

---

## Shareholder Actions

### Annual General Meeting (AGM)

**When**: Required annually (within 18 months of incorporation, then within 15 months of previous AGM).

**Steps**:
1. Determine meeting date (check bylaws for notice period)
2. Prepare notice of meeting
3. Prepare agenda (typically: financials, director elections, auditor appointment)
4. Create meeting folder: `04-meetings-and-resolutions/shareholders/YYYY/YYYY-MM-DD-agm/`
5. Draft meeting materials
6. Create branch: `corp/agm-YYYY`
7. After meeting, record minutes and resolutions
8. Update any affected registers

**Templates**:
- [`_shareholder-meeting-minutes-template.md`](04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-meeting-minutes-template.md)
- [`_shareholder-resolution-template.md`](04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md)

---

### Shareholder Resolution (Written)

**When**: Shareholders approve action without meeting.

**Steps**:
1. Draft resolution using template
2. Create branch: `corp/shareholder-resolution-[slug]-YYYY-MM`
3. Circulate for signatures (must be unanimous for written resolution)
4. Store signed resolution in `09-binary-artifacts/`

**Template**: [`_shareholder-resolution-template.md`](04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md)

---

## Annual Compliance

### Annual Tasks

**Timeline**: Based on corporation's anniversary and fiscal year-end.

| Task | Deadline | Action |
|------|----------|--------|
| Corporations Canada Annual Return | Anniversary + 60 days | File return, pay fee |
| Ontario Annual Return | Anniversary + 60 days | File return |
| T2 Corporate Tax Return | FYE + 6 months | File with CRA |
| Financial Statement Approval | Before AGM | Board resolution |
| AGM | Within 15 months of last AGM | Hold meeting |

**Steps for Annual Return**:
1. Create branch: `corp/annual-YYYY`
2. Verify register accuracy
3. File with Corporations Canada
4. Store filing confirmation in `06-regulatory-filings/corporations-canada/annual-returns/`
5. Repeat for provincial filings

---

## Policy Updates

### Update Bylaws

**Authority**: Usually requires shareholder approval.

**Steps**:
1. Draft bylaw amendment
2. Prepare shareholder resolution
3. Create branch: `corp/bylaw-amendment-[description]-YYYY-MM`
4. Place amendment in `01-formation/bylaws/` or `02-constating-documents/amendments/`
5. Obtain required approvals
6. File with Corporations Canada if required

**Template**: [`_amendment-template.md`](02-constating-documents/amendments/_amendment-template.md)

---

### Update Policy

**Authority**: Board resolution typically sufficient.

**Steps**:
1. Draft policy update
2. Prepare board resolution
3. Create branch: `corp/policy-[name]-YYYY-MM`
4. Update policy in `02-constating-documents/policies/`
5. Open PR

**Templates**:
- [`_dividend-policy-template.md`](02-constating-documents/policies/_dividend-policy-template.md)
- [`_signing-authority-policy-template.md`](02-constating-documents/policies/_signing-authority-policy-template.md)

---

## Financial Approvals

### Approve Financial Statements

**When**: Before AGM, annually.

**Steps**:
1. Receive financial statements from accountant
2. Prepare board resolution approving statements
3. Create branch: `corp/financials-YYYY`
4. Store statements in `07-finance-and-tax/financial-statements/`
5. Present to shareholders at AGM

**Template**: [`_financial-statement-approval-resolution-template.md`](07-finance-and-tax/financial-statements/_financial-statement-approval-resolution-template.md)

---

### Open Bank Account

**When**: Establishing new banking relationship.

**Steps**:
1. Prepare board resolution authorizing account
2. Identify authorized signers
3. Create branch: `corp/banking-[bank-name]-YYYY-MM`
4. Store resolution and bank documents in `07-finance-and-tax/banking/`

**Template**: [`_open-bank-account-resolution-template.md`](07-finance-and-tax/banking/_open-bank-account-resolution-template.md)

---

## Template Index

### Board & Meetings
| Template | Location |
|----------|----------|
| Board Resolution | `04-meetings-and-resolutions/board/0000-templates/_board-resolution-template.md` |
| Board Meeting Minutes | `04-meetings-and-resolutions/board/0000-templates/_board-meeting-minutes-template.md` |
| Shareholder Resolution | `04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-resolution-template.md` |
| Shareholder Meeting Minutes | `04-meetings-and-resolutions/shareholders/0000-templates/_shareholder-meeting-minutes-template.md` |

### Capitalization
| Template | Location |
|----------|----------|
| Share Subscription Agreement | `05-capitalization/share-issuances/0000-templates/_share-subscription-agreement-template.md` |
| Share Certificate | `05-capitalization/share-issuances/0000-templates/_share-certificate-template.md` |
| Closing Agenda | `05-capitalization/share-issuances/0000-templates/_closing-agenda-template.md` |
| Option Grant | `05-capitalization/options-and-ESOP/_option-grant-template.md` |
| ESOP Plan | `05-capitalization/options-and-ESOP/_esop-plan-template.md` |
| Cap Table | `05-capitalization/cap-table/_cap-table-template.md` |

### Policies & Agreements
| Template | Location |
|----------|----------|
| Bylaws | `01-formation/bylaws/_001-general-by-law-template.md` |
| Amendment | `02-constating-documents/amendments/_amendment-template.md` |
| Dividend Policy | `02-constating-documents/policies/_dividend-policy-template.md` |
| Signing Authority Policy | `02-constating-documents/policies/_signing-authority-policy-template.md` |
| Unanimous Shareholders Agreement | `02-constating-documents/shareholders-agreements/_unanimous-shareholders-agreement-template.md` |

### Finance
| Template | Location |
|----------|----------|
| Financial Statement Approval | `07-finance-and-tax/financial-statements/_financial-statement-approval-resolution-template.md` |
| Open Bank Account Resolution | `07-finance-and-tax/banking/_open-bank-account-resolution-template.md` |

### Commercial & IP
| Template | Location |
|----------|----------|
| NDA | `08-commercial-and-ip/key-contracts/0000-templates/_nda-template.md` |
| MSA | `08-commercial-and-ip/key-contracts/0000-templates/_msa-template.md` |
| IP Assignment | `08-commercial-and-ip/ip/assignments/_ip-assignment-template.md` |
| Employee IP & Confidentiality | `08-commercial-and-ip/hr/_employee-ip-and-confidentiality-template.md` |

### Meta
| Template | Location |
|----------|----------|
| PR Description | `99-meta/templates/_pull-request-description-template.md` |
| Changelog Entry | `99-meta/templates/_changelog-entry-template.md` |

---

## Register Reference

| Register | Location | Updated When |
|----------|----------|--------------|
| Directors | `03-registers/directors-register.csv` | Director appointed/removed |
| Officers | `03-registers/officers-register.csv` | Officer appointed/removed |
| Shareholders | `03-registers/shareholders-register.csv` | Shares issued/transferred |
| Securities | `03-registers/securities-register.csv` | Securities issued/cancelled |
| Share Transfers | `03-registers/share-transfers-register.csv` | Shares transferred |
| Debt Obligations | `03-registers/debt-obligations-register.csv` | Debt issued/repaid |
| Option Grants | `05-capitalization/options-and-ESOP/option-grants-register.csv` | Options granted/exercised |

---

**Need help?** See [SECRETARY.md](SECRETARY.md) for orientation or folder-specific READMEs for detailed guidance.
