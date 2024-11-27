import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ attempts, points }) => {
  return (
    <div className="scoreboard">
      <div>Attempts: {attempts}</div>
      <div>Points: {points}</div>
    </div>
  );
};

export default ScoreBoard;