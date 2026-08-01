import React, { useState } from 'react';
import './MoodSelector.css';

const moods = [
  { id: 'sad', emoji: '🙏', label: 'Heavy Heart', desc: 'Carrying weight of sorrow' },
  { id: 'anxious', emoji: '🌊', label: 'Restless Mind', desc: 'Waves of worry within' },
  { id: 'peaceful', emoji: '🕊️', label: 'Inner Peace', desc: 'Seeking to deepen calm' },
  { id: 'lost', emoji: '🔥', label: 'Seeking Direction', desc: 'The soul searches for light' }
];

export default function MoodSelector({ onMoodSelect }) {
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (id) => {
    setClickedId(id);
    setTimeout(() => {
      onMoodSelect(id);
    }, 600);
  };

  return (
    <div className="mood-selector-container divine-reveal">
      {/* Royal Temple Altar Banner featuring 3 Sacred Deities */}
      <div className="royal-shrine-banner glass-panel">
        <div className="shrine-deities-grid">
          <div className="deity-frame">
            <img src="/assets/jagannath.jpg" alt="Puri Jagannath Swamy" className="deity-img" />
            <span className="deity-label">Sri Jagannath Dham</span>
          </div>
          <div className="deity-frame">
            <img src="/assets/chaitanya.jpg" alt="Sri Chaitanya Mahaprabhu" className="deity-img" />
            <span className="deity-label">Chaitanya Mahaprabhu</span>
          </div>
          <div className="deity-frame">
            <img src="/assets/krishna.jpg" alt="Royal Sri Krishna" className="deity-img" />
            <span className="deity-label">Sri Krishna Bhagavan</span>
          </div>
        </div>
        <div className="shrine-blessing">
          <span className="royal-symbol">🪷 🚩 🪶</span>
        </div>
      </div>

      <h1 className="mood-title shimmer-text">How does your soul feel today?</h1>
      <p className="mood-subtitle">Offer your heart to Sri Chaitanya, Jagannath Swamy & Sri Krishna</p>
      
      <div className="mood-cards-grid">
        {moods.map((mood, index) => (
          <div 
            key={mood.id} 
            className={`mood-card glass-panel ${clickedId === mood.id ? 'clicked' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => handleClick(mood.id)}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <h3 className="mood-label">{mood.label}</h3>
            <p className="mood-desc">{mood.desc}</p>
            {clickedId === mood.id && <span className="ripple"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
