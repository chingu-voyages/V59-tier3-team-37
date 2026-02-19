"use client";
import Image from "next/image";
import { allRoles } from "@/lib/roleMap";
import generateQuestionButton from "@/public/generateQuestionButton.png";

interface RolesProps {
  selectedRoles: Set<string>;
  setSelectedRoles: React.Dispatch<React.SetStateAction<Set<string>>>;
  onGenerate: () => void;
}

export default function Roles({
  selectedRoles,
  setSelectedRoles,
  onGenerate,
}: RolesProps) {
  const handleGenerateQuestions = () => {
    if (selectedRoles.size === 0) return alert("⚠️ Please select a Role!");
    onGenerate();
  };

  const handleCardClick = (role: string) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      next.has(role) ? next.delete(role) : next.add(role);
      return next;
    });
  };

  return (
    <>
      <p className="font-bold text-4xl px-8 pt-4 pb-2">Roles</p>
      <p className="text-xl px-8 py-4">
        pick your role and start hone your skills
      </p>
      <p className="flex justify-center py-8">I am a...</p>
      <div className="max-w-5xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allRoles.map((role) => {
            const isSelected = selectedRoles.has(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleCardClick(role)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(role);
                  }
                }}
                className={`h-40 w-full rounded-2xl p-8 flex flex-col justify-center cursor-pointer transition-colors text-left
            ${isSelected ? "bg-[#958bf8]" : "bg-[#dcd9fd] hover:bg-[#958bf8]"}`}
              >
                <h3
                  className={`text-3xl font-bold leading-tight transition-colors
            ${isSelected ? "text-white" : "text-indigo-900 hover:text-white"}`}
                >
                  {role}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={handleGenerateQuestions}>
          <Image
            className="w-90"
            src={generateQuestionButton}
            alt="Generate Questions"
          />
        </button>
      </div>
    </>
  );
}
