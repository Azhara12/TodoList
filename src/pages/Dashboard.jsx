import { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import TaskCard from "../components/TaskCard";
import AddModal from "../components/AddModal";
import { alertUtils } from "../utils/alerts"; 
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  fetchCompletedTasks,
  fetchPendingTasks,
  fetchTasksByCategory,
  clearCompletedTasks,
  fetchTaskStats,
} from "../services/api";

const CATEGORIES = ["All", "General", "Work", "Study", "Personal", "Done"];

function Dashboard({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); 
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ totalTasks: 0, completedCount: 0, pendingCount: 0 });
  const [loading, setLoading] = useState(false);
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.setProperty('color-scheme', 'dark');
    } else {
      root.classList.remove("dark");
      root.style.setProperty('color-scheme', 'light');
    }
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const loadStats = async () => {
    try {
      const { data } = await fetchTaskStats();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      let response;
      if (statusFilter === "Completed") response = await fetchCompletedTasks();
      else if (statusFilter === "Pending") response = await fetchPendingTasks();
      else if (activeFilter !== "All" && activeFilter !== "Done") response = await fetchTasksByCategory(activeFilter);
      else if (activeFilter === "Done") response = await fetchCompletedTasks();
      else response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    loadStats();
  }, [activeFilter, statusFilter]);

  const handleAddTask = async (title, description, category) => {
    try {
      const newTask = { title, description, category, completed: false };
      const { data } = await addTask(newTask);
      setTasks((prev) => [...prev, data]);
      loadStats();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      loadStats();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const { data } = await toggleTaskCompletion(id);
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
      loadStats();

      if (data.completed === true) {
        alertUtils.success(data.title);
      } else if (data.completed === false) {
        alertUtils.info(data.title);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleEditTask = async (id, updatedData) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const { data } = await updateTask(id, { ...task, ...updatedData });
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      if (window.confirm("Are you sure you want to clear all completed tasks?")) {
        await clearCompletedTasks();
        loadTasks();
        loadStats();
      }
    } catch (error) {
      console.error("Error clearing completed tasks:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0d0b14] text-slate-900 dark:text-slate-100 flex w-full transition-colors duration-300">
      
      <Sidebar 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">
              Welcome back
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Your Tasks
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleClearCompleted}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 px-5 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition"
            >
              Clear Completed
            </button>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-90 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid - Fixed Borders for Light Theme */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-[#13111c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Total Tasks</span>
            <span className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{stats.totalTasks}</span>
          </div>
          <div className="bg-white dark:bg-[#13111c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
            <span className="text-xs text-emerald-500 font-semibold uppercase">Completed</span>
            <span className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.completedCount}</span>
          </div>
          <div className="bg-white dark:bg-[#13111c] p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col">
            <span className="text-xs text-violet-500 font-semibold uppercase">Pending</span>
            <span className="text-2xl font-extrabold text-violet-600 mt-1">{stats.pendingCount}</span>
          </div>
        </div>

        {/* Filters and Tabs - Refined borders */}
        <div className="flex flex-wrap gap-2 justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setStatusFilter("All");
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  activeFilter === cat
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl gap-1">
            {["All", "Pending", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setActiveFilter("All");
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  statusFilter === status
                    ? "bg-white dark:bg-[#13111c] text-slate-800 dark:text-white shadow"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Task Grid or Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mr-2"></div>
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-none flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No tasks here yet.</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Click 'Add Task' to get started or change your filters.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </main>

      {open && <AddModal close={() => setOpen(false)} onAddTask={handleAddTask} />}
    </div>
  );
}

export default Dashboard;