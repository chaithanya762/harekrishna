import React, { useState, useEffect, useCallback } from 'react';
import { useSound } from '../hooks/useSound';
import './ChantingSession.css';

const defaultMantras = {
  panchatatva: {
    title: 'Panchatatva Mantra',
    defaultDeityImage: '/assets/chaitanya.jpg',
    lines: [
      'Sri Krishna Chaitanya',
      'Prabhu Nityananda',
      'Sri Advaita Gadadhara',
      'Srivasadi Gaura Bhakta Vrinda',
    ]
  },
  jagannath: {
    title: 'Sri Jagannath Swamy Shloka',
    defaultDeityImage: '/assets/jagannath.jpg',
    lines: [
      'Nilachala Nivasaya Nityaya Paramatmane',
      'Balabhadra Subhadrabhyam',
      'Jagannathaya Te Namah',
      'Jai Jagannath Purushottama',
    ]
  },
  mahamantra: {
    title: 'Hare Krishna Mahamantra',
    defaultDeityImage: '/assets/krishna.jpg',
    lines: [
      'Hare Krishna Hare Krishna',
      'Krishna Krishna Hare Hare',
      'Hare Rama Hare Rama',
      'Rama Rama Hare Hare',
    ]
  },
};

const ChantingSession = ({ 
  mantra = 'panchatatva', 
  totalRounds = 1, 
  customDeityImage = null,
  customDeityTitle = null,
  customMantraLines = null,
  onComplete, 
  onBack 
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [pulseLevel, setPulseLevel] = useState(0);

  const { playFlute, playBell } = useSound();

  const selectedMantraData = defaultMantras[mantra] || defaultMantras.panchatatva;
  const mantraLines = customMantraLines || selectedMantraData.lines;
  const deityImage = customDeityImage || selectedMantraData.defaultDeityImage;
  const deityTitle = customDeityTitle || selectedMantraData.title;
  
  const activeLineIndex = Math.floor(currentCount % (mantraLines.length || 1));
  const glowIntensity = currentCount / 108;

  const handleChant = useCallback(() => {
    if (isPaused || isComplete) return;

    if (Math.random() > 0.4) {
      playFlute(0.3);
    } else {
      playBell(0.25);
    }

    setCurrentCount((prev) => {
      const next = prev + 1;
      
      if (next % 27 === 0 && next !== 108) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 500);
        playBell(0.4);
      }
      if (next % 10 === 0) {
        setPulseLevel(Date.now());
      }

      if (next === 108) {
        playBell(0.5);
        setTimeout(() => {
          if (currentRound < totalRounds) {
            setCurrentCount(0);
            setCurrentRound(r => r + 1);
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 500);
          } else {
            setIsComplete(true);
          }
        }, 800);
        return 108;
      }
      return next;
    });
  }, [isPaused, isComplete, currentRound, totalRounds, playFlute, playBell]);

  const togglePause = useCallback(() => {
    if (!isComplete) setIsPaused((p) => !p);
  }, [isComplete]);

  const handleBack = useCallback(() => {
    if (window.confirm('Are you sure you want to end this sacred session?')) {
      onBack();
    }
  }, [onBack]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleChant();
      } else if (e.code === 'Escape') {
        togglePause();
      } else if (e.code === 'Backspace') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleChant, togglePause, handleBack]);

  const renderBeads = () => {
    const beads = [];
    const cx = 150;
    const cy = 150;
    const r = 132;

    for (let i = 0; i < 108; i++) {
      const angle = (i / 108) * 2 * Math.PI - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const isFilled = i < currentCount;
      const isMilestone = (i + 1) % 27 === 0;
      const isLatest = i === currentCount - 1;

      beads.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={isMilestone ? 7 : 5}
          className={`bead ${isFilled ? 'filled' : ''} ${isMilestone ? 'milestone' : ''} ${isLatest ? 'latest' : ''}`}
        />
      );
    }
    return beads;
  };

  if (isComplete) {
    return (
      <div className="chanting-session completion-screen divine-reveal">
        <div className="completion-burst glass-panel">
          <div className="completion-deity-avatar">
            <img src={deityImage} alt="Divine Blessing" className="completion-deity-img" />
          </div>
          <h1 className="shimmer-text">Jai {deityTitle}!</h1>
          <p className="completion-text">You have completed {totalRounds} rounds of 108 Japa chanting</p>
          <div className="stats-box">
            <p>Total Sacred Repetitions</p>
            <h2 className="stats-number">{totalRounds * 108}</h2>
          </div>
          <p className="blessing-text">May the divine grace of {deityTitle} protect and illuminate your soul forever.</p>
          <div className="completion-actions">
            <button className="primary-btn" onClick={onComplete}>Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`chanting-session ${showFlash ? 'flash-active' : ''}`}
      style={{ '--glow-intensity': glowIntensity }}
      key={pulseLevel}
    >
      <div className="bg-glow"></div>
      <div className="rath-yatra-pattern"></div>

      <header className="session-header">
        <button className="icon-btn" onClick={handleBack} title="Back (Backspace)">
          ←
        </button>
        <div className="round-info">Round {currentRound} of {totalRounds}</div>
        <button className="icon-btn" onClick={togglePause} title="Pause (Esc)">
          {isPaused ? '▶' : '⏸'}
        </button>
      </header>

      <main className="session-main">
        <div className="mantra-display">
          {isPaused ? (
            <p className="paused-text">Take a moment... rest in His divine presence.</p>
          ) : (
            mantraLines.map((line, index) => (
              <div 
                key={index} 
                className={`mantra-line ${index === activeLineIndex ? 'active' : ''}`}
              >
                {line}
              </div>
            ))
          )}
        </div>

        <div className="bead-counter-container">
          <svg className="bead-circle" viewBox="0 0 300 300">
            {renderBeads()}
          </svg>

          {/* Central Royal Deity Image inside the 108 Bead Ring */}
          <div className="central-deity-frame">
            <img 
              src={deityImage} 
              alt={deityTitle} 
              className="central-deity-img"
              style={{ filter: `brightness(${0.88 + glowIntensity * 0.3}) contrast(1.1)` }} 
            />
            <div className="deity-aura-ring" style={{ opacity: 0.3 + glowIntensity * 0.7 }} />
          </div>

          <div className="count-display">
            <div className="current-count">{currentCount}</div>
            <div className="total-count">of 108</div>
          </div>
        </div>

        <button 
          className="chant-button" 
          onClick={handleChant}
          disabled={isPaused}
          title="Chant (Space/Enter)"
        >
          <span className="om-symbol">ॐ</span>
          <span className="chant-btn-sub">CHANT</span>
        </button>
      </main>

      {isPaused && (
        <div className="pause-overlay">
          <h2>Session Paused</h2>
          <button className="primary-btn resume-btn" onClick={togglePause}>
            Resume Chanting
          </button>
        </div>
      )}
    </div>
  );
};

export default ChantingSession;
