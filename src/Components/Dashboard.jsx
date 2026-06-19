import { useState } from "react";

import Sidebar from "./Sidebar";
import TaskCard from "./TaskCard";
import AddModal from "./AddModal";

const CATEGORIES = ["All", "General", "Work", "Study", "Personal", "Done"];

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Learn React", 
      description: "Learn hooks, context API, and basic state management.", 
      category: "Study", 
      completed: false 
    },
    { 
      id: 2, 
      title: "Build Todo App", 
      description: "Create a beautiful dashboard using React and Tailwind CSS.", 
      category: "Work", 
      completed: true 
    },
  ]);

  const handleAddTask = (title, description, category) => {
    setTasks((prev) => [
      ...prev, 
      { id: Date.now(), title, description: description || "No description provided.", category, completed: false }
    ]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Function to handle saving changes from the TaskCard
  const handleEditTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  // Filter Logic
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === "Done") {
      return t.completed;
    } else if (activeFilter === "All") {
      return !t.completed;
    } else {
      return t.category === activeFilter && !t.completed;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-1">
              Welcome back
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Your Tasks
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} total · {filteredTasks.length} shown
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition self-start md:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeFilter === cat
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task grid */}
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-medium">No tasks here yet.</p>
            <p className="text-slate-400 text-xs mt-1">
              {activeFilter === "Done" ? "Complete some tasks first!" : "Click 'Add Task' to get started."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onToggleComplete={handleToggleComplete} 
                onEdit={handleEditTask} // Prop passed to TaskCard
              />
            ))}
          </div>
        )}
      </main>

      {open && (
        <AddModal
          close={() => setOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default Dashboard;