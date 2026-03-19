import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TOYS, NEON_COLORS } from "../constants";

export default function Home() {
  const [indices, setIndices] = useState(() => {
    const first = Math.floor(Math.random() * TOYS.length);
    let second;
    do {
      second = Math.floor(Math.random() * TOYS.length);
    } while (second === first && TOYS.length > 1);

    const color1 = Math.floor(Math.random() * NEON_COLORS.length);
    let color2;
    do {
      color2 = Math.floor(Math.random() * NEON_COLORS.length);
    } while (color2 === color1 && NEON_COLORS.length > 1);

    return {
      left: first,
      right: second,
      leftColor: NEON_COLORS[color1],
      rightColor: NEON_COLORS[color2],
    };
  });
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndices((prev) => {
        const nextLeft = Math.floor(Math.random() * TOYS.length);
        let nextRight;
        do {
          nextRight = Math.floor(Math.random() * TOYS.length);
        } while (nextRight === nextLeft && TOYS.length > 1);

        const nextColor1 = Math.floor(Math.random() * NEON_COLORS.length);
        let nextColor2;
        do {
          nextColor2 = Math.floor(Math.random() * NEON_COLORS.length);
        } while (nextColor2 === nextColor1 && NEON_COLORS.length > 1);

        return {
          left: nextLeft,
          right: nextRight,
          leftColor: NEON_COLORS[nextColor1],
          rightColor: NEON_COLORS[nextColor2],
        };
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const leftToy = TOYS[indices.left];
  const rightToy = TOYS[indices.right];
  const leftColor = indices.leftColor;
  const rightColor = indices.rightColor;

  return (
    <div className="flex-[2_0_0%] flex flex-col bg-white min-h-[50vh] md:min-h-[80vh] max-md:landscape:min-h-[110vh]">
      <main
        className="flex-1 relative flex flex-col justify-center px-3 pt-2 md:pt-3 pb-20 md:pb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex">
            {/* Left Fragment */}
            <div className="absolute inset-0 z-10 diagonal-split overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={leftToy.id}
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
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-[35%] translate-y-[-50%] left-6 z-30 pointer-events-none md:top-[40%] md:left-16">
                      <motion.h2
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className={`font-display text-2xl md:text-6xl lg:text-8xl font-black ${leftColor.color} ${leftColor.neonClass} uppercase leading-none`}
                      >
                        {leftToy.title}
                        <br />
                        {leftToy.subtitle}
                      </motion.h2>
                      {/* ANIMATED INFO TEXT */}
                      <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 0.7, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="text-white text-[9px] font-bold tracking-[0.3em] mt-2 md:mt-6 uppercase"
                      >
                        {formatInfo(leftToy.info)}
                      </motion.p>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Fragment */}
            <div className="absolute inset-0 z-0 diagonal-split-reverse overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={rightToy.id}
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
                      className="w-full h-full lg:w-[70%] lg:h-auto lg:max-h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-[60%] translate-y-[-50%] right-6 z-30 text-right pointer-events-none md:top-[65%] md:right-16">
                      <motion.h2
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className={`font-display text-2xl md:text-6xl lg:text-8xl font-black ${rightColor.color} ${rightColor.neonClass} uppercase leading-none`}
                      >
                        {rightToy.title}
                        <br />
                        {rightToy.subtitle}
                      </motion.h2>
                      {/* ANIMATED INFO TEXT */}
                      <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 0.7, x: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="text-white text-[9px] font-bold tracking-[0.3em] mt-2 md:mt-6 uppercase"
                      >
                        {formatInfo(rightToy.info)}
                      </motion.p>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Button stays the same */}
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
