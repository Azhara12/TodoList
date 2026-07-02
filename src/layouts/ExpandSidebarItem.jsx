import { useState } from "react";

// Humne array ke andar "All" ka option dot color ke sath shamil kar diya hai
const CATEGORIES = [
  { name: "All", dot: "bg-slate-400" },
  { name: "Work", dot: "bg-amber-400" },
  { name: "Study", dot: "bg-blue-400" },
  { name: "Personal", dot: "bg-green-400" },
  { name: "General", dot: "bg-violet-400" },
  { name: "Done", dot: "bg-emerald-400" },
];

function ExpandSidebarItem({ activeFilter, setActiveFilter, isDarkMode }) {
  const [show, setShow] = useState(true); // Default open layout matching image screen asset

  return (
    <div>
      {/* Clickable Header row selector for the dropdown tray */}
      <div
        onClick={() => setShow(!show)}
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition text-sm font-medium ${
          isDarkMode
            ? "text-white hover:bg-black hover:text-white"
            : "text-white hover:bg-black"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-4 h-4 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Categories
        </div>

        {/* Toggle chevron arrow icon */}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Child Category Row list render map */}
      {show && (
        <div className="mt-1 ml-4 space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-xs font-semibold transition ${
                  isSelected
                    ? isDarkMode
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-700 font-bold"
                    : isDarkMode
                      ? "text-white hover:bg-black/10 hover:text-white"
                      : "text-white hover:bg-black"
                }`}
              >
                {/* Image exact dot circle matcher */}
                <span className={`w-2 h-2 rounded-full ${cat.dot} shadow-sm`} />
                {cat.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExpandSidebarItem;
