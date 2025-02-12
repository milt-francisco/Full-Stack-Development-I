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

// GET: /trips/:tripCode - lists a single trip
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

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  const q = await newTrip.save();

  // Show results of operation
  // console.log(q); 
  if (!q) {
    return res.status(400).json(err);
  } else {
    return res.status(201).json(q);
  } 
}

//PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
  // // Debugging
  // console.log(req.params);
  // console.log(req.body);

  const q = await Model
    .findOneAndUpdate(
      { 'code': req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      }
    )
    .exec();

    // // Show results of operation
    // console.log(q);
    
    if (!q) {
      return res.status(400).json({message: "Trip not found"});
    } else {
      return res.status(201).json(q);
    }   
}

//DELETE: /trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async(req, res) => {
  // console.log('Entering app/api/controllers/trips.js')

  const q = await Model.findOneAndDelete(
    { 'code': req.params.tripCode}
  )
  .exec();

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
}

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};