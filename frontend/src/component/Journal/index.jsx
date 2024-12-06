// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct import of App
import JournalInput from './JournalInput'; // Ensure that reportWebVitals is properly imported
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);

// Optional: If you want to measure the performance of your app, use reportWebVitals
reportWebVitals();
export default JournalInput;