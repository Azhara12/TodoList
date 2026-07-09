import { useState } from "react";

function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task._id, { title, description });
    setIsEditing(false);
  };

  return (
    <div 
      className={`group bg-white dark:bg-[#13111c] p-5 rounded-2xl border transition-all duration-300 relative w-full min-w-0 text-left
        ${task.completed 
          ? "border-slate-200/60 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/20" 
          : "border-slate-200/60 dark:border-slate-800/60 hover:border-violet-200 dark:hover:border-violet-800/80 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-3 w-full min-w-0 animate-fadeIn text-left">
          <input
            className="w-full bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-violet-500 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-[#1b1827] rounded-xl p-2.5 text-sm outline-none transition font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            autoFocus
          />
          <textarea
            className="w-full bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-violet-500 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-[#1b1827] rounded-xl p-2.5 text-sm outline-none transition resize-none text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-violet-500/10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add detailed description..."
            rows="3"
          />
          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:opacity-95 shadow-md shadow-violet-500/10 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full min-w-0 flex items-start gap-4 text-left">
          
          {/* PREMIUM INTERACTIVE CHECKBOX */}
          <button
            onClick={() => onToggleComplete(task._id)}
            className={`mt-0.5 w-5 h-5 min-w-[20px] rounded-full border-2 flex items-center justify-center transition-all duration-300 transform active:scale-75
              ${task.completed
                ? "bg-gradient-to-tr from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-violet-500 hover:shadow-inner"
              }`}
          >
            {task.completed && (
              <svg className="w-3 h-3 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* CORE CONTENT (With Double Click Feature) */}
          <div 
            className="flex-1 min-w-0 pr-12 cursor-pointer select-none text-left"
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to quick edit"
          >
            <div className="flex items-center gap-2 flex-wrap text-left justify-start">
              <h3
                className={`font-bold tracking-tight break-all whitespace-normal transition-all duration-300
                  ${task.completed 
                    ? "line-through text-slate-400 dark:text-slate-500 font-medium" 
                    : "text-base text-slate-800 dark:text-slate-100"
                  }`}
              >
                {task.title}
              </h3>
              
              {/* Dynamic Status Pill */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                ${task.completed 
                  ? "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500" 
                  : "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100/50 dark:border-violet-900/30"
                }`}
              >
                {task.completed ? "Done" : "Active"}
              </span>
            </div>

            {task.description && (
              <p
                className={`text-sm mt-1.5 block w-full break-all whitespace-pre-wrap transition-all duration-300 text-left
                  ${task.completed 
                    ? "text-slate-400 dark:text-slate-500 line-through" 
                    : "text-slate-500 dark:text-slate-400"
                  }`}
              >
                {task.description}
              </p>
            )}
          </div>

          {/* FLOATING GLASSMORPHISM ACTION PANEL */}
          <div className="absolute right-3 top-3 flex items-center gap-0.5 bg-white/80 dark:bg-[#13111c]/80 backdrop-blur-md border border-slate-100 dark:border-slate-800 p-1 rounded-xl opacity-0 group-hover:opacity-100 shadow-sm transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 rounded-lg transition active:scale-90"
              title="Edit Task"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition active:scale-90"
              title="Delete Task"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default TaskCard;