// src/App.jsx
import React from 'react';
// Correct import from 'index.jsx' (which is now exporting default JournalInput)
import JournalInput from './JournalInput'; // Import from index.jsx directly

function App() {
  return (
    <div className="App">
      <h1><center>Welcome to the Media Quiz App</center></h1>
      <JournalInput /> {/* Render the JournalInput component */}
    </div>
  );
}

export default App;
