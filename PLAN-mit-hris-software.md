---
page: /managed-it-services/hris-software
status: draft-v1 — keywords UNVERIFIED, pending Semrush pass; vendor list RESOLVED (2026-09-05)
priority: 14
depends_on: [PLAN-managed-it-services]
blocks: []
target_geography: Ontario (primary), Canada-wide secondary
primary_keywords_UNVERIFIED:
  - candidates: "hris implementation", "hr software small business", "employee onboarding software"
forbidden_terms:
  - "we run your HR / payroll" as a performed service — this page is about the software layer only, matching the session's bookkeeping/payroll decision
title_prop: "HRIS software: employee records & onboarding"
title_char_count: 46
rendered_title: "HRIS software: employee records & onboarding — Vitops"
rendered_char_count: 55
meta_description: "HRIS software chosen and configured so a start date or termination drives accounts, licences and permissions automatically — for Ontario small businesses."
meta_description_char_count: 152
schema_types: [Service, BreadcrumbList]
links_out: ["/managed-it-services (parent pillar — this is the JML trigger for the whole plan)", "/pricing", "/contact"]
links_in_needing_repoint: []
vendors: [Zoho People, Rippling, Collage HR, Rise People]
open_questions:
  - "RESOLVED 2026-09-05: vendor list confirmed as Zoho People, Rippling, Collage HR, Rise People. Rippling also appears in KeyPartners.astro's site-wide logo strip and in other service-category subpages — confirmed HR/HRIS-relevant, not a device-management signal (see PLAN-managed-it-services.md's claim-strip notes, now resolved)."
  - "Still BLOCKED: Semrush pass for keyword volumes."
---

# PLAN — `/managed-it-services/hris-software` (new page)

**Step 14.** Structure ready; **two things genuinely blocked**, not just the usual
Semrush gate — see Open questions. This is also the page that makes the joiner/mover/
leaver (JML) trigger concrete: `/managed-it-services`'s FAQ already describes JML as
wired to the HRIS, so this page is where that mechanism gets its own explanation rather
than a re-summary.

---

## Sections

### 1 — Hero

```
eyebrow: "Managed IT services / HRIS software"
H1:      "The employee record that drives every other account."
lead:    "One system of record for who's on staff, what they're entitled to, and when
          that changes — wired so a start date or a termination provisions or revokes
          access everywhere else automatically."
```

### 2 — Direct answer

> An HRIS is the system of record for employee data — who's employed, their role,
> their start date, their status. Zoho People, Rippling, Collage HR and Rise People
> cover most small-business cases in Canada. It matters beyond HR because it's the
> trigger for everything else: when it's wired to your other software, a new hire's
> accounts, licences and permissions follow the record instead of a request going to
> us, and a termination revokes access the same day rather than whenever someone
> remembers.

### 3 — What we run

- HRIS selection between Zoho People, Rippling, Collage HR and Rise People — based on
  how your team actually works, not brand preference.
- Configuration — records, time off, policy acknowledgements.
- The joiner/mover/leaver trigger — wired into the rest of your software stack, to the
  extent each application exposes the hooks (some SaaS tools don't; we'll tell you
  which ones have to be handled by hand).
- Access review — the HRIS is also how we confirm nobody's access has quietly outlived
  their employment.

**Rippling note:** Rippling also does payroll and device management on its own
platform. This page only covers its HRIS/employee-record use — see
[managed IT services](/managed-it-services) for the device-management boundary
(not offered) and [bookkeeping and payroll software](./bookkeeping-payroll-software)
for the payroll boundary (software administered, client submits and approves runs).
Naming Rippling here is not a claim that we run its device-management module.

### 4 — FAQ

> **Does this include running payroll or benefits?**
> No — this page is about the employee-record software itself. Payroll and benefits
> administration software is its own category: see [bookkeeping and payroll
> software](/managed-it-services/bookkeeping-payroll-software).

> **What if our current HRIS doesn't support the joiner/leaver automation?**
> We'll tell you which parts don't reach and handle those manually rather than promise
> automation the platform can't actually do.

### 5 — CTA

```
title: "Tell us how a new hire gets set up today."
lead:  "Walk us through the last one — what took a phone call, what took a week. We'll
        tell you what we'd automate first."
links: [{ label: "Managed IT services", href: "/managed-it-services" }, { label: "Pricing", href: "/pricing" }]
```

## Files

New: `src/pages/managed-it-services/hris-software.astro`.

## Verification

Standard checklist. **Do not publish with an invented second HRIS vendor** — resolve
the open question first.
