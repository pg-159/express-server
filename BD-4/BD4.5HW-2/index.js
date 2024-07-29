const { error } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4.5HW-2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
    res.status(200).json({ message: "BD4.5-HW-2 - SQL Comparison Operator"});
});

// Endpoint 1: Fetch Employees by Minimum Salary
app.get("/employees/salary", async (req, res) => {
  let minSalary = req.query.minSalary;
  try {
    const results = await filterEmployeesBySalary(minSalary);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found with minimum salary: "+ minSalary });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to filter employees by salary
async function filterEmployeesBySalary(minSalary) {
  const query = 'SELECT * FROM employees WHERE salary >= ?'
  const results = await db.all(query, [minSalary]);
  return { employees: results };
}

// Endpoint 2: Fetch Employees by Department and Minimum Experience
app.get("/employees/department-experience", async (req, res) => {
  let department = req.query.department;
  let minExperience = req.query.minExperience;
  try {
    const results = await filterEmployeesByDepartmentAndExperience(department, minExperience);
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found in department: "+ department + " with minimum experience: " + minExperience });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to filter employees by department and experience
async function filterEmployeesByDepartmentAndExperience(department, minExperience) {
  const query = 'SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?'
  const results = await db.all(query, [department, minExperience]);
  return { employees: results };
}

// Endpoint 3: Fetch Employees ordered by Salary
app.get("/employees/ordered-by-salary", async (req, res) => {
  try {
    const results = await filterEmployeesByPositionAndSalary();
    if (results.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// function to filter employees ordered by salary
const filterEmployeesByPositionAndSalary = async () => {
  const query = 'SELECT * FROM employees ORDER BY salary DESC'
  const results = await db.all(query);
  return { employees: results };
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});