# theroofxperts.com — SEO Audit & Engagement Proposal

Deliverable: `TheRoofXperts-SEO-Audit-Proposal-2026-09-11.pdf` (19 pages)
Source: `report.html` — print-styled HTML, Letter size.

## Regenerate the PDF

```bash
chrome --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
  --print-to-pdf=out.pdf file://$PWD/report.html
```

Any Chromium build works. Edit `report.html` and re-run to update.

## Scope note

The audit was produced without direct HTTP access to theroofxperts.com (the
authoring environment blocks outbound requests to third-party hosts). Findings
are sourced from search-engine index data, directory listings, and public
business records, and each cites its evidence. Technical items requiring a
direct crawl — Core Web Vitals, robots/sitemap, canonicals, image weight,
internal linking, analytics setup, backlink profile — are listed in Section 05
as open questions rather than asserted as findings.

Run those checks before sending the PDF to the client if you want Section 05
converted into hard numbers.
