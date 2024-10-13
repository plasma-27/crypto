const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/crypto-db');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
