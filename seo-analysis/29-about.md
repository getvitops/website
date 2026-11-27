# /about: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site).

## Role and verdict

Trust and entity page. **Geo tier A:** Ottawa and Ontario belong in the title and lead, because
the page's job is to say who Vitops is and where.

There is no keyword demand for it. The brand returns 0 searches (`vitops`), and no "about" style
or company-name query returned a volume. So the page is not written to rank. It does three other
jobs:

1. **It is what a buyer reads before they contact you.** For a services firm with no named client
   on the site yet, the team and the promises are the proof.
2. **It tells search engines and AI answers who Vitops is**: a legal entity, founded on a date,
   in Ottawa, with named people and credentials. That is the page they cite for "who is Vitops".
3. **It is an internal-link source** for the pages that back up its promises (pricing, licences,
   joining and leaving).

## What the data says

| Search                                                                                             | Volume | KD  | CPC   | Note                                                                                                         |
| -------------------------------------------------------------------------------------------------- | ------ | --- | ----- | ------------------------------------------------------------------------------------------------------------ |
| vitops                                                                                             | 0      | 0   | n/a   | No brand demand yet                                                                                          |
| digital marketing agency ottawa                                                                    | 480    | 50  | $5.26 | Belongs to `/digital-marketing`, not here                                                                    |
| ottawa marketing agency                                                                            | 260    | 61  | $3.52 | Same                                                                                                         |
| ottawa it consulting                                                                               | 170    | 10  | n/a   | Managed-IT intent: do not target                                                                             |
| saas consultant                                                                                    | 70     | 17  | n/a   | Informational; belongs to `/managed-software`                                                                |
| ottawa managed service provider                                                                    | 20     | 0   | n/a   | Managed-IT intent: do not target                                                                             |
| ottawa digital agency                                                                              | 10     | 0   | n/a   | Tiny                                                                                                         |
| monad media, ottawa software consultant, ai consulting ottawa, small business consultant ottawa, … | 0      | n/a | n/a   | No volume recorded (also: technology consultant ottawa, ai consultant ottawa, fractional cto small business) |

Takeaways:

- **Nothing here is worth a keyword target.** Every term with volume is owned by a service page,
  or is managed-IT intent that the site avoids.
- **Zero brand demand is the starting point.** The way to grow it is the pillar pages, links and
  the Google Business Profile (see `14-business-profiles.md`). The about page supports that by
  being a clear, consistent description of the entity.

## Current state

- Title: `About | Vitops`. It names no place and says nothing about what Vitops does.
- Kicker "About Vitops". H1 "A tech-forward team that does more for less." Good voice; "more for
  less" is a comparative claim (see the claims section below).
- About 600 words: an AI-in-our-work section, a team section, "why we started", four promises, a
  fit section and a scope section.
- Two people named (Alex Gagnon, Justin Lang) with credentials in their bios and a checklist per
  person. No photo, job title, profile link or structured data for either.
- "Why we started" has no date, place or story beyond one sentence.
- The organization data in `vitops.json` already holds the legal name (Monad Media Inc.), founding
  date (2018-10-30), address, phone and email. The page itself mentions none of them.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (48): `About Vitops | Ottawa Software and Marketing Team`
   - Meta (150): `Vitops is an Ottawa team of computer science and data specialists who manage business software and marketing for Ontario small businesses. Meet the team.`
   - Set these in the page's SEO fields, not the layout.
2. **Make the entity explicit (high).** One short block (a line under the hero or a "Company"
   card): "Vitops is the trade name of Monad Media Inc., founded in 2018 and based in Ottawa,
   Ontario", with the address and a "Contact us" link. This is the single most useful change for
   being cited correctly. Use the same name, address and phone as the footer, the contact page and
   the Google Business Profile. Confirm the founding wording first (open questions).
3. **Give the team real profiles (high).** For each person: a photo, a job title, and a link to
   a public profile (LinkedIn) or a verifiable credential page. Replace "years of experience" in
   Alex's bio with a number if you can state one. These are the details that make an about page
   persuasive and that AI answers pick up when asked who runs a company.
4. **Structured data (medium).**
   - `AboutPage` wrapping the existing `Organization`/`LocalBusiness` data.
   - One `Person` per team member (`name`, `jobTitle`, `worksFor`, `sameAs`, and credentials as
     `hasCredential` only where verifiable). The toolkit's `schemas` components cover Person and
     Organization; feed them from `vitops.json` and the page.
   - `BreadcrumbList` (Home > About).
5. **Link each promise to the page that proves it (medium).**
   - "We publish our prices" to `/pricing`.
   - "Month to month" to `/pricing`.
   - "You own what we build" to `/joining-and-leaving` or the contact terms.
   - "We'll tell you not to buy things" to `/licences-cost-control`.
   - "What we don't do" to `/managed-software` for the full scope.
     Promises with no link read as slogans; with a link they are claims a reader can check.
6. **Back the AI claims with the privacy facts (medium, a risk, not only SEO).** The page says
   "We don't use your data to train AI tools". Keep it only if it is true for every AI tool you
   use, and make sure `/privacy` says the same. Link it to the privacy page.
7. **Name the local proof (low).** "We meet local clients in person and show up at local business
   events" is better with one named event or group. Add it if true.
8. **Keep it short (low).** The page is a good size. Do not add keyword copy.

## Claims on the page to check before launch

These are not SEO problems, but an about page is read closely and quoted.

| Claim                                                      | Check                                                                                                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| "does more for less", "Lower prices"                       | A comparative claim. State what it is compared with ("than separate IT and marketing providers") or give a figure you can support. |
| "Faster turnaround", "More done each month"                | Same: no number or comparison is given. Add one or soften.                                                                         |
| "Microsoft Certified Azure Solutions Architect Expert"     | Role-based Microsoft certifications expire unless renewed. Confirm it is current and link the credential.                          |
| "certified in security, compliance and identity"           | Vague. Name the certifications, or drop the line.                                                                                  |
| "PhD in Population Health", "Master's in Computer Science" | Fine if accurate; name the institution only if you want to.                                                                        |
| "We don't use your data to train AI tools"                 | See item 6.                                                                                                                        |
| "Make funding decisions. Those are made by OCI."           | Accurate and good (it sets the DMAP expectation). Confirm OCI is the right name for the programme administrator before launch.     |

## Copy rewrites (proposed, not applied)

| Where             | Now                                                            | Proposed                                                                             |
| ----------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Kicker            | About Vitops                                                   | About Vitops, Ottawa                                                                 |
| Lead (sub)        | ...Ottawa-based, serving businesses across Ontario and Canada. | (keep)                                                                               |
| "Our team" sub    | Years of experience working with small businesses.             | State a number, or: "Computer science and data, applied to small business software." |
| "Why we started"  | A better way to run things. (one sentence)                     | Add when and where: "Vitops started in Ottawa in `<year>` after..."                  |
| Scope section sub | (no lead)                                                      | Add: "We work with cloud software only. No hardware, networks or on-site visits."    |
| Fit section sub   | ...outgrown doing IT and marketing themselves...               | (left as decided: change later if you reconsider)                                    |

## Cannibalization

Owns the company, team and values wording. It must not target service terms (`marketing agency`,
`managed software`, `saas consultant`) or any managed-IT term (`ottawa it consulting`). Mentions
of the services link out to the pillar pages instead of repeating their keywords.

## Open questions for you

- Founding date: `vitops.json` says 2018-10-30 for Monad Media Inc. Is that when Vitops began
  operating under this name, or only the company's date? The page should state the one that is
  true.
- Do you want photos, job titles and public profile links for Alex and Justin on the page? (Both
  need to agree to what is published about them.)
- Is the Azure certification current, and which security, compliance and identity ones?
- Which numbers can you stand behind for "lower prices", "faster turnaround" and "more done each
  month"?
- Is the claim that you do not use client data to train AI tools true for every tool you use?
- Is there a named local event or group to mention?
