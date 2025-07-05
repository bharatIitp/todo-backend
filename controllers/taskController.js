const taskService = require('../services/taskService');
const AppError = require('../utils/AppError');

// GET /tasks → Fetch all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.fetchAllTasks();
    res.status(200).json({
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (err) {
    next(new AppError('Failed to fetch tasks', 500));
  }
};

// POST /tasks → Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await taskService.createNewTask({ title, description });

    res.status(201).json({
      message: 'Task created successfully',
      data: task,
    });
  } catch (err) {
    next(new AppError('Failed to create task', 500));
  }
};

// PUT /tasks/:id → Update a task
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await taskService.updateTaskById(id, updates);

    if (!updatedTask) {
      return next(new AppError(`Task with ID ${id} not found.`, 404));
    }

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (err) {
    next(new AppError(err.message || 'Failed to update task', 500));
  }
};

// DELETE /tasks/:id → Delete a task
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskService.deleteTaskById(id);

    if (!deletedTask) {
      return next(new AppError(`Task with ID ${id} not found.`, 404));
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (err) {
    next(new AppError('Failed to delete task', 500));
  }
};
