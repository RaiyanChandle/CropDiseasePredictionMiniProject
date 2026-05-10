const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getStats, getAllHistory } = require('../controllers/admin.controller');

// Admin only routes
router.get('/stats', protect, authorize('admin'), getStats);
router.get('/history', protect, authorize('admin'), getAllHistory);

module.exports = router;
