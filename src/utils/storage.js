const KEYS = {
  TODAY_COUNT: 'divine_chanting_today_count',
  TODAY_DATE: 'divine_chanting_today_date',
  LIFETIME_COUNT: 'divine_chanting_lifetime_count',
  TOTAL_SESSIONS: 'divine_chanting_total_sessions',
  STREAK: 'divine_chanting_streak',
  LAST_DATE: 'divine_chanting_last_date',
};

function getTodayDate() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export function getStats() {
  const today = getTodayDate();
  const storedDate = localStorage.getItem(KEYS.TODAY_DATE);

  let todayCount = parseInt(localStorage.getItem(KEYS.TODAY_COUNT) || '0', 10);
  let lifetimeCount = parseInt(localStorage.getItem(KEYS.LIFETIME_COUNT) || '0', 10);
  let totalSessions = parseInt(localStorage.getItem(KEYS.TOTAL_SESSIONS) || '0', 10);
  let currentStreak = parseInt(localStorage.getItem(KEYS.STREAK) || '0', 10);
  let lastChantDate = localStorage.getItem(KEYS.LAST_DATE) || '';

  // Daily reset
  if (storedDate !== today) {
    todayCount = 0;
    localStorage.setItem(KEYS.TODAY_COUNT, '0');
    localStorage.setItem(KEYS.TODAY_DATE, today);

    // Streak logic
    if (lastChantDate === getYesterdayDate()) {
      // Streak continues (will be incremented on next session)
    } else if (lastChantDate !== today) {
      // Streak broken
      currentStreak = 0;
      localStorage.setItem(KEYS.STREAK, '0');
    }
  }

  return {
    todayCount,
    lifetimeCount,
    totalSessions,
    currentStreak,
    lastChantDate,
  };
}

export function recordSession(mantrasChanted) {
  const today = getTodayDate();
  const stats = getStats();

  const newTodayCount = stats.todayCount + mantrasChanted;
  const newLifetimeCount = stats.lifetimeCount + mantrasChanted;
  const newTotalSessions = stats.totalSessions + 1;

  // Streak logic
  let newStreak = stats.currentStreak;
  const lastDate = stats.lastChantDate;
  if (lastDate !== today) {
    if (lastDate === getYesterdayDate() || lastDate === '') {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  localStorage.setItem(KEYS.TODAY_COUNT, newTodayCount.toString());
  localStorage.setItem(KEYS.TODAY_DATE, today);
  localStorage.setItem(KEYS.LIFETIME_COUNT, newLifetimeCount.toString());
  localStorage.setItem(KEYS.TOTAL_SESSIONS, newTotalSessions.toString());
  localStorage.setItem(KEYS.STREAK, newStreak.toString());
  localStorage.setItem(KEYS.LAST_DATE, today);

  return {
    todayCount: newTodayCount,
    lifetimeCount: newLifetimeCount,
    totalSessions: newTotalSessions,
    currentStreak: newStreak,
    lastChantDate: today,
  };
}

export function resetAllData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}

export { KEYS };
