"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { WarningModal } from "@/components/custom/WarningModal";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import type { FlashcardQuestionWithAnswer } from "@/types";

export default function QuestionsPage() {
  const {
    flashcards,
    loadFlashcards,
    resetSession,
    resettingSession,
    selectedAnswers,
    role,
    nextQuestion,
    setSelectedAnswer,
    showWarning,
    setShowWarning,
  } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push("/roles");
      return;
    }

    loadFlashcards();
  }, [loadFlashcards, role, router]);

  if (selectedAnswers.length === 0) {
    return null;
  }

  const currentQuestion = selectedAnswers.slice(-1)[0];
  const userHasAnsweredCurrentQuestion =
    currentQuestion?.selectedOptionId !== null;
  const correctAnswer = currentQuestion.options.find((opt) => opt.isCorrect);
  const completedAllQuestions =
    selectedAnswers.length === flashcards.length &&
    userHasAnsweredCurrentQuestion;

  const getBgStyle = (optionId: string) => {
    if (userHasAnsweredCurrentQuestion && optionId === correctAnswer?.id)
      return "bg-green-200";
    if (optionId === currentQuestion?.selectedOptionId) return "bg-red-200";
    return "bg-grey-100";
  };

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

        <Button type="button" onClick={() => router.push("/roles")}>
          Go back to select role
        </Button>
      </div>
    );
  }

  function handleSelect(answer: FlashcardQuestionWithAnswer) {
    setSelectedAnswer(answer);
  }

  function next() {
    nextQuestion();
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-6">
      {/* Back to roles button */}
      <div className="max-w-xl w-full">
        <Button
          variant="outline"
          onClick={() => {
            // if (!completedAllQuestions) setShowWarning(true);
            // else router.push("/roles");
          }}
        >
          Back to roles
        </Button>
      </div>
      <div className="max-w-xl w-full border rounded-lg p-6 shadow">
        <div className="flex justify-between">
          <p className="capitalize text-sm opacity-60">{role}</p>
          <p className="text-sm opacity-60">
            Question {selectedAnswers.length} / {flashcards.length}
          </p>
        </div>
        <h2 className="text-xl font-semibold mt-2">
          {currentQuestion?.question}
        </h2>

        <div className={`mt-4 flex flex-col gap-2 `}>
          {currentQuestion?.options.map((opt) => {
            const bgStyle = getBgStyle(opt.id);

            return (
              <button
                type="button"
                key={opt.id}
                className={`${bgStyle} border p-3 rounded cursor-pointer`}
                onClick={() =>
                  handleSelect({
                    ...currentQuestion,
                    selectedOptionId: opt.id,
                  })
                }
                disabled={currentQuestion.selectedOptionId !== null}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {currentQuestion.selectedOptionId !== null && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <strong>Explanation:</strong>{" "}
            {selectedAnswers[selectedAnswers.length - 1]?.explanation ||
              "No explanation provided."}
          </div>
        )}
      </div>

      {selectedAnswers.length > 0 && !completedAllQuestions && (
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Next Question
        </button>
      )}

      {completedAllQuestions && (
        <>
          <p className="font-semibold">🎉 Done!</p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={resetSession} className="mt-4">
              Start over
            </Button>
            <Button onClick={() => router.push("/summary")} className="mt-4">
              Summary
            </Button>
          </div>
        </>
      )}

      {/* Warning modal when leaving early */}
      <WarningModal
        show={showWarning}
        message={"You are leaving the session before completing all questions."}
        onClose={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          router.push("/roles");
        }}
        confirmText={"Back to roles"}
      />
    </div>
  );
}
