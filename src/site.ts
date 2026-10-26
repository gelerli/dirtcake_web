/**
 * src/site.ts
 * Single source of truth for site-wide constants. Pure TS (no React) so the
 * build-time prerender script can import it too.
 */
export const SITE_URL = "https://www.dirtcakestudio.com";
export const SITE_NAME = "Dirtcake Studio";
export const EMAIL = "dirtcakestudio@gmail.com";
export const SHOPIER_URL = "https://www.shopier.com/dirtcakestudio";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-share-cover.png`;
/** Used in Organization JSON-LD. TODO: point at a real square logo (PNG, >= 112x112) when you have one. */
export const LOGO_URL = DEFAULT_OG_IMAGE;

export const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/dirtcakestudio/",
  x: "https://x.com/dirtcakestudio",
  youtube: "https://youtube.com/@dirtcakestudio",
  bluesky: "https://bsky.app/profile/dirtcakestudio.bsky.social",
  behance: "https://www.behance.net/dirtcakestudio",
} as const;

/** Profiles declared to search engines (includes Pinterest, which has no icon in the UI). */
export const SAME_AS = [
  ...Object.values(SOCIAL_URLS),
  "https://tr.pinterest.com/dirtcakestudio/",
];
