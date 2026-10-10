<p align="center">
  <a href="https://docs.mru.space">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://mru.space/assets/readme/mru-github-dark.gif">
      <img src="https://mru.space/assets/readme/mru-github-light.gif" alt="Mru" width="120" height="120">
    </picture>
  </a>
</p>

# docs.mru.space

Documentation for Mru's open core: the shrinking-quorum runtime
([mruspace/flight](https://github.com/mruspace/flight)), the Dusk simulator
([mruspace/dusk](https://github.com/mruspace/dusk)) and Mru 2049
([mruspace/2049](https://github.com/mruspace/2049)).

Questions: [Get in touch](https://mru.space/contact/) or
[contact@mru.space](mailto:contact@mru.space).

## Build

Needs Node 22.12 or later.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run build      # static site in dist/, then the Pagefind search index
npm run check      # every check CI runs
```

The site is static HTML built with [Astro](https://astro.build). Search is
[Pagefind](https://pagefind.app), built into `dist/pagefind/` after the
site. Without JavaScript, the search field submits a site search to
DuckDuckGo instead.

## Layout

```
src/pages/          one file per page; routes follow the folders
src/components/     top bar, navigation, "On this page", page ending
src/data/           navigation order, page metadata (titles, descriptions)
src/styles/docs.css rules that only the docs need
src/styles/shared/  copied from mruspace/website; never edit here
scripts/            sync-tokens.mjs and the checks
public/             fonts (copied), favicons, CNAME
```

## Shared design system

`mruspace/website` is the only source of the stylesheet, fonts and shared
components. Copy them with:

```sh
npm run sync-tokens            # from ../website if checked out, else GitHub
```

CI runs `node scripts/sync-tokens.mjs --check` against the website's `main`
branch and fails if any copy differs.

## Writing docs

When the docs and the code disagree, the code is right. Each page names its
source file at the end. Keep sentences short, give every number its source
and scope, and state limits next to the claim.

## Deployment

Merges to `main` publish to `docs.mru.space` with GitHub Pages, by the
workflow in `.github/workflows/`. `public/CNAME` pins the domain.

## License

- Code: [Apache License 2.0](./LICENSE).
- Documentation text: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Fonts in `public/fonts/`: SIL Open Font License 1.1 (licence files alongside).
- The **Mru** name and logo are trademarks of Binns Pte. Ltd. and are not
  covered by these licences. See [TRADEMARK.md](./TRADEMARK.md).

© Binns Pte. Ltd.
