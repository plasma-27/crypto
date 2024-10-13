const express = require('express');
const connectDB = require('./db'); // Import the connectDB function

const app = express();
const port = 3500;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
