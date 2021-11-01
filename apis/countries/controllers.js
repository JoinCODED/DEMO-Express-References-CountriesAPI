const e = require("express");
const Country = require("../../db/models/Country");

exports.fetchCountry = async (countryId, next) => {
  try {
    const country = await Country.findById(countryId);
    return country;
  } catch (error) {
    next(error);
  }
};

// Country List Route
exports.countryListFetch = async (req, res, next) => {
  try {
    const countries = await Country.find();
    return res.json(countries);
  } catch (error) {
    next(error);
  }
};

// Country Detail Route
exports.countryDetailFetch = (req, res, next) => {};

exports.countryCreate = async (req, res, next) => {
  try {
    const newCountry = await Country.create(req.body);
    return res.status(201).json(newCountry);
  } catch (error) {
    next(error);
  }
};

exports.countryDelete = async (req, res, error) => {
  try {
    await req.country.remove();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
