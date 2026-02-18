import { ArrowLeft, Briefcase, PieChart, StickyNote } from "lucide-react";

interface SidebarProps {
  active?: "summary" | "roles" | "notes" | "questions";
  onSelect?: (tab: string) => void;
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <div className="w-14 bg-[#f1f2f6] border-r border-[rgba(174,174,174,0.5)] flex flex-col items-center py-6 gap-13">
      <button
        type="button"
        className="relative w-full flex justify-center cursor-pointer bg-transparent border-none"
        onClick={() => onSelect?.("summary")}
      >
        {active === "summary" && (
          <div className="absolute left-0 w-1 h-10 bg-[#5235EF] opacity-25 rounded-r"></div>
        )}
        <PieChart
          size={24}
          className={active === "summary" ? "text-[#5235EF]" : "text-[#39393B]"}
        />
      </button>

      <button
        type="button"
        className="bg-transparent border-none cursor-pointer"
        onClick={() => onSelect?.("roles")}
      >
        <Briefcase
          size={24}
          className={active === "roles" ? "text-[#5235EF]" : "text-[#39393B]"}
        />
      </button>

      <button
        type="button"
        className="bg-transparent border-none cursor-pointer"
        onClick={() => onSelect?.("questions")}
      >
        <StickyNote
          size={24}
          className={
            active === "questions" ? "text-[#5235EF]" : "text-[#39393B]"
          }
        />
      </button>

      <div className="mt-auto">
        <ArrowLeft size={22} className="text-[#39393B] cursor-pointer" />
      </div>
    </div>
  );
}
