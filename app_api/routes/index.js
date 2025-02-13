const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  const authHeader = req.headers["authorization"];
  // console.log('Auth Header: ' + authHeader);

  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.status(401);
  }

  let headers = authHeader.split(" ");
  if (headers.length < 1) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(" ")[1];
  // console.log('Token: ' + token);

  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }
  // console.log(process.env.JWT_SECRET);
  // console.log(jwt.decode(token));

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verified) => {
      if (err) {
        return res.sendStatus(401).json("Token Validation Error!");
      }
      req.auth = verified; // Set auth param to decoded object
    }
  );
  next(); // Continue
}

// Authentication
router.route("/login").post(authController.login);
router.route("/register").post(authController.register); // NOTE: Add authenticateJWT to this route after initial admins are added

// routes for trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList) // GET method routes tripList
  .post(authenticateJWT, tripsController.tripsAddTrip); // POST method Adds a trip

// routes tripsFindByCode - requires 1 parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode) // GET method route individual trip
  .put(authenticateJWT, tripsController.tripsUpdateTrip) // PUT method updates a trip
  .delete(authenticateJWT, tripsController.tripsDeleteTrip); // DELETE method removes a trip

module.exports = router;
