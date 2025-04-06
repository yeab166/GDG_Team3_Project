const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Successfully logged out' });
});

module.exports = router;
