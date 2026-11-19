"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type Theme = "light" | "dark";

// The initial theme is set by an inline script in layout.tsx before paint;
// this button just reads it, flips it and remembers the choice.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit
    }
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-ink-200 transition-colors hover:border-gold-500/60 hover:text-gold-300 cursor-pointer"
    >
      {/* Render nothing until mounted so server and client markup match */}
      {theme === null ? null : theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
