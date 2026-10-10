// Every docs page at four widths in both themes, axe-core, and search.
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { offline, ROUTES, THEMES, WIDTHS } from './helpers';

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    test.describe(`${width}px ${theme}`, () => {
      test.use({ viewport: { width, height: 900 }, colorScheme: theme });
      for (const route of ROUTES) {
        test(`${route}: no overflow, one h1, alt on every image`, async ({ page }) => {
          await offline(page);
          await page.goto(route);
          const r = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth - window.innerWidth,
            h1: document.querySelectorAll('h1').length,
            noAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).map((i) => i.src),
          }));
          expect(r.overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);
          expect(r.h1, 'h1 elements').toBe(1);
          expect(r.noAlt, 'images without alt').toEqual([]);
        });
      }
    });
  }
}

test.describe('axe-core, WCAG 2.2 AA', () => {
  for (const theme of THEMES) {
    for (const width of [390, 1440]) {
      test.describe(`${width}px ${theme}`, () => {
        test.use({ viewport: { width, height: 900 }, colorScheme: theme });
        for (const route of ROUTES) {
          test(`${route}: no serious or critical violations`, async ({ page }) => {
            await offline(page);
            await page.goto(route);
            const res = await new AxeBuilder({ page })
              .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
              .analyze();
            const bad = res.violations
              .filter((v) => v.impact === 'serious' || v.impact === 'critical')
              .map(
                (v) =>
                  `${v.id} (${v.impact}): ${v.nodes
                    .map((n) => n.target.join(' '))
                    .slice(0, 3)
                    .join(' | ')}`,
              );
            expect(bad).toEqual([]);
          });
        }
      });
    }
  }
});

test.describe('interactive', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('search finds pages and closes with Escape', async ({ page }) => {
    await offline(page);
    await page.goto('/concepts/shrinking-quorum/');
    await page.keyboard.press('/');
    await page.keyboard.type('known-answer');
    await expect(page.locator('.search-results .search-title').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.search-results')).toBeHidden();
  });

  test('On this page follows the section being read', async ({ page }) => {
    await offline(page);
    await page.goto('/core/quorum-cli/');
    await expect(page.locator('[data-toc] a.on')).toHaveText('Synopsis');
    await page.evaluate(() => document.getElementById('opssat')!.scrollIntoView());
    await expect(page.locator('[data-toc] a.on')).not.toHaveText('Synopsis');
  });

  test('the phone menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await offline(page);
    await page.goto('/core/quorum-crate/');
    await page.click('.docs-top .menu-toggle summary');
    await expect(page.locator('.docs-top .menu-toggle .navlist a').first()).toBeVisible();
  });

  test('without JS, search falls back to a site search form', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('[data-search]')).toHaveAttribute('action', 'https://duckduckgo.com/');
    await ctx.close();
  });

  test('stable files resolve', async ({ request }) => {
    for (const u of [
      '/llms.txt',
      '/llms-full.txt',
      '/robots.txt',
      '/sitemap.xml',
      '/CNAME',
      '/index.md',
      '/pagefind/pagefind.js',
    ])
      expect((await request.get(u)).status(), u).toBe(200);
  });
});
