const express = require("express");
const app = express();
const PORT = 3000;

// Dummy student data
const students = [
  { id: 1, name: "Rahul Sharma", age: 20, course: "Computer Science", marks: 85 },
  { id: 2, name: "Priya Mehta", age: 22, course: "Electronics", marks: 78 },
  { id: 3, name: "Amit Verma", age: 21, course: "Mechanical", marks: 92 }
];

// Route to get all students
app.get("/api/students", (req, res) => {
  res.json({ students });
});

// Single student by ID
app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
