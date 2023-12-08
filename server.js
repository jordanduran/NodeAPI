const express = require('express');
const mongoose = require('mongoose');
const app = express();

// routes

app.get('/', (req, res) => {
  res.send('Hello Node API');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog my name is Jordan');
});

mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://admin:admin821@nodeapi.5xj24uq.mongodb.net/node-api?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(3000, () => {
      console.log('Node API app is running on PORT 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
