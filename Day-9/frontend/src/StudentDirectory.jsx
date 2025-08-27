import React, { useState, useEffect } from "react";

function StudentDirectory() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Directory</h2>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            <b>{s.name}</b> - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDirectory;
