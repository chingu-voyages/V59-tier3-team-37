"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // assuming you have shadcn/ui Button
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = [
  "Frontend developer",
  "Backend developer",
  "DevOps developer",
  "Data analyst",
];

// Simple mapping: role → default topic (you can expand later)
const roleToTopic: Record<string, string> = {
  "Frontend developer": "JavaScript",
  "Backend developer": "REST APIs",
  "DevOps developer": "Docker",
  "Data analyst": "SQL",
};

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedRole) return;

    setLoading(true);

    // Always save selected role so questions page can show it
    localStorage.setItem("selectedRole", selectedRole);

    try {
      const topic = roleToTopic[selectedRole] || "General";

      const res = await fetch("/api/generate-quetions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole: selectedRole,
          topic,
          numQuestions: 8,
          difficulty: 6,
          skillLevel: "intermediate",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await res.json();
      localStorage.setItem(
        "interviewQuestions",
        JSON.stringify(data.result || []),
      );
      router.push("/questions");
    } catch {
      // API not ready yet (e.g. no RapidAPI key): still redirect with no questions
      localStorage.setItem("interviewQuestions", JSON.stringify([]));
      router.push("/questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Choose your{" "}
          <span className="text-purple-600 dark:text-purple-400">role</span>
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Start by picking the role you want to practice interview questions
          for.
        </p>

        <div className="mt-6 flex flex-col gap-6">
          <div className="space-y-2">
            <label
              htmlFor="role-select"
              className="text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Select a role
            </label>

            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger
                id="role-select"
                className="w-full border-purple-200/70 focus-visible:border-purple-500 focus-visible:ring-purple-500/40 dark:border-purple-500/40"
              >
                <SelectValue placeholder="Choose a role to get started" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selectedRole || loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Submitting..." : "Submit → View questions"}
          </Button>

          {selectedRole && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-900 dark:border-purple-500/50 dark:bg-purple-950/40 dark:text-purple-100">
              Preparing questions for{" "}
              <span className="font-semibold">{selectedRole}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
