const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },
});

module.exports = mongoose.model('User', userSchema);
