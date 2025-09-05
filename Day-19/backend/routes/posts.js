const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

function auth(req, res, next){
  const token = req.header('x-auth-token') || req.body.token;
  if(!token) return res.status(401).json({ msg: 'No token' });
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  }catch(e){
    res.status(401).json({ msg: 'Token invalid' });
  }
}

// create post
router.post('/', auth, async (req, res) => {
  try{
    const { text } = req.body;
    if(!text) return res.status(400).json({ msg: 'Text required' });
    const post = new Post({ author: req.user.id, text });
    await post.save();
    res.json(post);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// get all posts
router.get('/', async (req, res) => {
  try{
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(posts);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    const idx = post.likes.indexOf(req.user.id);
    if(idx === -1) post.likes.push(req.user.id);
    else post.likes.splice(idx,1);
    await post.save();
    res.json(post);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// comment
router.post('/:id/comment', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    const populated = await Post.findById(post._id).populate('comments.user', 'name');
    res.json(populated);
  }catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
