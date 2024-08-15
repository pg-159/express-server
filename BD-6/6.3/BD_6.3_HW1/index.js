let express = require("express");
const app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

let developers = [{ id: 1, name: "Nintendo", country: "Japan" }];

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(game) {
  game.id = games.length + 1;
  games.push(game);
  return game;
}

async function getDeveloperById(id) {
  return developers.find((developer) => developer.id === id);
}

async function addDeveloper(developer) {
  developer.id = developers.length + 1;
  developers.push(developer);
  return developer;
}
// APIs
// get all games
app.get("/games", async (req, res) => {
  const gamesList = await getAllGames();
  res.json(gamesList);
});

// get a game by id
app.get("/games/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await getGameById(id);
  if (!game) return res.status(404).send("game not found.");
  res.json(game);
});

// add a new game
app.post("/games/new", async (req, res) => {
  const newGame = await addGame(req.body);
  res.status(201).json(newGame);
});

// get a developer by id
app.get("/developers/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const developer = await getDeveloperById(id);
  if (!developer) return res.status(404).send("developer not found");
  res.json(developer);
});

// add a new developer
app.post("/developers/new", async (req, res) => {
  const newDeveloper = await addDeveloper(req.body);
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
