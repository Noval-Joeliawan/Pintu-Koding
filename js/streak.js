window.Streak = {
  checkAndUpdate() {
    const user = window.Storage.getUser();
    const today = window.Storage.getTodayString();
    
    if (!user.lastStudyDate) {
      user.streak = 1;
      user.lastStudyDate = today;
    } else if (user.lastStudyDate !== today) {
      const lastDate = new Date(user.lastStudyDate);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        user.streak++;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
      user.lastStudyDate = today;
    }
    window.Storage.saveUser(user);
    if(window.Achievements) window.Achievements.check();
  },

  get() { 
    return window.Storage.getUser().streak; 
  },

  render() {
    const streak = this.get();
    document.querySelectorAll('#streak-value, #streak-value-mob, #dash-streak, #profile-streak').forEach(el => {
        if(el) el.textContent = streak;
    });
  }
};
