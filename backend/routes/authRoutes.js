const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Define a basic Owner model if you don't have one
const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactLanguage: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Owner = mongoose.model('Owner', OwnerSchema);

// @desc    Register owner
// @route   POST /api/v1/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, uuid, email, password, contactLanguage, phoneNumber } = req.body;

    // Check if user exists
    let owner = await Owner.findOne({ email });
    if (owner) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user
    owner = new Owner({
      name,
      uuid,
      email,
      password,
      contactLanguage,
      phoneNumber
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    owner.password = await bcrypt.hash(password, salt);

    await owner.save();

    // Create token
    const token = jwt.sign(
      { id: owner._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Login owner
// @route   POST /api/v1/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if owner exists
    const owner = await Owner.findOne({ email }).select('+password');
    if (!owner) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: owner._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;