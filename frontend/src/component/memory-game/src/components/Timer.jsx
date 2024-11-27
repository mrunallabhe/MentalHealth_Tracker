import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onTimeUpdate(seconds);
  }, [seconds, onTimeUpdate]);

  return (
    <div className="timer">
      Time: {seconds} seconds
    </div>
  );
};

export default Timer;