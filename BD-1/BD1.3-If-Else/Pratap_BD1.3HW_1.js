let express = require('express');
let app = express();
let port = 3000;

// Endpoint 1: Check if a number is whole number or not
app.get("/check-whole-number", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";

  if (number >= 0){
    result = "whole number";
  } else {
    result = "not whole number";
  }
  res.send("Number is "+result);
})

// Endpoint 2: Check if two numbers are equal
app.get("/check-equal", (req, res) => {
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);
  let result = "";

  if (num1 === num2){
    result = "equal";
  } else {
    result = "not equal";
  }
  res.send("Number are "+result);
})

// Endpoint 3: Check if a user is active (based on a boolean value)
app.get("/check-active", (req, res) => {
  let isActive = req.query.isActive === "true"
  let result = "";

  if (isActive){
    result = "User is Active";
  } else {
    result = "User is not Active";
  }
  res.send(result);
})

// Endpoint 4: Check if a user is eligible for a discount (based on cost of goods being over 1000)
app.get("/check-discount", (req, res) => {
  let cost = parseInt(req.query.cost);
  let result = "";

  if (cost > 1000){
    result = "User is eligible for a discount";
  } else {
    result = "User is not eligible for a discount";
  }
  res.send(result);
})

// Endpoint 5: Check if a person is fresher, experienced or non-working
app.get("/check-experience", (req, res) => {
  let workExperience = parseFloat(req.query.workExperience);
  let result = "";

  if (workExperience > 0){
    result = "experienced";
  } else if (workExperience < 0) {
    result = "non-working";
  } else {
    result = "fresher";
  }
  res.send("Person is "+result);
})

// Endpoint 6: Check if the result is Grade A (above 80), B (between 50 to 80) or Fail (below 50)
app.get("/check-result", (req, res) => {
  let result = parseFloat(req.query.result);
  let grade = "";

  if (result > 80){
    grade = "A";
  } else if (result >= 50){
    grade ="B";
  } else {
    grade = "Fail";
  }
  res.send("The grade is "+grade);
})

// Endpoint 7: Check if student's attendance is low, moderate, or high (based on the number of classes)
app.get("/check-attendance", (req, res) => {
  let attendance = parseFloat(req.query.attendance);
  let result = "";

  if (attendance < 50){
    result = "low";
  } else if (attendance <= 90){
    result ="moderate";
  } else {
    result = "high";
  }
  res.send("Attendance is "+result);
})

// Endpoint 8: Check if a restaurant has low, medium, or high rating (based on the number of stars)
app.get("/check-rating", (req, res) => {
  let stars = parseInt(req.query.stars);
  let result = "";

  if (stars < 3){
    result = "low";
  } else if (stars <= 4){
    result ="medium";
  } else {
    result = "high";
  }
  res.send("Restaurant rating is "+result);
})

app.listen(port, () => {
  console.log("Server is running on http://localhost: ",port);
})