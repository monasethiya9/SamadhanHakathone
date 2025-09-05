const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hash });
    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ msg: 'Missing fields' });
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
