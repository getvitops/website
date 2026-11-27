# Pricing the managed software plans: options, pros and cons

Written for the Vitops team, to help decide the plan structure. Nothing here changes the site.

## What you told me you want

- Attractive to solopreneurs with a few licences (for example one Zoho One Essentials, or
  QuickBooks plus Microsoft 365 or Google).
- Scales with company size and the number of licences managed.
- Does not look, or act, as if Vitops earns more when a client has more licences than they need,
  because tuning licences and SKUs down is part of the offer.
- Scope is cloud software only: select, implement, configure, integrate, and add AI. No
  hardware, no on-site.

## Where the current pricing page stands

| Item              | Today                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| Managed software plan   | $15 per user a month, $100 minimum. A "user" is anyone with a paid software licence. |
| Licences included | 2 per user. Extra licences are $5 each a month.                                      |
| Add-ons           | Managed backup $8 per user; faster response $10 per user.                            |
| Setup             | $500, waived with a yearly commitment.                                               |
| Packages          | Launch $79 (solo owners), Small Team $849 (5 to 15), Growing Team $1,799 (15 to 50). |
| Resale            | "We don't resell software. You keep your own licences."                              |
| Dashboard         | Included when the monthly plan totals over $400, otherwise an add-on.                |
| Other             | Month to month, 30 days' notice. One-off work quoted; advice $80 an hour.            |

Two things stand out against your goals:

1. **The $5 extra licence fee is the one place the current model rewards more licences.**
   If a client has 12 licences for 4 people and you cut them to 8, your revenue from that
   client drops. That is the exact conflict you want to avoid, and it is visible on the page.
2. **The $100 minimum is the solo owner's real price.** One user at $15 becomes $100, so a person
   with one Zoho licence pays $100 a month to manage a tool that may cost less than that. The
   $79 Launch package is the better answer for that person, but it bundles a website.

The rest of the structure (per person, no resale, month to month) is already neutral. The
question is how much of it to keep.

## The options

For each: how it works, what is good, what is not. "Neutrality" means how well the model avoids
making more licences more profitable.

### A. Per person (headcount), one flat rate

Price per person who uses the tools, regardless of how many licences or apps they have.

- **Good:** Neutral: cutting a SKU or licence never lowers your fee. Easy to explain. Scales
  with company size. Close to what you have now.
- **Not good:** Does not reflect that a person with 8 tools is more work than one with 2.
  A solo owner with one tool still pays a per-person rate that may feel high relative to the
  licence cost. Needs a floor, which creates the $100-minimum problem.

### B. Per licence managed

Price per licence or subscription under management.

- **Good:** Tracks workload directly. Simple to explain. Cheap for a solo owner with two or
  three tools.
- **Not good:** Worst option for your goal. Every licence you remove reduces your revenue, so
  your core service works against your income. Clients will notice, and some will not trust
  recommendations to cut. **Avoid.**

### C. Percentage of the client's software spend

Fee is a percentage of what they pay vendors.

- **Good:** Scales automatically as spend grows. Common in some managed service models.
- **Not good:** The strongest conflict of interest: a bigger bill is a bigger fee. It is also
  unpredictable for the client and punishes you for doing the job well. **Avoid.**

### D. Tiered plans by team size

A small number of fixed plans (for example Solo, Small, Growing) chosen by headcount band.

- **Good:** Predictable. Easy to publish and compare. Neutral, since the tier depends on people,
  not licences. Clear step up as a business grows. Fits what the Launch, Small Team and Growing
  Team packages already do.
- **Not good:** Tier edges create cliffs (a business at 16 people pays far more than at 15).
  Someone at the bottom of a band gets less value than someone at the top. A tier cannot reflect
  a client who has unusually many or few tools.

### E. By number of systems (platforms), in bands

Count the core systems you manage (for example email and documents, accounting, CRM, HR, job
tracking), in bands of one to two, three to five, six or more. Count platforms, not licences.

- **Good:** Tracks real complexity (each system is setup, integration and upkeep). Does not
  depend on how many seats a client holds, so it stays neutral to licence tuning. A solo owner
  with two systems stays cheap.
- **Not good:** Adding systems adds revenue, so it can still look like you gain when a client
  adopts more tools. Mitigate by also counting consolidation as a win and by never charging more
  for an extra app that replaces another. Needs clear rules about what counts as a system.

### F. Hours or a retainer

A retainer with included hours, extra hours at a published rate ($80 an hour today).

- **Good:** Transparent. Easy to start small. Pays for actual effort.
- **Not good:** Hours reward slow work, and clients dislike an open meter. Poor fit for a
  solopreneur who wants a fixed number. Better as an add-on for projects than the core plan.

### G. Share of the savings

You take a percentage of the money you save the client.

- **Good:** Aligns you with cost cuts, and clients like paying only when it works.
- **Not good:** Savings are hard to prove and easy to dispute. It pays once, not monthly, so it
  does not fund ongoing service. It can push you to cut too hard. It also makes the price
  unpredictable. Fine as a one-off audit option, not as the plan.

### H. Reselling software or taking vendor commissions

You sell the licences, or the vendor pays you.

**Update after your answer:** Vitops does receive referral payments (Jobber and QuickBooks now,
Zoho soon, and Microsoft and Google when the client buys direct). When Vitops delivers Microsoft
or Google licences through Pax8 there is no payout, and the licence is billed at cost.

- **Good:** Extra income, and simpler billing for the client. The Pax8 at-cost route is neutral.
- **Not good:** A payout that grows with the client's plan or seat count is the licence-count
  conflict again, and it sits badly with the "we cut your licences" promise. A one-time fee per
  signup is a smaller bias. Disclosure is required either way.
- **What to do:** keep the referral payments if you want them, but disclose them next to the
  recommendation, avoid a recurring share that rises with spend (or credit it back to the client),
  and make Pax8 at cost the default for Microsoft and Google. Details and the site wording that
  has to change are in `seo-analysis/27-referral-disclosure.md`.

## How they compare

| Option                  | Solo-friendly               | Scales | Neutral on licences | Predictable | Simple |
| ----------------------- | --------------------------- | ------ | ------------------- | ----------- | ------ |
| A. Per person           | Medium (floor needed)       | Yes    | Yes                 | Yes         | Yes    |
| B. Per licence          | Yes                         | Yes    | **No**              | Yes         | Yes    |
| C. % of spend           | Medium                      | Yes    | **No**              | No          | Yes    |
| D. Tiers by team size   | Yes (if a Solo tier exists) | Yes    | Yes                 | Yes         | Yes    |
| E. By systems, in bands | Yes                         | Yes    | Yes (for licences)  | Yes         | Medium |
| F. Hours                | Medium                      | Yes    | Yes                 | No          | Yes    |
| G. Savings share        | Medium                      | Weak   | Yes                 | No          | No     |
| H. Resale or commission | Yes                         | Yes    | **No**              | Yes         | Yes    |

## Recommendation

A **hybrid of D and E, with licence-neutral rules**:

1. **A small Solo plan** at a flat price, with no per-person minimum quirk. It covers up to a
   small number of systems, for one person (for example one Zoho or Microsoft/Google account plus
   accounting). This is the answer for the solopreneur, and it is what the Launch package is
   reaching for without the website.
2. **Team plans by headcount band** (like today), so price scales with company size and stays
   neutral to licence counts.
3. **A system-count adjustment in bands** (for example a standard band and a more-systems band)
   so a business with six platforms pays more than one with two, without charging per seat.
4. **Remove the "extra licence $5" fee.** It is the one rule that rewards more licences. If
   extra licences genuinely add work, cover that with the system bands, not a per-licence price.
5. **Replace "we don't resell software"** with "we don't mark up software", say licences we
   deliver are billed at cost, and add a plain statement that licence changes never change the
   fee. Disclose referral payments and decide how to treat recurring ones (see option H and
   `seo-analysis/27-referral-disclosure.md`).
6. **Make the neutrality visible:**
   - A short "licence-neutral pledge" on the pricing page: "Our fee doesn't change when we add
     or remove licences. We make money when your bill goes down and your team is set up well,
     not when you buy more."
   - A before-and-after licence report each review, so clients see the tuning.
   - The client owns every account and is the admin; Vitops is a delegate.
7. **Offer a one-off licence audit** at a fixed price for prospects who are not ready for a
   plan. Savings-share is optional here only.
8. **Dashboard:** keep "included over a threshold, otherwise an add-on", and state the threshold
   in the plan rather than only in a footnote.

## Things to decide

- Where the solo price sits, and whether a solo plan includes hours of help. Today the Managed software
  plan lists up to 4 hours a month; a solo owner may need less and cost you less.
- Whether to keep $500 setup for a solopreneur. A lower setup, or a self-serve option for one
  tool, would lower the barrier.
- Whether recurring referral payments are declined, capped or credited back to the client (they
  exist for some vendors; one-time fees are easier to disclose).
- How to word the headcount bands so the 15 and 16 person step is not a cliff (for example a
  gradual per-person rate between bands).
- Whether the dashboard threshold ($400 a month today) still makes sense once the plans change.

## Checks before publishing any of this

- The figures on the pricing page and in the cost estimator
  (`src/components/blocks/Estimate.astro`) must stay in step; the estimator has its own copy of the
  prices.
- Any claim about how competitors price, or about partner commissions, should be checked against
  the actual agreements. I have described these in general terms only.
