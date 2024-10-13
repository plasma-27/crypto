// const express = require('express');
// const connectDB = require('./db'); // Import the connectDB function
// const User = require('./models/user'); // Import the User model

// const app = express();
// const port = 3500;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Example endpoint to create a user
// app.post('/api/users', async (req, res) => {
//   const { auth0Id, email, name } = req.body;

//   try {
//     const newUser = new User({ auth0Id, email, name });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const connectDB = require('./db'); // Import the connectDB function
const User = require('./models/user'); // Import the User model

const app = express();
const port = 3500;

// Middleware to parse JSON bodies
app.use(express.json()); // This middleware allows Express to parse JSON request bodies

// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Basic health check route
});

// Endpoint to create a user
app.post('/api/users', async (req, res) => {
  const { auth0Id, email, username, name } = req.body; // Destructure all expected fields

  try {
    const newUser = new User({ auth0Id, email, username, name }); // Create a new user instance
    await newUser.save(); // Save the user to the database
    res.status(201).json({ message: 'User created successfully', user: newUser }); // Return a success message
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create user' }); // Return an error response
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Log the server URL
});
