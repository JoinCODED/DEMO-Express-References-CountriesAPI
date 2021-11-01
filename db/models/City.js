const { Schema, model } = require("mongoose");

const CitySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
});

module.exports = model("City", CitySchema);
