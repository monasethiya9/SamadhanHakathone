import React,{useState} from 'react';
import { checkout } from '../api';
const Checkout = ({ cart, clearCart }) => {
  const [message,setMessage]=useState('');
  const handleCheckout=async()=>{
    try{const res=await checkout(cart); setMessage(res.data.message+`. Total: $${res.data.total}`); clearCart();}
    catch(err){setMessage(err.response?.data?.message||'Checkout failed');}
  };
  return (<div><h2>Checkout</h2><button onClick={handleCheckout} disabled={cart.length===0}>Pay Now</button>{message && <p>{message}</p>}</div>);
};
export default Checkout;