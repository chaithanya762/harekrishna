import React, { useState } from 'react';
import { ISKCON_CALENDAR_2026, getNextUpcomingEvents } from '../utils/calendar';
import './FestivalCalendarModal.css';

export default function FestivalCalendarModal({ onClose }) {
  const [filter, setFilter] = useState('upcoming');
  const todayIso = new Date().toISOString().split('T')[0];

  const filteredList = ISKCON_CALENDAR_2026.filter((item) => {
    if (filter === 'upcoming') return item.isoDate >= todayIso;
    if (filter === 'ekadashi') return item.type.includes('Ekadashi');
    if (filter === 'festival') return !item.type.includes('Ekadashi');
    return true;
  });

  return (
    <div className="festival-modal-overlay divine-reveal" onClick={onClose}>
      <div className="festival-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="festival-close-btn" onClick={onClose} aria-label="Close">×</button>
        
        <div className="festival-modal-header text-center">
          <span className="festival-badge">📅 OFFICIAL 2026 ISKCON VAISNAVA PANCHANGA 🚩</span>
          <h2 className="shimmer-text festival-title">2026 Ekadashis & Vrindavan Festivals</h2>
          <p className="festival-subtitle">Fasting dates & sacred observances from Sri Mayapur & Vrindavan Dham</p>

          <div className="calendar-filter-bar">
            <button 
              className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`} 
              onClick={() => setFilter('upcoming')}
            >
              ⏳ Upcoming From Today
            </button>
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              All 2026 Events ({ISKCON_CALENDAR_2026.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'ekadashi' ? 'active' : ''}`} 
              onClick={() => setFilter('ekadashi')}
            >
              🚩 Ekadashis Only
            </button>
            <button 
              className={`filter-tab ${filter === 'festival' ? 'active' : ''}`} 
              onClick={() => setFilter('festival')}
            >
              🪷 Major Festivals Only
            </button>
          </div>
        </div>

        <div className="festivals-list">
          {filteredList.map((fest, idx) => (
            <div key={idx} className={`festival-card glass-panel ${fest.isoDate >= todayIso ? 'is-upcoming-card' : ''}`}>
              <div className="fest-header">
                <span className="fest-date">📅 {fest.dateStr}</span>
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
