import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';  // Importing chat icon from react-icons

function Cards({ item })
 {
  console.log(item);
  
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);  // State to control chatbot open/close

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);  // Toggle chatbot
  };

  const handleStartClick = () => {
    if (item.title === "Mood Tracker") {
      window.location.href = "http://localhost:3000/"; // Daily Task URL
    } else if (item.title === "Quiz") {
      window.location.href = "http://localhost:5175/"; // Quiz URL
    } else if (item.title === "Memory Game") {
      window.location.href = "http://localhost:3001/"; // Memory Game URL
    } else {
      console.log("No URL defined for this section");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Cards Section */}
      <div className="card bg-base-100 w-96 shadow-xl mb-4"> {/* Adjusted margin-bottom */}
        <figure className="w-full h-64 ">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain" 
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">
            {item.title}
            <div className="badge badge-secondary">Enroll</div>
          </h2>
          <p>When minds explore, who watches the core?</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline hover:bg-pink-500 hover:text-white px-2 py-1 duration-300">
              Learn
            </div>
            <div
              onClick={handleStartClick}
              className="badge badge-outline hover:bg-pink-500 hover:text-white px-2 py-1 duration-300 cursor-pointer"
            >
              Start
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Icon fixed at the bottom-left corner */}
      <button
        onClick={toggleChatbot}
        className="fixed left-10 bottom-6 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-700"
        style={{ zIndex: 1000, padding: '12px' }}  // Adjusted bottom spacing
      >
        {/* Icon for the chatbot */}
        <FaComments size={24} />
      </button>

      {/* Chatbot window, only visible when `isChatbotOpen` is true */}
      {isChatbotOpen && (
        <div
          className="fixed left-6 w-80 h-[500px] bg-white rounded-lg shadow-lg"  // Increased height of chatbot box to 500px
          style={{ zIndex: 1001, bottom: '50px', padding: 0 }}  // Adjusted bottom spacing
        >
          <button
            onClick={toggleChatbot}
            className="absolute top-2 right-2 text-black text-lg p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            &times;
          </button>
          <iframe
            src="https://console.dialogflow.com/api-client/demo/embedded/6c1e0349-cd26-4dc1-92ba-ff3c1fe62677"
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '10px' }}
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Cards;
