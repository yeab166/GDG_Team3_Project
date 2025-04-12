const User = require('../models/users');

// Get user profile (excluding password)
const getUserProfile = async (req, res) => {
    try {
        // Ensure req.user is available (authenticated)
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const profile = await User.findById(user._id).select('-password'); // Exclude password

        if (!profile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ profile });
        console.log('User profile retrieved successfully');
    } catch (error) {
        console.error('Error retrieving user profile:', error);  // More detailed error logging
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { username } = req.body;
    const user = req.user;

    // Ensure req.user is available (authenticated)
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(
            user._id,
            { username },
            { new: true }
        ).select('-password'); // Exclude password

        if (!updatedProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ updatedProfile });
        console.log('User profile updated successfully');
    } catch (error) {
        console.error('Error updating user profile:', error);  // More detailed error logging
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserProfile, updateUserProfile };
