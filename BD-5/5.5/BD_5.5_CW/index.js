let express = require("express");
let { track } = require("./models/track.model");
let { sequelize } = require("./lib/index");
const { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { Op } = require("@sequelize/core");
let app = express();
app.use(express.json());

let movieData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

// seed initial data to db
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // use in development environment only.
    await user.create({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "testuser",
    });
    await track.bulkCreate(movieData);

    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// fetch all tracks
async function fetchAllTracks() {
  let response = await track.findAll();

  return { response };
}
app.get("/tracks", async (req, res) => {
  try {
    let result = await fetchAllTracks();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// fetch all users
async function getAllusers() {
  let response = await user.findAll();

  return { response };
}
app.get("/users", async (req, res) => {
  try {
    let result = await getAllusers();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//  Exercise 1: Like a Track

async function likeTrack(data) {
  let newLike = await like.create({
    userId: data.userId,
    trackId: data.trackId,
  });

  return { message: "Track Liked", newLike };
}
app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let response = await likeTrack({ userId, trackId });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//   Exercise 2: Dislike a Track
async function dislikeTrack(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      trackId: data.trackId,
    },
  });
  if (count === 0) return {};

  return { message: "track disliked" };
}
app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let response = await dislikeTrack({ userId, trackId });
    if (!response.message) {
      res
        .status(404)
        .json({ message: "This track is not in your liked list." });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Exercise 3: Get All Liked Tracks
async function getAllLikedTracks(userId) {
  let tracksId = await like.findAll({
    where: { userId },
    attributes: ["trackId"],
  });

  let trackRecords = [];
  for (let i = 0; i < tracksId.length; i++) {
    trackRecords.push(tracksId[i].trackId);
  }
  let likedTracks = await track.findAll({
    where: { id: { [Op.in]: trackRecords } },
  });
  return { likedTracks };
}
app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedTracks(userId);
    if (response.likedTracks.length === 0) {
      res.status(404).json({ message: "No liked tracks found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Exercise 4: Get All Liked Tracks by Artist
async function getAllLikedTracksByArtists(userId, artist) {
  let trackIds = await like.findAll({
    where: { userId },
    attributes: ["trackId"],
  });

  let trackRecords = [];
  for (let i = 0; i < trackIds.length; i++) {
    trackRecords.push(trackIds[i].trackId);
  }

  let likedTracks = await track.findAll({
    where: { id: { [Op.in]: trackRecords }, artist },
  });

  return { likedTracks };
}
app.get("/users/:id/liked-artist", async (req, res) => {
  try {
    let userId = req.params.id;
    let artist = req.query.artist;

    let response = await getAllLikedTracksByArtists(userId, artist);

    if (response.likedTracks.length === 0) {
      res.status(404).json({ message: "No liked tracks found by " + artist });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
