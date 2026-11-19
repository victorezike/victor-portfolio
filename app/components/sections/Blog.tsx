"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

type Status = "idle" | "loading" | "success" | "error";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're in! Thanks for subscribing.");
        localStorage.setItem("userEmail", email);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="newsletter" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-gradient-to-br from-ink-800/80 via-ink-900 to-navy/50 p-8 text-center md:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />

          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-2xl text-ink-950">
            <FaEnvelope />
          </span>

          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            Stay in the loop
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-ink-300">
            Get a short note when I ship something new: projects, write-ups and
            lessons learned. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === "loading"}
                className="flex-1 rounded-full border border-ink-600 bg-ink-950/60 px-6 py-3.5 text-white placeholder-ink-500 transition-colors focus:border-gold-400 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-3.5 font-semibold text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 min-h-6 text-sm ${
                status === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
