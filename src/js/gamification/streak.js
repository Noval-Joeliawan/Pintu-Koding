// src/js/gamification/streak.js — Daily Streak Tracking System
window.Streak = {
  checkAndUpdate() {
    const user =
      typeof window !== "undefined" && window.State
        ? window.State.getUser()
        : window.Storage.getUser();
    const today = window.Storage.getTodayString();
    let currentStreak = user.streak || 0;

    if (!user.lastStudyDate) {
      currentStreak = 1;
    } else if (user.lastStudyDate !== today) {
      const lastDate = new Date(user.lastStudyDate);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }

    if (
      typeof window !== "undefined" &&
      window.State &&
      typeof window.State.setStreak === "function"
    ) {
      window.State.setStreak(currentStreak, today);
    } else {
      user.streak = currentStreak;
      user.lastStudyDate = today;
      window.Storage.saveUser(user);
    }

    if (
      window.Achievements &&
      typeof window.Achievements.check === "function"
    ) {
      window.Achievements.check();
    }
    this.render();
  },

  get() {
    if (typeof window !== "undefined" && window.State) {
      return window.State.get("streak") ?? 0;
    }
    return window.Storage.getUser().streak;
  },

  render() {
    if (typeof document === "undefined") return;
    const streak = Math.max(0, this.get());
    document
      .querySelectorAll(
        "#streak-value, #streak-value-mob, #dash-streak, #profile-streak",
      )
      .forEach((el) => {
        if (el) el.textContent = streak;
      });
  },
};
