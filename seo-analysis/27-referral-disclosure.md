# Referral payments: what to disclose, and what the site says today

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Based on what you told me on 2026-11-27. This is not legal advice; have a lawyer check the final
wording.

## What you told me

- **Jobber and QuickBooks:** Vitops receives referral payments today.
- **Zoho:** referral payments are coming.
- **Microsoft 365 and Google Workspace:** if Vitops delivers the licences through **Pax8**, there
  is no payout. If Vitops does it another way (the client buys direct and Vitops is attached to
  the account), there is a payout.
- **AppSumo:** you may add it, because you handle TidyCal and SendFox.

## Why it matters

The pricing page, the licence page and the FAQ on every software page say Vitops does not resell
software and that the fee is for making the tools work. The business model is "we cut licences
down", which only builds trust if clients believe Vitops gains nothing from selling more. A
referral payment is income that depends on what the client buys. It does not make the advice
wrong, but it must be disclosed, and some of the current wording is no longer accurate.

## Which relationships create an incentive

The risk depends on how each payment is calculated. I do not know the terms, so these rows are
questions for you, not statements.

| Vendor                           | Payment known  | What decides the risk                                                                                                                      |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Jobber                           | Yes (referral) | One-time bounty per signup, or a share of the subscription each month? A recurring share rises with the client's plan tier and seat count. |
| QuickBooks                       | Yes (referral) | Same question: one-time, or recurring on the plan?                                                                                         |
| Zoho                             | Coming         | Same, and whether it applies to Zoho One (many apps, so a higher plan) as well as single apps.                                             |
| Microsoft 365, Google (via Pax8) | No payout      | None: this is the neutral default.                                                                                                         |
| Microsoft 365, Google (direct)   | Yes            | Usually tied to licence spend, which is the exact conflict with licence tuning.                                                            |
| AppSumo (TidyCal, SendFox)       | Possibly       | Affiliate commission on a one-off deal. Confirm the terms.                                                                                 |

Rule of thumb: **a one-time fee per signup is a small, disclosable bias; a share of the monthly
bill is the licence-count conflict again.**

## Where the site contradicts this today

All are in `seed/seed.json`. Proposed replacements are suggestions, to be checked against what is
actually true.

| Where                                                    | Today                                                                                                                                | Problem                                                               | Proposed                                                                                                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/pricing` (Managed software note)                       | "We don't resell software. You keep your own licences at the vendor's price, so cutting unused licences saves you money right away." | With Pax8, Vitops does deliver licences; and vendors may pay Vitops.  | "We don't add a markup to software. Licences we deliver are billed at cost. Some vendors pay us a referral fee; see how we get paid."                                  |
| `/licences-cost-control` (lead)                          | "We don't resell software, so every saving we find goes to you."                                                                     | Same, and it implies Vitops has no income that depends on spend.      | "We don't mark up software, so a saving on your bill is a saving for you. See how we get paid."                                                                        |
| `/licences-cost-control` (FAQ)                           | "No. We don't resell software. You keep your own licences at the vendor's price, so every saving we find goes straight to you."      | Same.                                                                 | "We don't add a markup. If we deliver licences they are billed at cost. If a vendor pays us a referral fee, we say so on the page and in your proposal."               |
| All seven software pages (FAQ "Do you resell licences?") | "No. You keep your own licences at the vendor's price. Our fee is for making them work."                                             | "Our fee is for making them work" implies the fee is the only income. | "We don't add a markup to software. Our fee is for making it work. Some vendors pay us a referral fee when you sign up through us, and we tell you when that applies." |
| `/ai`                                                    | "AI tool licences are at the vendor's price"                                                                                         | True only if licences are not marked up; check.                       | Keep if true, and link to how we get paid.                                                                                                                             |

If Pax8 billing is at exactly the vendor's list price, "at cost" is accurate. If there is a
margin, it is a resale and the page must say so. Confirm this first.

## A design that stays trustworthy

1. **One "How we get paid" page** (suggested URL `/how-we-get-paid`, linked from the footer and
   from every software page). Plain language: the fees clients pay; that Vitops does not add a
   markup to software; the vendors that pay a referral fee; that referral fees never change which
   tool is recommended; and what Vitops does when two tools fit equally (recommend the cheaper
   for the client).
2. **A one-line disclosure on each software page where it applies**, directly under the
   comparison table: "Vitops receives a referral fee from Jobber and QuickBooks. How we get
   paid." A disclosure belongs next to the recommendation, not only in a footer.
3. **Disclose in proposals and quotes** too, so the client sees it at the moment of the decision.
4. **Make Pax8 at-cost the default for Microsoft and Google** and say so. Where a vendor offers
   a choice, prefer the neutral route.
5. **Decide what to do with recurring payments.** Options: decline a recurring share, cap it,
   or credit it back against the client's fee. Crediting back is the strongest answer to "do you
   gain when I buy more", and it still lets you accept the referral.
6. **Keep a record** of each recommendation and why (fit, price, integrations), so a client or
   a regulator can see it was made on fit.
7. **Selection criteria on the page.** A short list (works with their other tools, price,
   support in Canada, data location) shows the choice is not driven by payment.

## Legal note

Canadian advertising rules expect a clear disclosure when a business has a financial connection to
something it recommends (the Competition Bureau's guidance on endorsements calls this a
"material connection"). The disclosure should be easy to see, close to the recommendation and
in plain words. Also check the referral terms of each vendor: some require specific disclosure
wording. A lawyer should confirm the final text.

## AppSumo, TidyCal and SendFox

- Both are AppSumo deals sold as lifetime or low-fee licences. If Vitops earns an affiliate
  commission, it is a material connection like the others.
- Lifetime-deal products carry vendor-continuity risk that a subscription product does not. If
  Vitops recommends them, say what happens if the vendor changes terms.
- Where they would appear on the site: TidyCal under booking tools (`/software-productivity`,
  "forms and bookings"), SendFox under email campaigns (`/reviews-email`). The site's own form
  setup already supports SendFox as a campaign provider.
- Add them only where Vitops actually implements them for clients.

## SEO effect

None negative, and a mild positive: an honest "how we get paid" page is the kind of trust content
that gets cited, and it answers a question buyers do ask ("do you get paid by the vendors?").
The page needs no keyword target. Use `nofollow`/`sponsored` on any affiliate links, as
Google's guidelines require for paid or affiliate links.

## Questions for you

- Are the Jobber, QuickBooks and Zoho payments one-time or recurring, and do they rise with plan
  size or seat count?
- Is Pax8 billing exactly the vendor's price, with no margin?
- For the direct Microsoft and Google route, how is the payout calculated?
- Do you want to credit recurring referral income back to the client, cap it, or decline it?
- Do you want the "How we get paid" page, and is `/how-we-get-paid` the right name?
