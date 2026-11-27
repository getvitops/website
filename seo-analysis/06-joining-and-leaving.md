# /joining-and-leaving: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Terms not listed returned no volume.

## Role and verdict

Managed software sub-service. **Geo tier B.** The page title ("Joining and leaving") is internal
wording that nobody searches. The searches that exist are about onboarding and offboarding
checklists, and they are small. The best use of this topic is a page that answers "what does IT
do when someone joins or leaves", which also earns quotes in AI answers.

## Keyword data

| Keyword                                                 | Volume | KD  | CPC   | Note                                |
| ------------------------------------------------------- | ------ | --- | ----- | ----------------------------------- |
| user provisioning                                       | 70     | 29  | n/a   | Technical wording; not the audience |
| employee offboarding checklist                          | 40     | 0   | $1.85 | Semrush had no SERP data for it     |
| it offboarding checklist                                | 20     | 0   | n/a   |                                     |
| employee onboarding software (tracked, Ottawa)          | 20     | n/a | n/a   | Wrong intent: that is HR software   |
| employee onboarding it checklist, new employee it setup | none   | n/a | n/a   | No volume recorded                  |

Semrush returned no organic results for `employee offboarding checklist`, so there is no SERP to
compare against.

## Current state

- Title: `Joining and leaving | Vitops`. Kicker "Managed software". H1 "Set up right on day one. Locked
  out the day they leave." is excellent.
- About 320 words: a role-based setup (front desk, technician, manager) and three approach cards.

## Recommended changes, highest impact first

1. **Title and meta (medium).**
   - Title (53): `Employee Onboarding and Offboarding IT Setup | Vitops`
   - Meta (153): `New staff get the right accounts on day one, and leavers lose access the same day. IT onboarding and offboarding for Ottawa and Ontario small businesses.`
2. **Say "onboarding" and "offboarding" in the body (medium).** The page uses "joining" and
   "leaving". Use both pairs, once each, in the lead and a heading, so the page matches the
   searches without losing its voice.
3. **Add a short offboarding checklist (medium).** Five or six lines (disable accounts, recover
   devices, transfer files and email, remove from shared tools, revoke vendor access). It
   serves the two checklist terms and is the sort of list AI answers quote.
4. **Link to licences and backup (medium).** Leavers' licences feed `/licences-cost-control`, and
   their files feed `/backup-security`; link both from the checklist.
5. **Structured data (low).** `Service` plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                       | Proposed                               |
| --------------- | ------------------------- | -------------------------------------- |
| Kicker          | Managed software                | Managed software: onboarding and offboarding |
| Section heading | One setup for every role. | (keep)                                 |

## Cannibalization

Owns onboarding and offboarding wording. Must not target HR software terms.
