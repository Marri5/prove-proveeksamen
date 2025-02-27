const express = require('express');
const {
  getReindeers,
  getReindeer,
  createReindeer,
  searchReindeers
} = require('../controllers/reindeerController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/search').get(searchReindeers);

router
  .route('/')
  .get(getReindeers)
  .post(protect, createReindeer);

router
  .route('/:id')
  .get(getReindeer);

module.exports = router;