const User = require('../models/user');

// GET /users - returns all users
const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'Error retrieving users', error: err}));
};

// GET /users/:userId - returns a user by _id
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ message: 'Error retrieving user', error: err}));
};

// POST /users - creates a user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ message: 'Error creating user', error: err}));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};