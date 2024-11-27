const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Quiz')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define your question schema and model
const questionSchema = new mongoose.Schema({
  question: String,
  options: [{           // Define options as an array of objects
    text: String,
    points: Number
  }],
  answer: String,
  ageGroup: String,
}, { collection: 'Questions' }); // Use the existing collection name

const Question = mongoose.model('Question', questionSchema); // Singular model name

// API endpoint to fetch questions for a specific age group
app.get('/Questions/:ageGroup', async (req, res) => {
  let ageGroup = req.params.ageGroup.replace(/['"]+/g, '').trim();
  console.log(`Sanitized ageGroup: "${ageGroup}"`);

  try {
    const query = { ageGroup: ageGroup };

    console.log("MongoDB Query:", query);  // Log the query

    // Fetch questions from the database
    const questions = await Question.find(query).limit(5);
    console.log("Fetched Questions:", questions);

    // Send the fetched questions as the response
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Fetch all questions to log them at startup (for debugging)
Question.find({})
  .then((result) => {
    console.log("All Questions:", result);
  })
  .catch((err) => console.error("Error fetching all questions:", err));
