# /

**Role:** Entry page; carries brand and both service lines
**Geo tier:** A: Ottawa in title and H1/subhead
**Tracked keywords (Semrush position tracking, Ottawa, monthly volume):** it services ottawa (390/mo); digital marketing ottawa (390); managed it services ottawa (320)

## Current state

- H1: Hero in `vt_hero`; verify it renders one `<h1>` (no `level` set in seed). Copy: "We run your IT and your marketing, so you can run your business."
- Body text: ~420 words
- Title: Current: `Vitops` (index.astro passes no title). Proposed: `Managed IT and Digital Marketing in Ottawa | Vitops`.
- Meta description: Current: literally `Home` ([src/pages/index.astro](../../../src/pages/index.astro) passes `description={title}`). Proposed: `Vitops runs IT and marketing for small businesses in Ottawa and across Ontario. One team, one fixed monthly price, no long contracts.`

## Changes, highest impact first

1. **High.** Fix title and meta description. Homepage ships `<title>Vitops</title>` and a meta description of "Home". Pass real values (or a `seo` field on the `home` entry) from index.astro.
2. **High.** Put "Ottawa" and "Ontario" plus the two services into the H1 or the sentence directly under it. Today the geo signal sits only in the eyebrow.
3. **High.** Add `Organization` + `LocalBusiness` (ProfessionalService) JSON-LD: name, phone 613-518-7984, email, Ottawa address or service area (Ontario, Canada), `sameAs` profiles. Sitewide, emitted here.
4. **Med.** Add a short FAQ block (4 to 5 questions: what does managed IT cost, do you serve outside Ottawa, contract length) with `FAQPage` markup. Pricing facts already exist on /pricing.
5. **Med.** Internal links: home links to only 5 URLs. Link the 7 Managed IT and 6 Marketing service pages from the pillars with descriptive anchors.
6. **Low.** Hero/partner logos: 12 `alt` attributes exist; confirm none are empty for non-decorative images.
