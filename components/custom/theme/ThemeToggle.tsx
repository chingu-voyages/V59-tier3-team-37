export default function ThemeToggle() {
  const onToggleDarkMode = () => {
    return undefined;
  };

  const darkMode = false;
  return (
    <button
      type="button"
      onClick={onToggleDarkMode}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
