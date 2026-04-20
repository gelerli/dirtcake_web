import React, { useState, useEffect, useCallback } from "react";
// motion handles animations; AnimatePresence allows elements to animate while being removed from the DOM
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// Constants for the toy data and neon color themes
import { TOYS, NEON_COLORS, Toy } from "../constants";
import { Helmet } from "react-helmet-async";

export default function Home() {
  /**
   * --- 1. STATE INITIALIZATION ---
   * This complex initializer runs only once on page load.
   * It picks two unique random toys and three random neon colors.
   */
  const [indices, setIndices] = useState(() => {
    // Pick first random index for the left side
    const first = Math.floor(Math.random() * TOYS.length);
    let second;
    // Ensure the right side is not the same as the left side
    do {
      second = Math.floor(Math.random() * TOYS.length);
    } while (second === first && TOYS.length > 1);

    // Create a shuffled array of available neon colors
    const colorIndices = [...Array(NEON_COLORS.length).keys()].sort(
      () => Math.random() - 0.5,
    );

    return {
      left: first,
      right: second,
      leftColor: NEON_COLORS[colorIndices[0]], // Theme for left text
      rightColor: NEON_COLORS[colorIndices[1]], // Theme for right text
      loaderColor: NEON_COLORS[colorIndices[2]], // Theme for the diagonal line
      version: 0, // Used as a key to trigger Framer Motion animations on change
    };
  });

  // UI States
  const [isHovered, setIsHovered] = useState(false); // Pauses the timer when user interacts
  const [progress, setProgress] = useState(0); // Values 0 to 100 for the visual loader
  const [isFading, setIsFading] = useState(false); // Triggers text fade-out just before transition

  // Timing constants in Milliseconds
  const DURATION = 7000; // Time per toy (7 seconds)
  const FADE_DURATION_MS = 1500; // Text starts fading 1.5s before the switch
  const INTERVAL = 50; // How often the timer updates (smoothness)

  /**
   * handleTouchEnd
   * Solves a common mobile bug where "touch" counts as "hover".
   * This ensures the timer resumes after a user taps/touches the screen.
   */
  const handleTouchEnd = () => {
    setTimeout(() => setIsHovered(false), 100);
  };

  /**
   * --- 2. SHUFFLE LOGIC ---
   * Memoized function to select the next pair of toys.
   * It ensures the new toys are different from the current ones.
   */
  const triggerNext = useCallback(() => {
    setIsFading(false); // Reset fade for the new set
    setIndices((prev) => {
      const allIndices = Array.from(TOYS.keys());

      // Filter pool to avoid repeating the current left toy
      const leftPool = allIndices.filter((idx) => idx !== prev.left);
      const nextLeft = leftPool[Math.floor(Math.random() * leftPool.length)];

      // Filter pool to avoid repeating current right OR the new left
      const rightPool = allIndices.filter(
        (idx) => idx !== prev.right && idx !== nextLeft,
      );

      const finalRightPool =
        rightPool.length > 0
          ? rightPool
          : allIndices.filter((idx) => idx !== nextLeft);

      const nextRight =
        finalRightPool[Math.floor(Math.random() * finalRightPool.length)];

      // Re-shuffle colors for the new set
      const colorIndices = [...Array(NEON_COLORS.length).keys()].sort(
        () => Math.random() - 0.5,
      );

      return {
        left: nextLeft,
        right: nextRight,
        leftColor: NEON_COLORS[colorIndices[0]],
        rightColor: NEON_COLORS[colorIndices[1]],
        loaderColor: NEON_COLORS[colorIndices[2]],
        version: prev.version + 1, // Increment version to trigger new animation cycle
      };
    });
    setProgress(0); // Reset progress bar
  }, []);

  /**
   * --- 3. THE TIMER EFFECT ---
   * This effect manages the 7-second countdown.
   * If the user hovers over the images, the countdown stops.
   */
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (!isHovered) {
      timer = setInterval(() => {
        setProgress((prev) => {
          // Convert current time to a percentage of total DURATION
          const nextProgress = prev + (INTERVAL / DURATION) * 100;

          // Calculate when to start the fade-out effect
          const fadeThreshold =
            ((DURATION - FADE_DURATION_MS) / DURATION) * 100;

          if (nextProgress >= fadeThreshold) {
            setIsFading(true);
          }

          // At 100% progress, trigger the next shuffle
          if (nextProgress >= 100) {
            triggerNext();
            return 0;
          }
          return nextProgress;
        });
      }, INTERVAL);
    }

    // Cleanup: Stops the timer if the component is destroyed
    return () => clearInterval(timer);
  }, [isHovered, triggerNext, DURATION, FADE_DURATION_MS]);

  // Derived variables for cleaner JSX
  const leftToy: Toy = TOYS[indices.left];
  const rightToy: Toy = TOYS[indices.right];

  /**
   * formatInfo
   * Breaks long descriptions into two lines if they exceed 3 words
   * to ensure text stays within the visual diagonal area.
   */
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
    // Main landing container with responsive min-heights
    <div className="flex-[2_0_0%] flex flex-col bg-white min-h-[50vh] md:min-h-[80vh] max-md:landscape:min-h-[110vh]">
      <Helmet>
        <link rel="canonical" href="https://www.dirtcakestudio.com" />
        <meta
          name="description"
          content="Istanbul-based creative studio forging limited-edition designer toys and physical artifacts."
        />
      </Helmet>
      <main
        className="flex-1 relative flex flex-col justify-center px-3 pt-2 md:pt-3 pb-20 md:pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 relative overflow-hidden">
          {/* --- NEON LOADER (The Diagonal Progress Line) --- */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                {/* The mask moves vertically to reveal the glowing version of the line */}
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
              {/* Static background diagonal line (dim) */}
              <path
                d="M 35 100 L 65 0"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                fill="none"
                className={`${indices.loaderColor.color} opacity-30 transition-colors duration-1000`}
              />
              {/* Glowing progress diagonal line (masked) */}
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
            {/* 'diagonal-split' is a CSS clip-path mask */}
            <div className="absolute inset-0 z-10 diagonal-split overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`left-${leftToy.id}-${indices.version}`}
                  initial={{ y: "100%" }} // Slides in from bottom
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }} // Slides out to top
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 group cursor-pointer"
                >
                  <Link
                    to={`/project/${leftToy.slug}`}
                    className="absolute inset-0 z-30 flex lg:items-center lg:justify-start"
                  >
                    {/* Hover overlay that removes the dark tint */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-20" />
                    <img
                      src={leftToy.coverImage}
                      alt={leftToy.coverAlt}
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
                    />
                    {/* Content Container (Title & Subtitle) */}
                    <motion.div
                      animate={{ opacity: isFading ? 0 : 1 }} // Controlled by the DURATION timer
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
            {/* Mirror of the left side, but with reverse clip-path and animations */}
            <div className="absolute inset-0 z-0 diagonal-split-reverse overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`right-${rightToy.id}-${indices.version}`}
                  initial={{ y: "-100%" }} // Slides in from top
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }} // Slides out to bottom
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

      {/* --- EXPLORE BUTTON --- */}
      {/* Fixed-position CTA that hovers over the transitions */}
      <Link to="/gallery">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-15 md:bottom-25 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-15 bg-black text-white px-10 py-5 flex items-center gap-4 shadow-2xl group z-50 rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 whitespace-nowrap"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase">
            EXPLORE
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
