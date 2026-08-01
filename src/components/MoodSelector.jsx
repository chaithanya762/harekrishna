import React, { useState } from 'react';
import FestivalCalendarModal from './FestivalCalendarModal';
import { useSound } from '../hooks/useSound';
import './MoodSelector.css';

const moods = [
  { id: 'sad', emoji: '🙏', label: 'Heavy Heart', desc: 'Carrying weight of sorrow' },
  { id: 'anxious', emoji: '🌊', label: 'Restless Mind', desc: 'Waves of worry within' },
  { id: 'peaceful', emoji: '🕊️', label: 'Inner Peace', desc: 'Seeking to deepen calm' },
  { id: 'lost', emoji: '🔥', label: 'Seeking Direction', desc: 'The soul searches for light' }
];

const SANKALPA_OPTIONS = [
  '🕊️ World Peace & Universal Harmony',
  '🧘 Inner Calm & Mindful Focus',
  '🪷 Unconditional Devotion to Sri Krishna',
  '💖 Healing & Blessing for Loved Ones',
  '✨ Liberation & Freedom from Past Karma'
];

export default function MoodSelector({ onMoodSelect }) {
  const [clickedId, setClickedId] = useState(null);
  const [lotusFlowers, setLotusFlowers] = useState([]);
  const [tulsiLeaves, setTulsiLeaves] = useState([]);
  const [offeringText, setOfferingText] = useState('');
  const [isGrandDiyaLit, setIsGrandDiyaLit] = useState(false);
  const [showFestivalModal, setShowFestivalModal] = useState(false);
  const [sankalpaVow, setSankalpaVow] = useState(SANKALPA_OPTIONS[2]);
  const [customSankalpa, setCustomSankalpa] = useState('');

  const { playBell, getAudioContext } = useSound();

  const handleClick = (id) => {
    setClickedId(id);
    setTimeout(() => {
      onMoodSelect(id);
    }, 600);
  };

  // 🌺 Virtual Pushpanjali (Lotus Flower Offering)
  const handleOfferFlowers = () => {
    getAudioContext();
    playBell(0.3);
    const newFlowers = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 0.4
    }));

    setLotusFlowers(newFlowers);
    setOfferingText('🌺 Pushpanjali Offered to the Lotus Feet of the Lord! 🌺');

    setTimeout(() => {
      setLotusFlowers([]);
      setOfferingText('');
    }, 2800);
  };

  // 🌿 Tulsi Maharani Leaves Offering
  const handleOfferTulsi = () => {
    getAudioContext();
    playBell(0.4);
    const newTulsi = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 0.3
    }));

    setTulsiLeaves(newTulsi);
    setOfferingText('🌿 Sacred Tulsi Leaves Offered to Sri Krishna & Tulsi Maharani! 🌿');

    setTimeout(() => {
      setTulsiLeaves([]);
      setOfferingText('');
    }, 2800);
  };

  // 🪔 Light Grand Divine Diya (Deepam)
  const handleToggleGrandDiya = () => {
    getAudioContext();
    playBell(0.6);
    const nextState = !isGrandDiyaLit;
    setIsGrandDiyaLit(nextState);

    if (nextState) {
      setOfferingText('🪔 Grand Divine Diya Lit at the Sacred Feet of the Deities! 🪔');
    } else {
      setOfferingText('🪔 Grand Diya Extinguished');
    }

    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    setTimeout(() => {
      setOfferingText('');
    }, 3000);
  };

  return (
    <div className="mood-selector-container divine-reveal">
      {/* Floating Flowers Layer */}
      {lotusFlowers.length > 0 && (
        <div className="lotus-shower-container">
          {lotusFlowers.map((f) => (
            <span key={f.id} className="falling-lotus" style={{ left: `${f.left}%`, animationDelay: `${f.delay}s` }}>
              🌺
            </span>
          ))}
        </div>
      )}

      {/* Floating Tulsi Leaves Layer */}
      {tulsiLeaves.length > 0 && (
        <div className="tulsi-shower-container">
          {tulsiLeaves.map((t) => (
            <span key={t.id} className="falling-tulsi" style={{ left: `${t.left}%`, animationDelay: `${t.delay}s` }}>
              🌿
            </span>
          ))}
        </div>
      )}

      {/* Upcoming Ekadashi & Festival Calendar Badge */}
      <div className="festival-header-badge" onClick={() => setShowFestivalModal(true)} title="View Upcoming Ekadashi Fasting Dates & Festivals">
        <span className="fhb-icon">🚩</span>
        <span className="fhb-text">Upcoming: <strong>Kamada Ekadashi Fasting</strong> & <strong>Puri Ratha Yatra</strong> &rarr;</span>
      </div>

      {/* Royal Temple Altar Shrine Banner featuring 3 Deities + Tulsi Maharani Vrindavan Shrine */}
      <div className={`royal-shrine-banner glass-panel ${isGrandDiyaLit ? 'diya-illuminated' : ''}`}>
        <div className="shrine-deities-grid">
          <div className="deity-frame">
            <img src="/assets/jagannath.jpg" alt="Puri Jagannath Swamy" className="deity-img" />
            <span className="deity-label">Sri Jagannath Dham</span>
          </div>
          <div className="deity-frame">
            <img src="/assets/chaitanya.jpg" alt="Sri Chaitanya Mahaprabhu" className="deity-img" />
            <span className="deity-label">Chaitanya Mahaprabhu</span>
          </div>
          <div className="deity-frame">
            <img src="/assets/krishna.jpg" alt="Royal Sri Krishna" className="deity-img" />
            <span className="deity-label">Sri Krishna Bhagavan</span>
          </div>

          {/* 🪴 Established Sacred Tulsi Maharani Vrinda Devi Shrine */}
          <div className="deity-frame tulsi-shrine-frame" title="Srimati Tulsi Maharani Vrinda Devi">
            <img src="/assets/tulsi_maharani.svg" alt="Srimati Tulsi Maharani Vrinda Devi" className="deity-img tulsi-deity-img" />
            <span className="deity-label tulsi-label">🌿 Tulsi Maharani</span>
          </div>
        </div>

        {/* Grand Golden Brass Diya Display at Altar Center */}
        {isGrandDiyaLit && (
          <div className="grand-diya-display divine-reveal">
            <div className="grand-diya-flames">
              <span className="diya-wick">🔥</span>
              <span className="diya-wick main-wick">🪔</span>
              <span className="diya-wick">🔥</span>
            </div>
            <div className="grand-diya-aura-glow"></div>
            <span className="grand-diya-caption">✨ Sacred Deepam Glowing at the Altar ✨</span>
          </div>
        )}

        {/* Shrine Pooja Action Buttons */}
        <div className="shrine-action-area">
          <div className="pooja-btn-row">
            <button 
              className={`pooja-btn grand-diya-btn ${isGrandDiyaLit ? 'lit' : ''}`} 
              onClick={handleToggleGrandDiya} 
              title="Light the Grand Golden Brass Diya at the Altar"
            >
              {isGrandDiyaLit ? '🪔 Grand Diya Lit ✨' : '🪔 Light Grand Divine Diya'}
            </button>
            <button className="pooja-btn tulsi-btn" onClick={handleOfferTulsi} title="Offer Sacred Tulsi Leaves to Sri Krishna">
              🌿 Offer Tulsi Leaves
            </button>
            <button className="pooja-btn lotus-btn" onClick={handleOfferFlowers} title="Offer Pink Lotus Flowers">
              🌺 Offer Lotus Flowers
            </button>
          </div>

          {offeringText && <p className="offering-msg divine-reveal">{offeringText}</p>}
        </div>
      </div>

      {/* Daily Spiritual Sankalpa / Intention Setting Box */}
      <div className="sankalpa-card glass-panel">
        <div className="sankalpa-badge">📜 DAILY SACRED SANKALPA (SPIRITUAL INTENTION)</div>
        <p className="sankalpa-prompt">Dedicate today's chanting to a divine vow:</p>

        <div className="sankalpa-options">
          {SANKALPA_OPTIONS.map((opt, i) => (
            <button 
              key={i} 
              className={`sankalpa-opt-btn ${sankalpaVow === opt ? 'active' : ''}`}
              onClick={() => { setSankalpaVow(opt); setCustomSankalpa(''); }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="custom-sankalpa-box">
          <input 
            type="text" 
            placeholder="Or type your personal spiritual vow..."
            value={customSankalpa}
            onChange={(e) => { setCustomSankalpa(e.target.value); setSankalpaVow(e.target.value); }}
            className="custom-sankalpa-input"
          />
        </div>
        <p className="sankalpa-current"><strong>Active Sankalpa:</strong> "{customSankalpa || sankalpaVow}"</p>
      </div>

      {/* Daily Bhagavad Gita Wisdom Card */}
      <div className="gita-wisdom-card glass-panel">
        <div className="gita-badge">📜 DAILY GITA WISDOM (B.G. 9.34)</div>
        <p className="gita-verse">
          "Man-manā bhava mad-bhakto mad-yājī māṁ namaskuru"
        </p>
        <p className="gita-translation">
          "Fix your mind on Me, become My devotee, offer your homage unto Me. Thus absorbed in Me, you shall surely come to Me."
        </p>
      </div>

      <h1 className="mood-title shimmer-text">How does your soul feel today?</h1>
      <p className="mood-subtitle">Offer your heart to Sri Chaitanya, Jagannath Swamy, Sri Krishna & Tulsi Maharani</p>
      
      <div className="mood-cards-grid">
        {moods.map((mood, index) => (
          <div 
            key={mood.id} 
            className={`mood-card glass-panel ${clickedId === mood.id ? 'clicked' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => handleClick(mood.id)}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <h3 className="mood-label">{mood.label}</h3>
            <p className="mood-desc">{mood.desc}</p>
            {clickedId === mood.id && <span className="ripple"></span>}
          </div>
        ))}
      </div>

      {/* Ekadashi & Festival Modal */}
      {showFestivalModal && (
        <FestivalCalendarModal onClose={() => setShowFestivalModal(false)} />
      )}
    </div>
  );
}
