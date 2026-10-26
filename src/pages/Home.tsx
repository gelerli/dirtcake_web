import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS, Toy } from "../constants";
import Seo from "../components/Seo";
import ToyTitle from "../components/ToyTitle";
import { PAGE_META } from "../seo";

// Link that can carry motion props (avoids nesting a <button> inside an <a>).
const MotionLink = motion.create(Link);

const DURATION = 7000; // time per pair of toys
const FADE_DURATION_MS = 1500; // text starts fading this long before the switch
const FADE_AT = ((DURATION - FADE_DURATION_MS) / DURATION) * 100;

const shuffledColorIndices = () =>
  [...Array(NEON_COLORS.length).keys()].sort(() => Math.random() - 0.5);

export default function Home() {
  // Two unique random toys and three random neon colours, chosen once on load.
  const [indices, setIndices] = useState(() => {
    const first = Math.floor(Math.random() * TOYS.length);
    let second;
    do {
      second = Math.floor(Math.random() * TOYS.length);
    } while (second === first && TOYS.length > 1);
    const c = shuffledColorIndices();
    return {
      left: first,
      right: second,
      leftColor: NEON_COLORS[c[0]],
      rightColor: NEON_COLORS[c[1]],
      loaderColor: NEON_COLORS[c[2]],
      version: 0, // key that retriggers the slide animations
    };
  });

  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false); // pauses while the user interacts
  const [isPaused, setIsPaused] = useState(false); // explicit pause button
  const progressRef = useRef(0); // 0–100, not React state
  const maskY = useMotionValue(100); // drives the SVG mask without re-rendering
  const [isFadingState, setIsFadingState] = useState(false); // flips once per cycle

  // Respect "reduce motion": don't auto-rotate unless the user presses play.
  useEffect(() => {
    if (reducedMotion) setIsPaused(true);
  }, [reducedMotion]);

  // Mobile "touch" counts as hover; resume shortly after the finger lifts.
  const handleTouchEnd = () => setTimeout(() => setIsHovered(false), 100);

  const triggerNext = useCallback(() => {
    setIndices((prev) => {
      const all = Array.from(TOYS.keys());
      const leftPool = all.filter((i) => i !== prev.left);
      const nextLeft = leftPool[Math.floor(Math.random() * leftPool.length)];
      const rightPool = all.filter((i) => i !== prev.right && i !== nextLeft);
      const finalRightPool =
        rightPool.length > 0 ? rightPool : all.filter((i) => i !== nextLeft);
      const nextRight =
        finalRightPool[Math.floor(Math.random() * finalRightPool.length)];
      const c = shuffledColorIndices();
      return {
        left: nextLeft,
        right: nextRight,
        leftColor: NEON_COLORS[c[0]],
        rightColor: NEON_COLORS[c[1]],
        loaderColor: NEON_COLORS[c[2]],
        version: prev.version + 1,
      };
    });
    progressRef.current = 0;
    maskY.set(100);
    setIsFadingState(false);
  }, [maskY]);

  useEffect(() => {
    if (isHovered || isPaused) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100); // clamp so a background tab doesn't jump
      last = now;
      progressRef.current = Math.min(100, progressRef.current + (dt / DURATION) * 100);
      maskY.set(100 - progressRef.current);

      const fading = progressRef.current >= FADE_AT;
      setIsFadingState((prev) => (prev === fading ? prev : fading)); // no re-render if unchanged

      if (progressRef.current >= 100) triggerNext(); // resets the ref and mask
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, isPaused, triggerNext, maskY]);

  const isFading = !isHovered && isFadingState;

  const leftToy: Toy = TOYS[indices.left];
  const rightToy: Toy = TOYS[indices.right];

  // Breaks long info lines into two so they stay inside the diagonal.
  const formatInfo = (info: string) => {
    const words = info.split(" ");
    if (words.length > 3) {
      return (
        <>
          {words.slice(0, 3).join(" ")}
          <br />
          {words.slice(3).join(" ")}
        </>
      );
    }
    return info;
  };

  return (
    <div className="flex-[2_0_0%] flex flex-col bg-white min-h-[50vh] md:min-h-[80vh] max-md:landscape:min-h-[110vh]">
      <Seo {...PAGE_META.home} />
      <h1 className="sr-only">
        Dirtcake Studio — limited edition designer toys and collectibles from Istanbul
      </h1>

      <div
        className="flex-1 relative flex flex-col justify-center px-3 pt-2 md:pt-3 pb-20 md:pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 relative overflow-hidden">
          {/* NEON LOADER (diagonal progress line) */}
          <div className="absolute inset-0 z-40 pointer-events-none" aria-hidden="true">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <mask id="loader-mask">
                  <motion.rect
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    fill="white"
                    style={{ y: maskY }}
                  />
                </mask>
              </defs>
              <path
                d="M 35 100 L 65 0"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                fill="none"
                className={`${indices.loaderColor.color} opacity-30 transition-colors duration-1000`}
              />
              <path
                d="M 35 100 L 65 0"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                fill="none"
                mask="url(#loader-mask)"
                style={{ filter: `drop-shadow(0 0 7px currentColor)` }}
                className={`${indices.loaderColor.color} transition-colors duration-1000`}
              />
            </svg>
          </div>

          {/* Pause / play (WCAG 2.2.2) */}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            className="absolute bottom-4 left-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>

          <div className="absolute inset-0 flex">
            {/* LEFT FRAGMENT */}
            <div className="absolute inset-0 z-10 diagonal-split overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`left-${leftToy.id}-${indices.version}`}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 group cursor-pointer"
                >
                  <Link
                    to={`/project/${leftToy.slug}`}
                    className="absolute inset-0 z-30 flex lg:items-center lg:justify-start"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-20" />
                    <img
                      src={leftToy.coverImage}
                      alt={leftToy.coverAlt}
                      fetchPriority="high"
                      decoding="async"
                      className="toy-gray w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
                    />
                    <motion.div
                      animate={{ opacity: isFading ? 0 : 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute top-[35%] translate-y-[-50%] left-6 z-30 pointer-events-none md:top-[40%] md:left-16"
                    >
                      <motion.h2
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className={`font-display text-2xl md:text-4xl lg:text-7xl font-black ${indices.leftColor.color} ${indices.leftColor.neonClass} uppercase leading-none`}
                      >
                        <ToyTitle toy={leftToy} />
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 0.7, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="text-white text-[9px] font-bold tracking-[0.3em] mt-2 md:mt-6 uppercase"
                      >
                        {formatInfo(leftToy.info)}
                      </motion.p>
                    </motion.div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT FRAGMENT */}
            <div className="absolute inset-0 z-0 diagonal-split-reverse overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`right-${rightToy.id}-${indices.version}`}
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 group cursor-pointer"
                >
                  <Link
                    to={`/project/${rightToy.slug}`}
                    className="absolute inset-0 z-30 flex lg:items-center lg:justify-end"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-20" />
                    <img
                      src={rightToy.coverImage}
                      alt={rightToy.coverAlt}
                      fetchPriority="high"
                      decoding="async"
                      className="toy-gray w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
                    />
                    <motion.div
                      animate={{ opacity: isFading ? 0 : 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute top-[60%] translate-y-[-50%] right-6 z-30 text-right pointer-events-none md:top-[65%] md:right-16"
                    >
                      <motion.h2
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className={`font-display text-2xl md:text-4xl lg:text-7xl font-black ${indices.rightColor.color} ${indices.rightColor.neonClass} uppercase leading-none`}
                      >
                        <ToyTitle toy={rightToy} />
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 0.7, x: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="text-white text-[9px] font-bold tracking-[0.3em] mt-2 md:mt-6 uppercase"
                      >
                        {formatInfo(rightToy.info)}
                      </motion.p>
                    </motion.div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* EXPLORE (a single link; no button nested inside an anchor) */}
      <MotionLink
        to="/gallery"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-15 md:bottom-25 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-15 bg-black text-white px-10 py-5 flex items-center gap-4 shadow-2xl group z-50 rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 whitespace-nowrap"
      >
        <span className="text-xs font-bold tracking-[0.3em] uppercase">EXPLORE</span>
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="group-hover:translate-x-1 transition-transform text-neon-green group-hover:text-black"
        />
      </MotionLink>
    </div>
  );
}
