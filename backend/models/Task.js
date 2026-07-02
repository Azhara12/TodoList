const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String,
  category: String,
  completed: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
