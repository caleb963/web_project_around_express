const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser} = require('../controllers/userController');


// GET /users - returns all users
router.get('/', getAllUsers);

// GET /users/:userId - return a user by _id
router.get('/:userId', getUserById);

// POST / users - creates a new user
router.post('/', createUser);


module.exports = router;
