const express = require("express");
const {
  countryListFetch,
  countryDetailFetch,
  countryCreate,
  countryDelete,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

router.get("/", countryListFetch);

router.get("/:countryId", countryDetailFetch);

router.post("/", countryCreate);

router.delete("/:countryId", countryDelete);

module.exports = router;
