const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));

//GET all users
router.get('/', (req, res) => {
  res.json(users);
});

//GET user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'ID not found'});
  }
});

module.exports = router;