import React from 'react';
export default function MessageList({ messages, you }){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {messages.map(m => (
        <div key={m.id} style={{alignSelf: m.user===you?'flex-end':'flex-start', maxWidth:'70%'}}>
          <div style={{fontSize:12,opacity:0.6,marginLeft:4}}>{m.system ? 'System' : (m.user || 'Anonymous')}</div>
          <div style={{border:'1px solid #ddd', padding:10, borderRadius:10}}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}