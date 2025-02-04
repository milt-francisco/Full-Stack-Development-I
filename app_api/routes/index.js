const express = require('express');
const router = express.Router();

const tripsController = require("../controllers/trips");

// route for trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList);

// GET method routes tripsFindByCode - requires 1 parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode);

module.exports = router;