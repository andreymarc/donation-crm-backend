// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations'); // Ensure this is lowercase if the file is named `donations.js`



// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected successfully'))
  .catch(err => console.error('Mongoose connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/donations', donationRoutes); // Donation routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Donation CRM API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
