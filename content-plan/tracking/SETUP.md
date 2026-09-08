# Semrush Position Tracking — setup runbook

The Semrush MCP (`mcp__semrush__*`) is read-only: `position_tracking` and `projects`
expose 15 reports total, all fetches. There is no write endpoint for creating a campaign,
adding a location, or adding keywords — this has to be done by hand in the Semrush UI.
Everything after setup (harvesting results, competitor discovery) is scriptable through
the MCP; see "Verify" below.

Project: **Vitops**, `project_id` 30789493. `tracking` tool is already enabled on it;
Position Tracking itself is not yet configured (`campaigns` currently returns
`{"targets": null}`).

## Plan limit: 1 target only

The current Semrush plan caps Position Tracking at **1 target** (a target = one
domain + location + device + engine combo — Pro+ allows up to 10). Keyword count isn't
the limiter — a single target already comfortably holds 100+ keywords. This rules out
the original two-location design (`ottawa.txt` + `canada.txt` as separate targets,
optionally ×2 for Mobile). Kept below for reference if the plan is ever upgraded.

## Steps (current plan — single target)

1. Semrush → Projects → **Vitops** → Position Tracking → Set up (or edit the existing
   target if one's already there).
2. Domain `vitops.ca`, scope **Domain** (includes subdomains), search engine Google,
   device **Desktop**, location **Ottawa, Ontario, Canada**, language English.
3. Keywords → paste the contents of [`single-target.txt`](single-target.txt) — 84 unique
   keywords (global + Ottawa + Canada sets merged, deduped).
4. Competitors: leave empty at setup. Don't guess — after the first harvest, pull
   `tracking_competitors_organic` and add the top ~10 domains that actually rank for
   our set.
5. Start tracking.

**Tradeoff accepted:** the 63 "Canada" national terms (pillar/software/industry head
terms) get tracked from an Ottawa vantage point rather than a geo-neutral one. Rankings
for genuinely national terms may read slightly local-skewed, but relative movement over
time is still a real, useful signal — better than not tracking them at all.

## If the plan is upgraded to Pro+ (2+ targets)

Split back into two targets, each with its own keyword list:

1. Target 1: Ottawa, Ontario, Canada, Desktop → paste [`ottawa.txt`](ottawa.txt) (28 lines).
2. Target 2: Canada (national), Desktop → paste [`canada.txt`](canada.txt) (63 lines).
3. Add Mobile for either/both if slots allow — mobile SERPs differ materially for
   local-pack terms, so Ottawa Mobile is the higher-value addition of the two.

Total slots at that point: ~91 (28+63) Desktop-only; up to ~182 with Mobile on both.

## Verify (via MCP, after the first harvest — a few hours after setup)

```
execute_report(campaigns, {project_id: 30789493})
  → targets no longer null; location/device count matches what was configured

execute_report(tracking_campaign_dates, {project_id: 30789493, ...})
  → confirms a harvest date exists

execute_report(tracking_position_organic, {project_id: 30789493, ...})
  → row count ≈ 28 (Ottawa) / 63 (Canada); spot-check "it support ottawa" and
    "managed it services" both appear

execute_report(tracking_landing_pages_organic, {project_id: 30789493, ...})
  → each keyword resolves to the page its PLAN file (or ../keywords.md) assigns it;
    a mismatch is a cannibalisation signal, not just a ranking miss

execute_report(tracking_competitors_organic, {project_id: 30789493, ...})
  → real competitor set; feed top ~10 back into step 4 above
```

Call `get_report_schema(report=...)` on each before executing — several take
`display_date` / `display_limit` params not spelled out here.

## Source

Keyword sets and the reasoning behind each are in [`../keywords.md`](../keywords.md), not
duplicated here — this file is only the mechanical how-to.
