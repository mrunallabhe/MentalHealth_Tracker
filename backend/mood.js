// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5060;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Change the URI to your MongoDB instance)
mongoose.connect("mongodb://localhost:27017/moodTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Mood schema
const moodSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    reason: String,
});

// Create a Mood model
const Mood = mongoose.model("Mood", moodSchema);

// Get all moods
app.get("/api/moods", async (req, res) => {
    try {
        const moods = await Mood.find();
        res.json(moods);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch moods" });
    }
});

// Add a new mood
app.post("/api/moods", async (req, res) => {
    const { title, start, end, reason } = req.body;

    // Validate the input
    if (!title || !start || !end) {
        return res.status(400).json({ error: "Title, start, and end are required" });
    }

    const newMood = new Mood({
        title,
        start,
        end,
        reason,
    });

    try {
        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(500).json({ error: "Failed to save mood" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
