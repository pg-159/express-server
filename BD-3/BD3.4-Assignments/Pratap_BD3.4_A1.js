let express = require('express');
let app = express();
let port = 3000;
let cors = require('cors')
app.use(cors());
// sample data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

// endpoint 1: add an item to the cart
app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let results = addProductToCart(cart, productId, name, price, quantity);  
  res.json(results);
});

// function to add product to cart
function addProductToCart(cart, productId, name, price, quantity) {
  cart.push({productId: productId, name: name, price: price, quantity: quantity});
  return cart;
}

// endpoint 2: update quantity of an item in the cart
app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let results = updateProductById(cart, productId, quantity);
  res.json(results);
});

// function to update product quantiy in the cart
function updateProductById(cart, productId, quantity){
  for (let i=0; i<cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

// endpoint 3: delete an item from the cart
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let results = cart.filter(ele => deleteProductById(ele, productId));
  cart = results;
  res.json({cart: results});
});
// function to remove product from the cart by product ID
function deleteProductById(cart, productId){
  return cart.productId !== productId;
}

// endpoint 4: read items in the cart
app.get("/cart", (req, res) => {
  let results = readCart(cart);
  res.json({cart: results});
});

// function to reat the current status of the cart
function readCart(cart){
  return cart;
}

// endpoint 5: calculate total quantity of items in the cart
app.get("/cart/total-quantity", (req, res) => {
  let results = totalQuantity(cart);
  res.json({totalQuantity: results});
});

// function to calculate total quantity of itmes in the cart
function totalQuantity(cart){
  let total = 0;
  for (let i=0; i < cart.length; i++){
    total += cart[i].quantity;
  }
  return total;
}

// endpoint 6: calculate total price of items in the cart
app.get("/cart/total-price", (req, res) => {
  let results = totalPrice(cart)
  res.json({totalPrice: results});
});

// function to calculate total price of items in the cart
function totalPrice(cart){
  let total = 0;
  for (let i=0; i < cart.length; i++){
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
app.listen(port, () => `Server is running on http://localhost: ${port}`);