import React, { useState } from 'react';
import './FestivalCalendarModal.css';

const ISKCON_CALENDAR_2026 = [
  {
    month: 'Jan 2026',
    date: 'January 29, 2026',
    title: '🚩 Bhaimi Ekadashi (Varaha Dvadashi)',
    type: 'Ekadashi Fasting',
    rules: 'Fast from all grains, beans & cereals. Extra Hare Krishna Mahamantra chanting.',
    blessing: 'Grants liberation from past karmic sins and invokes Lord Varaha\'s divine protection.'
  },
  {
    month: 'Feb 2026',
    date: 'February 12, 2026',
    title: '🚩 Vijaya Ekadashi Fasting',
    type: 'Ekadashi Fasting',
    rules: 'Fast from grains. Perform extra Japa rounds before Lord Vishnu/Krishna.',
    blessing: 'Grants complete victory over internal enemies (lust, anger, greed) and obstacles.'
  },
  {
    month: 'Feb 2026',
    date: 'February 28, 2026',
    title: '🪷 Sri Nityananda Trayodashi',
    type: 'Lord Nityananda Appearance',
    rules: 'Fasting till noon, Abhishekam & Gauranga Nityananda Kirtan Mahotsava.',
    blessing: 'Lord Nityananda bestows mercy, breaking all barriers to pure divine love.'
  },
  {
    month: 'Mar 2026',
    date: 'March 3, 2026',
    title: '🌕 Sri Gaura Purnima (Gauranga Jayanti)',
    type: 'Lord Chaitanya Appearance',
    rules: 'Fasting till moonrise, continuous Harinama Sankirtana & Mahaprasadam.',
    blessing: 'Sri Chaitanya Mahaprabhu floods the soul with the sweet nectar of Krishna-prema.'
  },
  {
    month: 'Mar 2026',
    date: 'March 28, 2026',
    title: '🏹 Sri Rama Navami',
    type: 'Lord Ramachandra Appearance',
    rules: 'Fasting till sunset. Recite Sri Ramachandra Stotram & offer fresh flowers.',
    blessing: 'Bestows righteousness (Dharma), courage, and unshakeable inner peace.'
  },
  {
    month: 'Apr 2026',
    date: 'April 12, 2026',
    title: '🚩 Kamada Ekadashi Fasting',
    type: 'Ekadashi Fasting',
    rules: 'Fast from grains & beans. Dedicate all actions to Sri Krishna\'s lotus feet.',
    blessing: 'Fulfills pure spiritual desires and grants freedom from past karmic burdens.'
  },
  {
    month: 'May 2026',
    date: 'May 1, 2026',
    title: '🦁 Sri Narasimha Chaturdashi',
    type: 'Lord Narasimhadeva Appearance',
    rules: 'Fasting till dusk, midnight Abhishekam, and chanting Sri Narasimha Kavacha.',
    blessing: 'Destroys all spiritual fears, demonic influences, and grants fearless faith.'
  },
  {
    month: 'Jun 2026',
    date: 'June 25, 2026',
    title: '💧 Nirjala Pandava Ekadashi',
    type: 'Greatest Ekadashi Fast',
    rules: 'Complete fast without even taking a single drop of water from sunrise to sunrise.',
    blessing: 'Grants the spiritual merit of observing all 24 Ekadashis of the entire year.'
  },
  {
    month: 'Jul 2026',
    date: 'July 16, 2026',
    title: '🛞 Sri Puri Ratha Yatra Mahotsava',
    type: 'Puri Dham Chariot Festival',
    rules: 'Chant "Jagannatha Swami Nayana Pathagami Bhavatu Me" & pull Lord\'s chariot.',
    blessing: 'Whoever beholds Sri Jagannath on His Ratha chariot never suffers rebirth in darkness.'
  },
  {
    month: 'Jul 2026',
    date: 'July 25, 2026',
    title: '🚩 Devashayani Shayani Ekadashi',
    type: 'Beginning of Chaturmasya',
    rules: 'Fast from grains. Four-month Vrata (Chaturmasya) begins with vows.',
    blessing: 'Deepens spiritual discipline and attracts Sri Krishna\'s special glance.'
  },
  {
    month: 'Aug 2026',
    date: 'August 23, 2026',
    title: '🪷 Jhulan Yatra & Pavitra Ekadashi',
    type: 'Vrindavan Swing Festival',
    rules: 'Offer silk thread Pavitra garlands to Radha-Krishna on Their flower swing.',
    blessing: 'Attracts the sweet, confidential conjugal pastimes of Vrindavan.'
  },
  {
    month: 'Sep 2026',
    date: 'September 4, 2026',
    title: '🪶 Sri Krishna Janmashtami',
    type: 'Appearance of Lord Sri Krishna',
    rules: 'Fasting till midnight, midnight 108 Kalash Abhishekam & Sankirtana.',
    blessing: 'Fills the heart with supreme bliss, destroying all darkness and spiritual ignorance.'
  },
  {
    month: 'Sep 2026',
    date: 'September 5, 2026',
    title: '🌸 Nandotsava & Srila Prabhupada Jayanti',
    type: 'Appearance Day of Founder-Acharya',
    rules: 'Offer Puspanjali, cook 56 bhoga offerings & listen to Prabhupada Katha.',
    blessing: 'Grants steady discipleship and eternal service at Lord Chaitanya\'s mission.'
  },
  {
    month: 'Sep 2026',
    date: 'September 18, 2026',
    title: '🌺 Sri Radhashtami',
    type: 'Appearance Day of Srimati Radharani',
    rules: 'Fasting till noon, offer Tulsi Manjari leaves and sing Radhe Radhe Kirtan.',
    blessing: 'Srimati Radharani grants direct devotional service at Sri Krishna\'s lotus feet.'
  },
  {
    month: 'Oct 2026',
    date: 'October 21, 2026',
    title: '🌕 Sharad Purnima & Pasankusa Ekadashi',
    type: 'Rasa Leela & Kartik Begins',
    rules: 'Offer sweet rice (Kheer) under full moonlight. Damodara Month begins.',
    blessing: 'Grants entrance into Sri Krishna\'s intimate Raas Leela pastimes.'
  },
  {
    month: 'Nov 2026',
    date: 'November 8, 2026',
    title: '🏔️ Sri Govardhan Puja & Annakuta',
    type: 'Govardhan Hill Worship',
    rules: 'Prepare mountain of vegetarian offerings (Annakuta) & circumambulate Giriraj.',
    blessing: 'Giriraj Govardhan protects devotees from all planetary & worldly afflictions.'
  },
  {
    month: 'Nov 2026',
    date: 'November 20, 2026',
    title: '🪴 Utthana Prabodhini Ekadashi (Tulsi Vivaha)',
    type: 'Awakening of Lord Vishnu',
    rules: 'Perform Tulsi Vivaha ceremony with Sri Shaligram Shila & offer brass lamps.',
    blessing: 'Bestows eternal auspiciousness, happy family life, and pure Krishna bhakti.'
  },
  {
    month: 'Dec 2026',
    date: 'December 20, 2026',
    title: '📜 Gita Jayanti & Mokshada Ekadashi',
    type: 'Spoken Day of Bhagavad Gita',
    rules: 'Recite all 18 Chapters of Bhagavad Gita As It Is & fast from grains.',
    blessing: 'Destroys illusion, grants divine wisdom, and leads straight to Goloka Vrindavan.'
  }
];

export default function FestivalCalendarModal({ onClose }) {
  const [filter, setFilter] = useState('all');

  const filteredList = ISKCON_CALENDAR_2026.filter((item) => {
    if (filter === 'ekadashi') return item.type.includes('Ekadashi');
    if (filter === 'festival') return !item.type.includes('Ekadashi');
    return true;
  });

  return (
    <div className="festival-modal-overlay divine-reveal" onClick={onClose}>
      <div className="festival-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="festival-close-btn" onClick={onClose} aria-label="Close">×</button>
        
        <div className="festival-modal-header text-center">
          <span className="festival-badge">📅 OFFICIAL 2026 ISKCON VAISNAVA PANCHANGA 🚩</span>
          <h2 className="shimmer-text festival-title">2026 Ekadashis & Vrindavan Festivals</h2>
          <p className="festival-subtitle">Fasting dates & sacred observances from Sri Mayapur & Vrindavan Dham</p>

          <div className="calendar-filter-bar">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              All 2026 Events ({ISKCON_CALENDAR_2026.length})
            </button>
            <button 
              className={`filter-tab ${filter === 'ekadashi' ? 'active' : ''}`} 
              onClick={() => setFilter('ekadashi')}
            >
              🚩 Ekadashis Only
            </button>
            <button 
              className={`filter-tab ${filter === 'festival' ? 'active' : ''}`} 
              onClick={() => setFilter('festival')}
            >
              🪷 Major Festivals Only
            </button>
          </div>
        </div>

        <div className="festivals-list">
          {filteredList.map((fest, idx) => (
            <div key={idx} className="festival-card glass-panel">
              <div className="fest-header">
                <span className="fest-date">📅 {fest.date}</span>
                <span className="fest-type">{fest.type}</span>
              </div>
              <h3 className="fest-title">{fest.title}</h3>
              <p className="fest-rules"><strong>📜 Fasting Guideline:</strong> {fest.rules}</p>
              <p className="fest-blessing"><strong>✨ Spiritual Blessing:</strong> {fest.blessing}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
