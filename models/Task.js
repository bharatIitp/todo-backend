const mongoose = require('mongoose');

//Define the schema for a Task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //Adds createdAt and updatedAt fields
  }
);

//Export the Task model (associated with the 'tasks' collection)
module.exports = mongoose.model('Task', taskSchema);
