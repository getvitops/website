# /contact: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site).

## Role and verdict

Conversion page, not a traffic page. **Geo tier A:** Ottawa and Ontario belong in the title and
the first screen, since people reach it to decide whether a local firm is real and reachable.

No contact-style search returned a volume (`vitops contact`, `contact digital marketing agency`,
`vitops ottawa` all 0). People find this page from the other pages, the header and the footer, so
its SEO work is:

1. A title and description that read well when someone searches the brand and sees the page.
2. Correct local business data (phone, hours, address, area served) that matches the Google
   Business Profile and the rest of the web.
3. Making the call and email actions work in one tap on a phone, and be measurable.

Do not write keyword copy here. The page should not compete with the pages that own the services.

## What the data says

| Search                                                                                                                                   | Volume            | KD  | CPC   | Note                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --- | ----- | -------------------------------------------------------------------------- |
| marketing consultant near me                                                                                                             | 880               | 23  | $3.45 | Transactional and local. Won through the Google Business Profile, not here |
| free seo audit                                                                                                                           | 260               | 77  | $4.94 | The "free review" demand. Very hard                                        |
| free website audit                                                                                                                       | 140               | 74  | $4.73 | Same                                                                       |
| free website review                                                                                                                      | 50                | 0   | $5.06 | Closest to the form's own "free review" offer                              |
| digital marketing consultant ottawa, marketing consultant ottawa                                                                         | 30 / 30           | 0   | n/a   | Belongs to `/digital-marketing`                                            |
| software consultant near me                                                                                                              | 20                | 0   | $4.13 | Local; belongs to `/managed-software` and the profile                      |
| free seo review, free marketing audit, free social media audit, free google business profile audit                                       | 20 / 20 / 20 / 10 | 0   | n/a   | Small variants of the same offer                                           |
| vitops contact, vitops ottawa, free marketing review, get a quote website design, hire a software consultant, free software consultation | 0                 | n/a | n/a   | No volume recorded                                                         |

A difficulty of 0 on a term this small means Semrush has too little data to score it, not that it
is easy.

What the data says:

- **The "free review" offer is the only part with real demand.** The form already says "Want a
  free review? Pick what we should look at", and people do search for free website and SEO
  audits (260 and 140). Those are hard terms and belong on a service page (`/websites` or
  `/seo-ai-search`, see `11-websites.md` and `13-seo-ai-search.md`), not on the contact page.
- **The biggest number, "marketing consultant near me" (880), is a map-pack search.** It is won
  with a complete, reviewed Google Business Profile (see `14-business-profiles.md`). The contact
  page helps only by showing the same name, phone, hours and area as the profile.

## Current state

- Title: `Contact | Vitops`. Nothing about what or where.
- Kicker "Contact". H1 "Let's talk about what you need." Good voice.
- Four cards: phone (613-518-7984), email (hi@vitops.ca), hours (Mon to Fri, 9 to 6, Eastern
  time) and where you work. The phone and email appear as plain text.
- A short note for existing clients ("Log in to your client portal").
- A form with seven fields: "I'm interested in" (a select), "Want a free review? Pick what we
  should look at" (a second select with eleven options), your website, name, work email, company
  and message. It sits in the `form-contact` widget area and has the anchor `#form`.
- A four-question FAQ and a DMAP funding callout.
- No address on the page, even though the section is called "Call, email or meet us in Ottawa".

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (52): `Contact Vitops | Ottawa Software and Marketing`
   - Meta (148): `Call, email or send a note. A partner replies the same or next business day. Software and marketing for small businesses in Ottawa and across Ontario.`
   - Set these in the page's SEO fields, not the layout.
2. **Make phone and email real links (high).** `tel:+16135187984` and `mailto:hi@vitops.ca`.
   On a phone this turns the card into one tap, and it is the signal Google uses for call
   conversions (see the `vitops-ads` skill). The text can stay the same.
3. **Match the Google Business Profile exactly (high).** Name, phone, hours and area served on the
   page, the footer, the structured data and the profile must be identical. Differences
   ("Mon to Fri, 9 to 6" here, something else there) lower trust in all of them.
4. **Structured data (medium).**
   - `ContactPage` for the page, with the `Organization`/`LocalBusiness` data already in
     `vitops.json` (name, phone, email, address, area served).
   - `openingHoursSpecification` for Monday to Friday, 09:00 to 18:00, time zone
     `America/Toronto`.
   - `BreadcrumbList` (Home > Contact).
5. **Decide how to show the address (check, then medium).** The address in `vitops.json` is a
   suite number on a street (`323 Coventry Road, Suite L086`). If clients do not visit that
   address, do not present it as a place to drop in. Google's rules for service-area businesses
   expect a business that does not serve customers at its address to hide it on the profile, and
   a page that says "meet us in Ottawa" with no address is already the safer reading. Say how
   in-person meetings work instead ("We meet clients in Ottawa by arrangement"), and keep the
   address in the structured data and footer only if it is a real business address. See the open
   questions.
6. **Fix the funnel, not only the page (medium, conversion).** The two selects overlap: "I'm
   interested in" (Managed software, Digital Marketing, Both, Not sure yet) and "Want a free
   review? Pick what we should look at" (eleven topics). A visitor has to answer two similar
   questions. Consider one select, or show the second only after the first. Every field removed
   raises submissions more than any wording change. The form is a widget area, so the change is
   made once.
7. **Name the free review once, in plain words (low).** "Want a free review?" becomes "Want a
   free website or marketing review?" so the offer matches what people search ("free website
   review", 50). Keep the page's own heading unchanged.
8. **Link the existing-client note and the funding callout (low).** Confirm "client portal" is a
   working link. Link the DMAP callout to `/funding`, and check that "up to $15,000" is current
   before launch.
9. **Thank-you state (check).** The form's success notice should not live on a separate indexable
   URL. If it is a separate page, mark it `noindex`; if it is the same page, nothing to do. Make
   sure the success event fires the conversion tracking (consent gate respected, see
   `vitops-consent`).
10. **FAQ markup (low).** `FAQPage` markup is accepted but Google shows FAQ rich results only for
    a few kinds of sites now, so expect no visible gain in search. It still helps AI answers.

## Copy rewrites (proposed, not applied)

| Where            | Now                                                   | Proposed                                                      |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| Kicker           | Contact                                               | Contact Vitops in Ottawa                                      |
| Cards: phone     | 613-518-7984. Goes straight to a partner.             | (keep; make the number a `tel:` link)                         |
| Cards: email     | hi@vitops.ca. We reply the same or next business day. | (keep; make the address a `mailto:` link)                     |
| Section heading  | Call, email or meet us in Ottawa.                     | Call, email or send a note. (if no drop-in address is shown)  |
| Form label       | Want a free review? Pick what we should look at       | Want a free website or marketing review? Pick what to look at |
| Form section sub | Tell us where things stand today. ...                 | (keep)                                                        |

## Cannibalization

Owns "contact" and "get in touch" wording only. It must not use service keywords as headings,
and it must not use "IT support" in any form. The free-review demand is handled on the service
pages, which can link here with the anchor "Request a free review".

## Open questions for you

- Is `323 Coventry Road, Suite L086` a place clients visit, or a mailing address? This decides
  whether it appears on the page, in the structured data and on the Google profile.
- Are the hours "Mon to Fri, 9 to 6" identical to what you will list on the Google Business
  Profile, and does the phone really reach a partner during those hours?
- Do you want to merge the two selects in the contact form, or keep both?
- Which service page should own the free-review offer: `/websites` or `/seo-ai-search`?
- Is DMAP still available, and is "up to $15,000" current?
