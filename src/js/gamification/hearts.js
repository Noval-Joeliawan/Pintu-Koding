// src/js/gamification/hearts.js — Hearts and Life Recovery System
(function () {
  'use strict';

  const Hearts = {
    MAX_HEARTS: 5,
    REFILL_INTERVAL_MS: 30 * 60 * 1000, // FR-3.2: 30 menit (diubah dari 3 jam)
    _timerInterval: null,

    init() {
      this.checkRefill();
      this._startTimer();
      this.render();

      if (typeof window !== 'undefined' && window.Events) {
        window.Events.on(window.Events.HEART_REFILLED, () => this.render());
        window.Events.on(window.Events.STATE_CHANGED, (data) => {
          if (data && data.key === 'hearts') {
            this.render();
          }
        });
      }
    },

    get() {
      if (typeof window !== 'undefined' && window.State) {
        return window.State.get('hearts') ?? 5;
      }
      if (typeof window !== 'undefined' && window.Storage) {
        return window.Storage.getUser().hearts;
      }
      return 5;
    },

    lose() {
      if (typeof window !== 'undefined' && window.State) {
        const success = window.State.decrementHearts(1);
        this.render();
        return success;
      }
      return false;
    },

    /**
     * FR-3.1: Pemulihan 1 Heart melalui penyelesaian Mode Latihan
     */
    recoverFromPractice() {
      if (typeof window !== 'undefined' && window.State) {
        const newHearts = window.State.restoreHearts(1, { source: 'practice_mode' });
        this.render();
        return newHearts;
      }
      return this.get();
    },

    /**
     * FR-3.2: Pemeriksaan dan kalkulasi refill pasif berdasarkan UNIX timestamp
     */
    checkRefill() {
      const user = (typeof window !== 'undefined' && window.State)
        ? window.State.getUser()
        : (window.Storage ? window.Storage.getUser() : null);

      if (!user || user.hearts >= this.MAX_HEARTS) return;

      const now = Date.now();
      if (user.nextHeartRefill && now >= user.nextHeartRefill) {
        const firstDue = user.nextHeartRefill;
        const elapsed = now - firstDue;
        const dueRefills = Math.floor(elapsed / this.REFILL_INTERVAL_MS) + 1;
        const capacity = this.MAX_HEARTS - user.hearts;
        const appliedRefills = Math.min(capacity, dueRefills);

        let nextRefillTimestamp = null;
        if (user.hearts + appliedRefills < this.MAX_HEARTS) {
          nextRefillTimestamp = firstDue + appliedRefills * this.REFILL_INTERVAL_MS;
        }

        if (typeof window !== 'undefined' && window.State) {
          window.State.restoreHearts(appliedRefills, {
            nextHeartRefill: nextRefillTimestamp,
            source: 'passive_refill'
          });
        }
      }
    },

    getTimerSeconds() {
      const user = (typeof window !== 'undefined' && window.State)
        ? window.State.getUser()
        : (window.Storage ? window.Storage.getUser() : null);

      if (!user || user.hearts >= this.MAX_HEARTS || !user.nextHeartRefill) return 0;
      const diff = user.nextHeartRefill - Date.now();
      return Math.max(0, Math.floor(diff / 1000));
    },

    isFull() {
      return this.get() >= this.MAX_HEARTS;
    },

    _startTimer() {
      if (this._timerInterval) clearInterval(this._timerInterval);
      this._timerInterval = setInterval(() => {
        this.checkRefill();
        this.render();
      }, 1000);
    },

    render() {
      if (typeof document === 'undefined') return;

      const hearts = this.get();
      const str = '❤️'.repeat(hearts) + '🖤'.repeat(Math.max(0, this.MAX_HEARTS - hearts));
      const countStr = `${hearts}/${this.MAX_HEARTS}`;

      document.querySelectorAll('#hearts-display, #hearts-display-mob, #lesson-hearts-display')
        .forEach(el => el && (el.textContent = str));
      document.querySelectorAll('#hearts-count, #dash-hearts, #profile-hearts')
        .forEach(el => el && (el.textContent = countStr));

      const sidebarTimer = document.getElementById('heart-timer-sidebar');
      const sidebarDisplay = document.getElementById('heart-timer-display-sidebar');

      if (hearts < this.MAX_HEARTS) {
        if (sidebarTimer) sidebarTimer.style.display = 'block';
        const secs = this.getTimerSeconds();
        const h = Math.floor(secs / 3600).toString().padStart(2, '0');
        const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        if (sidebarDisplay) sidebarDisplay.textContent = `${h}:${m}:${s}`;

        const modalTimer = document.getElementById('modal-heart-timer');
        if (modalTimer) modalTimer.textContent = `${h}:${m}:${s}`;
      } else {
        if (sidebarTimer) sidebarTimer.style.display = 'none';
        if (sidebarDisplay) sidebarDisplay.textContent = '';
      }
    },

    checkDailyBonus() {
      const user = (typeof window !== 'undefined' && window.State)
        ? window.State.getUser()
        : (window.Storage ? window.Storage.getUser() : null);

      if (!user || !window.Storage) return;
      const today = window.Storage.getTodayString();

      if (user.dailyBonusDate !== today) {
        const wasMissingHearts = user.hearts < this.MAX_HEARTS;
        if (window.State) {
          window.State.setHearts(this.MAX_HEARTS);
          const u = window.State.getUser();
          u.dailyBonusDate = today;
          u.nextHeartRefill = null;
          window.Storage.saveUser(u);
        }

        const banner = document.getElementById('daily-bonus-banner');
        if (banner && wasMissingHearts) banner.style.display = 'flex';
        this.render();
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.Hearts = Hearts;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Hearts;
  }
})();
