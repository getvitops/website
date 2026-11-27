# /funding: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site).

I have not checked any program's current rules. Everything about what DMAP, RMPG, BDC LIFT or
CDAP pay, who qualifies and when they closed is taken from the page as it stands, and has to be
confirmed against the official program pages before launch (see "Facts to confirm").

## Role and verdict

Information page that doubles as the best lead-in on the site. **Geo tier A:** Ontario is in the
programs' names and eligibility, so it belongs in the title and the lead.

This is the one page with search demand that is both real and honestly winnable, for two reasons:

1. **People are still searching for programs that have ended.** `cdap` gets 880 searches,
   `canada digital adoption program` 720, `cdap grant` 390 and `cdap canada` 170: about 2,160 a
   month in total, at difficulty 24 to 29. The page already says plainly that CDAP has ended, "even
   though many websites still describe it as open". That is useful to a searcher and unusual in
   the results.
2. **Vitops already ranked here.** The old vitops.ca held `dmap grant` at position 20 (70 searches
   a month) from `/funding/dmap`. That visibility is lost unless the old URL is redirected (see
   the launch checklist in `25-home.md`).

The page is also a conversion page: the callout and the "We'll tell you before you apply" section
turn a funding question into a first call.

## Keyword data

| Keyword                                                              | Volume       | KD      | CPC         | Note                                                |
| -------------------------------------------------------------------- | ------------ | ------- | ----------- | --------------------------------------------------- |
| cdap                                                                 | 880          | 28      | $3.53       | Ended program. Informational: answer it honestly    |
| canada digital adoption program                                      | 720          | 25      | $2.95       | Same                                                |
| ontario small business grants                                        | 720          | 19      | $2.68       | Broad. All grants, not only technology              |
| ontario centre of innovation                                         | 590          | 32      | n/a         | Navigational: people looking for OCI itself         |
| ontario grants for small business                                    | 480          | 25      | $2.68       | Broad                                               |
| digital main street                                                  | 390          | 32      | $2.98       | A different program. Do not use the name as a claim |
| cdap grant                                                           | 390          | 29      | $2.67       | Ended program                                       |
| cdap canada                                                          | 170          | 24      | $1.99       | Ended program                                       |
| government grants for small business ontario                         | 140          | 31      | $3.03       | Broad                                               |
| bdc lift, bdc lift program                                           | 110 / 110    | 23 / 21 | n/a / $3.92 | On the page already                                 |
| dmap grant                                                           | 70           | 18      | $1.68       | The page's old ranking                              |
| dmap ontario, dmap program                                           | 30 / 30      | 0       | n/a         | No SERP data worth trusting at this size            |
| retail modernization grant                                           | 20           | 0       | n/a         | The closest searched wording for RMPG               |
| oci grant, digital transformation grant ontario, ontario grants 2026 | 10 / 20 / 10 | 0       | n/a         | Tiny                                                |

A difficulty of 0 on a term this small means Semrush has too little data to score it, not that it
is easy.

The top ten for `dmap grant` is the program's own pages (oc-innovation.ca, news.ontario.ca) and
funding consultants and grant writers (Ryan, 180 Systems, hellodarwin, Fair Grant Writing, Global
DWS, Designography). To rank near them, the page has to be as accurate as the official source and
add what the consultants rarely say: which program fits, what stops people, and what has ended.

## Current state

- Title: `Funding | Vitops`. It says nothing about what, where or for whom.
- Kicker "Funding". H1 "Government funding for your technology, explained plainly." Good.
- About 900 words: three programs (DMAP up to $15,000, RMPG up to $5,000, BDC LIFT from
  $25,000), a "No longer available" block (the Technology Demonstration Program closed on
  August 10, 2026, and CDAP has ended), a "which one fits" chooser, four things that stop
  people, a "we'll tell you before you apply" section, a callout and a six-question FAQ.
- A visible "Last checked October 2026. Programs change often, so we re-check every month."
- No outbound links to the official program pages.
- The acronyms DMAP and RMPG are used without their full names in the headings and the title.
- No structured data beyond the site-wide organization data.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (60): `Ontario Technology Funding: DMAP, RMPG and BDC LIFT | Vitops`
   - Meta (146): `Which technology funding is open to Ontario small businesses: DMAP, RMPG and BDC LIFT explained, and what has ended (CDAP). Checked monthly.`
   - Set these in the page's SEO fields, not the layout.
2. **Own the CDAP question (high).** Add a clear heading and a lead-in, using the program's full
   name once and the acronym once: "Is the Canada Digital Adoption Program (CDAP) still
   available? No. It has ended." Then what to look at instead. The page has the facts, but they
   sit in a callout and the fifth FAQ answer, and the page never uses the phrase as a heading. It
   is the best match on the page for about 2,160 monthly searches. Keep the tone as it is now:
   plain, not alarmist.
3. **Spell out every acronym once (high).** "Digital Modernization and Adoption Plan (DMAP)" and
   the full RMPG name, then use the short form. People search both forms, and a page that
   defines the term is the page AI answers quote. Check the exact official names against OCI.
4. **Link each program to its official page (high).** One link per card to the program's own page
   (OCI for DMAP and RMPG, BDC for LIFT). Primary sources raise trust, and a funding page with no
   source is easy to doubt. Official pages are not paid or affiliate, so use ordinary links.
5. **Refresh and show the date (high).** The page says "we re-check every month" and "last
   checked October 2026". The pull for this analysis is dated November 27, so the November check
   is due. A visible, accurate "Last checked" date is one of this page's strongest trust
   signals; a stale one is worse than none. Mark it up as the page's `dateModified`.
6. **Add `Organization` context where it is true (medium).** If Vitops is an approved or listed
   service provider for a program, say so with the program's own wording. If it is not, say that
   Vitops is an independent adviser and is not affiliated with OCI or BDC. Either way, it avoids
   the impression of an official site. See the open questions.
7. **Link in from other pages (medium).** The funding page has few ways in. Link to it with the
   anchor "Ontario technology funding" from the home page callout, the contact page callout,
   `/industries` (FAQ answer on DMAP), `/pricing`, `/software-selection-setup` (DMAP funds a
   technology plan) and `/ai` (the AI financing under BDC LIFT).
8. **Structured data (medium).** `WebPage` with `dateModified`, plus `BreadcrumbList` (Home >
   Funding). `FAQPage` is optional: expect no visible search gain, but it helps AI answers.
9. **Redirect the old URL (launch checklist).** `/funding/dmap` to `/funding`, already planned in
   `25-home.md`. Add the DMAP section anchor if you want the old visitors to land on it
   (`/funding#dmap`), keeping the redirect itself a plain 301.
10. **Broad grant terms: a small step, not a rewrite (low).** `ontario small business grants`
    (720, KD 19) and `ontario grants for small business` (480) are real, but they cover every kind
    of grant, from hiring to exporting, and the visitor is not shopping for technology. One line
    ("This page covers technology funding. For other Ontario small business grants, see the
    province's own list") with a link to the official list serves them honestly without turning
    the page into a grants directory. Do not write about programs you do not advise on.

## Facts to confirm before launch

I could not verify any of these. A funding page that is wrong costs more than one that is thin.

| Claim on the page                                                                                      | Check against                                                        |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| DMAP "up to $15,000", "pays half", "1 to 499 employees"                                                | The current DMAP guidelines on the Ontario Centre of Innovation site |
| RMPG "up to $5,000", storefront retailers, "can't be combined with DMAP"                               | OCI's RMPG page                                                      |
| BDC LIFT "$25,000 and up", "at least $1 million in yearly revenue", incentives for Canadian-made tools | BDC's LIFT page                                                      |
| Technology Demonstration Program "closed on August 10, 2026"                                           | OCI's announcement                                                   |
| CDAP "has also ended"                                                                                  | The federal program page                                             |
| "First come, first served while funds last"                                                            | Each program's intake notice                                         |
| "Last checked October 2026"                                                                            | Update when you re-check, and state the day                          |

## Copy rewrites (proposed, not applied)

| Where                 | Now                                                     | Proposed                                                                                           |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Kicker                | Funding                                                 | Ontario technology funding                                                                         |
| Card title            | DMAP – up to $15,000                                    | Digital Modernization and Adoption Plan (DMAP): up to $15,000                                      |
| Card title            | RMPG – up to $5,000                                     | `<full official name>` (RMPG): up to $5,000                                                        |
| Section heading       | No longer available.                                    | Programs that have ended, including CDAP.                                                          |
| FAQ question          | Is the Canada Digital Adoption Program still available? | Is the Canada Digital Adoption Program (CDAP) still available? (keep, and echo as a heading above) |
| Section sub (checked) | Last checked October 2026. ...                          | Last checked `<day month year>`. ...                                                               |

## Cannibalization

Owns "funding", "grant" and the program names. It must not target software or marketing service
terms, and no service page should target funding terms. Service pages link here and use the
anchor "Ontario technology funding". `/industries` and `/contact` only mention DMAP in passing.

## Open questions for you

- Is Vitops an approved or listed adviser for DMAP, RMPG or BDC LIFT, or an independent adviser?
  The page should say which, in the program's own wording.
- Can you re-check the programs now and give the exact date? The page's monthly check is due.
- What is the full official name of RMPG, and does it still apply as described?
- Do you want a short line pointing to other Ontario small business grants, or keep the page
  strictly to technology funding?
- Is "we don't charge for application help" still the policy, given the FAQ says you are paid for
  the work the funding supports?
