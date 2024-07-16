let express = require('express');
let app = express();
let port = 3000;

let phones = [
  { number: '123-456-7890', owner: 'Alice', type: 'mobile' },
  { number: '987-654-3210', owner: 'Bob', type: 'home' }
];

let accounts = [
  { number: '111122223333', holder: 'Charlie', balance: 5000 },
  { number: '444455556666', holder: 'Dave', balance: 3000 }
];

let licenses = [
  { number: 'D1234567', name: 'Eve', expiryDate: '2026-04-01' },
  { number: 'D7654321', name: 'Frank', expiryDate: '2024-11-15' }
];

let employees = [
  { id: 'E1234', name: 'Grace', department: 'Engineering' },
  { id: 'E5678', name: 'Hank', department: 'Marketing' }
];

let orders = [
  { id: 'ORD12345', customerName: 'Ivy', totalAmount: 150 },
  { id: 'ORD67890', customerName: 'Jake', totalAmount: 200 }
];

// function fo find phone number
function findPhoneNumber(ele, phoneNumber){
  return ele.number === phoneNumber;
}
// endpoint 1: Find Mobile Phone Number
app.get("/phones/find", (req, res) => {
  let phoneNumber = req.query.phoneNumber;
  let phone = phones.find(ele => findPhoneNumber(ele, phoneNumber))
  res.json({phone});
});

// function to find bank account number
function findAccountNumber(ele, accountNumber){
  return ele.number === accountNumber;
}
// endpoint 2: Find Bank Account Number
app.get("/accounts/find", (req, res) => {
  let accountNumber = req.query.accountNumber;
  let account = accounts.find(ele => findAccountNumber(ele, accountNumber))
  res.json({account});
});

// function to find drivers license number
function findLicenseNumber(ele, licenseNumber){
  return ele.number === licenseNumber;
}
// endpoint 3: Find Driver's License Number
app.get("/licenses/find", (req, res) => {
  let licenseNumber = req.query.licenseNumber;
  let license = licenses.find(ele => findLicenseNumber(ele, licenseNumber));
  res.json({license});
});

// function to find employee ID
function findEmployeeById(ele, employeeId){
  return ele.id === employeeId;
}
// endpoint 4: Find Employee ID
app.get("/employees/find", (req, res) => {
  let employeeId = req.query.employeeId;
  let employee = employees.find(ele => findEmployeeById(ele, employeeId))
  res.json({employee});
});

// function to find order by order ID
function findOrderById(ele, orderId){
  return ele.id === orderId;
}
// endpoint 5: Find order by order ID
app.get("/orders/find", (req, res) => {
  let orderId = req.query.orderId;
  let order = orders.find(ele => findOrderById(ele, orderId))
  res.json({order});
});
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));