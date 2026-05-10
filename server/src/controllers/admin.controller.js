const History = require('../models/History');
const User = require('../models/User');

exports.getStats = async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalScans = await History.countDocuments();
    
    // Aggregate to find the most common disease
    const topDiseaseAggr = await History.aggregate([
      { $group: { _id: '$prediction', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const topDisease = topDiseaseAggr.length > 0 ? topDiseaseAggr[0]._id : 'None yet';

    res.status(200).json({
      totalFarmers,
      totalScans,
      topDisease
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllHistory = async (req, res) => {
  try {
    // Only fetch history items that have a valid latitude and longitude
    const history = await History.find({
      'location.latitude': { $exists: true, $ne: null },
      'location.longitude': { $exists: true, $ne: null }
    }).populate('user', 'name email').sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error('Admin History Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
