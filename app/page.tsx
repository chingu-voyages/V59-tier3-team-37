"use client";

import { RoleSelect } from "@/components/custom/role-selection/RoleSelector";
import RoleSelector from "@/components/custom/role-selection/Test";
import HowItWorks from "@/components/home/HowItWorks";

const roleOptions = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "designer", label: "UI/UX Designer" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full  flex-col   bg-white dark:bg-black ">
        <HowItWorks />
        <RoleSelector />
        <RoleSelect
          options={roleOptions}
          label="Choose your role"
          placeholder="Pick a role"
          defaultValue="Frontend Developer"
          onValueChange={(value) => {
            console.log("Selected role:", value);
          }}
        />
      </main>
    </div>
  );
}
