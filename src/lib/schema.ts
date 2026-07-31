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
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Vitops",
  url: SITE_URL,
  email: "hi@vitops.ca",
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
