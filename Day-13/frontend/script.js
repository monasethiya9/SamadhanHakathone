const API = "http://localhost:5000/api/notes";
const notesList = document.getElementById("notes");

async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();
  notesList.innerHTML = notes.map(n => 
    `<li>
      <b>${n.title}</b>: ${n.content}
      <button onclick="deleteNote('${n._id}')">Delete</button>
    </li>`
  ).join("");
}

async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  loadNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadNotes();
}

loadNotes();
