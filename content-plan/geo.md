# Answer-engine layer (GEO)

The site sells _"SEO and GEO optimization for search and answer engines"_ and does not
currently practise it. The delivered SEO plan doesn't mention it once — no schema, no
`llms.txt`, no direct-answer structure. This is the cheapest credibility gap on the list
to close, and it's the one a technical prospect will notice.

---

## 1. Direct-answer openers

An answer engine lifts the paragraph that answers the question, not the paragraph that
sets up the pitch. Every page's first body paragraph after the H1 must answer the
question the page's title implies, in plain declarative sentences, without a pronoun
referring backwards.

**Bad** (delivered copy, and typical):

> Stop paying for software your ex-employees used. Vitops provides hands-on software
> subscription management for Ontario companies.

**Good:**

> Software subscription management means keeping an accurate list of every application a
> business pays for, who actually uses it, and what it costs — then cutting what isn't
> earning its place. For a 50-person company that usually means reclaiming somewhere
> between 10% and 30% of the software budget in the first year.

The second one can be quoted standing alone. The first can't.

Apply to: every pillar page, every industry page, every funding program page.

## 2. FAQ blocks, on the page

Already in the delivered plan and correct — keep it. Each pillar, industry and funding
page carries 5–7 questions in the phrasing people actually use, with answers of 40–80
words that stand alone.

Emit `FAQPage` schema. Use the FAQ schema components from `@getvitops/astro` already
flagged in `TODO.md` rather than hand-rolling.

`/faq` aggregates them all for a single crawlable surface. Footer-linked, not in nav.

## 3. Schema

| Page                | Types                                                                         |
| ------------------- | ----------------------------------------------------------------------------- |
| All                 | `Organization`, `BreadcrumbList`, `WebSite`                                   |
| `/`                 | `+ Service` ×3                                                                |
| Pillar pages        | `+ Service`, `+ FAQPage`                                                      |
| Industry pages      | `+ Service` with `audience` / `areaServed`, `+ FAQPage`                       |
| `/funding/*`        | `+ FAQPage`; cite OCI/BDC as `citation` with `dateModified`                   |
| `/pricing`          | `+ Offer` / `+ PriceSpecification` — real published numbers, machine-readable |
| `/about`            | `+ Person` for the named operator                                             |
| `/contact`          | `+ LocalBusiness` with `areaServed` (Ottawa → Ontario → Canada)               |
| `/work/*` (phase 2) | `+ CaseStudy` / `Article`                                                     |

`Organization` must be identical everywhere — same legal name, same URL, same
`sameAs` list (LinkedIn, Facebook, YouTube, Instagram, Google Business Profile). Entity
consistency is how an answer engine decides two mentions are the same company.

## 4. `llms.txt`

At the root. A short map of what Vitops does and where the canonical answer for each
topic lives — services, pricing, funding, industries, contact. Not a sitemap dump; a
table of contents with one line of context per entry, pointing at the markdown-clean
version of each page.

## 5. Dated facts

Answer engines strongly prefer content that says when it was true. The funding pages are
the highest-value place for this:

> **As of July 2026**, DMAP covers up to $15,000 for Ontario for-profit SMEs with 1–499
> employees, on a first-come basis while funds last. Approval and amounts are decided by
> OCI, not Vitops. — [source](https://www.oc-innovation.ca/programs/digital-competence-centre/)

Every funding figure gets this treatment: figure, date, source link, and the decision-maker
named. `funding-watch.md` keeps them true.

## 6. Publish the disqualifiers

The single strongest GEO move available here. Competing funding pages are grant
consultants selling application writing; none of them lead with who _doesn't_ qualify.
A page that states the $750K TDP revenue floor, the DMAP-before-TDP sequence, the
DMAP/RMPG exclusivity, and that LIFT is a loan rather than a grant is more useful than
all of them — and it's the answer an engine will pick, because it resolves the question
rather than deferring it to a phone call.

Same principle on the service pages: the live site already does this
(_"Almost none of them need, or can afford, a full-time hire"_). Extend it —
say who Vitops is a bad fit for.

## 7. Comparison pages

The June homepage already contains well-written comparison copy, buried in section 8:
"Compared to a traditional MSP", "Compared to hiring in-house", "vs an agency". Each is
its own page in phase 2:

- `/vs/msp` — "What's the difference between Vitops and an MSP?"
- `/vs/hiring` — "Should I hire an IT person or outsource it?"
- `/vs/agency` — "Do I need a marketing agency or an operations partner?"

These match conversational query phrasing almost exactly and have no keyword-tool volume,
which is precisely why they're worth writing — the demand shows up in chat, not in a
search-volume column.

## 8. Housekeeping

- Semantic heading order, one `h1`, no heading levels skipped
- Tables as real `<table>` markup — answer engines parse them; images of tables are lost
- Descriptive anchor text; no "click here", no "learn more" as the only link text
  (the delivered copy uses "Learn more" for 11 different destinations)
- `lastmod` in the sitemap, and honest — bump it when content changes, not on every build
- Keep the pages fast; the site already is, and Core Web Vitals is table stakes given
  what's being sold
