import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => { fetchProducts().then(res => setProducts(res.data)); }, []);
  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id);
    if (exist) { setCart(cart.map(item => item.id===product.id ? {...item, quantity:item.quantity+1}:item)); }
    else setCart([...cart,{...product,quantity:1}]);
  };
  const removeFromCart = (id) => setCart(cart.filter(item=>item.id!==id));
  const clearCart = () => setCart([]);
  return (<div style={{display:'flex',gap:'50px'}}>
    <ProductList products={products} addToCart={addToCart} />
    <Cart cart={cart} removeFromCart={removeFromCart} />
    <Checkout cart={cart} clearCart={clearCart} />
  </div>);
}
export default App;