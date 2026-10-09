// JSON-LD for docs pages: one @graph per page. The Organization is the same
// node as on mru.space (same @id). Types per route from the Metadata board.
import type { BreadcrumbList, Graph, Organization, SoftwareSourceCode, TechArticle, WebSite } from 'schema-dts';
import type { PageMeta } from './metadata';
import { SITE } from './site';

export interface Crumb {
  label: string;
  href?: string;
}
export interface Code {
  name: string;
  repo: string;
  language: string;
  license: string;
}

const ORG_ID = `${SITE.www}/#org`;
const SITE_ID = `${SITE.url}/#website`;

const organization = (): Organization => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Mru',
  legalName: 'Binns Pte. Ltd.',
  url: `${SITE.www}/`,
  logo: { '@type': 'ImageObject', url: `${SITE.www}/assets/icon-512.png`, width: '512', height: '512' },
  email: SITE.email,
  sameAs: ['https://x.com/mruspace', SITE.github, 'https://doi.org/10.5281/zenodo.20579438'],
});

export function buildGraph(meta: PageMeta, crumbs?: Crumb[], code?: Code): Graph {
  const url = meta.url;
  const nodes: Graph['@graph'][number][] = [
    organization(),
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: 'Mru docs',
      url: `${SITE.url}/`,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    } satisfies WebSite,
  ];
  for (const t of meta.schema) {
    if (t === 'WebSite') continue;
    if (t === 'TechArticle')
      nodes.push({
        '@type': 'TechArticle',
        headline: meta.ogTitle,
        description: meta.description,
        url,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': SITE_ID },
        inLanguage: 'en',
      } satisfies TechArticle);
    else if (t === 'BreadcrumbList') {
      if (!crumbs) throw new Error(`JSON-LD: ${url} lists BreadcrumbList but passes no breadcrumbs`);
      nodes.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          item: c.href ? new URL(c.href, url).href : url,
        })),
      } satisfies BreadcrumbList);
    } else if (t === 'SoftwareSourceCode') {
      if (!code) throw new Error(`JSON-LD: ${url} lists SoftwareSourceCode but passes no code`);
      nodes.push({
        '@type': 'SoftwareSourceCode',
        name: code.name,
        codeRepository: code.repo,
        programmingLanguage: code.language,
        license: `https://spdx.org/licenses/${code.license}.html`,
        author: { '@id': ORG_ID },
      } satisfies SoftwareSourceCode);
    } else throw new Error(`JSON-LD: no builder for "${t}" (${url})`);
  }
  return { '@context': 'https://schema.org', '@graph': nodes };
}
