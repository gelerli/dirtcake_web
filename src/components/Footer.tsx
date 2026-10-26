import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { SOCIALS } from "../socials";
import LegalModal, { type LegalType } from "./LegalModal";

const linkClass =
  "text-[10px] font-bold tracking-[0.3em] uppercase hover:text-neon-pink cursor-pointer transition-colors";

export default function Footer() {
  const [legal, setLegal] = useState<LegalType | null>(null);

  return (
    <>
      <footer className="px-8 py-2 md:py-8 flex flex-row flex-wrap justify-between items-center gap-x-6 gap-y-3 z-40 bg-white">
        <div className="flex flex-wrap gap-5 md:gap-8">
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

        <div className="flex flex-col items-end">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/60">
            © {new Date().getFullYear()} Dirtcake Studio
          </p>
          <div className="flex gap-6 mt-1">
            <Link to="/about" className={linkClass}>
              About
            </Link>
            <button type="button" onClick={() => setLegal("privacy")} className={linkClass}>
              Privacy
            </button>
            <button type="button" onClick={() => setLegal("terms")} className={linkClass}>
              Terms
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
      </AnimatePresence>
    </>
  );
}
