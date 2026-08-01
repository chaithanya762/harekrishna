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
  const [isAartiActive, setIsAartiActive] = useState(false);
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
    setOfferingText('🌿 Sacred Tulsi Leaves Offered to Sri Krishna! 🌿');

    setTimeout(() => {
      setTulsiLeaves([]);
      setOfferingText('');
    }, 2800);
  };

  // 🪔 Interactive Diya Aarti Ceremony (Moving Aarti across ALL THREE DEITIES)
  const handlePerformAarti = () => {
    getAudioContext();
    playBell(0.6);
    setIsAartiActive(true);
    setOfferingText('🪔 Divine Aarti Performed to Sri Jagannath, Sri Chaitanya & Sri Krishna! 🪔');

    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    setTimeout(() => {
      setIsAartiActive(false);
      setOfferingText('');
    }, 5500);
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

      {/* Royal Temple Altar Shrine Banner */}
      <div className="royal-shrine-banner glass-panel">
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

          {/* Golden Aarti Diya moving across ALL THREE DEITIES */}
          {isAartiActive && (
            <div className="all-deities-aarti-diya">
              <span className="aarti-flame">🪔</span>
              <div className="aarti-flame-glow"></div>
            </div>
          )}
        </div>

        {/* Shrine Pooja & Aarti Action Buttons (Incense Removed) */}
        <div className="shrine-action-area">
          <div className="pooja-btn-row">
            <button className="pooja-btn aarti-btn" onClick={handlePerformAarti} title="Perform Aarti across all deities">
              🪔 Perform Divine Aarti
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
      <p className="mood-subtitle">Offer your heart to Sri Chaitanya, Jagannath Swamy & Sri Krishna</p>
      
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
