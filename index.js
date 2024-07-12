let express = require('express');
let cors = require('cors');
let port = 3000;
let app = express();
app.use(cors());

//Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;
  
  res.send(cartTotal.toString());
})
app.listen(port, () => {
  console.log("Server is running on http://localhost: ", port);
})