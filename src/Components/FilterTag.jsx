// Har category ke hisab se specific vibrant colors (Matching your Dashboard & TaskCard)
const tagColors = {
  Work:     "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
  Study:    "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20",
  Personal: "bg-green-50 text-green-700 border-green-200/60 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20",
  General:  "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20",
  Done:     "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
};

function FilterTag({ name, activeFilter, onClick }) {
  // Agar category match na ho toh General color use hoga
  const colorClass = tagColors[name] || tagColors.General;
  const isSelected = activeFilter === name;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition duration-200 shadow-sm cursor-pointer select-none ${colorClass} ${
        isSelected 
          ? "ring-2 ring-purple-500 scale-105 font-bold border-purple-400" 
          : "hover:scale-105 active:scale-95"
      }`}
    >
      {/* Ek chota sa dot text ke sath mazeed visual appeal ke liye */}
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 mr-1.5" />
      {name}
    </button>
  );
}

export default FilterTag;