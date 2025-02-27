const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/v1/herds/test
// @access  Public
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Herds route working' });
});

// Get all herds
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [], message: 'Get all herds' });
});

// Get single herd
router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: {}, message: `Get herd ${req.params.id}` });
});

module.exports = router;