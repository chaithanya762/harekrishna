import React from 'react';
import './TempleBackground.css';

export default function TempleBackground({ glowIntensity = 0 }) {
  return (
    <div className="temple-background">
      <div className="base-gradient" />
      <div className="rath-yatra-layer" />
      
      <div className="smoke-layer">
        <div className="smoke smoke-1" />
        <div className="smoke smoke-2" />
        <div className="smoke smoke-3" />
      </div>

      <div className="light-rays">
        <div className="ray ray-1" style={{ opacity: 0.05 + glowIntensity * 0.1 }} />
        <div className="ray ray-2" style={{ opacity: 0.05 + glowIntensity * 0.1 }} />
        <div className="ray ray-3" style={{ opacity: 0.05 + glowIntensity * 0.1 }} />
      </div>

      <div 
        className="glow-overlay"
        style={{ 
          background: `radial-gradient(ellipse at center, rgba(255, 215, 0, ${glowIntensity * 0.08}) 0%, transparent 70%)` 
        }}
      />
      
      <div className="vignette" />
    </div>
  );
}
