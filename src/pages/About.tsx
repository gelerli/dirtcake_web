import { motion } from "motion/react";
import Seo from "../components/Seo";
import { PAGE_META } from "../seo";
import { SOCIALS } from "../socials";

const ABOUT_LINKS = SOCIALS.filter((s) =>
  ["instagram", "x", "youtube"].includes(s.key),
);

export default function About() {
  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <Seo {...PAGE_META.about} />
      <div className="max-w-4xl mx-auto px-8 flex-grow pb-20 space-y-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-6xl md:text-8xl font-black text-black uppercase tracking-tighter"
        >
          ABOUT{" "}
          <span className="text-neon-coral neon-text-coral">DIRTCAKE</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video w-full bg-black overflow-hidden rounded-2xl shadow-xl border border-black/10"
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/svUh_chq3E8?si=bKvDaF2IVv95nB5G"
            title="Dirtcake Studio introduction video"
            loading="lazy"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>

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
          <p className="text-xl md:text-2xl leading-relaxed text-black/75">
            Established in 2023 by Tuğba Girgiç and Cihan Gelerli, our mission
            is to tease the contemporary art establishment through collectibles,
            stickers, prints, charms, and other urban relics. Every release is a
            limited edition exploration of modern age, sarcasm, culture, and
            urban mythology.
          </p>
          <div className="pt-4">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-[1px] bg-neon-coral shadow-[0_0_10px_#ff4d4d]" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-black">
                Istanbul / {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8 pt-4 border-t border-black/10"
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 items-start sm:items-center">
            {ABOUT_LINKS.map(({ key, label, url, Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}: @dirtcakestudio`}
                className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.4em] uppercase text-black hover:text-neon-coral transition-colors group"
              >
                <Icon
                  size={18}
                  aria-hidden="true"
                  className="group-hover:scale-110 transition-transform"
                />
                @dirtcakestudio
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
