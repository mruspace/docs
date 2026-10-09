#!/usr/bin/env node
// Copy the shared design system from mruspace/website, or check that the
// copy is current. The website repo is the only source; never edit the
// copies here.
//
//   node scripts/sync-tokens.mjs           copy from ../website if present, else GitHub
//   node scripts/sync-tokens.mjs --check   exit 1 if any copy differs (used in CI)
//   SYNC_FROM=github node scripts/sync-tokens.mjs --check
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const FILES = [
  ['src/styles/fonts.css', 'src/styles/shared/fonts.css'],
  ['src/styles/mru.css', 'src/styles/shared/mru.css'],
  ['src/styles/site.css', 'src/styles/shared/site.css'],
  // Shared components, at the same paths so their imports resolve.
  ...['MarkSvg', 'ThemeToggle', 'Analytics'].map((c) => [`src/components/${c}.astro`, `src/components/${c}.astro`]),
  ['src/scripts/theme.ts', 'src/scripts/theme.ts'],
  ['src/components/Breadcrumbs.astro', 'src/components/Breadcrumbs.astro'],
  // Shared build scripts: share cards, Markdown twins and llms files, checks.
  // Each repo keeps its own scripts/seo/config.mjs.
  ...[
    'og/card.mjs',
    'og/card.d.mts',
    'og/fonts/jost-500.ttf',
    'og/fonts/ibm-plex-mono-500.ttf',
    'og/fonts/OFL-jost.txt',
    'og/fonts/OFL-ibmplexmono.txt',
    'seo/postbuild.mjs',
    'seo/check.mjs',
  ].map((f) => [`scripts/${f}`, `scripts/${f}`]),
  ...[
    'jost-400',
    'jost-500',
    'jost-600',
    'source-serif-4-400',
    'source-serif-4-600',
    'source-serif-4-400-italic',
    'ibm-plex-mono-400',
    'ibm-plex-mono-500',
  ].map((f) => [`public/fonts/${f}.woff2`, `public/fonts/${f}.woff2`]),
  ...['jost', 'sourceserif4', 'ibmplexmono'].map((f) => [`public/fonts/OFL-${f}.txt`, `public/fonts/OFL-${f}.txt`]),
];

const check = process.argv.includes('--check');
const local = path.resolve('../website');
const fromGithub = process.env.SYNC_FROM === 'github' || !existsSync(path.join(local, 'src/styles/mru.css'));
const RAW = 'https://raw.githubusercontent.com/mruspace/website/main/';

async function source(rel) {
  if (!fromGithub) return readFile(path.join(local, rel));
  const res = await fetch(RAW + rel);
  if (!res.ok) throw new Error(`${RAW + rel}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

let stale = 0;
for (const [from, to] of FILES) {
  const want = await source(from);
  const have = existsSync(to) ? await readFile(to) : null;
  const same = have !== null && Buffer.compare(want, have) === 0;
  if (check) {
    if (!same) {
      stale++;
      console.error(`differs from website: ${to}`);
    }
  } else if (!same) {
    await mkdir(path.dirname(to), { recursive: true });
    await writeFile(to, want);
    console.log(`updated ${to}`);
  }
}
if (check && stale) {
  console.error(`${stale} shared file(s) differ from mruspace/website. Run: npm run sync-tokens`);
  process.exit(1);
}
console.log(check ? 'shared files match mruspace/website' : `source: ${fromGithub ? 'GitHub' : '../website'}`);
