const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cards = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cards.json'), 'utf-8'));

//GET all cards
router.get('/', (req, res) => {
  res.json(cards);
});

module.exports = router;