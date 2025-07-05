// middleware/errorHandler.js

//Global error-handling middlewar, Captures all errors passed via next(err).Works with custom AppError class or default Error
 
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Useful during development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  } else {
    console.error('🔴', err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server.',
  });
};

module.exports = errorHandler;
