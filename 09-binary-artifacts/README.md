# Binary Artifacts

**All non-text corporate artifacts go here.**

This folder is the centralized home for PDFs, scanned documents, receipts, images, and other binary files referenced by Markdown documents in the corporation folder.

## Directory Structure

The folder structure mirrors the main corporation directory:

```
09-binary-artifacts/
├── 01-formation/
├── 02-constating-documents/
├── 03-registers/
├── 04-meetings-and-resolutions/
│   ├── board/
│   │   └── YYYY/
│   └── shareholders/
│       └── YYYY/
├── 05-capitalization/
├── 06-regulatory-filings/
├── 07-finance-and-tax/
├── 08-commercial-and-ip/
└── receipts/
    └── YYYY/
```

## Naming Convention

Files should be named to match their corresponding Markdown documents:

| Markdown File | Binary File |
|---------------|-------------|
| `R2025-01-appoint-cfo.md` | `R2025-01-appoint-cfo.pdf` |
| `2025-03-15-board-meeting/minutes.md` | `2025-03-15-board-meeting/minutes-signed.pdf` |

## Receipts

Business receipts and expense documentation should be stored in:
```
09-binary-artifacts/receipts/YYYY/
```

Naming format for receipts:
```
YYYY-MM-DD-vendor-description.pdf
```

Example: `2025-03-15-staples-office-supplies.pdf`

## Using Git LFS

This directory is configured to use Git Large File Storage (LFS) for efficient handling of binary files.

### Setup

Contributors must have Git LFS installed:

```bash
# Install Git LFS (if not already installed)
# macOS
brew install git-lfs

# Ubuntu/Debian
apt-get install git-lfs

# Windows
# Download from https://git-lfs.github.com/

# Initialize Git LFS
git lfs install
```

### Tracking Files

Files in this directory are automatically tracked by Git LFS via `.gitattributes`:

```bash
git lfs track "corporation/09-binary-artifacts/**"
```

### Verifying LFS

To verify files are being tracked:

```bash
git lfs ls-files
```

## Linking from Markdown

Use relative paths to link from Markdown files to their signed versions:

```markdown
**Signed Copy:** [Resolution R2025-01](../09-binary-artifacts/04-meetings-and-resolutions/board/2025/R2025-01-appoint-cfo.pdf)
```

## File Types

Common file types stored here:
- `.pdf` - Signed documents, certificates, statements
- `.jpg`, `.png` - Scanned documents, receipts
- `.tiff` - High-resolution scans

## Security Note

This directory may contain sensitive documents. Ensure appropriate access controls are in place at the repository level.
