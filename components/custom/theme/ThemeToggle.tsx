import { useSessionStore } from "@/store/useSessionStore";

export default function ThemeToggle() {
  const darkMode = useSessionStore((state) => state.darkMode);
  const toggleDarkMode = useSessionStore((state) => state.toggleDarkMode);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
