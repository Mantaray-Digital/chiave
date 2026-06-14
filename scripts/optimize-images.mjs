// Downsize + recompress oversized source images under public/images so the
// Next.js on-demand image optimizer (sharp) fits in a 512 MB server budget.
//
// Why this exists: Render runs `next start` with ~0.5 GB RAM. Sharp decodes the
// FULL source image (W x H x 4 bytes) per request; a 6000x4000 JPG decodes to
// ~92 MB, which OOM-kills the server under cold-cache bursts. Capping the long
// edge at 2048 px drops that to ~11 MB.
//
// Safety rules:
//   - Recompress IN PLACE, preserving filename AND extension. Image paths are
//     hardcoded string literals in src/lib/*.ts, so the extension must not change.
//   - `.rotate()` bakes EXIF orientation into pixels BEFORE metadata is stripped,
//     so the 12 phone photos with orientation=8 don't render sideways.
//   - Only overwrite when the result is actually smaller (never grow / re-degrade).
//   - Skip animated images (pages > 1).
//
// Usage:
//   node scripts/optimize-images.mjs            # apply in place
//   node scripts/optimize-images.mjs --dry      # report only, write nothing
//   node scripts/optimize-images.mjs --sample <outDir>  # write a few samples to inspect

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// Windows: libvips mmaps + caches input file handles, which locks files and
// exhausts handles across hundreds of in-place rewrites ("UNKNOWN: open" errors).
// Disable the cache and feed sharp an in-memory Buffer so it never holds a path.
sharp.cache(false);

const ROOT = "public/images";
const MAX_EDGE = 2048; // long-edge cap (px)
const JPEG_Q = 80;
const PNG_Q = 80; // palette quantization quality for PNGs
const MIN_PROCESS_BYTES = 350 * 1024; // skip already-small files unless they're over-sized

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const sampleIdx = args.indexOf("--sample");
const SAMPLE_DIR = sampleIdx !== -1 ? args[sampleIdx + 1] : null;

// Representative worst-case offenders to eyeball before a full run.
const SAMPLES = [
  "public/images/doors/art-pieces/david-head-collection/2024-07-28-17-58-IMG-8123.jpg", // 6000x4000, orient=8
  "public/images/doors/visual-arts/square-canvas.jpg", // 5000x5000
  "public/images/doors/visual-arts/1-MOCKUP.png", // 39 MB, 3000x3000
  "public/images/doors/sculptures/CH-S38/Gemini-Generated-Image-d3dnj0d3dnj0d3dn.png", // AI art PNG
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function encode(file) {
  const ext = path.extname(file).toLowerCase();
  const input = fs.readFileSync(file); // read into memory; never hand sharp the path
  const size = input.length;
  const meta = await sharp(input).metadata();
  if ((meta.pages || 1) > 1) return null; // animated — leave alone

  const longEdge = Math.max(meta.width, meta.height);
  const needsResize = longEdge > MAX_EDGE;
  if (!needsResize && size <= MIN_PROCESS_BYTES) return null; // already lean

  let pipe = sharp(input).rotate(); // bake EXIF orientation
  if (needsResize) {
    pipe = pipe.resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true });
  }
  if (ext === ".png") {
    pipe = pipe.png({ quality: PNG_Q, palette: true, effort: 7, compressionLevel: 9 });
  } else {
    pipe = pipe.jpeg({ quality: JPEG_Q, mozjpeg: true });
  }
  const buf = await pipe.toBuffer();
  return { buf, before: size, after: buf.length, resized: needsResize };
}

async function sample() {
  fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  for (const f of SAMPLES) {
    const r = await encode(f);
    if (!r) { console.log("skip", f); continue; }
    const out = path.join(SAMPLE_DIR, path.basename(f));
    fs.writeFileSync(out, r.buf);
    console.log(`${(r.before / 1048576).toFixed(1)}MB -> ${(r.after / 1048576).toFixed(2)}MB  ${out}`);
  }
}

async function run() {
  const files = walk(ROOT);
  let processed = 0, skipped = 0, errors = 0, before = 0, after = 0, biggestAfter = 0;
  for (const f of files) {
    try {
      const r = await encode(f);
      if (!r || r.after >= r.before) { skipped++; continue; }
      before += r.before;
      after += r.after;
      biggestAfter = Math.max(biggestAfter, r.after);
      if (!DRY) {
        const tmp = f + ".opt-tmp";
        fs.writeFileSync(tmp, r.buf);
        fs.renameSync(tmp, f); // atomic replace
      }
      processed++;
      if (processed % 50 === 0) console.log(`  ...${processed} processed`);
    } catch (e) {
      errors++;
      console.log("ERR", f, e.message);
    }
  }
  const total = files.reduce((a, f) => a + fs.statSync(f).size, 0); // post-write if applied
  console.log("\n" + (DRY ? "[DRY RUN] " : "") + "done");
  console.log(`files scanned:   ${files.length}`);
  console.log(`reprocessed:     ${processed}`);
  console.log(`skipped (lean):  ${skipped}`);
  console.log(`errors:          ${errors}`);
  console.log(`reprocessed set: ${(before / 1048576).toFixed(0)} MB -> ${(after / 1048576).toFixed(0)} MB`);
  console.log(`largest output:  ${(biggestAfter / 1048576).toFixed(2)} MB`);
  console.log(`public/images total now: ${(total / 1048576).toFixed(0)} MB`);
}

if (SAMPLE_DIR) await sample();
else await run();
