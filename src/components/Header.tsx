import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
// Switched from ShoppingBag to ShoppingCart
import {
  SiInstagram,
  SiYoutube,
  SiX,
  SiBehance,
  SiBluesky,
} from "@icons-pack/react-simple-icons";
import { Menu, X, ShoppingCart, ExternalLink } from "lucide-react";
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

  /** * NEW ADDITION: Shopier URL
   * Centralized link for your Shopier store.
   */
  const SHOPIER_URL = "https://www.shopier.com/dirtcakestudio";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-8 flex justify-between items-start ${isHome ? "" : "bg-white/70 md:bg-white/80 backdrop-blur-md"} pointer-events-none ${isReducedHeader ? "py-4 md:py-6" : "py-4 md:py-6"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col pointer-events-auto"
        >
          <Link to="/" className="group">
            <h1
              className={`font-display font-extrabold text-3xl tracking-tighter ${logoTheme.color} ${logoTheme.neonClass} uppercase transition-all duration-300`}
            >
              Dirtcake
            </h1>
            <div className={isHome ? "mix-blend-difference" : ""}>
              <span
                className={`text-[11px] font-bold tracking-[0.4em] ${isHome ? "text-white" : "text-black"} uppercase`}
              >
                Studio / Istanbul
              </span>
            </div>
          </Link>
        </motion.div>

        <nav
          className={`hidden md:flex gap-14 items-center pointer-events-auto ${isHome ? "mix-blend-difference" : ""}`}
        >
          {/** * NEW ADDITION: Desktop Shopping Cart Icon
           * Placed first in the desktop sequence as requested.
           * Switched to ShoppingCart icon.
           */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <a
              href={SHOPIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-neon-coral ${isHome ? "text-white" : "text-black"}`}
              aria-label="Shop"
            >
              <ShoppingCart size={20} />
            </a>
          </motion.div>

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

        {/* FIX: Removed mix-blend-difference from the mobile toggle and gave it 
          the logoTheme color. This ensures the icon is always visible regardless 
          of background colors or width changes.
        */}
        <div className="md:hidden pointer-events-auto flex items-center gap-4">
          {/** * NEW ADDITION: Mobile Shopping Cart Icon
           * Switched to ShoppingCart icon.
           */}
          <a
            href={SHOPIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${logoTheme.color} ${logoTheme.neonClass}`}
          >
            <ShoppingCart size={24} />
          </a>

          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu
              size={28}
              className={`${logoTheme.color} ${logoTheme.neonClass} cursor-pointer transition-colors`}
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

              {/** * NEW ADDITION: Mobile Shop Link
               * Large text link inside the mobile menu overlay with ShoppingCart icon.
               */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navItems.length }}
              >
                <a
                  href={SHOPIER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl font-display font-black tracking-tight text-black uppercase hover:text-neon-yellow transition-colors flex items-center gap-4"
                >
                  Shop <ShoppingCart size={32} />
                </a>
              </motion.div>
            </nav>

            <div className="mt-auto pt-10 border-t border-black/10">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 mb-4">
                Connect with us
              </p>
              <div className="flex gap-10">
                <a
                  href="https://www.instagram.com/dirtcakestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-pink transition-colors"
                >
                  <SiInstagram size={20} />
                </a>
                <a
                  href="https://x.com/dirtcakestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-pink transition-colors"
                >
                  <SiX size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
