"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { FaArrowRight, FaChevronDown, FaDownload } from "react-icons/fa";
import { HeroScene } from "../ThreeD";
import { RESUME_FILENAME, RESUME_PATH, socials } from "../site";

interface HomeProps {
  scrollToSection: (sectionId: string) => void;
}

const stats = [
  { number: "25+", label: "Projects shipped" },
  { number: "3+", label: "Years experience" },
  { number: "35+", label: "Happy clients" },
  { number: "28+", label: "Technologies" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function Home({ scrollToSection }: HomeProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24 pb-20"
    >
      <div className="absolute inset-0 z-0 opacity-70" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <HeroScene />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlay keeps text readable over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,15,28,0.55)_0%,rgba(8,15,28,0.9)_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp(0.1)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-900/60 px-4 py-1.5 text-xs font-medium text-ink-200 backdrop-blur-sm sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Software Engineer · Lagos, Nigeria
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          className="mb-6 text-5xl font-bold leading-[1.05] sm:text-7xl md:text-8xl"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 bg-clip-text text-transparent">
            Victor
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl"
        >
          I build fast, polished web and mobile products with{" "}
          <span className="text-ink-100">React</span>,{" "}
          <span className="text-ink-100">Next.js</span> and{" "}
          <span className="text-ink-100">React Native</span>, turning ideas
          into interfaces people enjoy using.
        </motion.p>

        <motion.div
          {...fadeUp(0.5)}
          className="mb-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 font-semibold text-ink-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-500/40 sm:w-auto cursor-pointer"
          >
            View my work
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-gold-500/60 bg-ink-900/40 px-8 py-4 font-semibold text-gold-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10 sm:w-auto"
          >
            <FaDownload className="text-sm" />
            Download résumé
          </a>
        </motion.div>

        <motion.dl
          {...fadeUp(0.65)}
          className="mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-700/70 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-ink-900/80 px-4 py-5 backdrop-blur-sm"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-gold-300">
                {stat.number}
              </dd>
              <dd className="mt-1 text-xs uppercase tracking-wider text-ink-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div {...fadeUp(0.8)} className="flex justify-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              {...(social.href.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-700 bg-ink-900/60 text-ink-300 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:text-gold-300"
            >
              <social.icon className="text-lg" />
            </a>
          ))}
        </motion.div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-400 transition-colors hover:text-gold-300 sm:flex cursor-pointer"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        >
          <FaChevronDown />
        </motion.span>
      </button>
    </section>
  );
}
