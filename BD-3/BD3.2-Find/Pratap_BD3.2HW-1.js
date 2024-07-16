let express = require('express');
let app = express();
let port = 3000;

let users = [
  { id: 1, username: 'ankit', fullName: 'Ankit Kumar', email: 'ankit@gmail.com', },
  { id: 2, username: 'dhananjit', fullName: 'Dhananjit Singh', email: 'dhananjit.singh@gmail.com' },
];

let creditCards = [
  { number: '1234567890123456', holder: 'John Doe', expiry: '12/24' },
  { number: '9876543210987654', holder: 'Jane Smith', expiry: '06/23' }
];

let books = [
  { isbn: '9783161484100', title: 'Example Book', author: 'John Author' },
  { isbn: '9781234567897', title: 'Another Book', author: 'Jane Writer' }
];

let people = [
  { ssn: '123-45-6789', name: 'John Doe', birthDate: '1990-01-01' },
  { ssn: '987-65-4321', name: 'Jane Smith', birthDate: '1985-05-05' }
];

// Check username availability
function checkAvailability(ele, username){
  return ele.username === username;
}

// endpoint 1: Check username availability
app.get("/username/find/:username", (req, res) => {
  let username = req.params.username;
  let result = users.find(ele => checkAvailability(ele, username))

  if (result) {
    res.json({result: "username is not available"})
  } else {
    res.json({result: "username is available"})
  }
});
// function to find credit card number
function findCreditCard(ele, cardNumber){
  return ele.number === cardNumber;
}
// endpoint 2: Find Credit Card Number
app.get("/credit-cards/find", (req, res) => {
  let cardNumber = req.query.cardNumber;
  let creditCard = creditCards.find(ele => findCreditCard(ele, cardNumber));
  res.json({creditCard});
});
// function to find email address
function findUserByEmail(ele, email) {
  return ele.email === email;
}
// endpoint 3: Find Email Address
app.get("/emails/find", (req, res) => {
  let email = req.query.email;
  let user = users.find(ele => findUserByEmail(ele, email))
  res.json({user});
});

// function to find book by isbn number
function findBookByISBN(ele, isbn){
  return ele.isbn === isbn;
}

// endpoint 4: Find ISBN Number ( for books )
app.get("/books/find", (req, res) => {
  let isbn = req.query.isbn;
  let book = books.find(ele => findBookByISBN(ele, isbn))
  res.json({book});
});

// function to find person by ssn
function findPersonBySSN(ele, ssn){
  return ele.ssn === ssn;
}
// endpoint 5: Find Social Security Number (SSN)
app.get("/ssn/find", (req, res) => {
  let ssn = req.query.ssn;
  let person = people.find(ele => findPersonBySSN(ele, ssn))
  res.json({person});
});

app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));