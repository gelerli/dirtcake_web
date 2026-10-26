import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { TOYS, NEON_COLORS } from "../constants";
import { isAvailable } from "../helpers";
import Seo from "../components/Seo";
import ToyTitle from "../components/ToyTitle";
import NotFound from "./NotFound";
import { projectMeta, toyName } from "../seo";
import { EMAIL, SOCIAL_URLS } from "../site";
import { shuffle, pick } from "../utils";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const reducedMotion = useReducedMotion();

  const toy = useMemo(() => TOYS.find((t) => t.slug === slug), [slug]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset the carousel when moving to another project.
  useEffect(() => setActiveImageIndex(0), [slug]);

  // Computed during render (no empty first paint / layout jump).
  const randomProjects = useMemo(
    () => shuffle(TOYS.filter((t) => t.slug !== slug)).slice(0, 4),
    [slug],
  );

  const toyWithColor = useMemo(
    () => (toy ? { ...toy, ...pick(NEON_COLORS) } : null),
    [toy],
  );

  const projectsWithColors = useMemo(() => {
    const palette = shuffle(NEON_COLORS);
    return randomProjects.map((p, idx) => ({
      ...p,
      ...palette[idx % palette.length],
    }));
  }, [randomProjects]);

  const projectImages = toy ? toy.galleryImages : [];
  const projectAlts = toy ? toy.galleryAlt : [];

  useEffect(() => {
    if (projectImages.length <= 1 || isTimerPaused || reducedMotion) return;
    const baseInterval = 9000;
    const delay = isHovered ? baseInterval + 4000 : baseInterval;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
    }, delay);
    return () => clearInterval(interval);
  }, [projectImages.length, isHovered, isTimerPaused, reducedMotion]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (!toy || !toyWithColor) {
    return <NotFound heading="PROJECT NOT FOUND" />;
  }

  const handleManualNav = (action: () => void) => {
    action();
    setIsTimerPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsTimerPaused(false), 5000);
  };

  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
  const prevImage = () =>
    setActiveImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );

  const name = toyName(toy);
  const hasEditionCount = toy.edition.trim() !== "-";
  const editionLabel = hasEditionCount ? toy.editioninfo : "EDITION";
  const editionValue = hasEditionCount ? toy.edition : toy.editioninfo;
  const labelClass =
    "text-[10px] font-bold tracking-[0.3em] uppercase text-black/60 block mb-2";

  return (
    <div className="flex-grow bg-white pt-32 md:pt-32 flex flex-col">
      <Seo {...projectMeta(toy)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex-grow pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="flex flex-col gap-6">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={`${name} photos`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              className="relative aspect-[4/5] overflow-hidden bg-black/5 group"
            >
              <motion.div
                className="flex h-full w-full"
                animate={{ x: `-${activeImageIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {projectImages.map((img, idx) => (
                  <div
                    key={img}
                    aria-hidden={idx !== activeImageIndex}
                    className="w-full h-full flex-shrink-0"
                  >
                    <img
                      src={img}
                      alt={projectAlts[idx] || `${name} view ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none opacity-30 md:opacity-0 md:group-hover:opacity-50 md:focus-within:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleManualNav(prevImage)}
                  type="button"
                  aria-label="Previous image"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleManualNav(nextImage)}
                  type="button"
                  aria-label="Next image"
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors shadow-lg pointer-events-auto"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Position dots (decorative; the thumbnails below are the accessible controls) */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none"
              >
                {projectImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block h-1.5 transition-all duration-500 rounded-full ${
                      idx === activeImageIndex
                        ? "w-8 bg-white shadow-sm"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {projectImages.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  aria-label={`Show image ${idx + 1} of ${projectImages.length}`}
                  aria-current={idx === activeImageIndex}
                  onClick={() => handleManualNav(() => setActiveImageIndex(idx))}
                  className={`relative w-24 aspect-square flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${idx === activeImageIndex ? "border-black" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  {/* Decorative: the button already has a name, and the full alt lives on the main image */}
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    decoding="async"
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
              <span className="text-xs font-bold tracking-[0.5em] uppercase text-black/60 mb-4 block">
                {toy.info}
              </span>
              <h1
                className={`font-display text-6xl md:text-8xl font-black uppercase leading-none mb-8 ${toyWithColor.color} ${toyWithColor.neonClass}`}
              >
                <ToyTitle toy={toy} />
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div className="max-w-md">
                <p className="text-xl leading-relaxed text-black/75 font-medium">
                  {toy.description}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-8 border-t border-black/5 pt-12">
                <div>
                  <dt className={labelClass}>YEAR</dt>
                  <dd className="text-sm font-bold uppercase">{toy.year}</dd>
                </div>
                <div>
                  <dt className={labelClass}>MATERIAL</dt>
                  <dd className="text-sm font-bold uppercase">{toy.material}</dd>
                </div>
                <div>
                  <dt className={labelClass}>{editionLabel}</dt>
                  <dd className="text-sm font-bold uppercase">{editionValue}</dd>
                </div>
              </dl>

              {isAvailable(toy) && (
                <div className="border-t border-black/5 pt-8 max-w-md">
                  <p className="text-sm font-medium text-black/70 leading-relaxed mb-5">
                    Some pieces are sold only through physical shops. Tell us
                    what you&apos;re after and we&apos;ll point you to where you
                    can get it.
                  </p>
                  <Link
                    to={`/contact?piece=${toy.slug}`}
                    className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.3em] uppercase hover:bg-neon-green hover:text-black transition-colors duration-300 group"
                  >
                    Ask where to get it
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <p className="mt-5 text-[11px] font-bold tracking-[0.2em] uppercase text-black/60">
                    Or{" "}
                    <a
                      href={SOCIAL_URLS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-neon-pink transition-colors"
                    >
                      DM us on Instagram
                    </a>{" "}
                    ·{" "}
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent(name)}`}
                      className="underline underline-offset-4 hover:text-neon-pink transition-colors"
                    >
                      email
                    </a>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="border-t border-black/5 pt-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-black/60 block mb-4">
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
                    alt={project.coverAlt || project.title}
                    loading="lazy"
                    decoding="async"
                    className="toy-gray w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                    <h3
                      className={`font-display text-lg sm:text-xl md:text-2xl font-black ${project.color} ${project.neonClass} uppercase leading-none`}
                    >
                      <ToyTitle toy={project} />
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
