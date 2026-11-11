import manifestJson from "./image-manifest.json";

interface ManifestEntry {
  kind: "thumb" | "gallery";
  v: string;
  width: number;
  height: number;
  variants: number[];
}

const manifest = manifestJson as unknown as Record<string, ManifestEntry>;

// "cihangelerli/gallery/city-01.webp" -> "cihangelerli/gallery/city-01"
const keyFromSrc = (src: string) =>
  src.replace(/^\/+/, "").replace(/\.[^./]+$/, "");

function fileUrl(key: string, e: ManifestEntry, n: number) {
  const [slug, ...rest] = key.split("/");
  return `/${slug}/img/${rest.join("/")}.${e.v}-${n}${e.kind === "thumb" ? "w" : "h"}.webp`;
}

export function resolveImage(src: string) {
  const key = keyFromSrc(src);
  const e = manifest[key];
  if (!e) return null; // not generated yet: caller falls back to the raw src
  const srcSet = e.variants
    .map(
      (n, i) =>
        `${fileUrl(key, e, n)} ${e.kind === "thumb" ? `${n}w` : `${i + 1}x`}`,
    )
    .join(", ");
  return {
    src: fileUrl(key, e, e.variants[0]),
    srcSet,
    sizes: e.kind === "thumb" ? "240px" : undefined,
    width: e.width,
    height: e.height,
  };
}

const warmed = new Set<string>();

/** Warm the HTTP cache with the file the <img> will pick on this screen. */
export function prefetchImage(src: string) {
  const key = keyFromSrc(src);
  const e = manifest[key];
  if (!e) return;
  const n =
    window.devicePixelRatio > 1
      ? e.variants[e.variants.length - 1]
      : e.variants[0];
  const url = fileUrl(key, e, n);
  if (warmed.has(url)) return;
  warmed.add(url);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}
