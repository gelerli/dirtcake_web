import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SITE = "https://www.dirtcakestudio.com";
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const template = readFileSync("dist/index.html", "utf8")
  .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
  .replace(
    /<meta\s+(?:property|name)=["'](?:og:[^"']*|twitter:[^"']*|description)["'][^>]*>\s*/gi,
    "",
  )
  .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");

if (!template.includes("</head>"))
  throw new Error("postbuild-seo: no </head> in dist/index.html");

for (const file of readdirSync("src/portfolio").filter((f) =>
  f.endsWith(".seo.json"),
)) {
  const seo = JSON.parse(readFileSync(`src/portfolio/${file}`, "utf8"));
  const url = `${SITE}${seo.canonicalPath}`;
  const image = `${SITE}${seo.openGraphImage}`;

  const tags = `
    <title>${esc(seo.title)}</title>
    <meta name="description" content="${esc(seo.description)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Dirtcake Studio">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(seo.title)}">
    <meta property="og:description" content="${esc(seo.description)}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(seo.title)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(seo.title)}">
    <meta name="twitter:description" content="${esc(seo.description)}">
    <meta name="twitter:image" content="${image}">
  `;

  const dir = `dist${seo.canonicalPath}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    `${dir}/index.html`,
    template.replace("</head>", () => `${tags}</head>`),
  );
  console.log(`wrote ${dir}/index.html`);
}
