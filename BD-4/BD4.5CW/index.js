const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.5CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.5-CW - SQL Comparison Operator"});
});

// endpoint 1: get movies by year and actor
app.get("/movies/year-actor", async (req, res) => {
  let releaseYear = req.query.releaseYear;
  let actor = req.query.actor;
  try {
    const results = await filterByYearAndActor(releaseYear, actor);
    if (results.movies.length === 0){
      return res.status(404).json({message: "No movies found for year " + releaseYear + " by " + actor});
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to filter movies by year and actor
const filterByYearAndActor = async (releaseYear, actor) => {
  let query = 'SELECT * FROM movies WHERE release_year = ? AND actor = ?';
  let response = await db.all(query, [releaseYear, actor]);
  return {movies: response};
}

// endpoint 2: get award winning movies by rating >= 4.5
app.get("/movies/award-winning", async (req, res) => {
  try {
    let results = await filterAwardWinningMovies();
    if (results.movies.length === 0){
      return res.status(404).json({message: "No award winning movies found."});
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});
// function to get movies by rating >= 4.5
const filterAwardWinningMovies = async () => {
  let query = 'SELECT * FROM movies WHERE rating >= 4.5 ORDER BY rating';
  let response = await db.all(query, []);
  return {movies: response};
}
// endpoint 3: get blockbuster movies by box office collection >= 100
app.get('/movies/blockbuster', async (req, res) =>{
  try {
    const results = await filterBlockbusterMovies();
    if (results.movies.length === 0){
      return res.status(404).json({message: "No blockbuster movies found."});
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})
// function to get movies by box office collection >= 100
const filterBlockbusterMovies = async () => {
  let query = 'SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC';
  let response = await db.all(query, []);
  return {movies: response};
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});