import Cookies from "js-cookie";
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
  sessionStarted: boolean | null;
  sessionEnded: boolean | null;
  resettingSession: boolean;
  darkMode: boolean;
  flashcards: z.infer<typeof FlashcardsSchema>;
  flashCardError: string | null;
  flashcardsLoading: boolean;
  questionCount: number;
  hasHydrated: boolean;
  questionIndex: number;
  selectedAnswer: string | null;
  showWarning: boolean;

  setRole: (role: Role) => void;
  startSession: () => void;
  resetSession: () => void;
  setResettingSession: () => void;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  loadFlashcards: () => void;
  shuffleCards: (filtered: Flashcards, count: number) => Flashcards;
  getAvailableRoles: () => void;
  setHasHydrated: () => void;
  setQuestionIndex: () => void;
  setSelectedAnswer: (answer: string | null) => void;
  setSessionEnded: () => void;
  setShowWarning: (warning: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      role: undefined,
      roles: [],
      sessionStarted: null,
      sessionEnded: null,
      resettingSession: false,
      darkMode: false,
      flashcards: [],
      flashCardError: null,
      flashcardsLoading: false,
      questionCount: 10, // will still display only 5 questions per category because data set only have 5 per category
      hasHydrated: false,
      questionIndex: 0,
      selectedAnswer: null,
      showWarning: false,

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
      setRole: (role) => set({ role }),
      startSession: () => {
        const sessionAlreadyStarted = get().sessionStarted;
        if (sessionAlreadyStarted) return;
        set({ sessionStarted: true });
        Cookies.set("sessionStarted", "true", { path: "/" });
      },
      resetSession: () => {
        set({
          role: undefined,
          sessionStarted: null,
          resettingSession: true,
          flashcards: [],
          flashCardError: null,
          sessionEnded: null,
          questionIndex: 0,
          selectedAnswer: null,
        });
        Cookies.set("sessionStarted", "false", { path: "/" });
        setTimeout(() => redirect("/roles"), 1500);
      },
      setResettingSession: () => set({ resettingSession: false }),
      setSessionEnded: () => set({ sessionEnded: true, showWarning: false }),
      loadFlashcards: () => {
        // Don’t reshuffle if already loaded
        if (get().flashcards.length > 0) return;

        try {
          set({ flashcardsLoading: true });
          const result = FlashcardsSchema.safeParse(rawFlashcards);

          if (!result.success) {
            console.error(z.treeifyError(result.error));
            throw new Error("Invalid flashcards JSON");
          }
          const filtered = result.data.filter((q) => q.role === get().role);
          const cards = get().shuffleCards(filtered, get().questionCount);
          set({
            flashcards: cards,
            flashCardError: null,
            flashcardsLoading: false,
          });
        } catch (err) {
          set({ flashcardsLoading: false });
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
      setHasHydrated: () => set({ hasHydrated: true }),
      setQuestionIndex: () =>
        set((state) => ({ questionIndex: state.questionIndex + 1 })),
      setSelectedAnswer: (answer: string | null) =>
        set({ selectedAnswer: answer }),
      setShowWarning: (warning: boolean) => set({ showWarning: warning }),
    }),
    {
      name: "session-store", // saved in localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },

      },
  ),
);
