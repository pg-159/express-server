const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "./BD4.1CW/database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// Endpoint 1: fetch all movies.
app.get("/movies", async(req, res) => {
  let results = await fetchAllMovies();
  res.status(200).json(results);
});

// function to fetch all movies.
const fetchAllMovies = async () => {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);

  return {movies: response}
}
// endpoint 2: fetch movies by genre
app.get("/movies/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMoviesByGenre(genre);
  res.status(200).json(results);
})
// function to fetch movies by genre
const fetchMoviesByGenre = async (genre) => {
  let query = 'SELECT * FROM movies WHERE genre = ?'
  let response = await db.all(query, [genre])
  return {movies: response};
}

// endpoint 3: fetch movies by id
app.get("/movies/details/:id", async (req, res) => {
  let id = req.params.id;
  let results = await fetchMoviesById(id)
  res.status(200).json(results);
});
// function to fetch movies by id
const fetchMoviesById = async (id) => {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.get(query, [id]);
  return {movies: response};
}

// endpoint 4: fetch movies by release year
app.get("/movies/release-year/:year", async (req, res) => {
  let releaseYear = req.params.year;
  let results = await fetchMoviesByReleaseYear(releaseYear)
  res.status(200).json(results);
});

//function to fetch movies by release year
const fetchMoviesByReleaseYear = async (releaseYear) => {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [releaseYear]);
  return {movies: response};
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
