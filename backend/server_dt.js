const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const mediaContent = [
  {
    id: 1,
    media_type: 'video',
    age_group: '7-10',
    media_url: 'https://youtube.com/embed/OTuph9pJWU4?si=yIoVcbIV4YAW_rbG',
    description: 'Educational video for children aged 7-10',
  },
  {
    id: 2,
    media_type: 'video',
    age_group: '11-13',
    media_url: 'https://youtube.com/embed/8VC3AJMRf-8?si=dPDrFH2K2KfMPPbO',
    description: 'Educational video for children aged 11-13',
  },
  {
    id: 3,
    media_type: 'video',
    age_group: '14-17',
    media_url: 'https://example.com/audios/story.mp3',
    description: 'Educational video for children aged 14-17',
  },
];

const questions = {
  1: [
    {
      id: 105,
      question_text: 'Which is the largest and strongest bone of the face?',
      options: ['Mandible', 'Cranium', 'Scapula', 'Ribcage'],
      correct_answer: 'Mandila',
    },
    {
      id: 106,
      question_text: 'What is the name of triangular shaped bone?',
      options: ['Mandible', 'Cranium', 'Scapula', 'Ribcage'],
      correct_answer: 'Scapula',
    },
    {
      id: 107,
      question_text: 'What is the name of upper arm bone?',
      options: ['Radius', 'Humerus', 'Ulna', 'Wrist'],
      correct_answer: 'Humerus',
    },
    {
      id: 108,
      question_text: 'Total number of bones in an adult body',
      options: ['103', '216', '206', '115'],
      correct_answer: '206',
    },
    {
      id: 110,
      question_text: 'Stars which are of medium size and burns at medium temperature',
      options: ['Yellow', 'Red', 'Blue Giant Stars', 'Super Giant Stars'],
      correct_answer: 'Yellow',
    },
    // {
    //   id: 111,
    //   question_text: 'What music was played in the video?',
    //   options: ['Classical', 'Pop', 'Jazz', 'Rock'],
    //   correct_answer: 'Classical',
    // },
  ],
  2: [
    {
      id: 112,
      question_text: ' What is a black hole?',
      options: ['A star that is extremely bright', 'A region in space with strong gravity where nothing, not even light, can escape', 'A large planet with rings', 'A type of comet'],
      correct_answer: 'A region in space with strong gravity where nothing, not even light, can escape',
    },
    {
      id: 103,
      question_text: 'What is the point at the center of a black hole called?',
      options: ['Singularity', 'Event Horizon', 'Neutron Star', 'Asteroid Belt'],
      correct_answer: 'Singularity',
    },
    {
      id: 109,
      question_text: 'How are black holes formed?',
      options: ['When a large planet explodes', 'When a massive star dies and collapses under its own gravity', 'When two galaxies collide', 'When asteroids combine'],
      correct_answer: ' When a massive star dies and collapses under its own gravity',
    },
    {
      id: 111,
      question_text: 'Which scientist is famous for his work on black holes?',
      options: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Stephen Hawking'],
      correct_answer: 'Stephen Hawking',
    },
  ],
};

// Endpoint to fetch media content based on age group
app.get('/api/media-content', (req, res) => {
  const ageGroup = req.query.age;
  const media = mediaContent.find(item => {
    return item.age_group === '7-10' && ageGroup >= 7 && ageGroup <= 10;
  });

  if (media) {
    res.json({ media, questions: questions[media.id] });
  } else {
    res.status(404).json({ message: 'No media available for this age group' });
  }
});

// Endpoint to handle quiz submission
app.post('/api/submit-quiz', (req, res) => {
  const { answers, mediaId } = req.body;
  const correctAnswers = questions[mediaId].map(q => q.correct_answer);
  const score = questions[mediaId].reduce((acc, q) => {
    return acc + (answers[q.id] === q.correct_answer ? 1 : 0);
  }, 0);

  const totalQuestions = correctAnswers.length;
  const percentage = (score / totalQuestions) * 100;

  res.json({
    score,
    totalQuestions,
    percentage,
    feedback: score === totalQuestions ? 'Excellent work!' : 'Keep trying!',
  });
});

app.get('/', (req, res) => {
  res.send('API is running. Use /api/media-content to get media.');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
