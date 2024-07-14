let express = require('express');
let app = express();
let port = 3000;

// array of temperatures in degree celsius
let temperatures = [22, 26, 19, 30, 23, 28, 17, 31];

// function to filter temperature above 25 degrees Celsius
function filterHighTemperatures(ele){
  return ele > 25;
}

// endpoint 1: given an array of temp., return only the temp. above 25 degrees celsius
app.get("/high-temperatures", (req, res) => {
  let result = temperatures.filter(ele => filterHighTemperatures(ele))
  res.json(result);
})

// array of prices in rupees
let prices = [80, 120, 95, 150, 60, 110];

// function to filter prices less than or equal to 100
function filterLowPrices(ele) {
  return ele <= 100;
}

// endpoint 2: given an array of prices, return only the prices less than or equal to 100
app.get("/low-prices", (req, res) => {
  let result = prices.filter(ele => filterLowPrices(ele))
  res.json(result);
})

// array of product ratings (out of 5)
let ratings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];

// function to filter ratings greater than 3.5
function filterHighRatings(ele){
  return ele > 3.5;
}

// endpoint 3: given an array of product ratings, return only the ratings greater than 3.5
app.get("/high-ratings", (req, res) => {
  let result = ratings.filter(ele => filterHighRatings(ele))
  res.json(result)
})

// array of Indian names
let indianNames = ["Akshay", "Priyanka", "Arjun", "Anushka", "Rajesh", "Kavita"];

// function to filter names longer than 6 characters
function filterLongIndianNames(ele){
  return ele.length;
}

// endpoint 4: given an array of Indian names, return only the names longer than 6 characters
app.get("/long-indian-names", (req, res) => {
  let result = indianNames.filter(ele => filterLongIndianNames(ele))
  res.json(result)
})

// array of products price
let productPrices = [10, 25, 50, 75, 100, 150, 200]

// function to filter products cheaper than certain price
function filterCheaperProducts(ele, filterParam){
  return ele < filterParam;
}

// endpoint 5: given an array of product prices, return only the products cheaper than a certain price
app.get("/cheaper-products", (req, res) => {
  let filterParam = parseFloat(req.query.filterParam);
  let result = productPrices.filter(ele => filterCheaperProducts(ele, filterParam))
  res.json(result);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
})