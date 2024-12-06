import React, { useState, useEffect } from 'react';
import Card from './Card_mg';
import ScoreBoard from './ScoreBoard';
// import Timer from './Timer'; // Timer component is now commented out
import axios from 'axios'; // Axios for API requests

// Import images
import boat1 from './images/boat.jpeg';
import boat from '../images_gameboard/boat.jpeg';
import car from '../images_gameboard/car.jpeg';
import elephant from '../images_gameboard/elephant.jpeg';
import flower from '../images_gameboard/flower.jpeg';
import lion from '../images_gameboard/lion.jpeg';
import monkey from '../images_gameboard/monkey.jpeg';
import mountain from '../images_gameboard/mountain.jpeg';
import plane from '../images_gameboard/plane.jpeg';
import tree from '../images_gameboard/tree.jpeg';
import bike from '../images_gameboard/bike.jpeg';
import back1 from '../images_gameboard/back1.jpg';

import './GameBoard.css';

const GameBoard = ({ ageGroup }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [points, setPoints] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0); // This state is now unused

  const getImagesForAgeGroup = (ageGroup) => {
    if (ageGroup === '11-13') {
      return [tree, mountain, flower, boat, monkey, lion];
    } else {
      return [car, elephant, bike, plane];
    }
  };

  useEffect(() => {
    const images = getImagesForAgeGroup(ageGroup);
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false }));

    setCards(shuffledCards);
  }, [ageGroup]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard].image === cards[secondCard].image) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setPoints((prev) => prev + 10);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) => ({
              ...card,
              isFlipped: flippedCards.includes(index) ? false : card.isFlipped,
            }))
          );
        }, 1000);
      }
      setFlippedCards([]);
      setAttempts((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleClick = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedCards([...flippedCards, index]);
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );
    }
  };

  const saveStats = async () => {
    try {
      await axios.post('http://localhost:5000/api/stats', {
        attempts,
        points,
        // timeTaken, // Removed from the POST request since timer logic is commented out
      });
      alert('Stats saved successfully');
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  };

  return (
    <div
      className="game-board"
      style={{
        backgroundImage: `url(${back1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 className="heading">Memory Match Game</h1>
      <ScoreBoard attempts={attempts} points={points} />
      {/* <Timer onTimeUpdate={setTimeTaken} /> */} {/* Timer component is commented out */}
      <button onClick={saveStats} className="save-stats-button">
        Save Stats
      </button>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            handleClick={handleClick}
            isFlipped={card.isFlipped}
            isMatched={matchedCards.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
