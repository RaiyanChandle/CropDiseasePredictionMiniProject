const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public or Protected (Farmer/Admin)
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching announcements' });
  }
};

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private (Admin only)
const createAnnouncement = async (req, res) => {
  try {
    const { title, content, region } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const announcement = new Announcement({
      title,
      content,
      region: region || 'All Regions',
      author: req.user._id
    });

    const savedAnnouncement = await announcement.save();
    
    // Return with populated author
    const populated = await Announcement.findById(savedAnnouncement._id).populate('author', 'name');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating announcement' });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin only)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    await announcement.deleteOne();
    res.json({ message: 'Announcement removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting announcement' });
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement
};
