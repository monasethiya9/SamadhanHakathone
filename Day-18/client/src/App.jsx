import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { io } from "socket.io-client";
import { api } from "./api";
import { v4 as uuid } from "uuid";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

export default function App() {
  const [board, setBoard] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  // fetch board & subscribe to realtime updates
  useEffect(() => {
    api.get("/board").then((r) => setBoard(r.data));
    socket.on("board", (b) => setBoard(structuredClone(b)));
    return () => socket.off("board");
  }, []);

  const stats = useMemo(() => {
    if (!board) return { total: 0, done: 0, percent: 0 };
    const total = Object.values(board.columns).reduce(
      (acc, col) => acc + col.cardIds.length,
      0
    );
    const done = board.columns.done?.cardIds.length ?? 0;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }, [board]);

  async function onDragEnd(result) {
    const { destination, source } = result;
    await api.put("/move", {
      source: { columnId: source.droppableId, index: source.index },
      destination: destination
        ? { columnId: destination.droppableId, index: destination.index }
        : null,
    });
    // No local state update needed; server broadcasts new board.
  }

  async function addCard() {
    if (!newTitle.trim()) return;
    await api.post("/cards", {
      title: newTitle.trim(),
      description: "",
      assignees: assignee ? [assignee.trim()] : [],
      columnId: "todo",
    });
    setNewTitle("");
    setAssignee("");
  }

  if (!board) return <div className="wrap">Loading…</div>;

  return (
    <div className="wrap">
      <header className="header">
        <h1>Task Management System</h1>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${stats.percent}%` }} />
          <span>{stats.percent}% done ({stats.done}/{stats.total})</span>
        </div>
      </header>

      <div className="add-card">
        <input
          placeholder="New task title…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Assignee (optional)…"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <button onClick={addCard}>Add to “To Do”</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {board.columnOrder.map((colId) => {
            const col = board.columns[colId];
            const cards = col.cardIds.map((id) => board.cards[id]);
            return (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`column ${snapshot.isDraggingOver ? "over" : ""}`}
                  >
                    <div className="column-header">
                      <h3>{col.title}</h3>
                      <span className="pill">{cards.length}</span>
                    </div>
                    {cards.map((card, idx) => (
                      <Draggable draggableId={card.id} index={idx} key={card.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card ${snapshot.isDragging ? "drag" : ""}`}
                          >
                            <div className="card-title">{card.title}</div>
                            {!!card.assignees?.length && (
                              <div className="assignees">
                                {card.assignees.map((a) => (
                                  <span className="avatar" key={a}>
                                    {a
                                      .split(" ")
                                      .map((n) => n[0]?.toUpperCase())
                                      .join("")
                                      .slice(0, 2)}
                                  </span>
                                ))}
                              </div>
                            )}
                            <CardActions card={card} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

function CardActions({ card }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [comment, setComment] = useState("");

  async function save() {
    await api.put(`/cards/${card.id}`, { title });
    setEditing(false);
  }
  async function addComment() {
    if (!comment.trim()) return;
    await api.post(`/cards/${card.id}/comments`, { text: comment, author: "User" });
    setComment("");
  }

  return (
    <div>
      {editing ? (
        <div className="edit-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={save}>Save</button>
        </div>
      ) : (
        <button className="link" onClick={() => setEditing(true)}>Rename</button>
      )}
      <div className="comment-row">
        <input
          placeholder="Add comment…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Send</button>
      </div>
      {!!card.comments?.length && (
        <ul className="comments">
          {card.comments.slice(-3).map((c) => (
            <li key={c.id}><b>{c.author}:</b> {c.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
