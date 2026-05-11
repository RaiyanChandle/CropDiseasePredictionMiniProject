const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { 
  getAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement 
} = require('../controllers/announcement.controller');

// Public or Protected - getting announcements
// We'll protect it so only logged in users can see them
router.get('/', protect, getAnnouncements);

// Admin only routes
router.post('/', protect, authorize('admin'), createAnnouncement);
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

module.exports = router;
