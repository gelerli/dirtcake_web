import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";

export default function Home() {
  // --- 1. STATE INITIALIZATION ---
  const [indices, setIndices] = useState(() => {
    // Pick a random starting index for the left fragment
    const first = Math.floor(Math.random() * TOYS.length);
    let second;
    // Ensure the right fragment isn't the same as the left on first load
    do {
      second = Math.floor(Math.random() * TOYS.length);
    } while (second === first && TOYS.length > 1);

    // Shuffle neon colors so left, right, and the loader all get different colors
    const colorIndices = [...Array(NEON_COLORS.length).keys()].sort(
      () => Math.random() - 0.5,
    );

    return {
      left: first,
      right: second,
      leftColor: NEON_COLORS[colorIndices[0]],
      rightColor: NEON_COLORS[colorIndices[1]],
      loaderColor: NEON_COLORS[colorIndices[2]],
      // 'version' acts as a unique key suffix. This forces Framer Motion to
      // see a "new" component even if the ID remains the same, ensuring 100% reliable transitions.
      version: 0,
    };
  });

  // --- 2. ANIMATION SETTINGS ---
  const [isHovered, setIsHovered] = useState(false); // Pauses everything when true
  const [progress, setProgress] = useState(0); // Percentage (0-100) of the current cycle
  const [isFading, setIsFading] = useState(false); // Trigger for the text opacity fade

  // ADJUST THESE VALUES TO CHANGE TIMING:
  const DURATION = 7000; // Total time each project stays visible (7 seconds)
  const FADE_DURATION_MS = 1500; // How many ms BEFORE the slide the text starts fading (1.5 seconds)
  const INTERVAL = 50; // Frequency of progress updates (lower = smoother bar)

  /**
   * --- 3. CORE LOGIC: triggerNext ---
   * This handles the "Slide" phase. It picks the next items and resets the fade.
   */
  const triggerNext = useCallback(() => {
    setIsFading(false); // Reset text to visible for the next project pair
    setIndices((prev) => {
      const allIndices = Array.from(TOYS.keys());

      // Filter the pool to guarantee the next Left isn't the same as current Left
      const leftPool = allIndices.filter((idx) => idx !== prev.left);
      const nextLeft = leftPool[Math.floor(Math.random() * leftPool.length)];

      // Filter the pool to guarantee next Right isn't the same as current Right OR new Left
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
        version: prev.version + 1, // Change version to force the AnimatePresence slide
      };
    });
    setProgress(0); // Restart progress bar at 0%
  }, []);

  /**
   * --- 4. THE TIMER EFFECT ---
   * This loop runs every 50ms. It calculates the progress and decides when to start the fade.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Only run the timer if the user's mouse is NOT hovering over the gallery
    if (!isHovered) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + (INTERVAL / DURATION) * 100;

          // CALCULATE FADE THRESHOLD:
          // We convert FADE_DURATION_MS into a percentage of the total DURATION.
          // Example: If FADE is 2s and DURATION is 7s, threshold is ~71.4%
          const fadeThreshold =
            ((DURATION - FADE_DURATION_MS) / DURATION) * 100;

          if (nextProgress >= fadeThreshold) {
            setIsFading(true); // Trigger the opacity change on the text
          }

          if (nextProgress >= 100) {
            triggerNext(); // Progress reached 100%, perform the slide
            return 0;
          }
          return nextProgress;
        });
      }, INTERVAL);
    }

    // Clean up the interval when the component unmounts or hover state changes
    return () => clearInterval(timer);
  }, [isHovered, triggerNext, DURATION, FADE_DURATION_MS]);

  // --- 5. DATA MAPPING ---
  const leftToy = TOYS[indices.left];
  const rightToy = TOYS[indices.right];

  // Formatting helper to break long subtitle/info strings into multiple lines
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
        onMouseEnter={() => setIsHovered(true)} // Pauses progress and keeps text visible
        onMouseLeave={() => setIsHovered(false)} // Resumes progress and potential fade
      >
        <div className="flex-1 relative overflow-hidden">
          {/* --- NEON LOADER (DIAGONAL LINE) --- */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <mask id="loader-mask">
                  {/* This rect moves to 'uncover' the neon line based on progress percentage */}
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
              {/* Static faint path (the track) */}
              <path
                d="M 35 100 L 65 0"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                fill="none"
                className={`${indices.loaderColor.color} opacity-30 transition-colors duration-1000`}
              />
              {/* Dynamic glowing path (the progress) */}
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
            {/* --- LEFT FRAGMENT (Slides Up on Exit) --- */}
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
                      alt={leftToy.title}
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
                    />

                    {/* LEFT TEXT BOX: Linked to isFading state for pre-slide transparency */}
                    <motion.div
                      animate={{ opacity: isFading ? 0 : 1 }}
                      // The duration here (1.5) controls how 'smooth' the fade out feels
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

            {/* --- RIGHT FRAGMENT (Slides Down on Exit) --- */}
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
                      alt={rightToy.title}
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 tablet-portrait-only"
                    />

                    {/* RIGHT TEXT BOX: Linked to isFading state for pre-slide transparency */}
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
      <Link to="/gallery">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[100px] md:bottom-25 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-15 bg-black text-white px-10 py-5 flex items-center gap-4 shadow-2xl group z-50 rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 whitespace-nowrap"
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
