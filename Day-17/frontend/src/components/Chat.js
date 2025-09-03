import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import UserList from './UserList';

export default function Chat({ socket, username }){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const endRef = useRef();

  useEffect(()=>{
    socket.on('message', (msg) => setMessages(prev => [...prev, msg]));
    socket.on('users', (list) => setUsers(list));
    socket.on('status', ({ username: u, online }) => {
      setMessages(prev => [...prev, { id: Date.now(), system:true, text: `${u} is ${online?'online':'offline'}` }]);
    });
    socket.on('typing', ({ user, isTyping }) => setTypingUser(isTyping ? user : ''));

    return () => {
      socket.off('message'); socket.off('users'); socket.off('status'); socket.off('typing');
    };
  },[socket]);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); },[messages]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('message', input.trim());
    setInput('');
    socket.emit('typing', false);
  };

  const onTyping = (val) => {
    setInput(val);
    socket.emit('typing', !!val);
  };

  return (
    <div style={{display:'grid',gridTemplateColumns:'240px 1fr',height:'100vh'}}>
      <UserList users={users} you={username} />
      <div style={{display:'flex',flexDirection:'column',borderLeft:'1px solid #eee'}}>
        <div style={{padding:10,borderBottom:'1px solid #eee'}}>Logged in as <b>{username}</b></div>
        <div style={{flex:1, overflowY:'auto', padding:12}}>
          <MessageList messages={messages} you={username} />
          <div ref={endRef}/>
        </div>
        <div style={{padding:'8px 12px'}}>
          {typingUser && <div style={{fontSize:12,opacity:0.7,marginBottom:4}}>{typingUser} is typing...</div>}
          <form onSubmit={send} style={{display:'flex',gap:8}}>
            <input value={input} onChange={e=>onTyping(e.target.value)} placeholder='Type a message...'
              style={{flex:1,padding:10,border:'1px solid #ddd',borderRadius:8}} />
            <button type='submit' style={{padding:'10px 18px'}}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}