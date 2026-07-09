import { useState } from "react";

// 🎯 Categories array with dots matching your specific setup style
const CATEGORIES = [
  { name: "All", dot: "bg-emerald-400" },
  { name: "Work", dot: "bg-amber-400" },
  { name: "Study", dot: "bg-blue-400" },
  { name: "Personal", dot: "bg-purple-400" },
  { name: "General", dot: "bg-slate-400" },
  { name: "Done", dot: "bg-teal-400" },
];

function ExpandSidebarItem({ activeFilter, setActiveFilter, isDarkMode }) {
  const [show, setShow] = useState(true); // Default tray open layout

  return (
    <div className="w-full">
      {/* 📂 Clickable Header Row */}
      <div
        onClick={() => setShow(!show)}
        className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition text-xs font-bold uppercase tracking-wider ${
          isDarkMode
            ? "text-slate-400 hover:bg-[#233545]/40 hover:text-slate-200"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-4 h-4 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Categories
        </div>

        {/* Dynamic Chevron Arrow */}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* 🎯 Nested Categories Items List */}
      {show && (
        <div className="mt-1 flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-semibold tracking-wide transition ${
                  isSelected
                    ? isDarkMode
                      ? "bg-[#233545] text-white shadow-md border border-slate-700/50"
                      : "bg-emerald-50 text-emerald-700 font-bold border border-emerald-100"
                    : isDarkMode
                      ? "text-slate-400 hover:bg-[#233545]/40 hover:text-slate-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {/* Colored Dot Indicator */}
                <span className={`w-2 h-2 rounded-full ${cat.dot} shadow-sm flex-shrink-0`} />
                <span className="truncate">{cat.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExpandSidebarItem;