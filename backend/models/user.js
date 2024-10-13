const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define User Schema
const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String, // Added username field
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Route to add user (changed to /users for consistency)
router.post('/users', async (req, res) => {
  const { auth0Id, email, username, name } = req.body; // Include username

  try {
    const newUser = new User({
      auth0Id,
      email,
      username, // Store username
      name,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error while creating user:', error.message); // Log error message
    res.status(500).json({
      message: 'Error creating user',
      error:
        error.message ||
        'An unexpected error occurred. Please try again later.',
      details: error, // Provide more details about the error
    });
  }
});

// Route to get user by Auth0 ID
router.get('/users/:auth0Id', async (req, res) => {
  const { auth0Id } = req.params;

  try {
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: `No user found with Auth0 ID: ${auth0Id}`,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error while fetching user:', error.message); // Log error message
    res.status(500).json({
      message: 'Error fetching user',
      error:
        error.message ||
        'An unexpected error occurred. Please try again later.',
      details: error, // Provide more details about the error
    });
  }
});

module.exports = router;
