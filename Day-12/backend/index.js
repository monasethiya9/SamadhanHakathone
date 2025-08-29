// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // In-memory storage

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add new task
app.post("/tasks", (req, res) => {
  const task = { id: Date.now(), text: req.body.text };
  tasks.push(task);
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
