const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "./BD4.3CW/database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 CW - SQL Queries & async/await" });
});

// Endpoint 1: fetch all movies.
app.get("/movies", async(req, res) => {
  try {
    const results = await fetchAllMovies();
    if (results.movies.length === 0){
      return res.status(404).json({message: "No movies found."});
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

// function to fetch all movies.
const fetchAllMovies = async () => {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);

  return {movies: response}
}
// endpoint 2: Fetch All Movies by Actor
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    const results = await filterByActor(actor);
    if (results.movies.length === 0){
      return res.status(404).json({message: "No movies found for actor: "+actor});
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})
// function to Fetch All Movies by Actor
const filterByActor = async (actor) => {
  let query = 'SELECT * FROM movies WHERE actor = ?'
  let response = await db.all(query, [actor])
  return {movies: response};
}

// endpoint 3: filter movies by director name
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    const results = await filterByDirector(director);
    if (results.movies.length === 0){
      return res.status(404).json({message: "No movies found for given director: "+director});
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});
// function to filter movies by director name
const filterByDirector = async (director) => {
  let query = 'SELECT * FROM movies WHERE director = ?';
  let response = await db.all(query, [director]);
  return {movies: response};
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
