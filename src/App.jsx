import React, { useState } from 'react';
import TempleBackground from './components/TempleBackground';
import ParticleField from './components/ParticleField';
import TempleBellRope from './components/TempleBellRope';
import MoodSelector from './components/MoodSelector';
import DivineMessage from './components/DivineMessage';
import MantraSelector from './components/MantraSelector';
import ChantingSession from './components/ChantingSession';
import StatsDashboard from './components/StatsDashboard';
import LeelaGallery from './components/LeelaGallery';
import AudioManager from './components/AudioManager';
import Footer from './components/Footer';
import { recordSession } from './utils/storage';
import './App.css';

// Steps: 'mood' | 'message' | 'mantra' | 'chanting' | 'stats' | 'leelas'
export default function App() {
  const [currentStep, setCurrentStep] = useState('mood');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedRounds, setSelectedRounds] = useState(27);
  const [selectedMantra, setSelectedMantra] = useState('panchatatva');
  const [selectedLeela, setSelectedLeela] = useState(null);
  const [glowIntensity, setGlowIntensity] = useState(0.25);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setCurrentStep('message');
    setGlowIntensity(0.5);
  };

  const handleMessageProceed = (rounds) => {
    setSelectedRounds(rounds);
    setCurrentStep('mantra');
    setGlowIntensity(0.7);
  };

  const handleMantraSelect = (mantraId) => {
    setSelectedMantra(mantraId);
    setCurrentStep('chanting');
    setGlowIntensity(0.9);
  };

  const handleLeelaSelect = (leelaObj) => {
    setSelectedLeela(leelaObj);
    setCurrentStep('chanting');
    setGlowIntensity(0.95);
  };

  const handleSessionComplete = () => {
    recordSession(selectedRounds * 108);
    setCurrentStep('stats');
    setGlowIntensity(0.6);
  };

  const handleBackToHome = () => {
    setCurrentStep('mood');
    setSelectedMood(null);
    setSelectedLeela(null);
    setGlowIntensity(0.25);
  };

  const isAltarActive = currentStep === 'mood' || currentStep === 'message' || currentStep === 'mantra';
  const isLeelasActive = currentStep === 'leelas';
  const isStatsActive = currentStep === 'stats';

  return (
    <div className="app-container">
      <TempleBackground glowIntensity={glowIntensity} />
      <ParticleField intensity={glowIntensity} color={selectedMood === 'lost' ? 'saffron' : 'gold'} />

      {/* Hanging Brass Temple Bell Rope on Home Altar */}
      {currentStep !== 'chanting' && <TempleBellRope />}

      {/* Sticky Top Navigation Bar */}
      {currentStep !== 'chanting' && (
        <header className="top-navigation-bar">
          <div className="nav-container">
            <button 
              className={`nav-btn ${isAltarActive ? 'active' : ''}`} 
              onClick={handleBackToHome} 
              title="Home Altar"
            >
              <span className="nav-icon">🕉️</span>
              <span className="nav-text">Altar</span>
            </button>
            <button 
              className={`nav-btn ${isLeelasActive ? 'active' : ''}`} 
              onClick={() => setCurrentStep('leelas')} 
              title="Sri Krishna Leelas & Avatars"
            >
              <span className="nav-icon">🪷</span>
              <span className="nav-text">Leelas & Avatars</span>
            </button>
            <button 
              className={`nav-btn ${isStatsActive ? 'active' : ''}`} 
              onClick={() => setCurrentStep('stats')} 
              title="Sacred Stats"
            >
              <span className="nav-icon">📿</span>
              <span className="nav-text">Stats</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Screen Stream */}
      <main className="main-content">
        {currentStep === 'mood' && (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        )}

        {currentStep === 'message' && (
          <DivineMessage 
            mood={selectedMood} 
            onProceed={handleMessageProceed} 
          />
        )}

        {currentStep === 'mantra' && (
          <MantraSelector 
            onSelect={handleMantraSelect} 
            onBack={() => setCurrentStep('message')} 
          />
        )}

        {currentStep === 'leelas' && (
          <LeelaGallery 
            onSelectLeela={handleLeelaSelect} 
            onBack={handleBackToHome} 
          />
        )}

        {currentStep === 'chanting' && (
          <ChantingSession
            mantra={selectedMantra}
            totalRounds={selectedRounds}
            customDeityImage={selectedLeela?.image}
            customDeityTitle={selectedLeela?.title}
            customMantraLines={selectedLeela?.mantraLines}
            onComplete={handleSessionComplete}
            onBack={handleBackToHome}
          />
        )}

        {currentStep === 'stats' && (
          <StatsDashboard onBack={handleBackToHome} />
        )}
      </main>

      <AudioManager currentStep={currentStep} />

      {/* Footer is strictly rendered ONLY when scrolling non-chanting screens */}
      {currentStep !== 'chanting' && <Footer />}
    </div>
  );
}
