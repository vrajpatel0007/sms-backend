const Announcement = require('../models/Announcement.model');

const createAnnouncement = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'User or society information is missing' });
    }

    const announcement = new Announcement({
      title,
      description,
      date,
      time,
      createdBy: req.user._id,
      Society: req.user.societyid,
    });
    console.log("🚀 ~ createAnnouncement ~  req.user.societyid:", req.user.societyid)
    console.log("🚀 ~ createAnnouncement ~  req.user._id:", req.user._id)

    await announcement.save();
    return res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllAnnouncements = async (req, res) => {
  try {
    // Filter announcements by Society
    const announcements = await Announcement.find({ Society: req.user.societyid })
      .populate('Society') // Populate admin details (name and email)
      .populate('createdBy'); // Populate society details

    return res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('Society') // Populate admin details (name and email)
      .populate('createdBy');  // Populate society details

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateAnnouncement = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        time
      },
      { new: true }
    )
      .populate('Society')
      .populate('createdBy');
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({
      message: 'Announcement updated successfully',
      announcement,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    return res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};