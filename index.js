let express = require('express');
let cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to stock portfolio analysis API!");
})

// function to calculate returns made
function calculateReturns(boughtAt, marketPrice, quantity){
  return ( marketPrice - boughtAt ) * quantity;
}

// Endpoint 1: Calculate the Returns of the Stocks added
app.get("/calculate-returns", (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt)
  let marketPrice = parseFloat(req.query.marketPrice)
  let quantity = parseFloat(req.query.quantity)

  res.send(calculateReturns(boughtAt, marketPrice, quantity).toString())
})

// function to calculate total returns
function calculateTotalReturns(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
// Endpoint 2: Calculate the Total Returns
app.get("/total-returns", (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(calculateTotalReturns(stock1, stock2, stock3, stock4).toString());
})

// function to calculate return percentage
function calculateReturnPercentage(boughtAt, returns) {
  return (returns / boughtAt) * 100;
}
// Endpoint 3: Calculate the Return Percentage
app.get("/calculate-return-percentage", (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  
  res.send(calculateReturnPercentage(boughtAt, returns).toString());
}) 

function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
// Endpoint 4: Calculate the Total Return Percentage
app.get("/total-return-percentage", (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(calculateTotalReturnPercentage(stock1, stock2, stock3, stock4).toString())
  
})
app.listen(PORT, () => console.log("Server is listening on port", PORT));