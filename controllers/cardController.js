const mongoose = require('mongoose');
const Card = require('../models/card');

// GET /cards - returns all cards
const getAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).json(cards))
    .catch(err => res.status(500).json({ message: 'Error retrieving cards', error: err}));
};

// POST /cards - creates a card

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // assuming req.user is set in req.user._id
  console.log(owner); // id will become accesible
  Card.create({ name, link, owner })
    .then(card => res.status(201).json(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid Data', error: err});
      }
      res.status(500).json({ message: 'Error creating card', error: err});
    });
};

// DELETE /cards/:cardId - deletes a card by _id
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  //validateif CardId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'Invalid card ID'});
  }

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(200).json({ message: 'Card deleted succesfully' }))
    .catch(err =>{
      if (err.statusCode === 400) {
        return res.status(404).json({ message: err.message});
      }
      res.status(500).json({ message: 'Error deleting card', error: err});
    });
  };

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
};