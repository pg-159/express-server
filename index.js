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

function applyDiscount(cartTotal, isMember){

  if (isMember === "true"){
    cartTotal = cartTotal - (cartTotal * (discountPercentage / 100));
    return cartTotal;
  } else {
    return cartTotal;
  }
}
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(applyDiscount(cartTotal, isMember).toString())
})
app.listen(port, () => {
  console.log("Server is running on http://localhost: ", port);
})