#!/usr/bin/env bash
# Gera CV_Edi_2026.pdf a partir de CV_Edi_ATS.html (Chrome headless).
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/CV_Edi_2026.pdf" "file://$PWD/CV_Edi_ATS.html" 2>/dev/null
pdfinfo CV_Edi_2026.pdf | grep Pages
