import React, { useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";

export default function Gallery() {
  // Reset scroll to top when navigation to Gallery occurs
  useEffect(() => {
    // Reset for mobile/tablet (window scroll)
    window.scrollTo(0, 0);

    // Reset for desktop (internal main container scroll)
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }
  }, []);

  const groupedCollections = useMemo(() => {
    // 1. Group toys by collection
    const groups: Record<string, typeof TOYS> = {};
    TOYS.forEach((toy) => {
      const collection = toy.collection || "Other";
      if (!groups[collection]) {
        groups[collection] = [];
      }
      groups[collection].push(toy);
    });

    // 2. Define Sorting Options
    let collectionNames = Object.keys(groups);

    /** * OPTION A: RANDOM ORDER (Currently Active)
     * Shuffles the collections every time the page is refreshed.
     */
    collectionNames = collectionNames.sort(() => Math.random() - 0.5);

    /** * OPTION B: ORIGINAL ALPHABETICAL ORDER (Commented Out)
     * collectionNames = collectionNames.sort((a, b) => b.localeCompare(a));
     */

    /** * OPTION C: PREFERRED MANUAL ORDER (Commented Out)
     * const PREFERRED_ORDER = ['stickers', 'toys', 'prints'];
     * collectionNames = collectionNames.sort((a, b) => {
     * return PREFERRED_ORDER.indexOf(a.toLowerCase()) - PREFERRED_ORDER.indexOf(b.toLowerCase());
     * });
     */

    // 3. Process the sorted collections for display
    return collectionNames.map((name) => {
      const shuffledColors = [...NEON_COLORS].sort(() => 0.5 - Math.random());
      const headerColor =
        NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];

      const toysWithColors = groups[name].map((toy, idx) => ({
        ...toy,
        ...shuffledColors[idx % shuffledColors.length],
      }));

      return {
        name,
        toys: toysWithColors,
        headerColor,
      };
    });
  }, []);

  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-8 flex-grow pb-20"
      >
        {groupedCollections.map((collection, collectionIdx) => (
          <div
            key={collection.name}
            className={
              collectionIdx !== groupedCollections.length - 1 ? "mb-32" : ""
            }
          >
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-black uppercase mb-12 tracking-tighter break-words">
              //{" "}
              <span
                className={`${collection.headerColor.color} ${collection.headerColor.neonClass}`}
              >
                {collection.name}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {collection.toys.map((toy, i) => (
                <Link key={toy.id} to={`/project/${toy.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative aspect-[3/4] overflow-hidden bg-black cursor-pointer"
                  >
                    <img
                      src={toy.coverImage}
                      alt={toy.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500">
                      <h3
                        className={`font-display text-3xl font-black ${toy.color} ${toy.neonClass} uppercase leading-none`}
                      >
                        {toy.title}
                        <br />
                        {toy.subtitle}
                      </h3>
                      <p className="text-white text-[10px] font-bold tracking-[0.3em] mt-4 uppercase opacity-70">
                        {toy.info}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
