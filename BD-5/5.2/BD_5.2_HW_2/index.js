let express = require("express");
let app = express();
let { sequelize } = require("./lib/index");
let { employee } = require("./models/employee.model");

let employeesData = [
  {
    id: 1,
    name: "Alice",
    salary: 60000,
    department: "Engineering",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Bob",
    salary: 70000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    id: 3,
    name: "Charlie",
    salary: 80000,
    department: "Engineering",
    designation: "Senior Software Engineer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employeesData);

    return res.status(200).json({ message: "database seeding successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

//Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  let employees = await employee.findAll();
  return { employees };
}
app.get("/employees", async (req, res) => {
  try {
    let response = await fetchAllEmployees();
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Fetch employee details by ID
async function fetchEmployeeById(id) {
  let employeeData = await employee.findOne({ where: { id } });
  return { employeeData };
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchEmployeeById(id);
    if (result.employeeData === null) {
      return res.status(404).json({ message: "No Employee Found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
async function fetchEmployeesByDepartment(department) {
  let employees = await employee.findAll({ where: { department } });
  return { employees: employees };
}
app.get('/employees/department/:department', async (req, res) => {
  try {
    console.log("hello employees");
    let department = req.params.department;
    let result = await fetchEmployeesByDepartment(department);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found."     });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
async function sortEmployeesBySalary(sortOrder){
  let sortedEmployees = await employee.findAll({order: [['salary', sortOrder]]});
  return {employees: sortedEmployees};
}
app.get('/employees/sort/salary', async (req, res) => {
  try {
    let sortOrder = req.query.order;
    let result = await sortEmployeesBySalary(sortOrder)
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found."     });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
