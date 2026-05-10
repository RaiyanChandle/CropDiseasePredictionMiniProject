const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const FormData = require('form-data');
const History = require('../models/History');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'crop_diseases' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

exports.uploadAndPredict = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    let location = null;
    if (req.body.location) {
      try {
        location = JSON.parse(req.body.location);
      } catch (e) {
        console.error('Failed to parse location:', e);
      }
    }

    // 1. Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

    // 2. Send to FastAPI
    const form = new FormData();
    // Provide a filename so FastAPI detects it correctly as an UploadFile
    form.append('file', req.file.buffer, { filename: 'upload.jpg', contentType: req.file.mimetype });

    let fastApiResult;
    try {
      const fastApiResponse = await axios.post('http://127.0.0.1:8000/predict', form, {
        headers: {
          ...form.getHeaders()
        }
      });
      fastApiResult = fastApiResponse.data;
    } catch (apiError) {
      console.error('FastAPI Error:', apiError.message);
      return res.status(502).json({ message: 'Failed to communicate with prediction service' });
    }

    // 3. Save to History
    const history = new History({
      user: req.user.userId,
      imageUrl: cloudinaryResult.secure_url,
      prediction: fastApiResult.prediction,
      confidence: fastApiResult.confidence,
      location: location
    });

    await history.save();

    // 4. Return result
    res.status(200).json({
      message: 'Prediction successful',
      prediction: fastApiResult.prediction,
      confidence: fastApiResult.confidence,
      imageUrl: cloudinaryResult.secure_url,
      historyId: history._id
    });
  } catch (error) {
    console.error('Prediction Controller Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
