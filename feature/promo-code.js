// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/promo-codes', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define PromoCode schema
const promoCodeSchema = new mongoose.Schema({
  code: String,
  discount: Number,
  expires_at: Date,
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

// API endpoint to validate a promo code
app.get('/validate-promo-code/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const promoCode = await PromoCode.findOne({ code, expires_at: { $gte: new Date() } });
    if (promoCode) {
      res.json({ valid: true, discount: promoCode.discount });
    } else {
      res.json({ valid: false, message: 'Invalid promo code' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

