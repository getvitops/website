// Colour vocabulary for block fields, resolved in three tiers:
//
//   1. ROLE name (preferred)   `brand-primary`, `warning` … any key of
//                              `colors.roles` in site.json.
//   2. SEMANTIC fallback       `primary`, `secondary`, `success` … mapped to the
//                              closest role this site actually defines. Also maps
//                              the legacy v1 values `it` / `mk`.
//   3. COLOUR name (escape     a palette hue or hue-step, e.g. `pine-400`, from the
//      hatch, `color` field)   `color` field. Wins over `tone` when set.
//
// The result is a string of CSS custom properties (set via `style`), NOT class
// names: roles are an open map and Tailwind only emits utilities it finds written
// out in source, so `bg-${role}-solid` can't be built dynamically. Custom
// properties are all emitted, so no safelist is needed. The `.vt-tone-*` classes
// in site.css read them.
import config from '../../../site.json';

type RoleDef = string | { hue: string; kind?: 'surface' | 'chromatic' };
const colors = (
  config as unknown as {
    designSystem: {
      themes: {
        default: { colors: { roles: Record<string, RoleDef>; palette: Record<string, unknown> } };
      };
    };
  }
).designSystem.themes.default.colors;
const ROLES = colors.roles ?? {};
const HUES = colors.palette ?? {};

/** Semantic names, each with a fallback chain of roles. First one the site defines wins. */
const SEMANTIC: Record<string, string[]> = {
  primary: ['brand-primary', 'ui-primary'],
  secondary: ['brand-secondary', 'info', 'brand-primary'],
  accent: ['brand-secondary', 'brand-primary'],
  success: ['success', 'brand-primary'],
  info: ['info', 'brand-primary'],
  warning: ['warning'],
  danger: ['danger'],
  neutral: ['neutral'],
  // v1 block values (vitops.ca "IT" / "marketing"); kept so old content still renders
  it: ['brand-primary'],
  mk: ['brand-secondary', 'brand-primary'],
};

export interface Tone {
  /** CSS custom properties: --tone-fill / -on / -text / -edge / -wash */
  style: string;
  tier: 'color' | 'role' | 'fallback';
}

const neutralHue = (() => {
  const n = ROLES.neutral;
  return typeof n === 'object' ? n.hue : typeof n === 'string' ? n : undefined;
})();

function fromColor(color: string): Tone | undefined {
  const m = /^([a-z][a-z0-9-]*?)(?:-(\d{2,3}))?$/.exec(color.trim());
  if (!m || !(m[1] in HUES)) return undefined;
  const step = m[2] ?? '400';
  const fill = `var(--color-${m[1]}-${step})`;
  // Dark text on light steps, light text on dark steps, taken from the neutral hue.
  const light = Number(step) <= 500;
  const on = neutralHue
    ? `var(--color-${neutralHue}-${light ? 950 : 50})`
    : light
      ? '#000'
      : '#fff';
  return {
    tier: 'color',
    style: [
      `--tone-fill:${fill}`,
      `--tone-on:${on}`,
      `--tone-text:${fill}`,
      `--tone-edge:color-mix(in oklab, ${fill} 30%, transparent)`,
      `--tone-wash:color-mix(in oklab, ${fill} 7%, transparent)`,
    ].join(';'),
  };
}

function fromRole(role: string, tier: Tone['tier']): Tone {
  const def = ROLES[role];
  const surface = typeof def === 'object' && def.kind === 'surface';
  const vars = surface
    ? [
        `--tone-fill:var(--color-bg-${role}-bold)`,
        `--tone-on:var(--color-bg-${role})`,
        `--tone-text:var(--color-text-${role})`,
        `--tone-edge:var(--color-border-${role})`,
        `--tone-wash:var(--color-bg-${role}-x-muted)`,
      ]
    : [
        `--tone-fill:var(--color-bg-${role}-solid)`,
        `--tone-on:var(--color-text-on-${role})`,
        `--tone-text:var(--color-text-${role})`,
        `--tone-edge:var(--color-border-${role})`,
        `--tone-wash:var(--color-bg-${role}-x-muted)`,
      ];
  return { tier, style: vars.join(';') };
}

/** Resolve a block's `tone` (role or semantic name) and optional `color` (palette hue[-step]). */
export function resolveTone(tone?: string, color?: string): Tone {
  if (color) {
    const c = fromColor(color);
    if (c) return c;
  }
  if (tone && tone in ROLES) return fromRole(tone, 'role');
  for (const role of SEMANTIC[tone ?? ''] ?? []) {
    if (role in ROLES) return fromRole(role, 'fallback');
  }
  return fromRole('neutral' in ROLES ? 'neutral' : Object.keys(ROLES)[0], 'fallback');
}
