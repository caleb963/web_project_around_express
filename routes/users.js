const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

// GET all users
router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading users data' });
    }
    const users = JSON.parse(data);
    return res.json(users);
  });
});
// GET user by id
router.get('/:id', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading users data' });
    }
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);
    if (user) {
      return res.json(user);
    }
    return res.status(404).json({ message: 'ID not found' });
  });
});

module.exports = router;
