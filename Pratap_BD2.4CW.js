let express = require('express');
let app = express();
let port = 3000;

// sample data
ages = [25, 30, 18, 22, 27];

let students = [
  {name: "Rahul", rollNo: 101, marks: 85},
  {name: "Sita", rollNo: 101, marks: 95},
  {name: "Amit", rollNo: 101, marks: 70}
];

let cars = [
  {make: "Maruti", model: "Swift", mileage: 15},
  {make: "Hyundai", model: "i20", mileage: 18},
  {make: "Tata", model: "Nexon", mileage: 20}
];

// function to sort ages in ascending order
function sortAgesAscending(age1, age2){
  return age1 - age2;
}
// endpoint 1: sort an array of ages in ascending order
app.get("/ages/sort-ascending", (req, res) => {
  let copyAges = ages.slice();
  copyAges.sort(sortAgesAscending)
  res.json(copyAges);
});

// function to sort ages in descending order
function sortAgesDescending(age1, age2){
  return age2 - age1;
}
// endpoint 2: sort an array of ages in descending order
app.get("/ages/sort-descending", (req, res) => {
  let copyAges = ages.slice();
  copyAges.sort(sortAgesDescending)
  res.json(copyAges);
});

// function to sort students by marks in descending order
function sortStudentsByMarksDescending(student1, student2){
  return student2.marks - student1.marks;
}
// endpoint 3: sort an array of students by marks in descending order
app.get("/students/sort-by-marks-descending", (req, res) => {
  let copyStudents = students.slice();
  copyStudents.sort(sortStudentsByMarksDescending)
  res.json(copyStudents);
});

// function to sort cars by mileage in descending order
function sortCarsByMileageDescending(car1, car2){
  return car2.mileage - car1.mileage;
}
// endpoint 4: sort an array of cars by mileage in descending order
app.get("/cars/sort-by-mileage-descending", (req, res) => {
  let carsCopy = cars.slice();
  carsCopy.sort(sortCarsByMileageDescending)
  res.json(carsCopy);
});

app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));