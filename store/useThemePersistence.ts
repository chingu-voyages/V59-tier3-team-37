"use client";

import { useEffect } from "react";
import { useSessionStore } from "./useSessionStore";

export const useThemePersistence = () => {
  const darkMode = useSessionStore((state) => state.darkMode);
  const setDarkMode = useSessionStore((state) => state.setDarkMode);

  // Load saved theme or system preference
  useEffect(() => {
    // get DM in LS, if exists, set state. Else retrieve browser preference & set state.
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("darkMode");

    if (saved !== null) {
      setDarkMode(saved === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  // Apply theme + persist (set in LS & flip tailwind dark mode class) based on state
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("darkMode", String(darkMode));

    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
};
