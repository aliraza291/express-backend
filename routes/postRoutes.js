const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const authMiddleware = require('../middleware/auth');

router.post('/api/posts', authMiddleware, async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.user._id;
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/api/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
