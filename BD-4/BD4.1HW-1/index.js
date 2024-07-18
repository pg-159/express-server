const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.1HW-1/books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1 Template" });
});

// Endpoint 1: Fetch All Books
app.get("/books", async (req, res) => {
  let results = await fetchAllBooks();
  res.status(200).json(results);
});

// function to fetch all books
const fetchAllBooks = async () => {
  let query = 'SELECT * FROM books';
  let response = await db.all(query, []);
  return {books: response}
}

// Endpoint 2: Fetch Books by Author
app.get("/books/author/:author", async (req, res) => {
  let author = req.params.author;
  let results = await fetchBooksByAuthor(author)
  res.status(200).json(results);
});
//function to fetch books by author
const fetchBooksByAuthor = async (author) => {
  let query = 'SELECT * FROM books WHERE author = ?'
  let response = await db.all(query, [author]);
  return {books: response}
}

// Endpoint 3: Fetch Books by Genre
app.get("/books/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchBooksByGenre(genre);
  res.status(200).json(results);
});

// function to fetch books by genre
const fetchBooksByGenre = async (genre) => {
  let query = 'SELECT * FROM books WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return {books: response}
}

// Endpoint 4: Fetch Books by Publication Year
app.get("/books/publication_year/:year", async (req, res) => {
  let year = req.params.year;
  let results = await fetchBooksByPublicationYear(year);
  res.status(200).json(results);
});

// function to fetch books by publication year
const fetchBooksByPublicationYear = async (year) => {
  let query = 'SELECT * FROM books WHERE publication_year = ?';
  let response = await db.all(query, [year]);
  return {books: response};
}



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});