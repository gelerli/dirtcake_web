import type {
  PortfolioCategory,
  PortfolioData,
  PortfolioSocialLink,
} from "./types";

import seo from "./cihangelerli.seo.json";

export const CIHAN_GELERLI_PORTFOLIO = {
  identity: {
    name: "CİHAN GELERLİ",
    nameLines: ["CİHAN", "GELERLİ"],
    roles: ["GAME ARTIST", "ILLUSTRATOR", "UI ARTIST"],
    roleSeparator: "/",
    introduction:
      "I'm a 2D and 3D generalist, with a focus on illustration, UI design and isometric game art in recent years. I'm a hands-on, DIY-minded creative with a strong interest in technology, a good eye for visuals and the ability to adapt to different tools, workflows and pipelines.",
  },
  about: {
    heading: "ABOUT",
    facts: [
      { label: "experience:", value: "15+ years" },
      { label: "location:", value: "Istanbul" },
      { label: "education:", value: "Fine Arts (B.A.)" },
      { label: "languages:", value: "TR / EN / SP" },
    ],
    skillsLabel: "skills:",
    skills: [
      "Adobe CS",
      "Figma",
      "Blender",
      "Spine Animation",
      "Rive",
      "Gen AI",
    ],
    cvPrefix: "Find my current CV ",
    cvLinkText: "here",
    cvUrl:
      "https://docs.google.com/document/d/1E2_wrubUoNSoZqCAjJOz0xRa7qoOUBMKAcgm9DgzwuI/edit?usp=sharing",
  },
  onlinePresence: {
    heading: "ONLINE PRESENCE",
    links: [
      {
        platform: "instagram",
        label: "instagram - @gelerli",
        description: "Get to know me better",
        url: "https://www.instagram.com/gelerli/",
        icon: "/cihangelerli/icon-instagram.svg",
      },
      {
        platform: "behance",
        label: "Behance - @gelerli",
        description: "Selected projects and studies",
        url: "https://www.behance.net/gelerli",
        icon: "/cihangelerli/icon-behance.svg",
      },
      {
        platform: "github",
        label: "github - @cihangelerli",
        description: "my pet project repos and coding adventures",
        url: "https://github.com/cihangelerli",
        icon: "/cihangelerli/icon-github.svg",
      },
      {
        platform: "glitchbooth",
        label: "glitchbooth.online",
        description: "active pet project",
        url: "https://glitchbooth.online/",
        icon: "/cihangelerli/icon-glitchbooth.svg",
      },
      {
        platform: "dirtcake",
        label: "dirtcakestudio.com",
        description:
          "Our little studio focused on DIY toys, stickers, prints and other urban artifacts",
        url: "https://www.dirtcakestudio.com/",
        icon: "/cihangelerli/icon-dirtcake.svg",
      },
    ] satisfies PortfolioSocialLink[],
  },
  categories: [
    {
      id: "illustration",
      label: "Illustration",
      description:
        "Various assets and illustrations for a wide variety of projects",
      projects: [
        {
          id: "illustration-project-1",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-green-isometric.png",
            alt: "Colorful isometric game scene with green paths and small structures",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "illustration-project-2",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-isometric-assets.png",
            alt: "Collection of small isometric buildings and game assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "illustration-project-3",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-city-assets.png",
            alt: "Isometric city assets arranged in a technical sheet",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "illustration-project-4",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-colorful-isometric.png",
            alt: "Colorful isometric city scene with detailed buildings",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
      ],
    },
    {
      id: "isometric-game-art",
      label: "Isometric Game Art",
      description:
        "Various assets and illustrations for a wide variety of projects",
      projects: [
        {
          id: "isometric-game-art-project-1",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-green-isometric.png",
            alt: "Colorful isometric game scene with green paths and small structures",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "isometric-game-art-project-2",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-isometric-assets.png",
            alt: "Collection of small isometric buildings and game assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "isometric-game-art-project-3",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-city-assets.png",
            alt: "Isometric city assets arranged in a technical sheet",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "isometric-game-art-project-4",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-colorful-isometric.png",
            alt: "Colorful isometric city scene with detailed buildings",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
      ],
    },
    {
      id: "game-backgrounds",
      label: "Game Backgrounds",
      description:
        "Various assets and illustrations for a wide variety of projects",
      projects: [
        {
          id: "game-backgrounds-project-1",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-green-isometric.png",
            alt: "Colorful isometric game scene with green paths and small structures",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "game-backgrounds-project-2",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-isometric-assets.png",
            alt: "Collection of small isometric buildings and game assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "game-backgrounds-project-3",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-city-assets.png",
            alt: "Isometric city assets arranged in a technical sheet",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "game-backgrounds-project-4",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-colorful-isometric.png",
            alt: "Colorful isometric city scene with detailed buildings",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
      ],
    },
    {
      id: "ui-design",
      label: "UI Design",
      description:
        "Various assets and illustrations for a wide variety of projects",
      projects: [
        {
          id: "ui-design-project-1",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-green-isometric.png",
            alt: "Colorful isometric game scene with green paths and small structures",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "ui-design-project-2",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-isometric-assets.png",
            alt: "Collection of small isometric buildings and game assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "ui-design-project-3",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-city-assets.png",
            alt: "Isometric city assets arranged in a technical sheet",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
        {
          id: "ui-design-project-4",
          subtitle: "Subtitle",
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          thumbnail: {
            src: "/cihangelerli/thumbnail-colorful-isometric.png",
            alt: "Colorful isometric city scene with detailed buildings",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery-pixel-city-05.png",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery-city-sk-02.png",
              alt: "Isometric city illustration with buildings and streets",
            },
            {
              src: "/cihangelerli/gallery-city-sk-01.png",
              alt: "Isometric city buildings and environment assets on a light background",
            },
            {
              src: "/cihangelerli/gallery-city-sk-03.png",
              alt: "Isometric building and vehicle assets arranged on a grid",
            },
          ],
        },
      ],
    },
  ] satisfies PortfolioCategory[],
  ui: {
    navigation: {
      portfolio: "PORTFOLIO",
      getInTouch: "GET IN TOUCH",
      getInTouchUrl: "https://dirtcakestudio.com/contact",
    },
    gallery: {
      rangeLabel: "Gallery image",
      imagePosition: "Image {current} of {total}",
      regionLabel: "{category} gallery",
      thumbnailRailLabel: "{category} projects",
      thumbnailLabel: "{category}, image {number}",
    },
    footerCopyright: "© 2026 - All rights reserved.",
  },
  seo,
} satisfies PortfolioData;

export type CihanGelerliPortfolio = typeof CIHAN_GELERLI_PORTFOLIO;
