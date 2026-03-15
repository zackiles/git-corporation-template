# Output – Generated PDFs

This folder contains tools for generating PDF versions of corporate documents and stores the generated output.

## `md-to-pdf.sh`

Converts markdown files to PDF using pandoc with xelatex.

### Prerequisites

- [pandoc](https://pandoc.org/installing.html)
- A TeX distribution with xelatex (e.g., [TeX Live](https://tug.org/texlive/))
- DejaVu fonts (typically included with most Linux distributions; available at [dejavu-fonts.github.io](https://dejavu-fonts.github.io/))

### Usage

```bash
# Convert a file, output to this directory
./98-output/md-to-pdf.sh 05-capitalization/cap-table/cap-table.md

# Convert with a custom output path
./98-output/md-to-pdf.sh 02-constating-documents/shareholders-agreements/2025-11-27-usa.md ./98-output/usa.pdf
```

### Output

Generated PDFs are placed in this directory by default. They are excluded from version control via `.gitignore` (add `98-output/*.pdf` to your `.gitignore` if needed).

For **signed** PDFs, store them in `09-binary-artifacts/` following the standard folder structure.
