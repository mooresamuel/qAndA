// WordResults.js
import React, { useState } from 'react';
import './WordResults.css';

const WordResults = ({ result }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  
  // Ensure result is an array of word objects
  const words = Array.isArray(result) ? result : [];

  return (
    <div className="word-results">
      <h3 className="result-heading">Result:</h3>
      <div className="words-container">
        {words.map((wordData, index) => (
          <div
            key={index}
            className="word-item"
            onClick={() => setSelectedWord(selectedWord === index ? null : index)}
          >
            <span className="word">{wordData.word}</span>
            <div 
              className={`confidence-tooltip ${selectedWord === index ? 'show' : ''}`}
            >
              Confidence: {(wordData.confidence * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordResults;