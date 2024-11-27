import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Quiz = ({ selectedAgeGroup }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/questions/${selectedAgeGroup}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedAgeGroup]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const totalPossibleScore = calculateTotalPossibleScore();
    setScore(score);
    setTotalPossibleScore(totalPossibleScore);
    setShowResult(true);  // Show result after submission
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      const selectedOption = answers[question._id];
      if (selectedOption) {
        const selectedPoints = question.options?.find((option) => option.text === selectedOption)?.points || 0;
        score += selectedPoints;
      }
    });
    return score;
  };

  const calculateTotalPossibleScore = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const maxPoints = Math.max(...question.options.map(option => option.points));
      totalScore += maxPoints;
    });
    return totalScore;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h2 style={{ color: '#FF5722', fontSize: '28px' }}>Loading Questions...</h2>
        <div
          className="spinner"
          style={{
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #FF5722',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (showResult) {
    const percentageScore = (score / totalPossibleScore) * 100;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          background: 'url("https://img.freepik.com/premium-photo/children-theme-background_1253276-8835.jpg") no-repeat center center fixed',
          backgroundSize: 'cover',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: 'white', // Solid white background
            borderRadius: '12px',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
            padding: '40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' // Center align the content
          }}
        >
          <h2 style={{ fontSize: '28px', color: '#FF5722' }}>Your Score</h2>
          <div style={{ width: '200px', height: '200px', marginBottom: '20px' }}>
            <CircularProgressbar
              value={percentageScore}
              text={`${Math.round(percentageScore)}%`}
              styles={buildStyles({
                textColor: '#3e98c7',
                pathColor: '#FF5722',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <p style={{ fontSize: '20px', color: '#3F51B5' }}>
            You scored {score} out of {totalPossibleScore}.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: 'url("https://img.freepik.com/premium-photo/children-theme-background_1253276-8835.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        boxSizing: 'border-box',
      }}
    >
      {questions.length > 0 ? (
        <div
          style={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: '#FFFAF0',  // Light background for contrast
            borderRadius: '12px',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#FF4081' }}>
            {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
          </h2>
          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#3F51B5', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            {currentQuestion?.question}
          </h3>
          {currentQuestion?.options && currentQuestion.options.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {currentQuestion.options.map((option) => (
                <div key={option.text} style={{ marginBottom: '15px', width: '100%' }}>
                  <label style={{ display: 'block', fontSize: '20px', color: '#673AB7', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                    <div
                      onClick={() => handleOptionChange(currentQuestion._id, option.text)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '15px',
                        borderRadius: '15px',
                        backgroundColor: '#e1bee7',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, transform 0.3s',
                        border: answers[currentQuestion._id] === option.text ? '2px solid #7B1FA2' : '2px solid transparent',
                        justifyContent: 'center', // Center the option text
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#d1c4e9';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#e1bee7';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {option.text}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>No options available for this question.</p>
          )}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={{
                marginRight: '10px',
                padding: '12px 28px',
                background: '#4CAF50',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                style={{
                  padding: '12px 28px',
                  background: '#FF5722',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e64a19'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF5722'}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  padding: '12px 28px',
                  background: '#2196F3',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <h2 style={{ color: '#FF5722', fontSize: '28px' }}>No Questions Available</h2>
      )}
    </div>
  );
};

export default Quiz;
