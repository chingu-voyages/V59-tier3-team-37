import { getAuth } from "firebase/auth";
import { PieChart } from "lucide-react";
import SummaryCard from "@/components/custom/summary-card/SummaryCard";
import { useSessionStore } from "@/store/useSessionStore";
import AISummary from "./AISummary";

interface SummaryProps {
  getStarted?: () => void;
}

export default function Summary({ getStarted }: SummaryProps) {
  const auth = getAuth();
  const userName =
    auth?.currentUser?.displayName ||
    auth?.currentUser?.email?.split("@")[0] ||
    "User";
  const { selectedAnswers } = useSessionStore();

  const total = selectedAnswers.length;
  const correct = selectedAnswers.filter(
    (q) => q.selectedOptionId === q.options.find((opt) => opt.isCorrect)?.id,
  ).length;
  const incorrect = total - correct;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex-1 overflow-auto">
      <h1 className="text-5xl font-bold py-4 text-black">Hello, {userName}</h1>
      <div className="bg-[#e0e0ff] rounded-3xl flex items-center justify-between p-16">
        <div className="flex items-center gap-4">
          <PieChart className="w-20 h-20 text-[#5b4df3] opacity-50" />
          <div className="flex flex-col">
            <h2 className="text-[#5b4df3] text-4xl font-bold">Your summary</h2>
            <p className="text-[#8e8cb2] text-lg">
              your general stats based on your learning sessions
            </p>
          </div>
        </div>
        <AISummary getStarted={getStarted} />
      </div>
    </div>
  );
}
