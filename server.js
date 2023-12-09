const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

// Allows for json in requests
app.use(express.json());

// Allows for form url encoded in requests
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
  res.send('Hello Node API');
});

// GET all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} does not exist` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// DELETE product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID: ${id} does not exist` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://admin:admin821@nodeapi.5xj24uq.mongodb.net/node-api?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Runs the application on port
    app.listen(3000, () => {
      console.log('Node API app is running on PORT 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
