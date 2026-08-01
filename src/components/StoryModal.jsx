import React from 'react';
import './StoryModal.css';

export default function StoryModal({ item, onClose, onSelectForChanting }) {
  if (!item) return null;

  return (
    <div className="story-modal-overlay divineReveal">
      <div className="story-modal-content glass-panel">
        <button className="story-close-btn" onClick={onClose} aria-label="Close">×</button>

        <div className="story-modal-header">
          <div className="story-deity-avatar">
            <img src={item.image} alt={item.title} className="story-deity-img" />
          </div>
          <span className="story-tag">{item.tag}</span>
          <h2 className="story-title shimmer-text">{item.title}</h2>
          <h3 className="story-subtitle">{item.subtitle}</h3>
        </div>

        {item.shloka && (
          <div className="story-shloka-box">
            <p className="story-shloka">{item.shloka}</p>
          </div>
        )}

        <div className="story-body">
          <h4 className="story-section-heading">📜 Divine Katha (The Story)</h4>
          <p className="story-narrative">{item.story || item.description}</p>

          {item.strategy && (
            <div className="story-strategy-box">
              <h4 className="story-strategy-heading">💡 Spiritual Strategy for Life</h4>
              <p className="story-strategy-text">{item.strategy}</p>
            </div>
          )}
        </div>

        <div className="story-modal-footer">
          <button 
            className="story-chant-btn"
            onClick={() => {
              onSelectForChanting(item);
              onClose();
            }}
          >
            📿 Begin 108 Japa Chanting with this Form &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
