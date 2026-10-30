// src/js/core/state.js — Centralized State Manager for Pintu Koding v2.0
(function () {
  "use strict";

  const SALT = "pk_v2_secure_salt_8f9a2";

  /**
   * Deterministic FNV-1a based hash for integrity verification
   */
  function hashString(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  function computeStateChecksum(user) {
    if (!user) return "";
    const completedCount =
      (user.completedLessons && user.completedLessons.length) || 0;
    const completedExCount =
      (user.completedExercises && user.completedExercises.length) || 0;
    const raw = `${SALT}:${user.username || ""}:${user.xp || 0}:${user.level || 1}:${user.hearts ?? 5}:${user.streak || 0}:${completedCount}:${completedExCount}`;
    return hashString(raw);
  }

  const State = {
    _user: null,
    _initialized: false,
    _tampered: false,

    init() {
      if (typeof window.Storage === "undefined") {
        console.warn("[State] Storage module not available.");
        return;
      }
      this._user = window.Storage.getUser();
      const integrity = this.validateIntegrity(this._user);
      if (!integrity.valid) {
        console.warn(
          "[State] Storage integrity check failed:",
          integrity.reason,
        );
        this._tampered = true;
      }
      this._initialized = true;
      return this._user;
    },

    /**
     * Verify whether the loaded storage matches its signature
     */
    validateIntegrity(user) {
      if (!user) return { valid: false, reason: "NO_USER_DATA" };
      const storedChecksum = window.Storage.getChecksum
        ? window.Storage.getChecksum()
        : null;
      const expected = computeStateChecksum(user);

      // First run or migration: record initial checksum
      if (!storedChecksum) {
        this._saveChecksum(expected);
        return { valid: true };
      }

      if (storedChecksum !== expected) {
        // Sanitize any out-of-range or illegal values
        let fixed = false;
        if (
          typeof user.hearts !== "number" ||
          user.hearts < 0 ||
          user.hearts > 5
        ) {
          user.hearts = Math.max(0, Math.min(5, Number(user.hearts) || 0));
          fixed = true;
        }
        if (typeof user.xp !== "number" || user.xp < 0) {
          user.xp = Math.max(0, Number(user.xp) || 0);
          fixed = true;
        }
        if (
          typeof user.level !== "number" ||
          user.level < 1 ||
          user.level > 12
        ) {
          user.level = Math.max(1, Math.min(12, Number(user.level) || 1));
          fixed = true;
        }
        if (typeof user.streak !== "number" || user.streak < 0) {
          user.streak = Math.max(0, Number(user.streak) || 0);
          fixed = true;
        }

        const newChecksum = computeStateChecksum(user);
        this._saveChecksum(newChecksum);
        if (fixed) {
          window.Storage.saveUser(user);
        }
        return { valid: false, reason: "CHECKSUM_MISMATCH_RESOLVED" };
      }

      return { valid: true };
    },

    _saveChecksum(checksum) {
      if (window.Storage && typeof window.Storage.setChecksum === "function") {
        window.Storage.setChecksum(checksum);
      }
    },

    _persist() {
      if (!this._user) return;
      if (window.Storage) {
        window.Storage.saveUser(this._user);
        const checksum = computeStateChecksum(this._user);
        this._saveChecksum(checksum);
      }
    },

    getUser() {
      if (!this._user) {
        this.init();
      }
      return Object.assign({}, this._user);
    },

    get(key) {
      const user = this.getUser();
      return user ? user[key] : undefined;
    },

    isTampered() {
      return this._tampered;
    },

    isHeartsEmpty() {
      const user = this.getUser();
      return (user.hearts || 0) <= 0;
    },

    /**
     * Decrement 1 heart (or specified amount)
     */
    decrementHearts(amount = 1) {
      const user = this.getUser();
      if (user.hearts <= 0) {
        if (window.Events) {
          window.Events.emit(window.Events.HEARTS_EMPTY, { hearts: 0 });
        }
        return false;
      }

      user.hearts = Math.max(0, user.hearts - amount);
      const refillInterval = 30 * 60 * 1000; // 30 minutes (FR-3.2)
      if (
        user.hearts < 5 &&
        (!user.nextHeartRefill || user.nextHeartRefill <= Date.now())
      ) {
        user.nextHeartRefill = Date.now() + refillInterval;
      }

      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "hearts",
          value: user.hearts,
        });
        if (user.hearts === 0) {
          window.Events.emit(window.Events.HEARTS_EMPTY, { hearts: 0 });
        }
      }
      return true;
    },

    /**
     * Restore hearts (e.g. via Practice Mode or passive refill)
     */
    restoreHearts(amount = 1, options = {}) {
      const user = this.getUser();
      const prev = user.hearts;
      user.hearts = Math.min(5, user.hearts + amount);

      if (user.hearts >= 5) {
        user.nextHeartRefill = null;
      } else if (options.nextHeartRefill !== undefined) {
        user.nextHeartRefill = options.nextHeartRefill;
      }

      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.HEART_REFILLED, {
          hearts: user.hearts,
          amountGained: user.hearts - prev,
          source: options.source || "manual",
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "hearts",
          value: user.hearts,
        });
      }
      return user.hearts;
    },

    setNextHeartRefill(timestamp) {
      const user = this.getUser();
      user.nextHeartRefill = timestamp;
      this._user = user;
      this._persist();
      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "nextHeartRefill",
          value: timestamp,
        });
      }
    },

    /**
     * Set exact hearts value
     */
    setHearts(count) {
      const user = this.getUser();
      user.hearts = Math.max(0, Math.min(5, count));
      if (user.hearts >= 5) {
        user.nextHeartRefill = null;
      }
      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "hearts",
          value: user.hearts,
        });
        if (user.hearts === 0) {
          window.Events.emit(window.Events.HEARTS_EMPTY, { hearts: 0 });
        }
      }
    },

    /**
     * Add XP and recalculate level & trigger XP_UPDATED
     */
    addXP(amount, reason = "") {
      if (amount <= 0) return;
      const user = this.getUser();
      user.xp = (user.xp || 0) + amount;

      // Recalculate level if Progress module is available
      if (window.Progress && typeof window.Progress.getStats === "function") {
        const stats = window.Progress.getStats();
        const nextLevel = Math.min(
          12,
          Math.max(1, Math.ceil((stats.completedLessons || 0) / 5)),
        );
        if (stats.percent >= 100) {
          user.level = 12;
        } else if (user.level !== nextLevel) {
          user.level = nextLevel;
        }
      }

      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.XP_UPDATED, {
          xp: user.xp,
          added: amount,
          reason,
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "xp",
          value: user.xp,
        });
      }
    },

    /**
     * Spend XP safely (updates checksum and emits events)
     */
    spendXP(amount, reason = "exchange") {
      if (amount <= 0) return false;
      const user = this.getUser();
      if ((user.xp || 0) < amount) return false;

      user.xp = Math.max(0, (user.xp || 0) - amount);
      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.XP_UPDATED, {
          xp: user.xp,
          added: 0,
          spent: amount,
          reason,
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "xp",
          value: user.xp,
        });
      }
      return true;
    },

    /**
     * Atomic Exchange: Tukar XP untuk mengisi ulang Heart
     */
    exchangeXPForHearts(heartsToBuy = 1, costPerHeart = 50) {
      const user = this.getUser();
      const currentHearts = user.hearts ?? 5;
      if (currentHearts >= 5) {
        return { ok: false, reason: "HEARTS_FULL" };
      }

      const actualHearts = Math.min(
        5 - currentHearts,
        Math.max(1, heartsToBuy),
      );
      const totalCost = actualHearts * costPerHeart;

      if ((user.xp || 0) < totalCost) {
        return {
          ok: false,
          reason: "INSUFFICIENT_XP",
          needed: totalCost,
          currentXP: user.xp || 0,
        };
      }

      user.xp -= totalCost;
      user.hearts = Math.min(5, currentHearts + actualHearts);
      if (user.hearts >= 5) {
        user.nextHeartRefill = null;
      }

      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.XP_UPDATED, {
          xp: user.xp,
          added: 0,
          spent: totalCost,
          reason: "heart_exchange",
        });
        window.Events.emit(window.Events.HEART_REFILLED, {
          hearts: user.hearts,
          amountGained: actualHearts,
          source: "xp_exchange",
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "xp",
          value: user.xp,
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "hearts",
          value: user.hearts,
        });
      }

      return {
        ok: true,
        heartsGained: actualHearts,
        xpSpent: totalCost,
        hearts: user.hearts,
        xp: user.xp,
      };
    },

    /**
     * Update streak
     */
    setStreak(streakCount, lastStudyDate) {
      const user = this.getUser();
      user.streak = Math.max(0, streakCount);
      if (lastStudyDate) {
        user.lastStudyDate = lastStudyDate;
      }
      this._user = user;
      this._persist();

      if (window.Events) {
        window.Events.emit(window.Events.STREAK_UPDATED, {
          streak: user.streak,
        });
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "streak",
          value: user.streak,
        });
      }
    },

    /**
     * Set current active lesson
     */
    setCurrentLesson(levelId, lessonId) {
      const user = this.getUser();
      user.lastLesson = `${levelId}-${lessonId}`;
      this._user = user;
      this._persist();
      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "lastLesson",
          value: user.lastLesson,
        });
      }
    },

    /**
     * Track materi yang sedang dipilih (html | css | js).
     * Disimpan agar saat kembali dari lesson ke dashboard / learning path,
     * tab materi terakhir yang dipilih tetap aktif.
     * Tidak ikut checksum: nilai ini kosmetik, bukan progres.
     */
    getActiveTrack() {
      const user = this.getUser();
      const t = user && user.activeTrack;
      return t === "css" || t === "js" || t === "html" ? t : "html";
    },

    setActiveTrack(trackId) {
      if (trackId !== "html" && trackId !== "css" && trackId !== "js") return;
      const user = this.getUser();
      user.activeTrack = trackId;
      this._user = user;
      this._persist();
      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "activeTrack",
          value: trackId,
        });
      }
    },

    /**
     * Mark a lesson as completed
     */
    completeLesson(levelId, lessonId) {
      const user = this.getUser();
      const key = `${levelId}-${lessonId}`;
      if (!user.completedLessons) user.completedLessons = [];
      if (!user.completedLessons.includes(key)) {
        user.completedLessons.push(key);
        this._user = user;
        this._persist();

        if (window.Events) {
          window.Events.emit(window.Events.LESSON_COMPLETED, {
            levelId,
            lessonId,
          });
          window.Events.emit(window.Events.STATE_CHANGED, {
            key: "completedLessons",
            value: user.completedLessons,
          });
        }
        return true;
      }
      return false;
    },

    /**
     * Mark an exercise as completed
     */
    completeExercise(exerciseId) {
      const user = this.getUser();
      if (!user.completedExercises) user.completedExercises = [];
      if (!user.completedExercises.includes(exerciseId)) {
        user.completedExercises.push(exerciseId);
        this._user = user;
        this._persist();
        return true;
      }
      return false;
    },

    /**
     * Unlock a level
     */
    unlockLevel(levelId) {
      const user = this.getUser();
      if (!user.unlockedLevels) user.unlockedLevels = [1];
      if (!user.unlockedLevels.includes(levelId)) {
        user.unlockedLevels.push(levelId);
        this._user = user;
        this._persist();
        if (window.Events) {
          window.Events.emit(window.Events.STATE_CHANGED, {
            key: "unlockedLevels",
            value: user.unlockedLevels,
          });
        }
        return true;
      }
      return false;
    },

    /**
     * Update user profile name
     */
    setUsername(name) {
      const user = this.getUser();
      user.username = name;
      this._user = user;
      this._persist();
      if (window.Events) {
        window.Events.emit(window.Events.STATE_CHANGED, {
          key: "username",
          value: name,
        });
      }
    },

    /**
     * Reload state from storage
     */
    reload() {
      return this.init();
    },
  };

  if (typeof window !== "undefined") {
    window.State = State;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = State;
  }
})();
