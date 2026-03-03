const express = require("express");
const { tasks } = require("../data/task.json");

const route = express();

route.use(express.json());

/*
Route: /task
Method: GET
Description: Get all tasks
Access: Public
Parameter: None
*/

route.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All the tasks",
    data: { tasks },
  });
});

/*
Route: /task
Method: POST 
Description: Create a task
Access: Public
Parameter: None
*/

route.post("/", (req, res) => {
  const { id, title, description, status, createdAt, dueDate } = req.body;

  if (!id || !title || !description || !status || !createdAt || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  const newTask = tasks.find((each) => each.id === id);

  if (newTask) {
    return res.status(404).json({
      success: false,
      message: `Task is already created with id: ${id}`,
    });
  }

  tasks.push({
    id,
    title,
    description,
    status,
    createdAt,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully!",
  });
});

/*
Route: /task/{id}
Method: GET
Description: Get the task by id
Access: Public
Parameter: id
*/

route.get("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Please provide the updated data",
    });
  }

  const task = tasks.find((each) => each.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task with id: ${id}`,
    });
  }

  const updatedData = Object.assign(task, data);

  res.status(200).json({
    success: true,
    message: `Task with id: ${id}`,
    data: updatedData,
  });
});

/*
Route: /task/{id}
Method: PUT
Description: Update the task by id and mark as done
Access: Public
Parameter: id
*/

route.put("/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((each) => each.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task with id: ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully!",
  });
});

/*
Route: /task/{id}
Method: DELETE
Description: Delete the task by id
Access: Public
Parameter: id
*/

route.delete("/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((each) => each.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task with id: ${id}`,
    });
  }

  const updatedTask = tasks.filter((each) => each.id !== id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully!",
    data: updatedTask,
  });
});

/*
Route: /task/pending-tasks
Method: GET
Description: Get pending tasks
Access: Public
Parameter: None
*/

route.get("/pending-tasks/:status", (req, res) => {
    const { status } = req.params;

  const task = tasks.find((each) => each.status === status);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task with status: ${status}`,
    });
  }

  const pendingTask = tasks.filter((each) => each.status === status);

  res.status(200).json({
    success: true,
    message: "Task marked as pending!",
    data: pendingTask,
  });
});

/*
Route: /task/completed-tasks
Method: GET
Description: Get completed tasks
Access: Public
Parameter: None
*/

route.get("/completed-tasks/:status", (req, res) => {
    const { status } = req.params;

  const task = tasks.find((each) => each.status === status);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `No task with status: ${status}`,
    });
  }

  const completedTask = tasks.filter((each) => each.status === status);

  res.status(200).json({
    success: true,
    message: "Task marked as completed!",
    data: completedTask,
  });
});

module.exports = route;
