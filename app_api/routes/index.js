const express = require('express');
const router = express.Router();

const tripsController = require("../controllers/trips");

// route for trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList) // GET method routes tripList
  .post(tripsController.tripsAddTrip); // POST method Adds a trip

// GET method routes tripsFindByCode - requires 1 parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode) // GET method route individual trip
  .put(tripsController.tripsUpdateTrip) // PUT method updates a trip
  .delete(tripsController.tripsDeleteTrip); // DELETE method removes a trip

module.exports = router;