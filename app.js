const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const authenticateToken = require('./src/middleware/authMiddleware');
require('dotenv').config();
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
const postsRoute = require('./src/routes/posts');
app.use('/posts', postsRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
