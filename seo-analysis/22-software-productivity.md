# /software-productivity: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. See `17-software-pages-overview.md` first.

## Role and verdict

Software category page. **Geo tier B.** This is the closest of the seven to Vitops' core work
(Microsoft 365, Google Workspace and Zoho Workplace are what every client runs on), and it has
the clearest comparison search: "Microsoft 365 vs Google Workspace". Demand is moderate and
difficulty is low (27), so this page deserves more attention than its size suggests. It also
connects to the Microsoft 365 consultant and migration terms in `00-positioning.md`.

## Keyword targets

| Keyword                           | Volume | KD  | CPC    | Role                                                |
| --------------------------------- | ------ | --- | ------ | --------------------------------------------------- |
| google workspace vs microsoft 365 | 170    | 27  | $6.15  | **Primary**                                         |
| microsoft 365 vs google workspace | 50     | n/a | $4.16  | Same page, same heading                             |
| microsoft 365 business            | 1,000  | 45  | $7.26  | Informational/transactional: mention, do not target |
| zoho workplace                    | 320    | 29  | $10.25 | Navigational: mention                               |
| business email hosting canada     | 50     | n/a | n/a    | Supporting: fits the email section                  |
| best email for small business     | 20     | n/a | $6.71  | Supporting                                          |

## Current state

- Title: `Productivity software | Vitops`. H1: "Email, files and documents. Set up right, and
  kept that way." (good).
- Names Microsoft 365, Google Workspace and Zoho Workplace, and covers email and calendar, files,
  documents, PDFs and e-signatures, forms and bookings, notes and team knowledge.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (55): `Microsoft 365 vs Google Workspace for Business | Vitops`
     (The earlier brief's `... for Small Business | Vitops` is 61 characters and gets cut off.)
   - Meta (150): `Microsoft 365, Google Workspace or Zoho Workplace, chosen for how your team works, then set up right and looked after every month. Ottawa and Ontario.`
2. **Make it a real comparison (high).** A table: price per user, email, files, video calls,
   security features, who it suits. Use a "Microsoft 365 vs Google Workspace" heading, and keep
   prices dated.
3. **Give a recommendation (medium).** The page says "three good options, we'll help you pick."
   State the rule of thumb you use (for example, keep what the team already knows; choose
   Microsoft 365 when Office files and Teams matter; Google Workspace when the team lives in the
   browser). People quote clear rules.
4. **Link up and across (high).** To `/software-selection-setup` (Microsoft 365 and Google
   Workspace setup and migration), `/software-communication` and `/backup-security` (backup for
   both suites).
5. **Structured data (low).** `Service` plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                                      | Proposed                                        |
| --------------- | ---------------------------------------- | ----------------------------------------------- |
| Kicker          | Productivity software                    | Email, files and documents for small businesses |
| Section kicker  | Three platforms                          | Platforms                                       |
| Section heading | Three good options. We'll help you pick. | Which one fits your team.                       |

## Cannibalization

Owns the suite comparison and email wording. `/software-selection-setup` owns setup and
migration terms; `/backup-security` owns Microsoft 365 backup.
