let express = require('express');
let app = express();
let port = 3000;

// array of numbers
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// function to check if a number is prime
function isPrime(num){
  if (num <= 1) return false;
  for (let i=2; i < num; i++){
    if (num % i === 0) return false;
  }
  return true;
}

// function to filter prime numbers
function filterPrimeNumbers(num){
  return isPrime(num)
}
// endpoint 1: filter prime numbers
app.get("/prime-numbers", (req, res) => {
  let result = numbers.filter(num => filterPrimeNumbers(num))
  res.json(result)
})

// array of numbers
let numbers2 = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function to filter positive numbers
function filterPositiveNumbers(num) {
  return num > 0;
}
// endpoint 2: filter positive numbers
app.get("/positive-numbers", (req, res) => {
  let result = numbers2.filter(num => filterPositiveNumbers(num))
  res.json(result)
})

// array of numbers
let numbers3 = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

// function to filter positive numbers
function filterNegativeNumbers(num){
  return num < 0;
}
// endpoint 3: filter negative numbers
app.get("/negative-numbers", (req, res) => {
  let result = numbers3.filter(num => filterNegativeNumbers(num))
  res.json(result)
})

// array of numbers
let numbers4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function to filter odd numbers
function filterOddNumbers(num){
  return num % 2 !== 0;
}
// endpoint 4: filter odd numbers
app.get("/odd-numbers", (req, res) => {
  let result = numbers4.filter(num => filterOddNumbers(num))
  res.json(result)
})

// array of numbers
let numbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

// function to filter numbers greater than given value
function filterNumbersGreaterThan(num, value){
  return num > value;
}

app.get("/numbers-greater-than", (req, res) => {
  let value = parseFloat(req.query.value);
  let result = numbers.filter(num => filterNumbersGreaterThan(num, value))
  res.json(result)
})

// array of numbers
let numbers6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

// function to filter number less than a specified value
function filterNumbersLessThan(num, value){
  return num < value;
}

app.get("/numbers-less-than", (req, res) => {
  let value = parseFloat(req.query.value);
  let result = numbers.filter(num => filterNumbersLessThan(num, value))
  res.json(result)
})
app.listen(port, () => `Server is running on http://localhost: ${port}`);