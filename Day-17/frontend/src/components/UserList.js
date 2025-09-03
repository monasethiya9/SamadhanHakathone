import React from 'react';
export default function UserList({ users, you }){
  return (
    <div style={{borderRight:'1px solid #eee', padding:12}}>
      <h3>Online</h3>
      <ul style={{listStyle:'none',padding:0}}>
        {users.map(u => (
          <li key={u} style={{display:'flex',alignItems:'center',gap:8,margin:'6px 0'}}>
            <span style={{display:'inline-block',width:8,height:8,borderRadius:99,background:'#2ecc71'}}></span>
            <span>{u}{u===you ? ' (you)' : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}