"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const THEME_KEY = "codeshifter-theme";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as
      | "dark"
      | "light"
      | null;
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    const nextTheme = stored ?? (prefersLight ? "light" : "dark");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "light"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground transition hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
    </button>
  );
};
