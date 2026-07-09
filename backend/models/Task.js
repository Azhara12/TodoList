const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true, 
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description empty!"], 
      trim: true,                                 
      minlength: [1, "Description is not empty!"] 
    },
    category: String,
    completed: Boolean,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", TaskSchema);