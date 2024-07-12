let express = require('express');
let cors = require('cors');
let port = 3000;
let app = express();
app.use(cors());

//Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

// function to calculate cart total
function calculateCartTotal (newItemPrice, cartTotal){
  cartTotal = cartTotal + newItemPrice;
  return cartTotal;
}

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  
  res.send(cartTotal.toString());
})

// function to calculate discounted amount
function applyDiscount(cartTotal, isMember){
  if (isMember === "true"){
    cartTotal = cartTotal - (cartTotal * (discountPercentage / 100));
    return cartTotal;
  } else {
    return cartTotal;
  }
}
// endpoint 2: apply discount based on membership status
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(applyDiscount(cartTotal, isMember).toString())
})
// function to apply tax on cart value amount
function calculateTax(cartTotal){
  let taxAmount = cartTotal * (taxRate / 100);
  return taxAmount;
}
// endpoint 3: apply tax on the cart value
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal).toString());
})

function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === "standard"){
    return distance / 50;
  } else {
    return distance / 100;
  }
}
// endpoint 4: calculate estimate delivery time
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
})


app.listen(port, () => {
  console.log("Server is running on http://localhost: ", port);
})