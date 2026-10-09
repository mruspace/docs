// Docs search with Pagefind. The index is built after `astro build` into
// /pagefind/. Without JS the form submits to a site search instead.
interface PagefindResult {
  data: () => Promise<{ url: string; excerpt: string; meta: { title?: string } }>;
}
interface Pagefind {
  init: () => Promise<void>;
  search: (q: string) => Promise<{ results: PagefindResult[] }>;
}

export function initSearch(): void {
  const form = document.querySelector<HTMLFormElement>('[data-search]');
  const input = form?.querySelector<HTMLInputElement>('input[type="search"]');
  const box = form?.querySelector<HTMLElement>('.search-results');
  if (!form || !input || !box) return;

  let pf: Pagefind | null = null;
  const load = async () => {
    if (!pf) {
      const url = '/pagefind/pagefind.js';
      pf = (await import(/* @vite-ignore */ url)) as Pagefind;
      await pf.init();
    }
    return pf;
  };

  let seq = 0;
  const run = async () => {
    const q = input.value.trim();
    const mine = ++seq;
    if (!q) {
      box.hidden = true;
      box.replaceChildren();
      return;
    }
    let results: { url: string; excerpt: string; meta: { title?: string } }[] = [];
    try {
      const engine = await load();
      const found = await engine.search(q);
      results = await Promise.all(found.results.slice(0, 8).map((r) => r.data()));
    } catch {
      box.innerHTML = '<p class="search-empty">Search is not available right now. Use the menu on the left.</p>';
      box.hidden = false;
      return;
    }
    if (mine !== seq) return;
    if (!results.length) {
      box.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'search-empty';
      p.textContent = `No pages match “${q}”.`;
      box.append(p);
    } else {
      const ul = document.createElement('ul');
      for (const r of results) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = r.url;
        const t = document.createElement('span');
        t.className = 'search-title';
        t.textContent = r.meta.title ?? r.url;
        const e = document.createElement('span');
        e.className = 'search-excerpt';
        // Pagefind excerpts are escaped text with <mark> around matches.
        e.innerHTML = r.excerpt;
        a.append(t, e);
        li.append(a);
        ul.append(li);
      }
      box.replaceChildren(ul);
    }
    box.hidden = false;
  };

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    void run();
  });
  input.addEventListener('input', () => void run());
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      input.value = '';
      box.hidden = true;
    }
  });
  document.addEventListener('keydown', (ev) => {
    const el = document.activeElement;
    const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    if (ev.key === '/' && !typing) {
      ev.preventDefault();
      input.focus();
    }
  });
  document.addEventListener('click', (ev) => {
    if (!form.contains(ev.target as Node)) box.hidden = true;
  });
}
