let express = require("express");
let { student } = require("./models/student.model");
let { course } = require("./models/course.model");
let { sequelize } = require("./lib/index");

let app = express();
const PORT = 3000;

app.use(express.json());

let courseList = [
    { title: 'Math 101', description: 'Basic Mathematics' },
    { title: 'History 201', description: 'World History' },
    { title: 'Science 301', description: 'Basic Sciences' },
  ];

let studentList = [
    { name: 'John Doe', age: 24 }
  ];

// seed data
app.get('/seed_db', async (req, res) => {
  await sequelize.sync({force: true});

  await student.bulkCreate(studentList);
  await course.bulkCreate(courseList);

  res.status(200).json('data seeded successfully!')
})

// fetch all courses
async function fetchAllCourses(){
  let allCourses = await course.findAll();
  return {allCourses};
}
app.get('/courses', async (req, res) => {
  try {
    let response = await fetchAllCourses();
    if (response.allCourses.length === 0){
      return res.status(404).json({message: 'No Courses Found.'})
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

// fetch all students
async function fetchAllStudents(){
  let allStudents = await student.findAll();
  return {allStudents};
}

app.get('/students', async (req, res) => {
  try {
    let response = await fetchAllStudents();
    if (response.allStudents.length === 0){
      return res.status(404).json({message: 'No Students Found.'})
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

// Exercise 1: Create New Student
async function addNewStudent(newStudent){
  let updatedStudent = await student.create(newStudent);
  return {message: 'student added!', updatedStudent};
}

app.post('/students/new', async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudent(newStudent);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message}) 
  }
})

// Exercise 2: Update Student by ID
async function updateStudentById(id, newStudentData) {
  let newStudent = await student.findOne({where: {id}});
  if (!newStudent) return {};
  newStudent.set(newStudentData)
  let updatedStudent = await newStudent.save();
  return {message: 'student updated successfully!', updatedStudent}
}
app.post('/students/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newStudentData = req.body;
    let response = await updateStudentById(id, newStudentData);
    if (!response.message){
      res.status(404).json({message: 'No Student Found.'})
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});