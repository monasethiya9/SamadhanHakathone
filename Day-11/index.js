const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// In-memory "database"
let students = [
  { id: 1, name: "Aayush", age: 22 },
  { id: 2, name: "Danish", age: 23 },
];

// 📍 GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// 📍 GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// 📍 POST (Add new student)
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 📍 PUT (Update student)
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;

  res.json(student);
});

// 📍 DELETE student
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id));
  res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

