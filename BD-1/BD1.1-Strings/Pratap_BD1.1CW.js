let express = require("express");
let app = express();

// Endpoint 1: to shout name in uppercase
app.get("/shout", (req, res) => {
  let myName = (req.query.name).toUpperCase();
  console.log(myName);
  res.send(myName);
})

// Endpoint 2: Concatenate firstname and lastname to return fullname
app.get("/fullname", (req,res) => {
  let firstName = req.query.firstname;
  let lastName = req.query.lastname;
  let fullName = firstName + " " + lastName;
  
  console.log(fullName);
  res.send(fullName);
});

// Endpoint 3: Concatenate month and year to return a formatted date
app.get("/date", (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month +", "+year;
  console.log(formattedDate);
  res.send(formattedDate);
});

// Endpoint 4: Return a greeting with given name
app.get("/greet", (req, res) => {
  let name = req.query.name;
  let greeting = "Namaste, " + name + "!";
  console.log(greeting);
  res.send(greeting);
});

// Endpoint 5: Return a formatted address 
app.get("/address", (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let formattedAddress = street + ", " + city + ", " + state;

  console.log(formattedAddress);
  res.send(formattedAddress);
});

// Endpoint 6: Return a formatted email
app.get("/email", (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let email = username + "@" + domain;
  
  console.log(email);
  res.send(email);
});

PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:",PORT);
});