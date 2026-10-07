// The page-builder block types editors compose a page from (the `layout` field
// on `pages` and `managed_it_services`). Single source: `seed/seed.json`'s
// `blockTypes` is generated from this by `node scripts/lib/block-types.mjs`,
// and `scripts/promote-schema.mjs` applies the same definitions to a running
// site over REST. The renderers are src/components/page/blocks/*.astro.
//
// Copy fields take `[label](/href)` inline links and `**bold**` (lib/inline.ts).
// A `text` field holding several paragraphs splits on a blank line.
import { readFileSync, writeFileSync } from "node:fs";

const str = (slug, label, extra = {}) => ({ slug, label, type: "string", ...extra });
const text = (slug, label, extra = {}) => ({ slug, label, type: "text", ...extra });
const sub = (slug, label, type = "string", extra = {}) => ({ slug, label, type, ...extra });
const repeater = (slug, label, subFields, extra = {}) => ({
  slug,
  label,
  type: "repeater",
  validation: { subFields, ...extra },
});
const select = (slug, label, options) => ({
  slug,
  label,
  type: "select",
  validation: { options },
});

export const LINKS = (slug = "links") =>
  repeater(slug, "Links", [
    sub("label", "Label", "string", { required: true }),
    sub("href", "Link", "string", { required: true }),
  ]);

export const BLOCK_TYPES = [
  {
    slug: "hero",
    label: "Hero",
    category: "Layout",
    icon: "layout",
    description: "Page heading: eyebrow, title, intro and up to two buttons.",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title", { required: true }),
      text("lead", "Intro"),
      str("cta_label", "Button label"),
      str("cta_href", "Button link"),
      str("secondary_label", "Second button label"),
      str("secondary_href", "Second button link"),
      text("note", "Note under buttons"),
    ],
  },
  {
    slug: "callout",
    label: "Funding callout",
    category: "Layout",
    icon: "megaphone",
    description: "Slim band above the hero pointing at funding.",
    fields: [
      text("text", "Text", { required: true }),
      str("link_label", "Link label"),
      str("link_href", "Link"),
    ],
  },
  {
    slug: "lead",
    label: "Lead paragraph",
    category: "Content",
    icon: "text-align-left",
    description: "Large intro text. Blank line starts a new paragraph.",
    fields: [text("body", "Text", { required: true })],
  },
  {
    slug: "text",
    label: "Text section",
    category: "Content",
    icon: "article",
    description: "Heading with paragraphs; optional extra paragraphs below a rule.",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title", { required: true }),
      text("lead", "Intro"),
      text("body", "Paragraphs"),
      text("more", "More paragraphs (below a rule)"),
      text("note", "Small print"),
      { slug: "spotlight", label: "Spotlight background", type: "boolean", defaultValue: true },
    ],
  },
  {
    slug: "cards",
    label: "Card grid",
    category: "Content",
    icon: "squares-four",
    description: "Heading with a grid of cards.",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title"),
      text("lead", "Intro"),
      select("cols", "Columns", ["2", "3"]),
      repeater("cards", "Cards", [
        sub("tag", "Tag"),
        sub("heading", "Heading", "string", { required: true }),
        sub("body", "Body", "text"),
        sub("items", "Bullet list (one per line)", "text"),
      ]),
      text("note", "Small print"),
      LINKS(),
    ],
  },
  {
    slug: "columns",
    label: "Columns",
    category: "Content",
    icon: "columns",
    description: "Heading with side-by-side text columns.",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title"),
      text("lead", "Intro"),
      repeater("columns", "Columns", [
        sub("heading", "Heading", "string", { required: true }),
        sub("body", "Paragraphs", "text"),
      ]),
    ],
  },
  {
    slug: "list",
    label: "List",
    category: "Content",
    icon: "list-bullets",
    description: "Heading with a list; each item can have a bold lead-in and a link.",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title"),
      text("lead", "Intro"),
      repeater("items", "Items", [
        sub("heading", "Bold lead-in"),
        sub("body", "Text", "text", { required: true }),
        sub("href", "Link"),
        sub("link_label", "Link label"),
      ]),
      text("note", "Small print"),
    ],
  },
  {
    slug: "stats",
    label: "Stats",
    category: "Content",
    icon: "chart-bar",
    description: "Figures with a source for each.",
    fields: [
      str("eyebrow", "Eyebrow"),
      text("lead", "Intro"),
      select("cols", "Columns", ["2", "3", "4"]),
      repeater("stats", "Stats", [
        sub("value", "Figure", "string", { required: true }),
        sub("label", "Label", "string", { required: true }),
        sub("source_label", "Source"),
        sub("source_url", "Source link"),
      ]),
    ],
  },
  {
    slug: "faq",
    label: "FAQ",
    category: "Content",
    icon: "question",
    description: "Questions and answers (also emitted as FAQ structured data).",
    fields: [
      str("eyebrow", "Eyebrow"),
      str("title", "Title"),
      repeater("items", "Questions", [
        sub("q", "Question", "string", { required: true }),
        sub("a", "Answer", "text", { required: true }),
      ]),
    ],
  },
  {
    slug: "facts",
    label: "Facts list",
    category: "Content",
    icon: "address-book",
    description: "Name / address / phone style term list.",
    fields: [
      repeater("items", "Rows", [
        sub("term", "Term", "string", { required: true }),
        sub("value", "Value", "text", { required: true }),
      ]),
    ],
  },
  {
    slug: "contact_form",
    label: "Enquiry form",
    category: "Layout",
    icon: "envelope",
    description: "The contact form. Nothing to edit.",
    fields: [],
  },
  {
    slug: "cta",
    label: "Closing call to action",
    category: "Layout",
    icon: "arrow-circle-right",
    description: "Closing band with a button and optional links.",
    fields: [
      str("title", "Title", { required: true }),
      text("lead", "Intro"),
      str("cta_label", "Button label"),
      str("cta_href", "Button link"),
      text("note", "Note under button"),
      LINKS(),
    ],
  },
];

export const BLOCK_SLUGS = BLOCK_TYPES.map((b) => b.slug);

const PAGE_FIELDS = [
  {
    slug: "layout",
    label: "Page layout",
    type: "blocks",
    validation: { allowedTypes: BLOCK_SLUGS, maxItems: 40 },
  },
  repeater("crumbs", "Breadcrumb trail (default: the hero eyebrow, then this page)", [
    sub("label", "Label", "string", { required: true }),
    sub("href", "Link", "string", { required: true }),
  ]),
  select("schema_type", "Structured data", ["none", "organization", "service"]),
  str("service_name", "Service name (structured data)"),
  text("service_description", "Service description (structured data)"),
];

/**
 * Fields added to existing collections. EmDash will not change a `json` field
 * to a repeater in place (FIELD_TYPE_CHANGE_REQUIRES_MIGRATION), so industries
 * and funding_programs get new `*_items` repeaters; the old json fields are
 * dropped once content is synced (see docs/EMDASH-TOOLCHAIN-MIGRATION-PLAN.md).
 */
export const COLLECTION_FIELDS = {
  pages: PAGE_FIELDS,
  managed_it_services: PAGE_FIELDS,
  industries: [
    repeater("differences_items", "Differences", [
      sub("heading", "Heading", "string", { required: true }),
      sub("body", "Body", "text"),
    ]),
    repeater("pillar_items", "Pillars", [
      sub("label", "Label", "string", { required: true }),
      sub("body", "Body", "text"),
    ]),
    repeater("faq_items", "FAQ", [
      sub("q", "Question", "string", { required: true }),
      sub("a", "Answer", "text", { required: true }),
    ]),
  ],
  funding_programs: [
    repeater("fact_items", "Facts", [
      sub("term", "Term", "string", { required: true }),
      sub("value", "Value", "text", { required: true }),
    ]),
    repeater("section_items", "Sections", [
      sub("title", "Title", "string", { required: true }),
      sub("body", "Paragraphs (blank line between)", "text"),
    ]),
    repeater("faq_items", "FAQ", [
      sub("q", "Question", "string", { required: true }),
      sub("a", "Answer", "text", { required: true }),
    ]),
    repeater("link_items", "Related links", [
      sub("label", "Label", "string", { required: true }),
      sub("href", "Link", "string", { required: true }),
    ]),
  ],
};

/** Seed-file shape: a single retained version per type. */
export const SEED_BLOCK_TYPES = BLOCK_TYPES.map(({ fields, ...rest }) => ({
  ...rest,
  currentVersion: 1,
  versions: [{ version: 1, fields }],
}));

// `node scripts/lib/block-types.mjs` rewrites seed/seed.json's `blockTypes`.
if (import.meta.url === `file://${process.argv[1]}`) {
  const path = "seed/seed.json";
  const seed = JSON.parse(readFileSync(path, "utf8"));
  const { blockTypes: _old, ...rest } = seed;
  for (const c of rest.collections) {
    const wanted = COLLECTION_FIELDS[c.slug] ?? [];
    for (const f of wanted) {
      const i = c.fields.findIndex((x) => x.slug === f.slug);
      if (i >= 0) c.fields[i] = f;
      else c.fields.push(f);
    }
  }
  // Menus: seed/menus.json is the source; seed.json carries them for fresh DBs.
  const menuDefs = JSON.parse(readFileSync("seed/menus.json", "utf8"));
  const toSeedItem = ({ label, url, children }) => ({
    type: "custom",
    label,
    url,
    ...(children && { children: children.map(toSeedItem) }),
  });
  rest.menus = Object.entries(menuDefs).map(([name, m]) => ({
    name,
    label: m.label,
    items: m.items.map(toSeedItem),
  }));
  const out = {};
  for (const [k, v] of Object.entries(rest)) {
    out[k] = v;
    if (k === "settings") out.blockTypes = SEED_BLOCK_TYPES;
  }
  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  console.log(`seed.json blockTypes: ${SEED_BLOCK_TYPES.length}`);
}
