// Docs page metadata, ported from the canvas Metadata board.
import rows from './metadata.json';

export interface PageMeta {
  url: string;
  title: string;
  description: string;
  ogTitle: string;
  cardLabel: string;
  schema: string[];
}
export const METADATA: PageMeta[] = rows;

export function metaFor(pathname: string): PageMeta {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const m = METADATA.find((x) => new URL(x.url).pathname === path);
  if (!m) throw new Error(`metadata.json: no entry for ${path}`);
  if (m.title.length > 65) throw new Error(`metadata.json: title over 65 for ${path}`);
  if (m.description.length < 70 || m.description.length > 160)
    throw new Error(`metadata.json: description length ${m.description.length} for ${path}`);
  return m;
}
