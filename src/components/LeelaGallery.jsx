import React, { useState } from 'react';
import StoryModal from './StoryModal';
import './LeelaGallery.css';

export const LEELAS = [
  {
    id: 'makhan_chor',
    title: 'Makhan Chor Leela',
    subtitle: 'Vrindavan Bal Leela',
    tag: '🪷 Bal Leela',
    image: '/assets/leela_makhan.jpg',
    shloka: 'Nani Chora Yashoda Nanda | Vrindavan Behari Govinda',
    mantraLines: [
      'Hare Krishna Hare Krishna',
      'Krishna Krishna Hare Hare',
      'Hare Rama Hare Rama',
      'Rama Rama Hare Hare'
    ],
    description: 'Little Krishna stealing fresh butter in Gokul & Vrindavan, captivating the hearts of all Gopis with His innocent divine charm.',
    story: 'In the sacred village of Vrindavan, young Gopala would playfully enter the homes of Gopis to steal fresh butter. But this was no ordinary butter—the butter represented the pure devotion hidden within the hearts of His devotees. By stealing their butter, Sri Krishna stole away their earthly attachments and filled their lives with eternal divine love.',
    strategy: 'Pure devotion comes when we offer our pure heart (butter) to Sri Krishna. When you face desires or attachments, surrender them to the Lord to find ultimate inner freedom.'
  },
  {
    id: 'govardhan',
    title: 'Govardhan Dharan Leela',
    subtitle: 'Protector of Vrindavan',
    tag: '🏔️ Divine Protection',
    image: '/assets/leela_govardhan.jpg',
    shloka: 'Govardhanadharam Vande | Gopalam Gopeerakshakam',
    mantraLines: [
      'Govardhanadhara Gopala',
      'Vrindavan Chanda Nandalala',
      'Jai Giridhari Sri Krishna',
      'Rukmini Kantha Govinda'
    ],
    description: 'Lord Krishna lifting Mount Govardhan on His little finger for 7 days & nights, shielding Vrindavan residents from Indra\'s storm.',
    story: 'When Indra unleashed severe thunderstorms upon Vrindavan, 7-year-old Sri Krishna effortlessly lifted the giant Govardhan Hill on the tip of His left pinky finger for seven days. All villagers, cattle, and sages sheltered under the hill in supreme peace and security.',
    strategy: 'No storm of life can harm you when you shelter under Krishna\'s grace. When difficulties overwhelm you, remember that the Almighty holds the universe on His finger to protect you.'
  },
  {
    id: 'raas_leela',
    title: 'Divine Raas Leela',
    subtitle: 'Vrindavan Moonlit Transcendence',
    tag: '🌕 Supreme Love',
    image: '/assets/leela_raas.jpg',
    shloka: 'Radha Ramana Mukunda | Vrindavan Rasadhara',
    mantraLines: [
      'Radhe Radhe Radhe Syam',
      'Vrindavan Chanda Radhe Syam',
      'Sri Radha Ramana Govinda',
      'Gopi Jana Vallabha Syam'
    ],
    description: 'The supreme spiritual dance of love under the full moon in Vrindavan forest on the banks of Yamuna river.',
    story: 'Under the autumn full moon, Krishna played His divine flute in Vrindavan forest. Hearing the sweet vibration, the Gopis left all worldly tasks to join Him. Through His divine potency, Krishna multiplied Himself so that every Gopi felt Krishna was dancing exclusively with her.',
    strategy: 'Divine love is infinite and non-rivalrous. The Lord has an intimate, individual relationship with every soul that turns to Him with total sincerity.'
  },
  {
    id: 'kalinga_mardana',
    title: 'Kalinga Mardana Leela',
    subtitle: 'Triumph over Darkness',
    tag: '🐍 Divine Victory',
    image: '/assets/leela_kalinga.jpg',
    shloka: 'Kalinga Mardana Krishna | Yamuna Thira Vihara',
    mantraLines: [
      'Kalinga Mardana Gopala',
      'Yamuna Thira Vihara Laza',
      'Devaki Nanda Vasudeva',
      'Namo Namaste Keshava'
    ],
    description: 'Young Krishna dancing triumphantly on the hood of the venomous Kalinga serpent in Yamuna waters.',
    story: 'The venomous serpent Kalinga poisoned the waters of Yamuna river. Krishna fearlessly leapt into the toxic river, subdued the giant serpent, and performed a cosmic dance upon its thousand hoods, purifying the sacred river forever.',
    strategy: 'The poison of ego and negativity can be subdued by performing devotional chanting (dancing of the tongue) upon the ego. Krishna purifies the lake of your mind.'
  }
];

export const DASHAVATARAS = [
  {
    id: 'matsya',
    title: '1. Matsya Avatar',
    subtitle: 'The Cosmic Fish Incarnation',
    tag: '🐟 1st Avatar',
    image: '/assets/avatar_matsya.jpg',
    shloka: 'Pralaya Payodhi Jale Dhritavan Asi Vedam | Keshava Dhrita Matsya Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Pralaya Payodhi Jale Dhritavan Asi Vedam',
      'Veda Rakshaka Keshava',
      'Matsya Rupa Paramatmane',
      'Jaya Jagadisha Hare'
    ],
    description: 'The First Incarnation of Lord Vishnu as a golden fish saving the sacred Vedas and King Manu from the cosmic deluge.',
    story: 'During the great cosmic dissolution (Pralaya), Lord Vishnu assumed the form of a majestic golden fish. He guided King Manu\'s boat through raging cosmic waters and rescued the sacred Vedas from the demon Hayagriva.',
    strategy: 'In times of severe crisis or societal breakdown, preserve your core values, wisdom (Vedas), and inner integrity. Truth always survives the deluge.'
  },
  {
    id: 'kurma',
    title: '2. Kurma Avatar',
    subtitle: 'The Cosmic Tortoise Incarnation',
    tag: '🐢 2nd Avatar',
    image: '/assets/avatar_kurma.jpg',
    shloka: 'Kshitir Atipulakatara Tava Prishthe | Keshava Dhrita Kurma Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Kshitir Atipulakatara Tava Prishthe',
      'Mandara Dhara Kurma Deva',
      'Samudra Manthan Keshava',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Second Incarnation supporting Mount Mandara on His back during Samudra Manthan (Ocean Churning).',
    story: 'During Samudra Manthan, Mount Mandara began to sink into the ocean floor. Lord Vishnu took the form of a giant tortoise (Kurma) and bore the weight of the immense mountain on His shell so the nectar of immortality (Amrita) could be churned.',
    strategy: 'Patience and stability under heavy pressure. Like Kurma, build an unshakeable foundation within yourself when undertaking great endeavors.'
  },
  {
    id: 'varaha',
    title: '3. Varaha Avatar',
    subtitle: 'The Cosmic Boar Incarnation',
    tag: '🐗 3rd Avatar',
    image: '/assets/avatar_varaha.jpg',
    shloka: 'Vasati Dashana Shikhare Dharani Tava Lagna | Keshava Dhrita Varaha Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Vasati Dashana Shikhare Dharani Tava Lagna',
      'Bhudevi Rakshaka Varaha Deva',
      'Hiranyaksha Samhara Keshava',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Third Incarnation rescuing Mother Earth (Bhudevi) from the depths of the cosmic ocean.',
    story: 'When the demon Hiranyaksha dragged Earth (Bhudevi) to the bottom of the cosmic ocean, Lord Vishnu assumed the heroic Varaha form, vanquished the demon, and gently lifted Mother Earth back to her rightful cosmic orbit on His glowing tusk.',
    strategy: 'Courage to rescue those in distress. No matter how deep your downfall or trouble, the Divine will dive into the deepest abyss to lift you up.'
  },
  {
    id: 'narasimha',
    title: '4. Narasimha Avatar',
    subtitle: 'The Lion-Man Incarnation',
    tag: '🦁 4th Avatar',
    image: '/assets/avatar_narasimha.jpg',
    shloka: 'Ugram Veeram Maha Vishnum Jwalantam Sarvato Mukham | Narasimham Bheeshanam Bhadram Mrityur Mrityum Namamyaham',
    mantraLines: [
      'Ugram Veeram Maha Vishnum',
      'Jwalantam Sarvato Mukham',
      'Narasimham Bheeshanam Bhadram',
      'Mrityur Mrityum Namamyaham'
    ],
    description: 'The Fourth Incarnation emerging from a golden pillar to protect young devotee Prahlada and slay tyrant Hiranyakashipu.',
    story: 'Demon king Hiranyakashipu possessed a boon preventing death by man, beast, day, night, inside, or outside. When he challenged child devotee Prahlada, asking "Is your Vishnu in this pillar?", the Lord burst forth as Narasimha (neither man nor animal, at twilight, on threshold) to protect His child.',
    strategy: 'God is omnipresent and breaks all limitations of space & time to defend true faith. Fearlessness in standing up for righteousness.'
  },
  {
    id: 'vamana',
    title: '5. Vamana Avatar',
    subtitle: 'The Dwarf Brahmin Incarnation',
    tag: '👑 5th Avatar',
    image: '/assets/avatar_vamana.jpg',
    shloka: 'Chalayasi Vikramane Bali Adbhuta Vamana | Keshava Dhrita Vamana Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Chalayasi Vikramane Bali Adbhuta Vamana',
      'Trivikrama Rupa Keshava',
      'Padapadma Rakshaka Vamana',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Fifth Incarnation who measured the three worlds in three steps, humbling King Bali\'s pride.',
    story: 'Lord Vishnu appeared as a young dwarf Brahmin (Vamana) asking King Bali for three paces of land. When granted, Vamana expanded into Trivikrama—covering Earth in one step, the Heavens in second step, and King Bali offered his own head for the third step, attaining liberation.',
    strategy: 'True humility and surrender conquer the entire universe. Pride loses everything, but surrender wins God Himself.'
  },
  {
    id: 'parashurama',
    title: '6. Parashurama Avatar',
    subtitle: 'The Warrior Sage Incarnation',
    tag: '🪓 6th Avatar',
    image: '/assets/avatar_parashurama.jpg',
    shloka: 'Kshatriya Rucira Mayake Jagad Apakata Papam | Keshava Dhrita Parashurama Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Kshatriya Rucira Mayake Jagad Apakata Papam',
      'Parashu Dhara Sage Keshava',
      'Dharma Sthapaka Parashurama',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Sixth Incarnation carrying the divine axe to cleanse Earth of corrupt and tyrannical rulers.',
    story: 'Armed with a divine battle-axe (Parashu), sage Parashurama eliminated tyrannical kings who abused their power and oppressed the innocent, restoring moral order and protecting righteous sages.',
    strategy: 'Power without moral discipline is destructive. Use your skills to eliminate corruption and defend justice.'
  },
  {
    id: 'rama',
    title: '7. Sri Rama Avatar',
    subtitle: 'Maryada Purushottama',
    tag: '🏹 7th Avatar',
    image: '/assets/avatar_rama.jpg',
    shloka: 'Sri Rama Rama Rameti Rame Rame Manorame | Sahasranama Tattulyam Rama Nama Varanane',
    mantraLines: [
      'Sri Rama Rama Rameti',
      'Rame Rame Manorame',
      'Sahasranama Tattulyam',
      'Rama Nama Varanane'
    ],
    description: 'The Seventh Incarnation, the ideal king and symbol of truth, virtue, and victory over Ravana.',
    story: 'Sri Rama lived a life of supreme truth, filial duty, and honor. He endured 14 years of exile, built the bridge across the ocean, defeated 10-headed demon king Ravana, and established Ramrajya (righteous governance).',
    strategy: 'Adherence to duty (Dharma) above personal comfort. Righteousness eventually triumphs over all arrogance.'
  },
  {
    id: 'krishna',
    title: '8. Sri Krishna Avatar',
    subtitle: 'Supreme Bhagavan',
    tag: '🪶 8th Avatar',
    image: '/assets/krishna.jpg',
    shloka: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare | Hare Rama Hare Rama Rama Rama Hare Hare',
    mantraLines: [
      'Hare Krishna Hare Krishna',
      'Krishna Krishna Hare Hare',
      'Hare Rama Hare Rama',
      'Rama Rama Hare Hare'
    ],
    description: 'The Eighth Incarnation, Supreme Personality of Godhead, speaker of Bhagavad Gita and Lord of Vrindavan.',
    story: 'Sri Krishna is the Purna Avatar (Full Incarnation) who revealed the Bhagavad Gita on Kurukshetra battlefield and distributed eternal divine bliss in Vrindavan.',
    strategy: 'Perform your duty with detachment while keeping your mind fixed on Sri Krishna. Devotion is the ultimate goal of all life.'
  },
  {
    id: 'balarama',
    title: '9. Lord Balarama Avatar',
    subtitle: 'Incarnation of Spiritual Strength',
    tag: '🌾 9th Avatar',
    image: '/assets/avatar_balarama.jpg',
    shloka: 'Vahasi Vapushi Vite Vasanam Jaladabham | Keshava Dhrita Haladhara Rupa Jaya Jagadisha Hare',
    mantraLines: [
      'Vahasi Vapushi Vite Vasanam Jaladabham',
      'Haladhara Rupa Keshava',
      'Balarama Sri Krishna Anuja',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Ninth Incarnation holding the golden plow (Halayudha), representing divine strength, purity, and spiritual foundation.',
    story: 'Lord Balarama is the elder brother of Sri Krishna, wielding the sacred plow Halayudha. He cleared the forests of Vrindavan, diverted Yamuna river, and provides the spiritual strength (Bala) required to perform pure devotion to Sri Krishna.',
    strategy: 'Combine inner spiritual strength (Balarama) with love and devotion (Krishna) to overcome all obstacles.'
  },
  {
    id: 'kalki',
    title: '10. Kalki Avatar',
    subtitle: 'The Restorer of Satya Yuga',
    tag: '⚔️ 10th Avatar',
    image: '/assets/avatar_kalki.jpg',
    shloka: 'Mleccha Nivaha Nidhane Kalayasi Karavalam | Keshava Dhrita Kalki Sharira Jaya Jagadisha Hare',
    mantraLines: [
      'Mleccha Nivaha Nidhane Kalayasi Karavalam',
      'Kalki Sharira Keshava',
      'Satya Yuga Sthapaka Deva',
      'Jaya Jagadisha Hare'
    ],
    description: 'The Tenth Incarnation riding a white horse (Devadatta) with a blazing sword to end Kali Yuga.',
    story: 'At the end of Kali Yuga, Lord Kalki will appear atop a magnificent white horse, wielding a fiery sword to eliminate darkness, unrighteousness, and inaugurate the new Golden Age of Satya Yuga.',
    strategy: 'Keep hope alive. Light will always conquer darkness, and a new dawn of truth is inevitable.'
  }
];

export default function LeelaGallery({ onSelectLeela, onBack }) {
  const [activeTab, setActiveTab] = useState('leelas');
  const [selectedStoryItem, setSelectedStoryItem] = useState(null);

  const getActiveItems = () => {
    if (activeTab === 'leelas') return LEELAS;
    if (activeTab === 'dashavatara') return DASHAVATARAS;
    return [
      {
        id: 'puri_jagannath',
        title: 'Sri Puri Jagannath Swamy',
        subtitle: 'Nilachala Dham Purushottama',
        tag: '🚩 Puri Temple',
        image: '/assets/jagannath.jpg',
        shloka: 'Nilachala Nivasaya Nityaya Paramatmane | Balabhadra Subhadrabhyam Jagannathaya Te Namah',
        mantraLines: [
          'Nilachala Nivasaya Nityaya Paramatmane',
          'Balabhadra Subhadrabhyam',
          'Jagannathaya Te Namah',
          'Jai Jagannath Purushottama'
        ],
        description: 'The sacred deity form of Lord Jagannath along with Lord Balabhadra and Devi Subhadra in Puri.',
        story: 'Lord Jagannath is Krishna Himself in His highest mood of love & separation. King Indradyumna constructed the grand Puri temple, and architect Vishwakarma carved these unique neem wood deity forms filled with divine bliss.',
        strategy: 'Surrender all your worries to Jagannath (Lord of Universe). He gazes with giant wide eyes to shower endless grace upon every pilgrim.'
      },
      {
        id: 'panchatatva_chaitanya',
        title: 'Sri Chaitanya Mahaprabhu',
        subtitle: 'Panchatatva Avatar of Compassion',
        tag: '🪷 Golden Avatar',
        image: '/assets/chaitanya.jpg',
        shloka: 'Namo Maha Vadanyaya Krishna Prema Pradaya Te | Krishnaya Krishna Chaitanya Namne Gaura Tvishe Namah',
        mantraLines: [
          'Sri Krishna Chaitanya',
          'Prabhu Nityananda',
          'Sri Advaita Gadadhara',
          'Srivasadi Gaura Bhakta Vrinda'
        ],
        description: 'Sri Chaitanya Mahaprabhu distributed Krishna Prema freely through Sankirtana in Gauda Desh & Puri.',
        story: 'Sri Chaitanya Mahaprabhu is Krishna Himself combined with Radha\'s golden complexion & loving mood. He inaugurated the Harinama Sankirtana movement, giving the Mahamantra to everyone regardless of background.',
        strategy: 'Chant the holy names without pride, feel humbler than blade of grass, and share divine love with all.'
      }
    ];
  };

  return (
    <div className="leela-gallery-container divine-reveal">
      <div className="lg-top-bar">
        <button className="lg-back-btn" onClick={onBack}>
          ← Back to Main Altar
        </button>
      </div>

      <div className="lg-header text-center">
        <span className="lg-badge">🪷 VRINDAVAN & DASHAVATARA KATHA 🪶</span>
        <h1 className="shimmer-text lg-title">Sacred Leelas & Divine Avatars</h1>
        <p className="lg-subtitle">Explore divine stories, shlokas, and life wisdom for your spiritual journey</p>
      </div>

      {/* Tabs Bar */}
      <div className="leela-tabs-bar">
        <button 
          className={`leela-tab-btn ${activeTab === 'leelas' ? 'active' : ''}`}
          onClick={() => setActiveTab('leelas')}
        >
          🪶 Vrindavan Leelas
        </button>
        <button 
          className={`leela-tab-btn ${activeTab === 'dashavatara' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashavatara')}
        >
          ☸️ Dashavatara Katha (10 Avatars)
        </button>
        <button 
          className={`leela-tab-btn ${activeTab === 'dham' ? 'active' : ''}`}
          onClick={() => setActiveTab('dham')}
        >
          🚩 Puri Jagannath & Panchatatva
        </button>
      </div>

      {/* Cards Grid */}
      <div className="leela-cards-grid">
        {getActiveItems().map((item, index) => (
          <div 
            key={item.id} 
            className="leela-card glass-panel"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="leela-img-wrapper">
              <img 
                src={item.image} 
                alt={item.title} 
                className="leela-card-img"
                loading="eager"
                decoding="async"
              />
              <span className="leela-card-tag">{item.tag}</span>
            </div>

            <div className="leela-card-body">
              <h3 className="leela-card-title">{item.title}</h3>
              <h4 className="leela-card-sub">{item.subtitle}</h4>
              <p className="leela-card-desc">{item.description}</p>
              
              <div className="leela-card-actions">
                <button 
                  className="leela-read-btn"
                  onClick={() => setSelectedStoryItem(item)}
                >
                  📖 Read Divine Katha
                </button>
                <button 
                  className="leela-select-btn"
                  onClick={() => onSelectLeela(item)}
                >
                  📿 Set Japa Deity
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Popup Modal */}
      {selectedStoryItem && (
        <StoryModal 
          item={selectedStoryItem}
          onClose={() => setSelectedStoryItem(null)}
          onSelectForChanting={onSelectLeela}
        />
      )}
    </div>
  );
}
