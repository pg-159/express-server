let express = require("express");
let app = express();
let port = 3000;

// Endpoint 1: Calculate the total distance covered by adding two trips
app.get("/total-distance", (req, res) => {
  let distance1 = parseFloat(req.query.distance1);
  let distance2 = parseFloat(req.query.distance2);

  let totalDistance = distance1 + distance2;
  res.send(totalDistance.toString());
});

// Endpoint 2: Calculate the total time spent on multiple activities
app.get("/total-time", (req, res) => {
  let time1 = parseFloat(req.query.time1);
  let time2 = parseFloat(req.query.time2);
  let time3 = parseFloat(req.query.time3);

  let totalTime = time1 + time2 + time3;
  res.send(totalTime.toString());
});
// Endpoint 3: Calculate the average speed given total distance and time taken
app.get("/average-speed", (req, res) => {
  let totalDistance = parseFloat(req.query.totalDistance);
  let totalTime = parseFloat(req.query.totalTime);

  let averageSpeed = totalDistance / totalTime;
  res.send(averageSpeed.toString());
});

// Endpoint 4: Calculate the estimated time of arrival (ETA) given distance and speed
app.get("/eta", (req, res) => {
  let distance = parseFloat(req.query.distance);
  let speed = parseFloat(req.query.speed);

  let eta = distance / speed;
  res.send(eta.toString());
});

// Endpoint 5: Calculate total calories burned based on activity duration and calories burned per minute
app.get("/total-calories", (req, res) => {
  let duration1 = parseFloat(req.query.duration1);
  let duration2 = parseFloat(req.query.duration2);
  let caloriesPerMinute = parseFloat(req.query.caloriesPerMinute);

  let totalCalories = (duration1 + duration2) * caloriesPerMinute;
  res.send(totalCalories.toString());
});

// Endpoint 6: Calculate the interest earned on a savings account given principal, rate, and time
app.get("/interest-earned", (req, res) => {
  let principal = parseFloat(req.query.principal);
  let rate = parseFloat(req.query.rate);
  let time = parseFloat(req.query.time);

  let interestEarned = (principal * rate * time) / 100;
  res.send(interestEarned.toString());
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:",port);
});