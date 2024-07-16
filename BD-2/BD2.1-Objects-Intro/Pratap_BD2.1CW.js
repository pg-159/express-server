let express = require('express');
let app = express();
let PORT = 3000;

// define an object on the server: person
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true
}

// endpoint 1: return the person object
app.get("/person", (req, res) =>{
  res.json(person);
})

// function to get full name of the person
function getFullName(person){
  return person.firstName + " " + person.lastName;
}
// endpoint 2: access the full name of the person
app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person)
  res.json({fullName: fullName})
})

// function to get the first name and gender of the person
function getFirstNameAndGender(person){
  return {
    firstName: person.firstName,
    gender: person.gender
  }
}
// endpoint 3: access just the first name and gender of the person
app.get("/person/firstName-gender", (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender)
})

// function to increment the age of the person
function getIncrementedAgeObject(person) {
  person.age = person.age + 1;
  return person;
}

// endpoint 4: increment the age of the person and return the updated object
app.get("/person/increment-age", (req, res) => {
  let updatedObject = getIncrementedAgeObject(person);
  res.json (updatedObject);
})

// function to get the full name and membership status of the person
function getFullNameAndMembership(person){
  return {
    fullName: getFullName(person),
    isMember: person.isMember
  }
}
// endpoint 5: return the full name and membership status of the person
app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person)
  res.json(fullNameAndMembership)
})

// function to calculate final price with discount for members
function getFinalPrice(cartTotal, isMember) {
  let finalPrice = 0;
  if (isMember === true){
    finalPrice = cartTotal - (cartTotal * 0.1);
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}
// endpoint 7: get final price after discount for members
app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal)
  let finalPrice = getFinalPrice(cartTotal, person.isMember)

  res.json({finalPrice : finalPrice});
})

// function to calculate shipping cost based on cart total and membership status
function getShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if (cartTotal > 500 && isMember === true){
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
}

// endpoint 8: get shipping cost based on cart total and membership status
app.get("/person/shipping-cost", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  shippingCost = getShippingCost(cartTotal, person.isMember);

  res.json({shippingCost: shippingCost.toFixed(2)})
})
app.listen(PORT, () => console.log("Server is listening on port", PORT))