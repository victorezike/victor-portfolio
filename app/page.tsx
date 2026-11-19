"use client";

import { useState, useEffect } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FaArrowUp, FaBars, FaFileAlt, FaTimes } from "react-icons/fa";
import ThemeToggle from "./components/ThemeToggle";

// Import section components
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import { RESUME_PATH, navItems, socials } from "./components/site";

const sectionIds = ["home", ...navItems.map((item) => item.id)];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      setScrolled(window.scrollY > 24);
      setShowScrollTop(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const go = () =>
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });

    // Collapsing the mobile menu cancels an in-flight smooth scroll,
    // so wait for its exit animation before scrolling.
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(go, 280);
    } else {
      go();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-ink-950 text-white min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Navigation */}
        <nav
          aria-label="Primary"
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrolled || menuOpen
              ? "bg-ink-950/85 backdrop-blur-md border-b border-ink-800"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between md:h-18">
              <button
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-3 cursor-pointer"
                aria-label="Back to top"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 font-display text-sm font-bold text-ink-950">
                  VE
                </span>
                <span className="hidden font-display text-lg font-semibold text-white sm:block">
                  Victor Ezike
                </span>
              </button>

              <div className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? "true" : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      activeSection === item.id
                        ? "text-gold-300"
                        : "text-ink-300 hover:text-white"
                    }`}
                  >
                    {activeSection === item.id && (
                      <motion.span
                        className="absolute inset-0 -z-10 rounded-full bg-gold-500/10 ring-1 ring-gold-500/30"
                        layoutId="activeSection"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    {item.label}
                  </button>
                ))}
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-4 py-2 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-500/10"
                >
                  <FaFileAlt className="text-xs" /> Résumé
                </a>
              </div>

              <div className="flex items-center gap-1 lg:ml-2">
              <ThemeToggle />
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-200 hover:bg-ink-800 lg:hidden cursor-pointer"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-ink-800 lg:hidden"
              >
                <div className="space-y-1 px-4 py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-lg px-4 py-3 text-left text-base font-medium cursor-pointer ${
                        activeSection === item.id
                          ? "bg-gold-500/10 text-gold-300"
                          : "text-ink-200 hover:bg-ink-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-500 px-4 py-3 font-semibold text-ink-950"
                  >
                    <FaFileAlt /> View Résumé
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main id="main">
          <Home scrollToSection={scrollToSection} />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Services scrollToSection={scrollToSection} />
          <Blog />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="border-t border-ink-800 bg-ink-950 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="text-center lg:text-left">
                <div className="font-display text-2xl font-bold text-white">
                  Victor Ezike
                </div>
                <p className="mt-1 text-sm text-ink-400">
                  Full-stack software engineer · Web, mobile &amp; backend.
                </p>
              </div>

              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm lg:flex-nowrap lg:gap-x-5 xl:gap-x-6">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="whitespace-nowrap text-ink-400 transition-colors hover:text-gold-300 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    {...(social.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-ink-400 transition-colors hover:border-gold-500/50 hover:text-gold-300"
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-10 text-center text-xs text-ink-500">
              © {new Date().getFullYear()} Victor Ezike. Designed &amp; built
              with Next.js, Tailwind CSS &amp; Framer Motion.
            </p>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-4"
          }`}
        >
          <FaArrowUp />
        </button>
      </div>
    </MotionConfig>
  );
}
