const express = require('express');
const mongoose = require('mongoose');
const cardRoutes = require('./routes/cards');

const app = express();



// middleware for parsing JSON
app.use(express.json());

// connect to MONGODB
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import models
require('./models/user');
require('./models/card');



// middleware for adding user to request( for testing purposes)
app.use((req, res, next) => {
  req.user = { _id: '5d8b8592978f8bd833ca8133'}; // add a user for testing
  next();
});

// read and data from JSON file
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// use the routers
app.use('/users', usersRouter);
app.use('/cards', cardRoutes);


// manage non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

 const PORT =  process.env.PORT || 3000;
app.listen( PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
