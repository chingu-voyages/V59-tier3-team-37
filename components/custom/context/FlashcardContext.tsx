"use client";

import { createContext, useContext } from "react";

type QuestionResult = {
  id: number;
  question: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isCorrect: boolean;
};

const mockResults: QuestionResult[] = [
  { id: 1, question: "What is closure?", topic: "JavaScript", difficulty: "Medium", isCorrect: true },
  { id: 2, question: "Explain useEffect", topic: "React", difficulty: "Medium", isCorrect: false },
  { id: 3, question: "What is SSR?", topic: "Next.js", difficulty: "Easy", isCorrect: true },
];

const FlashcardContext = createContext<QuestionResult[]>([]);

export const FlashcardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FlashcardContext.Provider value={mockResults}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcardResults = () => useContext(FlashcardContext);
