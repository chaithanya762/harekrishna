import React from 'react';
import './FestivalCalendarModal.css';

const FESTIVALS = [
  {
    date: 'Upcoming: April / May 2026',
    title: '🚩 Kamada Ekadashi Fasting',
    type: 'Ekadashi Vrata',
    rules: 'Fast from grains, beans & cereals. Chant extra rounds of Hare Krishna Mahamantra.',
    blessing: 'Fulfills pure spiritual desires and grants freedom from past karmic burdens.'
  },
  {
    date: 'Upcoming: June / July 2026',
    title: '🚩 Sri Puri Ratha Yatra Festival',
    type: 'Puri Dham Grand Festival',
    rules: 'Chant Jagannath Swamy Shloka, offer Mahaprasadam & fresh lotus flowers.',
    blessing: 'Whoever beholds Sri Jagannath on His chariot never suffers rebirth in darkness.'
  },
  {
    date: 'Upcoming: August / Sept 2026',
    title: '🪶 Sri Krishna Janmashtami',
    type: 'Appearance Day of Lord Krishna',
    rules: 'Fasting till midnight, midnight Abhishekam & Sankirtana उत्सव.',
    blessing: 'Fills the heart with supreme bliss and eternal love for Sri Krishna.'
  },
  {
    date: 'Upcoming: Sept 2026',
    title: '🪷 Sri Radhashtami',
    type: 'Appearance Day of Srimati Radharani',
    rules: 'Fasting till noon, offering Tulsi leaves and singing Radhe Radhe Kirtan.',
    blessing: 'Srimati Radharani grants direct devotional service at Krishna\'s lotus feet.'
  }
];

export default function FestivalCalendarModal({ onClose }) {
  return (
    <div className="festival-modal-overlay divine-reveal" onClick={onClose}>
      <div className="festival-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="festival-close-btn" onClick={onClose}>×</button>
        
        <div className="festival-modal-header text-center">
          <span className="festival-badge">📅 VAISNAVA PANCHANGA & FESTIVALS 🚩</span>
          <h2 className="shimmer-text festival-title">Sacred Fasting & Vrindavan Calendar</h2>
          <p className="festival-subtitle">Keep your soul aligned with sacred Ekadashis and divine festival observances</p>
        </div>

        <div className="festivals-list">
          {FESTIVALS.map((fest, idx) => (
            <div key={idx} className="festival-card glass-panel">
              <div className="fest-header">
                <span className="fest-date">{fest.date}</span>
                <span className="fest-type">{fest.type}</span>
              </div>
              <h3 className="fest-title">{fest.title}</h3>
              <p className="fest-rules"><strong>📜 Fasting Guideline:</strong> {fest.rules}</p>
              <p className="fest-blessing"><strong>✨ Spiritual Blessing:</strong> {fest.blessing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
