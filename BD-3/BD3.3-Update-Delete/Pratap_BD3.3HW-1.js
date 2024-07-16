let express = require('express');
let app = express();
let port = 3000;

app.use(express.json());

let watchList = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1' },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2' },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3' }
];

// endpoint 1: Remove All Unwatched Videos
app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = deleteUnwatchedVideos(watchList)
  res.json(result);
});
// function to delete unwatched videos
function deleteUnwatchedVideos(watchList){
  return watchList.filter(video => video.watched)
}

let watchList2 = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1', isFavorite: false },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2', isFavorite: false },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3', isFavorite: false }
];

// endpoint 2: Mark Video as Favorite by ID
app.get("/watchlist/favorite", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === 'true';
  let result = markVideoAsFavorite(watchList2, videoId, isFavorite)
  res.json({result});
});

// function to mark video as favourite
function markVideoAsFavorite(watchList2, videoId, isFavorite){
  for (i=0; i < watchList2.length; i++){
    if (watchList2[i].videoId === videoId){
      watchList2[i].isFavorite = isFavorite;
      break;
    }
  }
  return watchList2;
}
// sample data
let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];
// endpoint 3: update tasks by task ID
app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === 'true'
  let result = updateTaskStatusById(tasks, taskId, completed)
  res.json(result);
});
// function to update task by task ID
function updateTaskStatusById(tasks, taskId, completed){
  for (let i=0; i < tasks.length; i++){
    if (tasks[i].taskId === taskId){
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}
// endpoint 4: remove all completed tasks
app.get("/tasks/remove-completed", (req, res) => {
  let result = removeCompletedTasks(tasks);
  tasks = result;
  res.json(result);
});

// function to remove complete tasks
function removeCompletedTasks(tasks){
  return tasks.filter(task => !task.completed);
}

// sample data
let books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false }
];

// endpoint 5: update library book availability by ID
app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === 'true';
  let result = updateBookAvailabilityById(books, bookId, available)
  res.json(result);
});

// function to update library book availability by ID
function updateBookAvailabilityById(books, bookId, available){
  for (let i=0; i<books.length; i++){
    if (books[i].bookId === bookId){
      books[i].available = available;
      break;
    }
  }
  return books;
}
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));