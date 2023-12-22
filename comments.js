// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get comments from post id
  const comments = commentsByPostId[req.params.id] || [];
  // Get comment from request body
  const comment = req.body;
  // Add comment to comments array
  comments.push({ id: commentId, ...comment });
  // Save comments to comments by post id object
  commentsByPostId[req.params.id] = comments;
  // Send comment to client
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
