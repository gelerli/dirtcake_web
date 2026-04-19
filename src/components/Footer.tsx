import React, { useState } from "react";
import { Instagram, Twitter, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null,
  );

  const Modal = ({
    title,
    content,
    onClose,
  }: {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white border border-black/10 p-8 md:p-12 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="font-display text-4xl font-black uppercase mb-8 tracking-tighter">
          {title}
        </h2>

        <div className="space-y-6 text-black/70 leading-relaxed font-medium">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <footer className="px-8 py-2 md:py-8 flex flex-row justify-between items-center gap-4 z-40 bg-white">
        <div className="flex gap-10">
          <a
            href="https://www.instagram.com/dirtcakestudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://x.com/dirtcakestudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-pink transition-colors"
          >
            <Twitter size={20} />
          </a>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">
            © 2026 Dirtcake Studio
          </p>
          <div className="flex gap-6 mt-1">
            <span
              onClick={() => setActiveModal("privacy")}
              className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-neon-pink cursor-pointer transition-colors"
            >
              Privacy
            </span>
            <span
              onClick={() => setActiveModal("terms")}
              className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-neon-pink cursor-pointer transition-colors"
            >
              Terms
            </span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal === "privacy" && (
          <Modal
            title="Privacy Policy"
            onClose={() => setActiveModal(null)}
            content={
              <>
                <p>
                  Your privacy is important to us. This policy outlines how we
                  handle your data at Dirtcake Studio.
                </p>
                <p>
                  We collect minimal information necessary to provide our
                  services and ensure a high-quality experience for our
                  collectors.
                </p>
                <p>
                  We do not sell your personal data to third parties. Any
                  information shared with partners is strictly for service
                  fulfillment.
                </p>
              </>
            }
          />
        )}
        {activeModal === "terms" && (
          <Modal
            title="Terms of Service"
            onClose={() => setActiveModal(null)}
            content={
              <>
                <p>
                  By accessing Dirtcake Studio, you agree to comply with our
                  terms of service.
                </p>
                <p>
                  All digital and physical assets are protected by intellectual
                  property laws. Unauthorized reproduction is strictly
                  prohibited.
                </p>
                <p>
                  Limited edition releases are subject to availability and are
                  sold on a first-come, first-served basis.
                </p>
              </>
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}
