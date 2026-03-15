#!/bin/bash

# Converts markdown files to PDF using pandoc
# Usage: ./md-to-pdf.sh <input.md> [output.pdf]
# If output.pdf is not specified, uses same name as input with .pdf extension
#
# Prerequisites: pandoc, xelatex (texlive), DejaVu fonts

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR"

if [ $# -lt 1 ]; then
    echo "Usage: $0 <input.md> [output.pdf]"
    echo "Converts a markdown file to PDF"
    exit 1
fi

INPUT="$1"

if [ ! -f "$INPUT" ]; then
    echo "Error: Input file '$INPUT' not found"
    exit 1
fi

BASENAME=$(basename "$INPUT" .md)

if [ $# -ge 2 ]; then
    OUTPUT="$2"
else
    OUTPUT="$OUTPUT_DIR/$BASENAME.pdf"
fi

echo "Converting: $INPUT"
echo "Output: $OUTPUT"

pandoc "$INPUT" \
    -o "$OUTPUT" \
    --pdf-engine=xelatex \
    -V geometry:margin=1in \
    -V fontsize=11pt \
    -V documentclass=article \
    --toc \
    --toc-depth=3 \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    -V mainfont="DejaVu Serif" \
    -V sansfont="DejaVu Sans" \
    -V monofont="DejaVu Sans Mono"

echo "Done: $OUTPUT"
