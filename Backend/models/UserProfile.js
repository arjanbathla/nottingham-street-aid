const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetCode: String,
  resetCodeExpires: Date
});

module.exports = mongoose.model('UserProfiles', UserProfileSchema);
