import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';

const SOCKET_URL = 'http://localhost:5000';

export default function App(){
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  const handleLogin = (name) => {
    setUsername(name);
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on('connect', () => {
      socketRef.current.emit('register', name);
      setConnected(true);
    });
  };

  useEffect(()=>{
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  },[]);

  if (!connected) return <Login onLogin={handleLogin} />;
  return <Chat socket={socketRef.current} username={username} />;
}