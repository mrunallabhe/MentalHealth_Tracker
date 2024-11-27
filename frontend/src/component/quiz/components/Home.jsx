import React, { useState } from 'react';
import Quiz from './Quiz';  // Import the Quiz component

const Home = () => {
  const [ageGroup, setAgeGroup] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);  // State to toggle between home and quiz

  const handleAgeGroupChange = (e) => {
    setAgeGroup(e.target.value);
  };

  const startQuiz = () => {
    if (!ageGroup) {
      alert('Please select an age group before starting the quiz.');
      return;
    }
    setShowQuiz(true);  // Show the quiz after selecting the age group
  };

  return (
    <div className="home-container relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-yellow-300 p-0 m-0 transition-all duration-700 ease-in-out">
      {/* Ensure no header or navbar appears */}
      <div className="absolute top-0 left-0 right-0 h-0"></div>

      {/* Background Image */}
      <img
        src="https://thumbs.dreamstime.com/z/kids-doing-different-activities-kindergarten-cartoon-illustration-lots-toys-around-36757163.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"  // Background Image behind content
      />

      {!showQuiz ? (
        <div className="relative bg-white rounded-3xl shadow-2xl p-10 text-center w-full max-w-2xl animate-fadeIn z-10">
          {/* White Box Content */}
          <h1 className="text-5xl font-bold text-orange-600 mb-4 animate-bounce font-poppins">
             Mental Health Quiz!
          </h1>

          {/* Age Group Dropdown */}
          <div className="mt-6">
            <label htmlFor="age-group" className="block text-blue-600 text-xl font-semibold mb-2">
              Select Your Age Group:
            </label>
            <select
              id="age-group"
              value={ageGroup}
              onChange={handleAgeGroupChange}
              className="py-3 px-5 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out hover:shadow-2xl"
            >
              <option value="">--Select Age Group--</option>
              <option value="7-10">7-10</option>
              <option value="11-13">11-13</option>
              <option value="14-17">14-17</option>
            </select>
          </div>

          {/* Start Quiz Button */}
          <button
            onClick={startQuiz}
            className="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-12 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-container animate-slideInUp w-full z-10">
          <Quiz selectedAgeGroup={ageGroup} />
        </div>
      )}
    </div>
  );
};

export default Home;
