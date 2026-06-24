import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TaskCard from "./TaskCard";
import AddModal from "./AddModal";
// Import the API functions we created
import { fetchTasks, addTask, deleteTask, updateTask } from "../api"; 

const CATEGORIES = ["All", "General", "Work", "Study", "Personal", "Done"];

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  // 1. Initialize as an empty array
  const [tasks, setTasks] = useState([]); 

  // 2. Load tasks from backend on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (title, description, category) => {
    try {
      const newTask = { title, description, category, completed: false };
      const { data } = await addTask(newTask);
      setTasks((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    try {
      const { data } = await updateTask(id, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditTask = async (id, updatedData) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const { data } = await updateTask(id, { ...task, ...updatedData });
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Filter Logic remains the same
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === "Done") return t.completed;
    if (activeFilter === "All") return !t.completed;
    return t.category === activeFilter && !t.completed;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* ... Header and other UI elements remain identical to your code ... */}
        
        {/* Task grid */}
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             {/* ... empty state ... */}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onToggleComplete={handleToggleComplete} 
                onEdit={handleEditTask} 
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