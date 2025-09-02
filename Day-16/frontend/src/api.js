import axios from 'axios';
const API_URL='http://localhost:5000/api';
export const fetchProducts=()=>axios.get(`${API_URL}/products`);
export const checkout=(cart)=>axios.post(`${API_URL}/checkout`,{cart});