const express = require("express");
const { stateListFetch, stateCreate } = require("./state.controllers");

// Create a mini express application
const router = express.Router();

router.get("/", stateListFetch);

router.post("/", stateCreate);

module.exports = router;
