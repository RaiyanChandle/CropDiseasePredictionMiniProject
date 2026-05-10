const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  prediction: { type: String, required: true },
  confidence: { type: Number, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
