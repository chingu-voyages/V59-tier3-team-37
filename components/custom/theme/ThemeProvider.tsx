"use client";

import { useThemePersistence } from "@/store/useThemePersistence";

export default function ThemeProvider() {
  useThemePersistence();
  return null; // no UI, just side effects
}
