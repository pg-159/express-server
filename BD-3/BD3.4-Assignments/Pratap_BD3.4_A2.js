let express = require('express');
let app = express();
let port = 3000;
let cors = require('cors')
app.use(cors());

// sample data
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

// endpoint 1: add a task to the task list
app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let results = addTask(tasks, taskId, text, priority);
  res.json({tasks: results});
});

// function to add task to the task list
function addTask(tasks, taskId, text, priority){
  tasks.push({taskId: taskId, text: text, priority: priority})
  return tasks;
}

// endpoint 2: read all tasks in the task list
app.get("/tasks", (req, res) => {
  let results = readAllTasks(tasks)
  res.json(results);
});

// function to read all the tasks
function readAllTasks(tasks){
  return tasks;
}

// endpoint 3: Sort Tasks by Priority
app.get("/tasks/sort-by-priority", (req, res) => {
  let results = tasks.sort(sortTaskByPriority);
  res.json({tasks: results});
});

// function to sort task by priority
function sortTaskByPriority(task1,task2){
  return task1.priority - task2.priority;
}

// endpoint 4: edit task priority
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let results = updateTaskPriority(tasks, taskId, priority);
  res.json(results);
});

function updateTaskPriority(tasks, taskId, priority){
  for (let i=0; i < tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

// endpoint 5: edit / update task text
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let results = updateTaskText(tasks, taskId, text);
  res.json(results);
});

// function to update task text
function updateTaskText(tasks, taskId, text){
  for (let i=0; i<tasks.length; i++){
    if (tasks[i].taskId === taskId){
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}

// Endpoint 6. Delete a Task from the Task List
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let results = tasks.filter(task => removeTask(task, taskId))
  res.json({tasks: results});
});
// function to delete task from task list
function removeTask(task, taskId){
  return task.taskId !== taskId;
}

// Endpoint 7. Filter Tasks by Priority
app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let results = tasks.filter(task => showTaskByPriority(task, priority))
  res.json({tasks: results});
});

// function to filter task by priority
function showTaskByPriority(task, priority){
  return task.priority === priority;
}
app.listen(port, () => `Server is running on http://localhost: ${port}`);