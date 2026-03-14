"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "./ui/button";

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
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "light"}
      variant="ghost"
      size="icon"
      className="rounded-full border border-border/60 bg-background/70 text-foreground hover:text-foreground"
    >
      {theme === "dark" ? <LuMoon size={16} /> : <LuSun size={16} />}
    </Button>
  );
};
