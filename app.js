const express = require('express');
const morgan = require('morgan');

// DB
const connectDB = require('./db/database');

// Routes
const citiesRoutes = require('./apis/cities/routes');

// Middleware
const errorHandler = require('./middleware/errorHandler');

// Express instance
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/cities', citiesRoutes);

app.use(errorHandler);

connectDB();

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`This application is running on localhost:${PORT}`)
);
