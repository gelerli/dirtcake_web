import React, { useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  SiInstagram,
  SiYoutube,
  SiX,
  SiBehance,
  SiBluesky,
} from "@icons-pack/react-simple-icons";
import { X, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <Helmet>
        <title>About | Dirtcake Studio</title>
        <link rel="canonical" href="https://www.dirtcakestudio.com/about" />

        {/* Corrected JSON-LD using JSON.stringify to avoid syntax errors */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dirtcake Studio",
              url: "https://www.dirtcakestudio.com/",
              logo: "https://www.dirtcakestudio.com/images/og-share-cover.png",
              foundingDate: "2023",
              founders: [
                {
                  "@type": "Person",
                  name: "Tuğba Girgiç",
                },
                {
                  "@type": "Person",
                  name: "Cihan Gelerli",
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Istanbul",
                addressCountry: "TR",
              },
              sameAs: [
                "https://www.instagram.com/dirtcakestudio",
                "https://twitter.com/dirtcakestudio",
                "https://www.behance.net/dirtcakestudio",
                "https://youtube.com/@dirtcakestudio",
                "https://bsky.app/profile/dirtcakestudio.bsky.social",
                "https://tr.pinterest.com/dirtcakestudio/",
              ],
              description:
                "DIY-focused and tech-forward creative studio based in Istanbul producing limited-edition designer toys, stickers, and other visual artifacts.",
            }),
          }}
        />

        <meta
          name="description"
          content="Learn about Dirtcake Studio, a DIY-focused creative studio founded by Tuğba Girgiç and Cihan Gelerli, based in Istanbul."
        />
      </Helmet>
      <div className="max-w-4xl mx-auto px-8 flex-grow pb-20 space-y-10">
        {/* 1. TITLE */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-6xl md:text-8xl font-black text-black uppercase tracking-tighter"
        >
          ABOUT{" "}
          <span className="text-neon-coral neon-text-coral">DIRTCAKE</span>
        </motion.h2>

        {/* 2. VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video w-full bg-black overflow-hidden rounded-2xl shadow-xl border border-black/10"
        >
          <iframe
            src="https://www.youtube.com/embed/svUh_chq3E8?si=bKvDaF2IVv95nB5G"
            title="YouTube video player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>

        {/* 3. ABOUT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 pt-4"
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-black/85">
            Dirtcake Studio is a do-it-yourself focused and tech-forward
            creative studio based in Istanbul. We forge limited-edition designer
            toys and physical artifacts that exist at the intersection of raw,
            enthusiastic craftsmanship and humorous chaos.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-black/70">
            Established in 2023 by Tuğba Girgiç and Cihan Gelerli, our mission
            is to tease the contemporary art establishment through collectibles,
            stickers, prints, charms, and other urban relics; Every release is a
            limited edition exploration of modern age, sarcasm, culture, and
            urban mythology.
          </p>
          <div className="pt-4">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-[1px] bg-neon-coral shadow-[0_0_10px_#ff4d4d]" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-black">
                Istanbul / 2026
              </span>
            </div>
          </div>
        </motion.div>

        {/* 4. LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8 pt-4 border-t border-black/10"
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 items-start sm:items-center">
            <a
              href="https://instagram.com/dirtcakestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
            >
              <SiInstagram
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              @dirtcakestudio
            </a>

            <a
              href="https://x.com/dirtcakestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
            >
              <SiX
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              @dirtcakestudio
            </a>

            <a
              href="https://youtube.com/@dirtcakestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
            >
              <SiYoutube
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              @dirtcakestudio
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
