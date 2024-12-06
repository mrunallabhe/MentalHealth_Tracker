const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vader = require('vader-sentiment');
const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const port = 5079;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request body
app.use(bodyParser.json());

// CSV writer setup with absolute file path
const csvFilePath = path.join(__dirname, 'journal_entries.csv');
const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'entry', title: 'Entry' },
    { id: 'sentiment', title: 'Sentiment' },
    { id: 'score', title: 'Score' },
  ],
});

// Example data for suggestions
const positiveQuotes = [
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "The only way to do great work is to love what you do."
];
const neutralQuotes = [
  "This too shall pass.",
  "Take it one day at a time."
];
const negativeQuotes = [
  "In the middle of difficulty lies opportunity.",
  "You are stronger than you think."
];

const upliftingMusic = [
  "Happy - Pharrell Williams",
  "Here Comes The Sun - The Beatles"
];
const relaxingMusic = [
  "Weightless - Marconi Union",
  "Sunset Lover - Petit Biscuit"
];
const calmingMusic = [
  "Spiegel im Spiegel - Arvo Pärt",
  "Clair de Lune - Claude Debussy"
];

const motivationalMovies = [
  "The Pursuit of Happyness",
  "Rocky"
];
const feelGoodMovies = [
  "Forrest Gump",
  "The Secret Life of Walter Mitty"
];
const dramaMovies = [
  "A Beautiful Mind",
  "The Shawshank Redemption"
];

// Function to get suggestions based on sentiment score
const getSuggestions = (score) => {
  let suggestions = {};

  if (score >= 0.05) {
    suggestions = {
      quote: positiveQuotes[Math.floor(Math.random() * positiveQuotes.length)],
      music: upliftingMusic[Math.floor(Math.random() * upliftingMusic.length)],
      movie: motivationalMovies[Math.floor(Math.random() * motivationalMovies.length)],
    };
  } else if (score <= -0.05) {
    suggestions = {
      quote: negativeQuotes[Math.floor(Math.random() * negativeQuotes.length)],
      music: calmingMusic[Math.floor(Math.random() * calmingMusic.length)],
      movie: dramaMovies[Math.floor(Math.random() * dramaMovies.length)],
    };
  } else {
    suggestions = {
      quote: neutralQuotes[Math.floor(Math.random() * neutralQuotes.length)],
      music: relaxingMusic[Math.floor(Math.random() * relaxingMusic.length)],
      movie: feelGoodMovies[Math.floor(Math.random() * feelGoodMovies.length)],
    };
  }

  return suggestions;
};

// Function to save entry to CSV file (append mode)
const saveToCsv = async (entry, sentiment, score) => {
  try {
    // Check if the file exists; if not, create it with headers
    if (!fs.existsSync(csvFilePath)) {
      console.log('CSV file not found, creating a new one...');
      await csvWriter.writeRecords([]); // Create the file if it doesn't exist
    }

    // Append the new entry to the CSV file
    await csvWriter.writeRecords([
      { entry, sentiment, score },
    ]);
    console.log('Journal entry saved to CSV');
  } catch (error) {
    console.error('Error saving to CSV:', error);
  }
};

// Endpoint to save the journal entry and perform sentiment analysis
app.post('/api/save-journal', async (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({ error: 'Journal entry is required' });
  }

  // Perform sentiment analysis using VADER
  const sentimentResult = vader.SentimentIntensityAnalyzer.polarity_scores(entry);
  const score = sentimentResult.compound;

  // Analyze sentiment
  let sentiment;
  if (score >= 0.05) {
    sentiment = 'Positive';
  } else if (score <= -0.05) {
    sentiment = 'Negative';
  } else {
    sentiment = 'Neutral';
  }

  // Get suggestions based on the sentiment score
  const suggestions = getSuggestions(score);

  // Save the journal entry to CSV
  await saveToCsv(entry, sentiment, score.toFixed(2));

  // Send the sentiment analysis result with suggestions
  res.json({
    sentimentAnalysis: `Sentiment: ${sentiment} (Score: ${score.toFixed(2)})`,
    suggestions,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
