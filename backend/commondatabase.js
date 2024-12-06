const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/commondatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dailyTaskStats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyTaskStats' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

const User = mongoose.model('User', userSchema);

// Quiz Schema and Model
const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: String,
  options: [{ text: String, points: Number }],
  answer: String,
  ageGroup: String,
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Daily Task Stats Schema and Model
const dailyTaskStatsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  dailyTaskStats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyTaskStats' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  quizScores: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
      score: Number,
      percentage: Number,
    },
  ],
});
const DailyTaskStats = mongoose.model('DailyTaskStats', dailyTaskStatsSchema);

// User Registration
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
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
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Quiz Data
app.post('/api/quiz', async (req, res) => {
  const { userId, question, options, answer, ageGroup } = req.body;

  if (!userId || !question || !options || !answer || !ageGroup) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newQuiz = new Quiz({ user: userId, question, options, answer, ageGroup });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz data saved successfully' });
  } catch (error) {
    console.error('Error saving quiz data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Daily Task Stats
// Add or Update Daily Task Stats
// POST /api/daily-task-stats
app.post('/api/daily-task-stats', async (req, res) => {
  const { userId, attempts, points, timeTaken } = req.body;

  if (!userId || attempts === undefined || points === undefined || timeTaken === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let dailyTaskStats = await DailyTaskStats.findOne({ user: userId });

    if (dailyTaskStats) {
      // Update the stats if it already exists
      dailyTaskStats.attempts += attempts;
      dailyTaskStats.points += points;
      dailyTaskStats.timeTaken += timeTaken;
      await dailyTaskStats.save(); // Ensure this line is executed
    } else {
      // Create a new stats entry if it doesn't exist
      dailyTaskStats = new DailyTaskStats({ user: userId, attempts, points, timeTaken });
      await dailyTaskStats.save(); // Ensure this line is executed
    }

    res.status(201).json({ message: 'Daily task stats updated successfully' });
  } catch (error) {
    console.error('Error saving daily task stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch User Data (with quizzes and daily task stats)
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id)
      .populate('dailyTaskStats')
      .populate('quizzes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
