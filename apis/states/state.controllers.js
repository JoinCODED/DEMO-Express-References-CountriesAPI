const State = require("../../db/models/State");

// State List Route
exports.stateListFetch = async (req, res, next) => {
  try {
    // const states = await State.find().populate("country");
    const states = await State.find().populate({
      path: "country",
      select: "name",
    });
    return res.json(states);
  } catch (error) {
    next(error);
  }
};

exports.stateCreate = async (req, res, next) => {
  try {
    const newState = await State.create(req.body);

    return res.status(201).json(newState);
  } catch (error) {
    next(error);
  }
};
