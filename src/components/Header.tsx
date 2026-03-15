import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NEON_COLORS } from "../constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProjectDetail = location.pathname.startsWith("/project/");
  const isReducedHeader =
    !isHome &&
    (["/gallery", "/about", "/contact"].includes(location.pathname) ||
      isProjectDetail);

  const logoTheme = useMemo(() => {
    return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
  }, []);

  const navItems = [
    { name: "Gallery", path: "/gallery", hover: "hover:text-neon-green" },
    { name: "About", path: "/about", hover: "hover:text-neon-blue" },
    { name: "Contact", path: "/contact", hover: "hover:text-neon-pink" },
  ];

  return (
    <>
      {/* Removed mix-blend-difference from the main header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-8 flex justify-between items-start ${isHome ? "" : "bg-white/70 md:bg-white/80 backdrop-blur-md"} pointer-events-none ${isReducedHeader ? "py-4 md:py-6" : "py-4 md:py-10"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col pointer-events-auto"
        >
          <Link to="/" className="group">
            {/* Logo remains at 100% opacity with no blend mode */}
            <h1
              className={`font-display font-extrabold text-3xl tracking-tighter ${logoTheme.color} ${logoTheme.neonClass} uppercase transition-all duration-300`}
            >
              Dirtcake
            </h1>
            {/* Difference effect applied only to sub-text */}
            <div className={isHome ? "mix-blend-difference" : ""}>
              <span
                className={`text-[11px] font-bold tracking-[0.4em] ${isHome ? "text-white" : "text-black"} uppercase`}
              >
                Studio / Istanbul
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Navigation items wrapped in difference effect when on Home */}
        <nav
          className={`hidden md:flex gap-14 items-center pointer-events-auto ${isHome ? "mix-blend-difference" : ""}`}
        >
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                to={item.path}
                className={`text-xs font-bold tracking-[0.2em] ${isHome ? "text-white" : "text-black"} uppercase transition-colors ${item.hover}`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Menu button also wrapped in difference */}
        <div
          className={`md:hidden pointer-events-auto ${isHome ? "mix-blend-difference" : ""}`}
        >
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu
              size={24}
              className={`${isHome ? "text-white" : "text-black"} cursor-pointer hover:text-neon-green transition-colors`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-20 landscape:mb-8">
              <div className="flex flex-col">
                <h1
                  className={`font-display font-extrabold text-3xl tracking-tighter ${logoTheme.color} ${logoTheme.neonClass} uppercase`}
                >
                  Dirtcake
                </h1>
                <span className="text-[11px] font-bold tracking-[0.4em] text-black uppercase">
                  Studio / Istanbul
                </span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X
                  size={32}
                  className="text-black hover:text-neon-pink transition-colors"
                />
              </button>
            </div>

            <nav className="flex flex-col gap-12 landscape:gap-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-display font-black tracking-tight text-black uppercase hover:text-neon-green transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-black/10">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 mb-4">
                Connect with us
              </p>
              <div className="flex gap-8">
                <span className="text-xs font-bold tracking-[0.2em] uppercase hover:text-neon-pink cursor-pointer">
                  Instagram
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
