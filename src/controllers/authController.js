const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return res.status(400).json({ error: 'Email or username already exists' });
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: 'Registration successful', userId: newUser._id });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  //this token expire after 15 min to make more secure uor profile.
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '15min' });
  res.json({ token });
};

module.exports = { registerUser, loginUser };
