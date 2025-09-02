const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.post('/api/checkout', (req, res) => {
  const { cart } = req.body;
  if (!cart || cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  res.json({ message: 'Payment successful', total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));