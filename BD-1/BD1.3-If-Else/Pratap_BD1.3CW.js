let express = require("express");
let app = express();
let port = 3000;

// Endpoint 1: Check if a number is positive or negative
app.get("/check-number", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if (number >= 0){
    result = "Positive Number";
  } else {
    result = "Negative Number";
  }
  res.send(result);
});

// Endpoint 2: Check if a number is even or odd
app.get("/check-even-odd", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if (number % 2 === 0){
    result = "Number is even";
  } else {
    result = "Number is odd";
  }
  res.send(result);
});

// Endpoint 3: Check if a user is logged in (based on a boolean value)
app.get("/check-login", (req, res) => {
  let isLoggedIn = req.query.isLoggedIn;
  let result = "";
  if (isLoggedIn === "true"){
    result = "User is logged in";
  } else {
    result = "User is not logged in";
  }
  res.send(result);
});

// Endpoint 4: Check if a user is eligible for a discount (based on age being over 65)
app.get("/check-discount", (req, res) => {
  let age = parseFloat(req.query.age);
  let result = "";

  if (age > 65){
    result = "User is eligible for a discount";
  } else {
    result = "User is not eligible for a discount";
  }
  res.send(result);
});
// Endpoint 5: Check if a number is positive, negative or zero
app.get("/check-number-type", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";

  if (number > 0){
    result = "Number is positive";
  } else if (number < 0){
    result = "Number is negative";
  } else {
    result = "Number is zero";
  }
  res.send(result);
});

// Endpoint 6: Check if a temperature is cold, warm, or hot (below 15°C), warm (15°C to 25°C), or hot (above 25°C).
app.get("/check-temperature", (req, res) => {
  let temperature = parseFloat(req.query.temperature);
  let result = "";

  if (temperature < 15){
    result = "Temperature is cold";
  } else if (temperature <= 25){
    result = "Temperature is warm";
  } else {
    result = "Temperature is hot";
  }
  res.send(result);
});


// Endpoint 7: Check if a user's activity level is low, moderate, or high (based on the number of steps).
app.get("/check-activity-level", (req, res) => {
  let steps = parseFloat(req.query.steps);
  let result = "";

  if (steps < 5000){
    result = "Activity level is low";
  } else if (steps <= 10000){
    result = "Activity level is moderate";
  } else {
    result = "Activity level is high";
  }
  res.send(result);
});

// Endpoint 8: Check if a social media post has low, medium, or high engagement (based on number of likes).
app.get("/check-engagement", (req, res) => {
  let likes = parseInt(req.query.likes);
  let result = "";

  if (likes < 100){
    result = "Engagement level is low";
  } else if (likes <= 500){
    result = "Engagement level is medium";
  } else {
    result = "Engagement level is high";
  }
  res.send(result);
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:",port);
});