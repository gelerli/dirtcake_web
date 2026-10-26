import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LOGO_COLORS } from "../helpers";
import { SHOPIER_URL } from "../site";
import { SOCIALS } from "../socials";
import { pick } from "../utils";
import { useDialogA11y } from "../hooks/useDialogA11y";
import LegalModal, { type LegalType } from "./LegalModal";

type Theme = { color: string; neonClass: string };

const NAV_ITEMS = [
  { name: "Gallery", path: "/gallery", hover: "hover:text-neon-green" },
  { name: "About", path: "/about", hover: "hover:text-neon-blue" },
  { name: "Contact", path: "/contact", hover: "hover:text-neon-pink" },
];

function MobileMenu({
  theme,
  onClose,
  onLegal,
}: {
  theme: Theme;
  onClose: () => void;
  onLegal: (t: LegalType) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogA11y(ref, true, onClose);
  const legalClass =
    "text-[10px] font-bold tracking-[0.3em] uppercase text-black/60 hover:text-neon-pink transition-colors";

  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col p-8 overflow-y-auto outline-none"
    >
      <div className="flex justify-between items-start mb-20 landscape:mb-8">
        <div className="flex flex-col">
          <span className={`font-display font-extrabold text-3xl tracking-tighter ${theme.color} ${theme.neonClass} uppercase`}>
            Dirtcake
          </span>
          <span className="text-[11px] font-bold tracking-[0.4em] text-black uppercase">
            Studio / Istanbul
          </span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X size={32} className="text-black hover:text-neon-pink transition-colors" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-col gap-12 landscape:gap-4">
        {NAV_ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Link
              to={item.path}
              onClick={onClose}
              className="text-4xl font-display font-black tracking-tight text-black uppercase hover:text-neon-green transition-colors"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * NAV_ITEMS.length }}
        >
          <a
            href={SHOPIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl font-display font-black tracking-tight text-black uppercase hover:text-neon-yellow transition-colors flex items-center gap-4"
          >
            Shop <ShoppingCart size={32} aria-hidden="true" />
          </a>
        </motion.div>
      </nav>

      <div className="mt-auto pt-10 border-t border-black/10">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/60 mb-4">
          Connect with us
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {SOCIALS.map(({ key, label, url, Icon }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-neon-pink transition-colors"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="flex gap-6 mt-8">
          <button type="button" className={legalClass} onClick={() => onLegal("privacy")}>
            Privacy
          </button>
          <button type="button" className={legalClass} onClick={() => onLegal("terms")}>
            Terms
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legal, setLegal] = useState<LegalType | null>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Random per visit, but only from colours that stay readable on white.
  const logoTheme = useMemo<Theme>(() => pick(LOGO_COLORS), []);

  const openLegal = (t: LegalType) => {
    setIsMenuOpen(false);
    setLegal(t);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-8 py-4 md:py-6 flex justify-between items-start pointer-events-none ${isHome ? "" : "bg-white/70 md:bg-white/80 backdrop-blur-md"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col pointer-events-auto"
        >
          <Link to="/" className="group" aria-label="Dirtcake Studio, home">
            <span
              className={`block font-display font-extrabold text-3xl tracking-tighter ${logoTheme.color} ${logoTheme.neonClass} uppercase transition-all duration-300`}
            >
              Dirtcake
            </span>
            <span className={isHome ? "block mix-blend-difference" : "block"}>
              <span
                className={`text-[11px] font-bold tracking-[0.4em] ${isHome ? "text-white" : "text-black"} uppercase`}
              >
                Studio / Istanbul
              </span>
            </span>
          </Link>
        </motion.div>

        <nav
          aria-label="Primary"
          className={`hidden md:flex gap-14 items-center pointer-events-auto ${isHome ? "mix-blend-difference" : ""}`}
        >
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <a
              href={SHOPIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-neon-coral ${isHome ? "text-white" : "text-black"}`}
              aria-label="Shop (opens Shopier)"
            >
              <ShoppingCart size={20} aria-hidden="true" />
            </a>
          </motion.div>

          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link
                to={item.path}
                aria-current={pathname === item.path ? "page" : undefined}
                className={`text-xs font-bold tracking-[0.2em] ${isHome ? "text-white" : "text-black"} uppercase transition-colors ${item.hover}`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="md:hidden pointer-events-auto flex items-center gap-4">
          <a
            href={SHOPIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Shop (opens Shopier)"
            className={`${logoTheme.color} ${logoTheme.neonClass}`}
          >
            <ShoppingCart size={24} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            className="p-2"
          >
            <Menu
              size={28}
              aria-hidden="true"
              className={`${logoTheme.color} ${logoTheme.neonClass} cursor-pointer transition-colors`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            theme={logoTheme}
            onClose={() => setIsMenuOpen(false)}
            onLegal={openLegal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
      </AnimatePresence>
    </>
  );
}
