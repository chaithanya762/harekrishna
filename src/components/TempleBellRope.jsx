import React, { useState } from 'react';
import { useSound } from '../hooks/useSound';
import './TempleBellRope.css';

export default function TempleBellRope() {
  const [isRinging, setIsRinging] = useState(false);
  const { playBell, getAudioContext } = useSound();

  const handleRing = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    playBell(0.6); // Ring resonant brass temple bell chime
    setIsRinging(true);

    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    setTimeout(() => {
      setIsRinging(false);
    }, 1200);
  };

  return (
    <div 
      className="temple-bell-rope-container" 
      onPointerDown={handleRing} 
      onClick={handleRing}
      title="Pull Brass Temple Bell Rope for Chime 🔔"
    >
      <div className={`bell-rope-wrapper ${isRinging ? 'ringing' : ''}`}>
        {/* Brass Ring Hook */}
        <div className="bell-ceiling-ring"></div>
        {/* Woven Rope */}
        <div className="bell-rope-line"></div>
        {/* Heavy Brass Temple Bell */}
        <div className="brass-bell-head">
          <span className="bell-emoji">🔔</span>
          <div className="bell-clapper"></div>
        </div>
        {/* Pull Tassel */}
        <div className="bell-tassel">
          <span className="tassel-text">PULL BELL 🔔</span>
        </div>
      </div>
    </div>
  );
}
