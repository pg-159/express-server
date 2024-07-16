let express = require('express');
let app = express();
let port = 3000;

let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", 'world', 'javascript', 'node'];

function addToArr(numbers, num){
  numbers.push(num);
  return numbers;
}

app.get("/numbers/add", (req, res) => {
  let result = addToArr(numbers, 6)
  res.json(result);
});

function addToStrings(strings, str){
  strings.push(str);
  return strings;
}

app.get("/strings/add", (req, res) => {
  let result = addToStrings(strings, "express");
  res.json(result);
});

// function to sum an array of numbers
function sumNumbers(numArray){
  let sum = 0;
  for (let i = 0; i < numArray.length; i++){
    sum = sum + numArray[i]
  }
  return sum;
}
// endpoint 3: sum an array of numbers using for loop
app.get("/numbers/sum", (req, res) => {
  let result = sumNumbers(numbers)
  res.json({sum: result});
});

// function to find the maximum number in an array
function findMax(numArray){
  let max = numArray[0];
  for (let i = 1; i < numArray.length; i++){
    if (numArray[i] > max){
      max = numArray[i];
    }
  }
  return max;
}

// endpoint 4: find the maximum number in an array
app.get("/numbers/max", (req, res) => {
  let result = findMax(numbers)
  res.json({max: result});
});

app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`))