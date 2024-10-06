const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Create a new donor
router.post('/', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).send(donor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.send(donors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).send();
    res.send(donor);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
