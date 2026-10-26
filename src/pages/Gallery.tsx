import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";
import Seo from "../components/Seo";
import ToyTitle from "../components/ToyTitle";
import { PAGE_META } from "../seo";
import { shuffle, pick } from "../utils";

const collectionOf = (toy: { collection?: string }) => toy.collection || "Other";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const collections = useMemo(
    () => Array.from(new Set(TOYS.map(collectionOf))).sort(),
    [],
  );
  const filterOptions = ["ALL", ...collections];

  // The filter lives in the URL (?collection=…) so filtered views can be shared.
  const requested = searchParams.get("collection");
  const activeFilter =
    requested && collections.includes(requested) ? requested : "ALL";
  const setFilter = (option: string) =>
    setSearchParams(option === "ALL" ? {} : { collection: option }, {
      replace: true,
    });

  // Random order and colours are decided once per visit, so toggling filters
  // doesn't reshuffle everything.
  const { order, headerColors, toyColors } = useMemo(() => {
    const order = shuffle(collections);
    const headerColors = Object.fromEntries(
      order.map((name) => [name, pick(NEON_COLORS)]),
    );
    const toyColors: Record<number, (typeof NEON_COLORS)[number]> = {};
    for (const name of order) {
      const palette = shuffle(NEON_COLORS);
      TOYS.filter((t) => collectionOf(t) === name).forEach((t, i) => {
        toyColors[t.id] = palette[i % palette.length];
      });
    }
    return { order, headerColors, toyColors };
  }, [collections]);

  const groupedCollections = useMemo(
    () =>
      order
        .filter((name) => activeFilter === "ALL" || name === activeFilter)
        .map((name) => ({
          name,
          headerColor: headerColors[name],
          toys: TOYS.filter((t) => collectionOf(t) === name).map((t) => ({
            ...t,
            ...toyColors[t.id],
          })),
        })),
    [order, headerColors, toyColors, activeFilter],
  );

  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <Seo {...PAGE_META.gallery} />
      <h1 className="sr-only">
        Gallery: designer toys, action figures, sticker packs and commissions
      </h1>

      <div className="max-w-7xl mx-auto px-8 w-full mb-16">
        <div
          role="group"
          aria-label="Filter by collection"
          className="flex flex-wrap gap-3 items-center"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/60 mr-2">
            Filter:
          </span>
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={activeFilter === option}
              onClick={() => setFilter(option)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeFilter === option
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="max-w-7xl mx-auto px-8 flex-grow pb-20 w-full">
        <AnimatePresence mode="popLayout">
          {groupedCollections.map((collection, collectionIdx) => (
            <motion.section
              layout
              key={collection.name}
              aria-label={collection.name}
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
                        alt={toy.coverAlt || toy.title}
                        loading="lazy"
                        decoding="async"
                        className="toy-gray w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500">
                        <h3
                          className={`font-display text-3xl font-black ${toy.color} ${toy.neonClass} uppercase leading-none`}
                        >
                          <ToyTitle toy={toy} />
                        </h3>
                        <p className="text-white text-[10px] font-bold tracking-[0.3em] mt-4 uppercase opacity-80">
                          {toy.info}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
