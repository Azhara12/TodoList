import { useState } from "react";

function AddModal({ close, onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  // States to manage validation errors
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const categories = ["General", "Work", "Study", "Personal"];

  const handleSave = () => {
    const trimmedTitle = taskName.trim();
    const trimmedDesc = description.trim();

    // Reset previous errors
    setTitleError("");
    setDescError("");

    let hasError = false;

    // 1. Validation check for Task Name
    if (!trimmedTitle) {
      setTitleError("Task name is mandatory");
      hasError = true;
    }

    // 2. Validation check for Description
    if (!trimmedDesc) {
      setDescError("Description is mandatory");
      hasError = true;
    }

    // If any error exists, stop the execution here
    if (hasError) return;

    // Save the task and close modal if both fields are valid
    onAddTask(trimmedTitle, trimmedDesc, category);
    close();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") handleSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-slate-900/20 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">New Task</h2>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Task name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Task Name (Heading)
            </label>
            <input
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                if (e.target.value.trim()) setTitleError(""); // Clear error message when user starts typing
              }}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-xl border px-4 py-3 text-slate-900 text-sm outline-none transition focus:ring-2 focus:bg-white ${
                titleError
                  ? "border-red-500 bg-red-50/30 focus:ring-red-100 focus:border-red-500"
                  : "border-slate-200 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
              }`}
              placeholder="e.g. Learn React..."
              autoFocus
            />
            {/* Task Name Error Text */}
            {titleError && (
              <p className="text-xs font-semibold text-red-500 mt-1.5 ml-1">
                {titleError}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim()) setDescError(""); // Clear error message when user starts typing
              }}
              rows="3"
              className={`w-full rounded-xl border px-4 py-3 text-slate-900 text-sm outline-none transition resize-none focus:ring-2 focus:bg-white ${
                descError
                  ? "border-red-500 bg-red-50/30 focus:ring-red-100 focus:border-red-500"
                  : "border-slate-200 bg-slate-50 focus:border-violet-500 focus:ring-violet-100"
              }`}
              placeholder="Write task details here..."
            />
            {/* Description Error Text */}
            {descError && (
              <p className="text-xs font-semibold text-red-500 mt-1.5 ml-1">
                {descError}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    category === cat
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition"
            >
              Save Task
            </button>
            <button
              onClick={close}
              className="px-5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;