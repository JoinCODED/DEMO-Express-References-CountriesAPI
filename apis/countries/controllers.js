const e = require("express");
const Country = require("../../db/models/Country");

// Country List Route
exports.countryListFetch = async (req, res) => {
  try {
    const countries = await Country.find();
    return res.json(countries);
  } catch (error) {
    console.log("🚀 ~ file: controllers.js ~ line 8 ~ error", error);
  }
};

// Country Detail Route
exports.countryDetailFetch = (req, res) => {};

exports.countryCreate = async (req, res) => {
  try {
    const newCountry = await Country.create(req.body);
    return res.status(201).json(newCountry);
  } catch (error) {
    console.log(
      "🚀 ~ file: controllers.js ~ line 15 ~ exports.countryCreate=async ~ error",
      error
    );
  }
};

exports.countryDelete = async (req, res) => {
  try {
    const country = await Country.findById(req.params.countryId);
    if (country) {
      await country.remove();
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "Country not Found" });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: controllers.js ~ line 32 ~ exports.countryDelete ~ error",
      error
    );
  }
};
