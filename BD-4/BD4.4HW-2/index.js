const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.4HW-2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.4-HW-2 - Selecting Specific Columns..."});
});

// Endpoint 1: Fetch All Artworks
app.get("/artworks", async (req, res) => {
  try{
    const results = await fetchAllArtworks();
    if (results.artworks.length === 0){
      return res.status(404).json({message: "No artworks found."});
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

const fetchAllArtworks = async () => {
  let query = 'SELECT id, title, artist FROM artworks';
  let response = await db.all(query, []);
  return {artworks: response};
}

// Endpoint 2: Fetch Artworks by Artist
app.get("/artworks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  try {
    const results = await fetchArtworksByArtist (artist);
    if (results.artworks.length === 0){
      return res.status(404).json({message: "No artworks found for artist: "+artist})
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to fetch artworks by artist
const fetchArtworksByArtist = async (artist) => {
  let query = 'SELECT id, title, artist, year FROM artworks WHERE artist = ?';
  let response = await db.all(query, [artist]);
  return {artworks: response};
}

// Endpoint 3: Fetch Artworks by Year
app.get("/artworks/year/:year", async (req, res) => {
  let year = parseInt(req.params.year);
  try {
    const results = await fetchArtworksByYear (year);
    if (results.artworks.length === 0){
      return res.status(404).json({message: "No artworks found for year: "+year})
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to fetch artworks by year
const fetchArtworksByYear = async (year) => {
  let query = 'SELECT id, title, artist, year FROM artworks WHERE year = ?';
  let response = await db.all(query, [year]);
  return {artworks: response};
}

// Endpoint 4: Fetch Artworks by Medium
app.get("/artworks/medium/:medium", async (req, res) => {
  let medium = req.params.medium;
  try {
    const results = await fetchArtworksByMedium (medium);
    if (results.artworks.length === 0){
      return res.status(404).json({message: "No artworks found for medium: "+medium})
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to fetch artworks by medium
const fetchArtworksByMedium = async (medium) => {
  let query = 'SELECT id, title, artist, medium FROM artworks WHERE medium = ?';
  let response = await db.all(query, [medium]);
  return {artworks: response};
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});