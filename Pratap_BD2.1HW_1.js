let express = require('express');
let app = express();
let port = 3000;

// define an object on the server: book
let book = {
  title: "The God of Small Things",
  author: "Arundhati Roy",
  publicationYear: 1997,
  genre: "Novel",
  isAvailable: true,
  stock: 5  // Adding stock property
}
// endpoint 1: return the book object
app.get("/book", (req, res) => {
  res.json(book);
})
// function to get the full title and author of the book
function getFullTitleAndAuthor(book){
  return book.title + " by " + book.author;
}
// endpoint 2: Access the full title and author of the book
app.get("/book/fulltitle-author", (req, res) => {
  let fullTitleAndAuthor = getFullTitleAndAuthor(book);
  res.json({fullTitleAndAuthor: fullTitleAndAuthor});
})

// function to get genre and availability status of the book
function getGenreAndAvailability(book){
  return {
    genre: book.genre,
    isAvailable: book.isAvailable
  };
}
// endpoint 3: Access the genre and availability status of the book
app.get("/book/genre-availability", (req, res) => {
  let genreAndAvailability = getGenreAndAvailability(book);
  res.json(genreAndAvailability);
})

// function to calculate how old the book is
function calculateBookAge(book){
  let currentYear = 2024;
  return currentYear - book.publicationYear;
}
// endpoint 4: calculate age of the book
app.get("/book/age", (req, res) => {
  let bookAge = calculateBookAge(book);
  res.json({ age: bookAge });
})
// function to get a summary of the book
function getBookSummary(book){
  return "Title: " + book.title + ", Author: " + book.author + ", Genre: " + book.genre + ", Published: " + book.publicationYear;
}
// endpoint 5: Return a summary of the book
app.get("/book/summary", (req, res) => {
  let summary = getBookSummary(book);
  res.json({summary: summary})
})
// function to check stock and determine if an order is needed
function checkStockAndOrder(book){
  if (book.stock > 0){
    return { status: "In Stock", stock: book.stock };
  } else {
    return { status: "Out of Stock", message: "Order Required" }
  }
}
// endpoint 6: Check stock and order status
app.get("/book/stock-status", (req, res) => {
  let stockStatus = checkStockAndOrder(book);
  res.json(stockStatus)
})
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));