import React, { useState } from 'react';

function JournalInput() {
  const [entry, setEntry] = useState('');
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSubmit = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/save-journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry }),
      });

      if (!response.ok) {
        throw new Error('Failed to save journal entry');
      }

      const data = await response.json();
      setFeedback(data.sentimentAnalysis); // Display sentiment result
      setSuggestions(data.suggestions); // Display suggestions
    } catch (error) {
      console.error('Error saving journal:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundImage: 'url("https://example.com/your-background-image.jpg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '60px', // Adjust for navbar space
        animation: 'fadeIn 1s ease-in',
      }}
    >
      <textarea
        placeholder="Write your journal entry..."
        value={entry}
        onChange={handleChange}
        rows="6"
        cols="40"
        disabled={loading}
        style={{
          width: '70%',
          maxWidth: '500px',
          padding: '15px',
          borderRadius: '15px',
          border: '1px solid #4caf50',
          fontSize: '16px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          color: '#333',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          outline: 'none',
        }}
      ></textarea>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#FF6347',
          color: 'white',
          padding: '14px 28px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          width: '250px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s, transform 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#ff4500')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#FF6785')}
      >
        {loading ? 'Saving...' : 'Save Entry'}
      </button>

      {feedback && (
        <div style={{ marginTop: '30px', width: '70%', maxWidth: '500px' }}>
          <div
            style={{
              backgroundColor: '#e0f7fa',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              transition: 'transform 0.3s',
            }}
          >
            <h3 style={{ color: '#00796b', fontSize: '22px' }}>{feedback}</h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Suggested Quote:</h4>
            <p style={{ fontSize: '16px', color: '#555', fontStyle: 'italic' }}>
              {suggestions.quote}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Suggested Music:</h4>
            <p style={{ fontSize: '16px', color: '#555' }}>{suggestions.music}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Suggested Movie:</h4>
            <p style={{ fontSize: '16px', color: '#555' }}>{suggestions.movie}</p>
          </div>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '16px' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default JournalInput;
