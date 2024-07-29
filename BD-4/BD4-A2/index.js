const express = require('express');
const {error} = require('console');
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
    db = await open({
      filename: "./BD4-A2/database.sqlite",
      driver: sqlite3.Database,
    });
  })();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD-4 - Assignment 2"});
});

// Exercise 1: Get All Games
app.get("/games", async (req, res) => {
    try {
        let results = await fetchAllGames();
        if (results.games.length === 0) {
            res.status(404).json({ message: "No games found." });
        }
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// function to fetch all games from the database
async function fetchAllGames() {
    let query = 'SELECT * FROM games';
    let response = await db.all(query, []);
    return { games: response };
}

// Exercise 2: Get Game by ID
app.get("/games/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let results = await fetchGameById(id);
        if (results.length === 0) {
            return res.status(404).json({ message: "Game detail for id "+id+" not found." });
        }
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch game by id from the database
async function fetchGameById(id) {
    let query = 'SELECT * FROM games WHERE id = ?';
    let response = await db.get(query, [id]);
    return {game: response}
} 

// Exercise 3: Get Games by Genre
app.get("/games/genre/:genre", async (req, res) => {
    let genre = req.params.genre;
    try {
        let results = await fetchGamesByGenre(genre);
        if (results.length === 0) {
            return res.status(404).json({ message: "Games for genre "+genre+" not found." });
        }
        return res.status(200).json({games: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch games by genre from the database
async function fetchGamesByGenre(genre) {
    let query = 'SELECT * FROM games WHERE genre = ?';
    let response = await db.all(query, [genre]);
    return response;
}

// Exercise 4: Get Games by Platform
app.get("/games/platform/:platform", async (req, res) => {
    let platform = req.params.platform;
    try {
        let results = await fetchGamesByPlatform(platform);
        if (results.length === 0) {
            return res.status(404).json({ message: "Games for platform "+platform+" not found." });
        }
        return res.status(200).json({games: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch games by platform from the database
async function fetchGamesByPlatform(platform) {
    let query = 'SELECT * FROM games WHERE platform = ?';
    let response = await db.all(query, [platform]);
    return response;
}

// Exercise 5: Get Games Sorted by Rating
app.get("/games/sort-by-rating", async (req, res) => {
    try {
        let results = await fetchGamesSortedByRating();
        if (results.length === 0) {
            return res.status(404).json({ message: "Games not found." });
        }
        return res.status(200).json({games: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch games sorted by rating from the database highest to lowest
async function fetchGamesSortedByRating() {
    let query = 'SELECT * FROM games ORDER BY rating DESC';
    let response = await db.all(query, []);
    return response;
}

// Exercise 6: Get All Players
app.get("/players", async (req, res) => {
    try {
        let results = await fetchAllPlayers();
        if (results.length === 0) {
            return res.status(404).json({ message: "Players not found." });
        }
        return res.status(200).json({players: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch all players from the database
async function fetchAllPlayers() {
    let query = 'SELECT * FROM players';
    let response = await db.all(query, []);
    return response;
}

// Exercise 7: Get Player by ID
app.get("/players/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let results = await fetchPlayerById(id);
        if (results.length === 0) {
            return res.status(404).json({ message: "Player detail for id "+id+" not found." });
        }
        return res.status(200).json({player: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch player by id from the database
async function fetchPlayerById(id) {
    let query = 'SELECT * FROM players WHERE id = ?';
    let response = await db.get(query, [id]);
    return response;
}

// Exercise 8: Get Players by Platform
app.get("/players/platform/:platform", async (req, res) => {
    let platform = req.params.platform;
    try {
        let results = await fetchPlayersByPlatform(platform);
        if (results.length === 0) {
            return res.status(404).json({ message: "Players for platform "+platform+" not found." });
        }
        return res.status(200).json({players: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch players by platform from the database
async function fetchPlayersByPlatform(platform) {
    let query = 'SELECT * FROM players WHERE platform = ?';
    let response = await db.all(query, [platform]);
    return response;
}

// Exercise 9: Get Players Sorted by Rating
app.get("/players/sort-by-rating", async (req, res) => {
    try {
        let results = await fetchPlayersSortedByRating();
        if (results.length === 0) {
            return res.status(404).json({ message: "Players not found." });
        }
        return res.status(200).json({players: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch players sorted by rating from the database highest to lowest
async function fetchPlayersSortedByRating() {
    let query = 'SELECT * FROM players ORDER BY rating DESC';
    let response = await db.all(query, []);
    return response;
}

// Exercise 10: Get All Tournaments
app.get("/tournaments", async (req, res) => {
    try {
        let results = await fetchAllTournaments();
        if (results.length === 0) {
            return res.status(404).json({ message: "Tournaments not found." });
        }
        return res.status(200).json({tournaments: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch all tournaments from the database
async function fetchAllTournaments() {
    let query = 'SELECT * FROM tournaments';
    let response = await db.all(query, []);
    return response;
}

// Exercise 11: Get Tournament by ID
app.get("/tournaments/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let results = await fetchTournamentById(id);
        if (results.length === 0) {
            return res.status(404).json({ message: "Tournament detail for id "+id+" not found." });
        }
        return res.status(200).json({tournament: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch tournament by id from the database
async function fetchTournamentById(id) {
    let query = 'SELECT * FROM tournaments WHERE id = ?';
    let response = await db.get(query, [id]);
    return response;
}

// Exercise 12: Get Tournaments by Game ID
app.get("/tournaments/game/:game_id", async (req, res) => {
    let game_id = req.params.game_id;
    try {
        let results = await fetchTournamentsByGameId(game_id);
        if (results.length === 0) {
            return res.status(404).json({ message: "Tournaments for game id "+game_id+" not found." });
        }
        return res.status(200).json({tournaments: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch tournaments by game id from the database
async function fetchTournamentsByGameId(game_id) {
    let query = 'SELECT * FROM tournaments WHERE gameId = ?';
    let response = await db.get(query, [game_id]);
    return response;
}

// Exercise 13: Get Tournaments Sorted by Prize Pool
app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
    try {
        let results = await fetchTournamentsSortedByPrizePool();
        if (results.length === 0) {
            return res.status(404).json({ message: "Tournaments not found." });
        }
        return res.status(200).json({tournaments: results});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// function to fetch tournaments sorted by prize pool from the database highest to lowest
async function fetchTournamentsSortedByPrizePool() {
    let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
    let response = await db.all(query, []);
    return response;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});