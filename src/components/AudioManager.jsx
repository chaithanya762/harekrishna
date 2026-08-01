import React, { useState } from 'react';
import { useSound } from '../hooks/useSound';
import './AudioManager.css';

export default function AudioManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOmPlaying, setIsOmPlaying] = useState(false);

  const { 
    playBell, 
    startAmbient, 
    stopAmbient,
    getAudioContext 
  } = useSound();

  const toggleOm = () => {
    getAudioContext();
    if (isOmPlaying) {
      stopAmbient();
      setIsOmPlaying(false);
    } else {
      startAmbient();
      setIsOmPlaying(true);
    }
  };

  return (
    <div className="audio-manager-container">
      {/* Floating Action Button */}
      <button 
        className={`audio-fab ${isOmPlaying ? 'playing' : ''}`}
        onClick={() => { getAudioContext(); setIsOpen(!isOpen); }}
        title="Sacred Om Meditation Controls"
      >
        🕉️
      </button>

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="audio-panel glass-panel divine-reveal">
          <div className="audio-panel-header">
            <h4 className="audio-panel-title">🕉️ Sacred Om Sound Controls</h4>
            <button className="audio-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="audio-control-group">
            <div className="audio-row">
              <span className="audio-label">🕉️ Om Meditation Drone (136.1 Hz)</span>
              <button 
                className={`audio-toggle-btn ${isOmPlaying ? 'active' : ''}`}
                onClick={toggleOm}
              >
                {isOmPlaying ? 'Om Playing 🕉️ (Tap to Stop)' : 'Start Sacred Om 🕉️'}
              </button>
            </div>

            <div className="audio-row">
              <span className="audio-label">🔔 Ring Temple Bell</span>
              <button className="audio-toggle-btn bell-btn" onClick={() => { getAudioContext(); playBell(); }}>
                Ring Chime 🔔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
