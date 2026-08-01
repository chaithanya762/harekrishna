import React, { useState } from 'react';
import './DivineMessage.css';

const MOOD_DATA = {
  sad: { 
    title: 'Dear Soul...', 
    message: 'Your tears fall into the ocean of Sri Jagannath\'s mercy.\n"Nilachala Nivasaya Nityaya Paramatmane"\nRest your weary soul. Every chant is a golden embrace from Puri.', 
    icon: '🙏',
    deityImage: '/assets/jagannath.jpg',
    deityName: 'Sri Puri Jagannath Swamy',
    rounds: [1, 27, 54, 108],
    recommended: 54
  },
  anxious: { 
    title: 'Be Still...', 
    message: 'Let the waves of worry subside into the eternal sound.\n"Sri Krishna Chaitanya Prabhu Nityananda..."\nYou are held in His divine protection. Take a deep breath.', 
    icon: '🙏',
    deityImage: '/assets/krishna.jpg',
    deityName: 'Sri Krishna Bhagavan',
    rounds: [1, 27, 54],
    recommended: 27
  },
  peaceful: { 
    title: 'Beautiful Soul...', 
    message: 'Your heart radiates the quiet glow of divine grace.\n"Balabhadra Subhadrabhyam Jagannathaya Te Namah"\nLet the sacred vibration elevate your spirit into pure bliss.', 
    icon: '🕊️',
    deityImage: '/assets/krishna.jpg',
    deityName: 'Sri Radha Krishna',
    rounds: [1, 8, 16, 27],
    recommended: 8
  },
  lost: { 
    title: 'Beloved Child...', 
    message: 'When the path ahead seems uncertain, His holy name is your light.\nEach repetition is a step toward home.\nKrishna is holding your hand with every bead.', 
    icon: '🔥',
    deityImage: '/assets/jagannath.jpg',
    deityName: 'Sri Jagannath Parambrahma',
    rounds: [1, 54, 108],
    recommended: 108
  }
};

export default function DivineMessage({ mood, onProceed }) {
  const data = MOOD_DATA[mood] || MOOD_DATA['peaceful'];
  const [selectedRounds, setSelectedRounds] = useState(data.recommended);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');

  const handleSelectPreset = (r) => {
    setIsCustomMode(false);
    setSelectedRounds(r);
  };

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    setCustomInputValue(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setIsCustomMode(true);
      setSelectedRounds(num);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const finalRounds = Math.max(1, selectedRounds || data.recommended);
    if (onProceed) {
      onProceed(finalRounds);
    }
  };

  return (
    <div className="divine-message-container">
      <div className="dark-overlay"></div>
      
      <div className="divine-content divineReveal">
        <div className="golden-bloom"></div>
        
        <div className="blessing-deity-frame">
          <img src={data.deityImage} alt={data.deityName} className="blessing-deity-img" />
          <span className="blessing-deity-title">{data.deityName}</span>
        </div>

        <h2 className="message-title shimmer-text">{data.title}</h2>
        <p className="message-text">{data.message}</p>

        <div className="rounds-selection fade-in-up">
          <p className="select-prompt">Choose how many times/rounds you will chant (108 beads each)</p>
          
          <div className="rounds-options">
            {data.rounds.map(r => (
              <div key={r} className="round-option-wrapper">
                <button 
                  type="button"
                  className={`round-button ${!isCustomMode && selectedRounds === r ? 'selected' : ''} ${data.recommended === r ? 'recommended' : ''}`}
                  onClick={() => handleSelectPreset(r)}
                >
                  {r}
                </button>
                {data.recommended === r && (
                  <span className="recommended-label">Suggested</span>
                )}
              </div>
            ))}
          </div>

          {/* Provision for Custom Number of Rounds / Chants */}
          <div className="custom-rounds-box">
            <label htmlFor="customRoundsInput" className="custom-rounds-label">✨ Or enter your custom number of rounds:</label>
            <input 
              id="customRoundsInput"
              type="number"
              min="1"
              max="1008"
              placeholder="e.g. 5, 12, 108..."
              value={customInputValue}
              onChange={handleCustomInputChange}
              className={`custom-rounds-input ${isCustomMode ? 'active' : ''}`}
            />
          </div>
          
          <button 
            type="button"
            className="proceed-button" 
            onClick={handleStart}
          >
            Begin Sacred Chanting ({selectedRounds || data.recommended} Rounds = {(selectedRounds || data.recommended) * 108} Chants) &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
