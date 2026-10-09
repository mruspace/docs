// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://docs.mru.space',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { smartypants: false },
  devToolbar: { enabled: false },
});
