import React, { useMemo } from 'react';
import './ParticleField.css';

const colorMap = {
  gold: [255, 215, 0],
  saffron: [255, 107, 0],
  blue: [95, 168, 211],
};

export default function ParticleField({ intensity = 0.5, color = 'gold' }) {
  const [r, g, b] = colorMap[color] || colorMap.gold;

  const particles = useMemo(() => {
    const count = Math.floor(20 + intensity * 20);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      baseOpacity: 0.15 + Math.random() * 0.45,
    }));
  }, [intensity]);

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.baseOpacity * intensity,
            background: `radial-gradient(circle, rgba(${r},${g},${b},0.9) 0%, rgba(${r},${g},${b},0) 70%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(${r},${g},${b},${0.3 * intensity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
