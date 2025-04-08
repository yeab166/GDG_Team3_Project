const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


function authMiddleware(req, res, next) {
  req.user = { id: "USER_ID_FROM_AUTH" }; /
  next();
}


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
