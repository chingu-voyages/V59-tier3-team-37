"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { WarningModal } from "@/components/custom/WarningModal";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import type { FlashcardQuestionWithAnswer } from "@/types";

interface QuestionsProps {
  onCompleted: (correct: number, total: number) => void;
}

export default function Questions({ onCompleted }: QuestionsProps) {
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
      return;
    }
    loadFlashcards();
  }, [loadFlashcards, role]);

  if (resettingSession) {
    return (
      <div className="px-8 pt-4 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="animate-spin w-12 h-12 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Resetting session...
        </h2>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="px-8 pt-4">
        <p className="font-bold text-4xl pb-2">Questions</p>
        <p className="text-xl py-4">
          No role selected. Please select a role first.
        </p>
      </div>
    );
  }

  if (selectedAnswers.length === 0) {
    return (
      <div className="px-8 pt-4">
        <p className="font-bold text-4xl pb-2">Questions</p>
        <p className="text-xl py-4">
          Generating questions for:{" "}
          <span className="font-semibold capitalize">{role}</span>
        </p>
        <p className="p-6">Loading flashcards...</p>
      </div>
    );
  }

  const currentQuestion = selectedAnswers.slice(-1)[0];
  const userHasAnsweredCurrentQuestion =
    currentQuestion?.selectedOptionId !== null;
  const correctAnswer = currentQuestion.options.find((opt) => opt.isCorrect);
  const completedAllQuestions =
    selectedAnswers.length === flashcards.length &&
    userHasAnsweredCurrentQuestion;

  const index = selectedAnswers.length - 1;

  const getBgStyle = (optionId: string) => {
    if (userHasAnsweredCurrentQuestion && optionId === correctAnswer?.id)
      return "bg-green-200 border-green-500";
    if (optionId === currentQuestion?.selectedOptionId)
      return "bg-red-200 border-red-500";
    return "";
  };

  function handleSelect(answer: FlashcardQuestionWithAnswer) {
    setSelectedAnswer(answer);
  }

  function next() {
    nextQuestion();
  }

  const handleCompleted = () => {
    const correct = selectedAnswers.filter(
      (q) => q.selectedOptionId === q.options.find((opt) => opt.isCorrect)?.id,
    ).length;
    onCompleted(correct, flashcards.length);
  };

  return (
    <div className="px-8 pt-4">
      {/* Header section */}
      <p className="font-bold text-4xl pb-2">Questions - flashcards</p>
      <p className="text-l py-4">
        Generating questions for:{" "}
        <span className="font-semibold capitalize">{role}</span>
      </p>

      {/* Progress Bar */}
      <div className="flex flex-col items-center w-full mb-8">
        <p className="font-bold text-[#5235ef] mb-3">Completed cards</p>
        <div className="flex w-2/3 max-w-xl gap-2 px-4">
          {Array.from({ length: flashcards.length }).map((_, i) => (
            <div
              key={flashcards[i]?.id || i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i <= index ? "bg-[#5235ef]" : "bg-[#c3bcfa]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        <div className="max-w-xl w-full relative border rounded-lg p-6 shadow min-h-[300px] bg-white pb-16">
          <div className="flex justify-between">
            <p className="capitalize text-sm opacity-60">{role}</p>
            <p className="text-sm opacity-60">
              Question {selectedAnswers.length} / {flashcards.length}
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-2">
            {currentQuestion?.question}
          </h2>

          <div className="mt-4 flex flex-col gap-2">
            {currentQuestion?.options.map((opt) => {
              const bgStyle = getBgStyle(opt.id);

              return (
                <button
                  type="button"
                  key={opt.id}
                  className={`${bgStyle} border p-3 rounded cursor-pointer text-left`}
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
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <strong>Explanation:</strong>{" "}
              {selectedAnswers[selectedAnswers.length - 1]?.explanation ||
                "No explanation provided."}
            </div>
          )}

          {/* Next button */}
          {userHasAnsweredCurrentQuestion && !completedAllQuestions && (
            <div className="absolute bottom-3 right-3">
              <button
                type="button"
                onClick={next}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Next question"
              >
                <ChevronRight className="w-8 h-8 text-[#5235ef]" />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons (Results) */}
        {completedAllQuestions && (
          <div className="flex gap-4">
            <Button variant="outline" onClick={resetSession}>
              Start over
            </Button>
            <button
              type="button"
              onClick={handleCompleted}
              className="px-6 py-2 bg-[#5235ef] text-white rounded-lg font-semibold"
            >
              🎉 See Results
            </button>
          </div>
        )}
      </div>

      {/* Warning modal when leaving early */}
      <WarningModal
        show={showWarning}
        message={"You are leaving the session before completing all questions."}
        onClose={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          resetSession();
        }}
        confirmText={"Leave session"}
      />
    </div>
  );
}
