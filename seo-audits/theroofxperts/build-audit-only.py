#!/usr/bin/env python3
"""Derive the audit-only variant from report.html by stripping the pricing sections.

Run after editing report.html to keep both deliverables in sync:
    python3 build-audit-only.py
"""

SRC = "report.html"
DST = "report-audit-only.html"

CLOSING = """<!-- ============ WHAT COMES NEXT ============ -->
<div class="page">
  <div class="sec-head">
    <div class="sec-kicker">Section 07</div>
    <h2 class="sec">What Comes Next</h2>
    <p>The order to attack this in, and how we work.</p>
  </div>

  <h3>Priority order</h3>
  <p>If nothing else in this report gets acted on, act on the first row. The two domain issues are
  costing you compounding authority every day they stay live, and both are resolvable inside a week.</p>

  <table>
    <thead><tr><th style="width:30mm">Priority</th><th>Work</th><th style="width:30mm">Findings</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>Fix now</strong><br><span class="small">Week 1&ndash;2</span></td>
        <td>Consolidate the brand onto one domain and redirect the second. Remove the placeholder WordPress content from search results. Stand up Search Console and analytics so there is a real baseline to measure against.</td>
        <td><span class="pill p-crit">C-01</span> <span class="pill p-crit">C-02</span></td>
      </tr>
      <tr>
        <td><strong>Fix next</strong><br><span class="small">Week 2&ndash;8</span></td>
        <td>Canonicalize the business address and hours across every directory Google reads. Merge or remove the duplicate listings before they trigger a profile suspension. Fully optimize the Google Business Profile.</td>
        <td><span class="pill p-crit">C-03</span> <span class="pill p-crit">C-04</span> <span class="pill p-med">M-03</span></td>
      </tr>
      <tr>
        <td><strong>Build</strong><br><span class="small">Week 3&ndash;16</span></td>
        <td>Rebuild the site around a real service and location page structure. Rewrite every title and description. Implement structured data. Surface the licenses, the 30-year history, and the financing offer where both Google and buyers can see them.</td>
        <td><span class="pill p-crit">C-05</span> <span class="pill p-high">H-01</span> <span class="pill p-high">H-03</span> <span class="pill p-high">H-05</span> <span class="pill p-med">M-02</span></td>
      </tr>
      <tr>
        <td><strong>Compound</strong><br><span class="small">Month 3 onward</span></td>
        <td>Run the content engine, build the storm and insurance-claim hub ahead of season, systematize review generation, convert completed jobs into individual project pages, and begin earning links.</td>
        <td><span class="pill p-high">H-02</span> <span class="pill p-high">H-04</span> <span class="pill p-high">H-06</span> <span class="pill p-med">M-04</span> <span class="pill p-med">M-05</span></td>
      </tr>
    </tbody>
  </table>

</div>

<!-- ---- continuation page ---- -->
<div class="page">
  <div class="sec-head tight">
    <div class="sec-kicker">Section 07 &mdash; continued</div>
    <h2 class="sec">How We Work</h2>
    <p>The terms of engagement, before any scope conversation.</p>
  </div>

  <table>
    <thead><tr><th style="width:44mm">Item</th><th>Commitment</th></tr></thead>
    <tbody>
      <tr><td>Ownership</td><td>You own the domain, the hosting account, the website, all content, and every analytics and Google property. No hostage arrangements &mdash; if we part ways, you keep everything.</td></tr>
      <tr><td>Reporting</td><td>Live dashboard access plus a written monthly report covering rankings, traffic, calls, form fills, and work completed. You see what was done and what it produced.</td></tr>
      <tr><td>Measurement</td><td>Call tracking and conversion tracking go in before the work starts, so growth is attributable to specific pages and cities rather than asserted.</td></tr>
      <tr><td>What we do not do</td><td>Guarantee rankings, buy links, build doorway pages, or use any tactic that risks a manual action on your domain.</td></tr>
      <tr><td>Honest timelines</td><td>Local SEO is not a 30-day business. Expect map-pack and impression movement in the first 45 days, first consistent organic lead flow by day 120, and a defensible position after month nine.</td></tr>
    </tbody>
  </table>

  <div class="callout dark nobreak" style="margin-top:6mm">
    <h4 style="color:#f4914f">Next step</h4>
    <p style="margin-bottom:0">A 30-minute call to walk through these findings, answer questions, and
    schedule the Discovery crawl that converts Section 05 from expectations into measured numbers.
    Scope and investment options follow separately, once we have agreed on what actually needs
    building.</p>
  </div>

  <p class="small" style="margin-top:6mm; border-top:1px solid var(--line); padding-top:3mm">
    <strong>Evidence sources:</strong> Google search index &middot; Better Business Bureau &middot; Yelp &middot; Angi &middot;
    HomeAdvisor &middot; Yahoo Local &middot; BuildZoom &middot; ZoomInfo &middot; Dun &amp; Bradstreet &middot; city-data business
    registry &middot; Florida DBPR licensing records &middot; Instagram. Audit conducted September 11, 2026.
    Technical performance items in Section 05 pending direct crawl.
  </p>
</div>

</body>
</html>
"""

# Copy edits for text that referenced packages or pricing.
EDITS = [
    (
        "<title>SEO &amp; Website Audit — theroofxperts.com</title>",
        "<title>SEO Audit — theroofxperts.com</title>",
    ),
    (
        "conversion architecture of The Roof Xperts' web presence — plus three engagement\n      options to rebuild it and run it.</p>",
        "conversion architecture of The Roof Xperts' web presence — and what it is costing\n      the business.</p>",
    ),
    (
        '<div><div class="lbl">Report type</div><div class="val">SEO Audit &amp;<br>Engagement Proposal</div></div>',
        '<div><div class="lbl">Report type</div><div class="val">SEO Audit &amp;<br>Findings Report</div></div>',
    ),
    (
        "Section 05 rather than asserted as findings. That crawl is the first deliverable of the\n    Discovery phase in any of the three packages, at no additional cost — and in our experience it\n    typically <em>adds</em> issues to this list rather than removing them.</p>",
        "Section 05 rather than asserted as findings. That crawl is the first deliverable of the\n    Discovery phase — and in our experience it typically <em>adds</em> issues to this list rather\n    than removing them.</p>",
    ),
    (
        "<p>Deliberately not asserted as findings. These are verified in Discovery, week one, included in every package.</p>",
        "<p>Deliberately not asserted as findings. These are measured in Discovery, in week one.</p>",
    ),
    (
        "would be guesswork, and you should not pay for guesswork.</p>",
        "would be guesswork, and guesswork is not what this report is for.</p>",
    ),
]


def main() -> None:
    src = open(SRC).read()
    marker = "<!-- ============ PRICING ============ -->"
    if marker not in src:
        raise SystemExit("pricing marker not found in " + SRC)

    out = src[: src.index(marker)] + CLOSING

    for old, new in EDITS:
        if old not in out:
            raise SystemExit("copy edit did not match: " + old[:70])
        out = out.replace(old, new, 1)

    open(DST, "w").write(out)
    print("wrote", DST)


if __name__ == "__main__":
    main()
