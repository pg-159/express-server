let express = require('express')
let app = express();
let PORT = 3000;
let {sequelize} = require('./lib/index');
let {employee} = require('./models/employee.model')

app.use(express.json());

let employeeData = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Manager',
      department: 'Sales',
      salary: 90000,
    },
    {
      id: 2,
      name: 'Anna Brown',
      designation: 'Developer',
      department: 'Engineering',
      salary: 80000,
    },
    {
      id: 3,
      name: 'James Smith',
      designation: 'Designer',
      department: 'Marketing',
      salary: 70000,
    },
    {
      id: 4,
      name: 'Emily Davis',
      designation: 'HR Specialist',
      department: 'Human Resources',
      salary: 60000,
    },
    {
      id: 5,
      name: 'Michael Wilson',
      designation: 'Developer',
      department: 'Engineering',
      salary: 85000,
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      designation: 'Data Analyst',
      department: 'Data Science',
      salary: 75000,
    },
    {
      id: 7,
      name: 'David Lee',
      designation: 'QA Engineer',
      department: 'Quality Assurance',
      salary: 70000,
    },
    {
      id: 8,
      name: 'Linda Martinez',
      designation: 'Office Manager',
      department: 'Administration',
      salary: 50000,
    },
    {
      id: 9,
      name: 'Robert Hernandez',
      designation: 'Product Manager',
      department: 'Product',
      salary: 95000,
    },
    {
      id: 10,
      name: 'Karen Clark',
      designation: 'Sales Associate',
      department: 'Sales',
      salary: 55000,
    },
  ];

app.get('/seed_db', async(req, res) => {
  try {
    await sequelize.sync({force: true});
    await employee.bulkCreate(employeeData);
    res.status(200).json({message: 'database seeding successful'})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

// Exercise 1: Fetch all posts
async function fetchAllEmployees (){
  let employees = await employee.findAll();
  return {employees};
}
app.get("/employees", async (req, res) => {
  try {
    let response = await fetchAllEmployees ();
    if (response.employees.length === 0){
      return res.status(404).json('No Employee Found.')
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Add a new employee to the database
async function addNewEmployee(empData){
  let newEmployee = await employee.create(empData);
  return {message:'employee added successfully',newEmployee};
}
app.post('/employees/new', async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee;
    let response = await addNewEmployee(newEmployee);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Update employee information
async function updateEmployeeById (newEmpData, id){
  let empData = await employee.findOne({where: {id}});
  if (!empData) return {};
  empData.set(newEmpData);
  let updatedEmployee = await empData.save();
  return {message: 'employee updated successfully', updatedEmployee}
}
app.post('/employees/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newEmployeeData  = req.body;

    let response = await updateEmployeeById (newEmployeeData, id)
    if (!response.message){
      res.status(404).json({message: 'Employee not found.'})
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

//Exercise 4: Delete an employee from the database

async function deleteEmployeeById(id){
  let destroyedEmployee = await employee.destroy({where: {id}});
  if (destroyedEmployee === 0) return {};
  return {message: 'employee record deleted!'}
}
app.post("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);
    if (!response.message){
      return res.status(404).json({message: 'employee not found'})
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:',PORT);
})