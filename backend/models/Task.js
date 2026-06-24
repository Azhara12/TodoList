const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  completed: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
