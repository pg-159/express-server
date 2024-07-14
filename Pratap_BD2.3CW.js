let express = require("express");
let app = express();
let port = 3000;

let products = [
  { name: "Laptop", price: 50000, category: "Electronics" },
  { name: "Mobile", price: 20000, category: "Electronics" },
  { name: "Shirt", price: 1500, category: "Apparel" },
  { name: "Mixer Grinder", price: 4000, category: "Home Appliances" },
];

let cars = [
  { make: "Maruti", model: "Swift", mileage: 15000 },
  { make: "Hyundai", model: "i20", mileage: 25000 },
  { make: "Tata", model: "Nexon", mileage: 30000 },
];

let movies = [
  { title: "3 idiots", genre: "Comedy", rating: 9 },
  { title: "Dangal", genre: "Drama", rating: 10 },
  { title: "Bahubali", genre: "Action", rating: 8 },
];

let orders = [
  { orderId: 1, customerName: "Rahul", status: "shipped" },
  { orderId: 2, customerName: "Sita", status: "pending" },
  { orderId: 3, customerName: "Amit", status: "shipped" },
];
function filterByCategory(productObj, category) {
  return productObj.category === category;
}

app.get("/products/category/:category", (req, res) => {
  let category = req.params.category;
  let results = products.filter((prodObj) =>
    filterByCategory(prodObj, category),
  );

  res.json(results);
});

function filterByMileage(carObj, mileage) {
  return carObj.mileage < mileage;
}

app.get("/cars/mileage/:mileage", (req, res) => {
  let mileage = req.params.mileage;
  let results = cars.filter((carObj) => filterByMileage(carObj, mileage));
  res.json(results);
});

function filterByRating(movieObj, rating) {
  return movieObj.rating > rating;
}

app.get("/movies-rating/:rating", (req, res) => {
  let rating = req.params.rating;
  let results = movies.filter((movie) => filterByRating(movie, rating));
  res.json(results);
});

function filterByStatus(orderObj, status) {
  return orderObj.status === status;
}

app.get("/orders/status/:status", (req, res) => {
  let status = req.params.status;
  let results = orders.filter((order) => filterByStatus(order, status));
  res.json(results);
});

app.listen(port, () =>
  console.log(`Server is running http://localhost: ${port}`),
);
