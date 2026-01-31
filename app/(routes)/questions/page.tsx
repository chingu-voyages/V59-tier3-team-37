"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/custom/Spinner";
import { WarningModal } from "@/components/custom/WarningModal";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";

export default function QuestionsPage() {
  const {
    flashcards,
    loadFlashcards,
    startSession,
    resetSession,
    sessionEnded,
    setSessionEnded,
    resettingSession,
    flashcardsLoading,
    hasHydrated,
    role,
    questionIndex,
    setQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    showWarning,
    setShowWarning,
  } = useSessionStore();
  const router = useRouter();
  const pathname = usePathname();
  const isQuestionsPage = pathname === "/questions";

  const currentQuestion = flashcards[questionIndex];
  const moreQuestionsToBeDone = questionIndex < flashcards?.length - 1;
  const completedAllQuestions =
    selectedAnswer && questionIndex === flashcards?.length - 1;

  const searchParams = useSearchParams();
  const warning = searchParams.get("warning");

  useEffect(() => {
    console.log("warning", warning);
    if (warning === "finish-questions") {
      setShowWarning(true);
    }
  }, [warning, setShowWarning]);

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

  useEffect(() => {
    if (completedAllQuestions) {
      setSessionEnded();
    }
  }, [setSessionEnded, completedAllQuestions]);

  if (!hasHydrated || flashcardsLoading) {
    // restoring saved state or fetching/preparing data
    return <Spinner />;
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
    setSelectedAnswer(id);
  }

  function next() {
    setSelectedAnswer(null);
    setQuestionIndex();
  }
  console.log("SHOW WARNING:");
  console.log(showWarning);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-6">
      {showWarning && (
        <WarningModal
          message="You must finish your current questions before navigating away!"
          onClose={() => setShowWarning(false)} // optional dismiss
        />
      )}
      <div className="max-w-xl w-full border rounded-lg p-6 shadow">
        <p className="text-sm opacity-60">
          Question {questionIndex + 1} / {flashcards.length}
        </p>

        <h2 className="text-xl font-semibold mt-2">
          {currentQuestion?.question}
        </h2>

        <div className="mt-4 flex flex-col gap-2">
          {currentQuestion?.options.map((opt) => {
            const isCorrect = opt.isCorrect;
            const isSelected = selectedAnswer === opt.id;

            let style = "border p-3 rounded cursor-pointer";

            if (selectedAnswer) {
              if (isCorrect) style += " bg-green-200";
              else if (isSelected) style += " bg-red-200";
            }

            return (
              <button
                type="button"
                key={opt.id}
                className={style}
                onClick={() => handleSelect(opt.id)}
                disabled={!!selectedAnswer}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <strong>Explanation:</strong> {currentQuestion?.explanation}
          </div>
        )}
      </div>

      {selectedAnswer && moreQuestionsToBeDone && (
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Next Question
        </button>
      )}

      {completedAllQuestions && sessionEnded && (
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
