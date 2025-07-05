const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {
  validateCreateTask,
  validateUpdateTask,
} = require('../middleware/validateTaskInput');

// Routes: Middleware → Controller mapping
router.get('/', taskController.getAllTasks);

router.post('/', validateCreateTask, taskController.createTask);

router.put('/:id', validateUpdateTask, taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
