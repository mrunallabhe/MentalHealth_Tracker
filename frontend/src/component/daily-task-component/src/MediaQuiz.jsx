import React, { useEffect, useState } from 'react';
import './MediaQuiz.css';
import backgroundImage from './back7.jpg';

function MediaQuiz() {
  const [media, setMedia] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const userAge = 7; 

  // Fetch media content and questions from backend based on user's age
  useEffect(() => {
    fetch(`http://localhost:4000/api/media-content?age=${userAge}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setMedia(data.media);
        setQuestions(data.questions);
      })
      .catch(err => console.error('Error fetching media content:', err));
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const mediaId = media.id;
    fetch('http://localhost:4000/api/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers, mediaId }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setResult(data);
        setSubmitted(true);
      })
      .catch(err => console.error('Error submitting quiz:', err));
  };

  if (!media) {
    return <div>Loading media...</div>;
  }

  if (submitted && result) {
    return (
      <div className="result-page">
        <h2>Quiz Results</h2>
        <div className="circle">
          <div className="percentage">{result.percentage}%</div>
        </div>
        <p>Score: {result.score} / {result.totalQuestions}</p>
        <p>Feedback: {result.feedback}</p>
      </div>
    );
  }

  // Add inline style for background image
  const quizStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '40px',
  };

  return (
    <div style={quizStyle}>
      <div className="quiz-container">
        <div className="media-section">
          <h2>{media.description}</h2>
          {media.media_type === 'video' ? (
            <iframe
              width="560"
              height="315"
              src={media.media_url}
              title="Video Quiz"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <audio controls>
              <source src={media.media_url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div className="questions-section">
          <h3>Quiz Questions</h3>
          {questions.map((question) => (
            <div key={question.id} className="question">
              <p>{question.question_text}</p>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MediaQuiz;
