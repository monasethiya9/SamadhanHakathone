
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET","POST"] }
});

const users = new Map(); // socketId -> {username}

function broadcastUsers(){
  const list = Array.from(users.values()).map(u => u.username);
  io.emit('users', list);
}

io.on('connection', (socket) => {
  socket.on('register', (username) => {
    users.set(socket.id, { username });
    socket.broadcast.emit('status', { username, online: true });
    broadcastUsers();
  });

  socket.on('message', (msg) => {
    const user = users.get(socket.id)?.username || 'Anonymous';
    const payload = {
      id: Date.now() + Math.random(),
      user,
      text: msg,
      timestamp: new Date().toISOString()
    };
    io.emit('message', payload);
  });

  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id)?.username;
    if (!user) return;
    socket.broadcast.emit('typing', { user, isTyping });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id)?.username;
    if (user){
      socket.broadcast.emit('status', { username: user, online: false });
    }
    users.delete(socket.id);
    broadcastUsers();
  });
});

app.get('/', (_req,res)=> res.send('Real-time Chat Backend Running'));

const PORT = 5000;
server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
