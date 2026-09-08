/**
 * The four industry verticals, shared between `src/pages/industries/index.astro`
 * (the routing/grid page) and `IndustryPage.astro` (the shared shell each
 * `src/pages/industries/*.astro` page renders through).
 *
 * Centralised so `IndustryPage` can link each vertical to its three siblings —
 * before this, the four pages were reachable only from the index and from
 * each other's `pillar-links` nav, one incoming link deep. A hand-kept second
 * copy of this list would drift from the first silently; this is the one copy.
 */
export interface Industry {
  slug: string;
  name: string;
  body: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "trades",
    name: "Trades and contractors",
    body: "Crews on sites, tablets that need to work without signal, a dispatch process that can't wait for head office. Plus safety documentation that has to survive an inspection.",
  },
  {
    slug: "real-estate",
    name: "Real estate brokerages",
    body: "A roster that turns over faster than anything else we work with, board-connected tools that don't integrate cleanly, and commission administration that has to be exactly right.",
  },
  {
    slug: "professional-services",
    name: "Legal, accounting and professional firms",
    body: "Matter-based permissions, conflict checks, and retention rules where the consequence of getting access wrong is professional rather than merely awkward.",
  },
  {
    slug: "clinics",
    name: "Medical and dental clinics",
    body: "PHIPA obligations, an EMR that dictates a lot of the environment, and front-desk staff who cannot be waiting on IT while patients are in the room.",
  },
];
