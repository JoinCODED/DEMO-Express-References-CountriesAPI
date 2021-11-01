const express = require("express");
const morgan = require("morgan");

// DB
const connectDB = require("./db/database");

// Routes
const countryRoutes = require("./apis/countries/routes");

// Middleware
const errorHandler = require("./middleware/errorHandler");
const stateRoutes = require("./apis/states/state.routes");
// RESTful APIs
// JSON

// Express instance
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);

// METHOD: GET / POST / DELETE / PUT
// PATH: URL

app.use(errorHandler);

connectDB();

const PORT = 8004;

app.listen(PORT, () =>
  console.log(`This application is running on localhost:${PORT}`)
);
