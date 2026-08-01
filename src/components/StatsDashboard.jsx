import React, { useState, useEffect } from 'react';
import { getStats, resetAllData } from '../utils/storage';
import './StatsDashboard.css';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1500; // 1.5 seconds

    const easeOutQuad = (t) => t * (2 - t);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(easeOutQuad(percent) * value);
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{count}</>;
};

const StatsDashboard = ({ onBack }) => {
  const [stats, setStats] = useState({
    todayCount: 0,
    lifetimeCount: 0,
    totalSessions: 0,
    currentStreak: 0,
    lastChantDate: ''
  });

  useEffect(() => {
    setStats(getStats());
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your divine chanting progress? This cannot be undone.')) {
      resetAllData();
      setStats(getStats());
    }
  };

  return (
    <div className="stats-dashboard">
      <div className="stats-header">
        <h1 className="stats-title">Your Sacred Journey</h1>
        <p className="stats-subtitle">Every chant brings you closer to the Divine</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🕉️</div>
          <div className="stat-value">
            <AnimatedCounter value={stats.todayCount} />
          </div>
          <div className="stat-label">Today's Mantras</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📿</div>
          <div className="stat-value">
            <AnimatedCounter value={stats.lifetimeCount} />
          </div>
          <div className="stat-label">Lifetime Mantras</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🙏</div>
          <div className="stat-value">
            <AnimatedCounter value={stats.totalSessions} />
          </div>
          <div className="stat-label">Sessions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">
            <AnimatedCounter value={stats.currentStreak} />
          </div>
          <div className="stat-label">Streak Days</div>
        </div>
      </div>

      <div className="stats-actions">
        <button className="btn-back" onClick={onBack}>Back to Home</button>
        <button className="btn-reset" onClick={handleReset}>Reset All Data</button>
      </div>
    </div>
  );
};

export default StatsDashboard;
