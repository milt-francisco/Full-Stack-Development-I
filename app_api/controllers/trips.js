const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // Register model
const Model = mongoose.model("trips");

// GET: /trips - lists all trips
// Response must always include HTML status codes
// and JSON message to requesting client
const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();

  // Show results of query
  // console.log(q);

  if(!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

// GET: /tiprs/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  const q = await Model
  .find({'code': req.params.tripCode })
  .exec();

  // Show results of query
  // console.log(q);

  if(!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};