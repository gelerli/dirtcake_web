import React, { useRef } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";
import { EMAIL } from "../site";

export type LegalType = "privacy" | "terms";

const CONTENT: Record<LegalType, { title: string; body: React.ReactNode }> = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          Dirtcake Studio is a creative studio based in Istanbul, Türkiye. You
          can reach us about anything privacy-related at {EMAIL}.
        </p>
        <p>
          <strong>Contact form.</strong> When you write to us through the
          contact form we collect your name, email address and message. They are
          processed by our form provider, Formspree, and used only to reply to
          you. We keep them for as long as needed to handle your request.
        </p>
        <p>
          <strong>Analytics.</strong> We use Vercel Web Analytics to understand
          how the site is used. It is cookieless and does not build profiles of
          individual visitors.
        </p>
        <p>
          <strong>Third parties.</strong> The About page embeds a YouTube video
          in privacy-enhanced mode; YouTube may collect data once you play it.
          Links to Shopier and social platforms are governed by their own
          policies.
        </p>
        <p>
          We do not sell your personal data. Under KVKK (Law No. 6698) and,
          where applicable, the GDPR, you may ask us to access, correct or
          delete the data we hold about you by emailing us.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <>
        <p>
          By using this website you agree to these terms. If you don&apos;t
          agree, please don&apos;t use the site.
        </p>
        <p>
          All designs, images, text and other assets on this site are the
          intellectual property of Dirtcake Studio and are protected by law.
          Unauthorized reproduction is prohibited, except for the free
          resources, which are licensed as stated on their own page.
        </p>
        <p>
          Limited edition releases are subject to availability. Some pieces are
          sold through Shopier and some only in physical shops; purchases are
          subject to the terms of the seller. Contact us if you&apos;re unsure
          where to get a piece.
        </p>
        <p>
          The site is provided &quot;as is&quot; and its content may change at
          any time without notice.
        </p>
      </>
    ),
  },
};

export default function LegalModal({
  type,
  onClose,
}: {
  type: LegalType;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogA11y(ref, true, onClose);
  const { title, body } = CONTENT[type];
  const titleId = `legal-title-${type}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white border border-black/10 p-8 md:p-12 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <h2
          id={titleId}
          className="font-display text-4xl font-black uppercase mb-8 tracking-tighter"
        >
          {title}
        </h2>
        <div className="space-y-6 text-black/70 leading-relaxed font-medium">
          {body}
        </div>
      </motion.div>
    </motion.div>
  );
}
