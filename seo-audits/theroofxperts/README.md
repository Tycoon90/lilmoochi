# theroofxperts.com — SEO Audit

Two deliverables, same findings:

| File | Contents |
|---|---|
| `TheRoofXperts-SEO-Audit-2026-09-11.pdf` | 17 pages. Audit only — no pricing, no ROI math, no terms. |
| `TheRoofXperts-SEO-Audit-Proposal-2026-09-11.pdf` | 19 pages. Everything above plus three packages, comparison table, break-even math, and terms. |

## Sources

- `report.html` — the full priced version. Edit this one.
- `report-audit-only.html` — **generated, do not edit by hand.** Derived from
  `report.html` by `build-audit-only.py`, which strips the two pricing sections,
  rewrites the copy that referenced packages, and appends a "What Comes Next"
  closing section.

## Workflow

Edit `report.html`, then:

```bash
python3 build-audit-only.py     # regenerate the audit-only HTML
./render.sh                     # render both PDFs
```

`build-audit-only.py` fails loudly if any of its anchor strings stop matching,
so a copy edit that breaks the derivation will not silently produce a stale
audit-only PDF.

## Current pricing

| | Foundation | Growth | Market Leader |
|---|---|---|---|
| Build | $3,750 | $6,950 | $12,500 |
| Monthly | $595 | $1,295 | $2,195 |
| Year one | $10,890 | $22,490 | $38,840 |
| Break-even | 3.5 jobs | 7.3 jobs | 12.6 jobs |

Break-even assumes an $11,000 average ticket at 28% gross margin ($3,080 gross
profit per job). Change those assumptions and the ROI table in Section 08 of
`report.html` needs recalculating by hand.

## Scope note

The audit was produced without direct HTTP access to theroofxperts.com (the
authoring environment blocks outbound requests to third-party hosts). Findings
are sourced from search-engine index data, directory listings, and public
business records, and each cites its evidence. Technical items requiring a
direct crawl — Core Web Vitals, robots/sitemap, canonicals, image weight,
internal linking, analytics setup, backlink profile — are listed in Section 05
as open questions rather than asserted as findings.

Run those checks before sending either PDF to the client if you want Section 05
converted into hard numbers.
