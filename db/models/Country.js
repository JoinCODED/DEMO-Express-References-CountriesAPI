const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    area: Number,
    states: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "State",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse Populate
// CountrySchema.virtual("states", {
//   ref: "State", // Model we're referring to
//   localField: "_id",
//   foreignField: "country", // The field we want to link to in the State model
//   justOne: false, // we want an array, so we will set it to false
// });

module.exports = mongoose.model("Country", CountrySchema);
