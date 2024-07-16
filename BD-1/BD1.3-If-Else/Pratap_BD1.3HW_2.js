let express = require('express');
let app = express();
let port = 3000;

// Endpoint 1: Check BMI category (given weight & height)
app.get("/check-bmi", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let height = parseFloat(req.query.height);
  let bmi = weight / (height * height);
  let result = "";
  
  if (bmi < 18.5){
    result = "underweight";
  } else if (bmi < 24.9) {
    result = "normal weight";
  } else if (bmi < 29.9){
    result = "overweight";
  } else {
    result = "obese";
  }
  res.send("BMI category is "+result);
});

// Endpoint 2: Check academic performance based on grade
app.get("/check-performance", (req, res) => {
  let grade = parseFloat(req.query.grade);
  let result = "";

  if (grade >= 90){
    result = "excellent";
  } else if (grade >= 75) {
    result = "good";
  } else if (grade >= 50){
    result = "average";
  } else {
    result = "poor";
  }
  res.send("Academic performance is "+result);
});

// Endpoint 3: Check age group based on given age
app.get("/check-age-group", (req, res) => {
  let age = parseInt(req.query.age);
  let result = "";

  if (age <= 12){
    result = "child";
  } else if (age <= 17) {
    result = "teenager";
  } else if (age <= 64){
    result = "adult";
  } else {
    result = "senior";
  }
  res.send("Age group is "+result);
});

// Endpoint 4: Check loan eligibility based on given credit score
app.get("/check-loan-eligibility", (req, res) => {
  let creditScore = parseInt(req.query.creditScore);
  let result = "";

  if (creditScore >= 750){
    result = "high";
  } else if (creditScore >= 650) {
    result = "medium";
  } else {
    result = "low";
  }
  res.send("Loan eligbility is "+result);
});

// Endpoint 5: Check tax bracket based on given income
app.get("/check-tax-bracket", (req, res) => {
  let income = parseFloat(req.query.income);
  let result = "";

  if (income <= 500000){
    result = "10% tax bracket";
  } else if (income <= 1000000) {
    result = "15% tax bracket";
  } else if (income <= 1500000) {
    result = "20% tax bracket";
  } else {
    result = "30% or higher tax bracket";
  }
  res.send("You fall under the "+result);
});

app.listen(port, () => {
  console.log("Server is running on http://localhost: ",port);
})