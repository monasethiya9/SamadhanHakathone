const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const students = [
  { id: 1, name: "Rahul", course: "React" },
  { id: 2, name: "Priya", course: "Node.js" },
  { id: 3, name: "Aman", course: "Python" }
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
