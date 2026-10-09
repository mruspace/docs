// sitemap.xml for docs.mru.space, lastmod from each page's "Updated" date.
import type { APIRoute } from 'astro';
import { METADATA } from '../data/metadata';
import { PAGES } from '../data/nav';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function parse(d?: string): string | null {
  const m = d?.match(/^(?:(\d+) )?(\w{3}) (\d{4})$/);
  if (!m) return null;
  const day = String(m[1] ?? '1').padStart(2, '0');
  const mon = String(MONTHS.indexOf(m[2]!) + 1).padStart(2, '0');
  return `${m[3]}-${mon}-${day}`;
}

export const GET: APIRoute = () => {
  const newest = PAGES.map((p) => parse(p.updated)).filter(Boolean).sort().at(-1)!;
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
