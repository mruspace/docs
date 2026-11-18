// docs.mru.space settings for scripts/seo/postbuild.mjs and check.mjs.
export default {
  metadata: 'src/data/metadata.json',
  siteName: 'Mru Aerospace',
  mainSelector: 'main',
  drop: ['script', 'style', 'button', 'form', '.prevnext'],
  title: 'Mru docs',
  summary:
    "Reference for Mru's open core, for unattended missions with no repair path: the shrinking-quorum decision crate and its fault-injection demo (Rust, no_std, 16 Kani proofs: four on the core's decisions, five on sensor selection, seven on the C interface), the F´ components and a cFS application, the Mru Field supervisor for systems on Earth, the Dusk simulator and the Mru 2049 browser flight simulator. Mru Flight ran three times in orbit on ESA's OPS-SAT PRETTY satellite (exp4051): the quorum demo on October 18 and 22, 2026, and the F´ components in an F´ deployment on October 28, 2026. Run 4 was approved on November 16, 2026, and has not flown. Code under Apache 2.0.",
  intro:
    'Product pages, use cases and research results are at https://mru.space/llms.txt. Questions: contact@mru.space.',
  sections: [
    { title: 'Start', match: (p) => p === '/' },
    { title: 'Concepts', match: (p) => p.startsWith('/concepts/') },
    { title: 'Core runtime', match: (p) => p.startsWith('/core/') && p !== '/core/fprime/' },
    { title: 'Mru Flight', match: (p) => p === '/core/fprime/' },
    { title: 'Mru Field', match: (p) => p.startsWith('/field/') },
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
