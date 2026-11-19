"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
      <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      {description && (
        <p className="text-base leading-relaxed text-ink-300 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
