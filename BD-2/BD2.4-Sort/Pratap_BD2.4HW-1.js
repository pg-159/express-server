let express = require('express');
let app = express();
let port = 3000;

// sample data
let heights = [160, 175, 180, 165, 170];
// list of employees data
let employees = [
  {name: "Rahul", employeeId: 101, salary: 50000},
  {name: "Sita", employeeId: 102, salary: 60000},
  {name: "Amit", employeeId: 103, salary: 45000}
];
// list of books data
let books = [
  {title: "The God of Small Things", author: "Arundhati Roy", pages: 340},
  {title: "The White Tiger", author: "Aravind Adiga", pages: 321},
  {title: "The Palace of Illusions", author: "Chitra Banerjee", pages: 360}
];

// function to sort heights in ascending order
function sortHeightAscending(height1, height2){
  return height1 - height2;
}

// endpoint 1: sort an array of heights in ascending order
app.get("/heights/sort-ascending", (req, res) => {
  let heightsCopy = heights.slice();
  heightsCopy.sort(sortHeightAscending)
  res.json(heightsCopy);
});

// function to sort heights in descending order
function sortHeightsDescending(height1, height2){
  return height2 - height1;
}

// endpoint 2: sort an array of heights in descending order
app.get("/heights/sort-descending", (req, res) => {
  let heightsCopy = heights.slice()
  heightsCopy.sort(sortHeightsDescending)
  res.json(heightsCopy);
});

//function to sort employees by salary in descending order
function sortEmployeesBySalaryDescending(employee1, employee2){
  return employee2.salary - employee1.salary
}
// endpoint 3: sort an array of employees by salary in descending order
app.get("/employees/sort-by-salary-descending", (req, res) => {
  let employeeCopy = employees.slice();
  employeeCopy.sort(sortEmployeesBySalaryDescending)
  res.json(employeeCopy);
});

// function to sort books by pages in ascending order
function sortBooksByPagesAscending(book1, book2){
  return book1.pages - book2.pages;
}
// endpoint 4: sort an array of books by pages in ascending order
app.get("/books/sort-by-pages-ascending", (req, res) => {
  let booksCopy = books.slice()
  booksCopy.sort(sortBooksByPagesAscending)
  res.json(booksCopy);
});
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));