import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getRoleValuesForFilter } from "@/lib/roleMap";
import { useSessionStore } from "@/store/useSessionStore";

interface QuestionsProps {
  selectedRoles: Set<string>;
  onCompleted: (correct: number, total: number) => void;
}

export default function Questions({
  selectedRoles,
  onCompleted,
}: QuestionsProps) {
  const roles = [...selectedRoles];
  const { flashcards: cards, loadFlashcards } = useSessionStore();
  const roleValues = useMemo(
    () => getRoleValuesForFilter(selectedRoles),
    [selectedRoles],
  );

  useEffect(() => {
    if (roleValues.length > 0) {
      loadFlashcards(roleValues);
    } else {
      loadFlashcards();
    }
  }, [loadFlashcards, roleValues]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const current = cards[index];

  if (!current) {
    return (
      <div className="px-8 pt-4">
        <p className="font-bold text-4xl pb-2">Questions</p>
        <p className="text-xl py-4">
          Generating questions for:{" "}
          <span className="font-semibold">{roles.join(", ")}</span>
        </p>
        <p className="p-6">No flashcards available for the selected roles.</p>
      </div>
    );
  }

  function handleSelect(id: string) {
    const isCorrect = current.options.find((opt) => opt.id === id)?.isCorrect;
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setSelected(id);
  }

  function next() {
    setSelected(null);
    setIndex((i) => Math.min(cards.length - 1, i + 1));
  }

  function previous() {
    setSelected(null);
    setIndex((i) => Math.max(0, i - 1));
  }

  const handleCompleted = () => {
    onCompleted(correctCount, cards.length);
  };

  return (
    <div className="px-8 pt-4">
      {/* Header section */}
      <p className="font-bold text-4xl pb-2">Questions - flashcards</p>
      <p className="text-l py-4">
        Generating questions for:{" "}
        <span className="font-semibold">{roles.join(", ")}</span>
      </p>

      {/* Progress Bar */}
      <div className="flex flex-col items-center w-full mb-8">
        <p className="font-bold text-[#5235ef] mb-3">Completed cards</p>
        <div className="flex w-2/3 max-w-xl gap-2 px-4">
          {Array.from({ length: cards.length }).map((_, i) => (
            <div
              key={cards[i].id}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i <= index ? "bg-[#5235ef]" : "bg-[#c3bcfa]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        <div className="max-w-xl w-full relative border rounded-lg p-6 shadow min-h-[300px] bg-white pb-16">
          <p className="text-sm opacity-60">
            Question {index + 1} / {cards.length}
          </p>

          <h2 className="text-xl font-semibold mt-2">{current.question}</h2>

          <div className="mt-4 flex flex-col gap-2">
            {current.options.map((opt) => {
              const isCorrect = opt.isCorrect;
              const isSelected = selected === opt.id;

              let style = "border p-3 rounded cursor-pointer text-left";
              if (selected) {
                if (isCorrect) style += " bg-green-200 border-green-500";
                else if (isSelected) style += " bg-red-200 border-red-500";
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
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <strong>Explanation:</strong> {current.explanation}
            </div>
          )}

          {/* Arrows: bottom-right corner, tight spacing */}
          <div className="absolute bottom-3 right-3 flex -space-x-1 items-center">
            <button
              type="button"
              onClick={previous}
              disabled={index === 0}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-8 h-8 text-[#5235ef]" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index === cards.length - 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
              aria-label="Next question"
            >
              <ChevronRight className="w-8 h-8 text-[#5235ef]" />
            </button>
          </div>
        </div>

        {/* Action Buttons (Results) */}
        {selected && index === cards.length - 1 && (
          <button
            type="button"
            onClick={handleCompleted}
            className="px-6 py-2 bg-[#5235ef] text-white rounded-lg font-semibold"
          >
            🎉 See Results
          </button>
        )}
      </div>
    </div>
  );
}
