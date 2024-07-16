let express = require("express");
let app = express();
let PORT = 3000;

// Sample data
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ['Rahul', 'Sita', 'Amit', 'Vikram', 'Priya'];
let employees = [
  { employeeId: 1, name: 'Rahul' },
  { employeeId: 2, name: 'Sita' },
  { employeeId: 3, name: 'Amit' }
];

let contacts = [
  { phoneNumber: '1234567890', name: 'Rahul', address: '123 Street, City' },
  { phoneNumber: '0987654321', name: 'Sita', address: '456 Avenue, City' },
  { phoneNumber: '1112223334', name: 'Amit', address: '789 Boulevard, City' }
];

// function to find a number
function findNumber(ele, target){
  return ele === target;
}

// endpoint 1: find a number in the array
app.get("/numbers/find/:number", (req, res) => {
  let number = parseInt(req.params.number);
  let result = numbers.find(ele => findNumber(ele, number))
  res.json(result);
});

// function to find a name
function findName(ele, target){
  return ele === target;
}

// endpoint 2: find a name in the array
app.get("/names/find/:name", (req, res) => {
  let name = req.params.name;
  let result = names.find(ele => findName(ele, name))
  res.json(result);
});

// function to find an employee by ID
function findEmployeeById(ele, id){
  return ele.employeeId === id;
}
// endpoint 3: find an employee by ID
app.get("/employees/find/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = employees.find(ele => findEmployeeById(ele, id));
  res.json(result);
});
// function to find a contact by phone number
function findContactByPhoneNumber(ele, phoneNumber){
  return ele.phoneNumber === phoneNumber;
}
// endpoint 4: find a contact by phone number
app.get("/contacts/find/:phoneNumber", (req, res) => {
  let phoneNumber = req.params.phoneNumber;
  let result = contacts.find(ele => findContactByPhoneNumber(ele, phoneNumber));
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:",PORT);
});