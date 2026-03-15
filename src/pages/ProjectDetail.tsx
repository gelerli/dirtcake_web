import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOYS, NEON_COLORS } from "../constants";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Find current toy based on the URL slug
  const toy = useMemo(() => TOYS.find((t) => t.slug === slug), [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Logic to generate "Other Projects" suggestions
  const [randomProjects, setRandomProjects] = useState<typeof TOYS>([]);

  // Update suggestions whenever the slug changes
  useEffect(() => {
    setActiveImageIndex(0);
    const others = TOYS.filter((t) => t.slug !== slug);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    setRandomProjects(shuffled.slice(0, 4));
  }, [slug]);

  // Assign random colors to the main toy and suggestions for the neon effect
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

  // Auto-cycle gallery images with 9s base and 4s hover delay
  useEffect(() => {
    if (projectImages.length <= 1) return;

    const baseInterval = 9000;
    const currentDelay = isHovered ? baseInterval + 4000 : baseInterval;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
    }, currentDelay);

    return () => clearInterval(interval);
  }, [projectImages.length, isHovered]);

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

  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
  const prevImage = () =>
    setActiveImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );

  return (
    <div className="flex-grow bg-white pt-32 md:pt-48 flex flex-col">
      <Helmet>
        <title>{`${toy.title} ${toy.subtitle} | Dirtcake Studio`}</title>
        <meta name="description" content={toy.description} />
        <meta
          property="og:title"
          content={`${toy.title} - Limited Edition Collectible`}
        />
        <meta property="og:description" content={toy.description} />
        <meta property="og:image" content={toy.coverImage} />
        <meta
          property="og:url"
          content={`https://dirtcake.studio/project/${toy.slug}`}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex-grow pb-24">
        {/* Main Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-[4/5] overflow-hidden bg-black/5 group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={projectImages[activeImageIndex]}
                  alt={`${toy.title} view ${activeImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={prevImage}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {projectImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 aspect-square flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${idx === activeImageIndex ? "border-black" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
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
                className={`font-display text-7xl md:text-9xl font-black uppercase leading-none mb-8 ${toyWithColor.color} ${toyWithColor.neonClass}`}
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
                    alt={project.title}
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
