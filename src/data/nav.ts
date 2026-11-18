// Docs navigation, from the DocsNav artboard. The nav follows concepts and
// layers, not repository names. Prev/next follow PAGES.
//
// A page marks one item active: the item for the page itself. Items that link
// to a section of a page (an href with #) are never active; the page item is.
// So on /concepts/shrinking-quorum/ "Shrinking quorum" is active, not
// "Degradation-first" or "Graceful Degradation Index".

export type NavId =
  | 'home'
  | 'qs'
  | 'dfp'
  | 'quorum'
  | 'gdi'
  | 'layers'
  | 'prior'
  | 'qual'
  | 'crate'
  | 'cli'
  | 'sensor'
  | 'proofs'
  | 'targets'
  | 'bench'
  | 'dusk'
  | 'model'
  | 'sweep'
  | 'fprime'
  | 'cfs'
  | 'opssat'
  | 'run4'
  | 'field'
  | 'field-config'
  | 'field-staged'
  | 'field-floods'
  | '2049';

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
      { id: 'dfp', label: 'Degradation-first', href: '/concepts/shrinking-quorum/#degradation-first' },
      { id: 'quorum', label: 'Shrinking quorum', href: '/concepts/shrinking-quorum/' },
      { id: 'gdi', label: 'Graceful Degradation Index', href: '/concepts/shrinking-quorum/#gdi' },
      { id: 'layers', label: 'Layers 0 to 5', href: '/concepts/architecture/' },
      { id: 'prior', label: 'Prior art', href: '/concepts/prior-art/' },
      { id: 'qual', label: 'Qualification path', href: '/concepts/qualification/' },
    ],
  },
  {
    title: 'Core runtime',
    items: [
      { id: 'crate', label: 'quorum crate', href: '/core/quorum-crate/' },
      { id: 'cli', label: 'quorum CLI', href: '/core/quorum-cli/' },
      { id: 'sensor', label: 'Sensor selection', href: '/core/quorum-crate/#sensor' },
      { id: 'proofs', label: 'Kani proofs', href: '/core/quorum-crate/#proofs' },
      { id: 'targets', label: 'Targets and builds', href: '/core/quorum-crate/#targets' },
      { id: 'bench', label: 'Bench', href: '/core/bench/' },
    ],
  },
  {
    title: 'Mru Flight',
    items: [
      { id: 'fprime', label: 'F´ components', href: '/core/fprime/' },
      { id: 'cfs', label: 'cFS application', href: '/core/fprime/#cfs' },
      { id: 'opssat', label: 'OPS-SAT runs', href: '/core/quorum-cli/#opssat' },
      { id: 'run4', label: 'Run 4', href: '/core/fprime/#opssat-run4' },
    ],
  },
  {
    title: 'Mru Field',
    items: [
      { id: 'field', label: 'Supervisor', href: '/field/' },
      { id: 'field-config', label: 'Configuration', href: '/field/#config' },
      { id: 'field-staged', label: 'Staged updates', href: '/field/#staged' },
      { id: 'field-floods', label: 'Flood limits', href: '/field/#floods' },
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
  { title: 'Lab', items: [{ id: '2049', label: 'Mru 2049', href: '/lab/2049/' }] },
];

export interface DocPage {
  path: string;
  /** Title in prev/next links. */
  short: string;
  /** "Updated …" in the page ending, as ISO: "2026-10-19", or "2026-09" for a month. */
  updated?: string;
  /** "Source: …" in the page ending. */
  source?: string;
  /** Source file of this page in the docs repo, for "Edit on GitHub". */
  file: string;
}

export const PAGES: DocPage[] = [
  { path: '/', short: 'Overview', file: 'src/pages/index.astro' },
  {
    path: '/concepts/shrinking-quorum/',
    short: 'Shrinking quorum',
    updated: '2026-11-18',
    file: 'src/pages/concepts/shrinking-quorum.astro',
  },
  {
    path: '/concepts/architecture/',
    short: 'Architecture status',
    updated: '2026-11-18',
    file: 'src/pages/concepts/architecture.astro',
  },
  {
    path: '/concepts/prior-art/',
    short: 'Prior art',
    updated: '2026-10-11',
    file: 'src/pages/concepts/prior-art.astro',
  },
  {
    path: '/concepts/qualification/',
    short: 'Qualification path',
    updated: '2026-11-18',
    file: 'src/pages/concepts/qualification.astro',
  },
  {
    path: '/core/quorum-crate/',
    short: 'The quorum crate',
    updated: '2026-11-18',
    source: 'quorum/src/lib.rs, quorum/src/sensor.rs',
    file: 'src/pages/core/quorum-crate.astro',
  },
  {
    path: '/core/quorum-cli/',
    short: 'The quorum CLI',
    updated: '2026-11-18',
    source: 'demo/src/main.rs',
    file: 'src/pages/core/quorum-cli.astro',
  },
  {
    path: '/core/fprime/',
    short: 'F´ components',
    updated: '2026-11-18',
    source: 'fprime/Mru/Components',
    file: 'src/pages/core/fprime.astro',
  },
  {
    path: '/core/bench/',
    short: 'Bench',
    updated: '2026-10-19',
    source: 'scripts/bench.sh',
    file: 'src/pages/core/bench.astro',
  },
  {
    path: '/field/',
    short: 'Mru Field',
    updated: '2026-11-18',
    source: 'field docs/spec.md',
    file: 'src/pages/field/index.astro',
  },
  { path: '/simulation/dusk/', short: 'Dusk', updated: '2026-10-11', file: 'src/pages/simulation/dusk.astro' },
  { path: '/lab/2049/', short: 'Mru 2049', updated: '2026-09', file: 'src/pages/lab/2049.astro' },
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
/** "2026-10-19" as "October 19, 2026", "2026-09" as "September 2026". */
export function formatUpdated(iso: string): string {
  const [y, m, d] = iso.split('-');
  const month = MONTHS[Number(m) - 1];
  return d ? `${month} ${Number(d)}, ${y}` : `${month} ${y}`;
}
