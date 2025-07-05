const Task = require('../models/Task');

// Fetch all tasks (latest first)
 
exports.fetchAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

// Create a new task
 
exports.createNewTask = async ({ title, description }) => {
  const task = new Task({
    title: title.trim(),
    description: description.trim(),
  });
  return await task.save();
};

// Update a task by ID

exports.updateTaskById = async (id, updates) => {
  const updateFields = {};

  if (updates.title !== undefined) {
    if (typeof updates.title !== 'string' || !updates.title.trim()) {
      throw new Error('"title" must be a non-empty string');
    }
    updateFields.title = updates.title.trim();
  }

  if (updates.description !== undefined) {
    if (typeof updates.description !== 'string' || !updates.description.trim()) {
      throw new Error('"description" must be a non-empty string');
    }
    updateFields.description = updates.description.trim();
  }

  if (updates.completed !== undefined) {
    if (typeof updates.completed !== 'boolean') {
      throw new Error('"completed" must be a boolean');
    }
    updateFields.completed = updates.completed;
  }

  return await Task.findByIdAndUpdate(id, updateFields, { new: true });
};

// Delete a task by ID
 
exports.deleteTaskById = async (id) => {
  return await Task.findByIdAndDelete(id);
};
