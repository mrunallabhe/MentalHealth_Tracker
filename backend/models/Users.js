const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  scores: [
    {
      quizId: String,
      score: Number,
      date: { type: Date, default: Date.now },
    }
  ], // Array to hold quiz scores
});

// Password hashing before saving user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
