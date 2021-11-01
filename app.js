const express = require("express");
const connectDB = require("./db/database");
const countryRoutes = require("./apis/countries/routes");
// RESTful APIs
// JSON

// Express instance
const app = express();

// Allows our app to access the body of the request
// Middleware
app.use(express.json());
app.use("/api/countries", countryRoutes);
// METHOD: GET / POST / DELETE / PUT
// PATH: URL

// My first route

connectDB();

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`This application is running on localhost:${PORT}`)
);
