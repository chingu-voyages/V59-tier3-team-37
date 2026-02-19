"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Is this really free?",
    answer: "Yes, completely free. No credit card or payment needed.",
  },
  {
    id: 2,
    question: "Do I need to create an account?",
    answer: "No account is required to start practicing.",
  },
  {
    id: 3,
    question: "How is my score calculated?",
    answer:
      "Your score is based on the number of correct answers selected during your practice session.",
  },
  {
    id: 4,
    question: "Can I practice more than once?",
    answer: "Yes! You can practice as many times as you like.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="qa"
      className="scroll-mt-28 min-h-screen 
        bg-gradient-to-t 
        from-white from-5% 
        via-[#7364F4]/60 via-50% 
        to-white to-95% 
        py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <button
  key={faq.id} // unique key
  onClick={() => handleToggle(index)}
  className="bg-purple-100 rounded-2xl p-6 w-full text-left cursor-pointer transition-all shadow hover:shadow-lg"
  type="button"
>
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-lg">{faq.question}</h3>
    <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
  </div>
  {isOpen && (
    <p className="text-gray-600 text-sm mt-4">{faq.answer}</p>
  )}
</button>

            );
          })}
        </div>
      </div>
    </section>
  );
}
