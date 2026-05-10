const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { uploadAndPredict, getHistory } = require('../controllers/predict.controller');

// Configure multer to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Routes
// Only 'farmer' role should be allowed to predict
router.post('/', protect, authorize('farmer'), upload.single('image'), uploadAndPredict);

// Fetch history
router.get('/history', protect, authorize('farmer'), getHistory);

module.exports = router;
