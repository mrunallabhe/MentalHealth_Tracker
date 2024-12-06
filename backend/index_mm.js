const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define a schema for game stats
const gameStatsSchema = new mongoose.Schema({
  attempts: { type: Number, required: true },
  points: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

// Define a model
const GameStats = mongoose.model('GameStats', gameStatsSchema);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route to save game stats
app.post('/api/stats', async (req, res) => {
  const { attempts, points, timeTaken } = req.body;

  if (attempts === undefined || points === undefined || timeTaken === undefined) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const newStats = new GameStats({ attempts, points, timeTaken });
    await newStats.save();
    res.status(201).json({ message: 'Stats saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get all game stats
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await GameStats.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
