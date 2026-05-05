import React, { useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <Helmet>
        <title>About | Dirtcake Studio</title>
        <link rel="canonical" href="https://www.dirtcakestudio.com/about" />
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Dirtcake Studio",
        "url": "https://www.dirtcakestudio.com/",
        "logo": "https://www.dirtcakestudio.com/images/og-share-cover.png"",
        "foundingDate": "2023",
        "founders": [
          { "@type": "Person", "name": "Tuğba Girgiç" },
          { "@type": "Person", "name": "Cihan Gelerli" }
        ],
        "location": {
          "@type": "Place",
          "name": "Istanbul, Turkey"
        },
        "sameAs": [
          "https://www.instagram.com/dirtcakestudio",
          "https://twitter.com/dirtcakestudio",
          "https://www.behance.net/dirtcakestudio",
          "https://youtube.com/@dirtcakestudio"
        ],
        "description": "DIY-focused and tech-forward creative studio based in Istanbul producing limited-edition designer toys, stickers, and other visual artifacts."
      }
    `}
        </script>
        <meta
          name="description"
          content="Learn about Dirtcake Studio, a DIY-focused creative studio founded by Tuğba Girç and Cihan Gelerli, based in Istanbul."
        />
      </Helmet>
      <div className="max-w-4xl mx-auto px-8 flex-grow pb-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-6xl md:text-8xl font-black text-black uppercase mb-12 tracking-tighter"
        >
          ABOUT{" "}
          <span className="text-neon-coral neon-text-coral">DIRTCAKE</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl font-medium leading-relaxed text-black/80">
              Dirtcake Studio is a do-it-yourself focused and tech-forward
              creative studio based in Istanbul. We forge limited-edition
              designer toys and physical artifacts that exist at the
              intersection of raw, enthusiastic craftsmanship and humorous
              chaos.
            </p>
            <p className="text-lg leading-relaxed text-black/70">
              Established in 2023 by Tuğba Girgiç and Cihan Gelerli, our mission
              is to tease the contemporary art establishment through
              collectibles, stickers, prints, charms, and other urban relics;
              Every release is a limited edition exploration of modern age,
              sarcasm, culture, and urban mythology.
            </p>
            <div className="pt-4">
              <div className="flex gap-4 items-center">
                <a
                  href="https://instagram.com/dirtcakestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
                >
                  <Instagram
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  @dirtcakestudio
                </a>
              </div>
              <br />
              <div className="flex gap-4 items-center">
                <a
                  href="https://x.com/dirtcakestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
                >
                  <Twitter
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  @dirtcakestudio
                </a>
              </div>
              <br />
              <div className="flex gap-4 items-center">
                <a
                  href="https://youtube.com/@dirtcakestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
                >
                  <Youtube
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  @dirtcakestudio
                </a>
              </div>
            </div>
            <div className="pt-8">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-[1px] bg-neon-coral shadow-[0_0_10px_#ff4d4d]" />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-black">
                  Istanbul / 2026
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative aspect-square bg-black overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
              alt="Studio Workspace"
              className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
