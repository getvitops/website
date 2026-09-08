# Funding watch — standing agent prompt

Paste into Claude Cowork as a scheduled task. **Monthly.**

Baseline figures are as verified 2026-09-05 (`funding.md`). When something changes, update
`funding.md` and the affected `/funding/*` page in the same pass, and bump the "as of"
date on the figure — not on the whole page.

---

```
Track the status of Canadian SME digital-adoption and training funding programs
that Vitops (Ontario, Ottawa-based) cites on its website. Report only what CHANGED
since the baseline below.

Check each program against its official source — not aggregator/grant-consultant
blogs, which are consistently stale and often wrong on amounts:

1. Ontario Job Grant (replaced COJG) — ontario.ca/page/ontario-job-grant
   BASELINE: live since 2026-05-01, year-round intake. Up to $10K/trainee ($15K for
   a previously-unemployed new hire at an employer under 100). Employers under 100
   pay at least 1/6 of cost. Excludes training by a vendor on their own product, and
   business consulting. WATCHING FOR: eligibility changes, whether the vendor-training
   exclusion narrows (that's the specific use we care about), funding cap changes.

2. Ontario Digital Competence Centre — oc-innovation.ca/programs/digital-competence-centre/
   BASELINE: DMAP up to $15K matched, 1-499 employees, first-come while funds last.
   TDP closed 2026-08-10 with no replacement (OCI's own page has not been reworded
   to reflect this — verify by date, not by the page's stated tense). RMPG up to
   $5K, retail, 1-50 FT, physical location, 1+ year operating, $100K+ revenue; DMAP
   and RMPG are mutually exclusive. Vendor database and DAC roster applications
   temporarily closed to new entrants. WATCHING FOR: any TDP successor, DMAP intake
   closing "funds exhausted", eligibility or amount changes, new streams from the
   May 2026 $5M expansion.

3. BDC LIFT — bdc.ca/en/solutions/lift
   BASELINE: consulting + financing (a LOAN, not a grant). Min $1M revenue for the
   AI/digital path, $5M for equipment. Canadian-supplier requirement.
   WATCHING FOR: any grant component appearing, revenue thresholds changing,
   sector eligibility changes.

4. Digital Main Street Digital Transformation Grant — digitalmainstreet.ca/ontariogrants/
   BASELINE: $2,500; not accepting applications, vendor directory under review.
   WATCHING FOR: reopening and intake dates.

5. Sweep for NEW programs: federal or Ontario funding announced since the last run
   that covers software adoption, AI enablement, cybersecurity, or website/digital
   marketing for SMEs with 1-499 employees. Check ISED, FedDev Ontario, OCI, and
   Ontario Newsroom. Ignore anything sector-locked to manufacturing/agriculture/
   mining, and anything requiring R&D rather than adoption.

OUTPUT — keep it short:
- CHANGED: program, what changed, old value → new value, source URL, date observed.
- URGENT: anything with a deadline inside 60 days, or any figure Vitops currently
  publishes that is now wrong. Say plainly which page needs editing.
- NEW: program name, amount, eligibility in one line, source URL, and whether it
  actually fits an Ontario SME buying software/AI/website work.
- NO CHANGE: one line listing the programs verified unchanged. Do not restate their
  details.

If a source page is unreachable or ambiguous, say so rather than falling back to a
secondary source — a wrong published figure costs more than a gap.
```

---

## Why this exists

The funding pages are the highest-value pages on the site precisely because they carry
specific, dated, checkable numbers. That's also what makes them the fastest-decaying
content on the site. A stale grant figure is worse than no grant page — it's the kind of
error a prospect finds at exactly the wrong moment in the sales conversation.

One time bomb already went off: the **TDP August 10, 2026 deadline** passed with the site
still describing it as "closing" in the present tense — caught by this check, but only
because the check ran and read the date, not because OCI's own page changed its wording
(it hadn't, as of 2026-09-05). Lesson: a program's official page going stale is not a
signal by itself — the calendar has to be checked directly against every published
deadline, every run, regardless of what the source page currently says.

The DCC's first-come-while-funds-last intake remains time-bombed: it can close without an
announcement.
