const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Owners route working' });
});

router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [], message: 'Get all owners' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: {}, message: `Get owner ${req.params.id}` });
});

module.exports = router;