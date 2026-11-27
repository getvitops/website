# /estimate: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json` or the estimator.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site). The plan structure is still being decided
(`../pricing-model-pros-cons.md`), so nothing below fixes a price.

## Role and verdict

An interactive tool, not a content page. **Geo tier B:** geo-neutral title; the tool works the same
anywhere in Canada, and the Ottawa and Ontario signals live in the site-wide data.

Search demand for "calculator" and "estimator" wording is small, and `/pricing` is the page that
should rank for pricing terms (see `26-pricing.md`). The estimator's job is conversion: it takes
someone from "what will this cost" to "get an exact quote" with a number in hand. Spend effort on
keeping it correct and consistent with `/pricing`, not on traffic.

The estimate page and the pricing page are the same subject. The risk to manage is **duplicate
intent**: two pages that both answer "how much does it cost". The pricing page owns the terms; the
estimator is the tool it links to.

## Keyword data

| Keyword                                                                                                                            | Volume  | KD      | CPC         | Note                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ----------- | ------------------------------------------------------- |
| price calculator                                                                                                                   | 390     | 39      | $1.80       | Generic, transactional: not our audience. Do not target |
| get a quote                                                                                                                        | 590     | 60      | $12.14      | Generic, transactional. Do not target                   |
| how much does a website cost                                                                                                       | 260     | 48      | $2.41       | Informational. A guide, not a tool page                 |
| website design pricing                                                                                                             | 170     | 46      | $2.79       | Supporting for `/pricing`                               |
| managed it services pricing                                                                                                        | 110     | 12      | n/a         | Managed-IT intent: do not target (see `26-pricing.md`)  |
| seo cost calculator                                                                                                                | 70      | 0       | n/a         | The closest fit for the tool, but tiny                  |
| cost estimator                                                                                                                     | 70      | 30      | $4.09       | Generic. Construction and software estimators dominate  |
| ppc management cost, social media management pricing                                                                               | 70 / 70 | 22 / 32 | n/a / $2.95 | Belong to `/ads` and `/social-media`                    |
| website cost calculator                                                                                                            | 50      | 23      | $2.18       | Small and specific. One of the few matching the tool    |
| digital marketing pricing                                                                                                          | 30      | 0       | $2.81       | Belongs to `/pricing`                                   |
| website design cost calculator, it cost calculator, marketing budget calculator, seo pricing canada, google ads management pricing | 20 each | 0       | n/a         | Tiny                                                    |
| digital marketing cost calculator, marketing retainer cost, software cost calculator for small business, managed software pricing  | 0       | n/a     | n/a         | No volume recorded                                      |

A difficulty of 0 on a term this small means Semrush has too little data to score it, not that it
is easy.

What the data says:

- **The only terms that fit the tool are tiny** (`seo cost calculator` 70, `website cost
  calculator` 50). The big numbers (`price calculator`, `get a quote`) are generic searches from
  people looking for other kinds of tools.
- **No search names the managed software side of the estimator.** `managed software pricing` and
  `software cost calculator for small business` returned nothing. Nobody searches for this tool by
  its product, so it is found by being linked from `/pricing`, the packages and the contact page.
- **"How much does a website cost" (260)** is a real question the site could answer in a short
  guide. That is blog content (see `26-pricing.md`), with a link to the estimator.

## Current state

- Title: `Estimate your cost | Vitops`. Reasonable wording; says nothing about what is
  estimated.
- Kicker "Pricing". H1 "Estimate your monthly cost." Lead: "Pick a package or build your own
  mix of software and marketing. The total updates as you go, including setup fees and whether
  the Business Health Dashboard is included."
- The tool: package picker (Build your own, Launch, Small Team, Growing Team), a user count,
  backup and faster-response options, a website plan, six marketing services, a total, a setup
  fee and a dashboard line.
- A callout: "Not sure what you need?" with a link to the contact form.
- Behind a script: the total only updates with JavaScript. Without it the page shows a fixed
  default (10 users, $150 a month, $500 setup) and a link to `/pricing`.
- The prices in the tool are copied into the component (`src/components/blocks/Estimate.astro`),
  separately from the pricing page.

## Problems to fix first

1. **The estimator still says "Managed IT".** The rename to "Managed software" was applied to the
   seed, but the component still shows "Managed IT" in the default result line, the package notes
   and several labels, and "Choose any mix of IT and marketing services" in the first note.
   Visitors see "Managed software" on the pricing page and "Managed IT" in the estimator. The
   file also cannot be committed today because of an unrelated design-lint failure, so it needs a
   small restructure first. This is a correctness and positioning issue more than an SEO one,
   though "IT" wording attracts the wrong searchers (see `00-positioning.md`).
2. **The default result is what search engines and no-JS visitors see.** That is "Managed IT, 10
   users, $150". It should read as a plain, correct example ("Managed software, 10 users"). With
   the plan structure undecided, a fixed figure in the default state is a promise; make sure it is
   what you would honour.
3. **Prices live in two places.** If the plan changes (for example the $5 extra-licence fee or the
   $100 minimum, both under review in `pricing-model-pros-cons.md`), the pricing page and this
   tool must change together. Take the figures from one source if the toolkit allows it (a
   shared data object read by both), or add a note to the checklist.

## Recommended changes, highest impact first

1. **Title and meta (medium).**
   - Title (47): `Cost Estimator: Software and Marketing | Vitops`
   - Meta (147): `Estimate your monthly cost for software management, websites and digital marketing. Pick a package or build your own. Setup fees included.`
   - Set these in the page's SEO fields, not the layout. Do not put a price in either, so they
     stay true while the plans change.
2. **Keep it out of the competition with `/pricing` (high).** Make `/pricing` the canonical
   source for pricing terms and have the estimator say, once, "See all plans and prices", linking
   to it with the anchor "pricing". Link to the estimator from `/pricing` with "Estimate your
   monthly cost". Do not repeat pricing keywords (`digital marketing packages`, `seo packages`)
   in the estimator's headings.
3. **Add a static summary of what the tool covers (medium).** Two or three sentences in the lead
   or below the tool: what the three groups are (software management, website, marketing), what
   is not included (ad spend, taxes) and that the figure is an estimate. It gives the page text a
   crawler and a no-JS visitor can use, and the thin text is the page's real SEO weakness.
4. **Make the no-JS fallback useful (medium).** Beyond "See the plans and prices", list the
   packages with their starting prices as plain text, or link straight to the package section on
   `/pricing`. The prices must match the page that holds them.
5. **Keep the quote path short (medium, conversion).** The tool ends in "Get an exact quote" and
   the callout repeats it. Check that the quote form carries the selection the visitor made
   (package, users, services). If it does not, add it; if it cannot, say so in the callout.
6. **Link in from the right places (medium).** The estimator is linked from the packages and
   service pages already. Add it from `/pricing`, `/contact` and the funding page callout ("see
   what it would cost").
7. **Structured data (low).** `WebPage` with `BreadcrumbList` (Home > Pricing > Estimate). Do not
   add `Offer` or price markup for the tool's output: it is an estimate, and Google treats
   marked-up prices as a commitment.
8. **Accessibility check (medium, belongs to the toolkit audit).** The tool has live-region
   updates and grouped controls. Run `vitops audit` on the page and the keyboard path on a phone,
   because a tool that does not work for everyone loses the one conversion it exists for.
9. **Indexing (decision).** Keep the page indexed, but do not build links to it as if it were a
   content page. If it ever shows as thin content in Search Console, `noindex` is acceptable
   because `/pricing` carries the same terms.

## Copy rewrites (proposed, not applied)

| Where                          | Now                                                                 | Proposed                                                        |
| ------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| Kicker                         | Pricing                                                             | (keep)                                                          |
| Lead (sub)                     | Pick a package or build your own mix of software and marketing. ... | (keep; add one sentence on what is estimated and what is extra) |
| Estimator note ("own")         | Choose any mix of IT and marketing services.                        | Choose any mix of software and marketing services.              |
| Estimator labels               | Managed IT (6 places)                                               | Managed software                                                |
| Package notes (small, growing) | ...plus Managed IT.                                                 | ...plus Managed software.                                       |

(The estimator copy lives in the component, not the seed; that is why they are listed here and
not in a seed edit.)

## Cannibalization

Owns "estimate" and "calculator" wording only. It must not target `digital marketing packages`,
`seo packages` or any pricing phrase that `/pricing` owns, and must not use "managed IT" in any
form.

## Open questions for you

- Do you want the estimator renamed to "Managed software" now? That needs the component
  restructured to clear the lint failure first. I can do both when you say.
- Should the prices come from one shared source so the pricing page and the estimator cannot
  drift apart?
- Does the quote form currently receive the estimator's selections? If not, do you want it to?
- When the plans change (solo plan, no extra-licence fee), do you want the estimator updated at
  the same time as the pricing page?
