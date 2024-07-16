let express = require('express');
let app = express();
let port = 3000;

// Function to return welcome message
function getWelcomeMessage(){
  return "Welcome to our service!"  
}
// Endpoint 1: Return a welcome message
app.get("/welcome", (req, res) => {
  res.send(getWelcomeMessage())
})

// Function to return greeting message
function getGreetingMessage(username) {
  return "Hello, " + username + "!";
}
// Endpoint 2: Take a username and return a greeting message
app.get("/greet", (req, res) => {
  let username = req.query.username;
  res.send(getGreetingMessage(username));
})

// Function to check if a password is strong
function checkPassword(password){
  if(password.length > 15) {
    return "Password is strong.";
  }
  else {
    return "Password is weak.";
  }
}
// Endpoint 3: Take a password and return if it is strong (lenght > 15) or weak
app.get("/check-password", (req, res)=> {
  let password = req.query.password;
  res.send(checkPassword(password));
})

// Function to return the sum of two number
function calculateSum (num1, num2){
  let sum = num1 + num2;
  return sum.toString();
}
// Endpoint 4: Take two numbers and return their sum
app.get("/sum", (req, res)=> {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(calculateSum(num1, num2))
})

// Function to return the subscription status message
function checkSubscriptionStatus(username, subscribed){
  if (subscribed === "true"){
    return username + " is subscribed"
  } else {
    return username + " is not subscribed"
  }
}
// Endpoint 5: Take a username and a boolean indicating subscription status, return a message if the user is subscribed
app.get("/subscription-status", (req, res) => {
  let username = req.query.username;
  let subscribed = req.query.isSubscribed;

  res.send(checkSubscriptionStatus(username, subscribed));
})

// Function to return the final price after discount
function calculateDiscountedPrice(price, discount){
  let finalPrice = price - (price * discount) / 100;
  return finalPrice.toString();
}
// Endpoint 6: Take a product price and discount percentage, return the final price after discount
app.get("/discounted-price", (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);

  res.send(calculateDiscountedPrice(price, discount))
})

// Function to return a personalised greeting message
function getGreeting(age, gender, name){
  return "Hello, " + name + "! You are a " + age + " year old " + gender + "."
}
// Endpoint 7: Take a user's age, gender, and name, return a personalised greedting message
app.get("/personalized-greeting", (req, res) => {
  let age = req.query.age;
  let gender = req.query.gender;
  let name = req.query.name;

  res.send(getGreeting(age, gender, name));
});

//Function to return the final price after applying discount and tax
function calculateFinalPrice(price, discount, tax){
  let discountedPrice = price - (price * discount / 100)
  let finalPrice = discountedPrice + (discountedPrice * (tax / 100));
  return finalPrice.toString();
}
// Endpoint 8: Take a product price, discount percentage, and tax rate, return the final price after applying discount and tax
app.get("/final-price", (req, res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  res.send(calculateFinalPrice(price, discount, tax))
})

// Function to return the total exercise time
function calculateTotalExerciseTime(running, cycling, swimming){
  return running + cycling + swimming
}
// Endpoint 9: Take three fitness activity durations (running, cycling, swimming) and return total exercise time
app.get("/total-exercise-time", (req, res) => {
  let running = parseFloat(req.query.running);
  let cycling = parseFloat(req.query.cycling);
  let swimming = parseFloat(req.query.swimming);

  res.send(calculateTotalExerciseTime(running, cycling, swimming).toString());
})
app.listen(port, ()=> {
  console.log("Server running on http://localhost: ",port)
})