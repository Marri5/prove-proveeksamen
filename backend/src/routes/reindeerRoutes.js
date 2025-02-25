const express = require('express');
const { addReindeer, getAllReindeer } = require('../controllers/reindeerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authMiddleware, addReindeer);
router.get('/', authMiddleware, getAllReindeer);

module.exports = router;
