/**
 * scripts/prerender.mjs
 *
 * Runs after `vite build` (see package.json: "build": "vite build && node scripts/prerender.mjs").
 *
 * For every route it writes a static copy of dist/index.html whose <head>
 * already contains that page's title, description, canonical, Open Graph /
 * Twitter tags and JSON-LD. The app still renders client-side as before, but
 * crawlers and link-preview scrapers (WhatsApp, Slack, iMessage, Facebook…)
 * that don't run JavaScript now see the right metadata.
 *
 * It also generates dist/sitemap.xml, dist/llms.txt and dist/404.html from
 * src/constants.ts, so adding a toy there updates everything automatically.
 * (Note: sitemap.xml and llms.txt are build artifacts and exist only in dist/,
 * not in public/).
 *
 * Requires Node >= 22.18 (runs the .ts source files directly).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

let seo, site, constants;
try {
  seo = await import(pathToFileURL(resolve(root, "src/seo.ts")).href);
  site = await import(pathToFileURL(resolve(root, "src/site.ts")).href);
  constants = await import(pathToFileURL(resolve(root, "src/constants.ts")).href);
} catch (err) {
  console.error(
    "\n[prerender] Could not load the TypeScript sources. Node >= 22.18 is required " +
      `(you have ${process.version}).\n`,
  );
  throw err;
}
const { allRoutes, metaToTags, PAGE_META, llmsLine } = seo;
const { SITE_URL, SOCIAL_URLS, SHOPIER_URL } = site;
const { TOYS } = constants;

const START = "<!--seo:start-->";
const END = "<!--seo:end-->";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Serialises a page's head tags. `data-rh` lets react-helmet-async replace them on the client. */
export function renderHead(meta) {
  const lines = [`<title>${esc(meta.title)}</title>`];
  for (const t of metaToTags(meta)) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(" ");
    lines.push(
      t.tag === "script"
        ? `<script data-rh="true" ${attrs}>${t.text}</script>`
        : `<${t.tag} data-rh="true" ${attrs} />`,
    );
  }
  return lines.join("\n    ");
}

const injectHead = (template, meta) => {
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  if (!re.test(template)) {
    throw new Error(`[prerender] ${START} … ${END} markers not found in index.html`);
  }
  return template.replace(re, () => `${START}\n    ${renderHead(meta)}\n    ${END}`);
};

const xml = (s) => esc(s).replace(/'/g, "&apos;");

function buildSitemap(routes) {
  const urls = routes
    .map((r) => {
      const loc = r.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
      const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : "";
      const images = (r.images ?? [])
        .map((u) => `\n    <image:image>\n      <image:loc>${xml(u)}</image:loc>\n    </image:image>`)
        .join("");
      return `  <url>\n    <loc>${loc}</loc>${lastmod}${images}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

function buildLlms(routes) {
  const toyBySlug = new Map(TOYS.map((t) => [t.slug, t]));
  const page = (path) => routes.find((r) => r.path === path);
  const link = (r, label, desc) => `- [${label}](${SITE_URL}${r.path}): ${desc}`;
  const projects = routes
    .filter((r) => r.kind === "project" && r.inLlms)
    .map((r) => link(r, r.llmsLabel, llmsLine(toyBySlug.get(r.path.split("/").pop()))));
  return `# Dirtcake Studio

> A tech-forward and DIY focused independent creative studio exploring art, design, interactive experiences, technology and making urban artifacts.

## About

${link(page("/about"), "About", "Who we are: an Istanbul studio founded in 2023 by Tuğba Girgiç and Cihan Gelerli.")}

## Projects

${link(page("/gallery"), "Gallery", "All collections: designer toys, action figures, sticker packs and commissions.")}
${projects.join("\n")}

## Contact

${link(page("/contact"), "Contact", "Collaborations, commissions and questions about where to get a piece.")}

## Free resources

${link(page("/freebies"), "Free Resources", "Free editable vector game assets for personal and commercial use.")}

## Shop

- [Shopier Store](${SHOPIER_URL}): Online store.

## Social

- [Instagram](${SOCIAL_URLS.instagram})
`;
}

async function main() {
  const dist = resolve(root, "dist");
  const template = await readFile(resolve(dist, "index.html"), "utf8");
  const routes = allRoutes();

  for (const r of routes) {
    const out =
      r.path === "/" ? resolve(dist, "index.html") : resolve(dist, `.${r.path}`, "index.html");
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, injectHead(template, r));
  }

  // Unknown URLs: the SPA's NotFound page, marked noindex.
  await writeFile(resolve(dist, "404.html"), injectHead(template, PAGE_META.notFound));
  await writeFile(resolve(dist, "sitemap.xml"), buildSitemap(routes));
  await writeFile(resolve(dist, "llms.txt"), buildLlms(routes));

  console.log(`[prerender] ${routes.length} routes + 404.html, sitemap.xml, llms.txt written to dist/`);
}

// Only run when executed directly (so renderHead can be imported).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}

export { buildSitemap, buildLlms };
