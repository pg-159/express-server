let express = require('express');
let app = express();
let port = 3000;

//Function to get github profile url
function generateProfileUrl(username){
  let result = "https://github.com/" +username;
  return result;
}
// Endpoint 1: Find github url for the given username
app.get("/github-profile", (req, res) => {
  let username = req.query.username;
  res.send(generateProfileUrl(username));
})

//Function to generate certificate
function generateCertificate(firstName, lastName, courseName){
  let result = "This certification is awarded to " + firstName + " " + lastName + " for completing the course " +courseName;
  return result;
}
// Endpoint 2: Generate Certificate
app.get("/certificate", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let courseName = req.query.courseName;

  res.send(generateCertificate(firstName, lastName, courseName));
})

// Function to calculate grade based on given subjects maths, science and english
function calculateGrade(maths, science, english){
  let gradeInPercentage = ((maths + science + english) / 300)* 100;

  return "Your grade in percentage is " + Math.ceil(gradeInPercentage) + "%";
}
// Endpoint 3: Find grade in percentage based on marks given for subjects maths, science and english
app.get("/grade", (req, res) => {
  let maths = parseInt(req.query.maths);
  let science = parseInt(req.query.science);
  let english = parseInt(req.query.english);

  res.send(calculateGrade(maths, science, english));
})

// Function to split the bill between friends, given amount and number of friends
function splitBill (billAmount, numberOfFriends){
  let splitAmount = (billAmount / numberOfFriends);

  return "Result: Each friend owes ₹. " +splitAmount+ " against the bill";
}
// Endpoint 4: Find the split amount for the given bill amount and number of friends
app.get("/split-bill", (req, res) => {
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseInt(req.query.numberOfFriends);

  res.send(splitBill(billAmount, numberOfFriends))
})

// Function to calculate monthly salary
function calculateSalary(totalHours, hourlyWage){
  let monthlySalary = (hourlyWage * totalHours);
  return "Result: Your monthly salary is ₹ "+monthlySalary;
}
app.get("/monthly-salary", (req, res) => {
  let totalHours = parseInt(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);

  res.send(calculateSalary(totalHours, hourlyWage));
})

app.listen(port, () => {
  console.log("Server is running on http://localhost: ",port);
})