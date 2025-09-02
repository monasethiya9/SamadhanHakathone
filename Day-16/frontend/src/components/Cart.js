import React from 'react';
const Cart = ({ cart, removeFromCart }) => (
  <div><h2>Cart</h2>{cart.length===0 && <p>Cart is empty</p>}
  {cart.map(item=>(<div key={item.id} style={{border:'1px solid #ccc',margin:'5px',padding:'5px'}}>
  <h3>{item.name}</h3><p>Price: ${item.price} x {item.quantity}</p><button onClick={()=>removeFromCart(item.id)}>Remove</button></div>))}</div>
);
export default Cart;