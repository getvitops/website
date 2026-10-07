// One-off: rewrites seed/{pages,managed_it_services}/*.json from the legacy
// hero/callout/sections/cta/schema/breadcrumb JSON fields into a `layout`
// blocks array, and seed/{industries,funding_programs}/*.json json fields into
// the new repeater fields. Run once, review the diff, delete this file.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const join = (a) => (Array.isArray(a) && a.length ? a.join("\n\n") : undefined);
const clean = (o) =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );

function section(s) {
  switch (s.type) {
    case "lead":
      return { _type: "lead", body: join(s.paragraphs) };
    case "text":
      return clean({
        _type: "text",
        eyebrow: s.eyebrow,
        title: s.title,
        lead: s.lead,
        body: join(s.paragraphs),
        more: join(s.more),
        note: s.note,
        spotlight: s.spotlight === false ? false : undefined,
      });
    case "cards":
      return clean({
        _type: "cards",
        eyebrow: s.eyebrow,
        title: s.title,
        lead: s.lead,
        cols: s.cols ? String(s.cols) : undefined,
        cards: s.cards?.map((c) =>
          clean({ tag: c.tag, heading: c.heading, body: c.body, items: c.items?.join("\n") }),
        ),
        note: s.note,
        links: s.links,
      });
    case "columns":
      return clean({
        _type: "columns",
        eyebrow: s.eyebrow,
        title: s.title,
        lead: s.lead,
        columns: s.columns?.map((c) => ({ heading: c.heading, body: join(c.paragraphs) })),
      });
    case "list":
      return clean({
        _type: "list",
        eyebrow: s.eyebrow,
        title: s.title,
        lead: s.lead,
        items: s.items?.map((i) =>
          typeof i === "string"
            ? { body: i }
            : clean({ heading: i.heading, body: i.body, href: i.href, link_label: i.linkLabel }),
        ),
        note: s.note,
      });
    case "stats":
      return clean({
        _type: "stats",
        eyebrow: s.eyebrow,
        lead: s.lead,
        cols: s.cols ? String(s.cols) : undefined,
        stats: s.stats?.map((t) =>
          clean({
            value: t.value,
            label: t.label,
            source_label: t.sourceLabel,
            source_url: t.sourceUrl,
          }),
        ),
      });
    case "faq":
      return clean({ _type: "faq", eyebrow: s.eyebrow, title: s.title, items: s.items });
    case "facts":
      return { _type: "facts", items: s.items };
    case "contact":
      return { _type: "contact_form" };
    default:
      throw new Error(`unknown section type ${s.type}`);
  }
}

function convertPage(d, slug) {
  const layout = [];
  if (d.callout) layout.push({ _type: "callout", text: d.callout });
  if (d.hero) {
    layout.push(
      clean({
        _type: "hero",
        eyebrow: d.hero.eyebrow,
        title: d.hero.title,
        lead: d.hero.lead,
        cta_label: d.hero.ctaLabel,
        cta_href: d.hero.ctaHref,
        secondary_label: d.hero.secondaryLabel,
        secondary_href: d.hero.secondaryHref,
        note: d.hero.note,
      }),
    );
  }
  for (const s of d.sections ?? []) layout.push(section(s));
  if (d.cta) {
    layout.push(
      clean({
        _type: "cta",
        title: d.cta.title,
        lead: d.cta.lead,
        cta_label: d.cta.ctaLabel,
        cta_href: d.cta.ctaHref,
        note: d.cta.note,
        links: d.cta.links,
      }),
    );
  }
  layout.forEach((b, i) => Object.assign(b, { _version: 1, _key: `${slug}-${i + 1}-${b._type}` }));

  const { hero, callout, sections, cta, schema, breadcrumb, ...rest } = d;
  return {
    ...rest,
    ...(schema?.graph === "organization" && { schema_type: "organization" }),
    ...(schema?.service && {
      schema_type: "service",
      service_name: schema.service.name,
      service_description: schema.service.description,
    }),
    ...(!schema && { schema_type: "none" }),
    ...(breadcrumb?.length && { crumbs: breadcrumb.map(([label, href]) => ({ label, href })) }),
    layout,
  };
}

function convertIndustry(d) {
  const { differences, pillars, faq, ...rest } = d;
  return { ...rest, differences_items: differences, pillar_items: pillars, faq_items: faq };
}
function convertProgram(d) {
  const { facts, sections, faq, related_links, ...rest } = d;
  return {
    ...rest,
    fact_items: facts?.map(([term, value]) => ({ term, value })),
    section_items: sections?.map((s) => ({ title: s.title, body: join(s.body) })),
    faq_items: faq,
    link_items: related_links,
  };
}

const jobs = {
  pages: convertPage,
  managed_it_services: convertPage,
  industries: (d) => convertIndustry(d),
  funding_programs: (d) => convertProgram(d),
};
for (const [collection, fn] of Object.entries(jobs)) {
  for (const f of readdirSync(`seed/${collection}`).filter((x) => x.endsWith(".json"))) {
    const path = `seed/${collection}/${f}`;
    const d = JSON.parse(readFileSync(path, "utf8"));
    if (d.layout || d.differences_items || d.fact_items) {
      console.log(`skip ${path} (already converted)`);
      continue;
    }
    writeFileSync(path, JSON.stringify(fn(d, f.replace(/\.json$/, "")), null, 2) + "\n");
    console.log(`converted ${path}`);
  }
}
