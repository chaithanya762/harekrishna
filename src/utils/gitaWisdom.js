// Curated Daily Bhagavad Gita Verses & Nectarean Wisdom
export const GITA_VERSES = [
  {
    chapterVerse: 'B.G. 9.34',
    sanskrit: 'Man-manā bhava mad-bhakto mad-yājī māṁ namaskuru | Mām evaiṣyasi yuktvaitam ātmānaṁ mat-parāyaṇaḥ ||',
    translation: 'Engage your mind always in thinking of Me, become My devotee, offer obeisances unto Me and worship Me. Being completely absorbed in Me, surely you will come to Me.'
  },
  {
    chapterVerse: 'B.G. 18.66',
    sanskrit: 'Sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | Ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    translation: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.'
  },
  {
    chapterVerse: 'B.G. 2.47',
    sanskrit: 'Karmaṇy evādhikāras te mā phaleṣu kadācana | Mā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||',
    translation: 'You have a right to perform your prescribed duty, but you are never entitled to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.'
  },
  {
    chapterVerse: 'B.G. 10.8',
    sanskrit: 'Ahaṁ sarvasya prabhavo mattaḥ sarvaṁ pravartate | Iti matvā bhajante māṁ budhā bhāva-samanvitāḥ ||',
    translation: 'I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who perfectly know this engage in My devotional service with all their hearts.'
  },
  {
    chapterVerse: 'B.G. 9.22',
    sanskrit: 'Ananyāś cintayanto māṁ ye janāḥ paryupāsate | Teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
    translation: 'To those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.'
  },
  {
    chapterVerse: 'B.G. 4.7',
    sanskrit: 'Yadā yadā hi dharmasya glānir bhavati bhārata | Abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||',
    translation: 'Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.'
  },
  {
    chapterVerse: 'B.G. 6.5',
    sanskrit: 'Uddhared ātmanātmānaṁ nātmānam avasādayet | Ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
    translation: 'One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.'
  },
  {
    chapterVerse: 'B.G. 12.8',
    sanskrit: 'Mayy eva mana ādhatsva mayi buddhiṁ niveśaya | Nivaṣiṣyasi mayy eva ata ūrdhvaṁ na saṁśayaḥ ||',
    translation: 'Just fix your mind upon Me, the Supreme Personality of Godhead, and engage all your intelligence in Me. Thus you will live in Me always, without a doubt.'
  },
  {
    chapterVerse: 'B.G. 2.20',
    sanskrit: 'Na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ | Ajo nityaḥ śāśvato ’yaṁ purāṇo na hanyate hanyamāne śarīre ||',
    translation: 'For the soul there is neither birth nor death at any time. He is unborn, eternal, ever-existing, and primeval. He is not slain when the body is slain.'
  },
  {
    chapterVerse: 'B.G. 7.14',
    sanskrit: 'Daivī hy eṣā guṇamayī mama māyā duratyayā | Mām eva ye prapadyante māyām etāṁ taranti te ||',
    translation: 'This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.'
  },
  {
    chapterVerse: 'B.G. 18.65',
    sanskrit: 'Man-manā bhava mad-bhakto mad-yājī māṁ namaskuru | Mām evaiṣyasi satyaṁ te pratijāne priyo ’si me ||',
    translation: 'Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.'
  }
];

// Helper to get today's verse automatically based on the current calendar day
export function getDailyGitaWisdom(date = new Date()) {
  // Calculate day of the year (1 to 366)
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = dayOfYear % GITA_VERSES.length;
  return GITA_VERSES[index];
}
