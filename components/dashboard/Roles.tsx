"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import type { Role } from "@/types";
import { Button } from "../ui/button";

export default function Roles({ onGenerate }: { onGenerate: () => void }) {
  const {
    role,
    setRole,
    resetSession,
    getAvailableRoles,
    roles,
    setResettingSession,
  } = useSessionStore();

  useEffect(() => {
    setResettingSession();
    getAvailableRoles();
  }, [getAvailableRoles, setResettingSession]);

  const handleGenerateQuestions = () => {
    if (!role) return alert("⚠️ Please select a Role!");
    onGenerate();
  };

  const handleCardClick = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  return (
    <>
      <p className="font-bold text-3xl px-8 pt-4 pb-2">Roles</p>
      <p className="text-lg px-8 py-2">
        Pick your role and start honing your skills
      </p>
      <p className="flex justify-center py-4 text-lg">I am a...</p>

      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => {
            const isSelected = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleCardClick(r)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(r);
                  }
                }}
                className={`h-28 w-full rounded-xl p-4 flex flex-col justify-center cursor-pointer transition-colors text-left
                  ${isSelected ? "bg-[#958bf8]" : "bg-[#dcd9fd] hover:bg-[#958bf8]"}`}
              >
                <h3
                  className={`text-xl font-semibold transition-colors
                    ${isSelected ? "text-white" : "text-indigo-900 hover:text-white"}`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </h3>
              </button>
            );
          })}
        </div>
        <Button
          className="bg-indigo-500 self-end "
          onClick={handleGenerateQuestions}
        >
          Generate Questions
        </Button>
      </div>
    </>
  );
}
