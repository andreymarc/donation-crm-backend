const express = require('express');
const { check, validationResult } = require('express-validator');
const Donation = require('../models/Donation');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// GET all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// POST create donation
router.post('/', 
  [
    check('donorName', 'Donor name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('amount', 'Amount must be a number greater than 0').isFloat({ gt: 0 }),
    check('paymentMethod', 'Payment method is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { donorName, email, amount, paymentMethod } = req.body;

    try {
      const newDonation = new Donation({ donorName, email, amount, paymentMethod });
      await newDonation.save();
      res.status(201).json(newDonation);
    } catch (err) {
      console.error('Error saving donation:', err);
      res.status(500).json({ error: 'Failed to save donation' });
    }
  });

// DELETE donation (admin-only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ msg: 'Donation not found' });
    }

    await donation.remove();
    res.json({ msg: 'Donation removed' });
  } catch (err) {
    console.error('Error deleting donation:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
