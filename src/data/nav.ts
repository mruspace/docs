// Docs navigation, from the DocsNav artboard. The nav follows concepts and
// layers, not repository names. Prev/next follow PAGES.
import { SITE } from './site';

export type NavId =
  | 'home' | 'qs' | 'dfp' | 'quorum' | 'gdi' | 'layers' | 'crate' | 'cli' | 'proofs'
  | 'targets' | 'dusk' | 'model' | 'sweep' | 'fprime' | 'opssat' | '2049';

export interface NavGroup {
  title: string;
  items: { id: NavId; label: string; href: string }[];
}

export const NAV: NavGroup[] = [
  {
    title: 'Start',
    items: [
      { id: 'home', label: 'Overview', href: '/' },
      { id: 'qs', label: 'Quickstart', href: '/#quickstart' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { id: 'dfp', label: 'Degradation-first', href: '/concepts/shrinking-quorum/' },
      { id: 'quorum', label: 'Shrinking quorum', href: '/concepts/shrinking-quorum/' },
      { id: 'gdi', label: 'Graceful Degradation Index', href: '/concepts/shrinking-quorum/#gdi' },
      { id: 'layers', label: 'Layers 0 to 5', href: `${SITE.www}/how-it-works/` },
    ],
  },
  {
    title: 'Core runtime',
    items: [
      { id: 'crate', label: 'quorum crate', href: '/core/quorum-crate/' },
      { id: 'cli', label: 'quorum CLI', href: '/core/quorum-cli/' },
      { id: 'proofs', label: 'Kani proofs', href: '/core/quorum-crate/#proofs' },
      { id: 'targets', label: 'Targets and builds', href: '/core/quorum-crate/#targets' },
    ],
  },
  {
    title: 'Simulation',
    items: [
      { id: 'dusk', label: 'Dusk', href: '/simulation/dusk/' },
      { id: 'model', label: 'The fault model', href: '/simulation/dusk/#model' },
      { id: 'sweep', label: 'Sweeps and ground support', href: '/simulation/dusk/#sweep' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { id: 'fprime', label: 'F´ components', href: '/core/quorum-crate/' },
      { id: 'opssat', label: 'OPS-SAT launcher', href: '/core/quorum-cli/#opssat' },
    ],
  },
  { title: 'Lab', items: [{ id: '2049', label: 'Mru 2049', href: '/lab/2049/' }] },
];

export interface DocPage {
  path: string;
  /** Title in prev/next links. */
  short: string;
  /** "Updated …" in the page ending. */
  updated?: string;
  /** "Source: …" in the page ending. */
  source?: string;
  /** Source file of this page in the docs repo, for "Edit on GitHub". */
  file: string;
}

export const PAGES: DocPage[] = [
  { path: '/', short: 'Overview', file: 'src/pages/index.astro' },
  { path: '/concepts/shrinking-quorum/', short: 'Shrinking quorum', updated: '7 Oct 2026', file: 'src/pages/concepts/shrinking-quorum.astro' },
  { path: '/core/quorum-crate/', short: 'The quorum crate', updated: '7 Oct 2026', source: 'quorum/src/lib.rs', file: 'src/pages/core/quorum-crate.astro' },
  { path: '/core/quorum-cli/', short: 'The quorum CLI', updated: '7 Oct 2026', source: 'demo/src/main.rs', file: 'src/pages/core/quorum-cli.astro' },
  { path: '/simulation/dusk/', short: 'Dusk', updated: '29 Sep 2026', file: 'src/pages/simulation/dusk.astro' },
  { path: '/lab/2049/', short: 'Mru 2049', updated: 'Sep 2026', file: 'src/pages/lab/2049.astro' },
];
