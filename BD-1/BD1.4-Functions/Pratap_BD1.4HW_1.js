let express = require('express');
let app = express();
let port = 3000;

// Function to return a welcome message
function getWelcomeMessage(){
  return "We will now learn functions!"
}
// Endpoint 1: Return a welcome message
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage())
})

// Function to return greeting message
function getGreetingMessage(username){
  return "Hey, " + username + "! Are you ready to learn functions with us?";
}
// Endpoint 2: Take a username and return a greeting message
app.get("/greet", (req, res) => {
  let username = req.query.username;
  res.send(getGreetingMessage(username))
})

// Function to check if a person has experience
function checkYearOfExp(yearOfExp){
  if (yearOfExp > 0){
    return "You have some experience with functions. Great!";
  } else {
    return "No worries. You will start writing functions in no time!"
  }
}

// Endpoint 3: Take the years of experience in functions and return a message
app.get("/message", (req, res) => {
  let yearOfExp = parseFloat(req.query.yearsOfExp)
  res.send(checkYearOfExp(yearOfExp))
})

// Function to return the time the student can dedicate to learn functions
function getTime(days, hours){
  return days * hours;
}

// Endpoint 4: Take the hours per day and days in a week that the student can dedicate to learn functions and find total hours available per week.
app.get("/hours", (req, res) => {
  let days = parseFloat(req.query.days);
  let hours = parseFloat(req.query.hours);
  res.send(getTime(days, hours).toString());
})

// Function to return the modules completion message
function getModuleCompletion(username, hasCompleted){
  if (hasCompleted){
    return username + " has completed the modules";
  } else {
    return username + " has not completed the modules";
  }
}
// Endpoint 5: Take a username and a boolean indicating module completion status, return a message if the student has completed the modules or not.
app.get("/module-completion-status", (req, res) => {
  let username = req.query.username;
  let hasCompleted = req.query.hasCompleted === "true";
  res.send(getModuleCompletion(username, hasCompleted));
})

// Function to return a personalised greeting message
function getPersonalizedGreeting(city, name){
  return "Hey, " + name + "! What's famous about " + city + "?";
}

// Endpoint 6: Take a student's city and name, return a personalised greeting message
app.get("/personalized-greeting", (req, res) => {
  let city = req.query.city;
  let name = req.query.name;
  res.send(getPersonalizedGreeting(city,name));
})

// Function to find the age from birth year
function findAge(birthyear){
  return 2024 - birthyear;
}
// Endpoint 7: Take the birth year of the student and return the age
app.get("/find-age", (req, res) => {
  let birthyear = parseInt(req.query.birthyear);
  res.send(findAge(birthyear).toString())
})

// Function to return the time required message
function findRequiredTime(days, hours) {
  let time = days * hours;
  if (time >= 30){
    return "The time being dedicated is sufficient for learning functions"
  } else {
    return "The time being dedicated is not sufficient for learning functions"
  }
}

// Endpoint 8: Take the days per week and hours per day a student can dedicate to learn functions and return whether it is sufficient (>=30)
app.get("/is-time-sufficient", (req, res) => {
  let days = parseFloat(req.query.days);
  let hours = parseFloat(req.query.hours);
  res.send(findRequiredTime(days, hours).toString());
})
app.listen(port, ()=> {
  console.log("Server running on http://localhost: ",port)
})