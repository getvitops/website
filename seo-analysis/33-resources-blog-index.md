# /resources (blog index): SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json` or the code.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site).

**This page does not exist yet.** The seed has only a `pages` collection (no posts), and the
menus have no blog link. Earlier analyses refer to it as `/resources` (see `03-dashboard.md`,
`26-pricing.md`). So this file is a plan for the index and for the first articles, not a review of
current copy.

## Role and verdict

The index itself has no keyword. It is a hub: a clear, crawlable list of articles that each
support a service page. **Geo tier B** for the index (geo-neutral), and tier B or C for the
articles, since the searches are national.

Three things to decide before building it:

1. **Is a blog worth it at all, now?** The data says it can be, but only modestly. Most of the
   topics below get 20 to 260 searches a month in Canada, and the few larger ones are hard or
   already owned by a service page. A blog earns its place through **a few accurate articles that
   answer questions buyers really ask and that AI answers can quote**, not through volume of
   posts. An index with two thin articles hurts the site's credibility.
2. **Launch with enough content.** My suggestion: do not link the index from the menu or
   footer until at least four to six real articles exist, and keep it out of the sitemap until
   then. Articles can be published earlier and linked from the service pages they support.
3. **Name and URL.** The earlier analyses assume `/resources`. "Resources" suits a mix of
   guides, checklists and tools (the estimator, the funding explainer) better than "blog", which
   promises a stream of posts. Either is fine for SEO; pick one and keep it.

This does not belong to the prod gate in memory (meta descriptions and the SEMrush content
updates). It can follow the launch.

## Keyword data: article candidates

Grouped by the page each article would support. "Owned" means a service page already targets the
term and the article must not compete with it.

| Article idea                                                  | Search                                               | Volume   | KD       | CPC             | Supports                               | Note                                                                              |
| ------------------------------------------------------------- | ---------------------------------------------------- | -------- | -------- | --------------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| What CASL means for your email marketing                      | casl compliance                                      | 480      | 32       | $7.50           | `/reviews-email`                       | Strongest fit and a real Canadian angle. Not legal advice                         |
| How much a website really costs in Canada                     | how much does a website cost                         | 260      | 48       | $2.41           | `/websites`, `/pricing`                | Hard, but the question buyers ask first                                           |
| What website maintenance costs                                | website maintenance cost                             | 110      | 26       | $2.96           | `/websites`, `/pricing`                | Already suggested in `26-pricing.md`                                              |
| A local SEO checklist for a small business                    | local seo checklist                                  | 140      | 30       | n/a             | `/seo-ai-search`, `/business-profiles` | Checklist format suits AI answers                                                 |
| How to measure marketing ROI without a data team              | marketing roi                                        | 170      | 40       | $3.29           | `/dashboard`                           | Suggested in `03-dashboard.md`                                                    |
| QuickBooks Online or Desktop, for a small business            | quickbooks online vs desktop                         | 140      | 42       | $9.43           | `/software-bookkeeping-payroll`        | **Referral payments from QuickBooks: disclose** (see `27-referral-disclosure.md`) |
| What Google Workspace costs in Canada                         | google workspace pricing canada                      | 210      | 30       | $2.77           | `/software-communication`              | Pricing intent. **Disclose any referral relationship**                            |
| How to find software you pay for and don't use                | saas spend management, saas sprawl                   | 90 / 40  | 30 / n/a | n/a             | `/licences-cost-control`               | Your core message. Low volume, high fit                                           |
| Microsoft 365 or Google Workspace for a small team            | microsoft 365 vs google workspace                    | 50       | 0        | $4.16           | `/software-communication`              | Small. **Disclose** (Pax8 vs direct, see `27-referral-disclosure.md`)             |
| A new-hire and leaver checklist for cloud accounts            | employee onboarding checklist, offboarding checklist | 50 / 40  | 23 / 0   | $4.34 / $1.85   | `/joining-and-leaving`                 | Owned by the page; a checklist article would compete                              |
| Best CRM for a small business in Canada                       | best crm for small business (canada)                 | 260 / 50 | 49 / 18  | $15.65 / $17.27 | `/software-crm`                        | Owned by the page; skip, or write only a different angle                          |
| What is open for Ontario technology funding                   | ontario small business grants                        | 720      | 19       | $2.68           | `/funding`                             | Owned by the page; the funding page is the article                                |
| Small business cybersecurity checklist, password manager, MFA | (several)                                            | 20 each  | n/a      | up to $21.36    | `/backup-security`                     | Tiny; one short guide at most                                                     |

A difficulty of 0 on a term this small means Semrush has too little data to score it, not that it
is easy.

What the data says:

- **The best first articles are the ones with a Canadian angle and a link to something Vitops
  actually does:** CASL for email (480), website cost (260 and 110), the local SEO checklist
  (140), marketing ROI (170) and "software you pay for and don't use" (90), the last because it
  is the clearest statement of what Vitops does differently.
- **Skip what a service page already owns.** CRM, onboarding and funding articles would split
  rankings between two of your own pages. Strengthen the page instead.
- **The vendor comparisons need disclosure.** QuickBooks and Google or Microsoft articles touch
  vendors that pay Vitops or may pay. The disclosure line from `27-referral-disclosure.md` must
  sit next to the recommendation in each, and affiliate links need `nofollow sponsored`.

## Current state

- No `posts` collection, no index page, no article template, no feed.
- The seed's collections are `pages` only. Everything below needs the collection first.
- The primary menu is Services, Industries, Pricing, About, Contact; the footer sitemap has
  three columns that are not yet filled in the seed.

## Recommended structure

**Index page**

1. **Title and meta.**
   - Title (51): `Small Business Software and Marketing Guides | Vitops`
   - Meta (150): `Plain-language guides on business software, websites and digital marketing for small businesses in Ontario and across Canada, from the Vitops team.`
2. **One short intro**, then a single "Start here" article, then the rest grouped by topic
   (Software, Marketing, Funding and compliance). No endless chronological scroll.
3. **Each card:** title, one-sentence summary, date updated, topic. Show real dates; an old date
   is better than no date.
4. **Pagination only after about 20 articles.** When it comes: `/resources/page/2`, each page
   canonical to itself, no `noindex`. Topic filters are not separate indexable URLs.
5. **Structured data:** `CollectionPage` with `ItemList` and `BreadcrumbList`. No ratings or
   counts.

**Each article**

- URL `/resources/<slug>`, `trailingSlash: 'never'` (the site setting), slug from `entry.data.slug`
  not the id (per `AGENTS.md`).
- `BlogPosting` structured data with `datePublished`, `dateModified` and an **author Person** who
  matches a person on `/about` (name, job title, `sameAs`). This is where the about-page work in
  `29-about.md` pays off.
- A byline and a visible "Last updated" date. Review dated content at least yearly (prices,
  program rules).
- Two or three links to service pages with descriptive anchors, and one link out to an official
  source for each factual claim (the CRTC and Competition Bureau for CASL, the program page for
  funding).
- A short call to action to `/contact`, not a popup.

**Technical**

- Add a `posts` collection (title, slug, excerpt, body, author, published and updated dates,
  topic, related page, image). The seed applies only to an empty database, so adding it means a
  schema change through the admin or the site MCP, then reseeding the local copy. Decide this
  with the `emdash-custom-blocks` and `emdash-content-and-deploys` skills before building.
- Pages are prerendered, so a new article goes live on the next build.
- Add an RSS feed (`/resources/rss.xml`) and make sure `/sitemap.xml` includes the articles.
- Open Graph image per article, with a default fallback (the share-image task in `25-home.md`).

## Editorial rules that protect the site

- **Accuracy first.** Use your real numbers (prices, hours). Where an article quotes a program or
  law, link the source and date it. Wrong funding or CASL advice does more harm than no article.
- **Honest scope.** SaaS only. Do not write hardware, network or on-site help content: it
  attracts the wrong searchers and contradicts the positioning.
- **No bulk AI output.** Google's spam rules treat large volumes of unreviewed generated pages as
  abuse. The site already says AI drafts and a person reviews every piece; keep that true for
  articles.
- **Disclose payments** next to any vendor recommendation, as in `27-referral-disclosure.md`.
- **Not legal advice.** Compliance articles (CASL, PIPEDA, AODA) say so and link the regulator.

## Cannibalization

The index owns "guides" and "resources" wording and nothing else. Each article must target a
term that no service page owns, and link to the page it supports with that page's anchor. Before
writing any article, check the relevant `seo-analysis` file for the page's target terms.

## What to do first

1. Decide the name (`/resources` or `/blog`) and whether to launch at all with fewer than four
   articles.
2. Write the first two, in this order: the CASL guide, then "how much a website costs".
3. Add the collection, template, feed and index page.
4. Link the index from the footer only when it has real content.

## Open questions for you

- `/resources` or `/blog`?
- Do you want to build this before launch, or after? (It is not part of the prod gate.)
- Who writes and reviews the articles, and how often can you publish?
- Which topics do you have real experience of (CASL, funding applications, QuickBooks and
  Google or Microsoft setups) that would make an article better than the vendor guides?
- Do you want a `posts` collection in the seed, or built through the admin?
