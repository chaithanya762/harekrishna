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
  const [lotusFlowers, setLotusFlowers] = useState([]);
  const [offeringText, setOfferingText] = useState('');

  const handleClick = (id) => {
    setClickedId(id);
    setTimeout(() => {
      onMoodSelect(id);
    }, 600);
  };

  // Virtual Pushpanjali (Lotus Flower Offering) Handler
  const handleOfferFlowers = () => {
    const newFlowers = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 0.4
    }));

    setLotusFlowers(newFlowers);
    setOfferingText('🌺 Pushpanjali Offered to the Lord! 🌺');

    setTimeout(() => {
      setLotusFlowers([]);
      setOfferingText('');
    }, 2800);
  };

  return (
    <div className="mood-selector-container divine-reveal">
      {/* Floating Flowers Layer */}
      {lotusFlowers.length > 0 && (
        <div className="lotus-shower-container">
          {lotusFlowers.map((f) => (
            <span 
              key={f.id} 
              className="falling-lotus" 
              style={{ left: `${f.left}%`, animationDelay: `${f.delay}s` }}
            >
              🌺
            </span>
          ))}
        </div>
      )}

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

        {/* Pushpanjali Flower Offering Button */}
        <div className="shrine-action-area">
          <button className="pushpanjali-btn" onClick={handleOfferFlowers}>
            🌺 Offer Sacred Lotus Flowers (Pushpanjali)
          </button>
          {offeringText && <p className="offering-msg divine-reveal">{offeringText}</p>}
        </div>
      </div>

      {/* Daily Bhagavad Gita Wisdom Card */}
      <div className="gita-wisdom-card glass-panel">
        <div className="gita-badge">📜 DAILY GITA WISDOM (B.G. 9.34)</div>
        <p className="gita-verse">
          "Man-manā bhava mad-bhakto mad-yājī māṁ namaskuru"
        </p>
        <p className="gita-translation">
          "Fix your mind on Me, become My devotee, offer your homage unto Me. Thus absorbed in Me, you shall surely come to Me."
        </p>
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
