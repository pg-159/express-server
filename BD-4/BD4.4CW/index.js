const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.4CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.4CW Selecting Specific Columns..." });
});

// Endpoint 1: SELECT only id, title & release_year of all movies
app.get("/movies", async (req, res) => {
  try {
    const results = await fetchAllMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to retrieve id, title & release_year of all movies
const fetchAllMovies = async () => {
  let query = 'SELECT id, title, release_year FROM movies';
  let response = await db.all(query, []);
  return {movies: response};
}

// Endpoint 2: SELECT id, title, actor & release_year from all movies by an actor
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    const results = await fetchMoviesByActor(actor);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found for actor: "+actor });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to retrieve id, title, actor & release_year from all movies by an actor
const fetchMoviesByActor = async (actor) => {
  let query = 'SELECT id, title, actor, release_year FROM movies WHERE actor = ?';
  let response = await db.all(query, [actor]);
  return {movies: response};
}

// Endpoint 3: SELECT id, title, director & release_year from all movies by a director
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    const results = await fetchMoviesByDirector(director);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No movies found for director: "+director });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to retrieve id, title, actor & release_year from all movies by an director
const fetchMoviesByDirector = async (director) => {
  let query = 'SELECT id, title, director, release_year FROM movies WHERE director = ?';
  let response = await db.all(query, [director]);
  return {movies: response};
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});