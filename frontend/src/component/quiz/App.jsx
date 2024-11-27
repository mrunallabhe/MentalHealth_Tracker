import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      {/* Navigation bar */}
      <nav className="bg-blue-500 text-white py-4">
       
      </nav>

      {/* Main content area for rendering routes */}
      <div className="content flex-grow p-4">
        <Outlet /> {/* This will render the Home or Quiz component based on the current route */}
      </div>
    </div>
  );
}

export default App;
