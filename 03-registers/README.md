# Corporate Registers

> **Navigation**: [← Back to Root](../README.md) · [Workflows](../WORKFLOWS.md) · [Secretary Guide](../SECRETARY.md)

This folder contains machine-diffable registers for directors, officers, shareholders, and securities.

**These are authoritative records.** Every change must reference an authorizing resolution.

## Registers

| File | Purpose |
|------|---------|
| `directors-register.csv` | Current and past directors |
| `officers-register.csv` | Current and past officers |
| `shareholders-register.csv` | All shareholders and holdings |
| `securities-register.csv` | All issued securities |
| `share-transfers-register.csv` | Record of share transfers |
| `debt-obligations-register.csv` | Corporate debt instruments |
| `isc-register.md` | Interests in land (ISC registrations) |
| `real-property-register.md` | Real property holdings |

## Column Schemas

### directors-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| full_name | Yes | Director's full legal name |
| address | Yes | Residential address |
| appointment_date | Yes | Date appointed (YYYY-MM-DD) |
| cessation_date | No | Date ceased to be director |
| appointing_resolution | No | Reference to resolution ID |

### officers-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| full_name | Yes | Officer's full legal name |
| position | Yes | Officer title (CEO, CFO, etc.) |
| appointment_date | Yes | Date appointed (YYYY-MM-DD) |
| cessation_date | No | Date ceased to hold office |
| appointing_resolution | No | Reference to resolution ID |

### shareholders-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| shareholder_name | Yes | Shareholder's legal name |
| address | Yes | Address for notices |
| share_class | Yes | Class of shares held |
| number_of_shares | Yes | Number of shares held |
| issue_date | Yes | Date shares were issued |
| certificate_number | No | Share certificate number |

### securities-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| security_type | Yes | Type (common, preferred, etc.) |
| holder_name | Yes | Holder's legal name |
| number_issued | Yes | Number of securities |
| issue_date | Yes | Date issued |
| consideration | Yes | Amount paid |
| certificate_number | No | Certificate reference |
| cancelled_date | No | If cancelled, when |

### share-transfers-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| transfer_date | Yes | Date of transfer |
| from_shareholder | Yes | Transferor name |
| to_shareholder | Yes | Transferee name |
| share_class | Yes | Class of shares |
| number_of_shares | Yes | Shares transferred |
| consideration | Yes | Amount paid |
| old_cert_number | No | Certificate surrendered |
| new_cert_number | No | Certificate issued |

### debt-obligations-register.csv

| Column | Required | Description |
|--------|----------|-------------|
| id | Yes | Unique identifier |
| instrument_type | Yes | Type (loan, bond, etc.) |
| creditor_name | Yes | Creditor's name |
| principal_amount | Yes | Original principal |
| issue_date | Yes | Date issued |
| maturity_date | No | Maturity date |
| interest_rate | No | Interest rate |
| status | Yes | Active/Paid/Defaulted |

## Update Rules

1. Every change to a register must be associated with:
   - A resolution or meeting minutes under `04-meetings-and-resolutions/` and/or
   - Documents under `05-capitalization/`

2. PR descriptions must reference the relevant resolution ID (e.g., "Per resolution R2025-03")

3. Changes should be committed atomically with related governance documents

## Legal Requirements

Registers must be kept in sync with:
- Corporations Canada filings
- Provincial registrations
- Annual returns

## Related Workflows

- [Appoint Director](../WORKFLOWS.md#appoint-director) → Updates `directors-register.csv`
- [Appoint Officer](../WORKFLOWS.md#appoint-officer) → Updates `officers-register.csv`
- [Share Issuance](../WORKFLOWS.md#share-issuance) → Updates `shareholders-register.csv`, `securities-register.csv`
- [Share Transfer](../WORKFLOWS.md#share-transfer) → Updates `share-transfers-register.csv`
