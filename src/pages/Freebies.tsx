import React from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import {
  Download,
  Instagram,
  Twitter,
  ExternalLink,
  Globe,
} from "lucide-react";

const FREEBIE_DATA = [
  {
    id: 1,
    title: "Game Assets Pack 01",
    thumbnail: "/freebies/thumbnail-dirtcake-free-game-assets-01.webp",
    fileUrl: "/freebies/dirtcake-free-game-assets-01.ai",
    fileName: "dirtcake-free-game-assets-01.ai",
    alt: "completely free editable vector game assets for a match 3 game by Dirtcake Studio",
  },
  {
    id: 2,
    title: "Game Assets Pack 02",
    thumbnail: "/freebies/thumbnail-dirtcake-free-game-assets-02.webp",
    fileUrl: "/freebies/dirtcake-free-game-assets-02.ai",
    fileName: "dirtcake-free-game-assets-02.ai",
    alt: "completely free editable vector low-poly game UI icons for games and website UI design by Dirtcake Studio",
  },
];

export default function Freebies() {
  return (
    <>
      <Helmet>
        <title>Free Resources | Dirtcake Studio</title>
        <meta
          name="description"
          content="Download free high quality vector game assets, stickers, and other resources from Dirtcake Studio. Editable files for personal and commercial use."
        />
        <link rel="canonical" href="https://www.dirtcakestudio.com/freebies" />

        {/* Social Media Preview Tags (Open Graph) */}
        <meta property="og:title" content="Free Resources - Dirtcake Studio" />
        <meta
          property="og:description"
          content="No strings attached. Download high-quality resources for your next project."
        />
        <meta
          property="og:image"
          content="https://www.dirtcakestudio.com/images/og-share-cover.png"
        />
      </Helmet>
      {/** * FIX: Added 'pt-24' and 'md:pt-32' * This creates a top buffer so the
      content starts BELOW your fixed header. */}
      <div className="flex-1 bg-white flex flex-col items-center pt-24 md:pt-32 pb-12 md:pb-20 px-6">
        {/* --- 1. TOP TEXT AREA --- */}
        <div className="text-center mb-16 max-w-2xl">
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Free <span className="text-neon-pink">Resources</span>
          </h1>

          {/* Div container allows for the h3 and p tags inside without errors */}
          <div className="mt-8 text-black/60 font-medium uppercase text-[10px] tracking-[0.2em] leading-loose">
            <p>
              A collection of assets from our studio for you to
              <br />
              download, use, and create something awesome.
            </p>

            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-black mt-10 mb-2">
              NO STRINGS ATTACHED.
            </h3>

            <p className="text-neon-pink font-bold mt-4">
              Click on the thumbnails to download.
            </p>
          </div>
        </div>

        {/* --- ASSETS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mb-20">
          {FREEBIE_DATA.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="relative group overflow-hidden border border-black/5 rounded-sm bg-gray-50 max-w-[400px] w-full shadow-sm">
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <a
                  href={item.fileUrl}
                  download={item.fileName}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
                >
                  <div className="bg-white text-black p-4 rounded-full shadow-xl">
                    <Download size={24} />
                  </div>
                  <span className="font-bold text-[10px] text-white tracking-[0.3em] uppercase">
                    Download .AI
                  </span>
                </a>
              </div>
              <h2 className="mt-6 font-bold text-[10px] tracking-[0.4em] uppercase text-black/40">
                {item.title}
              </h2>
            </div>
          ))}
        </div>

        {/* --- 2. BOTTOM TEXT AREA --- */}
        <div className="w-full max-w-2xl border-t border-black/5 pt-12 text-center">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-black mb-4">
            You can give us a follow or a few ❤️s below:
          </h3>
          <p className="text-black/50 text-[11px] font-medium uppercase tracking-widest mb-8">
            but only if you feel like...
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a
              href="https://instagram.com/dirtcakestudio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black hover:text-neon-pink transition-colors group"
            >
              <Instagram size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Instagram
              </span>
            </a>
            <a
              href="https://x.com/dirtcakestudio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black hover:text-neon-pink transition-colors group"
            >
              <Twitter size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Twitter
              </span>
            </a>
            <a
              href="https://bsky.app/profile/dirtcakestudio.bsky.social"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black hover:text-neon-pink transition-colors group"
            >
              <Globe size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Bluesky
              </span>
            </a>
            <a
              href="https://www.behance.net/dirtcakestudio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-black hover:text-neon-pink transition-colors group"
            >
              <ExternalLink size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Behance
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
