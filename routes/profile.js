const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const User = require('../models/User');

// Update profile picture
router.post('/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    const userId = req.user.id; // make sure authentication middleware sets req.user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: req.file.filename },
      { new: true }
    );
    res.json({ message: "Profile picture updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error uploading picture" });
  }
});
