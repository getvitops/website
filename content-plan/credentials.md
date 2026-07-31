# Credentials — audit and recommendation

Alex's certifications, reviewed **2026-07-31**. Azure Solutions Architect Expert and Azure
Administrator Associate renewals confirmed by Alex; LinkedIn had not been updated at time
of review. Justin's PhD in Population Health doesn't expire and needs no analysis.

## Current state

| Credential                                              | Issuer          | Issued   | Status                                  |
| ------------------------------------------------------- | --------------- | -------- | --------------------------------------- |
| Master of Computer Science (AI focus)                   | —               | —        | **Permanent**                           |
| **Azure Solutions Architect Expert**                    | Microsoft       | Feb 2024 | **Current** — renewed                   |
| Azure Administrator Associate                           | Microsoft       | Jan 2024 | **Current** — renewed                   |
| Security, Compliance and Identity Fundamentals (SC-900) | Microsoft       | Jul 2022 | **Current** — Fundamentals don't expire |
| Professional Scrum Master I (PSM I)                     | Scrum.org       | Aug 2018 | **Current** — doesn't expire            |
| Oracle Certified Associate, Java SE 7 Programmer        | Oracle          | Feb 2014 | **Current** — doesn't expire            |
| SEO                                                     | HubSpot Academy | Jun 2024 | ❌ Expired Jul 2025                     |
| DevOps Engineer Expert                                  | Microsoft       | Oct 2024 | ❌ Expired Oct 2025                     |
| Terraform Associate (003)                               | HashiCorp       | Oct 2023 | ❌ Expired Oct 2025                     |

Three of nine expired.

## What goes on the site

**Publish:** the MCS, Azure Solutions Architect Expert, and SC-900.

> Master of Computer Science, focused on artificial intelligence. Microsoft Certified:
> Azure Solutions Architect Expert, and certified in Security, Compliance and Identity.

**Why Solutions Architect leads.** It's Expert tier, it's current, and it's legible to a
buyer in a way SC-900 isn't — SC-900 is Microsoft's entry level, and a page carrying only
that reads thinner than one carrying an Expert-level credential. It also backs more of the
pitch than its name suggests: AZ-305 covers identity, governance, security and data
architecture, and Entra ID is Azure AD, so it speaks directly to the access-control claims
on the Business Software pillar and the clinics and professional-services pages.

**Omit Azure Administrator Associate from the prose.** Current, but Solutions Architect
Expert sits above it in the same track — listing both reads as padding. Keep it in schema
if you want completeness; keep it out of the sentence.

**Omit PSM I and Java SE 7.** Both valid, neither supports the pitch. A 2014 Java
certification on an operations company's about page reads as filler.

**Do not publish the expired three as current credentials.** The site's persuasive strategy
is verifiable honesty — the funding pages lead with disqualifiers, every figure is dated
and sourced. Each expired certification carries a credential ID a prospect can click and
see the expiry on. Getting caught overstating a badge would cost more than the badge is
worth, and would retroactively undermine the funding pages, which are the highest-value
content on the site.

**Schema:** `hasCredential` on Alex's `Person` node for Azure Solutions Architect Expert,
Azure Administrator Associate and SC-900. Never emit an expired credential.

## The gap worth noting

The portfolio is strong, and it's tilted toward infrastructure rather than the thing
Vitops actually sells.

Azure Solutions Architect and Administrator are cloud-platform credentials. The offering
is Microsoft 365 administration, identity and lifecycle, Entra ID, Intune, Purview and
access governance — and the only credential squarely in that territory is SC-900, at
Fundamentals level. There's real overlap (AZ-305 includes identity and governance
architecture), so this is a tilt, not a hole.

If one more exam is ever worth sitting, the highest-leverage additions are:

| Cert                                          | Why                                                                                                                                                   | Pages it backs                                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **SC-300** Identity and Access Administrator  | The most on-message credential available. Identity, conditional access, lifecycle — the core of Business Software and the JML flagship in Back Office | `/business-software`, `/back-office`, `/industries/professional-services`, `/industries/clinics` |
| **MS-102** Microsoft 365 Administrator Expert | The platform the whole offering runs on                                                                                                               | `/business-software`                                                                             |
| **SC-400 / Purview** Information Protection   | Backs the "fix permissions before AI goes live" argument, and the PHIPA and matter-permissions claims                                                 | `/industries/clinics`, `/industries/professional-services`                                       |

Not urgent. The current set carries the page.

## Renewal facts

**Microsoft role-based certs** are valid one year. The free unproctored renewal assessment
on Microsoft Learn opens six months before expiry and **closes at expiry — no grace
period**. Once lapsed, recertifying means the full paid Pearson VUE exam again.
[Microsoft Learn — renewal FAQ](https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification-faq)

Practical consequence: **Solutions Architect and Administrator need renewing every year,
and the window is narrow.** Both now expire in early 2027. Put a reminder at the six-month
mark — losing an Expert cert to a missed calendar reminder would be an expensive
administrative error, and the about page depends on it.

**DevOps Engineer Expert** (expired Oct 2025) — full retake required. Low priority;
DevOps isn't sold.

**HubSpot SEO** — free, roughly two hours, retakeable any time. Directly relevant to
`/digital-presence`, which targets `seo services for small business` and
`technical SEO services`. **Cheapest win on the list.**

**HashiCorp Terraform Associate** — two-year validity, paid retake. Low priority;
infrastructure-as-code doesn't appear in the offering.

## Recommended order

1. **Publish the MCS + Solutions Architect + SC-900 line.** Done — in `copy/about.md`.
2. **Set a renewal reminder** for the two Azure certs at the six-month-before mark
   (roughly Aug–Sep 2026 for a Feb 2027 expiry). Verify the exact dates on Microsoft Learn.
3. **Retake HubSpot SEO.** Free, ~2 hours, backs a page that sells the thing.
4. **Consider SC-300** if a paid exam is ever worth sitting.
5. **Let DevOps and Terraform stay lapsed.** Real competence, off-message.
