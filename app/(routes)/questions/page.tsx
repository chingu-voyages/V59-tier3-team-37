"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Question = {
  question: string;
  choices: string[];
  correctAnswer: string;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("interviewQuestions");
    const storedRole = localStorage.getItem("selectedRole");

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            No questions found
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Go back and select a role to generate questions.
          </p>
          <Link
            href="/roles"
            className="mt-6 inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Choose a role
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Interview Questions for{" "}
          <span className="text-purple-600 dark:text-purple-400">{role}</span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Here are {questions.length} tailored multiple-choice questions.
        </p>

        <div className="mt-8 space-y-8">
          {/* the API do not have index /  unique id */}
          {questions.map((q, index) => (
            <div
              key={q.question}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                Question {index + 1}: {q.question}
              </h3>
              <ul className="mt-4 space-y-3">
                {q.choices.map((choice, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700"
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
