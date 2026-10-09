// docs.mru.space settings for scripts/seo/postbuild.mjs and check.mjs.
export default {
  metadata: 'src/data/metadata.json',
  siteName: 'Mru Aerospace',
  mainSelector: 'main',
  drop: ['script', 'style', 'button', 'form', '.prevnext'],
  title: 'Mru docs',
  summary:
    "Reference for Mru's open core: the shrinking-quorum decision crate and its fault-injection demo (Rust, no_std, four Kani proofs), the Dusk simulator and the Mru 2049 browser flight simulator. Prototype at TRL 3; code under Apache 2.0.",
  intro: 'Product pages, use cases and research results are at https://mru.space/llms.txt. Questions: contact@mru.space.',
  sections: [
    { title: 'Start', match: (p) => p === '/' },
    { title: 'Concepts', match: (p) => p.startsWith('/concepts/') },
    { title: 'Core runtime', match: (p) => p.startsWith('/core/') },
    { title: 'Simulation', match: (p) => p.startsWith('/simulation/') },
    { title: 'Lab', match: (p) => p.startsWith('/lab/') },
    {
      title: 'mru.space',
      links: [{ title: 'Mru, llms.txt', url: 'https://mru.space/llms.txt', description: 'Products, use cases, research and company.' }],
    },
  ],
};
