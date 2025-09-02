import React from 'react';
const ProductList = ({ products, addToCart }) => (
  <div><h2>Products</h2>{products.map(p=>(<div key={p.id} style={{border:'1px solid #ccc',margin:'5px',padding:'5px'}}>
    <h3>{p.name}</h3><p>Price: ${p.price}</p><button onClick={()=>addToCart(p)}>Add to Cart</button></div>))}</div>
);
export default ProductList;