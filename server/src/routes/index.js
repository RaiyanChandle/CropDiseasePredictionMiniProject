const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const predictRoutes = require('./predict.routes');
const adminRoutes = require('./admin.routes');
const announcementRoutes = require('./announcement.routes');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/predict', predictRoutes);
router.use('/admin', adminRoutes);
router.use('/announcements', announcementRoutes);

module.exports = router;
