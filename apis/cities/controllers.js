const City = require('../../db/models/City');

exports.fetchCity = async (cityId, next) => {
  try {
    const city = await City.findById(cityId);
    return city;
  } catch (error) {
    next(error);
  }
};

// City List Route
exports.cityListFetch = async (req, res, next) => {
  try {
    const cities = await City.find();
    return res.json(cities);
  } catch (error) {
    next(error);
  }
};

exports.cityCreate = async (req, res, next) => {
  try {
    const newCity = await City.create(req.body);
    return res.status(201).json(newCity);
  } catch (error) {
    next(error);
  }
};

exports.cityDelete = async (req, res, error) => {
  try {
    await req.city.remove();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
