const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Reindeers route working' });
});

router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [], message: 'Get all reindeers' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: {}, message: `Get reindeer ${req.params.id}` });
});

router.get('/search', (req, res) => {
  const query = req.query.q || '';
  res.status(200).json({ 
    success: true, 
    data: [], 
    message: `Search for reindeers with query: ${query}` 
  });
});

module.exports = router;