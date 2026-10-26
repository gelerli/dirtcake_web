/**
 * src/seo.ts
 * Single source of truth for page metadata. Used by:
 *  - <Seo /> (client-side, via react-helmet-async)
 *  - scripts/prerender.mjs (build time: static per-route HTML, sitemap, llms.txt)
 * Pure TS with explicit .ts import so Node can load it directly.
 */
import { TOYS, type Toy } from "./constants.ts";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  LOGO_URL,
  SAME_AS,
  EMAIL,
} from "./site.ts";

export interface RouteMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export interface RouteEntry extends RouteMeta {
  kind: "page" | "project";
  lastmod?: string;
  /** Extra absolute image URLs for the sitemap. */
  images?: string[];
  /** Listed in llms.txt? (Freebies is intentionally unlinked.) */
  inLlms: boolean;
  llmsLabel?: string;
}

export interface HeadTag {
  tag: "meta" | "link" | "script";
  attrs: Record<string, string>;
  text?: string;
}

export const routeUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

export const toyName = (t: Pick<Toy, "title" | "subtitle">) =>
  [t.title, t.subtitle].map((s) => s.trim()).filter(Boolean).join(" ");

/** Trims to a word boundary so descriptions never end mid-word. */
export function truncate(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return (
    (space > 80 ? cut.slice(0, space) : cut).replace(/[\s,.;:\u2013\u2014-]+$/, "") +
    "\u2026"
  );
}

const ORG_ID = `${SITE_URL}/#organization`;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  email: EMAIL,
  foundingDate: "2023",
  founder: [
    { "@type": "Person", name: "Tuğba Girgiç" },
    { "@type": "Person", name: "Cihan Gelerli" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Istanbul",
    addressCountry: "TR",
  },
  sameAs: SAME_AS,
  description:
    "DIY-focused and tech-forward creative studio based in Istanbul producing limited-edition designer toys, stickers, and other visual artifacts.",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": ORG_ID },
};

export const PAGE_META = {
  home: {
    title: "Dirtcake Studio | Istanbul - Designer Toys & Collectibles",
    description:
      "Istanbul-based creative studio specializing in limited edition designer toys, stickers and other physical collectibles.",
    path: "/",
    jsonLd: [organizationLd, websiteLd],
  },
  gallery: {
    title: "Gallery | Dirtcake Studio",
    description:
      "Explore the collection of custom designer toys and resin figures by Dirtcake Studio.",
    path: "/gallery",
  },
  about: {
    title: "About | Dirtcake Studio",
    description:
      "Learn about Dirtcake Studio, a DIY-focused creative studio founded by Tuğba Girgiç and Cihan Gelerli, based in Istanbul.",
    path: "/about",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Dirtcake Studio",
        url: `${SITE_URL}/about`,
        about: { "@id": ORG_ID },
      },
    ],
  },
  contact: {
    title: "Contact | Dirtcake Studio",
    description:
      "Get in touch with Dirtcake Studio for collaborations and creative challenges.",
    path: "/contact",
  },
  freebies: {
    title: "Free Resources | Dirtcake Studio",
    description:
      "Download free high quality vector game assets, stickers, and other resources from Dirtcake Studio. Editable files for personal and commercial use.",
    path: "/freebies",
  },
  notFound: {
    title: "Page not found | Dirtcake Studio",
    description: "This page doesn't exist.",
    path: "/404",
    noindex: true,
  },
} satisfies Record<string, RouteMeta>;

export function projectMeta(toy: Toy): RouteMeta {
  const url = routeUrl(`/project/${toy.slug}`);
  const name = toyName(toy);
  return {
    title: `${name} | ${SITE_NAME}`,
    description: truncate(toy.description, 160),
    path: `/project/${toy.slug}`,
    image: `${SITE_URL}${toy.coverImage}`,
    imageAlt: toy.coverAlt,
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        url,
        description: toy.description,
        image: [toy.coverImage, ...toy.galleryImages].map((p) => `${SITE_URL}${p}`),
        dateCreated: toy.year,
        material: toy.material,
        creator: { "@id": ORG_ID },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Gallery", item: `${SITE_URL}/gallery` },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };
}

/** Every tag except <title>, as plain data, so JSX and string output stay identical. */
export function metaToTags(meta: RouteMeta): HeadTag[] {
  const url = routeUrl(meta.path);
  const image = meta.image ?? DEFAULT_OG_IMAGE;
  const tags: HeadTag[] = [
    { tag: "meta", attrs: { name: "description", content: meta.description } },
  ];
  if (meta.noindex) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex" } });
  } else {
    tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });
  }
  tags.push(
    { tag: "meta", attrs: { property: "og:type", content: meta.type ?? "website" } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    { tag: "meta", attrs: { property: "og:title", content: meta.title } },
    { tag: "meta", attrs: { property: "og:description", content: meta.description } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
  );
  if (meta.imageAlt) {
    tags.push({ tag: "meta", attrs: { property: "og:image:alt", content: meta.imageAlt } });
  }
  tags.push(
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: meta.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: meta.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } },
  );
  for (const ld of meta.jsonLd ?? []) {
    tags.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      text: JSON.stringify(ld).replace(/</g, "\\u003c"),
    });
  }
  return tags;
}

/** First sentence(s) of a description, until there's enough text to be meaningful. */
const firstSentence = (s: string) => {
  const sentences = s.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [s];
  let out = "";
  for (const sentence of sentences) {
    out = `${out} ${sentence}`.trim();
    if (out.length >= 60) break;
  }
  return truncate(out.replace(/\s+/g, " "), 200);
};

export function allRoutes(): RouteEntry[] {
  const pages: RouteEntry[] = [
    { ...PAGE_META.home, kind: "page", inLlms: false },
    { ...PAGE_META.gallery, kind: "page", inLlms: true, llmsLabel: "Gallery" },
    { ...PAGE_META.about, kind: "page", inLlms: true, llmsLabel: "About" },
    { ...PAGE_META.contact, kind: "page", inLlms: true, llmsLabel: "Contact" },
    // Not linked from the site UI, but listed in the sitemap and llms.txt.
    { ...PAGE_META.freebies, kind: "page", inLlms: true, llmsLabel: "Free Resources", lastmod: "2026-07-04" },
  ];
  const projects: RouteEntry[] = TOYS.map((toy) => ({
    ...projectMeta(toy),
    kind: "project" as const,
    inLlms: true,
    llmsLabel: toyName(toy),
    images: Array.from(new Set([toy.coverImage, ...toy.galleryImages])).map(
      (p) => `${SITE_URL}${p}`,
    ),
  }));
  return [...pages, ...projects];
}

export const llmsLine = (toy: Toy) => {
  const status = /sold out/i.test(toy.edition)
    ? ", sold out"
    : /not for sale/i.test(toy.edition)
      ? ", not for sale"
      : "";
  return `${firstSentence(toy.description)} (${toy.collection.toLowerCase()}, ${toy.year}${status})`;
};
