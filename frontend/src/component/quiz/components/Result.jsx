import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #FFF6E5 0%, #FFD59A 100%)',
      padding: '20px',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '28px', color: '#FF4081' }}>Quiz Completed!</h2>
      <h3 style={{ fontSize: '24px', color: '#3F51B5' }}>
        {`Your Score: ${score} / ${totalQuestions}`}
      </h3>
    </div>
  );
};

export default Result;
