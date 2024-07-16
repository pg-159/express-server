let express = require('express');
let app = express();
let port = 3000;

app.use(express.json());

//sample data
let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false }
];

// endpoint 1: Remove Out of Stock Products
app.get("/products/remove-out-of-stock", (req, res) => {
  let result = removeOutOfStockProducts(products);
  products = result;
  res.json(result);
});

//function to remove out of stock products
function removeOutOfStockProducts(products){
  return products.filter(product => product.inStock === true)
}

// sample data
let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false }
];

// endpoint 2: Update Employee Active Status by ID
app.get("/employees/update", (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === 'true';
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
});

// function to update employee active status by ID
function updateEmployeeStatusById(employees, employeeId, active){
  for (let i=0; i<employees.length; i++){
    if (employees[i].employeeId === employeeId){
      employees[i].active = active;
      break;
    }
  }
  return employees;
}

// sample data
let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false }
];

// endpoint 3: Update Order Delivery Status by ID
app.get("/orders/update", (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered;
  let result = updateOrderStatusById(orders, orderId, delivered)
  res.json(result);
});

// function to update order delivery status by ID
function updateOrderStatusById(orders, orderId, delivered){
  for (let i=0; i < orders.length; i++){
    if (orders[i].orderId === orderId){
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders;
}

// sample data
let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false }
];
// endpoint 4: remove unconfirmed reservations
app.get("/reservations/remove-unconfirmed", (req, res) => {
  let result = removeUnconfirmedReservations(reservations)
  reservations = result;
  res.json(result);
});

// function to remove unconfirmed reservations
function removeUnconfirmedReservations(reservations){
  return reservations.filter(reservation => reservation.confirmed);
}

// sample data
let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false }
];

// endpoint 5: Update Subscription Status by ID
app.get("/subscriptions/update", (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === 'true'
  let result = updateSubscriptionStatusById(subscriptions, subscriptionId, active)
  res.json(result);
});

// function to update subscription status by ID
function updateSubscriptionStatusById(subscriptions, subscriptionId, active){
  for (let i=0; i < subscriptions.length; i++){
    if (subscriptions[i].subscriptionId === subscriptionId){
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions;
}
app.listen(port, () => console.log(`Server is running on http://localhost: ${port}`));