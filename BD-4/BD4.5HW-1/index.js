const { error } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.5HW-1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.5-HW-1 - SQL Comparison Operator"});
});

// endpoint 1: filter courses based on rating
app.get("/courses/rating", async (req, res) => {
  let minRating = req.query.minRating;
  try {
    const results = await filterCoursesByRating (minRating);
    if (results.courses.length === 0){
      return res.status(404).json({message: "No courses found for this rating"});
    }
    return res.status(200).json(results);
  } catch (errror) {
    return res.status(500).json({error: error.message});
  }
});

// function to filter courses based on rating
const filterCoursesByRating = async (minRating) => {
  let query = 'SELECT * FROM courses WHERE rating > ?'
  let response = await db.all(query, [minRating]);
  return {courses: response};
}

// Endpoint 2: Fetch Courses by Instructor and Minimum Duration
app.get("/courses/instructor-duration", async (req, res) => {
let instructor = req.query.instructor;
let minDuration = req.query.minDuration;
try {
  const results = await fetchCoursesByInstructorAndDuration(instructor, minDuration);
  if (results.courses.length === 0){
    return res.status(404).json({message: "No courses found for this instructor and minimum duration"});
  }
  return res.status(200).json(results);
} catch (error) {
  return res.status(500).json({error: error.message});
}
});

// function to fetch courses by instructor and minimum duration
const fetchCoursesByInstructorAndDuration = async (instructor, minDuration) => {
  let query = 'SELECT * FROM courses WHERE instructor = ? AND duration > ?'
  let response = await db.all(query, [instructor, minDuration]);
  return {courses: response};
}

// Endpoint 3: Fetch Courses Ordered by Price
app.get("/courses/ordered-by-price", async (req, res) => {
  try {
    const results = await fetchCoursesOrderedByPrice();
    if (results.courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to fetch courses ordered by price
const fetchCoursesOrderedByPrice = async () => {
  let query = 'SELECT * FROM courses ORDER BY price DESC'
  let response = await db.all(query);
  return {courses: response};
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});