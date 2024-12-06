import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const emojiToNumeric = (emoji) => {
    const moodMapping = {
      '😊': 6,
      '😔': 5,
      '😡': 4,
      '😢': 3,
      '😂': 2,
      '😐': 1,
    };
    return moodMapping[emoji] || 0;
  };
  
  const numericToEmoji = (value) => {
    const emojiMapping = {
      6: '😊',
      5: '😔',
      4: '😡',
      3: '😢',
      2: '😂',
      1: '😐',
    };
    return emojiMapping[value] || '';
  };
  
  const MoodChart = ({ moods }) => {
    const data = {
      labels: Object.keys(moods), // Dates for x-axis
      datasets: [
        {
          label: 'Mood over Time',
          data: Object.values(moods).map((mood) => emojiToNumeric(mood)), // Map mood to numeric
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          margin: '20px auto',
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#4caf50',
            textAlign: 'center',
          }}
        >
          Mood Chart
        </h2>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
          }}
        >
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
    
                    callback: function (value) {
                      return numericToEmoji(value); // Display emojis on Y-axis
                    },
                    font:{
                      size:20,
                  },
                  },
                  
                  min: 1,
                  max: 6,
                },
              },
            }}
          />
        </div>
      </div>
    );
  };
  
  export default MoodChart;
  