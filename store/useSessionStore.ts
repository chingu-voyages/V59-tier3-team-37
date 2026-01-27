import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/types";

type SessionState = {
  role: Role | null;
  sessionStarted: boolean;
  darkMode: boolean;

  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  setRole: (role: Role) => void;
  startSession: () => void;
  resetSession: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      role: null,
      sessionStarted: false,
      darkMode: false,

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
      setRole: (role) => set({ role }),
      startSession: () => set({ sessionStarted: true }),
      resetSession: () => set({ role: null, sessionStarted: false }),
    }),
    {
      name: "session-store", // saved in localStorage
    },
  ),
);
