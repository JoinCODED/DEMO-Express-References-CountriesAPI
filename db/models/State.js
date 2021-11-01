const { Schema, model } = require("mongoose");

const StateSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

module.exports = model("State", StateSchema);
