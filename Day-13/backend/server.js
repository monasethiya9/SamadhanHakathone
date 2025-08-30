const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/notesapp");

app.use("/api/notes", noteRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
