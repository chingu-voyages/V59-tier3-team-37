import React from "react";

const steps = [
  {
    title: "Pick a Role",
    description:
      "Choose your role (Frontend, Backend, DevOps, Designer, Fullstack) to get relevant questions.",
  },
  {
    title: "Answer Questions",
    description:
      "Go through randomized flashcards and select the correct answers. Learn as you go!",
  },
  {
    title: "Track Your Progress",
    description:
      "See which questions you got right or wrong, and improve over time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl font-bold text-blue-500 mb-4">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
