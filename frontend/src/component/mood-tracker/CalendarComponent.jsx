import React, { useState } from 'react';
import './CalendarComponent.css'; // Import the CSS file

const CalendarComponent = ({ onAddMood }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMood, setSelectedMood] = useState('');

    const moodOptions = ['😊', '😐', '😢']; // Define your mood emojis

    const handleSelectMood = (date) => {
        const moodEntry = {
            date: new Date(date),
            mood: selectedMood,
        };
        onAddMood(moodEntry);
        setSelectedMood(''); // Reset selected mood after adding
    };

    return (
        <div className="calendar-container">
            <h2 className="calendar-header">
                Select a Mood for {selectedDate.toDateString()}
            </h2>
            <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="date-picker"
            />
            <div className="mood-options">
                {moodOptions.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedMood(mood)}
                        className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
                    >
                        {mood}
                    </button>
                ))}
            </div>
            <button
                onClick={() => handleSelectMood(selectedDate)}
                className="add-mood-button"
                disabled={!selectedMood}
            >
                Add Mood
            </button>
        </div>
    );
};

export default CalendarComponent;
