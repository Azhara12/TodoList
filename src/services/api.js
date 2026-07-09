import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Interceptor to include Auth Token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    // 🔥 FIX 1: 'authorization' ko lowercase string object key ke tor par pass karein
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// Task API Functions
export const fetchTasks = () => API.get("/tasks");

export const addTask = (newTask) => API.post("/tasks", newTask);

export const updateTask = (id, updatedTask) =>
  API.put(`/tasks/${id}`, updatedTask);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const toggleTaskCompletion = (id) => API.patch(`/tasks/${id}/toggle`);

// 🔥 FIX 2: Endpoint sahi kiya '/tasks/id' se badal kar '/tasks/status/completed' kiya
export const fetchCompletedTasks = () => API.get("/tasks/status/completed");

export const fetchPendingTasks = () => API.get("/tasks/status/pending");

export const fetchTasksByCategory = (categoryName) =>
  API.get(`/tasks/filter/category/${categoryName}`);

export const clearCompletedTasks = () =>
  API.delete("/tasks/action/clear-completed");

export const fetchTaskStats = () => API.get("/tasks/action/stats");

// Auth API Functions
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

export default API;
