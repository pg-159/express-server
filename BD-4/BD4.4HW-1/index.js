const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.4HW-1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.4-HW-1 - Selecting Specific Columns..."});
});

// Endpoint 1: Fetch All Employees by Gender
app.get("/courses", async (req, res) => {
  try {
    const results = await fetchAllCourses();
    if (results.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch all employees by gender
const fetchAllCourses = async () => {
  let query = "SELECT * FROM courses";
  let response = await db.all(query, []);
  return { courses: response };
};

// Endpoint 2: Fetch Courses by Instructor
app.get("/courses/instructor/:instructor", async (req, res) => {
  let instructor = req.params.instructor;
  try {
    const results = await fetchCoursesByInstructor(instructor);
    if (results.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for instructor: "+instructor });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch all employees by gender
const fetchCoursesByInstructor = async (instructor) => {
  let query = "SELECT id, title, instructor, category FROM courses WHERE instructor = ?";
  let response = await db.all(query, [instructor]);
  return { courses: response };
};

// Endpoint 3: Fetch Courses by Category
app.get("/courses/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    const results = await fetchCoursesByCategory(category);
    if (results.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for category: "+category });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch Courses by Category
const fetchCoursesByCategory = async (category) => {
  let query = "SELECT id, title, release_year, category FROM courses WHERE category = ?";
  let response = await db.all(query, [category]);
  return { courses: response };
};

// Endpoint 4: Fetch Courses by Year
app.get("/courses/year/:year", async (req, res) => {
  let year = parseInt(req.params.year);
  try {
    const results = await fetchCoursesByYear(year);
    if (results.courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for year: "+year });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch Courses by Year
const fetchCoursesByYear = async (year) => {
  let query = "SELECT id, title, release_year, category FROM courses WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { courses: response };
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});