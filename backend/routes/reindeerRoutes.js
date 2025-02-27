const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/v1/reindeers/test
// @access  Public
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Reindeers route working' });
});

// Get all reindeers
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [], message: 'Get all reindeers' });
});

// Get single reindeer
router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: {}, message: `Get reindeer ${req.params.id}` });
});

// Search reindeers
router.get('/search', (req, res) => {
  const query = req.query.q || '';
  res.status(200).json({ 
    success: true, 
    data: [], 
    message: `Search for reindeers with query: ${query}` 
  });
});

module.exports = router;