import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SITE = "https://www.dirtcakestudio.com";
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const START = "<!--seo:start-->";
const END = "<!--seo:end-->";
const seoRegex = new RegExp(`${START}[\\s\\S]*?${END}`);

const rawHtml = readFileSync("dist/index.html", "utf8");

if (!seoRegex.test(rawHtml)) {
  throw new Error(
    "postbuild-seo: <!--seo:start--> ... <!--seo:end--> markers not found in dist/index.html",
  );
}

for (const file of readdirSync("src/portfolio").filter((f) =>
  f.endsWith(".seo.json"),
)) {
  const seo = JSON.parse(readFileSync(`src/portfolio/${file}`, "utf8"));
  const url = `${SITE}${seo.canonicalPath}`;
  const image = `${SITE}${seo.openGraphImage}`;
  const imageType =
    seo.openGraphImage.endsWith(".jpg") || seo.openGraphImage.endsWith(".jpeg")
      ? "image/jpeg"
      : seo.openGraphImage.endsWith(".png")
        ? "image/png"
        : "image/jpeg";

  const tags = `${START}
    <title>${esc(seo.title)}</title>
    <meta name="description" content="${esc(seo.description)}">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Dirtcake Studio">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(seo.title)}">
    <meta property="og:description" content="${esc(seo.description)}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:type" content="${imageType}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(seo.title)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(seo.title)}">
    <meta name="twitter:description" content="${esc(seo.description)}">
    <meta name="twitter:image" content="${image}">
    ${END}`;

  const dir = `dist${seo.canonicalPath}`;
  mkdirSync(dir, { recursive: true });
  const output = rawHtml.replace(seoRegex, () => tags);
  writeFileSync(`${dir}/index.html`, output);
  console.log(`wrote ${dir}/index.html`);
}
