// DB Connection and Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete existing records and insert seed data
const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

// Close MongoDB connection and exit
seedDB().then(async () => {
  await Mongoose.connection.close();
  process.exit(0);
});