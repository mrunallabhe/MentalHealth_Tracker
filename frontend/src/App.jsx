import React, { useEffect, useState } from 'react';
import { FaComments } from 'react-icons/fa';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './component/About';
import BalloonPop from './component/Balloon/index.jsx';
import Banner from './component/Banner';
import Contact from './component/Contact';
import Course from './component/Course';
import DailyTask from './component/daily-task-component/src/MediaQuiz.jsx';
import Footer from './component/Footer';
import Journal from './component/Journal/index.jsx';
import Login from './component/Login';
import GameBoard from './component/memory-game/src/components/GameBoard';
import MoodTracker from './component/mood-tracker/index.jsx'; // Ensure this path is correct
import Navbar from './component/Navbar';
import Profile from './component/Profile.jsx';
import Home from './component/quiz/components/Home';
import Quiz from './component/quiz/components/Quiz';
import Result from './component/quiz/components/Result';
import Signup from './component/Signup';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  {isLoggedIn && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => (window.location.href = '/main')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  )}
                </>
              }
            />

            {/* Main Dashboard Route */}
            <Route
              path="/main"
              element={
                isLoggedIn ? (
                  <>
                    <Course />
                    <div className="text-center mt-12 mb-16 space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => (window.location.href = '/journal')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to journal
                     </button>
                      <button
                        onClick={() => (window.location.href = '/daily-task')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Daily Task
                      </button>
                      <button
                        onClick={() => (window.location.href = '/quiz')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Quiz
                      </button>
                      <button
                        onClick={() => (window.location.href = '/memory-game')}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Memory Game
                      </button>
                      <button
                        onClick={() => (window.location.href = '/mood-tracker')}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Mood Tracker
                      </button>
                      <button
                        onClick={() => (window.location.href = '/Balloon')}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        Go to Balloon Pop
                      </button>
                      
                    </div>
                    
                    {/* Add the JournalInput component here */}
                   
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Other Routes */}
            <Route path="/daily-task" element={<DailyTask />} />
            <Route path="/quiz" element={<Home />} />
            <Route path="/quiz/start" element={<Quiz />} />
            <Route path="/quiz/result" element={<Result />} />
            <Route path="/memory-game" element={<GameBoard ageGroup="11-13" />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/balloon" element={<BalloonPop/>} />

          </Routes>
        </main>

        <Footer />

        {/* Chatbot Button */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 z-50"
          aria-label="Toggle Chatbot"
        >
          <FaComments size={24} />
        </button>

        {/* Chatbot Window */}
        {isChatbotOpen && (
          <div className="fixed right-6 bottom-24 w-96 h-[520px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden transition-all duration-300">
            <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">Chat with us</h3>
              <button
                onClick={toggleChatbot}
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Close Chatbot"
              >
                &times;
              </button>
            </div>
            <iframe
              src="https://console.dialogflow.com/api-client/demo/embedded/6c1e0349-cd26-4dc1-92ba-ff3c1fe62677"
              className="w-full h-[calc(100%-60px)] border-none"
              title="Chatbot"
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
