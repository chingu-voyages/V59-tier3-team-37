import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import data from "@/data/flashcards.json";
import type { FlashcardQuestionWithAnswer, Flashcards, Role } from "@/types";
import { FlashcardsSchema } from "@/types";

type SessionState = {
  role: Role | undefined;
  roles: Role[] | [];
  sessionStarted: boolean | null;
  sessionEnded: boolean | null;
  resettingSession: boolean;
  flashcards: z.infer<typeof FlashcardsSchema>;
  selectedAnswers: FlashcardQuestionWithAnswer[];
  flashCardError: string | null;
  flashcardsLoading: boolean;
  showWarning: boolean;
  setRole: (role: Role) => void;
  startSession: () => void;
  resetSession: () => void;
  setResettingSession: () => void;
  loadFlashcards: (roleValues?: string[]) => void;
  shuffleCards: (filtered: Flashcards, count: number) => Flashcards;
  getAvailableRoles: () => void;
  setSelectedAnswer: (answer: FlashcardQuestionWithAnswer) => void;
  setSessionEnded: () => void;
  setShowWarning: (warning: boolean) => void;
  nextQuestion: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      role: undefined,
      roles: [],
      sessionStarted: null,
      sessionEnded: null,
      resettingSession: false,
      selectedAnswers: [],
      flashcards: [],
      flashCardError: null,
      flashcardsLoading: false,
      questionCount: 10, // will still display only 5 questions per category because data set only have 5 per category
      questionIndex: 0,
      showWarning: false,
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
          resettingSession: true,
          flashcards: [],
          flashCardError: null,
          sessionEnded: null,
          selectedAnswers: [],
        });
        Cookies.set("sessionStarted", "false", { path: "/" });
        setTimeout(() => {
          setTimeout(() => set({ sessionStarted: null }), 250);
          redirect("/roles");
        }, 1500);
      },
      setResettingSession: () => set({ resettingSession: false }),
      setSessionEnded: () => set({ sessionEnded: true, showWarning: false }),
      loadFlashcards: (roleValues?: string[]) => {
        try {
          const result = FlashcardsSchema.safeParse(data);

          if (!result.success) {
            console.error(z.treeifyError(result.error));
            throw new Error("Invalid flashcards JSON");
          }

          const roleFilter =
            roleValues && roleValues.length > 0
              ? (q: (typeof result.data)[0]) => roleValues.includes(q.role)
              : (q: (typeof result.data)[0]) => q.role === get().role;

          const filtered = result.data.filter(roleFilter);

          set({
            flashcards: filtered,
            flashCardError: null,
            flashcardsLoading: false,
            selectedAnswers:
              filtered.length > 0
                ? [
                    {
                      ...filtered[0],
                      selectedOptionId: null,
                    },
                  ]
                : [],
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
        const result = FlashcardsSchema.safeParse(data);
        if (!result.success) {
          console.error(
            "Invalid flashcards JSON:",
            z.treeifyError(result.error),
          );
          return [];
        }

        const roles = Array.from(new Set(result.data.map((q) => q.role)));
        set({ roles });
      },
      setSelectedAnswer: (answer: FlashcardQuestionWithAnswer) => {
        const updatedAnswers = get().selectedAnswers.map((a) =>
          a.id === answer.id ? answer : a,
        );
        set({ selectedAnswers: updatedAnswers });
      },
      nextQuestion: () => {
        const { flashcards, selectedAnswers } = get();
        set({
          selectedAnswers: [
            ...selectedAnswers,
            {
              ...flashcards[selectedAnswers.length],
              selectedOptionId: null,
            },
          ],
        });
      },
      setShowWarning: (warning: boolean) => set({ showWarning: warning }),
    }),
    {
      name: "session-store", // saved in localStorage
    },
  ),
);
