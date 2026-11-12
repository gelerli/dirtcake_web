// scripts/build-images.mjs
// Makes the smaller image sizes from art-src and writes src/portfolio/image-manifest.json.
// SAFE: everything is checked first and built in a temporary folder.
// If anything is wrong, NOTHING in public/ or the manifest is changed.

import sharp from "sharp";
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const SRC_ROOT = "art-src";
const TMP_ROOT = ".images-tmp";
const MANIFEST = "src/portfolio/image-manifest.json";

const THUMB_WIDTHS = [240, 480, 720]; // last = your master size (4:3)
const GALLERY_HEIGHTS = [480, 960]; // last = your master size
const LOSSY_QUALITY = 80; // only for the smaller generated sizes
const WARN_KB = { thumb: 400, gallery: 900 };
const FOLDERS = [
  ["thumbnails", "thumb"],
  ["gallery", "gallery"],
];

const IGNORED = new Set(["Thumbs.db", "desktop.ini"]);
const SAFE_NAME = /^[A-Za-z0-9._-]+$/;

const isHidden = (name) => name.startsWith(".") || IGNORED.has(name); // .DS_Store etc.
const isLossless = (buf) => buf.subarray(0, 64).includes("VP8L");

const problems = [];
const warnings = [];
const jobs = [];

function stop(message) {
  console.error(message);
  console.error(
    "\nNOTHING WAS CHANGED. Your previous images and manifest are untouched.",
  );
  process.exit(1);
}

// ---------- 1. Scan art-src ----------
if (!existsSync(SRC_ROOT)) {
  stop(
    `The "${SRC_ROOT}" folder was not found (it must be at the project root).`,
  );
}

const slugs = readdirSync(SRC_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !isHidden(d.name))
  .map((d) => d.name);

for (const slug of slugs) {
  if (!SAFE_NAME.test(slug)) {
    problems.push(
      `${SRC_ROOT}/${slug}: folder name may only use letters, numbers, dots, hyphens and underscores`,
    );
    continue;
  }
  const slugDir = path.join(SRC_ROOT, slug);

  for (const entry of readdirSync(slugDir, { withFileTypes: true })) {
    if (isHidden(entry.name)) continue;
    if (!FOLDERS.some(([folder]) => folder === entry.name)) {
      warnings.push(
        `${slugDir}/${entry.name}: ignored (only "thumbnails" and "gallery" are used)`,
      );
    }
  }

  for (const [folder, kind] of FOLDERS) {
    const dir = path.join(slugDir, folder);
    if (!existsSync(dir)) continue;

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (isHidden(entry.name)) continue;
      const input = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        problems.push(`${input}: folders inside "${folder}" are not supported`);
        continue;
      }
      const { name, ext } = path.parse(entry.name);
      if (ext.toLowerCase() !== ".webp") {
        problems.push(`${input}: not a .webp file`);
        continue;
      }
      if (!SAFE_NAME.test(entry.name)) {
        problems.push(
          `${input}: file name may only use letters, numbers, dots, hyphens and underscores (no spaces or special characters)`,
        );
        continue;
      }
      jobs.push({ slug, folder, kind, name, input });
    }
  }
}

// ---------- 2. Check every image BEFORE writing anything ----------
for (const job of jobs) {
  const isThumb = job.kind === "thumb";
  const sizes = isThumb ? THUMB_WIDTHS : GALLERY_HEIGHTS;
  const max = sizes[sizes.length - 1];

  try {
    job.buf = readFileSync(job.input);
    const meta = await sharp(job.buf).metadata();
    job.W = meta.width;
    job.H = meta.height;
  } catch {
    problems.push(
      `${job.input}: cannot be read as an image (the file may be damaged)`,
    );
    continue;
  }
  if (!job.W || !job.H) {
    problems.push(
      `${job.input}: cannot be read as an image (the file may be damaged)`,
    );
    continue;
  }

  job.sizes = sizes;
  job.masterSize = isThumb ? job.W : job.H;

  if (isThumb && Math.abs(job.W / job.H - 4 / 3) > 0.01) {
    problems.push(
      `${job.input}: thumbnails must be 4:3 (found ${job.W}x${job.H}); export at ${max}x${(max * 3) / 4}`,
    );
  } else if (job.masterSize > max) {
    problems.push(
      `${job.input}: ${isThumb ? "width" : "height"} must be at most ${max}px (found ${job.masterSize}px)`,
    );
  } else if (job.masterSize < max) {
    warnings.push(
      `${job.input}: ${job.masterSize}px is smaller than the recommended ${max}px ${isThumb ? "wide" : "tall"}; it will look soft on high-resolution screens`,
    );
  }
}

if (jobs.length === 0 && problems.length === 0) {
  problems.push(
    `No images found in ${SRC_ROOT}/<page>/thumbnails or ${SRC_ROOT}/<page>/gallery`,
  );
}

if (problems.length) {
  stop(
    "\nFix these files and run again:\n" +
      problems.map((p) => `  - ${p}`).join("\n"),
  );
}

// ---------- 3. Build everything in a temporary folder ----------
rmSync(TMP_ROOT, { recursive: true, force: true });

const manifest = {};
const lines = [];

try {
  for (const job of jobs) {
    const { slug, folder, kind, name, input, buf, W, H, masterSize, sizes } =
      job;
    const isThumb = kind === "thumb";
    const outDir = path.join(TMP_ROOT, slug, "img", folder);
    mkdirSync(outDir, { recursive: true });

    const variants = [
      ...new Set([...sizes.filter((s) => s < masterSize), masterSize]),
    ];
    const v = createHash("sha1").update(buf).digest("hex").slice(0, 8);
    const lossless = isLossless(buf);
    const suffix = isThumb ? "w" : "h";

    for (const n of variants) {
      const out = path.join(outDir, `${name}.${v}-${n}${suffix}.webp`);
      if (n === masterSize) {
        copyFileSync(input, out); // your file, untouched
      } else {
        await sharp(buf)
          .resize(isThumb ? { width: n } : { height: n })
          .webp(lossless ? { lossless: true } : { quality: LOSSY_QUALITY })
          .toFile(out);
      }
    }

    const first = variants[0];
    manifest[`${slug}/${folder}/${name}`] = {
      kind,
      v,
      variants,
      width: isThumb ? first : Math.round((first * W) / H),
      height: isThumb ? Math.round((first * H) / W) : first,
    };

    const kb = Math.round(buf.length / 1024);
    lines.push(
      `${slug}/${folder}/${name}: ${variants.join(", ")}${lossless ? " (lossless)" : ""}, master ${kb} KB${kb > WARN_KB[kind] ? "  <-- heavy" : ""}`,
    );
  }
} catch (error) {
  rmSync(TMP_ROOT, { recursive: true, force: true });
  stop(`\nSomething went wrong while making the images:\n  ${error.message}`);
}

// ---------- 4. Everything worked: swap it in, manifest last ----------
for (const slug of slugs) {
  const from = path.join(TMP_ROOT, slug, "img");
  const to = path.join("public", slug, "img");
  rmSync(to, { recursive: true, force: true });
  if (existsSync(from)) {
    mkdirSync(path.dirname(to), { recursive: true });
    renameSync(from, to);
  }
}
writeFileSync(`${MANIFEST}.tmp`, JSON.stringify(manifest, null, 2));
renameSync(`${MANIFEST}.tmp`, MANIFEST);
rmSync(TMP_ROOT, { recursive: true, force: true });

lines.forEach((line) => console.log(line));
warnings.forEach((w) => console.warn(`warning: ${w}`));

const thumbs = jobs.filter((j) => j.kind === "thumb").length;
const pages = new Set(jobs.map((j) => j.slug)).size;
console.log(
  `\nDone: ${jobs.length} images (${thumbs} thumbnails, ${jobs.length - thumbs} gallery) in ${pages} page(s). Manifest updated.`,
);

// ---------- 5. Check portfolio data files for missing images / typos ----------
const PORTFOLIO_DIR = "src/portfolio";
if (existsSync(PORTFOLIO_DIR)) {
  const tsFiles = readdirSync(PORTFOLIO_DIR).filter(
    (f) => f.endsWith(".ts") && f !== "types.ts" && f !== "images.ts",
  );

  const missingImageWarnings = [];
  const keyFromSrc = (src) => src.replace(/^\/+/, "").replace(/\.[^./]+$/, "");

  for (const tsFile of tsFiles) {
    const fullPath = path.join(PORTFOLIO_DIR, tsFile);
    const content = readFileSync(fullPath, "utf8");
    const contentLines = content.split("\n");

    contentLines.forEach((line, idx) => {
      const match = line.match(/src:\s*["']([^"']+)["']/);
      if (match) {
        const src = match[1];
        const key = keyFromSrc(src);
        if (!manifest[key]) {
          const rawPub = path.join("public", src.replace(/^\/+/, ""));
          if (!existsSync(rawPub)) {
            missingImageWarnings.push({
              file: fullPath,
              line: idx + 1,
              src,
            });
          }
        }
      }
    });
  }

  if (missingImageWarnings.length > 0) {
    console.warn(
      "\n⚠️  WARNING: Found image references in portfolio files that don't exist:",
    );
    missingImageWarnings.forEach(({ file, line, src }) => {
      console.warn(`   - ${file}:${line} -> "${src}" (typo or not in art-src)`);
    });
    console.warn(
      "   Please check the spelling in your data file or add the image to art-src.\n",
    );
  }
}
