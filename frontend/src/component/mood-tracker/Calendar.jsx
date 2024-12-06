import React from 'react';

const Calendar = ({ selectedDate, onDateChange, moods, onMoodSelect }) => {
  const emojiOptions = ['😊', '😔', '😡', '😢', '😂', '😐'];

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    onDateChange(newDate);
  };

  const handleEmojiSelect = (emoji) => {
    onMoodSelect(selectedDate, emoji);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ color: 'red', marginBottom: '10px', marginTop: '20px' }}>
        Select a Date
      </h2>
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
        style={{
          padding: '10px',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '300px',
        }}
      />
      <h2 style={{ margin: '10px 0', fontSize: '1.2rem' }}>Select a Mood</h2>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {emojiOptions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiSelect(emoji)}
            style={{
              fontSize: '1.5rem',
              padding: '10px',
              backgroundColor: '#ffffff',
              border: '2px solid #ddd',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'transform 0.3s, background-color 0.3s',
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3 style={{ fontSize: '1rem', color: '#333' }}>
          Mood for {selectedDate.toDateString()}:
        </h3>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          {moods[selectedDate.toDateString()] || 'No mood selected yet.'}
        </p>
      </div>
    </div>
  );
};

export default Calendar;
