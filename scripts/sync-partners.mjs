// Writes seed/partners.mjs into the "Key partners" `vitops_logos` block of seed/seed.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { partners } from '../seed/partners.mjs';

const path = new URL('../seed/seed.json', import.meta.url);
const seed = JSON.parse(readFileSync(path, 'utf8'));
let hit = 0;
(function walk(x) {
  if (Array.isArray(x)) return x.forEach(walk);
  if (!x || typeof x !== 'object') return;
  if (x._type === 'vitops_logos' && x.kicker === 'Key partners') {
    x.logos = partners.map((alt, i) => ({ _key: `i${33 + i}`, alt }));
    hit++;
  }
  Object.values(x).forEach(walk);
})(seed);
if (!hit) throw new Error('no "Key partners" logo block found in seed.json');
writeFileSync(path, JSON.stringify(seed, null, 2) + '\n');
console.log(`synced ${partners.length} partners into ${hit} block(s)`);
