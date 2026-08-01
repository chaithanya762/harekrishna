import React, { useState, useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import './AudioManager.css';

export default function AudioManager({ currentStep }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isKirtanPlaying, setIsKirtanPlaying] = useState(false);
  const [isOmPlaying, setIsOmPlaying] = useState(false);

  const { 
    playBell, 
    startSweetKirtanSong, 
    stopSweetKirtanSong, 
    startAmbient, 
    stopAmbient,
    getAudioContext 
  } = useSound();

  // Auto-play / stop management based on current step
  const toggleKirtan = () => {
    getAudioContext();
    if (isKirtanPlaying) {
      stopSweetKirtanSong();
      setIsKirtanPlaying(false);
    } else {
      startSweetKirtanSong();
      setIsKirtanPlaying(true);
    }
  };

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
        className={`audio-fab ${isKirtanPlaying || isOmPlaying ? 'playing' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Divine Background Music Controls"
      >
        {isKirtanPlaying ? '🎶' : '🪈'}
      </button>

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="audio-panel glass-panel divine-reveal">
          <div className="audio-panel-header">
            <h4 className="audio-panel-title">🎶 Sacred Music Controls</h4>
            <button className="audio-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="audio-control-group">
            <div className="audio-row">
              <span className="audio-label">🪈 Vrindavan Hare Krishna Flute</span>
              <button 
                className={`audio-toggle-btn ${isKirtanPlaying ? 'active' : ''}`}
                onClick={toggleKirtan}
              >
                {isKirtanPlaying ? 'Pause ⏸️' : 'Play 🎶'}
              </button>
            </div>

            <div className="audio-row">
              <span className="audio-label">🕉️ Om Meditation Drone</span>
              <button 
                className={`audio-toggle-btn ${isOmPlaying ? 'active' : ''}`}
                onClick={toggleOm}
              >
                {isOmPlaying ? 'Stop ⏹️' : 'Start 🕉️'}
              </button>
            </div>

            <div className="audio-row">
              <span className="audio-label">🔔 Test Temple Bell</span>
              <button className="audio-toggle-btn bell-btn" onClick={() => { getAudioContext(); playBell(); }}>
                Ring 🔔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
