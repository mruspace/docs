// sitemap.xml for docs.mru.space, lastmod from each page's "Updated" date.
import type { APIRoute } from 'astro';
import { METADATA } from '../data/metadata';
import { PAGES } from '../data/nav';

function parse(d?: string): string | null {
  const m = d?.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3] ?? '01'}`;
}

export const GET: APIRoute = () => {
  const newest = PAGES.map((p) => parse(p.updated))
    .filter(Boolean)
    .sort()
    .at(-1)!;
  const urls = METADATA.map((m) => {
    const path = new URL(m.url).pathname;
    const page = PAGES.find((p) => p.path === path);
    const lastmod = parse(page?.updated) ?? newest;
    return `  <url><loc>${m.url}</loc><lastmod>${lastmod}</lastmod></url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
