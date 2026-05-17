import { chromium } from "@playwright/test";
import { mkdir } from "fs/promises";
import { join } from "path";

const BASE = "http://localhost:3001";
const OUT = join(process.cwd(), "e2e", "_audit-out");

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 740, isMobile: true },
  { name: "mobile-iphone14", width: 390, height: 844, isMobile: true },
  { name: "tablet-768", width: 768, height: 1024, isMobile: false },
  { name: "desktop-1280", width: 1280, height: 800, isMobile: false },
  { name: "desktop-1920", width: 1920, height: 1080, isMobile: false },
];

const ROUTES = ["/", "/studio", "/shop", "/arthaus", "/playground", "/contact"];

type Finding = { route: string; viewport: string; kind: string; detail: string };
const findings: Finding[] = [];

function log(...a: unknown[]) {
  console.log(...a);
}

async function checkOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const docW = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    const winW = window.innerWidth;
    const offenders: { tag: string; cls: string; w: number; right: number }[] = [];
    if (docW > winW + 1) {
      for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
        const r = el.getBoundingClientRect();
        if (r.right > winW + 1 && r.width > 0 && r.width < winW * 2) {
          offenders.push({
            tag: el.tagName,
            cls: typeof el.className === "string" ? el.className.slice(0, 60) : "",
            w: Math.round(r.width),
            right: Math.round(r.right),
          });
          if (offenders.length >= 5) break;
        }
      }
    }
    return { docW, winW, offenders };
  });
}

(async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    log(`\n--- viewport ${vp.name} (${vp.width}x${vp.height}) ---`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const route of ROUTES) {
      try {
        await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
        await page.waitForLoadState("load", { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(300);
      } catch (e) {
        findings.push({ route, viewport: vp.name, kind: "nav-error", detail: String(e).slice(0, 200) });
        log(`  ${route}: NAV ERROR`);
        continue;
      }

      const o = await checkOverflow(page);
      if (o.docW > o.winW + 1) {
        findings.push({
          route,
          viewport: vp.name,
          kind: "horizontal-overflow",
          detail: `docW=${o.docW} > winW=${o.winW}; offenders=${JSON.stringify(o.offenders)}`,
        });
        log(`  ${route}: OVERFLOW docW=${o.docW} winW=${o.winW}`);
      } else {
        log(`  ${route}: ok`);
      }

      await page.screenshot({
        path: join(OUT, `${vp.name}__${route.replace(/\W+/g, "_") || "root"}.png`),
        fullPage: false,
      });
    }

    if (vp.isMobile) {
      log(`  testing hamburger menu...`);
      await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForLoadState("load", { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(500);

      const burger = page.locator('button[aria-label="Open menu"]');
      const burgerVisible = await burger.isVisible().catch(() => false);
      if (!burgerVisible) {
        findings.push({ route: "/", viewport: vp.name, kind: "hamburger-not-visible", detail: "burger button missing" });
        log(`    burger not visible`);
      } else {
        await burger.click();
        await page.waitForTimeout(800);

        const closeBtn = page.locator('button[aria-label="Close menu"]');
        const opened = await closeBtn.isVisible().catch(() => false);
        if (!opened) {
          findings.push({ route: "/", viewport: vp.name, kind: "hamburger-no-toggle", detail: "aria-label didn't flip to Close menu" });
          log(`    aria did not flip`);
        }

        const overlay = page.locator('div.fixed.inset-0.z-40');
        const overlayOpacity = await overlay.evaluate((el) => getComputedStyle(el).opacity).catch(() => "0");
        if (parseFloat(overlayOpacity) < 0.9) {
          findings.push({ route: "/", viewport: vp.name, kind: "overlay-not-visible", detail: `overlay opacity=${overlayOpacity}` });
          log(`    overlay opacity=${overlayOpacity}`);
        }

        for (const lbl of ["Home", "Studio", "Shop", "Arthaus", "Playground", "Contact"]) {
          const link = overlay.locator(`a:has-text("${lbl}")`).first();
          const vis = await link.isVisible().catch(() => false);
          if (!vis) {
            findings.push({ route: "/", viewport: vp.name, kind: "menu-link-missing", detail: `"${lbl}" not visible in overlay` });
            log(`    menu link missing: ${lbl}`);
          }
        }

        const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
        if (bodyOverflow !== "hidden") {
          findings.push({ route: "/", viewport: vp.name, kind: "scroll-not-locked", detail: `body.style.overflow=${JSON.stringify(bodyOverflow)}` });
          log(`    scroll not locked: ${bodyOverflow}`);
        }

        await page.screenshot({ path: join(OUT, `${vp.name}__menu-open.png`), fullPage: false });

        await closeBtn.click().catch(() => {});
        await page.waitForTimeout(700);
        const stillOpen = await page.locator('button[aria-label="Close menu"]').isVisible().catch(() => false);
        if (stillOpen) {
          findings.push({ route: "/", viewport: vp.name, kind: "hamburger-no-close", detail: "menu stayed open after close click" });
          log(`    menu did not close`);
        }
      }
    }

    await ctx.close();
  }

  await browser.close();

  log(`\n===== AUDIT RESULTS =====`);
  log(`Findings: ${findings.length}`);
  for (const f of findings) log(`- [${f.viewport}] ${f.route} :: ${f.kind} :: ${f.detail}`);
})();
