// Load .env variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Use Morgan for logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse JSON requests
app.use(express.json());



//MongoDB Connect
const connectDB = require('./config/db');
connectDB();


// Routes
app.use('/tasks', tasksRouter);

// Global Error Handler (Always last middleware)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (${process.env.NODE_ENV})`);
});
