import React from 'react';

const AgeGroupSelection = ({ setAgeGroup }) => {
  const handleAgeGroupChange = (e) => {
    setAgeGroup(e.target.value);
  };

  return (
    <div>
      <h2>Select Age Group</h2>
      <select onChange={handleAgeGroupChange}>
        <option value="7-10">7-10</option>
        <option value="11-13">11-13</option>
        <option value="14-17">14-17</option>
      </select>
    </div>
  );
};

export default AgeGroupSelection;
