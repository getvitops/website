---
page: /managed-it-services/bookkeeping-payroll-software
replaces: /back-office (301 already wired to this exact path)
status: draft-v1 — keywords UNVERIFIED pending Semrush; pricing contingency RESOLVED 2026-09-05 (draft below already matches)
priority: 16
depends_on: [PLAN-managed-it-services, PLAN-pricing (blocking)]
blocks: []
target_geography: Ontario (primary), Canada-wide secondary
primary_keywords_UNVERIFIED:
  - candidates: "bookkeeping software", "quickbooks setup", "quickbooks consultant", "zoho books", "payroll software canada", "payworks", "adp setup"
  - PLUS: difficulty + current local rankers for "bookkeeping services" / "bookkeeping services ottawa" — needed to settle whether those parked terms (2400/mo CA, 320/mo Ottawa) ever earn their own page
forbidden_terms:
  - "bookkeeping services" / "payroll services" as THIS page's own target — those stay
    parked (see master plan) until the DoyoBooks positioning question resolves; this
    page targets the software-setup/consultant terms only
  - describing transaction coding, reconciliations, or a monthly close as work VITOPS
    performs — that's the bookkeeping SERVICE, which is no longer offered. This page is
    about the software layer only.
title_prop: "Bookkeeping & payroll software: QuickBooks, Zoho Books, Payworks"
title_char_count: 60
rendered_title: "Bookkeeping & payroll software: QuickBooks, Zoho Books, Payworks — Vitops"
rendered_char_count: 69
note: "9 over budget — trim once a real anchor term is confirmed. Placeholder shorter form: 'Bookkeeping & payroll software, administered' (45 chars, rendered 54)."
meta_description: "QuickBooks, Zoho Books, Payworks or ADP — selected, connected and administered for Ontario small businesses. Your books, your accountant; your payroll runs, your approval."
meta_description_char_count: 172
schema_types: [Service, FAQPage, BreadcrumbList]
links_out: ["/managed-it-services (parent pillar)", "/managed-it-services/invoicing-software (feeds the books)", "/managed-it-services/hris-software (payroll trigger)", "/pricing", "/contact"]
links_in_needing_repoint: ["astro.config.mjs already redirects /back-office here — confirm the redirect target still matches once this file is created"]
open_questions:
  - "RESOLVED 2026-09-05: bookkeeping has NO priced line anywhere on the site now (removed from pricing.astro entirely, not folded in as a free inclusion either) — this page's bookkeeping half describes software administration only (QuickBooks/Zoho Books setup, bank-feed/integration wiring), explicitly not a billed bookkeeping service, until DoYo resolves. Payroll/benefits keep their existing prices under the software-administration framing. Draft below already matches this — no rewrite needed."
  - "Parked-term decision: if DoyoBooks is ever brought into the offering, this page's scope — and the 'bookkeeping services' keyword parking — both need revisiting together, not separately."
---

# PLAN — `/managed-it-services/bookkeeping-payroll-software` (new page, absorbs `/back-office`)

**Step 16.** The largest content migration of the seven subpages — `/back-office`
(388 lines, fully read) had a dedicated stat band, a pulled-out `#bookkeeping` block,
and 13 FAQ items, nearly all built on the premise that Vitops **performs** bookkeeping
and payroll. This page keeps the boundary-setting instinct of that content (the "we run
it, we don't advise on it" section is _more_ relevant here, not less) but the actual
work described has to change from **doing the books** to **running the software the
books get done in** — that's not a find-and-replace, it's a rewrite of what's claimed.

---

## What carries over from `/back-office`, and what doesn't

| From `/back-office`                                                                                                                                                    | Treatment here                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `problems` (4 cards: deadlines, onboarding, offboarding, systems disagreeing)                                                                                          | **Cuts mostly apply elsewhere.** "Onboarding is four systems" and "offboarding" are identity/JML problems → belong on `/managed-it-services/hris-software`, not here. "The systems disagree" (payroll/HRIS/benefits mismatch) is a software-integration problem → **keeps**, reframed as what good bookkeeping/payroll _software configuration_ prevents. |
| `backOfficeStats` (20 hrs/week bookkeeping; 5 hrs/pay-period payroll — both sourced)                                                                                   | **Keep, reframed as the cost of doing it without properly configured software** — the stat is about time spent, which is still true whether Vitops or the client's own bookkeeper is the one spending it.                                                                                                                                                 |
| Bookkeeping block ("Transaction coding, bank and credit card reconciliations...", "Why ours is different: we also run it — bank feeds, receipt capture, integrations") | **Cannot carry over as-is** — this describes Vitops _doing the bookkeeping_. Rewrite: we set up the chart of accounts, connect the bank feeds, and wire the integrations; your bookkeeper or accountant does the coding and reconciliation _inside the software we've configured_.                                                                        |
| "What we don't do" section (employer of record, never hold funds, not a PEO)                                                                                           | **Keeps, and gets MORE relevant, not less** — these disclaimers already describe a software-administration relationship better than a full-service one. Almost no rewrite needed.                                                                                                                                                                         |
| FAQ: "Do you replace our bookkeeper?", "Can I take just one service?", "What accounting software do you use?"                                                          | **Rewrite the premise** — from "we're an alternative to a bookkeeper" to "we're the reason your bookkeeper's software works properly," see draft FAQ below.                                                                                                                                                                                               |
| FAQ: "Do you ever hold our money?", "Who's the employer of record?"                                                                                                    | **Keep near-verbatim** — already correct for this framing.                                                                                                                                                                                                                                                                                                |

---

## Sections

### 1 — Hero

```
eyebrow: "Managed IT services / Bookkeeping & payroll software"
H1:      "The books your accountant works from. The runs you approve."
lead:    "QuickBooks, Zoho Books, Payworks, or ADP — selected, connected to the rest of
          your stack, and kept running. The coding and the pay run stay with you or
          your accountant; we make sure the software they run on works."
```

### 2 — Direct answer

> Bookkeeping and payroll software means the platforms your books and pay runs
> actually live in — QuickBooks or Zoho Books for the former, Payworks or ADP for the
> latter. We select the right one, connect it to your invoicing and HR systems so
> nothing needs retyping, and administer it on an ongoing basis. The books themselves
> stay with you or your accountant; payroll runs stay something you submit and approve
> yourself — we run the tenant, the same relationship we have with Microsoft 365.

### 3 — What goes wrong without this (`SectionIntro` + `Stats`)

Reuse `backOfficeStats` (20 hrs/week bookkeeping admin, 5 hrs/pay-period payroll,
both already sourced — no new sourcing needed) with a reframed lead:

```
eyebrow: "What goes wrong"
H2:      "The systems disagree, and somebody has to reconcile it by hand."
lead:    "Payroll thinks she's part-time, the HRIS thinks she's full-time, benefits has
          her on the old plan. Properly connected software prevents this; disconnected
          software is what creates the reconciliation nobody has time for."
```

### 4 — What we run

- Platform selection — QuickBooks, Zoho Books, Payworks, ADP, or whatever you're
  already on, if it's sound.
- Bank feed and integration setup — invoicing, payroll, and the CRM feeding the books
  automatically instead of by hand.
- Ongoing administration — user access, permissions, and keeping the integrations
  alive as your other software changes.

### 5 — What we don't do (near-verbatim from `/back-office`, already correct)

> We don't do the books, and we don't run payroll. Your accountant or bookkeeper codes
> transactions and reconciles accounts inside the software we've set up. You submit and
> approve every payroll run yourself. We never hold or move your money, and you remain
> the employer of record throughout.

### 6 — FAQ

> **Do you do our bookkeeping?**
> No — we select, connect and administer the software (QuickBooks, Zoho Books). The
> books themselves stay with you or your accountant.

> **Do you run our payroll?**
> We administer the system — Payworks, ADP, or whatever you're on — and keep it wired
> to your HRIS. You submit and approve every run.

> **Do you ever hold our money?**
> No. Every payment runs from your account through your own payroll provider. We don't
> operate a trust account and don't hold signing authority anywhere.

> **Who's the employer of record?**
> You are. We administer the software; we don't take on employment liability.

> **What accounting software do you use?**
> Whatever you're on, if it's working — usually QuickBooks or Zoho Books. If we also
> run your other software, we own the bank feeds and integrations into payroll and
> your CRM rather than working around whatever someone else configured.

### 7 — CTA

```
title: "Tell us what you're running today."
lead:  "QuickBooks, Zoho Books, Payworks, ADP, or a spreadsheet held together with
        hope — we'll tell you what we'd connect first."
links: [{ label: "Managed IT services", href: "/managed-it-services" }, { label: "Pricing", href: "/pricing" }]
```

---

## Files

New: `src/pages/managed-it-services/bookkeeping-payroll-software.astro`. Retire
`src/pages/back-office.astro` (redirect already wired). Update
`content-plan/copy/back-office.md` to match or mark superseded.

## Verification

Standard checklist, plus: grep this page specifically for "we code," "we reconcile,"
"we do the books," "we run payroll" — any hit is the old service-framing leaking back
in. Confirm against whatever `PLAN-pricing.md`'s blocking decision resolves to before
publishing.
