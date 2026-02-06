"use client";

import SummaryCard from "@/components/custom/summary-card/SummaryCard";
import { useSessionStore } from "@/store/useSessionStore";

export default function SummaryPage() {
  const { selectedAnswers } = useSessionStore();

  const total = selectedAnswers.length;
  const correct = selectedAnswers.filter(
    (q) => q.selectedOptionId === q.options.find((opt) => opt.isCorrect)?.id,
  ).length;
  const incorrect = total - correct;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Performance Summary</h1>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard title="Total Questions" value={total} />
        <SummaryCard title="Correct Answers" value={correct} />
        <SummaryCard title="Incorrect Answers" value={incorrect} />
        <SummaryCard title="Accuracy" value={`${accuracy}%`} />
      </div>

      {/* Topic-wise Breakdown */}
      {/* <h2 className="text-xl font-semibold mb-4">Topic-wise Performance</h2>
      <div className="space-y-3">
        {Object.entries(topicStats).map(([topic, data]) => {
          const percent = Math.round((data.correct / data.total) * 100);
          return (
            <div
              key={topic}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <span className="font-medium">{topic}</span>
              <span className="text-sm text-gray-600">
                {data.correct}/{data.total} ({percent}%)
              </span>
            </div>
          );
        })} */}
    </div>

    //   {/* Incorrect Questions */}
    //   <h2 className="text-xl font-semibold mt-8 mb-4">Review Mistakes</h2>
    //   {results.filter(q => !q.isCorrect).length === 0 ? (
    //     <p className="text-green-600">🎉 No mistakes! Great job.</p>
    //   ) : (
    //     <ul className="list-disc pl-6 space-y-2">
    //       {results
    //         .filter(q => !q.isCorrect)
    //         .map(q => (
    //           <li key={q.id}>{q.question}</li>
    //         ))}
    //     </ul>
    //   )}
    // </div>
  );
}
