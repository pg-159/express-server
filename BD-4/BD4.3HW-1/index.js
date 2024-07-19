const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.3HW-1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW1 Template" });
});

// Endpoint 1: Fetch All Employees by Gender
app.get("/employees/gender/:gender", async (req, res) => {
  let gender = req.params.gender;
  try {
    const results = await filterByGender(gender);
    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found for given gender: " + gender });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch all employees by gender
const filterByGender = async (gender) => {
  let query = "SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query, [gender]);
  return { employees: response };
};

// Endpoint 2: Fetch All Employees by Department
app.get("/employees/department/:department", async (req, res) => {
  let department = req.params.department;
  try {
    const results = await filterByDepartment(department);
    if (results.employees.length === 0) {
      return res
        .status(404)
        .json({
          message: "No employees found for given department: " + department,
        });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to fetch all employees by department
const filterByDepartment = async (department) => {
  let query = 'SELECT * FROM employees WHERE department = ?'
  let response = await db.all(query, [department]);
  return {employees: response}
}

// Endpoint 3: Fetch All Employees by Job Title
app.get("/employees/job_title/:job_title", async (req, res) => {
  let job_title = req.params.job_title;
  try {
    const results = await filterByJobTitle(job_title);
    if (results.employees.length === 0){
      return res.status(404).json({message: "No employees found for given job title: "+job_title})
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

// function to fetch all employees by job title
const filterByJobTitle = async (job_title) => {
  let query = 'SELECT * FROM employees WHERE job_title = ?';
  let response = await db.all(query, [job_title]);
  return {employees: response};
}

// Endpoint 4: Fetch All Employees by Location
app.get("/employees/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    const results = await filterByLocation(location);
    if (results.employees.length === 0){
      return res.status(404).json({meesage: "No employees found for the given location: "+location})
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// function to fetch all employees by location
const filterByLocation = async (location) => {
  let query = 'SELECT * FROM employees WHERE location = ?';
  let response = await db.all(query, [location]);
  return {employees: response};
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
