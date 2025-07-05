// Custom application error class
// Adds a statusCode along with a message
// Helpful in separating operational vs programming errors

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Parent class constructor (Error)

    this.statusCode = statusCode || 500; // Default = Internal Server Error
    this.isOperational = true; // Flag for known errors (not bugs)

    // Capture clean stack trace (skip constructor)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
