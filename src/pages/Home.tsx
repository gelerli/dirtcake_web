import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";

export default function Home() {
  // --- 1. STATE INITIALIZATION ---
  const [indices, setIndices] = useState(() => {
    const first = Math.floor(Math.random() * TOYS.length);
    let second;
    do {
      second = Math.floor(Math.random() * TOYS.length);
    } while (second === first && TOYS.length > 1);

    const colorIndices = [...Array(NEON_COLORS.length).keys()].sort(
      () => Math.random() - 0.5,
    );

    return {
      left: first,
      right: second,
      leftColor: NEON_COLORS[colorIndices[0]],
      rightColor: NEON_COLORS[colorIndices[1]],
      loaderColor: NEON_COLORS[colorIndices[2]],
      version: 0,
    };
  });

  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const DURATION = 7000;
  const FADE_DURATION_MS = 1500;
  const INTERVAL = 50;

  /**
   * handleTouchEnd
   * Fixes the mobile "freeze" by manually triggering a hover-off state
   * when the user stops touching the screen.
   */
  const handleTouchEnd = () => {
    setTimeout(() => setIsHovered(false), 100);
  };

  /**
   * --- 2. SHUFFLE LOGIC ---
   * Strictly filters the current toy out of the pool for each fragment
   * to prevent a toy from transitioning into itself.
   */
  const triggerNext = useCallback(() => {
    setIsFading(false);
    setIndices((prev) => {
      const allIndices = Array.from(TOYS.keys());

      const leftPool = allIndices.filter((idx) => idx !== prev.left);
      const nextLeft = leftPool[Math.floor(Math.random() * leftPool.length)];

      const rightPool = allIndices.filter(
        (idx) => idx !== prev.right && idx !== nextLeft,
      );

      const finalRightPool =
        rightPool.length > 0
          ? rightPool
          : allIndices.filter((idx) => idx !== nextLeft);

      const nextRight =
        finalRightPool[Math.floor(Math.random() * finalRightPool.length)];

      const colorIndices = [...Array(NEON_COLORS.length).keys()].sort(
        () => Math.random() - 0.5,
      );

      return {
        left: nextLeft,
        right: nextRight,
        leftColor: NEON_COLORS[colorIndices[0]],
        rightColor: NEON_COLORS[colorIndices[1]],
        loaderColor: NEON_COLORS[colorIndices[2]],
        version: prev.version + 1,
      };
    });
    setProgress(0);
  }, []);

  // --- 3. THE TIMER EFFECT ---
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isHovered) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + (INTERVAL / DURATION) * 100;
          const fadeThreshold =
            ((DURATION - FADE_DURATION_MS) / DURATION) * 100;

          if (nextProgress >= fadeThreshold) {
            setIsFading(true);
          }

          if (nextProgress >= 100) {
            triggerNext();
            return 0;
          }
          return nextProgress;
        });
      }, INTERVAL);
    }

    return () => clearInterval(timer);
  }, [isHovered, triggerNext, DURATION, FADE_DURATION_MS]);

  const leftToy = TOYS[indices.left];
  const rightToy = TOYS[indices.right];

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
      <main
        className="flex-1 relative flex flex-col justify-center px-3 pt-2 md:pt-3 pb-20 md:pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 relative overflow-hidden">
          {/* --- NEON LOADER --- */}
          <div className="absolute inset-0 z-40 pointer-events-none">
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
                    initial={{ y: 100 }}
                    animate={{ y: 100 - progress }}
                    transition={{ ease: "linear", duration: 0.1 }}
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

          <div className="absolute inset-0 flex">
            {/* --- LEFT FRAGMENT --- */}
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
                    {/* Fixed Height: 'h-full w-full' ensures it fills the diagonal fragment container */}
                    <img
                      src={leftToy.coverImage}
                      alt={leftToy.title}
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
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
                        {leftToy.title}
                        <br />
                        {leftToy.subtitle}
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

            {/* --- RIGHT FRAGMENT --- */}
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
                    {/* Fixed Height: 'h-full w-full' ensures it fills the reverse diagonal fragment container */}
                    <img
                      src={rightToy.coverImage}
                      alt={rightToy.title}
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
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
                        {rightToy.title}
                        <br />
                        {rightToy.subtitle}
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
      </main>

      <Link to="/gallery">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[90px] md:bottom-25 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-15 bg-black text-white px-10 py-5 flex items-center gap-4 shadow-2xl group z-50 rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 whitespace-nowrap"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase">
            {" "}
            EXPLORE{" "}
          </span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform text-neon-green group-hover:text-black"
          />
        </motion.button>
      </Link>
    </div>
  );
}
