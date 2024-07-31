let express = require("express");
let app = express();
let { sequelize } = require("./lib/index");
let { employee } = require("./models/employee.model");

let employeeData = [
  {
    name: "Alice Smith",
    department: "Engineering",
    salary: 90000,
    designation: "Software Engineer",
  },
  {
    name: "Bob Johnson",
    department: "Management",
    salary: 120000,
    designation: "Project Manager",
  },
  {
    name: "Charlie Brown",
    department: "Design",
    salary: 70000,
    designation: "Designer",
  },
  {
    name: "David Wilson",
    department: "Engineering",
    salary: 80000,
    designation: "QA Engineer",
  },
  {
    name: "Eve Davis",
    department: "HR",
    salary: 60000,
    designation: "HR Specialist",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employeeData);

    return res.status(200).json({ message: "database seeding successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
