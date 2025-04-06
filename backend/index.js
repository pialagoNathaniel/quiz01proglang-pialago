// backend/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data store (in-memory)
let messages = ['Hello World!'];

// GET endpoint to retrieve messages
app.get('/api/messages', (req, res) => {
  res.json({ messages });
});

// POST endpoint to add a new message
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (message) {
    messages.push(message);
    res.json({ success: true, messages });
  } else {
    res.status(400).json({ success: false, error: 'No message provided' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});