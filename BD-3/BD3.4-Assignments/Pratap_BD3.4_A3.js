let express = require('express');
let app = express();
let port = 3000;
let cors = require('cors')
app.use(cors());

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];

// Endpoint 1: Add an Activity
app.get("/activities/add", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let results = addActivity(activities, activityId, type, duration, caloriesBurned);
  res.json({activities: results});
});

// function to add activity
function addActivity(activities, activityId, type, duration, caloriesBurned){
  activities.push({activityId: activityId, type: type, duration: duration, caloriesBurned: caloriesBurned});
  return activities;
}

// Endpoint 2: Sort Activities by Duration
app.get("/activities/sort-by-duration", (req, res) => {
  let activitiesCopy = activities.slice();
  let results = activitiesCopy.sort(sortActivities)
  res.json({activities: results});
});

// function to sort activities by duration
function sortActivities(activity1, activity2){
  return activity1.duration - activity2.duration;
}

// Endpoint 3: Filter Activities by Type
app.get("/activities/filter-by-type", (req, res) => {
  let type = req.query.type;
  let results = activities.filter(activity => getActivitiesByType(activity, type))
  res.json({activities: results});
});

// function to filter activities by type
function getActivitiesByType(activity, type) {
  return activity.type === type;
}

// Endpoint 4: Calculate Total Calories Burned
app.get("/activities/total-calories", (req, res) => {
  let results = totalCaloriesBurned(activities);
  res.json({totalCaloriesBurned: results});
});

// function to calculate total calories burned
function totalCaloriesBurned(activities){
  let total = 0;
  for (let i=0; i < activities.length; i++){
    total += activities[i].caloriesBurned;
  }
  return total;
}

// Endpoint 5: Update Activity Duration by ID
app.get("/activities/update-duration", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let results = updateActivityDuration(activities, activityId, duration)
  res.json({activities: results});
});

// function to update activity duration by ID
function updateActivityDuration(activities, activityId, duration) {
  for(let i=0; i<activities.length; i++){
    if(activities[i].activityId === activityId){
      activities[i].duration = duration;
      break;
    }
  }
  return activities;
}

// Endpoint 6: Delete Activity by ID
app.get("/activities/delete", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let results = activities.filter(activity => deleteActivityById(activity, activityId))
  res.json({activities: results});
});

// function to delete activity by ID
function deleteActivityById(activity, activityId){
  return activity.activityId !== activityId;
}

// Endpoint 7: Delete Activities by Type
app.get("/activities/delete-by-type", (req, res) => {
  let type = req.query.type;
  let results = activities.filter(activity => deleteActivityByType(activity, type));
  res.json({activities: results});
});

// function to delete activities by type
function deleteActivityByType(activity, type){
  return activity.type !== type;
}
app.listen(port, () => `Server is running on http://localhost: ${port}`);