"use client";

import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";

export default function FlashcardsPage() {
  const { flashcards: cards, loadFlashcards } = useSessionStore();

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const current = cards[index];

  if (!current) {
    return <p className="p-6">No flashcards available.</p>;
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

        <h2 className="text-xl font-semibold mt-2">{current.question}</h2>

        <div className="mt-4 flex flex-col gap-2">
          {current.options.map((opt) => {
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
        <p className="font-semibold">🎉 Done!</p>
      )}
    </div>
  );
}
