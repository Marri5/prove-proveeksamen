const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/v1/owners/test
// @access  Public
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Owners route working' });
});

// Get all owners
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [], message: 'Get all owners' });
});

// Get single owner
router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: {}, message: `Get owner ${req.params.id}` });
});

module.exports = router;