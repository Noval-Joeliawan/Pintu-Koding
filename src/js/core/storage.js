// js/storage.js
(function() {
  const KEYS = {
    username: 'pk_username',
    xp: 'pk_xp',
    level: 'pk_level',
    hearts: 'pk_hearts',
    maxHearts: 'pk_max_hearts',
    nextHeartRefill: 'pk_next_heart_refill',
    streak: 'pk_streak',
    lastStudyDate: 'pk_last_study_date',
    completedLessons: 'pk_completed_lessons',
    completedExercises: 'pk_completed_exercises',
    unlockedLevels: 'pk_unlocked_levels',
    achievements: 'pk_achievements',
    lastLesson: 'pk_last_lesson',
    dailyBonusDate: 'pk_daily_bonus_date',
    onboardingDone: 'pk_onboarding_done',
    checksum: 'pk_checksum'
  };

  const DEFAULT_USER = {
    username: '',
    xp: 0,
    level: 1,
    hearts: 5,
    maxHearts: 5,
    nextHeartRefill: 0,
    streak: 0,
    lastStudyDate: '',
    completedLessons: [],
    completedExercises: [],
    unlockedLevels: [1],
    achievements: [],
    lastLesson: '',
    dailyBonusDate: ''
  };

  // localStorage can throw (blocked cookies/site data, private mode, quota exceeded). Never let
  // that take the whole app down: fall back to an in-memory store for the current session.
  const localStorage = (function () {
    const mem = {};
    const memory = {
      getItem: (k) => (Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null),
      setItem: (k, v) => { mem[k] = String(v); },
      removeItem: (k) => { delete mem[k]; },
      key: (i) => Object.keys(mem)[i] || null,
      get length() { return Object.keys(mem).length; }
    };
    let real = null;
    try {
      real = window.localStorage;
      const probe = '__pk_probe__';
      real.setItem(probe, '1');
      real.removeItem(probe);
    } catch (e) {
      real = null;
    }
    if (!real) return memory;
    return {
      getItem: (k) => { try { return real.getItem(k); } catch (e) { return memory.getItem(k); } },
      setItem: (k, v) => { try { real.setItem(k, v); } catch (e) { memory.setItem(k, v); } },
      removeItem: (k) => { try { real.removeItem(k); } catch (e) { memory.removeItem(k); } },
      key: (i) => { try { return real.key(i); } catch (e) { return null; } },
      get length() { try { return real.length; } catch (e) { return 0; } }
    };
  })();

  function getJSON(key, defaultVal) {
    const val = localStorage.getItem(key);
    if (!val) return defaultVal;
    try {
      const parsed = JSON.parse(val);
      // Corrupted / hand-edited data must not crash callers that expect an array.
      if (Array.isArray(defaultVal) && !Array.isArray(parsed)) return defaultVal.slice();
      return parsed === null || parsed === undefined ? defaultVal : parsed;
    } catch (e) {
      return Array.isArray(defaultVal) ? defaultVal.slice() : defaultVal;
    }
  }

  function setJSON(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function toInt(raw, fallback) {
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : fallback;
  }

  window.Storage = {
    getUser() {
      const heartsRaw = localStorage.getItem(KEYS.hearts);
      return {
        username: localStorage.getItem(KEYS.username) || DEFAULT_USER.username,
        xp: Math.max(0, toInt(localStorage.getItem(KEYS.xp), DEFAULT_USER.xp)),
        level: Math.max(1, toInt(localStorage.getItem(KEYS.level), DEFAULT_USER.level)),
        hearts: heartsRaw !== null && !isNaN(parseInt(heartsRaw, 10)) ? Math.min(5, Math.max(0, parseInt(heartsRaw, 10))) : DEFAULT_USER.hearts,
        maxHearts: 5,
        nextHeartRefill: toInt(localStorage.getItem(KEYS.nextHeartRefill), DEFAULT_USER.nextHeartRefill),
        streak: Math.max(0, toInt(localStorage.getItem(KEYS.streak), DEFAULT_USER.streak)),
        lastStudyDate: localStorage.getItem(KEYS.lastStudyDate) || DEFAULT_USER.lastStudyDate,
        completedLessons: getJSON(KEYS.completedLessons, DEFAULT_USER.completedLessons),
        completedExercises: getJSON(KEYS.completedExercises, DEFAULT_USER.completedExercises),
        unlockedLevels: getJSON(KEYS.unlockedLevels, DEFAULT_USER.unlockedLevels).map(Number).filter(Number.isFinite),
        achievements: getJSON(KEYS.achievements, DEFAULT_USER.achievements),
        lastLesson: localStorage.getItem(KEYS.lastLesson) || DEFAULT_USER.lastLesson,
        dailyBonusDate: localStorage.getItem(KEYS.dailyBonusDate) || DEFAULT_USER.dailyBonusDate
      };
    },

    saveUser(data) {
      if (data.username !== undefined) localStorage.setItem(KEYS.username, data.username);
      if (data.xp !== undefined) localStorage.setItem(KEYS.xp, data.xp);
      if (data.level !== undefined) localStorage.setItem(KEYS.level, data.level);
      if (data.hearts !== undefined) localStorage.setItem(KEYS.hearts, data.hearts);
      localStorage.setItem(KEYS.maxHearts, '5');
      if (data.nextHeartRefill !== undefined) localStorage.setItem(KEYS.nextHeartRefill, data.nextHeartRefill);
      if (data.streak !== undefined) localStorage.setItem(KEYS.streak, data.streak);
      if (data.lastStudyDate !== undefined) localStorage.setItem(KEYS.lastStudyDate, data.lastStudyDate);
      if (data.completedLessons !== undefined) setJSON(KEYS.completedLessons, data.completedLessons);
      if (data.completedExercises !== undefined) setJSON(KEYS.completedExercises, data.completedExercises);
      if (data.unlockedLevels !== undefined) setJSON(KEYS.unlockedLevels, data.unlockedLevels);
      if (data.achievements !== undefined) setJSON(KEYS.achievements, data.achievements);
      if (data.lastLesson !== undefined) localStorage.setItem(KEYS.lastLesson, data.lastLesson);
      if (data.dailyBonusDate !== undefined) localStorage.setItem(KEYS.dailyBonusDate, data.dailyBonusDate);
    },

    init() {
      if (!localStorage.getItem(KEYS.unlockedLevels)) {
        this.saveUser(DEFAULT_USER);
        localStorage.setItem(KEYS.onboardingDone, 'false');
      }
      return this.getUser();
    },

    reset() {
      Object.values(KEYS).forEach(key => localStorage.removeItem(key));
      // Also clear the one-time XP claim flags (pk_completed_level_N, pk_completed_project_N,
      // pk_completed_final_project). They are not in KEYS, so after a reset the level /
      // project bonus XP could never be earned again.
      const extra = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('pk_') === 0) extra.push(k);
      }
      extra.forEach(k => localStorage.removeItem(k));
    },

    /** One-time flags (e.g. "level bonus already claimed"), stored through the same safe store. */
    getFlag(name) {
      return localStorage.getItem('pk_' + name) === 'true';
    },

    setFlag(name) {
      localStorage.setItem('pk_' + name, 'true');
    },

    isOnboardingDone() {
      return localStorage.getItem(KEYS.onboardingDone) === 'true';
    },

    setOnboardingDone() {
      localStorage.setItem(KEYS.onboardingDone, 'true');
    },

    getTodayString() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },

    getChecksum() {
      return localStorage.getItem(KEYS.checksum) || '';
    },

    setChecksum(val) {
      localStorage.setItem(KEYS.checksum, val || '');
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.Storage;
  }
})();
