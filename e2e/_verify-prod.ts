import { chromium } from "@playwright/test";
import { mkdir } from "fs/promises";
import { join } from "path";

const URL = process.env.PROD_URL || "https://chiave-website.vercel.app";
const OUT = join(process.cwd(), "e2e", "_audit-out");

(async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true, hasTouch: true,
  });
  const page = await ctx.newPage();

  console.log(`Loading ${URL} ...`);
  await page.goto(URL, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);

  // Check body computed transform
  const bodyTransform = await page.evaluate(() => getComputedStyle(document.body).transform);
  console.log(`body transform: ${bodyTransform}`);

  // Open hamburger
  const burger = page.locator('button[aria-label="Open menu"]');
  const bv = await burger.isVisible().catch(() => false);
  console.log(`burger visible: ${bv}`);
  if (!bv) { console.log("FAIL: burger not found"); await browser.close(); process.exit(1); }
  await burger.click();
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const overlay = document.querySelector('div.fixed.inset-0.z-40') as HTMLElement | null;
    if (!overlay) return { ok: false, err: "no overlay" };
    const r = overlay.getBoundingClientRect();
    const links = Array.from(overlay.querySelectorAll('a')).map((a) => {
      const ar = a.getBoundingClientRect();
      return {
        text: (a.textContent || "").trim(),
        y: Math.round(ar.y), x: Math.round(ar.x), w: Math.round(ar.width),
        inViewport: ar.y >= 0 && ar.y + ar.height <= window.innerHeight,
      };
    });
    return {
      overlayHeight: Math.round(r.height),
      viewportHeight: window.innerHeight,
      links,
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await page.screenshot({ path: join(OUT, "prod-menu-open.png") });

  const allInViewport = (data as any).links?.every((l: any) => l.inViewport);
  const overlayCorrect = (data as any).overlayHeight === (data as any).viewportHeight;

  console.log(`\n--- VERIFICATION ---`);
  console.log(`body transform = none: ${bodyTransform === "none"}`);
  console.log(`overlay matches viewport: ${overlayCorrect}`);
  console.log(`all 6 links in viewport: ${allInViewport}`);

  const ok = bodyTransform === "none" && overlayCorrect && allInViewport;
  console.log(ok ? "PASS" : "FAIL");

  await browser.close();
  process.exit(ok ? 0 : 2);
})();
