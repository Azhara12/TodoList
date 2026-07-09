const Task = require("../models/Task");

const getTasks = async (req, res) => {
  let tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// 2. CREATE TASK WITH CLOUDINARY IMAGE
const createTask = async (req, res) => {
  try {
    const taskData = { ...req.body, user: req.user.id };

    // Agar user ne file upload ki hai, to Cloudinary ka URL data me add karo
    if (req.file) {
      taskData.image = req.file.path; // req.file.path me Cloudinary ka direct URL hota hai
    }

    const newTask = new Task(taskData);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Task create karne me error aaya", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found or not authorized" });
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found or not authorized" });
  
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
};

const toggleTaskCompletion = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

const getCompletedTasks = async (req, res) => {
  const completedTasks = await Task.find({ user: req.user.id, completed: true });
  res.json(completedTasks);
};

const getPendingTasks = async (req, res) => {
  const pendingTasks = await Task.find({ user: req.user.id, completed: false });
  res.json(pendingTasks);
};

const getTasksByCategory = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id, category: req.params.categoryName });
  res.json(tasks);
};

const clearCompletedTasks = async (req, res) => {
  const result = await Task.deleteMany({ user: req.user.id, completed: true });
  res.json({ message: `${result.deletedCount} completed tasks deleted.` });
};

const getDashboardStats = async (req, res) => {
  const totalTasks = await Task.countDocuments({ user: req.user.id });
  const completedCount = await Task.countDocuments({ user: req.user.id, completed: true });
  const pendingCount = await Task.countDocuments({ user: req.user.id, completed: false });

  res.json({
    totalTasks,
    completedCount,
    pendingCount,
  });
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  getCompletedTasks,
  getPendingTasks,
  getTasksByCategory,
  clearCompletedTasks,
  getDashboardStats,
};