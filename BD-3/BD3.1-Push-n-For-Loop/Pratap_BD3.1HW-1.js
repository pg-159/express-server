let express = require('express');
let app = express();
let port = 3000;
app.use(express.json());
// sample data
let numbers = [1, 2, 3, 4, 5];

let strings = ['hello', 'world', 'javascript', 'node'];

function multiplyNumbers(numArray, multiplier){
  let result = [];
  for (let i = 0; i < numArray.length; i++){
    result.push(numArray[i] * multiplier);
  }
  return result;
}
app.get("/numbers/multiply", (req, res) => {
  let multiplier = parseFloat(req.query.multiplier);
  let result = multiplyNumbers(numbers, multiplier);
  res.json({result});
});

function concatStrings(strArray, suffix){
  let result = [];
  for (let i = 0; i < strArray.length; i++){
    result.push(strArray[i] + suffix);
  }
  return result;
}

app.get("/strings/concat", (req, res) => {
  let suffix = req.query.suffix;
  let result = concatStrings(strings, suffix)
  res.json({result});
});

function removeOddNumbers(numArray){
  let result = [];
  for (let i=0; i <  numArray.length; i++){
    if (numArray[i] % 2 == 0)
      result.push(numArray[i])
  }
  return result;
}
app.get("/numbers/remove-odds", (req, res) => {
  let result = removeOddNumbers(numbers);
    res.json({result});
});

function joinStrings(strArray){
  let result = '';
  for (let i = 0; i < strArray.length; i++){
    result = result + " " + strArray[i];
  }
  return result;
}

app.get("/strings/join", (req, res) => {
  let result = joinStrings(strings);
  res.json({result});
});

function doubleNumbers(numArray){
  let result = [];
  for (let i=0; i < numArray.length; i++){
    result.push(numArray[i] * 2)
  }
  return result;
}

app.get("/numbers/double", (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({result});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`)
});