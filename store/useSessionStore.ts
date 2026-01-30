import { redirect } from "next/navigation";
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import rawFlashcards from "@/public/flashcards.json";
import type { Flashcards, Role } from "@/types";
import { FlashcardsSchema } from "@/types";

type SessionState = {
  role: Role | undefined;
  roles: Role[] | [];
  sessionStarted: boolean;
  resettingSession: boolean;
  darkMode: boolean;
  flashcards: z.infer<typeof FlashcardsSchema>;
  flashCardError: string | null;
  questionCount: number;

  setRole: (role: Role) => void;
  startSession: () => void;
  resetSession: () => void;
  setResettingSession: () => void;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  loadFlashcards: () => void;
  shuffleCards: (filtered: Flashcards, count: number) => Flashcards;
  getAvailableRoles: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      role: undefined,
      roles: [],
      sessionStarted: false,
      resettingSession: false,
      darkMode: false,
      flashcards: [],
      flashCardError: null,
      questionCount: 10, // will still display only 5 questions per category because data set only have 5 per category

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
      setRole: (role) => set({ role }),
      startSession: () => set({ sessionStarted: true }),
      resetSession: () => {
        set({
          role: undefined,
          sessionStarted: false,
          resettingSession: true,
          flashcards: [],
          flashCardError: null,
        });
        setTimeout(() => redirect("/roles") , 2000)
      },
      setResettingSession: () => set({ resettingSession: false }),
      loadFlashcards: () => {
        try {
          const result = FlashcardsSchema.safeParse(rawFlashcards);

          if (!result.success) {
            console.error(z.treeifyError(result.error));
            throw new Error("Invalid flashcards JSON");
          }
          const filtered = result.data.filter((q) => q.role === get().role);
          const cards = get().shuffleCards(filtered, get().questionCount);
          set({ flashcards: cards, flashCardError: null });
        } catch (err) {
          if (err instanceof z.ZodError) {
            const message = err.issues
              .map((e) => `${e.path.join(".")}: ${e.message}`)
              .join(", ");
            set({
              flashcards: [],
              flashCardError: `Flashcards JSON invalid: ${message}`,
            });
          } else {
            set({
              flashcards: [],
              flashCardError: "Unexpected error loading flashcards",
            });
          }
        }
      },
      shuffleCards: (filtered: Flashcards, count: number) => {
        const shuffled = [...filtered];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
      },
      getAvailableRoles: () => {
        const result = FlashcardsSchema.safeParse(rawFlashcards);
        if (!result.success) {
          console.error(
            "Invalid flashcards JSON:",
            z.treeifyError(result.error),
          );
          return [];
        }

        const roles = Array.from(new Set(result.data.map((card) => card.role)));
        if (roles) set({ roles });
        else set({ roles: [] });
      },
    }),
    {
      name: "session-store", // saved in localStorage
    },
  ),
);
