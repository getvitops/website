# / (home): SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada.
Written with the positioning facts in `00-positioning.md` in mind (cloud software only, no hardware,
no on-site).

## Role and verdict

Entry page. It carries the brand and both service lines and sends people to the pillars. It is
**not the place to win broad keywords**: each pillar and service page owns its terms, and a home
page that chases them competes with its own pages. Its SEO job is:

1. Say plainly what Vitops is and where, in the title, description and first screen.
2. Be the strongest internal-link hub on the site (every pillar, pricing, the dashboard).
3. Carry the local signals (name, address, phone, area served) so Google ties the brand to
   Ottawa and Ontario.

## What the data says

| Search                                                          | Volume  | Note                                 |
| --------------------------------------------------------------- | ------- | ------------------------------------ |
| vitops                                                          | 0       | The brand has no search demand yet   |
| it and marketing services / it and marketing for small business | none    | Nobody searches the combined offer   |
| small business software management                              | 10      | The closest description of the offer |
| cloud software management, saas management for small business   | 10 / 10 | Same                                 |
| small business consulting ottawa                                | 20      | Generic                              |
| business software ottawa, small business technology ottawa      | none    | No volume recorded                   |

Two takeaways:

- **There is no keyword for "IT and marketing together".** The home page should not be
  written to rank for it; the combined offer is a reason to choose Vitops once someone is
  on the site (the "one team, one bill" message), not a search.
- **Brand demand is zero today**, so the home page ranks only for the brand once people know it.
  The way to grow it is the pillar and service pages, links, and the Google Business Profile
  (see `14-business-profiles.md`).

## One finding to act on: old rankings

Semrush shows two keywords that the old vitops.ca ranks for: `dmap grant` (position 20, 70
searches a month) at `/funding/dmap`, and a stray result at `/business-software`. If these old
URLs are not redirected, that visibility is lost. Add 301 redirects when the new site goes
live: `/funding/dmap` to `/funding`, and `/business-software` to `/software-selection-setup`.
This belongs on the launch checklist with the other old-site redirects.

## Current state

- Title: `Home | Vitops`. The home page passes no title of its own, so the word "Home" appears in
  results.
- Meta description: the site tagline, "Run the business, we run the rest."
- H1: "We run your IT and your marketing, so you can run your business." (good voice).
- First-screen eyebrow: "Ottawa-based, serving businesses across Ontario" (good).
- Two cards: "IT services" and "Marketing".
- Local signals: the footer shows the address, phone and email; home carries LocalBusiness
  structured data (name, address, phone, area served).

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (60): `Software and Marketing for Small Business in Ottawa | Vitops`
   - Meta (148): `We manage the cloud software your business runs on and handle your digital marketing, from one team and one monthly bill. Ottawa and across Ontario.`
   - Set these in the page's SEO fields, not in the layout.
2. **Stop saying "IT" on the first screen (high). Applied with the rename.** "IT services" and "your IT" invite hardware
   and on-site expectations, which you do not offer. Options: "We run your software and your
   marketing, so you can run your business", and a card label of "Software" or "Managed
   software". This was applied with the rename to "Managed software" (see `00-positioning.md`); the SEO case is that
   "IT" attracts the wrong searchers and leads.
3. **Say what you do and do not do (medium).** One short line under the lead: "We work with
   cloud software only. No hardware, networks or on-site visits." It is a trust and filtering
   statement, not an apology.
4. **Make every internal link explicit (high).** The two cards link to the pillars; also link
   in the body to `/pricing`, `/dashboard`, `/funding`, `/software-selection-setup` and
   `/contact`, with descriptive anchors ("See pricing", "Business Health Dashboard").
5. **Add proof when you have it (medium).** One or two real customer quotes or results near the
   top. Nothing on the page yet shows a named client; that is the biggest missing trust signal and
   it also earns links and mentions. Do not add invented testimonials.
6. **Keep the funding block (medium).** "Ontario businesses can get up to $15,000 through DMAP"
   is a rare, valuable hook and links to `/funding`, the page that carried your only existing
   ranking. Check the DMAP details are current before launch.
7. **Add a default share image (medium).** A 1200 by 630 image in `public/`, so links shared on
   LinkedIn and social show a proper card.
8. **Local signals (medium).** When the Google Business Profile exists, add its link to the
   organization profile links in `vitops.json` (`sameAs`), and keep the name, address and phone
   identical across the site, the profile and any directories.

## Copy rewrites (proposed, not applied)

| Where           | Now                                                              | Proposed                                                               |
| --------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| H1              | We run your IT and your marketing, so you can run your business. | We run your software and your marketing, so you can run your business. |
| Card eyebrow    | IT services                                                      | Software                                                               |
| Section heading | Two services. One team.                                          | What we do.                                                            |
| Section heading | Getting started is simple.                                       | How it works. (the steps below say the rest)                           |
| Section kicker  | Why both                                                         | Why one team                                                           |

Why: "Two services" announces a count (a pattern to drop), and "Getting started is simple" is
a claim rather than a heading. The H1 word and the eyebrow were applied with the rename to
"Managed software"; the other headings are still proposals.

## Cannibalization

The home page owns only the brand and the overall description. It should not use the target
terms of `/managed-software` or `/digital-marketing` as titles or headings.

## Open questions for you

- Answered: the H1 and card label now say "software" (rename to "Managed software").
- Is there a customer quote or result you can use near the top?
- Is DMAP still available, and is "up to $15,000" current?
