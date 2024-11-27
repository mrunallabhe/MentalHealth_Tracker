import React from 'react';
import './Card_mg.css';
//import backgroundImage from './back1.jpg'


const Card = ({ card, handleClick, isFlipped, isMatched }) => {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={() => handleClick(card.id)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={card.image} alt="card" />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
};

export default Card;