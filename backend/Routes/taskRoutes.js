const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/taskController");

// Apply protect middleware to all routes
router.use(protect);

// 1. GET all tasks for the logged in user
router.get("/", getTasks);

// 2. POST a new task
router.post("/", createTask);

// 3. DELETE a task
router.delete("/:id", deleteTask);

// 4. PUT (update) a task
router.put("/:id", updateTask);

// 5. PATCH (Toggle completion status)
router.patch("/:id/toggle", toggleTaskCompletion);

// 6. GET only completed tasks
router.get("/status/completed", getCompletedTasks);

// 7. GET only pending tasks
router.get("/status/pending", getPendingTasks);

// 8. GET tasks filtered by category
router.get("/filter/category/:categoryName", getTasksByCategory);

// 9. DELETE clear all completed tasks at once
router.delete("/action/clear-completed", clearCompletedTasks);

// 10. GET dashboard stats
router.get("/action/stats", getDashboardStats);

module.exports = router;
