const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.1HW-2/tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2 Template" });
});

//Endpoint 1: Retrieve All Tracks
app.get("/tracks", async (req, res) => {
  let results = await fetchAllTracks();
  res.status(200).json(results);
});

// function to retrieve all tracks
const fetchAllTracks = async () => {
  let query = 'SELECT * FROM tracks';
  let response = await db.all(query, []);
  return {tracks: response};
}

// Endpoint 2: Retrieve Tracks by Artist
app.get("/tracks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  let results = await fetchTracksByArtist(artist);
  res.status(200).json(results);
});
// function to retrieve tracks by artist
const fetchTracksByArtist = async (artist) => {
  let query = 'SELECT * FROM tracks WHERE artist = ?'
  let response = await db.all(query, [artist])
  return {tracks: response};
}

// Endpoint 3: Retrieve Tracks by Genre
app.get("/tracks/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchTracksByGenre(genre);
  res.status(200).json(results);
});
// function to retrieve tracks by genre
const fetchTracksByGenre = async (genre) => {
  let query = 'SELECT * FROM tracks WHERE genre = ?'
  let response = await db.all(query, [genre]);
  return {tracks: response};
}

// Endpoint 4: Retrieve Tracks by Release Year
app.get("/tracks/release_year/:year", async(req, res) => {
  let year = req.params.year;
  let results = await fetchTracksByReleaseYear(year);
  res.status(200).json(results);
});
// function to retrieve tracks by release year
const fetchTracksByReleaseYear = async (year) => {
  let query = 'SELECT * FROM tracks WHERE release_year = ?'
  let response = await db.all(query, [year]);
  return {tracks: response};
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});