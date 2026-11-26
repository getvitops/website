// Key partners shown in the home page's "Key partners" logo row (`vitops_logos`).
// This is the one list to edit: comment a name out to hide it, then run
//   node scripts/sync-partners.mjs
// to write it into seed/seed.json. A seed only applies to an empty database, so a running
// site also needs the same change in the admin (edit the logo block on the home page) or
// through the site's MCP server. Names only for now; add `image` and `href` when logos land.
export const partners = [
  'Zoho',
  'Google',
  'Microsoft',
  'QuickBooks',
  'HubSpot',
  'Zendesk',
  'Anthropic',
  'Rippling',
  'Cloudflare',
  'Azure',
  'Jobber',
  // 'Slack',
  // '1Password',
  'Namecheap',
];
