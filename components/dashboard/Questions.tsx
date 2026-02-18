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
      <p className="font-bold text-4xl pb-2">Questions</p>
      <p className="text-xl py-4">
        Generating questions for:{" "}
        <span className="font-semibold">{roles.join(", ")}</span>
      </p>

      <div className="min-h-screen p-6 flex flex-col items-center gap-6">
        <div className="flex items-stretch justify-center gap-4 w-full max-w-4xl">
          {/* Left arrow - previous question */}
          <button
            type="button"
            onClick={previous}
            disabled={index === 0}
            className="shrink-0 self-center p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            aria-label="Previous question"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>

          <div className="max-w-xl w-full border rounded-lg p-6 shadow flex-1 min-w-0">
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

          {/* Right arrow - next question */}
          <button
            type="button"
            onClick={next}
            disabled={index === cards.length - 1}
            className="shrink-0 self-center p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            aria-label="Next question"
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>
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
          <button
            type="button"
            onClick={handleCompleted}
            className="px-4 py-2 bg-indigo-500 text-white rounded font-semibold"
          >
            🎉 See Results
          </button>
        )}
      </div>
    </div>
  );
}
