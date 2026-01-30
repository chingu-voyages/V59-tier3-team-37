"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import type { Role } from "@/types";

export default function RoleSelector() {
  const router = useRouter();

  const role = useSessionStore((s) => s.role);
  const setRole = useSessionStore((s) => s.setRole);
  const getAvailableRoles = useSessionStore((s) => s.getAvailableRoles);
  const availableRoles = useSessionStore((s) => s.roles);

  useEffect(() => {
    getAvailableRoles();
  }, [getAvailableRoles]);

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <label className="block text-lg font-semibold">Choose your role<input className="hidden" /></label>
      
      <select
        value={role ?? ""}
        onChange={(e) => setRole(e.target.value as Role)}
        className="w-full border rounded p-2 dark:bg-gray-800"
      >
        <option value="" disabled>
          Select a role
        </option>

        {availableRoles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>

      <button
      type='button'
        disabled={!role}
        onClick={() => router.push("/questions")}
        className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
