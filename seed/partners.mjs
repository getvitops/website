// Key partners shown in the home page's "Key partners" logo row (`vitops_logos`).
// This is the one list to edit: comment a name out to hide it, then run
//   node scripts/sync-partners.mjs
// to write it into seed/seed.json. A seed only applies to an empty database, so a running
// site also needs the same change in the admin (edit the logo block on the home page) or
// through the site's MCP server. Icons are in public/partners/ (simple-icons, plus Iconify
// for Microsoft, Azure and Rippling), recoloured neutral grey. `vitops_logos` shows the image
// OR the name, so an icon replaces the name visually (the name stays as alt text).
// A name with no `image` renders as text (Jobber has no icon in any open pack).
const icon = (name, file = name.toLowerCase()) => ({ name, image: `/partners/${file}.svg` });

export const partners = [
  icon('Zoho'),
  icon('Google'),
  icon('Microsoft'),
  icon('QuickBooks'),
  icon('HubSpot'),
  icon('Zendesk'),
  icon('Anthropic'),
  icon('Rippling'),
  icon('Cloudflare'),
  icon('Azure'),
  { name: 'Jobber' },
  // icon('Slack'),
  // icon('1Password'),
  icon('Namecheap'),
];
