const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

/** -------- In-memory board -------- **/
const board = {
  columnOrder: ["todo", "doing", "done"],
  columns: {
    todo: { id: "todo", title: "To Do", cardIds: [] },
    doing: { id: "doing", title: "In Progress", cardIds: [] },
    done: { id: "done", title: "Done", cardIds: [] }
  },
  cards: {}
};

// seed a few cards
function seed() {
  const c1 = uuid(), c2 = uuid();
  board.cards[c1] = {
    id: c1,
    title: "Set up project",
    description: "Init server & client",
    assignees: ["Aayush"],
    comments: [],
    createdAt: Date.now()
  };
  board.cards[c2] = {
    id: c2,
    title: "Design board UI",
    description: "Columns, cards, DnD",
    assignees: ["Teammate"],
    comments: [],
    createdAt: Date.now()
  };
  board.columns.todo.cardIds.push(c1, c2);
}
seed();

const broadcast = () => io.emit("board", board);

/** -------- REST API -------- **/
app.get("/board", (req, res) => res.json(board));

app.post("/cards", (req, res) => {
  const { title, description = "", assignees = [], columnId } = req.body;
  if (!title || !columnId) {
    return res.status(400).json({ error: "title and columnId are required" });
  }
  const id = uuid();
  const card = { id, title, description, assignees, comments: [], createdAt: Date.now() };
  board.cards[id] = card;
  board.columns[columnId].cardIds.push(id);
  broadcast();
  res.status(201).json(card);
});

app.put("/move", (req, res) => {
  const { source, destination } = req.body; // {columnId, index}
  if (!destination) return res.json({ ok: true }); // dropped outside
  const sourceCol = board.columns[source.columnId];
  const destCol = board.columns[destination.columnId];
  const [movedId] = sourceCol.cardIds.splice(source.index, 1);
  destCol.cardIds.splice(destination.index, 0, movedId);
  broadcast();
  res.json({ ok: true });
});

app.put("/cards/:id", (req, res) => {
  const id = req.params.id;
  const card = board.cards[id];
  if (!card) return res.status(404).json({ error: "Card not found" });
  Object.assign(card, req.body); // e.g., {title, description, assignees}
  broadcast();
  res.json(card);
});

app.post("/cards/:id/comments", (req, res) => {
  const id = req.params.id;
  const { text, author = "Anon" } = req.body;
  const card = board.cards[id];
  if (!card) return res.status(404).json({ error: "Card not found" });
  const comment = { id: uuid(), text, author, createdAt: Date.now() };
  card.comments.push(comment);
  broadcast();
  res.status(201).json(comment);
});

/** -------- Realtime -------- **/
io.on("connection", (socket) => {
  socket.emit("board", board); // send current state on join
});

const PORT = 5000;
server.listen(PORT, () => console.log(`API + WS running on http://localhost:${PORT}`));
