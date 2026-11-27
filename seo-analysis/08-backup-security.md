# /backup-security: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Terms not listed returned no volume.
Revised after the positioning facts in `00-positioning.md` (SaaS only, no hardware, no on-site).

## Role and verdict

Managed software sub-service. **Geo tier B.** The page is about backing up cloud data (Microsoft 365
and Google Workspace) and securing accounts (2-step login, access). That is a good fit for
`microsoft 365 backup`, which is valuable but hard. The first draft also aimed at
"cybersecurity services ottawa", but that search is mostly network and endpoint security, which
Vitops does not do, so it is dropped.

## Keyword data

| Keyword                                                             | Volume | KD  | CPC    | Note                                                            |
| ------------------------------------------------------------------- | ------ | --- | ------ | --------------------------------------------------------------- |
| microsoft 365 backup                                                | 110    | 66  | $41.44 | Valuable, but vendors dominate; use as the headline term anyway |
| cloud backup for small business                                     | 20     | 0   | n/a    | Supporting                                                      |
| email security for small business                                   | 10     | 0   | n/a    | Supporting; fits account security                               |
| small business cybersecurity                                        | 50     | 45  | $16.43 | Skip: broad, network-leaning                                    |
| cybersecurity services ottawa                                       | 90     | 13  | n/a    | Skip: implies network and endpoint security                     |
| business data backup ottawa, two factor authentication for business | none   | n/a | n/a    | No volume recorded                                              |

A difficulty of 0 on a term this small means Semrush has too little data to score it.

## Current state

- Title: `Backup and security | Vitops`. H1 "Your data backed up. Your accounts locked down." is good.
- About 420 words, the longest of the service pages. Strong "Microsoft 365 on its own vs with
  Vitops backup" comparison.

## Recommended changes, highest impact first

1. **Title and meta (medium).**
   - Title (50): `Microsoft 365 Backup and Account Security | Vitops`
   - Meta (147): `Daily backup of your Microsoft 365 and Google email and files, plus 2-step login and locked-down accounts. For Ottawa and Ontario small businesses.`
2. **Be clear that security means accounts, not hardware (high).** One sentence: "We secure
   your cloud accounts: logins, access and backup. We don't manage devices or networks."
3. **Say "Microsoft 365 backup" in the lead and a heading (medium).** The comparison block does
   the work; the exact phrase is missing from headings.
4. **Link to joining-and-leaving and support (medium).** Account lockdown connects to
   offboarding, and a restore request goes through support.
5. **Cite the attack statistic (medium).** "Many attacks start with a stolen password or a fake
   email" needs a source and link.
6. **Structured data (low).** `Service` plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                               | Proposed                                |
| --------------- | --------------------------------- | --------------------------------------- |
| Section heading | Small businesses are targets too. | (keep)                                  |
| Section heading | The basics, set up and checked.   | The account basics, set up and checked. |

## Cannibalization

Owns backup and account-security wording. Must not use "managed IT services" or "IT support" as
a target.
