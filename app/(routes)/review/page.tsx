"use client";

import { useSessionStore } from "@/store/useSessionStore";
import { useEffect } from "react";

export default function ReviewPage() {
  const { flashcards: cards, loadFlashcards } = useSessionStore();

  useEffect(() =>{
    loadFlashcards();
  }, [loadFlashcards])

  const incorrectQuestions = cards.filter(q => q.options.filter((opt) => opt.isCorrect));

  if (incorrectQuestions.length === 0) {
    return <p className="p-6 text-green-600">🎉 No incorrect answers!</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Review Incorrect Answers</h1>

      {incorrectQuestions.map(question => {
        const correctOption = question.options.find(o => o.isCorrect);

        return (
          <div
            key={question.id}
            className="border rounded-lg p-4 mb-6 bg-white"
          >
            <h2 className="font-semibold mb-2">
              {question.question}
            </h2>

            <p className="text-green-700">
              ✅ Correct Answer: {correctOption?.text}
            </p>

            <p className="text-gray-600 mt-2">
              💡 {question.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
