import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Banner from './component/Banner';
import Course from './component/Course';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Signup from './component/Signup';
import Contact from './component/Contact';
import About from './component/About';
import DailyTask from './component/daily-task-component/src/MediaQuiz.jsx';
import Quiz from './component/quiz/components/Quiz';
import Home from './component/quiz/components/Home';
import Result from './component/quiz/components/Result';
import GameBoard from './component/memory-game/src/components/GameBoard'; // Import Memory Game component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'your-auth-token');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                {isLoggedIn && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => (window.location.href = '/main')}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}
                <Footer />
              </>
            }
          />

          <Route
            path="/main"
            element={
              isLoggedIn ? (
                <>
                  <Course />
                  <div className="text-center mt-4">
                    <button
                      onClick={() => (window.location.href = '/daily-task')}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                      Go to Daily Task
                    </button>
                    <button
                      onClick={() => (window.location.href = '/quiz')}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                      Go to Quiz
                    </button>
                    <button
                      onClick={() => (window.location.href = '/memory-game')}
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Go to Memory Game
                    </button>
                  </div>
                  <Footer />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/daily-task" element={<DailyTask />} />
          <Route path="/quiz" element={<Home />} />
          <Route path="/quiz/start" element={<Quiz />} />
          <Route path="/quiz/result" element={<Result />} />
          <Route path="/memory-game" element={<GameBoard ageGroup="11-13" />} /> 
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
