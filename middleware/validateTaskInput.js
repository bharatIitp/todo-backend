const AppError = require('../utils/AppError');

//Middleware: Validate input for creating a task (POST /tasks)
 
exports.validateCreateTask = (req, res, next) => {
  const { title, description } = req.body;

  if (typeof title !== 'string' || !title.trim()) {
    return next(new AppError('Field "title" is required and must be a non-empty string.', 400));
  }

  if (typeof description !== 'string' || !description.trim()) {
    return next(new AppError('Field "description" is required and must be a non-empty string.', 400));
  }

  next(); // input is valid → continue to controller
};

//Middleware: Validate input for updating a task (PUT /tasks/:id)

exports.validateUpdateTask = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return next(new AppError('If provided, "title" must be a non-empty string.', 400));
  }

  if (description !== undefined && (typeof description !== 'string' || !description.trim())) {
    return next(new AppError('If provided, "description" must be a non-empty string.', 400));
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return next(new AppError('"completed" must be a boolean (true or false).', 400));
  }

  next();
};
 // valid update