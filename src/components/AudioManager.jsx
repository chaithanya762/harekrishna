import React, { useState, useEffect } from 'react';
import { useSound } from '../hooks/useSound';
import './AudioManager.css';

export default function AudioManager() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fluteEnabled, setFluteEnabled] = useState(true);
  const [bellsEnabled, setBellsEnabled] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [ambientVolume, setAmbientVolumeState] = useState(0.2);

  const { playFlute, playBell, playTap, startAmbient, stopAmbient, setAmbientVolume } = useSound();

  useEffect(() => {
    if (ambientEnabled) {
      startAmbient(ambientVolume);
    } else {
      stopAmbient();
    }
  }, [ambientEnabled, startAmbient, stopAmbient]);

  useEffect(() => {
    if (ambientEnabled) {
      setAmbientVolume(ambientVolume);
    }
  }, [ambientVolume, ambientEnabled, setAmbientVolume]);

  const handleToggle = () => {
    playTap();
    setIsExpanded(!isExpanded);
  };

  const handleFluteToggle = () => {
    playTap();
    const newState = !fluteEnabled;
    setFluteEnabled(newState);
    if (newState) {
      playFlute(0.35);
    }
  };

  const handleBellsToggle = () => {
    playTap();
    const newState = !bellsEnabled;
    setBellsEnabled(newState);
    if (newState) {
      playBell(0.3);
    }
  };

  const handleAmbientToggle = () => {
    playTap();
    setAmbientEnabled(!ambientEnabled);
  };

  return (
    <div className={`audio-manager ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button className="audio-toggle-btn" onClick={handleToggle} aria-label="Audio settings">
          🎶
        </button>
      ) : (
        <div className="audio-panel glass-panel">
          <div className="audio-panel-header">
            <h4>🎶 Vrindavan Soundscape</h4>
            <button className="close-btn" onClick={handleToggle} aria-label="Close">
              ×
            </button>
          </div>
          
          {/* Flute */}
          <div className="audio-control">
            <div className="audio-control-header">
              <label>🪈 Vrindavan Flute</label>
              <button 
                className={`switch ${fluteEnabled ? 'on' : 'off'}`} 
                onClick={handleFluteToggle}
              >
                <div className="switch-thumb" />
              </button>
            </div>
          </div>

          {/* Bells */}
          <div className="audio-control">
            <div className="audio-control-header">
              <label>🔔 Temple Bells</label>
              <button 
                className={`switch ${bellsEnabled ? 'on' : 'off'}`} 
                onClick={handleBellsToggle}
              >
                <div className="switch-thumb" />
              </button>
            </div>
          </div>

          {/* Ambient Drone */}
          <div className="audio-control">
            <div className="audio-control-header">
              <label>🕉️ Celestial Om Drone</label>
              <button 
                className={`switch ${ambientEnabled ? 'on' : 'off'}`} 
                onClick={handleAmbientToggle}
              >
                <div className="switch-thumb" />
              </button>
            </div>
            {ambientEnabled && (
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={ambientVolume}
                onChange={(e) => setAmbientVolumeState(parseFloat(e.target.value))}
                className="gold-range"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
