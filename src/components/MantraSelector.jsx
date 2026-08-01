import React from 'react';
import './MantraSelector.css';

const MantraSelector = ({ onSelect, onBack }) => {
  const mantras = [
    {
      id: 'panchatatva',
      title: 'Panchatatva Mantra',
      subtitle: 'Sri Chaitanya Mahaprabhu',
      description: 'Chanted first to invoke Sri Chaitanya Mahaprabhu & seek divine mercy',
      image: '/assets/chaitanya.jpg',
      icon: '🪷',
      lines: [
        'Sri Krishna Chaitanya',
        'Prabhu Nityananda',
        'Sri Advaita Gadadhara',
        'Srivasadi Gaura Bhakta Vrinda'
      ]
    },
    {
      id: 'jagannath',
      title: 'Sri Jagannath Swamy Shloka',
      subtitle: 'Sri Puri Jagannath Dham',
      description: 'The sacred Puri temple shloka of Lord Jagannath, Balabhadra & Subhadra',
      image: '/assets/jagannath.jpg',
      icon: '🚩',
      lines: [
        'Nilachala Nivasaya Nityaya Paramatmane',
        'Balabhadra Subhadrabhyam',
        'Jagannathaya Te Namah',
        'Jai Jagannath Purushottama'
      ]
    },
    {
      id: 'mahamantra',
      title: 'Hare Krishna Mahamantra',
      subtitle: 'Sri Krishna Parabrahma',
      description: 'The supreme 16-word Mahamantra for soul deliverance & supreme bliss',
      image: '/assets/krishna.jpg',
      icon: '🪶',
      lines: [
        'Hare Krishna Hare Krishna',
        'Krishna Krishna Hare Hare',
        'Hare Rama Hare Rama',
        'Rama Rama Hare Hare'
      ]
    }
  ];

  return (
    <div className="mantra-selector-container divine-reveal">
      <button className="ms-btn-back" onClick={onBack}>
        ← Back to Divine Guidance
      </button>

      <div className="ms-header-title">
        <h1 className="shimmer-text">Select Sacred Mantra</h1>
        <p className="ms-subtitle">Panchatatva Mahaprabhu is offered first, followed by Jagannath Shloka & Mahamantra</p>
      </div>

      <div className="mantra-cards">
        {mantras.map((mantra, index) => (
          <div 
            key={mantra.id} 
            className="mantra-card glass-panel" 
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelect(mantra.id)}
          >
            {/* Unobscured God Portrait Section */}
            <div className="mantra-deity-header">
              <div className="mantra-deity-avatar-ring">
                <img 
                  src={mantra.image} 
                  alt={mantra.subtitle} 
                  className="mantra-deity-portrait"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="mantra-deity-tag">{mantra.icon} {mantra.subtitle}</div>
            </div>

            <div className="mantra-card-content">
              <h2 className="mantra-card-title">{mantra.title}</h2>
              <p className="mantra-card-desc">{mantra.description}</p>
              
              <div className="mantra-preview-box">
                {mantra.lines.map((line, i) => (
                  <div key={i} className="mantra-preview-line">{line}</div>
                ))}
              </div>

              <button className="select-mantra-btn">
                Select Mantra &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MantraSelector;
