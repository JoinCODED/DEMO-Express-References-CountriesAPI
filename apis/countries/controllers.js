const Country = require("../../db/models/Country");
const State = require("../../db/models/State");

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
    const countries = await Country.find().populate("states");
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

exports.stateCreate = async (req, res, next) => {
  try {
    req.body.country = req.params.countryId;
    const newState = await State.create(req.body);
    await Country.findOneAndUpdate(req.country, {
      $push: { states: newState._id },
    });
    return res.status(201).json(newState);
  } catch (error) {
    next(error);
  }
};

exports.countryDelete = async (req, res) => {
  try {
    await req.country.remove();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
