const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  address: String,
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }]
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;

const donorRoutes = require('./routes/donors');
app.use('/donors', donorRoutes);

