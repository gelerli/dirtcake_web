import sharp from "sharp";
import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const SRC_ROOT = "art-src";
const MANIFEST = "src/portfolio/image-manifest.json";

const THUMB_WIDTHS = [240, 480, 720]; // last = your master size (4:3)
const GALLERY_HEIGHTS = [480, 960]; // last = your master size
const LOSSY_QUALITY = 80; // only for the smaller generated sizes
const WARN_KB = { thumb: 60, gallery: 400 };

const manifest = {};
const problems = [];

// A lossless WebP has a "VP8L" chunk near the start of the file.
const isLossless = (buf) => buf.subarray(0, 64).includes("VP8L");

const slugs = readdirSync(SRC_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of slugs) {
  const outRoot = path.join("public", slug, "img");
  rmSync(outRoot, { recursive: true, force: true });

  for (const [folder, kind] of [
    ["thumbnails", "thumb"],
    ["gallery", "gallery"],
  ]) {
    const dir = path.join(SRC_ROOT, slug, folder);
    if (!existsSync(dir)) continue;
    mkdirSync(path.join(outRoot, folder), { recursive: true });

    for (const file of readdirSync(dir)) {
      const input = path.join(dir, file);
      const { name, ext } = path.parse(file);
      if (ext.toLowerCase() !== ".webp") {
        problems.push(`${input}: not a .webp file`);
        continue;
      }

      const buf = readFileSync(input);
      const { width: W, height: H } = await sharp(buf).metadata();
      const isThumb = kind === "thumb";
      const sizes = isThumb ? THUMB_WIDTHS : GALLERY_HEIGHTS;
      const masterSize = isThumb ? W : H;
      const max = sizes[sizes.length - 1];

      if (isThumb && Math.abs(W / H - 4 / 3) > 0.01) {
        problems.push(`${input}: thumbnails must be 4:3 (found ${W}x${H})`);
        continue;
      }
      if (masterSize > max) {
        problems.push(
          `${input}: ${isThumb ? "width" : "height"} must be at most ${max}px (found ${masterSize})`,
        );
        continue;
      }

      const variants = [
        ...new Set([...sizes.filter((s) => s < masterSize), masterSize]),
      ];
      const v = createHash("sha1").update(buf).digest("hex").slice(0, 8);
      const lossless = isLossless(buf);
      const suffix = isThumb ? "w" : "h";

      for (const n of variants) {
        const out = path.join(
          outRoot,
          folder,
          `${name}.${v}-${n}${suffix}.webp`,
        );
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
      console.log(
        `${slug}/${folder}/${name}: ${variants.join(", ")}${lossless ? " (lossless)" : ""}, master ${kb} KB${kb > WARN_KB[kind] ? "  <-- heavy" : ""}`,
      );
    }
  }
}

if (problems.length) {
  console.error(
    "\nFix these files and run again:\n" +
      problems.map((p) => "  - " + p).join("\n"),
  );
  process.exit(1);
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
