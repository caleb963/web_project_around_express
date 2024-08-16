const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

//read and data from JSON file

const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
const cards = JSON.parse(fs.readFileSync(path.join(__dirname, 'cards.json'), 'utf-8'));

//GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

//GET all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

//GET user by id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'ID not found'});
  }
});

// manage non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});