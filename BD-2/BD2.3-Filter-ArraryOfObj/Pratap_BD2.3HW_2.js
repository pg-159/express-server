let express = require('express');
let app = express();

// array of products
let products = [
  {name: "Product A", inStock: true},
  {name: "Product B", inStock: false},
  {name: "Product C", inStock: true},
  {name: "Product D", inStock: false}
];

let users = [
  {name: "Alice", age: 25},
  {name: "Bob", age: 30},
  {name: "Charlie", age: 17},
  {name: "Dave", age: 16}
];

let productPrices = [
  {name: "Product A", price: 50},
  {name: "Product B", price: 150},
  {name: "Product C", price: 200},
  {name: "Product D", price: 90}
];
// array of articles with word counts
let articles = [
  {title: "Article A", wordCount: 400},
  {title: "Article B", wordCount: 600},
  {title: "Article C", wordCount: 700},
  {title: "Article D", wordCount: 300}
];

let movies = [
  {title: "Movie A", rating: 8.5},
  {title: "Movie B", rating: 7.0},
  {title: "Movie C", rating: 9.0},
  {title: "Movie D", rating: 6.5}
];
// array of employees with experience in years
let employees = [
  {name: "Employee A", experience: 3},
  {name: "Employee B", experience: 6},
  {name: "Employee C", experience: 10},
  {name: "Employee D", experience: 2}
];

// function to filter in-stock products
function filterInStockProducts(product){
  return product.inStock === true;
}
// endpoint 1: product list of stock available
app.get("/in-stock-products", (req, res) => {
  result = products.filter(product => filterInStockProducts(product));
  res.json(result);
});

// function to filter adult users
function filterAdults(user){
  return user.age >= 18;
}

// endpoint 2: list out users who are 18 years old or older
app.get("/adult-users", (req, res) => {
  let result = users.filter(user => filterAdults(user))
  res.json(result);
});

// function to filter expensive products
function filterExpensiveProducts(product, price){
  return product.price > price;
}
// endpoint 3: Filter Expensive Products
app.get("/expensive-products", (req, res) => {
  let price = parseFloat(req.query.price);
  let result = productPrices.filter(product => filterExpensiveProducts(product, price))
  res.json(result);
});

// function to filter long articles
function filterLongArticles(article, minWords){
  return article.wordCount > minWords;
}

// endpoint 4: filter articles by word count
app.get("/long-articles", (req, res) => {
  let minWords = parseFloat(req.query.minWords);
  let result = articles.filter(article => filterLongArticles(article, minWords))
  res.json(result);
});

// function to return hight rated movies
function filterHighRatedMovies(movie, rating){
  return movie.rating > rating;
}

// endpoint 5: filter high rated movies
app.get("/high-rated-movies", (req, res) => {
  let rating = parseFloat(req.query.rating);
  let result = movies.filter(movie => filterHighRatedMovies(movie, rating))
  res.json(result);
});

// function to filter Employees by Experience
function filterExperiencedEmployees(employee, years){
  return employee.experience > years;
}

// endpoint 6: filter employee by experience
app.get("/experienced-employees", (req, res) => {
  let years = parseFloat(req.query.years);
  let result = employees.filter(employee => filterExperiencedEmployees(employee, years))
  res.json(result);
});
let port = 3000;
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));