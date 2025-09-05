import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App(){
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')||'null'));

  useEffect(()=>{ fetchPosts(); }, []);

  async function fetchPosts(){
    const res = await api.get('/posts');
    setPosts(res.data);
  }

  async function createPost(e){
    e.preventDefault();
    if(!text) return;
    await api.post('/posts', { text }, { headers: { 'x-auth-token': token }});
    setText('');
    fetchPosts();
  }

  async function toggleLike(id){
    await api.post(`/posts/${id}/like`, {}, { headers: { 'x-auth-token': token }});
    fetchPosts();
  }

  return (
    <div className="app">
      <h1>Social Dashboard</h1>
      {!user ? <Auth onAuth={(t,u)=>{ setToken(t); setUser(u); localStorage.setItem('token',t); localStorage.setItem('user',JSON.stringify(u)); }} /> :
      <div>
        <p>Welcome, {user.name}</p>
        <form onSubmit={createPost}>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind?" />
          <button type="submit">Post</button>
        </form>
      </div>}
      <div className="feed">
        {posts.map(p=>(
          <div key={p._id} className="post">
            <div className="meta">{p.author?.name || 'Unknown'} • {new Date(p.createdAt).toLocaleString()}</div>
            <div className="text">{p.text}</div>
            <div className="actions">
              <button onClick={()=>toggleLike(p._id)}>Like ({p.likes.length})</button>
            </div>
            <div className="comments">
              {p.comments.map((c,i)=>(<div key={i}><b>{c.user?.name || 'User'}:</b> {c.text}</div>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Auth({ onAuth }){
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name:'', email:'', password:'' });

  async function submit(e){
    e.preventDefault();
    const url = isLogin ? '/auth/login' : '/auth/register';
    const res = await api.post(url, form);
    onAuth(res.data.token, res.data.user);
  }

  return (
    <div className="auth">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit}>
        {!isLogin && <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />}
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={()=>setIsLogin(!isLogin)} className="toggle">{isLogin ? 'Create account' : 'Have an account? Login'}</p>
    </div>
  );
}

export default App;
