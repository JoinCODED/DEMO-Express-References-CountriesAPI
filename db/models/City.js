const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  countryName: String,
  countryImage: String,
});

module.exports = mongoose.model('City', CitySchema);
