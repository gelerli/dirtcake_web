import React, { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Reset scroll to top when navigation to Gallery occurs
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }
  }, []);

  // 1. Extract unique collection names from constants.ts
  const filterOptions = useMemo(() => {
    const collections = Array.from(
      new Set(TOYS.map((toy) => toy.collection || "Other")),
    );
    return ["ALL", ...collections.sort()];
  }, []);

  const groupedCollections = useMemo(() => {
    // Group toys by collection
    const groups: Record<string, typeof TOYS> = {};

    // Filter the TOYS first if a specific filter is selected
    const filteredToys =
      activeFilter === "ALL"
        ? TOYS
        : TOYS.filter((toy) => (toy.collection || "Other") === activeFilter);

    filteredToys.forEach((toy) => {
      const collection = toy.collection || "Other";
      if (!groups[collection]) {
        groups[collection] = [];
      }
      groups[collection].push(toy);
    });

    let collectionNames = Object.keys(groups);

    // Shuffle if on ALL, otherwise just show the single selected one
    if (activeFilter === "ALL") {
      collectionNames = collectionNames.sort(() => Math.random() - 0.5);
    }

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
  }, [activeFilter]);

  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-8 w-full mb-16">
        {/* --- FILTER SYSTEM --- */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mr-2">
            Filter:
          </span>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeFilter === option
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="max-w-7xl mx-auto px-8 flex-grow pb-20 w-full"
      >
        <AnimatePresence mode="popLayout">
          {groupedCollections.map((collection, collectionIdx) => (
            <motion.div
              layout
              key={collection.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
