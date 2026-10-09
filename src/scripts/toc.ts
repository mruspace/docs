// Marks the section being read in "On this page".
export function initToc(): void {
  const list = document.querySelector<HTMLElement>('[data-toc]');
  if (!list) return;
  const links = [...list.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((el): el is HTMLElement => el !== null);
  if (!targets.length) return;
  const mark = (id: string) => {
    for (const a of links) a.classList.toggle('on', a.hash === `#${id}`);
  };
  const update = () => {
    // The last heading above a line 25% down the window is the current one.
    const line = window.innerHeight * 0.25;
    let current = targets[0]!;
    for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t;
    mark(current.id);
  };
  let raf = 0;
  window.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}
