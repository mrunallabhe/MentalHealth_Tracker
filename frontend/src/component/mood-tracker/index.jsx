import React, { useState } from 'react';
import Calendar from './Calendar';
import MoodChart from './MoodChart';

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moods, setMoods] = useState({});
  const [showChart, setShowChart] = useState(false);

  const handleMoodSelect = (date, mood) => {
    const formattedDate = new Date(date).toDateString();
    setMoods((prevMoods) => ({
      ...prevMoods,
      [formattedDate]: mood,
    }));
    setShowChart(true); // Show the chart when a mood is selected.
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowChart(false); // Go back to calendar when the date changes.
  };

  return (
    <div className="mood-tracker">
      <h1>Mood Tracker</h1>
      {!showChart ? (
        <Calendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          moods={moods}
          onMoodSelect={handleMoodSelect}
        />
      ) : (
        <div>
          <MoodChart moods={moods} />
          <button
            onClick={() => setShowChart(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Back to Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
