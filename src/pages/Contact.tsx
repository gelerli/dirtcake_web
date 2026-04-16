import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react"; // Added Loader2 for the loading state

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xojkwqnq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert(
          "Oops! There was a problem submitting your form. Please try again.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-grow pt-32 md:pt-48 bg-white flex flex-col">
      <div className="max-w-4xl mx-auto px-8 flex-grow pb-20">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display text-6xl md:text-8xl font-black text-black uppercase mb-12 tracking-tighter"
        >
          Get in <span className="text-neon-green neon-text-green">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl font-medium leading-relaxed text-black/80 mb-12">
              Have a project in mind or just want to say hi? We'd love to hear
              from you. Our team is always looking for new collaborations and
              creative challenges.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@dirtcakestudio.com"
                  className="text-2xl font-display font-black hover:text-neon-blue transition-colors"
                >
                  dirtcakestudio@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-2">
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
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-black text-white rounded-3xl shadow-2xl">
                <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center mb-6">
                  <Send className="text-black" size={32} />
                </div>
                <h3 className="font-display text-4xl font-black uppercase mb-4">
                  Message Sent!
                </h3>
                <p className="opacity-70 font-bold tracking-tight">
                  We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-bold tracking-[0.4em] uppercase hover:text-neon-green transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="group">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 group-focus-within:text-neon-blue transition-all">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-blue transition-colors font-bold text-lg"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 group-focus-within:text-neon-pink transition-all">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-pink transition-colors font-bold text-lg"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 group-focus-within:text-neon-green transition-all">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-neon-green transition-colors font-bold text-lg resize-none"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-black text-white py-6 rounded-full font-bold tracking-[0.4em] uppercase hover:bg-neon-green hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      Sending...
                      <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={18}
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
