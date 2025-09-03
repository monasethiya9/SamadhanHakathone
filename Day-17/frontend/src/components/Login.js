import React, { useState } from 'react';
export default function Login({ onLogin }){
  const [name, setName] = useState('');
  const submit = (e)=>{
    e.preventDefault();
    if(name.trim()) onLogin(name.trim());
  };
  return (
    <div style={{display:'grid',placeItems:'center',height:'100vh'}}>
      <form onSubmit={submit} style={{padding:20,border:'1px solid #ddd',borderRadius:12,minWidth:320}}>
        <h2>Join Chat</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder='Enter a username'
          style={{width:'100%',padding:10,margin:'10px 0'}} />
        <button type='submit' style={{padding:10,width:'100%'}}>Enter</button>
      </form>
    </div>
  );
}