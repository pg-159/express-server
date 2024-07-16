let express = require("express");
let app = express();
let port = 3000;

// sample data
let books = [
  { title: "Moby Jonas", author: "Herman Melville", publication_year: 2023 },
  { title: "1984", author: "George Orwell", publication_year: 1984 },
  {
    title: "A Tale of Two Citiess",
    author: "Charles Jonas",
    publication_year: 2000,
  },
];

let employees = [
  { name: "John", salary: 75000 },
  { name: "Doe", salary: 30000 },
  { name: "Jane", salary: 50000 },
];

let products = [
  { name: "Product A", price: 15 },
  { name: "Product B", price: 25 },
  { name: "Product C", price: 10 },
];

let movies = [
  { title: "Movie A", rating: 9.0 },
  { title: "Movie C", rating: 7.0 },
  { title: "Movie B", rating: 8.5 },
];
// function to sort books by year in ascending order
function sortBooksByYear(book1, book2) {
  return book1.publication_year - book2.publication_year;
}

// endpoint 1: sort books by year in ascending year
app.get("/books/sort-by-year", (req, res) => {
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByYear);
  res.json(booksCopy);
});

// function to sort employees by salary in descending order
function sortEmployeesBySalary(emp1, emp2) {
  return emp2.salary - emp1.salary;
}

// endpoint 2: sort employees by salaries in descending year
app.get("/employees/sort-by-salary", (req, res) => {
  let employeesCopy = employees.slice();
  employeesCopy.sort(sortEmployeesBySalary);
  res.json(employeesCopy);
});

//function to sort products by price in ascending order
function sortProductsByPrice(prod1, prod2) {
  return prod1.price - prod2.price;
}
// endpoint 3: sort an array of products by price in ascending order
app.get("/products/sort-by-price", (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPrice);
  res.json(productsCopy);
});

// function to sort books by pages in ascending order
function sortMoviesByRating(movie1, movie2) {
  return movie2.rating - movie1.rating;
}
// endpoint 4: sort an array of books by pages in ascending order
app.get("/movies/sort-by-rating", (req, res) => {
  let moviesCopy = movies.slice();
  moviesCopy.sort(sortMoviesByRating);
  res.json(moviesCopy);
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost: ${port}`),
);
