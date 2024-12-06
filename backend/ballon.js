const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory "database" to store popped thoughts
let thoughts = [];

// Route to receive popped thoughts
app.post('/api/thoughts', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Thought text is required' });
    }

    const newThought = { text, timestamp: new Date() };
    thoughts.push(newThought);

    res.status(201).json(newThought);
});

// Route to fetch all popped thoughts
app.get('/api/thoughts', (req, res) => {
    res.status(200).json(thoughts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
