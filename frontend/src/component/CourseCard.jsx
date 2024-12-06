import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';

const cardStyles = {
  container: {
    position: 'relative',
    height: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '12rem',
    objectFit: 'cover',
  },
  content: {
    padding: '1.5rem',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
  },
  description: {
    color: '#4B5563',
    marginBottom: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  learnButton: {
    backgroundColor: '#EC4899',
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
  },
  chatbotButton: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    backgroundColor: '#EC4899',
    color: '#FFFFFF',
    padding: '1rem',
    borderRadius: '9999px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 10,
    cursor: 'pointer',
  },
  chatbotWindow: {
    position: 'fixed',
    right: '1.5rem',
    bottom: '5rem',
    width: '20rem',
    height: '500px',
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 20,
  },
  closeButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    fontSize: '1.25rem',
    padding: '0.25rem',
    backgroundColor: '#E5E7EB',
    borderRadius: '9999px',
    cursor: 'pointer',
  },
  iframe: {
    border: 'none',
    borderRadius: '0.5rem',
    width: '100%',
    height: '100%',
  },
};

export default function CourseCard({ item }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    console.log("In COurse card component")
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);

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
    <div style={cardStyles.container}>
      <div style={cardStyles.card}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={cardStyles.image}
        />
        <div style={cardStyles.content}>
          <h2 style={cardStyles.title}>
            {item.title}
            <span style={cardStyles.badge}>Enroll</span>
          </h2>
          <p style={cardStyles.description}>When minds explore, who watches the core?</p>
          <div style={cardStyles.buttonContainer}>
            <button style={{...cardStyles.button, ...cardStyles.learnButton}}>
              Learn
            </button>
            <button 
              onClick={handleStartClick}
              style={{...cardStyles.button, ...cardStyles.startButton}}
            >
              Start
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={toggleChatbot}
        style={cardStyles.chatbotButton}
        aria-label="Open chatbot"
      >
        <FaComments size={24} />
      </button>

      {isChatbotOpen && (
        <div style={cardStyles.chatbotWindow}>
          <button
            onClick={toggleChatbot}
            style={cardStyles.closeButton}
            aria-label="Close chatbot"
          >
            &times;
          </button>
          <iframe
            src="https://console.dialogflow.com/api-client/demo/embedded/6c1e0349-cd26-4dc1-92ba-ff3c1fe62677"
            style={cardStyles.iframe}
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
}

