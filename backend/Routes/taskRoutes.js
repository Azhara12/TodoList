const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ==========================================
// 1-4: YOUR ORIGINAL CORE CRUD APIs
// ==========================================

// 1. GET all tasks
// GET http://localhost:5000/api/tasks/
router.get('/', async (req, res) => {
  let tasks = await Task.find();
  res.json(tasks);
});

// 2. POST a new task
// POST http://localhost:5000/api/tasks/
router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// 3. DELETE a task
// DELETE http://localhost:5000/api/tasks/:id
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// 4. PUT (update) a task
// PUT http://localhost:5000/api/tasks/:id
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// ==========================================
// 5-10: ADDED TO REACH THE 10 API GOAL
// ==========================================

// 5. PATCH (Toggle completion status)
// PATCH http://localhost:5000/api/tasks/:id/toggle
router.patch('/:id/toggle', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  
  task.completed = !task.completed; // Flips true to false, or false to true
  await task.save();
  res.json(task);
});

// 6. GET only completed tasks
// GET http://localhost:5000/api/tasks/status/completed
router.get('/d', async (req, res) => {
  const completedTasks = await Task.find({ completed: true });
  res.json(completedTasks);
});

// 7. GET only pending tasks
// GET http://localhost:5000/api/tasks/status/pending
router.get('/status/pending', async (req, res) => {
  const pendingTasks = await Task.find({ completed: false });
  res.json(pendingTasks);
});

// 8. GET tasks filtered by category dynamic parameter
// GET http://localhost:5000/api/tasks/filter/category/:categoryName
router.get('/filter/category/:categoryName', async (req, res) => {
  const tasks = await Task.find({ category: req.params.categoryName });
  res.json(tasks);
});

// 9. DELETE clear all completed tasks at once (Bulk Action)
// DELETE http://localhost:5000/api/tasks/action/clear-completed
router.delete('/action/clear-completed', async (req, res) => {
  const result = await Task.deleteMany({ completed: true });
  res.json({ message: `${result.deletedCount} completed tasks deleted.` });
});

// 10. GET dashboard stats (Total, Completed, and Pending counts)
// GET http://localhost:5000/api/tasks/action/stats
router.get('/action/stats', async (req, res) => {
  const totalTasks = await Task.countDocuments();
  const completedCount = await Task.countDocuments({ completed: true });
  const pendingCount = await Task.countDocuments({ completed: false });
  
  res.json({
    totalTasks,
    completedCount,
    pendingCount
  });
});

module.exports = router;