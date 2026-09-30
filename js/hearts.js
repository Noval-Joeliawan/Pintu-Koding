window.Hearts = {
  MAX_HEARTS: 5,
  REFILL_INTERVAL_MS: 3 * 60 * 60 * 1000, // 3 jam
  _timerInterval: null,

  init() {
    this.checkRefill();
    this._startTimer();
  },

  get() {
    return window.Storage.getUser().hearts;
  },

  lose() {
    const user = window.Storage.getUser();
    if (user.hearts <= 0) return false;
    
    user.hearts--;
    if (user.hearts < this.MAX_HEARTS && (!user.nextHeartRefill || user.nextHeartRefill <= Date.now())) {
      user.nextHeartRefill = Date.now() + this.REFILL_INTERVAL_MS;
    }
    window.Storage.saveUser(user);
    this.render();
    return true;
  },

  checkRefill() {
    const user = window.Storage.getUser();
    if (user.hearts >= this.MAX_HEARTS) return;

    const now = Date.now();
    if (user.nextHeartRefill && now >= user.nextHeartRefill) {
      const firstDue = user.nextHeartRefill;
      const elapsed = now - firstDue;
      const dueRefills = Math.floor(elapsed / this.REFILL_INTERVAL_MS) + 1;
      const capacity = this.MAX_HEARTS - user.hearts;
      const appliedRefills = Math.min(capacity, dueRefills);

      user.hearts += appliedRefills;

      if (user.hearts < this.MAX_HEARTS) {
        user.nextHeartRefill = firstDue + appliedRefills * this.REFILL_INTERVAL_MS;
      } else {
        user.nextHeartRefill = null;
      }
      window.Storage.saveUser(user);
    }
  },

  getTimerSeconds() {
    const user = window.Storage.getUser();
    if (user.hearts >= this.MAX_HEARTS || !user.nextHeartRefill) return 0;
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
    const hearts = this.get();
    const str = '❤️'.repeat(hearts) + '🖤'.repeat(this.MAX_HEARTS - hearts);
    const countStr = `${hearts}/${this.MAX_HEARTS}`;
    
    document.querySelectorAll('#hearts-display, #hearts-display-mob, #lesson-hearts-display').forEach(el => el && (el.textContent = str));
    document.querySelectorAll('#hearts-count, #dash-hearts, #profile-hearts').forEach(el => el && (el.textContent = countStr));
    
    const sidebarTimer = document.getElementById('heart-timer-sidebar');
    const sidebarDisplay = document.getElementById('heart-timer-display-sidebar');
    
    if (hearts < this.MAX_HEARTS) {
      if (sidebarTimer) sidebarTimer.style.display = 'block';
      const secs = this.getTimerSeconds();
      const h = Math.floor(secs / 3600).toString().padStart(2, '0');
      const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      if (sidebarDisplay) sidebarDisplay.textContent = `${h}:${m}:${s}`;
    } else {
      if (sidebarTimer) sidebarTimer.style.display = 'none';
      if (sidebarDisplay) sidebarDisplay.textContent = '';
    }
  },

  checkDailyBonus() {
    const user = window.Storage.getUser();
    const today = window.Storage.getTodayString();
    
    if (user.dailyBonusDate !== today) {
      const wasMissingHearts = user.hearts < this.MAX_HEARTS;
      user.hearts = this.MAX_HEARTS;
      user.dailyBonusDate = today;
      user.nextHeartRefill = null;
      window.Storage.saveUser(user);
      
      const banner = document.getElementById('daily-bonus-banner');
      if (banner && wasMissingHearts) banner.style.display = 'flex';
      this.render();
    }
  }
};
