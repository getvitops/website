/**
 * Site-wide structured data.
 *
 * The `Organization` node must be byte-identical everywhere it appears —
 * entity consistency is how an answer engine decides two mentions of "Vitops"
 * are the same company. Import it; don't retype it.
 *
 * See content-plan/geo.md and content-plan/credentials.md.
 */

export const SITE_URL = "https://vitops.ca";

const cert = (name: string) => ({
  "@type": "EducationalOccupationalCredential",
  credentialCategory: "certification",
  name,
});

export const ORGANIZATION = {
  // ProfessionalService is a LocalBusiness subtype — local-search ranking in a
  // city-targeted market wants that, not a bare Organization. Keep this one
  // node under the one @id below rather than emitting a second node: the
  // header comment's "byte-identical everywhere" rule is what makes an answer
  // engine treat every mention as the same entity.
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Vitops",
  url: SITE_URL,
  email: "hi@vitops.ca",
  telephone: "+1-613-518-7984",
  // Service-area business — city + phone, no street address. `telephone` here
  // must match site.json's organization.contact.phone by hand (that field is
  // named `phone`, not `telephone` — schema.org's own vocabulary — and its
  // sibling `address` there requires a streetAddress we don't have, which is
  // why the PostalAddress below is hand-authored here rather than fed through
  // site.json/the generator at all; see this file's header comment on why
  // these facts are duplicated rather than imported).
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  description:
    "Vitops runs the digital presence and the software, IT and back-office operations behind it for Ontario small businesses.",
  areaServed: ["Ottawa", "Ontario", "Canada"],
  founder: [
    {
      "@type": "Person",
      name: "Justin Lang",
      jobTitle: "Co-founder",
      alumniOf: { "@type": "EducationalOrganization", name: "PhD, Population Health" },
      sameAs: "https://www.linkedin.com/in/justinl-viabilityhr",
    },
    {
      "@type": "Person",
      name: "Alex Gagnon",
      jobTitle: "Co-founder",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Master of Computer Science",
      },
      // Current credentials only. Never emit an expired certification.
      hasCredential: [
        cert("Microsoft Certified: Azure Solutions Architect Expert"),
        cert("Microsoft Certified: Azure Administrator Associate"),
        cert("Microsoft Certified: Security, Compliance, and Identity Fundamentals"),
      ],
      sameAs: "https://www.linkedin.com/in/alex-gagnon-658108189/",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/getvitops",
    "https://www.instagram.com/getvitops",
    "https://www.tiktok.com/@getvitops",
    "https://www.youtube.com/@getvitops",
    "https://www.facebook.com/getvitops",
  ],
} as const;

/** Breadcrumb trail. Pass [label, path] pairs excluding Home. */
export function breadcrumb(...trail: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path === "/" ? "" : path}`,
    })),
  };
}

/** A service offered by Vitops, tied back to the one Organization node. */
export function service(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Ottawa", "Ontario", "Canada"],
  };
}

/** The Organization node, wrapped for standalone emission. */
export const organizationGraph = {
  "@context": "https://schema.org",
  ...ORGANIZATION,
};
