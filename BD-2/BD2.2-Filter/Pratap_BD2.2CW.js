let express = require('express');
let app = express();
let port = 3000;

// array of numbers
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function to filter even numbers
function filterEvenNumbers(num){
  return num % 2 === 0
}

//endpoint 1: given an array of numbers, return only the even numbers
app.get("/even-numbers", (req, res) => {
  let results = numbers.filter(num => filterEvenNumbers(num));
  res.json(results);
})

// array of ages
let ages = [10, 20, 30, 15, 17, 25]

// function to filter ages greater than 18
function filterAgesGreaterThan18(age) {
  return age > 18;
}

// endpoint 2: given an array of ages, return only the ages greater than 18
app.get("/adult-ages", (req, res) => {
  let results = ages.filter(age => filterAgesGreaterThan18(age))
  res.json(results)
})

// array of words
let words = ["apple", "banana", "cherry", "date", "fig", "grape"];

// function to filter words longer than 5 characters
function filterWordsGreaterThanFiveChars(word){
  return word.length > 5;
}

// endpoint 3: given an array of words, return only the words longer than 5 characters
app.get("/long-words", (req, res) => {
  let results = words.filter(word => filterWordsGreaterThanFiveChars(word))
  res.json(results)
})
// array of file sizes in MB
let fileSizes = [50, 200, 75, 120, 30, 90, 150]

// function to filter files smaller than a certain size
function filterSmallerFileSizes(fileSize, filterParam){
  return fileSize < filterParam;
}

// endpoint 4: given an array of files sizes in MB, return only the files smaller than a certain size
app.get("/small-files", (req, res) => {
  
  let filterParam = req.query.filterParam;
  let results = fileSizes.filter(fileSize => filterSmallerFileSizes(fileSize, filterParam))
  
  res.json(results)
})
app.listen(port, () => console.log(`Server is running on http://localhost ${port}`));