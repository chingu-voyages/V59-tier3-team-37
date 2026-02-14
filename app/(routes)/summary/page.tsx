"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Spinner from "@/components/custom/Spinner";
import SummaryCard from "@/components/custom/summary-card/SummaryCard";
import { useSessionStore } from "@/store/useSessionStore";

export default function SummaryPage() {
  const { selectedAnswers } = useSessionStore();
  const [feedback, setFeedback] = useState<string>("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFeedback = async () => {
      if (selectedAnswers.length === 0) return;

      setLoadingFeedback(true);
      setError("");

      try {
        const response = await fetch("/api/gemini-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedAnswers }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }

        const data = await response.json();

        setFeedback(data.feedback);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(
          "Unable to load personalized feedback. Please try again later.",
        );
      } finally {
        setLoadingFeedback(false);
      }
    };

    fetchFeedback();
  }, [selectedAnswers]);

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

      {/* AI Feedback */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Personalized Feedback</h2>

        {loadingFeedback && (
          <div className="flex items-center justify-center p-8 border rounded-lg bg-muted/30">
            <Spinner />
            <span className="ml-3 text-muted-foreground">
              Analyzing your performance...
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
            {error}
          </div>
        )}

        {feedback && !loadingFeedback && (
          <div className="border rounded-lg p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div className="flex-1">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{feedback}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
