"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

import Questions from "./Questions";
import Roles from "./Roles";
import Sidebar from "./Sidebar";
import Summary from "./Summary";
import TopNavbar from "./TopNavbar";
export default function Dashboard() {
  const router = useRouter();

  //Hooks always at the top
  const [_user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"summary" | "roles" | "questions">(
    "summary",
  );
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState({ correct: 0, total: 0 });

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Conditional rendering is fine after hooks
  if (loading) return <div className="p-10 text-center">Loading...</div>;

  // rest of your dashboard UI
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
      <div className="flex flex-1">
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
