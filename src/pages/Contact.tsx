import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import { PAGE_META, toyName } from "../seo";
import { TOYS } from "../constants";
import { EMAIL } from "../site";

export default function Contact() {
  const [searchParams] = useSearchParams();

  // Arriving from a project page ("Ask where to get it") pre-fills the message.
  const [formState, setFormState] = useState(() => {
    const piece = TOYS.find((t) => t.slug === searchParams.get("piece"));
    return {
      name: "",
      email: "",
      message: piece
        ? `Hi! I'm interested in ${toyName(piece)}. Where can I get it?`
        : "",
    };
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: real visitors never fill this hidden field.
    const honeypot = (new FormData(e.currentTarget).get("_gotcha") as string) || "";
    if (honeypot) {
      setIsSubmitted(true); // look successful to the bot, send nothing
      setFormState({ name: "", email: "", message: "" });
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xojkwqnq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formState,
          _subject: "New message from dirtcakestudio.com",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setError("Oops! There was a problem sending your message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  const labelClass =
    "block text-[10px] font-bold tracking-[0.4em] uppercase text-black/60 group-focus-within:text-black transition-all";

  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <Seo {...PAGE_META.contact} />
      <div className="max-w-4xl mx-auto px-8 flex-grow pb-20">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-6xl md:text-8xl font-black text-black uppercase mb-12 tracking-tighter"
        >
          Get in <span className="text-neon-green neon-text-green">Touch</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl font-medium leading-relaxed text-black/80 mb-12">
              Have a project in mind or just want to say hi? We&apos;d love to
              hear from you. Our team is always looking for new collaborations
              and creative challenges.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/60 mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-2xl font-display font-black hover:text-neon-blue transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/60 mb-2">
                  Location
                </p>
                <p className="text-2xl font-display font-black">Istanbul, TR</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {isSubmitted ? (
              <div
                role="status"
                className="h-full flex flex-col items-center justify-center text-center p-12 bg-black text-white rounded-3xl shadow-2xl"
              >
                <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center mb-6">
                  <Send className="text-black" size={32} aria-hidden="true" />
                </div>
                <h2 className="font-display text-4xl font-black uppercase mb-4">
                  Message Sent!
                </h2>
                <p className="opacity-80 font-bold tracking-tight">
                  We&apos;ll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-bold tracking-[0.4em] uppercase hover:text-neon-green transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="group">
                  <label htmlFor="contact-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-blue transition-colors font-bold text-lg"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="group">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-pink transition-colors font-bold text-lg"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                <div className="group">
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-green transition-colors font-bold text-lg resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                {/* Honeypot (hidden from people and assistive tech) */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {error && (
                  <p role="alert" className="text-sm font-bold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-black text-white py-6 rounded-full font-bold tracking-[0.4em] uppercase hover:bg-neon-green hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      Sending...
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={18}
                        aria-hidden="true"
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
