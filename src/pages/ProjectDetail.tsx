import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOYS, NEON_COLORS, Toy } from "../constants";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const toy = useMemo(() => TOYS.find((t) => t.slug === slug), [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [randomProjects, setRandomProjects] = useState<Toy[]>([]);

  useEffect(() => {
    // SCROLL LOGIC REMOVED: Now handled centrally by ScrollToTop.tsx

    // Reset state for the new project view
    setActiveImageIndex(0);
    const others = TOYS.filter((t) => t.slug !== slug);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    setRandomProjects(shuffled.slice(0, 4));
  }, [slug]);

  const toyWithColor = useMemo(() => {
    if (!toy) return null;
    return {
      ...toy,
      ...NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    };
  }, [toy]);

  const projectsWithColors = useMemo(() => {
    const shuffledColors = [...NEON_COLORS].sort(() => 0.5 - Math.random());
    return randomProjects.map((p, idx) => ({
      ...p,
      ...shuffledColors[idx % shuffledColors.length],
    }));
  }, [randomProjects]);

  const projectImages = toy ? toy.galleryImages : [];
  const projectAlts = toy ? toy.galleryAlt : [];

  useEffect(() => {
    if (projectImages.length <= 1 || isTimerPaused) return;
    const baseInterval = 9000;
    const currentDelay = isHovered ? baseInterval + 4000 : baseInterval;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
    }, currentDelay);
    return () => clearInterval(interval);
  }, [projectImages.length, isHovered, isTimerPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (!toy || !toyWithColor) {
    return (
      <div className="flex-grow flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black mb-4">
            PROJECT NOT FOUND
          </h1>
          <Link to="/gallery" className="text-neon-blue hover:underline">
            BACK TO GALLERY
          </Link>
        </div>
      </div>
    );
  }

  const handleManualNav = (action: () => void) => {
    action();
    setIsTimerPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsTimerPaused(false);
    }, 5000);
  };

  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
  const prevImage = () =>
    setActiveImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );

  return (
    <div className="flex-grow bg-white pt-32 md:pt-32 flex flex-col">
      <Helmet>
        <title>{`${toy.title} ${toy.subtitle} | Dirtcake Studio`}</title>
        <link
          rel="canonical"
          href={`https://www.dirtcakestudio.com/project/${toy.slug}`}
        />
        <meta name="description" content={toy.description.substring(0, 160)} />
        <meta
          property="og:title"
          content={`${toy.title} - ${toy.subtitle} | Dirtcake Studio`}
        />
        <meta
          property="og:description"
          content={toy.description.substring(0, 160)}
        />
        <meta
          property="og:image"
          content={`https://dirtcakestudio.com${toy.coverImage}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${toy.title} - ${toy.subtitle}`} />
        <meta
          name="twitter:description"
          content={toy.description.substring(0, 160)}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex-grow pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="flex flex-col gap-6">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-[4/5] overflow-hidden bg-black/5 group"
            >
              <motion.div
                className="flex h-full w-full"
                animate={{ x: `-${activeImageIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {projectImages.map((img, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0">
                    <img
                      src={img}
                      alt={projectAlts[idx] || `${toy.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none opacity-30 md:opacity-0 md:group-hover:opacity-50 transition-opacity duration-300">
                <button
                  onClick={() => handleManualNav(prevImage)}
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => handleManualNav(nextImage)}
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {projectImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      handleManualNav(() => setActiveImageIndex(idx))
                    }
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      idx === activeImageIndex
                        ? "w-8 bg-white shadow-sm"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Switch to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {projectImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    handleManualNav(() => setActiveImageIndex(idx))
                  }
                  className={`relative w-24 aspect-square flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${idx === activeImageIndex ? "border-black" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt={
                      projectAlts[idx]
                        ? `Thumbnail: ${projectAlts[idx]}`
                        : `Thumbnail ${idx + 1}`
                    }
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-bold tracking-[0.5em] uppercase text-black/30 mb-4 block">
                {toy.info}
              </span>
              <h1
                className={`font-display text-6xl md:text-8xl font-black uppercase leading-none mb-8 ${toyWithColor.color} ${toyWithColor.neonClass}`}
              >
                {toy.title}
                <br />
                {toy.subtitle}
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div className="max-w-md">
                <p className="text-xl leading-relaxed text-black/70 font-medium">
                  {toy.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-12">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 block mb-2">
                    YEAR
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {toy.year}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 block mb-2">
                    MATERIAL
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {toy.material}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 block mb-2">
                    {toy.editioninfo}
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {toy.edition}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="border-t border-black/5 pt-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-black/30 block mb-4">
                DISCOVER MORE
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase">
                OTHER PROJECTS
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold tracking-[0.3em] uppercase hover:underline mb-2"
            >
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-2 landscape:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {projectsWithColors.map((project, idx) => (
              <Link
                key={project.id}
                to={`/project/${project.slug}`}
                className={
                  idx === 3
                    ? "landscape:hidden md:hidden lg:block"
                    : idx === 2
                      ? "md:hidden lg:block"
                      : ""
                }
              >
                <div className="group relative aspect-[3/4] overflow-hidden bg-black cursor-pointer">
                  <img
                    src={project.coverImage}
                    /* MODIFIED: Using coverAlt for keyword consistency in suggestions */
                    alt={project.coverAlt || project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <h3
                      className={`font-display text-lg sm:text-xl md:text-2xl font-black ${project.color} ${project.neonClass} uppercase leading-none`}
                    >
                      {project.title}
                      <br />
                      {project.subtitle}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
