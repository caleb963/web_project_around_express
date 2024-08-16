const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cardsPath = (path.join(__dirname, '../data/cards.json'), 'utf-8');

//GET all cards
router.get('/', (req, res) => {
  fs.readFile(cardsPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading cards data'});
    }
    const cards = JSON.parse(data);
    res.json(cards);
  });
  });


module.exports = router;