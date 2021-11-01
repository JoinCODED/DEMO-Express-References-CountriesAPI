const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  area: Number,
});

module.exports = mongoose.model("Country", CountrySchema);
