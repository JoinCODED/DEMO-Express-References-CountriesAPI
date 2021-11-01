const express = require("express");
const {
  countryListFetch,
  countryDetailFetch,
  countryCreate,
  countryDelete,
  stateCreate,
  fetchCountry,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("countryId", async (req, res, next, countryId) => {
  const country = await fetchCountry(countryId, next);
  if (country) {
    req.country = country;
    next();
  } else {
    next({ status: 404, message: "Country Not Found!" });
  }
});

router.get("/", countryListFetch);

router.get("/:countryId", countryDetailFetch);

router.post("/", countryCreate);

router.post("/:countryId/states", stateCreate);

router.delete("/:countryId", countryDelete);

module.exports = router;
