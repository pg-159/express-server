let express = require("express");
let app = express();
let port = 3000;

let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];
// function to update Watched Status of a Video by ID
function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
      break;
    }
  }
  return watchList;
}
// endpoint 1: Update the Watched Status of a Video by ID
app.get("/watchlist/update", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

//function to update the watched status of all videos
function updateAllVideosWatchedStatus(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

// endpoint 2: Update the Watched Status of All Videos
app.get("/watchlist/update-all", (req, res) => {
  let watched = req.query.watched === "true";
  let result = updateAllVideosWatchedStatus(watchList, watched);
  res.json({ result });
});

//function to check if a video should be deleted by ID
function shouldDeleteById(video, videoId) {
  return video.videoId !== videoId;
}

// endpoint 3: Delete a Video by ID
app.get("/watchlist/delete", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let result = watchList.filter((video) => shouldDeleteById(video, videoId));
  watchList = result;
  res.json({ result });
});

// function to check if a video is watched
function isWatched(video) {
  return !video.watched;
}
// endpoint 4: Delete Watched Videos
app.get("/watchlist/delete-watched", (req, res) => {
  let result = watchList.filter((video) => isWatched(video));
  watchList = result;
  res.json({ result });
});
app.listen(port, () =>
  console.log(`Server is running on http://localhost: ${port}`),
);
