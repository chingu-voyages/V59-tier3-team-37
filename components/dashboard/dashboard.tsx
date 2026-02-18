"use client";

import { useState } from "react";
import Questions from "./Questions";
import Roles from "./Roles";
import Sidebar from "./Sidebar";
import Summary from "./Summary";
import TopNavbar from "./TopNavbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"summary" | "roles" | "questions">(
    "summary",
  );
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState({ correct: 0, total: 0 });

  const handleSelect = (tab: string) => {
    if (tab === "summary" || tab === "roles" || tab === "questions") {
      setActiveTab(tab);
    }
  };

  const handleCompleted = (correct: number, total: number) => {
    setTotalScore((prev) => ({
      correct: prev.correct + correct,
      total: prev.total + total,
    }));
    setActiveTab("summary");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={activeTab} onSelect={handleSelect} />
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "summary" && <Summary totalScore={totalScore} />}
          {activeTab === "roles" && (
            <Roles
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              onGenerate={() => setActiveTab("questions")}
            />
          )}
          {activeTab === "questions" && (
            <Questions
              selectedRoles={selectedRoles}
              onCompleted={handleCompleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
