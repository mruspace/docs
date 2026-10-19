// docs.mru.space settings for scripts/seo/postbuild.mjs and check.mjs.
export default {
  metadata: 'src/data/metadata.json',
  siteName: 'Mru Aerospace',
  mainSelector: 'main',
  drop: ['script', 'style', 'button', 'form', '.prevnext'],
  title: 'Mru docs',
  summary:
    "Reference for Mru's open core, for unattended missions with no repair path: the shrinking-quorum decision crate and its fault-injection demo (Rust, no_std, nine Kani proofs: four on the core, five on the C interface), the Dusk simulator and the Mru 2049 browser flight simulator. The quorum demo ran once in orbit on ESA's OPS-SAT PRETTY satellite (exp4051, 18 Oct 2026); the F´ components have not run on flight hardware. Code under Apache 2.0.",
  intro:
    'Product pages, use cases and research results are at https://mru.space/llms.txt. Questions: contact@mru.space.',
  sections: [
    { title: 'Start', match: (p) => p === '/' },
    { title: 'Concepts', match: (p) => p.startsWith('/concepts/') },
    { title: 'Core runtime', match: (p) => p.startsWith('/core/') },
    { title: 'Simulation', match: (p) => p.startsWith('/simulation/') },
    { title: 'Lab', match: (p) => p.startsWith('/lab/') },
    {
      title: 'mru.space',
      links: [
        {
          title: 'Mru, llms.txt',
          url: 'https://mru.space/llms.txt',
          description: 'Products, use cases, research and company.',
        },
      ],
    },
  ],
};
