const mongoose = require('mongoose');

const favoriteCoinSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  current_price: {
    type: Number,
    required: true,
  },
  market_cap: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the authenticated user
    required: true,
  },
});

const FavoriteCoin = mongoose.model('FavoriteCoin', favoriteCoinSchema);

module.exports = FavoriteCoin;
