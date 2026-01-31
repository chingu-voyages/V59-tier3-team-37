"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";

export default function QuestionsPage() {
  const {
    flashcards: cards,
    loadFlashcards,
    startSession,
    resetSession,
    resettingSession,
    flashcardsLoading,
    hasHydrated,
    role,
  } = useSessionStore();
  console.log(flashcardsLoading)
  const router = useRouter();
  const pathname = usePathname();
  const isQuestionsPage = pathname === "/questions";

  useEffect(() => {
    if (role) {
    loadFlashcards();
  }
  }, [loadFlashcards, role]);

  useEffect(() => {
    if (role && isQuestionsPage) {
      startSession();
    }
  }, [role, isQuestionsPage, startSession]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const current = cards[index];

if (!hasHydrated) {
  return <Spinner />
}

  if (resettingSession) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-start space-y-4 bg-gray-50 dark:bg-black text-center px-4">
        <div className="animate-spin w-12 h-12 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Resetting session...
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
          Please wait a moment while we clear your previous session and redirect
          you to the role selection page.
        </p>
      </div>
    );
  }

   if (flashcardsLoading) {
    return <Spinner />;
  }

  if (!role) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-4 px-4">
        <h2 className="text-2xl font-semibold">No role selected</h2>
        <p className="text-muted-foreground max-w-md">
          Please choose a role before starting the flashcards so we can show you
          relevant questions.
        </p>

        <Button onClick={() => router.push("/roles")}>
          Go back to select role
        </Button>
      </div>
    );
  }

 

  function handleSelect(id: string) {
    setSelected(id);
  }

  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-6">
      <div className="max-w-xl w-full border rounded-lg p-6 shadow">
        <p className="text-sm opacity-60">
          Question {index + 1} / {cards.length}
        </p>

        <h2 className="text-xl font-semibold mt-2">{current?.question}</h2>

        <div className="mt-4 flex flex-col gap-2">
          {current?.options.map((opt) => {
            const isCorrect = opt.isCorrect;
            const isSelected = selected === opt.id;

            let style = "border p-3 rounded cursor-pointer";

            if (selected) {
              if (isCorrect) style += " bg-green-200";
              else if (isSelected) style += " bg-red-200";
            }

            return (
              <button
                type="button"
                key={opt.id}
                className={style}
                onClick={() => handleSelect(opt.id)}
                disabled={!!selected}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <strong>Explanation:</strong> {current.explanation}
          </div>
        )}
      </div>

      {selected && index < cards.length - 1 && (
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Next Question
        </button>
      )}

      {selected && index === cards.length - 1 && (
        <>
          <p className="font-semibold">🎉 Done!</p>
          <Button variant="outline" onClick={resetSession} className="mt-4">
            Start over
          </Button>
        </>
      )}
    </div>
  );
}
