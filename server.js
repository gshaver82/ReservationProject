// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const reservationList = require("./tableinfo.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
// var reservationList = [
//   // {
//   //   routeName: "yoda",
//   //   name: "Yoda",
//   //   role: "Jedi Master",
//   //   age: 900,
//   //   forcePoints: 2000
//   // },
//   {
//     // routeName: "yoda",
//     name: "testname1",
//     phonenumber: "612-612-1501",
//     email: "testname1@testname1.com",
//     uniqueID: 42,
//   },
// ];

// Routes
// =============================================================

//homepage here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});


//reservation webpage gets displayed here
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
//tables webpage gets displayed here
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays up to 5 people who are at tables
app.get("/api/tables", function (req, res) {

  //want to limit the reservationList arrray to 0-4 and send that to the return

  return res.json(reservationList.slice(0,5));
});
//displays everyone else who is waiting in reservation
app.get("/api/waitlist", function (req, res) {
  //want to limit the reservationList arrray to 4+ and send that to the return
  
  return res.json(reservationList.slice(5));
});


//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------


// Create New Characters - takes in JSON input
app.post("/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware

  // console.log("req.body" + req.body);
  var newReservation = req.body;
  console.log(newReservation);
  // console.log("newReservation" + newReservation);
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newReservation.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  // console.log("newReservation " +newReservation);
  // console.log("table array " + tableArray);
  reservationList.push(newReservation);
  // console.log("table array " + tableArray);
  res.json(reservationList);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
