import React, { useState } from 'react';
import { FaGraduationCap, FaPlay } from 'react-icons/fa';

function Cards({ item }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  console.log("In  card component")
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleStartClick = () => {
    switch (item.title) {
      case "Mood Tracker":
        window.location.href = "http://localhost:3000/";
        break;
      case "Quiz":
        window.location.href = "http://localhost:5175/";
        break;
      case "Memory Game":
        window.location.href = "http://localhost:3001/";
        break;
      default:
        console.log("No URL defined for this section");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl  shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-58 object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
          Enroll Now
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">When minds explore, who watches the core?</p>
        <div className="flex justify-between items-center">
          <button 
            className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={() => console.log("Learn more about", item.title)}
          >
            <FaGraduationCap className="mr-2" />
            Learn
          </button>
          <button 
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={handleStartClick}
          >
            <FaPlay className="mr-2" />
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
