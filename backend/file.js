const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/CommonAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// *Schemas and Models*
// User schema for authentication
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Common schema for tracking all activities
const commonUserSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      activity: { type: String, required: true }, // E.g., 'memoryGame', 'quiz', 'moodTracker'
      points: Number,
      details: mongoose.Schema.Types.Mixed, // Activity-specific details
    },
    { timestamps: true }
  );
  const CommonUser = mongoose.model('CommonUser', commonUserSchema);
  
  // Mood schema for mood tracking
  const moodSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: String,
    start: Date,
    end: Date,
    reason: String,
  });
  const Mood = mongoose.model('Mood', moodSchema);
  
  // Game stats schema for individual game tracking
  const gameStatsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    attempts: Number,
    points: Number,
    timeTaken: Number,
  });
  const GameStats = mongoose.model('GameStats', gameStatsSchema);
  
  // *Routes*
  // Register route
  app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
      }
    
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Login route
    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
    
      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Activity tracking route (common database)
    app.post('/api/activities', async (req, res) => {
      const { userId, activity, points, details } = req.body;
    
      if (!userId || !activity) {
        return res.status(400).json({ message: 'userId and activity are required' });
      }
    
      try {
        const record = new CommonUser({ userId, activity, points, details });
        await record.save();
        res.status(201).json({ message: 'Activity recorded successfully', data: record });
      } catch (error) {
        console.error('Activity error:', error);
        res.status(500).json({ message: 'Failed to record activity' });
      }
    });
// Fetch user activities
app.get('/api/activities/:userId', async (req, res) => {
    try {
      const activities = await CommonUser.find({ userId: req.params.userId });
      res.json(activities);
    } catch (error) {
      console.error('Fetch activities error:', error);
      res.status(500).json({ message: 'Failed to fetch activities' });
    }
  });
  
  // Mood tracking routes
  app.post('/api/moods', async (req, res) => {
    const { userId, title, start, end, reason } = req.body;
    if (!userId || !title || !start || !end) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const mood = new Mood({ userId, title, start, end, reason });
      await mood.save();
      res.status(201).json({ message: 'Mood recorded successfully', data: mood });
    } catch (error) {
      console.error('Mood error:', error);
      res.status(500).json({ message: 'Failed to record mood' });
    }
  });
  
            