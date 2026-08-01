import React, { useState, useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import './AudioManager.css';

export default function AudioManager({ currentStep }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isKirtanPlaying, setIsKirtanPlaying] = useState(true); // Enabled by default for ISKCON background kirtan
  const [isOmPlaying, setIsOmPlaying] = useState(false);

  const { 
    playBell, 
    startSweetKirtanSong, 
    stopSweetKirtanSong, 
    startAmbient, 
    stopAmbient,
    getAudioContext 
  } = useSound();

  // Auto-play ISKCON Hare Krishna song on home/altar pages, stop during active Japa chanting
  useEffect(() => {
    if (currentStep !== 'chanting' && isKirtanPlaying) {
      const timer = setTimeout(() => {
        getAudioContext();
        startSweetKirtanSong();
      }, 500);
      return () => {
        clearTimeout(timer);
        stopSweetKirtanSong();
      };
    } else {
      stopSweetKirtanSong();
    }
  }, [currentStep, isKirtanPlaying, startSweetKirtanSong, stopSweetKirtanSong, getAudioContext]);

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
        onClick={() => { getAudioContext(); setIsOpen(!isOpen); }}
        title="Divine Background Kirtan Controls"
      >
        {isKirtanPlaying ? '🎵' : '📿'}
      </button>

      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="audio-panel glass-panel divine-reveal">
          <div className="audio-panel-header">
            <h4 className="audio-panel-title">🎵 ISKCON Kirtan Controls</h4>
            <button className="audio-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="audio-control-group">
            <div className="audio-row">
              <span className="audio-label">🎵 Authentic ISKCON Mahamantra Tune</span>
              <button 
                className={`audio-toggle-btn ${isKirtanPlaying ? 'active' : ''}`}
                onClick={toggleKirtan}
              >
                {isKirtanPlaying ? 'Playing 🎵 (Tap to Pause)' : 'Play ISKCON Kirtan 🎶'}
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
