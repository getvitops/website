/**
 * Inline text for CMS-authored copy: HTML-escaped, with `[label](href)` turned
 * into the site's `.link` anchor and `**text**` into <strong>. Editors get links
 * and emphasis without raw HTML in a JSON field, and nothing they type can inject
 * markup.
 */
const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Only site-relative paths, anchors, and http(s)/mailto/tel pass as hrefs.
const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/;

export function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) =>
      SAFE_HREF.test(href) ? `<a class="link" href="${href}">${label}</a>` : match,
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
