const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// connect to MONGODB
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conneted to MongoDB'))
.catch((err) =>
  console.error('Failed to connect to MongoDB', err));

// import models
require('./models/user');
require('./models/card');

// middleware for parsing JSON
app.use(bodyParser.json());

// read and data from JSON file
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// use the routers
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// manage non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
