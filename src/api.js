import axios from 'axios';

// Configure the base URL for your backend server
// If your backend is running on http://localhost:5000, use that.
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Optional: Add an interceptor to include an Auth Token automatically
// This is useful once you implement your Login functionality
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Task API Functions
export const fetchTasks = () => API.get('/tasks');

export const addTask = (newTask) => API.post('/tasks', newTask);

export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;