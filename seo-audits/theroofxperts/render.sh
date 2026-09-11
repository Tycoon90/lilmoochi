#!/usr/bin/env bash
# Render both PDFs from their HTML sources.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
[ -x "$CHROME" ] || CHROME="$(command -v chromium || command -v google-chrome)"

render() {
  "$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
    --print-to-pdf="$2" "file://$PWD/$1" 2>/dev/null
  echo "rendered $2"
}

python3 build-audit-only.py
render report.html            "TheRoofXperts-SEO-Audit-Proposal-2026-09-11.pdf"
render report-audit-only.html "TheRoofXperts-SEO-Audit-2026-09-11.pdf"
