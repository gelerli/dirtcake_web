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
    roles: ["GAME ARTIST", "ILLUSTRATOR", "UI DESIGNER"],
    roleSeparator: "/",
    introduction:
      "I'm a 2D and 3D generalist, with a focus on illustration, UI design and isometric game art in recent years. I'm a hands-on, DIY-minded creative with a strong interest in technology, a good eye for visuals and the ability to adapt to different tools, workflows and pipelines.\n\nreach me at gelerli@gmail.com",
  },
  about: {
    heading: "ABOUT",
    facts: [
      { label: "experience:", value: "15+ years" },
      { label: "location:", value: "Istanbul" },
      { label: "education:", value: "Fine Arts (B.A.)" },
      { label: "languages:", value: "TR / EN / ES" },
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
        "My personal selection of illustrations and posters I did for a wide variety of projects and clients. Click on the thumbnails to view details for each project. 👉",
      projects: [
        {
          id: "illustration-project-1",
          title: "Bad Friends",
          subtitle: "3D illustration and character design - Personal Project",
          link: {
            label: "See more on Behance",
            url: "https://www.behance.net/gallery/101011133/Bad-Friends",
          },
          description:
            "Original characters and 3D illustration created for a personal project, modeled, rigged, textures and rendered entirely in Blender. The project was created to explore character design and 3D illustration techniques.",
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-illustration-bad-friends.webp",
            alt: "Colorful 3D characters in a surreal environment, hanging out together as friends",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-illustration-bad-friends-01.webp",
              alt: "Colorful 3D characters in a surreal environment, hanging out together as friends",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-bad-friends-02.webp",
              alt: "Colorful 3D characters in a surreal environment, hanging out together as friends",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-bad-friends-03.webp",
              alt: "Colorful 3D characters in a surreal environment, hanging out together as friends",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-bad-friends-04.webp",
              alt: "Colorful 3D characters in a surreal environment, hanging out together as friends",
            },
          ],
        },
        {
          id: "illustration-project-2",
          title: "Netizens",
          subtitle: "Tron inspired tech context illustration for a startup",
          link: {
            label: "See more on Behance",
            url: "https://www.behance.net/gallery/69727933/Illustration-for-Blockchain-based-CDN",
          },
          description:
            "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-illustration-cdn.webp",
            alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-01.webp",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-02.webp",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-03.webp  ",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-04.webp",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-05.webp",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-cdn-06.webp",
              alt: "Vector illustration for Blockchain based Content Delivery Network Startup depictin scenes from the every day life of people using their technology and services in a Tron inspired tech context",
            },
          ],
        },
        {
          id: "illustration-project-3",
          title: "Global Game Jam İstanbul 2024",
          subtitle: "Poster illustration for a game jam event",
          /*
          link: { label: "Link", url: "https://example.com/" },
          */
          description:
            "I was lucky to draw and illustrate the poster for the Global Game Jam İstanbul 2024 that reflects the theme and the spirit of the event.",
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-illustration-ggj.webp",
            alt: "Digital poster illustration for Global Game Jam İstanbul 2024 event",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-illustration-ggj-01.webp",
              alt: "Post-apocalyptic dystopian desert scene with character repairing their sci-fi vehicles",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-ggj-02.webp",
              alt: "Detail of post-apocalyptic dystopian desert scene with character repairing their sci-fi vehicles",
            },
          ],
        },
        {
          id: "illustration-project-4",
          title: "Come Together",
          subtitle:
            "Poster illustration for a Beatles themed night at a big venue",
          link: {
            label: "See more on Behance",
            url: "https://www.behance.net/gallery/169121245/Come-Together",
          },
          description:
            "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-illustration-come-together.webp",
            alt: "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-illustration-come-together-01.webp",
              alt: "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-come-together-02.webp",
              alt: "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-come-together-03.webp",
              alt: "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-come-together-04.webp",
              alt: "Vector illustration for a Beatles themed night at a big venue. The poster was inspired by my favorite Beatles songs and the spirit of their music.",
            },
          ],
        },
        {
          id: "illustration-project-5",
          title: "Work Together",
          subtitle:
            "Work themed editorial vector illustrations for a corporate client (Upwork)",
          link: {
            label: "See more on Behance",
            url: "https://www.behance.net/gallery/247464609/Minimalistic-Character-Design-illustration",
          },
          /*
          description:
            "Work themed editorial vector illustrations for a corporate client (Upwork)",
          */
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-illustration-work.webp",
            alt: "Work themed editorial vector illustrations for a corporate client (Upwork)",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-illustration-work-01.webp",
              alt: "Work themed editorial vector illustrations for a corporate client (Upwork)",
            },
            {
              src: "/cihangelerli/gallery/gallery-illustration-work-02.webp",
              alt: "Work themed editorial vector illustrations for a corporate client (Upwork)",
            },
          ],
        },
      ],
    },
    {
      id: "isometric-game-art",
      label: "Isometric Art",
      description:
        "Find my favorite isometric illustrations and assets for various game and animation projects here 📍",
      projects: [
        {
          id: "isometric-game-art-project-1",
          title: "Code Name: Cat City",
          subtitle:
            "Vector game art assets and illustrations for a mobile game",
          /*  
          link: { label: "Link", url: "https://example.com/" },
          */
          description:
            "Was commissioned to create a series of isometric vector illustrations and game assets for a sliding seas clone set in a city where cats live. The project was cancelled.",
          thumbnail: {
            src: "cihangelerli/thumbnails/thumbnail-isometric-cats.webp",
            alt: "Colorful isometric game scene with cats on green paths and small structures",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-isometric-cats-01.webp",
              alt: "Colorful isometric game scene with green paths and small structures",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-cats-02.webp",
              alt: "Detail of a colorful isometric game scene with green paths and small structures",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-cats-03.webp",
              alt: "Detail of a colorful isometric game scene with green paths and small structures",
            },
          ],
        },
        {
          id: "isometric-game-art-project-2",
          title: "Pixel İstanbul",
          subtitle:
            "Isometric pixel art city illustration for an animation film project",
          link: {
            label: "Watch the film on Behance",
            url: "https://www.behance.net/gallery/133918589/Logo-36th-Anniversary/",
          },
          description:
            "Isometric pixel art city and building illustrations and assets created for an animated film project. The growth and progress of the subject company over the years was visualized through the growth and progression of the company building.",
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-isometric-pixelcity.webp",
            alt: "Collection of pixel art isometric buildings and animation assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-isometric-pixelcity-01.webp",
              alt: "Wide pixel-art city block with streets, buildings, trees, and a waterfront",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-pixelcity-02.webp",
              alt: "Sketch of a detailed isometric city illustration with buildings and streets and other assets",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-pixelcity-03.webp",
              alt: "Sketch of an isometric city buildings and environment assets arranged on a grid",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-pixelcity-04.webp",
              alt: "Sketch of an isometric building and its growth stages as assets arranged on a grid",
            },
          ],
        },
        {
          id: "isometric-game-art-project-3",
          title: "Surreal isometric animation scene",
          subtitle:
            "Escher-inspired isometric illustration for an animation film project",
          link: {
            label: "Watch the film on Behance",
            url: "https://www.behance.net/gallery/133918589/Logo-36th-Anniversary/",
          },
          description:
            "Isometric vector illustration and assets created for an animated film project. The scene was inspired by Escher's work and features surreal architecture and impossible structures.",
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-isometric-surreal.webp",
            alt: "Collection of vector art isometric building and other animation assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-isometric-surreal-01.webp",
              alt: "A surreal isometric scene vector illustration with impossible structures and Escher-inspired architecture",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-surreal-02.webp",
              alt: "A surreal isometric scene vector illustration with impossible structures and Escher-inspired architecture",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-surreal-03.webp",
              alt: "Sketch of a surreal isometric scene and its assets",
            },
          ],
        },
        {
          id: "isometric-game-art-project-4",
          title: "Isometric Lille",
          subtitle:
            "An isometric game project set in the city of Lille, France",
          /*
          link: { label: "Link", url: "https://example.com/" },
          */
          description:
            "Isometric vector illustration and assets created for a game project that uses the actual city of Lille and its landmark buildings in France as its setting.",
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-isometric-lille.webp",
            alt: "Collection of vector art isometric buildings and game art assets",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-isometric-lille-01.webp",
              alt: "Sketch of an isometric city buildings and environment assets arranged on a grid",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-lille-02.webp",
              alt: "Sketch of an isometric city buildings and environment assets arranged on a grid",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-lille-03.webp",
              alt: "Sketch of an isometric river tiles and environment assets arranged on a grid",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-lille-04.webp",
              alt: "Sketch of an isometric river tiles and environment assets arranged on a grid",
            },
            {
              src: "/cihangelerli/gallery/gallery-isometric-lille-05.webp",
              alt: "Sketch of an isometric river tiles and environment assets arranged on a grid",
            },
          ],
        },
      ],
    },
    {
      id: "game-backgrounds",
      label: "Game Backgrounds",
      description:
        "Some of my best raster and vector background illustrations and layered assets for games and other digital products ✌️",
      projects: [
        {
          id: "game-backgrounds-project-1",
          title: "Game Backgrounds - I",
          subtitle:
            "Layered background illustrations and assets for a visual novel style game",
          /*  
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-game-background-telenovella.webp",
            alt: "Layered background illustrations and assets for a visual novel style game",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-game-background-telenovella-01.webp",
              alt: "Layered background illustrations and assets for a visual novel style game",
            },
            {
              src: "/cihangelerli/gallery/gallery-game-background-telenovella-02.webp",
              alt: "Layered background illustrations and assets for a visual novel style game",
            },
            {
              src: "/cihangelerli/gallery/gallery-game-background-telenovella-03.webp",
              alt: "Layered background illustrations and assets for a visual novel style game",
            },
            {
              src: "/cihangelerli/gallery/gallery-game-background-telenovella-04.webp",
              alt: "Layered background illustrations and assets for a visual novel style game",
            },
          ],
        },
        {
          id: "game-backgrounds-project-2",
          title: "Game Backgrounds - II",
          subtitle:
            "Vector background illustrations and animation assets for a browser based animation SAAS startup",
          link: { label: "Link", url: "https://www.animatron.com/studio" },
          /*
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-game-background-zombie-walk.webp",
            alt: "Vector background illustrations and animation assets for a browser based animation SAAS startup",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-game-background-zombie-walk-01.webp",
              alt: "Vector background illustrations and animation assets for a browser based animation SAAS startup ",
            },
            {
              src: "/cihangelerli/gallery/gallery-game-background-zombie-walk-02.webp",
              alt: "Vector background illustrations and animation assets for a browser based animation SAAS startup ",
            },
          ],
        },
      ],
    },
    {
      id: "ui-design",
      label: "UI Design",
      description:
        "User interface design and UI illustration projects (like icons, avatars, etc) for games, apps and other digital products 👾",
      projects: [
        {
          id: "ui-design-project-1",
          title: "TLC",
          subtitle: "UI design screens for sci-fi spacehip combat game",

          link: {
            label: "Find Rive animation examples on my Google Drive",
            url: "https://drive.google.com/drive/folders/15de9x48Ka_4XEHAcb6FfXNr0pUZIZsQw?usp=sharing",
          },
          /*
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-TLC.webp",
            alt: "UI design screens for sci-fi spacehip combat game",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-00-MAINMENU-1.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Main menu",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-00-MAINMENU-3-NEWCAMPAIGN.webp",
              alt: "UI design screens for sci-fi spacehip combat game - New campaign",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-faction-select.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Faction selection",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL1-0x.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 1 overview",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL1-01.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 1",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL1-02.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 1 detail",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL2-01.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 2",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL2-02.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 2 detail",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL3-01-A.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 3 view A",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL3-01-B.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 3 view B",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-01-STARMAP-LEVEL3-mission-brief.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Starmap level 3 mission brief",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-customization-slot-view.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar customization slot view",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-customization.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar customization",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-loadout-with-slots.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar loadout with slots",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-loadout.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar loadout",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-store-point-defence.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar store point defence",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-store-ship.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar store ships",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-upgrades-modules.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar upgrades modules",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-upgrades-ships.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar upgrades ships",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-02-HANGAR-upgrades-weapons.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Hangar upgrades weapons",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-00-mission-select.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Mission select",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-01-mission-brief.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Mission brief",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-04-mission-report-multiplayer-success-REWARDS.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Multiplayer mission report success rewards",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-05-mission-reward.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Mission reward",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-06-mission-report-success-multiplayer-HALL-OF-FAME.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Multiplayer mission report hall of fame",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-03-07-mission-report-multiplayer-fail-REWARDS.webp",
              alt: "UI design screens for sci-fi spacehip combat game - Multiplayer mission report fail rewards",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-04-HUD-v2-1.webp",
              alt: "UI design screens for sci-fi spacehip combat game - In-game HUD view 1",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-04-HUD-v2-2.webp",
              alt: "UI design screens for sci-fi spacehip combat game - In-game HUD view 2",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-04-HUD-v2-3.webp",
              alt: "UI design screens for sci-fi spacehip combat game - In-game HUD view 3",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-TLC-04-HUD-v2-4.webp",
              alt: "UI design screens for sci-fi spacehip combat game - In-game HUD view 4",
            },
          ],
        },
        {
          id: "ui-design-project-2",
          title: "GAL",
          subtitle: "UI design screens for mech combat game",
          /*
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-GAL.webp",
            alt: "UI design screens for mech combat game",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-GAL-01-LOBBY.webp",
              alt: "UI design screens for mech combat game - Lobby",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-GAL-02-LOADOUT.webp",
              alt: "UI design screens for mech combat game - Loadout",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-GAL-03-STORE-1.webp",
              alt: "UI design screens for mech combat game - Store screen 1",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-GAL-03-STORE-2.webp",
              alt: "UI design screens for mech combat game - Store screen 2",
            },
          ],
        },
        {
          id: "ui-design-project-3",
          title: "DEJA",
          subtitle: "UI design screens for sci-fi FPS combat game",
          /*
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-DEJA.webp",
            alt: "UI design screens for sci-fi FPS combat game",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-01-Character-Sel.webp",
              alt: "UI design screens for sci-fi FPS combat game - Character selection",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-02-Character-armor.webp",
              alt: "UI design screens for sci-fi FPS combat game - Character armor",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-02-Character-perks.webp",
              alt: "UI design screens for sci-fi FPS combat game - Character perks",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-02-Character-Skills.webp",
              alt: "UI design screens for sci-fi FPS combat game - Character skills",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-03-inventory.webp",
              alt: "UI design screens for sci-fi FPS combat game - Inventory",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-04-friends-1.webp",
              alt: "UI design screens for sci-fi FPS combat game - Friends list 1",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-DEJA-04-friends-2.webp",
              alt: "UI design screens for sci-fi FPS combat game - Friends list 2",
            },
          ],
        },
        {
          id: "ui-design-project-4",
          title: "PB",
          subtitle: "UI design screens for mafia themed mobile game",
          /*
          link: { label: "Link", url: "https://example.com/" },
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-PB.webp",
            alt: "UI design screens for mafia theme mobile game",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Events_01.webp",
              alt: "UI design screens for mafia theme mobile game - Events screen 01",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Events_02_a.webp",
              alt: "UI design screens for mafia theme mobile game - Events screen 02",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Events_02_confirm.webp",
              alt: "UI design screens for mafia theme mobile game - Events confirmation",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_02_a.webp",
              alt: "UI design screens for mafia theme mobile game - In-game store 02",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_02_confirm.webp",
              alt: "UI design screens for mafia theme mobile game - Store purchase confirmation",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_03.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 03",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_04.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 04",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_05.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 05",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_06.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 06",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_07.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 07",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_08.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 08",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-PB-Store_09.webp",
              alt: "UI design screens for mafia theme mobile game - Store screen 09",
            },
          ],
        },
        {
          id: "ui-design-project-5",
          title: "gamepins avatars",
          subtitle:
            "Illustrated vector icons for user avatars for gaming portal website",
          link: { label: "Link", url: "https://gamepins.com/" },
          /*
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          */
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-gamepins-avatars.webp",
            alt: "illustrated icons for user avatars for gaming portal website",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-gamepins-avatars.webp",
              alt: "illustrated icons for user avatars for gaming portal website",
            },
          ],
        },
        {
          id: "ui-design-project-6",
          title: "MISC. ICONS & ASSETS",
          subtitle: "illustrated icons and vector UI assets for various games",
          link: {
            label: "get free vector assets here",
            url: "https://www.dirtcakestudio.com/freebies",
          },
          description:
            "Absolutely free illustrated icons and vector UI assets, NO STRINGS ATTACHED. You can use them in your personal or commercial projects, just make sure to credit me if you do...",
          thumbnail: {
            src: "/cihangelerli/thumbnails/thumbnail-UI-MISC.webp",
            alt: "illustrated icons and UI assets for various games",
          },
          gallery: [
            {
              src: "/cihangelerli/gallery/gallery-UI-MISC-illu-ui-icons-vector.webp",
              alt: "illustrated icons and UI assets for various games - Vector UI icons",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-MISC-lowpoly-vector-icons.webp",
              alt: "illustrated icons and UI assets for various games - Low-poly vector icons",
            },
            {
              src: "/cihangelerli/gallery/gallery-UI-MISC-qa-illu-icons.webp",
              alt: "illustrated icons and UI assets for various games - Illustrated QA icons",
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
      getInTouchUrl: "https://www.dirtcakestudio.com/contact",
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
