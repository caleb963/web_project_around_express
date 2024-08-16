const express = require('express');

const app = express();
const port = 3000;

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
